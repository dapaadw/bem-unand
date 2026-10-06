import { validateSchedule } from './kegiatanSchedule.js';
import { isWebOrLocalUrl } from './homeMedia.js';

export function isGoogleFormUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      ((url.hostname === 'forms.gle' && url.pathname.length > 1) ||
       (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')));
  } catch { return false; }
}

export function kegiatanFilters(params = {}) {
  const q = typeof params.q === 'string' ? params.q.trim() : '';
  const type = typeof params.type === 'string' ? params.type.trim() : '';
  if (type && !['LOMBA', 'INTERNAL'].includes(type)) return { q, type, error: 'Jenis kegiatan tidak valid. Pilih Lomba atau Kegiatan Internal.' };
  return { q, type, where: { ...(q ? { name: { contains: q } } : {}), ...(type ? { type } : {}) } };
}

export function kegiatanPayload(body, existing = null) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Payload tidak valid.' };
  const data = {};
  for (const field of ['name', 'location', 'organizer', 'description']) {
    const value = body[field] === undefined ? existing?.[field] : body[field];
    if (typeof value !== 'string' || !value.trim()) return { error: 'Nama, lokasi, penyelenggara, dan deskripsi wajib diisi.' };
    data[field] = value.trim();
  }
  data.type = body.type ?? existing?.type;
  if (!['LOMBA', 'INTERNAL'].includes(data.type)) return { error: 'Jenis kegiatan tidak valid.' };
  const date = body.date === undefined ? existing?.date : body.date;
  const publishedAt = body.publishedAt === undefined ? (existing?.publishedAt || new Date()) : body.publishedAt;
  const time = body.time === undefined ? existing?.time : body.time;
  if (date === undefined) return { error: 'Tanggal kegiatan wajib diisi.' };
  const error = validateSchedule({ date, publishedAt, time });
  if (error) return { error };
  data.date = new Date(date);
  data.publishedAt = new Date(publishedAt);
  data.time = time || null;
  for (const field of ['publicationUrl', 'registrationUrl']) {
    const value = body[field] === undefined ? existing?.[field] : body[field];
    if (value !== null && value !== undefined && typeof value !== 'string') return { error: 'Link kegiatan tidak valid.' };
    data[field] = value?.trim() || null;
  }
  if (data.publicationUrl && !isWebOrLocalUrl(data.publicationUrl)) return { error: 'Link publikasi harus menggunakan URL http/https atau path lokal.' };
  const image = body.imageUrl === undefined ? existing?.imageUrl : body.imageUrl;
  if (image !== undefined && image !== null && typeof image !== 'string') return { error: 'URL poster/gambar tidak valid.' };
  data.imageUrl = image?.trim() || null;
  if (data.imageUrl && !isWebOrLocalUrl(data.imageUrl)) return { error: 'Poster/gambar harus menggunakan URL http/https atau path lokal.' };
  if (data.type === 'INTERNAL') data.registrationUrl = null;
  else if (data.registrationUrl && !isGoogleFormUrl(data.registrationUrl)) return { error: 'Pendaftaran lomba harus menggunakan link Google Form HTTPS (forms.gle atau docs.google.com/forms/).' };
  return { data };
}
