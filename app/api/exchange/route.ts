import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.EXCHANGE_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'Missing server-side EXCHANGE_API_KEY' },
      { status: 500 }
    );
  }

  // Fetch live quotes for only the currencies you need
  const res = await fetch(
    `https://api.exchangerate.host/live?access_key=${key}&currencies=EUR,GBP,TRY&format=1`
  );
  const data = await res.json();

  if (!data.success || !data.quotes) {
    return NextResponse.json(
      { error: data.error || 'Bad response from provider' },
      { status: 502 }
    );
  }

  // Map quotes into a simple Rates object
  const rates = {
    USD: 1,
    EUR: data.quotes['USDEUR'],
    GBP: data.quotes['USDGBP'],
    TRY: data.quotes['USDTRY'],
  };

  return NextResponse.json(rates);
}
