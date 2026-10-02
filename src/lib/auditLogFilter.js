import { dateRange } from './aspirasi';
export function buildAuditLogWhere(sp = {}) {
  const where = {};
  for (const key of ['userId', 'entityType']) {
    if (sp[key]) {
      if (typeof sp[key] !== 'string' || sp[key].length > 200) throw new Error('Filter audit tidak valid.');
      where[key] = sp[key];
    }
  }
  if (sp.action) {
    if (!['CREATE', 'UPDATE', 'DELETE'].includes(sp.action)) throw new Error('Aksi audit tidak valid.');
    where.action = sp.action;
  }
  const range = dateRange(sp.from, sp.to);
  if (range) where.createdAt = range;
  return where;
}
