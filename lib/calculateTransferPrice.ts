import { ratePerKm, minFeeForVehicle } from './basePricing';

/**
 * Calculates total transfer price:
 *   ceil(distanceKm * ratePerKm)
 *   with a vehicle-specific minimum fee.
 */
export function calculateTransferPrice(
  distanceKm: number,
  vehicle: string
): number {
  const rate = ratePerKm(vehicle);
  const raw = Math.ceil(distanceKm * rate);
  const minFee = minFeeForVehicle(vehicle);
  return Math.max(raw, minFee);
}
