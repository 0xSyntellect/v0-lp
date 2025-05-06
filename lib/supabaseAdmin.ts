// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Returns a client for browser-side usage, using the public anon key.
 */
export const supabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
