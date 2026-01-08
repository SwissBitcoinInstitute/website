import { createClient } from '@supabase/supabase-js';

// Admin client using service role key (for API routes only)
// This bypasses Row Level Security - use only in server-side code
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
