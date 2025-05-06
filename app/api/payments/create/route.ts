import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import crypto from 'node:crypto';

export async function POST(req: NextRequest) {
  const { offerId } = await req.json();

  /* ensure accepted */
  const { data: offer } = await supabaseAdmin
    .from('offers')
    .select('*')
    .eq('id', offerId)
    .eq('status', 'accepted')
    .single();
  if (!offer) return NextResponse.json({ error: 'Bad offer' }, { status: 400 });

  /* minimal PayTR token call */
  const paytrParams = new URLSearchParams({
    merchant_id: process.env.PAYTR_MERCHANT_ID!,
    user_ip: '127.0.0.1',
    merchant_oid: offerId,
    email: 'dummy@pickupist.com',
    payment_amount: (offer.final_price * 100).toString(), // kuruş
    user_name: 'Pickupist Guest',
    user_address: 'N/A',
    user_phone: 'N/A',
    currency: 'TL',
    test_mode: process.env.PAYTR_SANDBOX === 'true' ? '1' : '0',
  });
  const token = crypto
    .createHash('sha256')
    .update(
      process.env.PAYTR_MERCHANT_ID +
        paytrParams.toString() +
        process.env.PAYTR_MERCHANT_SALT
    )
    .digest('base64');

  /* skipping HTTPS call in sample */
  const paymentUrl = `https://www.paytr.com/odeme/guvenli/${token}`;

  return NextResponse.json({ paymentUrl });
}
