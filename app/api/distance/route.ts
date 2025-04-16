// app/api/distance/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { origins, destinations } = Object.fromEntries(
    new URL(request.url).searchParams,
  );
  const key = process.env.GOOGLE_MAPS_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
    origins,
  )}&destinations=${encodeURIComponent(destinations)}&key=${key}`;

  try {
    const res = await fetch(url);
    const raw = await res.text();

    console.log("[API:/distance] status", res.status, res.statusText);
    console.log("[API:/distance] raw response:", raw);

    if (!res.ok) {
      // echo the upstream error in JSON
      return NextResponse.json(
        { error: `Google error ${res.status}: ${raw}` },
        { status: 502 },
      );
    }

    // now parse
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("[API:/distance] exception:", err);
    return NextResponse.json(
      { error: err.message || "Unknown server error" },
      { status: 500 },
    );
  }
}
