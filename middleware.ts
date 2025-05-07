// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/* ────────────────────────────────────────────────
   Upstash Redis + sliding-window rate-limit
   60 requests / minute per client IP
────────────────────────────────────────────────── */
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
});

export const config = {
  matcher: ['/api/(distance|google-places|offers.*)'],
};

export async function middleware(request: NextRequest) {
  // ── 0. Dev-only bypass ─────────────────────────
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  // ── 1. Referer allow-list (production) ─────────
  const referer = request.headers.get("referer") ?? "";
  try {
    const host = new URL(referer).hostname;
    if (!host.endsWith("pickupist.com")) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  } catch {
    // malformed or missing Referer → block
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── 2. IP rate-limit (Upstash) ──────────────────
  const xff = request.headers.get("x-forwarded-for") ?? "";
  const ip =
    xff.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  return NextResponse.next();
}


// // app/middleware.ts
// if (process.env.NODE_ENV === 'production') {
//   try {
//     const host = new URL(referer).hostname;
// -     if (!host.endsWith('pickupist.com')) {
// +     if (
// +       !host.endsWith('pickupist.com') &&
// +       !host.endsWith('.vercel.app')
// +     ) {
//       return new NextResponse('Forbidden', { status: 403 });
//     }
//   } catch {
//     return new NextResponse('Forbidden', { status: 403 });
//   }
