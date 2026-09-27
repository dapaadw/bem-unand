import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { logAction } from '../../../../lib/audit';
import { revalidatePath } from 'next/cache';

export async function PATCH(request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body?.status || !['BARU', 'DIPROSES', 'SELESAI'].includes(body.status)) {
    return NextResponse.json({ error: 'Status tidak valid.' }, { status: 400 });
  }

  const existing = await prisma.aspirasi.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  const updated = await prisma.aspirasi.update({ where: { id }, data: { status: body.status } });

  await logAction({
    userId: session.userId,
    action: 'UPDATE',
    entityType: 'Aspirasi',
    entityId: id,
    summary: `Mengubah status aspirasi menjadi ${body.status}`,
  });

  revalidatePath('/admin/aspirasi');
  return NextResponse.json(updated, { headers: { 'Cache-Control': 'private, no-store' } });
}
