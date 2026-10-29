import { isWebOrLocalUrl } from './homeMedia.js';

export const PUBLICATION_CATEGORIES = ['Rilis Resmi', 'Kajian', 'Berita Kegiatan', 'Pengumuman', 'Artikel Opini'];
const aliases = {
  rilis: 'Rilis Resmi', 'rilis resmi': 'Rilis Resmi', kajian: 'Kajian',
  berita: 'Berita Kegiatan', 'berita kegiatan': 'Berita Kegiatan',
  pengumuman: 'Pengumuman', opini: 'Artikel Opini', 'artikel opini': 'Artikel Opini',
};

export function publicationCategory(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  const key = text.toLowerCase();
  return Object.hasOwn(aliases, key) ? aliases[key] : text;
}

export function publicationPayload(body, existing = null) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Payload tidak valid.' };
  const data = {};
  for (const field of ['title', 'body']) {
    const value = body[field] === undefined ? existing?.[field] : body[field];
    if (typeof value !== 'string' || !value.trim()) return { error: 'Judul dan isi publikasi wajib diisi.' };
    data[field] = value.trim();
  }
  const authorValue = body.author === undefined ? (existing?.author || 'BEM FH UNAND') : body.author;
  if (typeof authorValue !== 'string') return { error: 'Penulis harus berupa teks.' };
  data.author = authorValue.trim() || 'BEM FH UNAND';
  const rawCat = body.category === undefined ? (existing?.category || 'Publikasi') : body.category;
  data.category = (typeof rawCat === 'string' && rawCat.trim()) ? publicationCategory(rawCat) : (existing?.category || 'Publikasi');
  const date = body.publishedAt === undefined ? existing?.publishedAt : body.publishedAt;
  if (!(date instanceof Date) && typeof date !== 'string') return { error: 'Tanggal publikasi tidak valid.' };
  data.publishedAt = new Date(date);
  if (Number.isNaN(data.publishedAt.getTime())) return { error: 'Tanggal publikasi tidak valid.' };
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && data.publishedAt.toISOString().slice(0, 10) !== date) return { error: 'Tanggal publikasi tidak valid.' };
  data.attachmentUrl = null;
  const image = body.imageUrl === undefined ? existing?.imageUrl : body.imageUrl;
  if (image !== undefined && image !== null && typeof image !== 'string') return { error: 'URL gambar tidak valid.' };
  data.imageUrl = image?.trim() || null;
  if (data.imageUrl && !isWebOrLocalUrl(data.imageUrl)) return { error: 'Gambar harus menggunakan URL http/https atau path lokal.' };
  return { data };
}

export function publicationPage(value) {
  if (typeof value === 'number') {
    return Number.isSafeInteger(value) && value > 0 ? value : 1;
  }
  if (typeof value !== 'string' || !/^\d+$/.test(value.trim())) return 1;
  const page = Number(value.trim());
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
