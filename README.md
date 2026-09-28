# BEM FH UNAND

Website Next.js dengan Prisma/SQLite. `src/` adalah aplikasi aktif; `legacy-vite-src/` menyimpan kode lama.

## Menjalankan lokal

Dari folder proyek, pastikan dependency sudah terpasang dan `.env` tersedia.
Untuk checkout baru: `npm ci`, salin `.env.example` ke `.env`, lalu isi konfigurasi.
Jangan menimpa `.env` atau database yang sudah berisi data.

```powershell
npx prisma migrate deploy
npx prisma generate
npm run dev
```

Buka http://localhost:3000. Login melalui /admin/login menggunakan akun proyek yang sudah tersedia.
Pada Windows, hentikan server Next terlebih dahulu jika Prisma generate gagal karena engine DLL sedang dipakai.
Jangan menjalankan seed pada database aktif hanya untuk mencoba fitur.

## Aspirasi dan data dummy

1. Field Jenis Pengajuan sementara: ASPIRASI, KELUHAN, SARAN, LAINNYA.
2. Keluh Kesah digunakan sebagai ringkasan, Deskripsi sebagai penjelasan lengkap.
3. Anonim tidak menyimpan nama, NIM, CP, atau email. Non-anonim mewajibkan nama dan NIM.
4. Rekap CSV berada di /admin/aspirasi; filter tanggal memakai WIB dan tanggal akhir termasuk satu hari penuh.
5. Bukti JPG/PNG maksimal 500 KB disimpan di `storage/aspirasi`, atau `ASPIRASI_UPLOAD_DIR`.
   Folder ini harus privat dan persisten, di luar `public/`. File diakses melalui endpoint khusus ADMIN.
   Server statis/reverse proxy juga tidak boleh mempublikasikan folder storage atau backups.
6. Untuk uji lokal, set `ASPIRASI_NOTIFICATION_MODE=mock`. Mode ini tidak mengirim email.
   Untuk pengiriman nyata, ganti menjadi `smtp` atau hapus variabel mode; isi SMTP_HOST,
   SMTP_PORT, SMTP_USER, SMTP_PASS, dan ASPIRASI_NOTIFY_EMAIL. Tanpa SMTP/tujuan, email dilewati.
   Tiket tetap tersimpan jika email gagal; implementasi saat ini belum memiliki antrean retry email.
7. Pilihan kategori, aturan identitas, makna ringkasan/deskripsi, dan CSV vs Google Sheets
   masih merupakan asumsi implementasi yang perlu dikonfirmasi klien.

## Verifikasi

```powershell
npm run lint
npm run build
node --env-file=.env scripts/verify-home.mjs
node --env-file=.env scripts/verify-publications.mjs
node --env-file=.env scripts/verify-kegiatan.mjs
node --env-file=.env scripts/verify-departemen.mjs
node --env-file=.env scripts/verify-final.mjs
npm run build
```

Jalankan skrip secara berurutan. Skrip memakai salinan database pada .next dan port 3101–3105.
Skrip final juga memisahkan bukti upload serta memaksa notifikasi mock.
Jangan jalankan bersamaan dengan server produksi yang memakai build .next yang sama.
Build terakhir mengembalikan hasil prerender/cache dari database utama setelah pengujian.

Untuk review browser dengan data dummy:
```powershell
$env:FINAL_VERIFY_REVIEW='1'
node --env-file=.env scripts/verify-final.mjs
```
Alamat dan akun sementara ditampilkan di terminal. Tekan Enter setelah review untuk menutup server
dan menghapus salinan data. Akun dan tiket tersebut tidak berlaku pada website utama.
Jalankan logout pada browser sebelum kembali ke server utama karena cookie localhost berbagi host.

## Backup dan pemulihan

```powershell
node --env-file=.env scripts/backup-db.js
```

Hasil berada di `backups/snapshot-<waktu>/`: database.db, manifest.json,
public-uploads (bila ada), dan aspirasi-private (bila ada).
Database disalin melalui [SQLite VACUUM INTO](https://www.sqlite.org/lang_vacuum.html)
dan diperiksa dengan integrity_check. Backup lama dipertahankan.
Saat media sedang diganti/dihapus, hentikan penulisan sementara agar snapshot database dan file selaras.

Pemulihan: hentikan aplikasi, amankan data saat ini, lalu pulihkan database.db ke lokasi DATABASE_URL,
public-uploads ke public/uploads, dan aspirasi-private ke ASPIRASI_UPLOAD_DIR.
Pertahankan izin akses privat. Periksa integritas dan data pada salinan terlebih dahulu sebelum
menjadikannya database aktif. Jangan menimpa database aktif tanpa backup.

NF-4 belum final: penyedia server Unand perlu menjadwalkan perintah backup setiap 7 hari dengan
working directory proyek, penyimpanan persisten, kebijakan retensi, dan salinan di lokasi terpisah.
Skrip tidak memasang scheduler atau menghapus backup lama otomatis.

## Sebelum produksi

Gunakan SESSION_SECRET yang kuat, akun resmi, SMTP nyata bila diperlukan, dan HTTPS pada server.
Aplikasi production menggunakan HttpOnly + Secure + SameSite cookie dan password bcrypt.
Jalankan migrasi, generate, build, kemudian npm run start pada server yang telah dikonfigurasi.
Uji target load <3 detik di server/jaringan tujuan; hasil tes lokal bukan jaminan performa produksi.
Aset foto/video, daftar departemen, link Drive/Form, dan FAQ resmi tetap harus diberikan klien.
Tidak ada deploy atau pengiriman pesan ke pihak luar yang dilakukan oleh skrip verifikasi.
