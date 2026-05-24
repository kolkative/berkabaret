import { createHash } from 'crypto';

// Generate order code unik: TKT-YYYYMMDD-XXXX
export function generateOrderCode(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TKT-${date}-${rand}`;
}

// Generate QR code unik untuk masuk event
export function generateQRCode(orderCode: string): string {
  const hash = createHash('sha256')
    .update(orderCode + Date.now().toString())
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();
  return hash;
}

// Format Rupiah
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Expired 15 menit dari sekarang
export function getExpiredAt(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 15);
  return d.toISOString();
}
