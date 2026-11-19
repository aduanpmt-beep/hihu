# Keputusan Desain LaundryCalc

## Pilihan Pengguna

| Keputusan | Pilihan Dipakai |
| :--- | :--- |
| Nama aplikasi | LaundryCalc |
| Kesan visual | Ramah dan hangat (Plus Jakarta Sans) |
| Warna aksen | Biru (`blue`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir (dua kolom di desktop) |
| Posisi aksi utama | Bar menempel di bawah layar ponsel, panel lengket di sisi kanan desktop |
| Gambar | Tanpa gambar |

## Token Visual

- **Font**: `@fontsource/plus-jakarta-sans` ketebalan 400, 500, dan 600 (terpasang lokal via npm).
- **Latar halaman**: `bg-neutral-50`.
- **Kartu dan panel**: `bg-white`, sudut `rounded-2xl`, tanpa kartu di dalam kartu.
- **Garis tepi**: `border-neutral-200` untuk input, pemisah, dan kartu tidak terpilih.
- **Teks**: Utama `text-neutral-900`, pendukung `text-neutral-600`, placeholder `text-neutral-500`.
- **Aksen biru**:
  - Tombol utama: `bg-blue-700`, hover `bg-blue-800`, teks putih.
  - Teks aksen: `text-blue-700`.
  - Elemen terpilih: `border-blue-700 bg-blue-50`.
  - Cincin fokus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`.
- **Status**:
  - Peringatan minimum 3 kg: `bg-amber-50 text-amber-800` disertai ikon dan label teks.
  - Error validasi: `bg-red-50 text-red-800` / `text-red-700` disertai ikon dan contoh perbaikan.
- **Tipografi**: Judul halaman `text-2xl`, judul bagian `text-lg`, isi & input `text-base`, label `text-sm`, angka total utama `text-3xl`, semua angka memakai `tabular-nums`.
- **Bayangan melayang**: Hanya pada bar ringkasan bawah layar ponsel memakai `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`.
- **Bentuk komponen per fitur**:
  - FT-01 Katalog layanan: Kartu radio satu pilihan dengan tarif, durasi, dan deskripsi ringkas.
  - FT-02 Input berat: Kolom angka desimal disertai tombol kurang dan tambah per `0,1` kg serta penanda peringatan minimum 3 kg.
  - FT-03 Tambahan: Kartu checkbox mandiri untuk Antar-Jemput dan Pewangi Premium.
  - FT-04 & FT-06 Ringkasan dan kirim: Bar menempel ringkas di bawah layar ponsel (dengan tombol buka/tutup rincian) dan panel lengket di kanan pada layar desktop.
  - FT-05 Data pemesan: Formulir berlabel jelas dengan kolom alamat yang muncul otomatis saat Antar-Jemput aktif.
