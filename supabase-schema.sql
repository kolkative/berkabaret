-- =============================================
-- SCHEMA: ticketing-app
-- Jalankan ini di Supabase SQL Editor
-- =============================================

-- EVENTS TABLE
create table public.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  location    text,
  venue       text,
  date_start  timestamptz not null,
  date_end    timestamptz,
  cover_image text,
  rundown     jsonb default '[]',   -- [{time, activity, description}]
  ticket_types jsonb default '[]',  -- [{id, name, price, quota, sold}]
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- ORDERS TABLE
create table public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_code      text unique not null,  -- e.g. TKT-20240601-XXXX
  event_id        uuid references public.events(id),
  ticket_type_id  text not null,
  ticket_type_name text not null,
  buyer_name      text not null,
  buyer_email     text not null,
  buyer_phone     text not null,
  quantity        int not null default 1,
  price_per_ticket bigint not null,      -- in IDR (Rupiah)
  total_amount    bigint not null,
  status          text not null default 'PENDING',
  -- status: PENDING | PAID | EXPIRED | CANCELLED
  mayar_invoice_id text,
  mayar_payment_url text,
  qr_code         text,                  -- unique QR untuk masuk event
  paid_at         timestamptz,
  expired_at      timestamptz,
  created_at      timestamptz default now()
);

-- INDEX untuk performa
create index orders_event_id_idx on public.orders(event_id);
create index orders_status_idx on public.orders(status);
create index orders_buyer_email_idx on public.orders(buyer_email);

-- CONTACT MESSAGES TABLE
create table public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz default now()
);

create index contact_messages_created_at_idx on public.contact_messages(created_at desc);

-- ROW LEVEL SECURITY
alter table public.events enable row level security;
alter table public.orders enable row level security;
alter table public.contact_messages enable row level security;

-- Events: semua orang bisa baca event aktif
create policy "events_public_read" on public.events
  for select using (is_active = true);

-- Orders: hanya service role (backend) yang bisa akses
-- Frontend harus pakai service role key (server-side only)
create policy "orders_service_only" on public.orders
  for all using (false);

-- Contact messages: hanya service role (backend) yang bisa akses
create policy "contact_messages_service_only" on public.contact_messages
  for all using (false);

-- =============================================
-- CONTOH DATA EVENT (optional, buat testing)
-- =============================================
insert into public.events (slug, title, description, location, venue, date_start, date_end, ticket_types)
values (
  'konser-indie-jakarta-2024',
  'Konser Indie Jakarta 2024',
  'Malam penuh musik indie terbaik dari berbagai genre. Hadir dan rasakan atmosfernya!',
  'Jakarta',
  'Gelora Bung Karno, Jakarta',
  '2024-12-15 19:00:00+07',
  '2024-12-15 23:00:00+07',
  '[
    {"id": "reguler", "name": "Reguler", "price": 150000, "quota": 500, "sold": 0},
    {"id": "vip", "name": "VIP", "price": 350000, "quota": 100, "sold": 0},
    {"id": "vvip", "name": "VVIP", "price": 750000, "quota": 20, "sold": 0}
  ]'::jsonb
);
