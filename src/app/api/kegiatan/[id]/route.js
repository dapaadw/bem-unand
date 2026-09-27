import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { logAction } from '../../../../lib/audit';
import { kegiatanPayload } from '../../../../lib/kegiatan';

export async function GET(_request, { params }) {
  const { id } = await params;
  const item = await prisma.kegiatan.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });

  const existing = await prisma.kegiatan.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  const validated = kegiatanPayload(body, existing);
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });

  const updated = await prisma.kegiatan.update({
    where: { id },
    data: validated.data,
  });

  await logAction({
    userId: session.userId,
    action: 'UPDATE',
    entityType: 'Kegiatan',
    entityId: updated.id,
    summary: `Mengubah kegiatan "${updated.name}"`,
  });

  revalidatePath('/kegiatan');
  revalidatePath(`/kegiatan/${updated.slug}`);
  revalidatePath('/');

  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const existing = await prisma.kegiatan.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  await prisma.kegiatan.delete({ where: { id } });

  await logAction({
    userId: session.userId,
    action: 'DELETE',
    entityType: 'Kegiatan',
    entityId: id,
    summary: `Menghapus kegiatan "${existing.name}"`,
  });

  revalidatePath('/kegiatan');
  revalidatePath(`/kegiatan/${existing.slug}`);
  revalidatePath('/');

  return NextResponse.json({ ok: true });
}
