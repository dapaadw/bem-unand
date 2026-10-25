import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole, slugify } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';
import { kegiatanFilters, kegiatanPayload } from '../../../lib/kegiatan';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filter = kegiatanFilters(Object.fromEntries(searchParams));
  if (filter.error) return NextResponse.json({ error: filter.error }, { status: 400 });
  const items = await prisma.kegiatan.findMany({ where: filter.where, orderBy: [{ date: 'desc' }, { id: 'desc' }] });
  return NextResponse.json({ items });
}

export async function POST(request) {
  try {
    const { session, error } = await requireRole(['ADMIN']);
    if (error) return error;

    const body = await request.json().catch(() => null);
    const validated = kegiatanPayload(body);
    if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });
    const slug = `${slugify(validated.data.name)}-${Date.now().toString(36)}`;

    const created = await prisma.kegiatan.create({
      data: {
        ...validated.data,
        slug,
        createdBy: session.userId,
      },
    });

    await logAction({
      userId: session.userId,
      action: 'CREATE',
      entityType: 'Kegiatan',
      entityId: created.id,
      summary: `Membuat kegiatan "${created.name}"`,
    });

    revalidatePath('/kegiatan');
    revalidatePath('/');

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('SERVER ERROR IN POST /api/kegiatan:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
