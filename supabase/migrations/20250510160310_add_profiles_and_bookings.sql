-- 20250510_add_profiles_and_bookings.sql

-- ─────────────────────────────────────────────
-- EXTENSIONS (if you haven’t already)
-- ─────────────────────────────────────────────
create extension if not exists pgcrypto;      -- for gen_random_uuid()

-- ─────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────
create table if not exists public.profiles (
  id              uuid primary key default auth.uid(),
  full_name       text,
  phone           text,
  created_at      timestamptz      not null default now(),
  bookings_count  integer          not null default 0
);

alter table public.profiles enable row level security;
create policy "profile is self"
  on public.profiles
  for select using (id = auth.uid());

-- ─────────────────────────────────────────────
-- BOOKINGS
-- ─────────────────────────────────────────────
create table if not exists public.bookings (
  id               bigserial primary key,
  user_id          uuid references public.profiles(id) on delete set null,
  offer_id         uuid references public.offers(id)  on delete set null,
  status           text not null default 'pending'
                   check (status in ('pending','awaiting_payment','paid','completed','cancelled')),
  service_type     text not null
                   check (service_type in ('transfer','hourly')),
  from_location    jsonb not null,
  to_location      jsonb,
  date_time        timestamptz not null,
  passengers       smallint not null check (passengers > 0),
  vehicle          text not null,
  base_price       numeric not null,
  discount_applied boolean not null default false,
  discount_rate    numeric      not null default 0,
  total_price      numeric not null,
  created_at       timestamptz  not null default now(),
  paid_at          timestamptz
);

create index if not exists bookings_user_idx    on public.bookings(user_id);
create index if not exists bookings_created_idx on public.bookings(created_at);

alter table public.bookings enable row level security;
create policy "own bookings"
  on public.bookings
  using (user_id = auth.uid());
