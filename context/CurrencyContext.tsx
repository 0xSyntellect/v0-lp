'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Rates = Record<string, number>;

interface CurrencyContextType {
  rates: Rates;
  selectedCurrency: string;
  setSelectedCurrency: (c: string) => void;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
  rates: { USD: 1 },
  selectedCurrency: 'USD',
  setSelectedCurrency: () => {},
  loading: true,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<Rates>({ USD: 1 });
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [loading, setLoading] = useState<boolean>(true);

  // Restore last‐used currency
  useEffect(() => {
    const stored = localStorage.getItem('selectedCurrency');
    if (stored && ['USD','EUR','GBP','TRY'].includes(stored)) {
      setSelectedCurrency(stored);
    }
  }, []);

  // Fetch exchange rates once, parse quotes into simple map
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
    if (!key) {
      console.error('Missing NEXT_PUBLIC_EXCHANGE_API_KEY');
      setLoading(false);
      return;
    }

    const url = new URL('https://api.exchangerate.host/live');
    url.searchParams.set('access_key', key);
    url.searchParams.set('source', 'USD');
    url.searchParams.set('currencies', 'USD,EUR,GBP,TRY');

    fetch(url.toString())
      .then(res => res.json())
      .then(json => {
        if (json.success && json.quotes) {
          // json.quotes: { USDAED:3.67, USDEUR:0.88, … }
          const parsed: Rates = { USD: 1 };
          for (const [pair, rate] of Object.entries(json.quotes)) {
            // strip leading 'USD'
            const code = pair.substring(3);
            parsed[code] = rate as number;
          }
          setRates(parsed);
        } else {
          console.error('Exchange API error:', json.error);
        }
      })
      .catch(err => console.error('Failed to fetch rates', err))
      .finally(() => setLoading(false));
  }, []);

  // Persist user choice
  useEffect(() => {
    localStorage.setItem('selectedCurrency', selectedCurrency);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider
      value={{ rates, selectedCurrency, setSelectedCurrency, loading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

// Multiply USD amount by the chosen currency's rate
export function convert(
  amountUSD: number,
  rates: Rates | null | undefined,
  currency: string
) {
  return amountUSD * (rates?.[currency] ?? 1);
}

// Format with the Intl API
export function format(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amount);
}
