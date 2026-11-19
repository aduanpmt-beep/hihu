// Fungsi pemformatan angka Rupiah, angka desimal Indonesia, dan pengurai input berat

/**
 * Memformat angka bulat menjadi format Rupiah tanpa spasi, contoh: Rp50.000.
 */
export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? '-' : '';
  const digits = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}Rp${digits}`;
}

/**
 * Memformat angka desimal Indonesia memakai koma tanpa nol di belakang, contoh: 4,5 dan 3.
 */
export function formatDecimal(value: number): string {
  const normalized = Math.round(value * 100) / 100;
  return normalized.toString().replace('.', ',');
}

/**
 * Mengurai teks input berat yang menerima tanda koma maupun titik sebagai pemisah desimal.
 * Mengembalikan null apabila teks kosong atau bukan angka yang sah.
 */
export function parseWeightInput(rawValue: string): number | null {
  const cleaned = rawValue.trim().replace(/\s+/g, '');
  if (cleaned === '') {
    return null;
  }

  // Tolak jika terdapat lebih dari satu pemisah desimal atau karakter non-angka
  if (!/^-?\d+([.,]\d+)?$/.test(cleaned)) {
    return null;
  }

  const parsed = Number(cleaned.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}
