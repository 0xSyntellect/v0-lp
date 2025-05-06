import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';
import crypto from 'node:crypto';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('x-paytr-signature') ?? '';

  const expected = crypto
    .createHmac('sha256', process.env.PAYTR_MERCHANT_KEY!)
    .update(body + process.env.PAYTR_MERCHANT_SALT)
    .digest('base64');

  if (expected !== sig) return new NextResponse('FAIL', { status: 400 });

  const params = new URLSearchParams(body);
  const merchant_oid = params.get('merchant_oid');
  const status = params.get('status');

  if (status === 'success' && merchant_oid) {
    await supabaseAdmin
      .from('offers')
      .update({ paid_at: new Date().toISOString() })
      .eq('id', merchant_oid);
  }
  return new NextResponse('OK');
}
