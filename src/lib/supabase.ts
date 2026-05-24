import { createClient } from '@supabase/supabase-js';

// Client untuk server-side (full access, pakai service role)
export const supabaseAdmin = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

// Tipe TypeScript
export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  date_start: string;
  date_end: string;
  cover_image: string;
  rundown: RundownItem[];
  ticket_types: TicketType[];
  is_active: boolean;
  created_at: string;
};

export type TicketType = {
  id: string;
  name: string;
  price: number;
  quota: number;
  sold: number;
};

export type RundownItem = {
  time: string;
  activity: string;
  description?: string;
};

export type Order = {
  id: string;
  order_code: string;
  event_id: string;
  ticket_type_id: string;
  ticket_type_name: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  quantity: number;
  price_per_ticket: number;
  total_amount: number;
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  mayar_invoice_id?: string;
  mayar_payment_url?: string;
  qr_code?: string;
  paid_at?: string;
  expired_at?: string;
  created_at: string;
};
