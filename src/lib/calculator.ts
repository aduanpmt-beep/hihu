// Mesin hitung estimasi biaya laundry berdasarkan aturan BL-01 dan BL-02 PRD

import {
  DELIVERY_ADDON,
  FRAGRANCE_ADDON,
  MAIN_SERVICES,
  STORE_INFO,
  WEIGHT_RULES,
  type MainService,
  type ServiceCode,
} from '../config';

export interface CalculationInput {
  serviceCode: ServiceCode;
  actualWeightKg: number | null;
  hasDelivery: boolean;
  hasFragrance: boolean;
}

export interface CalculationResult {
  isValid: boolean;
  service: MainService;
  actualWeightKg: number | null;
  billedWeightKg: number;
  isMinimumChargeApplied: boolean;
  mainServiceCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addOnsTotalCost: number;
  totalCost: number;
}

/**
 * Mengambil objek layanan utama berdasarkan kode dari konfigurasi.
 */
export function getServiceByCode(code: ServiceCode): MainService {
  return MAIN_SERVICES.find((item) => item.code === code) ?? MAIN_SERVICES[1];
}

/**
 * BL-01: Menghitung berat ditagih dengan batas minimum 3,0 kg.
 */
export function calculateBilledWeight(actualWeightKg: number): number {
  return Math.max(STORE_INFO.minimumChargeKg, actualWeightKg);
}

/**
 * BL-01 & BL-02: Menghitung rincian biaya utama, biaya tambahan, dan total estimasi.
 */
export function calculateEstimate(input: CalculationInput): CalculationResult {
  const service = getServiceByCode(input.serviceCode);
  const weight = input.actualWeightKg;

  if (weight === null || !Number.isFinite(weight) || weight < WEIGHT_RULES.minKg) {
    return {
      isValid: false,
      service,
      actualWeightKg: weight,
      billedWeightKg: 0,
      isMinimumChargeApplied: false,
      mainServiceCost: 0,
      deliveryCost: 0,
      fragranceCost: 0,
      addOnsTotalCost: 0,
      totalCost: 0,
    };
  }

  const billedWeightKg = calculateBilledWeight(weight);
  const isMinimumChargeApplied = weight < STORE_INFO.minimumChargeKg;

  const mainServiceCost = Math.round(billedWeightKg * service.pricePerKg);
  const deliveryCost = input.hasDelivery ? DELIVERY_ADDON.price : 0;
  const fragranceCost = input.hasFragrance
    ? Math.round(billedWeightKg * FRAGRANCE_ADDON.price)
    : 0;
  const addOnsTotalCost = deliveryCost + fragranceCost;
  const totalCost = mainServiceCost + addOnsTotalCost;

  return {
    isValid: true,
    service,
    actualWeightKg: weight,
    billedWeightKg,
    isMinimumChargeApplied,
    mainServiceCost,
    deliveryCost,
    fragranceCost,
    addOnsTotalCost,
    totalCost,
  };
}
