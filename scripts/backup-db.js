// SQLite VACUUM INTO produces a consistent snapshot: https://www.sqlite.org/lang_vacuum.html
// Run: node --env-file=.env scripts/backup-db.js
// Weekly scheduling and off-site copies must be configured on the deployment server.
import { mkdir, cp, writeFile, access, readdir, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';

const RETENTION_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fileUrl = process.env.DATABASE_URL || 'file:./dev.db';
if (!fileUrl.startsWith('file:')) throw new Error('Backup ini hanya mendukung SQLite.');
const source = path.resolve(root, 'prisma', fileUrl.slice(5));
await access(source);

const backupsDir = path.join(root, 'backups');
const destination = path.join(
  backupsDir,
  'snapshot-' + new Date().toISOString().replace(/[:.]/g, '-'),
);
await mkdir(destination, { recursive: true });

const db = new PrismaClient({ datasourceUrl: 'file:' + source });
try {
  const snapshot = path.join(destination, 'database.db');
  await db.$executeRawUnsafe("VACUUM INTO '" + snapshot.replace(/'/g, "''") + "'");
  const check = new PrismaClient({ datasourceUrl: 'file:' + snapshot });
  try {
    const integrity = await check.$queryRawUnsafe('PRAGMA integrity_check');
    if (integrity.length !== 1 || integrity[0].integrity_check !== 'ok') {
      throw new Error('Pemeriksaan backup gagal.');
    }
  } finally {
    await check.$disconnect();
  }

  const publicUploadsDir = path.join(root, 'public', 'uploads');
  try {
    await access(publicUploadsDir);
    await cp(publicUploadsDir, path.join(destination, 'public-uploads'), {
      recursive: true,
      dereference: false,
    });
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }

  await writeFile(
    path.join(destination, 'manifest.json'),
    JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        database: 'database.db',
        publicUploads: 'public-uploads',
        note: 'Pause writes while backing up if replacing/deleting media concurrently. Keep complete snapshots private. Restore only with app stopped.',
      },
      null,
      2,
    ),
  );

  // Prune snapshots older than 90 days
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

  console.log('Backup database dan berkas selesai: ' + destination);
} finally {
  await db.$disconnect();
}
