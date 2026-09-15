import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../../lib/prisma';
import { requireRole } from '../../../../../lib/requireRole';
import { logAction } from '../../../../../lib/audit';

const MODELS = { link: prisma.guideLink, faq: prisma.faq };

export async function DELETE(_request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { kind, id } = await params;
  const model = MODELS[kind];
  if (!model) return NextResponse.json({ error: 'kind tidak valid.' }, { status: 400 });

  const existing = await model.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  await model.delete({ where: { id } });

  await logAction({
    userId: session.userId,
    action: 'DELETE',
    entityType: kind === 'link' ? 'GuideLink' : 'Faq',
    entityId: id,
    summary: `Menghapus ${kind === 'link' ? 'link FH Guide' : 'FAQ'}`,
  });

  revalidatePath('/fh-guide');

  return NextResponse.json({ ok: true });
}
