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
  for (const field of ['title', 'body', 'category']) {
    const value = body[field] === undefined ? existing?.[field] : body[field];
    if (typeof value !== 'string' || !value.trim()) return { error: 'Judul, kategori, dan isi wajib diisi.' };
    data[field] = value.trim();
  }
  const authorValue = body.author === undefined ? (existing?.author || 'BEM FH UNAND') : body.author;
  if (typeof authorValue !== 'string') return { error: 'Penulis harus berupa teks.' };
  data.author = authorValue.trim() || 'BEM FH UNAND';
  data.category = publicationCategory(data.category);
  // Preserve custom categories in existing records, while new selections use the requirement's taxonomy.
  if (!PUBLICATION_CATEGORIES.includes(data.category) && data.category !== publicationCategory(existing?.category)) {
    return { error: 'Pilih salah satu kategori publikasi yang tersedia.' };
  }
  const date = body.publishedAt === undefined ? existing?.publishedAt : body.publishedAt;
  if (!(date instanceof Date) && typeof date !== 'string') return { error: 'Tanggal publikasi tidak valid.' };
  data.publishedAt = new Date(date);
  if (Number.isNaN(data.publishedAt.getTime())) return { error: 'Tanggal publikasi tidak valid.' };
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && data.publishedAt.toISOString().slice(0, 10) !== date) return { error: 'Tanggal publikasi tidak valid.' };
  const attachment = body.attachmentUrl === undefined ? existing?.attachmentUrl : body.attachmentUrl;
  if (attachment !== undefined && attachment !== null && typeof attachment !== 'string') return { error: 'URL lampiran tidak valid.' };
  data.attachmentUrl = attachment?.trim() || null;
  if (data.attachmentUrl && !isWebOrLocalUrl(data.attachmentUrl)) return { error: 'Lampiran harus menggunakan URL http/https atau path lokal.' };
  const image = body.imageUrl === undefined ? existing?.imageUrl : body.imageUrl;
  if (image !== undefined && image !== null && typeof image !== 'string') return { error: 'URL gambar tidak valid.' };
  data.imageUrl = image?.trim() || null;
  if (data.imageUrl && !isWebOrLocalUrl(data.imageUrl)) return { error: 'Gambar harus menggunakan URL http/https atau path lokal.' };
  return { data };
}

export function publicationPage(value) {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
