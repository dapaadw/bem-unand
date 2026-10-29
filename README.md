# Website Resmi BEM FH Universitas Andalas

Website resmi Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas (BEM FH UNAND). Dibangun menggunakan Next.js (App Router), Tailwind CSS, Prisma ORM, dan PostgreSQL.

---

## Kebutuhan Sistem

- Node.js: v20.x atau v22.x LTS
- Database: PostgreSQL v18 (atau v16+)
- NPM: v10+

---

## Setup & Instalasi

### 1. Konfigurasi Environment
Salin berkas `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Sesuaikan variabel environment utama:
- `DATABASE_URL`: Connection string PostgreSQL.
- `SESSION_SECRET`: String rahasia minimal 32 karakter untuk enkripsi cookie session. Cara membuatnya:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- `ADMIN_SEED_EMAIL` & `ADMIN_SEED_PASSWORD`: Akun awal admin (password minimal 8 karakter).
- `SUPERUSER_SEED_EMAIL` & `SUPERUSER_SEED_PASSWORD`: Akun awal superuser (password minimal 8 karakter).

### 2. Migrasi Database & Seeding
```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### 3. Menjalankan Aplikasi
- Mode Development:
  ```bash
  npm run dev
  ```
- Mode Production:
  ```bash
  npm run build
  npm run start
  ```

---

## Perintah NPM

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server development Next.js |
| `npm run build` | Menjalankan kompilasi produksi Next.js |
| `npm run start` | Menjalankan aplikasi mode produksi |
| `npm run lint` | Pemeriksaan kualitas kode via Oxlint |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Menjalankan migrasi database PostgreSQL |
| `npm run seed` | Mengisi data master departemen, proker, kontak, dan akun admin |
| `npm run backup` | Backup database PostgreSQL dan berkas upload |
| `npm run make-zip` | Membuat paket arsip zip untuk deployment |
