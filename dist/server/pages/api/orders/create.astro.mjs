import { s as supabaseAdmin } from '../../../chunks/supabase_BE5k4aVa.mjs';
import { g as generateOrderCode, a as generateQRCode, b as getExpiredAt, c as createMayarInvoice, s as sendPendingEmail } from '../../../chunks/utils_DJGZmpau.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { event_slug, ticket_type_id, ticket_type_name, quantity, buyer_name, buyer_email, buyer_phone } = body;
    if (!event_slug || !ticket_type_id || !buyer_name || !buyer_email || !buyer_phone || !quantity) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), { status: 400 });
    }
    const { data: event, error: eventErr } = await supabaseAdmin.from("events").select("*").eq("slug", event_slug).eq("is_active", true).single();
    if (eventErr || !event) {
      return new Response(JSON.stringify({ message: "Event tidak ditemukan" }), { status: 404 });
    }
    const ticketType = event.ticket_types?.find((t) => t.id === ticket_type_id);
    if (!ticketType) {
      return new Response(JSON.stringify({ message: "Jenis tiket tidak valid" }), { status: 400 });
    }
    const remaining = ticketType.quota - ticketType.sold;
    if (remaining < quantity) {
      return new Response(JSON.stringify({ message: `Tiket tidak cukup. Tersedia: ${remaining}` }), { status: 400 });
    }
    const totalAmount = ticketType.price * quantity;
    const orderCode = generateOrderCode();
    const qrCode = generateQRCode(orderCode);
    const expiredAt = getExpiredAt();
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
          expiredAt
        });
        mayarInvoiceId = mayarRes.data?.id ?? mayarRes.id;
        mayarPaymentUrl = mayarRes.data?.paymentUrl ?? mayarRes.paymentUrl;
      } catch (err) {
        console.error("Mayar error:", err);
        return new Response(JSON.stringify({ message: "Gagal membuat invoice pembayaran" }), { status: 500 });
      }
    }
    const { data: order, error: orderErr } = await supabaseAdmin.from("orders").insert({
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
      status: totalAmount === 0 ? "PAID" : "PENDING",
      mayar_invoice_id: mayarInvoiceId,
      mayar_payment_url: mayarPaymentUrl,
      qr_code: totalAmount === 0 ? qrCode : null,
      // QR hanya di-set saat gratis/sudah bayar
      expired_at: expiredAt,
      paid_at: totalAmount === 0 ? (/* @__PURE__ */ new Date()).toISOString() : null
    }).select().single();
    if (orderErr) {
      console.error("Supabase error:", orderErr);
      return new Response(JSON.stringify({ message: "Gagal menyimpan order" }), { status: 500 });
    }
    if (totalAmount > 0 && mayarPaymentUrl) {
      try {
        await sendPendingEmail(order, event, mayarPaymentUrl);
      } catch (err) {
        console.error("Email error (non-fatal):", err);
      }
    }
    return new Response(JSON.stringify({
      success: true,
      order_code: orderCode,
      payment_url: mayarPaymentUrl
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Create order error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
