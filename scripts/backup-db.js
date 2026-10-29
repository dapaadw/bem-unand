// Backup database dan berkas media untuk BEM FH UNAND (PostgreSQL v18 / SQLite)
// Run: node --env-file=.env scripts/backup-db.js
// Weekly scheduling and off-site copies must be configured on the deployment server via cron / systemd timer.
import { mkdir, cp, writeFile, access, readdir, stat, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RETENTION_MS = 90 * 24 * 60 * 60 * 1000; // 90 hari

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dbUrl = process.env.DATABASE_URL || '';

if (!dbUrl) {
  throw new Error('DATABASE_URL tidak ditemukan di environment.');
}

const backupsDir = path.join(root, 'backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const destination = path.join(backupsDir, `snapshot-${timestamp}`);
await mkdir(destination, { recursive: true });

let dbBackupFile = '';

if (dbUrl.startsWith('postgresql:') || dbUrl.startsWith('postgres:')) {
  // PostgreSQL Backup using pg_dump
  dbBackupFile = 'database.sql';
  const dumpPath = path.join(destination, dbBackupFile);

  console.log('Menjalankan pg_dump untuk PostgreSQL database...');
  try {
    // Jalankan pg_dump dengan URL database
    execSync(`pg_dump "${dbUrl}" --clean --if-exists --no-owner --no-privileges -f "${dumpPath}"`, {
      stdio: 'inherit',
    });
    console.log(`✓ Database dump berhasil disimpan: ${dumpPath}`);
  } catch (error) {
    console.error('Peringatan: pg_dump gagal atau belum terpasang di sistem PATH.');
    console.error('Pastikan PostgreSQL client tools (pg_dump) terpasang di server.');
    throw error;
  }
} else if (dbUrl.startsWith('file:')) {
  // SQLite Fallback
  dbBackupFile = 'database.db';
  const source = path.resolve(root, 'prisma', dbUrl.slice(5));
  await access(source);
  const snapshot = path.join(destination, dbBackupFile);
  
  const { PrismaClient } = await import('@prisma/client');
  const db = new PrismaClient({ datasourceUrl: 'file:' + source });
  try {
    await db.$executeRawUnsafe("VACUUM INTO '" + snapshot.replace(/'/g, "''") + "'");
  } finally {
    await db.$disconnect();
  }
} else {
  throw new Error(`Format DATABASE_URL tidak didukung: ${dbUrl}`);
}

// Salin file upload media
const publicUploadsDir = path.join(root, 'public', 'uploads');
try {
  await access(publicUploadsDir);
  await cp(publicUploadsDir, path.join(destination, 'public-uploads'), {
    recursive: true,
    dereference: false,
  });
  console.log('✓ Media public/uploads berhasil disalin.');
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}

await writeFile(
  path.join(destination, 'manifest.json'),
  JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      database: dbBackupFile,
      publicUploads: 'public-uploads',
      note: 'Snapshot otomatis sistem BEM FH UNAND. Simpan secara aman dan privat.',
    },
    null,
    2,
  ),
);

// Prune snapshots lebih lama dari 90 hari
try {
  const entries = await readdir(backupsDir, { withFileTypes: true });
  const now = Date.now();
  for (const entry of entries) {
    if (!entry.isDirectory() || !entry.name.startsWith('snapshot-')) continue;
    const entryPath = path.join(backupsDir, entry.name);
    if (entryPath === destination) continue;
    const info = await stat(entryPath).catch(() => null);
    if (info && now - info.mtimeMs > RETENTION_MS) {
      await rm(entryPath, { recursive: true, force: true });
      console.log('Menghapus snapshot kadaluarsa (>90 hari): ' + entry.name);
    }
  }
} catch (e) {
  console.warn('Gagal merapikan snapshot lama:', e.message);
}

console.log('====================================================');
console.log('Backup selesai! Lokasi: ' + destination);
console.log('====================================================');
