import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) return new Response(JSON.stringify({ error: 'Missing code' }), { status: 400 });

  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('status')
    .eq('order_code', code)
    .single();

  if (!order) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });

  return new Response(JSON.stringify({ status: order.status }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
