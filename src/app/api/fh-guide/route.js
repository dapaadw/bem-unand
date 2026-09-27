import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole } from '../../../lib/requireRole';
import { guidePayload } from '../../../lib/fhGuide';
export async function GET() {
  const [links, faqs] = await Promise.all([prisma.guideLink.findMany({ orderBy: [{ category: 'asc' }, { title: 'asc' }] }), prisma.faq.findMany({ orderBy: { createdAt: 'asc' } })]);
  return Response.json({ links, faqs });
}
export async function POST(request) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;
  const body = await request.json().catch(() => null);
  let data;
  try { data = guidePayload(body?.kind, body); } catch (e) { return Response.json({ error: e.message }, { status: 400 }); }
  const created = await prisma.$transaction(async (tx) => {
    const item = await (body.kind === 'link' ? tx.guideLink : tx.faq).create({ data });
    await tx.auditLog.create({ data: { userId: session.userId, action: 'CREATE', entityType: body.kind === 'link' ? 'GuideLink' : 'Faq', entityId: item.id, summary: 'Menambah FH Guide: ' + (item.title || item.question) } });
    return item;
  });
  revalidatePath('/fh-guide'); revalidatePath('/admin/fh-guide');
  return Response.json(created, { status: 201 });
}
