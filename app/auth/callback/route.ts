// app/auth/callback/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/ssr'   // new helper

export async function GET(req: Request) {
  const url = new URL(req.url)
  const supabase = createRouteHandlerClient({ cookies })

  // swaps the ?code & ?state for a persistent session + cookies
  const { error } = await supabase.auth.exchangeCodeForSession(
    url.searchParams
  )

  // if anything blew up, send the user back to /login with the message
  if (error) {
    return NextResponse.redirect(
      `${url.origin}/login?error=${encodeURIComponent(error.message)}`
    )
  }

  // success – land them on their bookings page
  return NextResponse.redirect(`${url.origin}/bookings`)
}
