import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { createMayarInvoice } from '../../../lib/mayar';
import { sendPendingEmail } from '../../../lib/email';
import { generateOrderCode, generateQRCode, getExpiredAt } from '../../../lib/utils';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { event_slug, ticket_type_id, ticket_type_name, quantity, buyer_name, buyer_email, buyer_phone } = body;

    // Validasi input
    if (!event_slug || !ticket_type_id || !buyer_name || !buyer_email || !buyer_phone || !quantity) {
      return new Response(JSON.stringify({ message: 'Data tidak lengkap' }), { status: 400 });
    }

    // Ambil event
    const { data: event, error: eventErr } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('slug', event_slug)
      .eq('is_active', true)
      .single();

    if (eventErr || !event) {
      return new Response(JSON.stringify({ message: 'Event tidak ditemukan' }), { status: 404 });
    }

    // Validasi ticket type & ketersediaan
    const ticketType = event.ticket_types?.find((t: any) => t.id === ticket_type_id);
    if (!ticketType) {
      return new Response(JSON.stringify({ message: 'Jenis tiket tidak valid' }), { status: 400 });
    }

    const remaining = ticketType.quota - ticketType.sold;
    if (remaining < quantity) {
      return new Response(JSON.stringify({ message: `Tiket tidak cukup. Tersedia: ${remaining}` }), { status: 400 });
    }

    const totalAmount = ticketType.price * quantity;
    const orderCode = generateOrderCode();
    const qrCode = generateQRCode(orderCode);
    const expiredAt = getExpiredAt();

    // Buat invoice di Mayar
    let mayarInvoiceId = null;
    let mayarPaymentUrl = null;

    if (totalAmount > 0) {
      try {
        const mayarRes = await createMayarInvoice({
          orderCode,
          amount: totalAmount,
          buyerName: buyer_name,
          buyerEmail: buyer_email,
          buyerPhone: buyer_phone,
          description: `Tiket ${event.title} — ${ticket_type_name} x${quantity}`,
          expiredAt,
        });
        mayarInvoiceId = mayarRes.data?.id ?? mayarRes.id;
        mayarPaymentUrl = mayarRes.data?.paymentUrl ?? mayarRes.paymentUrl;
      } catch (err) {
        console.error('Mayar error:', err);
        return new Response(JSON.stringify({ message: 'Gagal membuat invoice pembayaran' }), { status: 500 });
      }
    }

    // Simpan order ke Supabase
    const { data: order, error: orderErr } = await supabaseAdmin
      .from('orders')
      .insert({
        order_code: orderCode,
        event_id: event.id,
        ticket_type_id,
        ticket_type_name,
        buyer_name,
        buyer_email,
        buyer_phone,
        quantity,
        price_per_ticket: ticketType.price,
        total_amount: totalAmount,
        status: totalAmount === 0 ? 'PAID' : 'PENDING',
        mayar_invoice_id: mayarInvoiceId,
        mayar_payment_url: mayarPaymentUrl,
        qr_code: totalAmount === 0 ? qrCode : null, // QR hanya di-set saat gratis/sudah bayar
        expired_at: expiredAt,
        paid_at: totalAmount === 0 ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (orderErr) {
      console.error('Supabase error:', orderErr);
      return new Response(JSON.stringify({ message: 'Gagal menyimpan order' }), { status: 500 });
    }

    // Kirim email notifikasi pending
    if (totalAmount > 0 && mayarPaymentUrl) {
      try {
        await sendPendingEmail(order, event, mayarPaymentUrl);
      } catch (err) {
        console.error('Email error (non-fatal):', err);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      order_code: orderCode,
      payment_url: mayarPaymentUrl,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Create order error:', err);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};
