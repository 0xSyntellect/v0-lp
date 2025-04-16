// lib/pricing.ts

/** 
 * Fetches driving distance (km) from your Next.js proxy
 */
async function fetchDistanceKm(from: string, to: string): Promise<number> {
    const res = await fetch(
      `/api/distance?origins=${encodeURIComponent(from)}&destinations=${encodeURIComponent(to)}`
    );
    const json = await res.json();
    const meters = json.rows[0].elements[0].distance.value;
    return meters / 1000;
  }
  
  /**
   * Calculates price = ceil(distanceKm * rate)
   */
  function calculatePrice(km: number, rate: number): number {
    return Math.ceil(km * rate);
  }
  
  /** $2/km for Minivan */
  export async function getMinivanPrice(from: string, to: string): Promise<number> {
    const km = await fetchDistanceKm(from, to);
    return calculatePrice(km, 2);
  }
  
  /** $3/km for Sprinter */
  export async function getSprinterPrice(from: string, to: string): Promise<number> {
    const km = await fetchDistanceKm(from, to);
    return calculatePrice(km, 3);
  }
  