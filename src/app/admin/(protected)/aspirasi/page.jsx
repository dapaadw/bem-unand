import { prisma } from '../../../../lib/prisma';
import AspirasiManagerClient from '../../../../components/admin/AspirasiManagerClient';
import {
  MessageSquareWarning,
} from 'lucide-react';

export default async function AspirasiManagerPage() {
  const items = await prisma.aspirasi.findMany({ orderBy: { createdAt: 'desc' } });
  const serializable = items.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() }));

  return (
    <div className='space-y-6'>
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <MessageSquareWarning size={22} className="text-brand-neon" />
          <span>Aspirasi Mahasiswa</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Pantau seluruh aktivitas aspirasi dari para mahasiswa-mahasiswi Fakultas Hukum Universitas Andalas.
        </p>
      </div>
      <AspirasiManagerClient initialItems={serializable} />
    </div>
  );
}
