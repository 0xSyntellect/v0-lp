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
 * Calculates price = ceil(km * rate), then enforces a minimum fee.
 * @param km      distance in kilometers
 * @param rate    $ per km
 * @param minFee  minimum total fee
 */
function calculatePrice(km: number, rate: number, minFee: number): number {
    const raw = Math.ceil(km * rate);
    return Math.max(raw, minFee);
  }
  /** $2/km for Minivan, minimum $25 */
export async function getMinivanPrice(
    from: string,
    to: string
  ): Promise<number> {
    const km = await fetchDistanceKm(from, to);
    return calculatePrice(km, 0.79, 25);  // minFee = 25
  }
  
  /** $3/km for Sprinter, minimum $35 */
  export async function getSprinterPrice(
    from: string,
    to: string
  ): Promise<number> {
    const km = await fetchDistanceKm(from, to);
    return calculatePrice(km, 1.185, 35);  // minFee = 35

}