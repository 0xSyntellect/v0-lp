// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Returns a browser‑safe Supabase client that uses the public anon key.
 * Call as a function so every invocation runs in its own component scope.
 */
export const supabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
