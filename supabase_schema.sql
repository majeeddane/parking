-- ================================================
-- مواقف - Mawqif Database Schema (Supabase / PostgreSQL)
-- Run this in Supabase SQL Editor
-- ================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- -----------------------------------------------
-- Table 1: mawqif_users
-- Stores all registered user accounts
-- -----------------------------------------------
create table if not exists mawqif_users (
  id            text primary key,
  first_name    text,
  father_name   text,
  family_name   text,
  full_name     text not null,
  id_number     text unique,
  phone         text unique,
  email         text unique,
  city          text,
  address       text,
  date_of_birth text,
  password_hash text,
  created_at    timestamptz default now()
);

-- -----------------------------------------------
-- Table 2: mawqif_applications
-- Stores subscription applications with documents
-- -----------------------------------------------
create table if not exists mawqif_applications (
  id                     text primary key,
  user_id                text references mawqif_users(id) on delete cascade,
  submission_date        text,
  status                 text default 'pending',  -- pending | approved | rejected | needs_edit | completed
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
  -- Documents stored as JSON (base64 dataUrl + metadata)
  doc_id_document        jsonb,
  doc_driving_license    jsonb,
  doc_vehicle_license    jsonb,
  doc_car_photo          jsonb,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

-- -----------------------------------------------
-- Table 3: mawqif_notifications
-- Stores per-user notifications
-- -----------------------------------------------
create table if not exists mawqif_notifications (
  id         bigint primary key generated always as identity,
  user_id    text references mawqif_users(id) on delete cascade,
  title      text not null,
  description text,
  time_label text default 'الآن',
  is_read    boolean default false,
  created_at timestamptz default now()
);

-- -----------------------------------------------
-- Row Level Security - DISABLE for admin use
-- (We use service_role key on the server so RLS
--  policies are bypassed automatically)
-- -----------------------------------------------
alter table mawqif_users         disable row level security;
alter table mawqif_applications  disable row level security;
alter table mawqif_notifications disable row level security;

-- -----------------------------------------------
-- Indexes for performance
-- -----------------------------------------------
create index if not exists idx_apps_user_id     on mawqif_applications(user_id);
create index if not exists idx_apps_status      on mawqif_applications(status);
create index if not exists idx_notifs_user_id   on mawqif_notifications(user_id);
create index if not exists idx_users_id_number  on mawqif_users(id_number);
create index if not exists idx_users_phone      on mawqif_users(phone);
create index if not exists idx_users_email      on mawqif_users(email);
