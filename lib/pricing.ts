// lib/pricing.ts
export async function getMinivanPrice(
    from: string,
    to: string
  ): Promise<number> {
    const res = await fetch('/api/offers/getOffer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickup: from, dropoff: to, vehicle: 'minivan' }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || `Failed to get minivan price`);
    }
    const { price } = await res.json();
    return price;
  }
  
  export async function getSprinterPrice(
    from: string,
    to: string
  ): Promise<number> {
    const res = await fetch('/api/offers/getOffer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickup: from, dropoff: to, vehicle: 'sprinter' }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || `Failed to get sprinter price`);
    }
    const { price } = await res.json();
    return price;
  }
  