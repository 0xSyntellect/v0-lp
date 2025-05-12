
-- offers table
create table offers (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references auth.users on delete set null,
  created_at timestamptz default now(),
  expires_at timestamptz not null,
  status text default 'pending',
  pickup jsonb not null,
  dropoff jsonb not null,
  distance_km numeric not null,
  vehicle text not null,
  base_price numeric not null,
  discount_code text,
  discount_amount numeric default 0,
  final_price numeric not null,
  paid_at timestamptz
);

-- discounts table
create table discounts (
  code text primary key,
  amount_percent int check (amount_percent between 1 and 100),
  active boolean default true
);

-- Enable RLS on offers
alter table offers enable row level security;
create policy "own offers" on offers
  using (created_by = auth.uid())
  with check (true);

-- Enable RLS on discounts
alter table discounts enable row level security;
create policy "read only" on discounts
  for select using (true);
