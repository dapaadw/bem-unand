import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { logAction } from '../../../../lib/audit';
import { departmentProfile, departmentDetails } from '../../../../lib/departemen';

export async function GET(_request, { params }) {
  const { id } = await params;
  const item = await prisma.departemen.findUnique({
    where: { id },
    include: { staff: true, proker: true, contact: true },
  });
  if (!item) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });
  return NextResponse.json(item);
}

// Profile and related details can be saved independently.
export async function PUT(request, { params }) {
  const { session, error } = await requireRole(['ADMIN']);
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const existing = await prisma.departemen.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Tidak ditemukan.' }, { status: 404 });

  const validated = departmentProfile(body, existing);
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });
  const updated = await prisma.departemen.update({
    where: { id },
    data: validated.data,
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

  const validated = departmentDetails(body);
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });
  const { staff, proker, contact } = validated.data;

  await prisma.$transaction([
    ...(staff !== undefined ? [prisma.departemenStaff.deleteMany({ where: { departemenId: id } })] : []),
    ...(proker !== undefined ? [prisma.programKerja.deleteMany({ where: { departemenId: id } })] : []),
    ...(staff?.length
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
    ...(proker?.length
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
      : contact === null ? [prisma.departemenContact.deleteMany({ where: { departemenId: id } })] : []),
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

export async function DELETE() {
  return NextResponse.json(
    {
      error:
        'Penghapusan departemen dinonaktifkan. Struktur 13 Departemen, Biro, Lembaga, dan Kantor BEM FH UNAND telah ditetapkan secara permanen (hardcoded).',
    },
    { status: 405 }
  );
}
