import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { HARDCODED_DEPARTEMEN } from '../../../data/departemen';

export async function GET() {
  let dbItems = [];
  try {
    dbItems = await prisma.departemen.findMany({
      include: { staff: true, proker: true, contact: true },
      orderBy: { name: 'asc' },
    });
  } catch {
    dbItems = [];
  }

  const dbMap = new Map(dbItems.map((d) => [d.slug, d]));
  const items = HARDCODED_DEPARTEMEN.map((dept) => {
    const db = dbMap.get(dept.slug);
    return {
      ...dept,
      id: db?.id || dept.id,
      photoUrl: db?.photoUrl || dept.photoUrl,
      contact: db?.contact || null,
      staff: (db?.staff && db.staff.length > 0) ? db.staff : dept.staff,
      proker: (db?.proker && db.proker.length > 0) ? db.proker : dept.proker,
    };
  });

  return NextResponse.json({ items });
}

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Fitur penambahan departemen dinonaktifkan. Struktur 13 Departemen, Biro, Lembaga, dan Kantor BEM FH UNAND telah ditetapkan secara permanen (hardcoded).',
    },
    { status: 405 }
  );
}
