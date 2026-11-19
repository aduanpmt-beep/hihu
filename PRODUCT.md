# Daftar Fitur LaundryCalc

Sumber: Product Requirements Document LaundryCalc & Catalog v1.1 (MVP v0.1).

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | Tidak ada | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | Tidak ada | Ditunda |

## Keputusan Klarifikasi PRD

1. **Format Rupiah**: Konsisten tanpa spasi dengan titik pemisah ribuan dan tanpa desimal (contoh: `Rp50.000`) di layar maupun di pesan WhatsApp.
2. **Keadaan awal kalkulator**: Paket **Cuci Setrika** (`L02`) terpilih dan berat awal terisi `3` kg saat halaman dibuka.
3. **Pembulatan biaya desimal**: Input menerima koma maupun titik minimal `0,1` kg; hasil perkalian dibulatkan ke rupiah bulat terdekat (`Math.round`).
4. **Nomor WhatsApp toko**: Memakai nomor contoh `6281234567890` di `src/config.ts` agar mudah diganti tim toko.
5. **Kolom alamat penjemputan**: Muncul dan wajib diisi hanya ketika opsi Antar-Jemput dicentang.
6. **Fitur FT-07**: Ditandai **Ditunda** atas permintaan pengguna sehingga jadwal operasional tidak ditampilkan di antarmuka saat ini.
