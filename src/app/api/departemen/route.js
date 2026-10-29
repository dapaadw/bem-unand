import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole, slugify } from '../../../lib/requireRole';
import { logAction } from '../../../lib/audit';
import { departmentProfile } from '../../../lib/departemen';
import { HARDCODED_DEPARTEMEN, sortDepartments } from '../../../data/departemen';

export async function GET() {
  let dbItems = [];
  try {
    dbItems = await prisma.departemen.findMany({
      include: { staff: true, proker: true },
      orderBy: { name: 'asc' },
    });
  } catch {
    dbItems = [];
  }

  const hardcodedMap = new Map(HARDCODED_DEPARTEMEN.map((d) => [d.slug, d]));
  const rawItems = dbItems.length > 0
    ? dbItems.map((db) => {
        const fallback = hardcodedMap.get(db.slug);
        return {
          ...fallback,
          ...db,
          name: db.name || fallback?.name,
          photoUrl: db.photoUrl || fallback?.photoUrl || null,
          description: db.description || fallback?.description || '',
          staff: db.staff?.length > 0 ? db.staff : (fallback?.staff || []),
          proker: db.proker?.length > 0 ? db.proker : (fallback?.proker || []),
          contact: fallback?.contact || null,
        };
      })
    : HARDCODED_DEPARTEMEN;

  const items = sortDepartments(rawItems);

  return NextResponse.json({ items });
}

export async function POST(request) {
  const { session, error } = await requireRole(['SUPERUSER']);
  if (error) return error;
  const validated = departmentProfile(await request.json().catch(() => null));
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });
  const item = await prisma.departemen.create({
    data: {
      ...validated.data,
      slug: `${slugify(validated.data.name) || 'departemen'}-${randomUUID().slice(0, 8)}`,
    },
    include: { staff: true, proker: true, contact: true },
  });
  await logAction({
    userId: session.userId,
    action: 'CREATE',
    entityType: 'Departemen',
    entityId: item.id,
    summary: `Membuat departemen "${item.name}"`,
  });
  revalidatePath('/departemen');
  revalidatePath('/struktur');
  return NextResponse.json(item, { status: 201 });
}
