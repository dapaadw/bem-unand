export function dateRange(from, to) {
  const parse = (value) => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('Tanggal filter tidak valid.');
    }
    const utc = new Date(`${value}T00:00:00Z`);
    if (!Number.isFinite(utc.getTime()) || utc.toISOString().slice(0, 10) !== value) {
      throw new Error('Tanggal filter tidak valid.');
    }
    return new Date(utc.getTime() - 7 * 3600000);
  };
  const range = {};
  if (from) range.gte = parse(from);
  if (to) range.lt = new Date(parse(to).getTime() + 86400000);
  if (range.gte && range.lt && range.gte >= range.lt) {
    throw new Error('Tanggal awal harus sebelum atau sama dengan tanggal akhir.');
  }
  return Object.keys(range).length ? range : undefined;
}

export function buildAuditLogWhere(sp = {}) {
  const where = {};
  for (const key of ['userId', 'entityType']) {
    if (sp[key]) {
      if (typeof sp[key] !== 'string' || sp[key].length > 200) {
        throw new Error('Filter audit tidak valid.');
      }
      where[key] = sp[key];
    }
  }
  if (sp.action) {
    if (!['CREATE', 'UPDATE', 'DELETE'].includes(sp.action)) {
      throw new Error('Aksi audit tidak valid.');
    }
    where.action = sp.action;
  }
  const range = dateRange(sp.from, sp.to);
  if (range) where.createdAt = range;
  return where;
}
