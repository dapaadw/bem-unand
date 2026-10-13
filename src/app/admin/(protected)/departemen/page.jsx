import { Building2 } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Building2 className="text-brand-neon" size={24} />
            <span>Manajemen Departemen &amp; Biro</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Kelola profil, jajaran staf/BPH, program kerja, dan kontak resmi departemen BEM FH UNAND.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon font-medium self-start sm:self-auto">
          {items.length} Departemen Terdaftar
        </span>
      </div>
      <DepartemenManagerClient initialItems={items} />
    </div>
  );
}
