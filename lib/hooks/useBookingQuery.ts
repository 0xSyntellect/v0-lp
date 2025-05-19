// lib/hooks/useBookingQuery.ts
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useBookingQuery() {
  const params = useSearchParams();

  const from = useMemo(() => params.get("from") || "", [params]);
  const to = useMemo(() => params.get("to") || "", [params]);
  const dateTime = useMemo(() => params.get("date") || "", [params]);

  const passengersCount = useMemo(() => {
    const raw = params.get("passengers") || "1";
    const num = parseInt(raw, 10);
    return Number.isNaN(num) ? 1 : num;
  }, [params]);

  const serviceType = useMemo(
    () => params.get("serviceType") || "transfer",
    [params]
  );

  return { from, to, dateTime, passengersCount, serviceType };
}