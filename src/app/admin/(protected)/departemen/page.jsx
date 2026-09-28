import { prisma } from '../../../../lib/prisma';
import DepartemenManagerClient from '../../../../components/admin/DepartemenManagerClient';

export default async function DepartemenManagerPage() {
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
