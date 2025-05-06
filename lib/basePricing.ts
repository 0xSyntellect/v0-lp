// lib/basePricing.ts

// Per-km rates (₺)
export const BASE_KM_RATES: Record<string, number> = {
  sedan: 0.65,
  minivan: 0.79,
  sprinter: 1.185,
};

// Minimum fees (₺)
export const MIN_FEES: Record<string, number> = {
  sedan: 20,
  minivan: 25,
  sprinter: 35,
};

/**
 * Get the per-km rate for the given vehicle type.
 */
export function ratePerKm(vehicle: string): number {
  const r = BASE_KM_RATES[vehicle];
  if (r == null) throw new Error(`Unknown vehicle: ${vehicle}`);
  return r;
}

/**
 * Get the minimum fee for the given vehicle type.
 */
export function minFeeForVehicle(vehicle: string): number {
  const m = MIN_FEES[vehicle];
  if (m == null) throw new Error(`Unknown vehicle: ${vehicle}`);
  return m;
}
