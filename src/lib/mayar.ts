// Mayar QRIS Dinamis Integration
// Docs: https://mayar.id/docs

import { createHmac } from 'node:crypto';

const MAYAR_API_URL = 'https://api.mayar.id/hl/v1';

export async function createMayarInvoice(params: {
  orderCode: string;
  amount: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  description: string;
  expiredAt: string; // ISO string
}) {
  const response = await fetch(`${MAYAR_API_URL}/payment/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.MAYAR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: params.buyerName,
      email: params.buyerEmail,
      mobile: params.buyerPhone,
      amount: params.amount,
      description: params.description,
      externalId: params.orderCode,
      expiredAt: params.expiredAt,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mayar API error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export function verifyMayarWebhook(payload: string, signature: string): boolean {
  const secret = import.meta.env.MAYAR_WEBHOOK_SECRET;

  if (!secret) {
    return false;
  }

  const expectedSig = createHmac('sha256', secret).update(payload).digest('hex');
  return expectedSig === signature;
}
