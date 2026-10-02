export function isDriveUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['drive.google.com', 'docs.google.com'].includes(url.hostname) && !url.username && !url.password && (!url.port || url.port === '443') && url.pathname !== '/';
  } catch { return false; }
}
export function guidePayload(kind, body) {
  if (!['link', 'faq'].includes(kind) || !body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Data FH Guide tidak valid.');
  const fields = kind === 'link' ? { category: 100, title: 250, url: 2000 } : { question: 500, answer: 10000 };
  const data = {};
  for (const [key, max] of Object.entries(fields)) {
    if (typeof body[key] !== 'string' || !body[key].trim() || body[key].trim().length > max) throw new Error(key + ' wajib diisi, maksimal ' + max + ' karakter.');
    data[key] = body[key].trim();
  }
  if (kind === 'link' && !isDriveUrl(data.url)) throw new Error('Gunakan URL HTTPS dokumen/folder Google Drive atau Google Docs.');
  return data;
}
