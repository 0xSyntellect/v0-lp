// app/auth/callback/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/createSupabaseServerClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  

  // 1) Initialize Supabase with getAll/setAll cookie handlers
  const supabase = await createSupabaseServerClient();

  // 2) Pull out just the code string
  const code = url.searchParams.get("code");
  if (!code) {
    // no code → send them back to login
    return NextResponse.redirect(`${url.origin}/login`);
  }

  // 3) Exchange the auth code for a session
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    // if the body was wrong (e.g. you passed the whole URLSearchParams), you'll see the unmarshal error you reported
    return NextResponse.redirect(
      `${url.origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  // 4) On success, land them in /bookings
  return NextResponse.redirect(`${url.origin}/bookings`);
}
