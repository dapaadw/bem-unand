import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';

export async function GET() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  return NextResponse.json(profile);
}

export async function PUT(request) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });

  const data = {
    title: body.title ?? '',
    subtitle: body.subtitle ?? '',
    heroImageUrl: body.heroImageUrl || null,
    heroImageAlt: body.heroImageAlt || null,
    ctaText: body.ctaText || null,
    ctaLink: body.ctaLink || null,
    visiMisi: body.visiMisi || null,
    logoPhilosophy: body.logoPhilosophy || null,
  };

  const updated = await prisma.profile.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  await logAction({
    userId: session.userId,
    action: 'UPDATE',
    entityType: 'Profile',
    entityId: '1',
    summary: 'Memperbarui profil Home (hero/visi-misi/logo)',
  });

  revalidatePath('/');

  return NextResponse.json(updated);
}
