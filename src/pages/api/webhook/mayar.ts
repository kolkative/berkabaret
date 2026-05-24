import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { sendTicketEmail } from '../../../lib/email';
import { generateQRCode } from '../../../lib/utils';
import { verifyMayarWebhook } from '../../../lib/mayar';

function normalizeStatus(value: unknown): string {
  return String(value ?? '').trim().toUpperCase();
}

function isPaidWebhook(payload: Record<string, any>): boolean {
  const eventType = normalizeStatus(payload.event ?? payload.type);
  const dataStatus = normalizeStatus(payload?.data?.status);
  const transactionStatus = normalizeStatus(payload?.data?.transactionStatus);
  const payloadStatus = normalizeStatus(payload?.status);

  if (eventType === 'PAYMENT.RECEIVED') {
    return ['SUCCESS', 'PAID'].includes(dataStatus || transactionStatus || payloadStatus);
  }

  return ['PAYMENT.SUCCESS', 'PAYMENT.PAID', 'PURCHASE'].includes(eventType) ||
    ['PAID', 'SUCCESS'].includes(dataStatus || payloadStatus);
}

function extractOrderCode(payload: Record<string, any>): string | null {
  const candidates = [
    payload?.data?.externalId,
    payload?.data?.referenceId,
    payload?.data?.orderCode,
    payload?.data?.id,
    payload?.externalId,
    payload?.referenceId,
    payload?.orderCode,
  ];

  const found = candidates.find((candidate) => typeof candidate === 'string' && candidate.trim().length > 0);
  return found ? String(found).trim() : null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();

    if (!rawBody.trim()) {
      return new Response(JSON.stringify({ error: 'Empty webhook payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const signature =
      request.headers.get('x-mayar-signature') ||
      request.headers.get('x-signature');

    if (signature && !verifyMayarWebhook(rawBody, signature)) {
      return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!signature && import.meta.env.MAYAR_WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ error: 'Missing webhook signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!import.meta.env.MAYAR_WEBHOOK_SECRET) {
      console.warn('MAYAR_WEBHOOK_SECRET is not configured; skipping webhook signature verification');
    }

    const payload = JSON.parse(rawBody) as Record<string, any>;
    const eventType = normalizeStatus(payload.event ?? payload.type);

    console.log('Mayar webhook received:', JSON.stringify(payload));

    if (eventType === 'PAYMENT.EXPIRED' || eventType === 'EXPIRED') {
      const externalId = extractOrderCode(payload);
      if (externalId) {
        await supabaseAdmin
          .from('orders')
          .update({ status: 'EXPIRED' })
          .eq('order_code', externalId)
          .eq('status', 'PENDING');
      }
      return new Response(JSON.stringify({ received: true, status: 'ignored', eventType }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isPaidWebhook(payload)) {
      return new Response(JSON.stringify({ received: true, ignored: true, eventType }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const externalId = extractOrderCode(payload);

    if (!externalId) {
      console.error('No externalId in payload:', payload);
      return new Response(JSON.stringify({ error: 'Missing externalId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: order, error: orderErr } = await supabaseAdmin
      .from('orders')
      .select('*, events(*)')
      .eq('order_code', externalId)
      .single();

    if (orderErr || !order) {
      console.error('Order not found:', externalId);
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (order.status === 'PAID') {
      return new Response(JSON.stringify({ received: true, status: 'already_paid' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const qrCode = generateQRCode(order.order_code);

    await supabaseAdmin
      .from('orders')
      .update({
        status: 'PAID',
        qr_code: qrCode,
        paid_at: new Date().toISOString(),
      })
      .eq('order_code', externalId);

    const { data: event } = await supabaseAdmin
      .from('events')
      .select('ticket_types')
      .eq('id', order.event_id)
      .single();

    if (event) {
      const updatedTypes = event.ticket_types.map((ticket: any) =>
        ticket.id === order.ticket_type_id
          ? { ...ticket, sold: (ticket.sold || 0) + (order.quantity || 1) }
          : ticket
      );

      await supabaseAdmin
        .from('events')
        .update({ ticket_types: updatedTypes })
        .eq('id', order.event_id);
    }

    try {
      await sendTicketEmail(order, order.events);
    } catch (emailErr) {
      console.error('Send ticket email failed (non-fatal):', emailErr);
    }

    return new Response(JSON.stringify({ received: true, status: 'processed', eventType }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
