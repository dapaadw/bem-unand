import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_BYTES = 500 * 1024; // 500KB per PRD assumption
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export async function saveFile(file) {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new Error('File tidak valid.');
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Format file harus JPG atau PNG.');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Ukuran file maksimal 500KB.');
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = file.type === 'image/png' ? 'png' : 'jpg';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return getFileUrl(filename);
}

export function getFileUrl(filename) {
  return `/uploads/${filename}`;
}
