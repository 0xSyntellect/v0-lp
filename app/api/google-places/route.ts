// app/api/google-places/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("q");
    if (!input) {
      console.log("No search input provided.");
      return NextResponse.json({ predictions: [] });
    }

    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!googleApiKey) {
      console.error("GOOGLE_PLACES_API_KEY is not set in the environment variables!");
      return NextResponse.json(
        { error: "Server configuration error: missing Google API key" },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${googleApiKey}`;

    console.log("Fetching Google Places API:", url);
    const response = await fetch(url);
    const data = await response.json();

    if (data.status && data.status !== "OK") {
      console.error("Google Places API responded with error:", data);
    }
    console.log("Google API response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in Google Places API route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
