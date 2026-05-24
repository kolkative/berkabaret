import { Resend } from 'resend';
import type { Order, Event } from './supabase';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendTicketEmail(order: Order, event: Event) {
  const eventDate = new Date(event.date_start).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const eventTime = new Date(event.date_start).toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
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
        <span class="detail-value">Rp ${order.total_amount.toLocaleString('id-ID')}</span>
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
    from: import.meta.env.EMAIL_FROM,
    to: order.buyer_email,
    subject: `🎫 Tiket ${event.title} — ${order.order_code}`,
    html,
  });
}

export async function sendPendingEmail(order: Order, event: Event, paymentUrl: string) {
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
      <p><strong>Total:</strong> Rp ${order.total_amount.toLocaleString('id-ID')}</p>
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
    from: import.meta.env.EMAIL_FROM,
    to: order.buyer_email,
    subject: `[PENDING] Order ${order.order_code} — Selesaikan Pembayaran`,
    html,
  });
}
