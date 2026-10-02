import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { logAction } from '../../../../lib/audit';
import { publicationPayload } from '../../../../lib/publication';

export async function GET(_request, { params }) {
  const { id } = await params;
  const item = await prisma.publikasi.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });

  const existing = await prisma.publikasi.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  const validated = publicationPayload(body, existing);
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });
  const updated = await prisma.publikasi.update({
    where: { id },
    data: validated.data,
  });

  await logAction({
    userId: session.userId,
    action: 'UPDATE',
    entityType: 'Publikasi',
    entityId: updated.id,
    summary: `Mengubah publikasi "${updated.title}"`,
  });

  revalidatePath('/publikasi');
  revalidatePath(`/publikasi/${updated.slug}`);
  revalidatePath('/');

  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const existing = await prisma.publikasi.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  await prisma.publikasi.delete({ where: { id } });

  await logAction({
    userId: session.userId,
    action: 'DELETE',
    entityType: 'Publikasi',
    entityId: id,
    summary: `Menghapus publikasi "${existing.title}"`,
  });

  revalidatePath('/publikasi');
  revalidatePath(`/publikasi/${existing.slug}`);
  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
