import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { buildAuditLogWhere } from '../../../../lib/auditLogFilter';
import { toCsv } from '../../../../lib/csv';
export async function GET(request) {
  const { error } = await requireRole(['ADMIN', 'SUPERUSER']);
  if (error) return error;
  let where;
  try { where = buildAuditLogWhere(Object.fromEntries(new URL(request.url).searchParams)); }
  catch (e) { return Response.json({ error: e.message }, { status: 400 }); }
  const logs = await prisma.auditLog.findMany({ where, include: { user: { select: { name: true } } }, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] });
  return new Response(toCsv([['Waktu (UTC)', 'User', 'Aksi', 'Entitas', 'Entity ID', 'Ringkasan'], ...logs.map((log) => [log.createdAt.toISOString(), log.user.name, log.action, log.entityType, log.entityId, log.summary])]), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="audit-log.csv"', 'Cache-Control': 'private, no-store' } });
}
