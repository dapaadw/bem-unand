import { mkdir, writeFile, unlink, readFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = () => path.resolve(/* turbopackIgnore: true */ process.env.ASPIRASI_UPLOAD_DIR || 'storage/aspirasi');
const validName = (name) => /^[a-f0-9-]{36}\.(png|jpg)$/.test(name);
export async function saveFile(file) {
  if (!file || !['image/png', 'image/jpeg'].includes(file.type)) throw new Error('Format file harus JPG atau PNG.');
  if (!file.size || file.size > 500 * 1024) throw new Error('Ukuran file harus antara 1 byte dan 500KB.');
  const buffer = Buffer.from(await file.arrayBuffer());
  const png = buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const jpg = buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255;
  if ((file.type === 'image/png' && !png) || (file.type === 'image/jpeg' && !jpg)) throw new Error('Isi file tidak sesuai format gambar.');
  const name = crypto.randomUUID() + (png ? '.png' : '.jpg');
  await mkdir(root(), { recursive: true });
  await writeFile(path.join(/* turbopackIgnore: true */ root(), name), buffer, { flag: 'wx' });
  return name;
}
export async function removeEvidence(name) {
  if (validName(name)) await unlink(path.join(/* turbopackIgnore: true */ root(), name)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
}
export async function readEvidence(name) {
  if (!validName(name)) return null;
  try { return await readFile(/* turbopackIgnore: true */ path.join(/* turbopackIgnore: true */ root(), name)); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
