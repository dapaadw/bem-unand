import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import KegiatanManagerClient from '../../../../components/admin/KegiatanManagerClient';

export default async function KegiatanManagerPage() {
  await requirePageRole(['ADMIN']);
  const items = await prisma.kegiatan.findMany({ orderBy: [{ date: 'desc' }, { id: 'desc' }] });

  const serializable = items.map((i) => ({
    ...i,
    date: i.date.toISOString(),
    publishedAt: i.publishedAt.toISOString(),
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manajemen Kegiatan &amp; Lomba</h1>
      <KegiatanManagerClient initialItems={serializable} />
    </div>
  );
}
