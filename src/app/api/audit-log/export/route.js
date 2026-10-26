import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { buildAuditLogWhere } from '../../../../lib/auditLogFilter';
import { toCsvRow } from '../../../../lib/csv';

const BATCH_SIZE = 250;

export async function GET(request) {
  const { error } = await requireRole(['ADMIN', 'SUPERUSER']);
  if (error) return error;

  let where;
  try {
    where = buildAuditLogWhere(
      Object.fromEntries(new URL(request.url).searchParams),
    );
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const headerLine =
    '\uFEFF' +
    toCsvRow([
      'Waktu (UTC)',
      'User',
      'Aksi',
      'Entitas',
      'Entity ID',
      'Ringkasan',
    ]);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(headerLine));
        let cursorId = undefined;

        while (true) {
          const batch = await prisma.auditLog.findMany({
            where,
            include: { user: { select: { name: true } } },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: BATCH_SIZE,
            ...(cursorId ? { skip: 1, cursor: { id: cursorId } } : {}),
          });

          if (batch.length === 0) break;

          const lines = batch
            .map((log) =>
              toCsvRow([
                log.createdAt.toISOString(),
                log.user?.name || 'Admin',
                log.action,
                log.entityType,
                log.entityId,
                log.summary,
              ]),
            )
            .join('\r\n');

          controller.enqueue(encoder.encode('\r\n' + lines));
          cursorId = batch[batch.length - 1].id;
          if (batch.length < BATCH_SIZE) break;
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="audit-log.csv"',
      'Cache-Control': 'private, no-store',
    },
  });
}
