import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // pull origins & destinations from the query
  const { origins, destinations } = Object.fromEntries(
    new URL(request.url).searchParams
  );

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    console.error("Missing GOOGLE_MAPS_API_KEY");
    return NextResponse.json(
      { error: "Server configuration error: missing Google API key" },
      { status: 500 }
    );
  }



  

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
    origins
  )}&destinations=${encodeURIComponent(destinations)}&key=${key}`;

  try {
    const res = await fetch(url);
    const raw = await res.text();

    console.log("[API:/distance] status:", res.status, res.statusText);
    console.log("[API:/distance] raw response:", raw);

    if (!res.ok) {
      // return the upstream error as JSON
      return NextResponse.json(
        { error: `Google error ${res.status}: ${raw}` },
        { status: 502 }
      );
    }

    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("[API:/distance] exception:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
