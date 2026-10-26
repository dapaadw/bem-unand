import { unlink } from 'node:fs/promises';
import path from 'node:path';

const SAFE_UPLOAD_URL_REGEX =
  /^\/uploads\/(publikasi|kegiatan)\/[a-zA-Z0-9._-]+$/;

export async function removeLocalUpload(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') return;
  if (!SAFE_UPLOAD_URL_REGEX.test(fileUrl)) return;

  const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
  const resolvedTarget = path.resolve(
    process.cwd(),
    'public',
    fileUrl.slice(1),
  );

  // Prevent path traversal outside public/uploads
  if (!resolvedTarget.startsWith(uploadsRoot + path.sep)) return;

  try {
    await unlink(resolvedTarget);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn('[uploadCleanup] Failed to remove file:', resolvedTarget);
    }
  }
}

export async function removeLocalUploadIfReplaced(oldUrl, newUrl) {
  if (!oldUrl || oldUrl === newUrl) return;
  await removeLocalUpload(oldUrl);
}
