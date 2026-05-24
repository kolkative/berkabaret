import { Resend } from 'resend';
import { createHash } from 'crypto';

const MAYAR_API_URL = "https://api.mayar.id/hl/v1";
async function createMayarInvoice(params) {
  const response = await fetch(`${MAYAR_API_URL}/payment/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdjODc4Zi1lZDYyLTQxMGUtYTQ0NC04ZDg3ZmNiNmE1NDciLCJhY2NvdW50SWQiOiI2YmJmM2U5Ni1iYmZkLTQwMWItODg1ZC0xMmVmNGFkNmY3NGYiLCJjcmVhdGVkQXQiOiIxNzc5NjQ4NzY5MzIzIiwicm9sZSI6ImRldmVsb3BlciIsInNjb3BlIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwic3ViIjoia29sa2F0aXZlQGdtYWlsLmNvbSIsIm5hbWUiOiJLb2xrYXRpdmUgQ29tcG91bmQiLCJsaW5rIjoia29sa2F0aXZlIiwiaXNTZWxmRG9tYWluIjpudWxsLCJpYXQiOjE3Nzk2NDg3Njl9.XvX4kBk4RbGD7CV51jbmx60YbY6JAXxQPmm9spimD1ZaqndH2eeihPbQNN2zufBSHYC6m1R-SXWzvaVhPuQpzfjh5cnBW14_3_Os958_Ahg_gEmjbkE7TXQ53GJoVAVlvcq7p0ylo-6GEEI9i4-VD5QdeM_zCumXux6U6gqaxgMfBP8vJBY7DugIqTJN8SD5W8ZxNJGgdqKom6NtrxqrglbDAucYsP1vLSuH7PQUmA-fBiO0fhfOABEQ24h93o22J40tuZKEl-VywrtauPhoHbag9OoBAOVUGRa3nAcb-cyMZirM6xQH_jRrdHLkEH4ffWVAwXEwlQua_lWZ9DV63A"}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: params.buyerName,
      email: params.buyerEmail,
      mobile: params.buyerPhone,
      amount: params.amount,
      description: params.description,
      externalId: params.orderCode,
      expiredAt: params.expiredAt
    })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mayar API error: ${JSON.stringify(error)}`);
  }
  return response.json();
}
function verifyMayarWebhook(payload, signature) {
  {
    return false;
  }
}

const resend = new Resend("re_6bPqrgGZ_G7LkvjzcGXoHUkUN53t2SLmF");
async function sendTicketEmail(order, event) {
  const eventDate = new Date(event.date_start).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const eventTime = new Date(event.date_start).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'DM Sans', Arial, sans-serif; background: #0a0a0f; color: #fff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding: 40px 0; border-bottom: 1px solid #252535; }
    .header h1 { font-size: 28px; color: #c040ef; margin: 0; letter-spacing: -0.5px; }
    .ticket-box { background: #111118; border: 1px solid #252535; border-radius: 16px; padding: 32px; margin: 32px 0; }
    .ticket-title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .ticket-meta { color: #888; font-size: 14px; margin-bottom: 24px; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #1a1a25; }
    .detail-label { color: #666; font-size: 14px; }
    .detail-value { color: #fff; font-size: 14px; font-weight: 600; }
    .qr-section { text-align: center; padding: 32px; background: #fff; border-radius: 12px; margin: 24px 0; }
    .qr-code { font-size: 48px; letter-spacing: 4px; font-weight: 900; color: #0a0a0f; }
    .qr-label { color: #555; font-size: 12px; margin-top: 8px; }
    .status-badge { display: inline-block; background: #16a34a; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: 600; }
    .footer { text-align: center; color: #444; font-size: 13px; padding-top: 32px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎫 Tiket Berhasil!</h1>
      <p style="color: #666; margin: 8px 0 0;">Tunjukkan QR code ini saat masuk event</p>
    </div>

    <div class="ticket-box">
      <div class="ticket-title">${event.title}</div>
      <div class="ticket-meta">${eventDate} · ${eventTime} WIB</div>

      <div class="detail-row">
        <span class="detail-label">Kode Order</span>
        <span class="detail-value">${order.order_code}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Nama</span>
        <span class="detail-value">${order.buyer_name}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Jenis Tiket</span>
        <span class="detail-value">${order.ticket_type_name}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Jumlah</span>
        <span class="detail-value">${order.quantity} tiket</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Total Bayar</span>
        <span class="detail-value">Rp ${order.total_amount.toLocaleString("id-ID")}</span>
      </div>
      <div class="detail-row" style="border: none;">
        <span class="detail-label">Status</span>
        <span class="status-badge">✓ LUNAS</span>
      </div>
    </div>

    <div class="qr-section">
      <div class="qr-code">${order.qr_code}</div>
      <div class="qr-label">Tunjukkan kode ini kepada panitia</div>
    </div>

    <div class="footer">
      <p>📍 ${event.venue}</p>
      <p>Simpan email ini sebagai bukti tiket. Jangan bagikan ke orang lain.</p>
    </div>
  </div>
</body>
</html>
  `;
  await resend.emails.send({
    from: "noreply@berkabaret.com",
    to: order.buyer_email,
    subject: `🎫 Tiket ${event.title} — ${order.order_code}`,
    html
  });
}
async function sendPendingEmail(order, event, paymentUrl) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #0a0a0f; color: #fff; padding: 40px 20px;">
  <div style="max-width: 500px; margin: 0 auto;">
    <h2 style="color: #c040ef;">Order Diterima — Selesaikan Pembayaran</h2>
    <p>Halo <strong>${order.buyer_name}</strong>,</p>
    <p>Order tiket <strong>${event.title}</strong> kamu sudah diterima. Selesaikan pembayaran dalam <strong>15 menit</strong>.</p>
    <div style="background: #111118; border-radius: 12px; padding: 24px; margin: 24px 0;">
      <p><strong>Kode Order:</strong> ${order.order_code}</p>
      <p><strong>Total:</strong> Rp ${order.total_amount.toLocaleString("id-ID")}</p>
    </div>
    <a href="${paymentUrl}" style="display: inline-block; background: #c040ef; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
      Bayar Sekarang →
    </a>
    <p style="color: #555; font-size: 13px; margin-top: 24px;">Link pembayaran akan expired otomatis dalam 15 menit.</p>
  </div>
</body>
</html>
  `;
  await resend.emails.send({
    from: "noreply@berkabaret.com",
    to: order.buyer_email,
    subject: `[PENDING] Order ${order.order_code} — Selesaikan Pembayaran`,
    html
  });
}

function generateOrderCode() {
  const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TKT-${date}-${rand}`;
}
function generateQRCode(orderCode) {
  const hash = createHash("sha256").update(orderCode + Date.now().toString()).digest("hex").slice(0, 8).toUpperCase();
  return hash;
}
function getExpiredAt() {
  const d = /* @__PURE__ */ new Date();
  d.setMinutes(d.getMinutes() + 15);
  return d.toISOString();
}

export { generateQRCode as a, getExpiredAt as b, createMayarInvoice as c, sendTicketEmail as d, generateOrderCode as g, sendPendingEmail as s, verifyMayarWebhook as v };
