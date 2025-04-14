// app/api/google-places/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("q"); // the user’s search text

    if (!input) {
      return NextResponse.json({ message: "No query provided" }, { status: 400 });
    }

    // IMPORTANT: ensure you have set GOOGLE_PLACES_API_KEY in your .env
    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;

    // Build the Places Autocomplete endpoint
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${googleApiKey}`;

    // Call Google
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Google Places error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
