// lib/hourlyPricing.ts

/**
 * Hourly rates per vehicle type
 */
const HOURLY_RATES: Record<'minivan' | 'sprinter', number> = {
    minivan: 25,
    sprinter: 35,
  };
  
  /**
   * Calculates the hourly price for a given vehicle type and hours.
   * Enforces a minimum of 4 hours and a maximum of 8 hours.
   * @param vehicleType - 'minivan' or 'sprinter'
   * @param hours - requested hours
   * @returns total price in dollars
   */
  export function calculateHourlyPrice(
    vehicleType: 'minivan' | 'sprinter',
    hours: number
  ): number {
    const clampedHours = Math.min(Math.max(hours, 4), 8);
    const rate = HOURLY_RATES[vehicleType];
    return clampedHours * rate;
  }
  