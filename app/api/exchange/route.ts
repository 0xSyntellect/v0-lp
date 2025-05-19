// app/api/exchange/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  
  const key = process.env.EXCHANGE_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'Missing server-side EXCHANGE_API_KEY' },
      { status: 500 }
    );
  }

  // build the URL for just the currencies we care about
  const currencies = ['USD', 'EUR', 'GBP', 'TRY'].join(',');
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${key}&currencies=${currencies}`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json(
      { error: `Provider error: ${res.status}` },
      { status: 502 }
    );
  }

  const json = await res.json() as {
    meta?: unknown;
    data?: Record<string, number>;
    error?: string;
  };

  // freecurrencyapi returns { data: { USD:1, EUR:0.92, GBP:0.78, TRY:27.5 } }
  if (!json.data) {
    return NextResponse.json(
      { error: json.error || 'Bad response from provider' },
      { status: 502 }
    );
  }

  const rates = {
    USD: json.data['USD'],
    EUR: json.data['EUR'],
    GBP: json.data['GBP'],
    TRY: json.data['TRY'],
  };

  return NextResponse.json(rates);
}
