// SQLite VACUUM INTO produces a consistent snapshot: https://www.sqlite.org/lang_vacuum.html
// Run: node --env-file=.env scripts/backup-db.js
// Weekly scheduling and off-site copies must be configured on the deployment server.
import { mkdir, cp, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fileUrl = process.env.DATABASE_URL || 'file:./dev.db';
if (!fileUrl.startsWith('file:')) throw new Error('Backup ini hanya mendukung SQLite.');
const source = path.resolve(root, 'prisma', fileUrl.slice(5));
await access(source);
const destination = path.join(root, 'backups', 'snapshot-' + new Date().toISOString().replace(/[:.]/g, '-'));
await mkdir(destination, { recursive: true });
const db = new PrismaClient({ datasourceUrl: 'file:' + source });
try {
  const snapshot = path.join(destination, 'database.db');
  await db.$executeRawUnsafe("VACUUM INTO '" + snapshot.replace(/'/g, "''") + "'");
  const check = new PrismaClient({ datasourceUrl: 'file:' + snapshot });
  try {
    const integrity = await check.$queryRawUnsafe('PRAGMA integrity_check');
    if (integrity.length !== 1 || integrity[0].integrity_check !== 'ok') throw new Error('Pemeriksaan backup gagal.');
  } finally { await check.$disconnect(); }
  for (const [sourceDir, name] of [[path.join(root, 'public', 'uploads'), 'public-uploads'], [path.resolve(root, process.env.ASPIRASI_UPLOAD_DIR || 'storage/aspirasi'), 'aspirasi-private']]) {
    try { await access(sourceDir); } catch (e) { if (e.code === 'ENOENT') continue; throw e; }
    await cp(sourceDir, path.join(destination, name), { recursive: true, dereference: false });
  }
  await writeFile(path.join(destination, 'manifest.json'), JSON.stringify({ createdAt: new Date().toISOString(), database: 'database.db', publicUploads: 'public-uploads', privateEvidence: 'aspirasi-private', note: 'Pause writes while backing up if replacing/deleting media concurrently. Keep complete snapshots private. Restore only with app stopped.' }, null, 2));
  console.log('Backup database dan berkas selesai: ' + destination);
  console.log('Backup lama dipertahankan; atur retensi dan jadwal mingguan pada server.');
} finally { await db.$disconnect(); }
