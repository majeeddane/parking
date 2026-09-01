/**
 * Script to create Supabase tables for Mawqif project
 * Run: node scripts/setup-supabase.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oyvhbcsfnfrfokelhlsn.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95dmhiY3NmbmZyZm9rZWxobHNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODI2Njg3NCwiZXhwIjoyMTAzODQyODc0fQ.UwtVEFEgRVNE_9IqlFwXwul4bvP5-OgcGVWwOi_hOF4';

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const schema = `
create extension if not exists "pgcrypto";

create table if not exists mawqif_users (
  id            text primary key,
  first_name    text,
  father_name   text,
  family_name   text,
  full_name     text not null,
  id_number     text,
  phone         text,
  email         text,
  city          text,
  address       text,
  date_of_birth text,
  password_hash text,
  created_at    timestamptz default now()
);

create table if not exists mawqif_applications (
  id                     text primary key,
  user_id                text references mawqif_users(id) on delete cascade,
  submission_date        text,
  status                 text default 'pending',
  vehicle_make           text,
  vehicle_model          text,
  vehicle_year           text,
  vehicle_color          text,
  plate_number           text,
  vehicle_license_number text,
  is_owner               text,
  owner_relation         text,
  rejection_reason       text,
  subscription_number    text,
  subscription_start     text,
  subscription_end       text,
  doc_id_document        jsonb,
  doc_driving_license    jsonb,
  doc_vehicle_license    jsonb,
  doc_car_photo          jsonb,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

create table if not exists mawqif_notifications (
  id          bigint primary key generated always as identity,
  user_id     text references mawqif_users(id) on delete cascade,
  title       text not null,
  description text,
  time_label  text default 'الآن',
  is_read     boolean default false,
  created_at  timestamptz default now()
);

alter table mawqif_users         disable row level security;
alter table mawqif_applications  disable row level security;
alter table mawqif_notifications disable row level security;

create index if not exists idx_apps_user_id    on mawqif_applications(user_id);
create index if not exists idx_apps_status     on mawqif_applications(status);
create index if not exists idx_notifs_user_id  on mawqif_notifications(user_id);
`;

console.log('⏳ Creating Supabase tables...');

const { error } = await supabase.rpc('exec_sql', { sql: schema }).catch(() => ({ error: null }));

// Try direct approach via REST API
const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
  },
  body: JSON.stringify({ sql: schema }),
});

if (response.ok) {
  console.log('✅ Tables created successfully via RPC!');
} else {
  // Try via pg_query if available
  const r2 = await response.json().catch(() => ({}));
  console.log('ℹ️  RPC response:', r2);
  console.log('\n📋 Please run the following SQL manually in Supabase SQL Editor:');
  console.log('   → https://supabase.com/dashboard/project/oyvhbcsfnfrfokelhlsn/sql');
  console.log('\n--- COPY SQL BELOW ---');
  console.log(schema);
  console.log('--- END SQL ---\n');
}

// Test connectivity
const { data, error: testErr } = await supabase.from('mawqif_users').select('count').limit(1);
if (!testErr) {
  console.log('✅ Connection to Supabase is working!');
} else {
  console.log('⚠️  Table test:', testErr.message);
  console.log('   → Run the SQL manually in Supabase to create the tables.');
}
