import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole, slugify } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';
import { publicationPayload } from '../../../lib/publication';
import { loadPublications } from '../../../lib/publicationQuery';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return NextResponse.json(await loadPublications(Object.fromEntries(searchParams)));
}

export async function POST(request) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const body = await request.json().catch(() => null);
  const validated = publicationPayload(body);
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });

  const slug = `${slugify(validated.data.title)}-${Date.now().toString(36)}`;

  const created = await prisma.publikasi.create({
    data: {
      ...validated.data,
      slug,
      createdBy: session.userId,
    },
  });

  await logAction({
    userId: session.userId,
    action: 'CREATE',
    entityType: 'Publikasi',
    entityId: created.id,
    summary: `Membuat publikasi "${created.title}"`,
  });

  revalidatePath('/publikasi');
  revalidatePath('/');

  return NextResponse.json(created, { status: 201 });
}
