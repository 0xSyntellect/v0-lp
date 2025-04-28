// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 60 reqs per minute, sliding window
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
});

export const config = {
  matcher: ["/api/distance", "/api/google-places"],
};

export async function middleware(request: NextRequest) {
  // 1) Enforce Referer allow-list
  const referer = request.headers.get("referer") || "";
  if (!referer.startsWith("https://pickupist.com")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2) Rate-limit by IP
  const ip = request.ip ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  return NextResponse.next();
}
