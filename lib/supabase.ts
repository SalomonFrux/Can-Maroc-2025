// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: false, // Keep this as it is based on your preference
      detectSessionInUrl: true,
      persistSession: true,
      // Use the default localStorage behavior
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
  }
);