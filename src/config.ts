// Konfigurasi terpusat data bisnis dari PRD LaundryCalc dan pilihan desain pengguna

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddOnCode = 'T01' | 'T02';
export type AddOnCalculationType = 'flat' | 'per_billed_kg';

export interface MainService {
  readonly code: ServiceCode;
  readonly name: string;
  readonly pricePerKg: number;
  readonly durationDays: number;
  readonly description: string;
}

export interface AddOnService {
  readonly code: AddOnCode;
  readonly name: string;
  readonly price: number;
  readonly calculationType: AddOnCalculationType;
  readonly notes: string;
}

export const STORE_INFO = {
  appName: 'LaundryCalc',
  storeName: 'Laundry UMKM',
  whatsappNumber: '6281234567890',
  openingHours: '08.00-20.00 WIB',
  pickupHours: '09.00-17.00 WIB',
  pickupRadiusMaxKm: 5,
  minimumChargeKg: 3.0,
} as const;

export const WEIGHT_RULES = {
  minKg: 0.1,
  stepKg: 0.1,
  defaultKg: 3,
} as const;

export const DEFAULT_SERVICE_CODE: ServiceCode = 'L02';

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    pricePerKg: 6000,
    durationDays: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    pricePerKg: 8000,
    durationDays: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    pricePerKg: 15000,
    durationDays: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculationType: 'flat',
    notes: 'Area penjemputan radius maks 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculationType: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const DELIVERY_ADDON = ADD_ONS[0];
export const FRAGRANCE_ADDON = ADD_ONS[1];

export const MANDATORY_COPY = {
  estimationNotice:
    'Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry.',
  selfDropoffLabel: 'Antar Sendiri ke Toko',
} as const;

export const DESIGN_CONFIG = {
  tone: 'Ramah dan hangat',
  fontFamily: 'Plus Jakarta Sans',
  accentColor: 'blue',
  pronoun: 'Anda',
} as const;
