import { prisma } from '../../../lib/prisma';
import { getSession } from '../../../lib/session';

export default async function AdminDashboardPage() {
  const session = await getSession();

  const [publikasiCount, kegiatanCount, departemenCount] = await Promise.all([
    prisma.publikasi.count(),
    prisma.kegiatan.count(),
    prisma.departemen.count(),
  ]);

  const stats = [
    { label: 'Publikasi', value: publikasiCount },
    { label: 'Kegiatan & Lomba', value: kegiatanCount },
    { label: 'Departemen', value: departemenCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-6">Selamat datang, {session.name} ({session.role}).</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-brand-neon">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
