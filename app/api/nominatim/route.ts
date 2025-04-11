export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q"); // or however you’re parsing the query

    // Log whenever this route is hit
    console.log("Nominatim route triggered with query:", query);

    // Fetch from OpenStreetMap Nominatim
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    if (!response.ok) {
      // Log non-200 responses
      console.error("Nominatim returned a bad status:", response.status);
      return NextResponse.json([]);
    }

    // Parse
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    // Log errors if the fetch fails or JSON parsing fails
    console.error("Error fetching from Nominatim:", error);
    return NextResponse.json([]);
  }
}
