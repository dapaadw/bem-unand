export function validateSchedule(body) {
  for (const [field, label] of [['date', 'kegiatan'], ['publishedAt', 'publikasi']]) {
    if (body[field] === undefined) continue;
    const value = body[field];
    if (!(value instanceof Date) && (typeof value !== 'string' || !value.trim())) return `Tanggal ${label} tidak valid.`;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return `Tanggal ${label} tidak valid.`;
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && date.toISOString().slice(0, 10) !== value) return `Tanggal ${label} tidak valid.`;
  }
  if (body.time !== undefined && body.time !== null && (typeof body.time !== 'string' || (body.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.time)))) return 'Waktu kegiatan harus dalam format HH:mm (WIB).';
  return null;
}
