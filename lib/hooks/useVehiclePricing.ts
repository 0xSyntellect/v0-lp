// lib/hooks/useVehiclePricing.ts
import { useEffect, useState } from "react";
import { getMinivanPrice, getSprinterPrice } from "@/lib/pricing";

export default function useVehiclePricing(
  from: string,
  to: string,
  active: boolean
) {
  const [minivan, setMinivan] = useState<number | null>(null);
  const [sprinter, setSprinter] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!active || !from || !to) return;
    setLoading(true);
    Promise.all([getMinivanPrice(from, to), getSprinterPrice(from, to)])
      .then(([mv, sp]) => {
        setMinivan(mv);
        setSprinter(sp);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [from, to, active]);

  return { minivan, sprinter, loading, error };
}