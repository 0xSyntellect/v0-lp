import { NextRequest, NextResponse } from 'next/server';
import { withSentry } from '@/lib/withSentry';
import supabaseAdmin from '@/lib/supabaseAdmin';
import { AcceptOfferSchema } from '../_shared';

export const POST = withSentry(async (req: NextRequest) => {
  const { offerId } = AcceptOfferSchema.parse(await req.json());

  const { data: offer, error } = await supabaseAdmin
    .from('offers')
    .select('*')
    .eq('id', offerId)
    .single();
  if (error) throw error;
  if (new Date() > new Date(offer.expires_at))
    return NextResponse.json({ error: 'Offer expired' }, { status: 400 });

  await supabaseAdmin
    .from('offers')
    .update({ status: 'accepted' })
    .eq('id', offerId);

  return NextResponse.json({ offerId });
});
