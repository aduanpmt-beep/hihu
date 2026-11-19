// Generator teks template pesanan WhatsApp dan pembuat tautan wa.me sesuai BL-03 PRD

import { MANDATORY_COPY, STORE_INFO } from '../config';
import type { CalculationResult } from './calculator';
import { formatDecimal, formatRupiah } from './format';

export interface WhatsAppOrderPayload {
  customerName: string;
  pickupAddress: string;
  notes: string;
  hasDelivery: boolean;
  hasFragrance: boolean;
  estimate: CalculationResult;
}

/**
 * Menyusun pesan pesanan WhatsApp sesuai template baku PRD dengan angka identik dengan layar.
 */
export function buildWhatsAppMessage(payload: WhatsAppOrderPayload): string {
  const { estimate, customerName, pickupAddress, notes, hasDelivery, hasFragrance } =
    payload;

  const actualWeightText = formatDecimal(estimate.actualWeightKg ?? 0);
  const billedWeightText = formatDecimal(estimate.billedWeightKg);
  const deliveryLine = hasDelivery
    ? `Ya (+${formatRupiah(estimate.deliveryCost)})`
    : 'Tidak';
  const fragranceLine = hasFragrance
    ? `Ya (+${formatRupiah(estimate.fragranceCost)})`
    : 'Tidak';
  const addressText = hasDelivery
    ? pickupAddress.trim()
    : MANDATORY_COPY.selfDropoffLabel;
  const notesText = notes.trim() !== '' ? notes.trim() : '-';
  const totalText = formatRupiah(estimate.totalCost);

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${customerName.trim()}`,
    `*Layanan Utama:* ${estimate.service.name}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${fragranceLine}`,
    '',
    `*Alamat Penjemputan:* ${addressText}`,
    `*Catatan Khusus:* ${notesText}`,
    '',
    `*Estimasi Total Biaya:* *${totalText}*`,
    '',
    `_(Catatan: ${MANDATORY_COPY.estimationNotice})_`,
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/**
 * Membuat tautan deep-link WhatsApp dengan parameter text yang di-encode aman.
 */
export function buildWhatsAppUrl(
  payload: WhatsAppOrderPayload,
  phoneNumber: string = STORE_INFO.whatsappNumber,
): string {
  const sanitizedPhone = phoneNumber.replace(/\D/g, '');
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Membuka tautan WhatsApp di tab baru memakai elemen tautan aman tanpa window.open.
 */
export function openExternalLinkInNewTab(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
