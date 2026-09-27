export const JENIS_PENGAJUAN = ['ASPIRASI', 'KELUHAN', 'SARAN', 'LAINNYA'];
export const STATUS_LABEL = { BARU: 'Pending', DIPROSES: 'Diproses', SELESAI: 'Selesai' };

export function aspirasiPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Data formulir tidak valid.');
  if (typeof body.isAnonymous !== 'boolean') throw new Error('Pilihan anonim tidak valid.');
  const data = { isAnonymous: body.isAnonymous };
  for (const [field, limit] of Object.entries({ nama: 150, nim: 50, cp: 50, email: 254, pihakDituju: 200, keluhKesah: 500, deskripsi: 10000, harapan: 5000 })) {
    if (body[field] != null && typeof body[field] !== 'string') throw new Error(`Isian ${field} tidak valid.`);
    data[field] = (body[field] || '').trim() || null;
    if (data[field]?.length > limit) throw new Error(`Isian ${field} maksimal ${limit} karakter.`);
  }
  if (!JENIS_PENGAJUAN.includes(body.jenisPengajuan)) throw new Error('Pilih jenis pengajuan yang tersedia.');
  data.jenisPengajuan = body.jenisPengajuan;
  if (!data.pihakDituju || !data.keluhKesah || !data.deskripsi) throw new Error('Pihak dituju, keluh kesah, dan deskripsi wajib diisi.');
  if (data.isAnonymous) for (const key of ['nama', 'nim', 'cp', 'email']) data[key] = null;
  else {
    if (!data.nama || !data.nim) throw new Error('Nama dan NIM wajib diisi jika tidak anonim.');
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('Email tidak valid.');
  }
  return data;
}

export function dateRange(from, to) {
  const parse = (value) => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Tanggal filter tidak valid.');
    const utc = new Date(`${value}T00:00:00Z`);
    if (!Number.isFinite(utc.getTime()) || utc.toISOString().slice(0, 10) !== value) throw new Error('Tanggal filter tidak valid.');
    return new Date(utc.getTime() - 7 * 3600000);
  };
  const range = {};
  if (from) range.gte = parse(from);
  if (to) range.lt = new Date(parse(to).getTime() + 86400000);
  if (range.gte && range.lt && range.gte >= range.lt) throw new Error('Tanggal awal harus sebelum atau sama dengan tanggal akhir.');
  return Object.keys(range).length ? range : undefined;
}

export function aspirasiWhere(sp = {}) {
  const where = {};
  if (sp.jenis) {
    if (!JENIS_PENGAJUAN.includes(sp.jenis)) throw new Error('Jenis filter tidak valid.');
    where.jenisPengajuan = sp.jenis;
  }
  if (sp.status) {
    if (!Object.hasOwn(STATUS_LABEL, sp.status)) throw new Error('Status filter tidak valid.');
    where.status = sp.status;
  }
  const createdAt = dateRange(sp.from, sp.to);
  if (createdAt) where.createdAt = createdAt;
  return where;
}
