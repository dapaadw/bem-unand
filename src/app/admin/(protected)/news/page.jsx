import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import NewsManagerClient from '../../../../components/admin/NewsManagerClient';

export default async function NewsManagerPage() {
  await requirePageRole(['ADMIN']);
  const items = await prisma.publikasi.findMany({ orderBy: [{ publishedAt: 'desc' }, { id: 'desc' }] });

  const serializable = items.map((i) => ({
    ...i,
    publishedAt: i.publishedAt.toISOString(),
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manajemen Berita / Publikasi</h1>
      <NewsManagerClient initialItems={serializable} />
    </div>
  );
}
