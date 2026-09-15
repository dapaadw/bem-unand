import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';

export async function GET() {
  const [links, faqs] = await Promise.all([
    prisma.guideLink.findMany({ orderBy: { category: 'asc' } }),
    prisma.faq.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);
  return NextResponse.json({ links, faqs });
}

export async function POST(request) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.kind) return NextResponse.json({ error: 'kind wajib diisi ("link" atau "faq").' }, { status: 400 });

  if (body.kind === 'link') {
    if (!body.category || !body.title || !body.url) {
      return NextResponse.json({ error: 'Kategori, judul, dan URL wajib diisi.' }, { status: 400 });
    }
    const created = await prisma.guideLink.create({
      data: { category: body.category, title: body.title, url: body.url },
    });
    await logAction({ userId: session.userId, action: 'CREATE', entityType: 'GuideLink', entityId: created.id, summary: `Menambah link FH Guide "${created.title}"` });
    revalidatePath('/fh-guide');
    return NextResponse.json(created, { status: 201 });
  }

  if (body.kind === 'faq') {
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: 'Pertanyaan dan jawaban wajib diisi.' }, { status: 400 });
    }
    const created = await prisma.faq.create({ data: { question: body.question, answer: body.answer } });
    await logAction({ userId: session.userId, action: 'CREATE', entityType: 'Faq', entityId: created.id, summary: `Menambah FAQ "${created.question}"` });
    revalidatePath('/fh-guide');
    return NextResponse.json(created, { status: 201 });
  }

  return NextResponse.json({ error: 'kind harus "link" atau "faq".' }, { status: 400 });
}
