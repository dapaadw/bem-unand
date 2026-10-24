import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../../lib/prisma';
import { requireRole } from '../../../../../lib/requireRole';
import { guidePayload } from '../../../../../lib/fhGuide';
async function mutate(request, context, deleting) {
  const { session, error } = await requireRole(['SUPERUSER']);
  if (error) return error;
  const { kind, id } = await context.params;
  if (!['link', 'faq'].includes(kind)) return Response.json({ error: 'Jenis tidak valid.' }, { status: 400 });
  let data;
  if (!deleting) {
    try { data = guidePayload(kind, await request.json()); }
    catch (e) { return Response.json({ error: e.message }, { status: 400 }); }
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      const model = kind === 'link' ? tx.guideLink : tx.faq;
      const item = deleting ? await model.delete({ where: { id } }) : await model.update({ where: { id }, data });
      await tx.auditLog.create({ data: { userId: session.userId, action: deleting ? 'DELETE' : 'UPDATE', entityType: kind === 'link' ? 'GuideLink' : 'Faq', entityId: id, summary: (deleting ? 'Menghapus' : 'Mengubah') + ' FH Guide: ' + (item.title || item.question) } });
      return item;
    });
    revalidatePath('/fh-guide'); revalidatePath('/admin/fh-guide');
    return Response.json(deleting ? { ok: true } : result);
  } catch (e) {
    if (e.code === 'P2025') return Response.json({ error: 'Data tidak ditemukan.' }, { status: 404 });
    throw e;
  }
}
export const PUT = (request, context) => mutate(request, context, false);
export const DELETE = (request, context) => mutate(request, context, true);
