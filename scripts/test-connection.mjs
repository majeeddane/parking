// Test Supabase connection and create tables using direct REST API
const supabaseUrl = 'https://oyvhbcsfnfrfokelhlsn.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95dmhiY3NmbmZyZm9rZWxobHNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODI2Njg3NCwiZXhwIjoyMTAzODQyODc0fQ.UwtVEFEgRVNE_9IqlFwXwul4bvP5-OgcGVWwOi_hOF4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': serviceKey,
  'Authorization': `Bearer ${serviceKey}`,
  'Prefer': 'return=minimal',
};

async function testConnection() {
  console.log('⏳ Testing Supabase connection...');
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/mawqif_users?select=id&limit=1`, { headers });
    if (res.ok) {
      console.log('✅ Connection OK - mawqif_users table exists!');
      return true;
    } else {
      const body = await res.json().catch(() => ({}));
      console.log('⚠️  Table status:', res.status, JSON.stringify(body));
      return false;
    }
  } catch (e) {
    console.log('❌ Connection failed:', e.message);
    return false;
  }
}

async function createTables() {
  console.log('⏳ Creating tables via Supabase SQL API...');

  const queries = [
    `create table if not exists mawqif_users (
      id text primary key,
      first_name text,
      father_name text,
      family_name text,
      full_name text not null default '',
      id_number text,
      phone text,
      email text,
      city text,
      address text,
      date_of_birth text,
      password_hash text,
      created_at timestamptz default now()
    )`,
    `create table if not exists mawqif_applications (
      id text primary key,
      user_id text references mawqif_users(id) on delete cascade,
      submission_date text,
      status text default 'pending',
      vehicle_make text,
      vehicle_model text,
      vehicle_year text,
      vehicle_color text,
      plate_number text,
      vehicle_license_number text,
      is_owner text,
      owner_relation text,
      rejection_reason text,
      subscription_number text,
      subscription_start text,
      subscription_end text,
      doc_id_document jsonb,
      doc_driving_license jsonb,
      doc_vehicle_license jsonb,
      doc_car_photo jsonb,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    )`,
    `create table if not exists mawqif_notifications (
      id bigint primary key generated always as identity,
      user_id text references mawqif_users(id) on delete cascade,
      title text not null,
      description text,
      time_label text default 'الآن',
      is_read boolean default false,
      created_at timestamptz default now()
    )`,
    `alter table mawqif_users disable row level security`,
    `alter table mawqif_applications disable row level security`,
    `alter table mawqif_notifications disable row level security`,
  ];

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    const tableName = q.match(/mawqif_\w+/)?.[0] || `query ${i+1}`;
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: q }),
      });
      // The REST RPC endpoint won't work for raw SQL - we'll use the pg_net approach or SQL editor
      console.log(`   [${i+1}/${queries.length}] ${tableName}: sent`);
    } catch (e) {
      console.log(`   [${i+1}/${queries.length}] ${tableName}: ${e.message}`);
    }
  }
}

async function main() {
  const exists = await testConnection();
  if (!exists) {
    console.log('\n📋 Tables do not exist yet. You need to create them.');
    console.log('   Open: https://supabase.com/dashboard/project/oyvhbcsfnfrfokelhlsn/sql/new');
    console.log('   And paste the SQL from: supabase_schema.sql\n');
  }
}

main();
