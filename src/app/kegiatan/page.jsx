import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const revalidate = 300;

export default async function KegiatanPage({ searchParams }) {
  const sp = await searchParams;
  const q = sp?.q?.trim();
  const type = sp?.type?.trim();

  const items = await prisma.kegiatan.findMany({
    where: {
      ...(q ? { name: { contains: q } } : {}),
      ...(type ? { type } : {}),
    },
    orderBy: { date: 'desc' },
  });

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kegiatan</h1>

      <form className="flex flex-col sm:flex-row gap-3 mb-8" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q || ''}
          placeholder="Cari nama kegiatan/lomba..."
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-neon"
        />
        <select name="type" defaultValue={type || ''} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white">
          <option value="">Semua Tipe</option>
          <option value="LOMBA">Lomba</option>
          <option value="INTERNAL">Kegiatan Internal</option>
        </select>
        <button type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">Cari</button>
      </form>

      {items.length === 0 ? (
        <p className="text-gray-400">Belum ada kegiatan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/kegiatan/${item.slug}`} className="block bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors">
              <span className="text-xs text-brand-neon uppercase tracking-wide">{item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}</span>
              <h2 className="text-lg font-semibold mt-2 mb-2">{item.name}</h2>
              <p className="text-sm text-gray-400">{item.date.toLocaleDateString('id-ID')} &middot; {item.location}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
