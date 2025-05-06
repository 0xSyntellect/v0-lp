import { NextRequest, NextResponse } from 'next/server';
import { withSentry } from '@/lib/withSentry';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { GetOfferSchema } from '../_shared';
import { geocode, getDistanceKm } from '@/lib/geo';
import { calculateTransferPrice } from '@/lib/calculateTransferPrice';
import { logger } from '@/lib/logger';

export const POST = withSentry(async (req: NextRequest) => {
  const body = GetOfferSchema.parse(await req.json());

  const [from, to] = await Promise.all([
    geocode(body.pickup),
    geocode(body.dropoff),
  ]);
  const distanceKm = getDistanceKm(from, to);
  let price = calculateTransferPrice(distanceKm, body.vehicle);

  /* optional discount */
  if (body.discountCode) {
    const { data: disc } = await supabaseAdmin
      .from('discounts')
      .select('*')
      .eq('code', body.discountCode)
      .eq('active', true)
      .single();
    if (disc) price = Math.round(price * (1 - disc.amount_percent / 100));
  }

  const { data: offer, error } = await supabaseAdmin
    .from('offers')
    .insert({
      pickup: from,
      dropoff: to,
      vehicle: body.vehicle,
      distance_km: distanceKm,
      base_price: price,
      final_price: price,
      expires_at: new Date(Date.now() + 15 * 60_000).toISOString(),
    })
    .select('id, expires_at')
    .single();
  if (error) throw error;

  logger.info({ offerId: offer.id }, 'Offer created');

  return NextResponse.json({
    offerId: offer.id,
    price,
    expiresAt: offer.expires_at,
  });
});
