// Validasi input berat dan formulir data pemesan sesuai aturan BL-01 dan BL-03 PRD

import { WEIGHT_RULES } from '../config';
import { parseWeightInput } from './format';

export interface OrderFormValues {
  weightRaw: string;
  customerName: string;
  pickupAddress: string;
  notes: string;
  hasDelivery: boolean;
}

export interface ValidationErrors {
  weight?: string;
  customerName?: string;
  pickupAddress?: string;
}

export type ValidationFieldKey = keyof ValidationErrors;

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
  firstErrorField: ValidationFieldKey | null;
  cleanedName: string;
  cleanedAddress: string;
  cleanedNotes: string;
  parsedWeight: number | null;
}

/**
 * Memeriksa kelengkapan dan kesesuaian data berat, nama, serta alamat penjemputan.
 */
export function validateOrderForm(values: OrderFormValues): ValidationResult {
  const errors: ValidationErrors = {};
  const parsedWeight = parseWeightInput(values.weightRaw);
  const cleanedName = values.customerName.trim();
  const cleanedAddress = values.pickupAddress.trim();
  const cleanedNotes = values.notes.trim();

  if (parsedWeight === null || parsedWeight <= 0) {
    errors.weight = 'Masukkan estimasi berat lebih dari 0 kg, misalnya 2,5.';
  } else if (parsedWeight < WEIGHT_RULES.minKg) {
    errors.weight = 'Masukkan estimasi berat minimal 0,1 kg, misalnya 2,5.';
  }

  if (cleanedName.length === 0) {
    errors.customerName = 'Isi nama Anda terlebih dahulu, misalnya Budi Santoso.';
  }

  if (values.hasDelivery && cleanedAddress.length === 0) {
    errors.pickupAddress =
      'Isi alamat penjemputan lengkap, misalnya Jl. Mawar No. 12, RT 02.';
  }

  const orderedFields: ValidationFieldKey[] = [
    'weight',
    'customerName',
    'pickupAddress',
  ];
  const firstErrorField =
    orderedFields.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
    cleanedName,
    cleanedAddress,
    cleanedNotes,
    parsedWeight,
  };
}
