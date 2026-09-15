import { prisma } from '../../../../lib/prisma';
import AspirasiManagerClient from '../../../../components/admin/AspirasiManagerClient';

export default async function AspirasiManagerPage() {
  const items = await prisma.aspirasi.findMany({ orderBy: { createdAt: 'desc' } });
  const serializable = items.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Aspirasi Mahasiswa</h1>
      <AspirasiManagerClient initialItems={serializable} />
    </div>
  );
}
