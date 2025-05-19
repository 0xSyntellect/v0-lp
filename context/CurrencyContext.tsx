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

  

  // ── Fetch USD ⇒ EUR/GBP/TRY via exchangerate.host live endpoint ─────────
  useEffect(() => {
        async function fetchRates() {
          try {
            const res = await fetch('/api/exchange');
            const data: Record<'USD'|'EUR'|'GBP'|'TRY', number> = await res.json();
            setRates(data);
          } catch (err) {
            console.error('Failed to fetch rates via proxy', err);
          } finally {
            setLoading(false);
          }
        }
        fetchRates();
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

/**
 * Format a number as a localized currency string.
 *
 * @param value    The amount in base units (e.g. USD decimals)
 * @param currency A 3-letter currency code, e.g. 'USD','EUR','TRY'
 */
export function format(value: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    // minimumFractionDigits: 2, // usually automatic
    // maximumFractionDigits: 2,
  }).format(value);
}
