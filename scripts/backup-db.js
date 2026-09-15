// Simple SQLite backup: copies prisma/dev.db (or the file named in DATABASE_URL)
// into backups/ with a timestamped filename, and prunes backups older than
// RETENTION_DAYS. Intended to be run on a schedule (cron/Task Scheduler) —
// see README section "Backup otomatis" for how to wire that up once the
// campus server environment is confirmed.
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS || '90', 10);

function resolveDbPath() {
  const url = process.env.DATABASE_URL || 'file:./prisma/dev.db';
  const filePart = url.replace(/^file:/, '');
  return path.isAbsolute(filePart) ? filePart : path.resolve(ROOT, 'prisma', path.basename(filePart));
}

function main() {
  const dbPath = resolveDbPath();
  if (!existsSync(dbPath)) {
    console.error(`Database tidak ditemukan di ${dbPath}`);
    process.exit(1);
  }

  const backupDir = path.join(ROOT, 'backups');
  mkdirSync(backupDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dest = path.join(backupDir, `dev-${timestamp}.db`);
  copyFileSync(dbPath, dest);
  console.log(`Backup dibuat: ${dest}`);

  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  for (const file of readdirSync(backupDir)) {
    const fullPath = path.join(backupDir, file);
    if (statSync(fullPath).mtimeMs < cutoff) {
      unlinkSync(fullPath);
      console.log(`Backup lama dihapus: ${file}`);
    }
  }
}

main();
