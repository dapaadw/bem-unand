import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole, slugify } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';

const PAGE_SIZE = 9;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const q = searchParams.get('q')?.trim();
  const category = searchParams.get('category')?.trim();

  const where = {
    ...(q ? { title: { contains: q } } : {}),
    ...(category ? { category } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.publikasi.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.publikasi.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE, totalPages: Math.ceil(total / PAGE_SIZE) });
}

export async function POST(request) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.publishedAt || !body?.author || !body?.category || !body?.body) {
    return NextResponse.json({ error: 'Field wajib belum lengkap.' }, { status: 400 });
  }

  const slug = `${slugify(body.title)}-${Date.now().toString(36)}`;

  const created = await prisma.publikasi.create({
    data: {
      title: body.title,
      slug,
      publishedAt: new Date(body.publishedAt),
      author: body.author,
      category: body.category,
      body: body.body,
      attachmentUrl: body.attachmentUrl || null,
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
