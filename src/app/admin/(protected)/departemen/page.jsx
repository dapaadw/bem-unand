import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import DepartemenManagerClient from '../../../../components/admin/DepartemenManagerClient';

export default async function DepartemenManagerPage() {
  await requirePageRole(['ADMIN']);
  const items = await prisma.departemen.findMany({
    orderBy: { name: 'asc' },
    include: { staff: true, proker: true, contact: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manajemen Departemen</h1>
      <DepartemenManagerClient initialItems={items} />
    </div>
  );
}
