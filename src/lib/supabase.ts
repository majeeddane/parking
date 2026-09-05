import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oyvhbcsfnfrfokelhlsn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Polyfill WebSocket in Node.js environment so @supabase/supabase-js doesn't throw
if (typeof WebSocket === 'undefined') {
  (globalThis as any).WebSocket = class WebSocket {};
}

// Public client (for client-side usage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// Service role client (server-side only – never expose to browser)
export const supabaseAdmin = () => {
  const VALID_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95dmhiY3NmbmZyZm9rZWxobHNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODI2Njg3NCwiZXhwIjoyMTAzODQyODc0fQ.UwtVEFEgRVNE_9IqlFwXwul4bvP5-OgcGVWwOi_hOF4';
  const envKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceKey = (envKey && !envKey.includes('81lXoJ1W8sJc0GZ3B') && envKey.startsWith('eyJ'))
    ? envKey
    : VALID_KEY;

  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    realtime: { transport: undefined as any },
  });
};
