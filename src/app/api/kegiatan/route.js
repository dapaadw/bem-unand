import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole, slugify } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();
  const type = searchParams.get('type')?.trim();

  const where = {
    ...(q ? { name: { contains: q } } : {}),
    ...(type ? { type } : {}),
  };

  const items = await prisma.kegiatan.findMany({ where, orderBy: { date: 'desc' } });
  return NextResponse.json({ items });
}

export async function POST(request) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.type || !body?.date || !body?.location || !body?.organizer || !body?.description) {
    return NextResponse.json({ error: 'Field wajib belum lengkap.' }, { status: 400 });
  }

  const slug = `${slugify(body.name)}-${Date.now().toString(36)}`;

  const created = await prisma.kegiatan.create({
    data: {
      type: body.type,
      name: body.name,
      slug,
      date: new Date(body.date),
      location: body.location,
      organizer: body.organizer,
      description: body.description,
      publicationUrl: body.publicationUrl || null,
      registrationUrl: body.type === 'LOMBA' ? (body.registrationUrl || null) : null,
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
}
