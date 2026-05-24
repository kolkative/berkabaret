# Berkabaret — Platform Ticketing Event

Stack: **Astro SSR + Tailwind + Supabase + Mayar QRIS + Resend**

---

## 🚀 Setup Development (VSCode)

### 1. Clone & Install

```bash
git clone https://github.com/username/ticketing-app.git
cd ticketing-app
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Isi file `.env` dengan nilai dari masing-masing service:

| Variable | Cara dapat |
|---|---|
| `SUPABASE_URL` | Dashboard Supabase → Project Settings → API |
| `SUPABASE_ANON_KEY` | Dashboard Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard Supabase → Project Settings → API |
| `MAYAR_API_KEY` | Dashboard Mayar → Settings → API Key |
| `MAYAR_WEBHOOK_SECRET` | Dashboard Mayar → Settings → Webhook → Secret |
| `RESEND_API_KEY` | resend.com → API Keys |
| `EMAIL_FROM` | Email terverifikasi di Resend |
| `PUBLIC_APP_URL` | `http://localhost:3000` (dev) / domain lo (prod) |
| `ADMIN_SECRET` | Password bebas buat akses admin |

### 3. Setup Supabase

1. Buka [supabase.com](https://supabase.com), buat project baru
2. Masuk ke **SQL Editor**
3. Copy-paste seluruh isi `supabase-schema.sql` dan jalankan

### 4. Setup Mayar Webhook

1. Login dashboard Mayar
2. Settings → Webhook
3. Set URL ke: `https://yourdomain.com/api/webhook/mayar`
4. Copy webhook secret ke `.env`

### 5. Jalankan Development

```bash
npm run dev
```

Buka `http://localhost:3000`

---

## 📁 Struktur Proyek

```
src/
├── pages/
│   ├── index.astro              # Homepage
│   ├── events/
│   │   ├── index.astro          # List semua event
│   │   ├── [slug].astro         # Detail event
│   │   └── [slug]/
│   │       └── register.astro   # Form beli tiket
│   ├── orders/
│   │   └── [order_code]/
│   │       ├── payment.astro    # Halaman QRIS
│   │       ├── success.astro    # Sukses bayar
│   │       └── expired.astro    # Expired
│   ├── api/
│   │   ├── orders/
│   │   │   ├── create.ts        # POST: buat order baru
│   │   │   └── status.ts        # GET: cek status order
│   │   └── webhook/
│   │       └── mayar.ts         # POST: webhook dari Mayar
│   └── admin/
│       └── orders.astro         # Dashboard admin
├── layouts/
│   └── Base.astro
├── lib/
│   ├── supabase.ts              # Supabase client & types
│   ├── mayar.ts                 # Mayar API integration
│   ├── email.ts                 # Resend email templates
│   └── utils.ts                 # Helper functions
```

---

## 🔄 Alur Pembayaran

```
User isi form → POST /api/orders/create
  → Buat order di Supabase (status: PENDING)
  → Buat invoice di Mayar
  → Kirim email pending ke pembeli
  → Redirect ke /orders/[code]/payment

Halaman payment → tampil QRIS dari Mayar
  → Poll /api/orders/status setiap 5 detik

User bayar → Mayar kirim webhook ke /api/webhook/mayar
  → Verifikasi signature
  → Update order status → PAID
  → Generate QR code unik
  → Update sold count di event
  → Kirim e-ticket ke email pembeli

User redirect → /orders/[code]/success
```

---

## 🔐 Admin Dashboard

Akses: `https://yourdomain.com/admin/orders?secret=PASSWORD_LO`

Ganti `PASSWORD_LO` dengan nilai `ADMIN_SECRET` di `.env`.

---

## 🚢 Deploy ke Hostinger

1. Push ke GitHub
2. Di hPanel Hostinger → Node.js → **Import dari GitHub**
3. Set environment variables di hPanel
4. Set start command: `node dist/server/entry.mjs`
5. Build command: `npm run build`

### Setting Webhook Mayar (Production)

Setelah deploy, update URL webhook di dashboard Mayar:
```
https://yourdomain.com/api/webhook/mayar
```

---

## 📦 Tambah Event Baru

Jalankan query SQL ini di Supabase SQL Editor:

```sql
INSERT INTO public.events (slug, title, description, location, venue, date_start, date_end, cover_image, rundown, ticket_types)
VALUES (
  'nama-event-slug',
  'Nama Event',
  'Deskripsi event...',
  'Kota',
  'Nama Venue, Kota',
  '2024-12-25 19:00:00+07',
  '2024-12-25 23:00:00+07',
  'https://link-gambar.jpg',  -- atau null
  '[
    {"time": "19:00", "activity": "Registrasi", "description": "Check-in peserta"},
    {"time": "19:30", "activity": "Opening", "description": "Pembukaan acara"}
  ]',
  '[
    {"id": "reguler", "name": "Reguler", "price": 150000, "quota": 500, "sold": 0},
    {"id": "vip", "name": "VIP", "price": 350000, "quota": 50, "sold": 0}
  ]'
);
```
