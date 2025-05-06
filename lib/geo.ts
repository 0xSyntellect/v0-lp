export async function geocode(text: string) {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', text);
  url.searchParams.set('key', process.env.GOOGLE_MAPS_API_KEY!);

  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK') throw new Error('Geocode failed');

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng, address: data.results[0].formatted_address };
}

export function getDistanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const sa = Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(sa), Math.sqrt(1 - sa));
}
