import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { logAction } from '../../../../lib/audit';

export async function GET(_request, { params }) {
  const { id } = await params;
  const item = await prisma.departemen.findUnique({
    where: { id },
    include: { staff: true, proker: true, contact: true },
  });
  if (!item) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });
  return NextResponse.json(item);
}

// PUT updates departemen core fields only (name/photo/description).
// Staff/proker/contact are managed via their own sub-resources.
export async function PUT(request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const existing = await prisma.departemen.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  const updated = await prisma.departemen.update({
    where: { id },
    data: {
      name: body.name ?? existing.name,
      photoUrl: body.photoUrl ?? existing.photoUrl,
      description: body.description ?? existing.description,
    },
  });

  await logAction({
    userId: session.userId,
    action: 'UPDATE',
    entityType: 'Departemen',
    entityId: updated.id,
    summary: `Mengubah profil departemen "${updated.name}"`,
  });

  revalidatePath('/departemen');
  revalidatePath(`/departemen/${updated.slug}`);

  return NextResponse.json(updated);
}

// PATCH replaces the full staff list, program kerja list, and contact person
// for a department in one transaction — simpler for the admin UI than
// granular per-row endpoints, acceptable given the low write frequency of this data.
export async function PATCH(request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const existing = await prisma.departemen.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  const staff = Array.isArray(body?.staff) ? body.staff : [];
  const proker = Array.isArray(body?.proker) ? body.proker : [];
  const contact = body?.contact || null;

  await prisma.$transaction([
    prisma.departemenStaff.deleteMany({ where: { departemenId: id } }),
    prisma.programKerja.deleteMany({ where: { departemenId: id } }),
    ...(staff.length
      ? [prisma.departemenStaff.createMany({
          data: staff.map((s) => ({
            departemenId: id,
            name: s.name,
            role: s.role,
            photoUrl: s.photoUrl || null,
            identity: s.identity || null,
            achievements: s.achievements || null,
          })),
        })]
      : []),
    ...(proker.length
      ? [prisma.programKerja.createMany({
          data: proker.map((p) => ({ departemenId: id, name: p.name, description: p.description || null })),
        })]
      : []),
    ...(contact
      ? [prisma.departemenContact.upsert({
          where: { departemenId: id },
          update: { whatsappUrl: contact.whatsappUrl || null, instagramUrl: contact.instagramUrl || null },
          create: { departemenId: id, whatsappUrl: contact.whatsappUrl || null, instagramUrl: contact.instagramUrl || null },
        })]
      : []),
  ]);

  await logAction({
    userId: session.userId,
    action: 'UPDATE',
    entityType: 'Departemen',
    entityId: id,
    summary: `Memperbarui staff/proker/kontak departemen "${existing.name}"`,
  });

  revalidatePath('/departemen');
  revalidatePath(`/departemen/${existing.slug}`);

  const updated = await prisma.departemen.findUnique({
    where: { id },
    include: { staff: true, proker: true, contact: true },
  });

  return NextResponse.json(updated);
}
