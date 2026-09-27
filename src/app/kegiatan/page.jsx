import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { kegiatanFilters } from '../../lib/kegiatan';

export const revalidate = 300;

export default async function KegiatanPage({ searchParams }) {
  const filter = kegiatanFilters(await searchParams);
  const { q, type } = filter;

  const items = filter.error ? [] : await prisma.kegiatan.findMany({ where: filter.where, orderBy: [{ date: 'desc' }, { id: 'desc' }] });

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kegiatan &amp; Lomba</h1>

      <form className="flex flex-col sm:flex-row gap-3 mb-8" method="get">
        <input
          type="text"
          name="q"
          aria-label="Cari nama kegiatan atau lomba"
          defaultValue={q || ''}
          placeholder="Cari nama kegiatan/lomba..."
          className="min-w-0 flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-neon"
        />
        <select aria-label="Jenis kegiatan" name="type" defaultValue={filter.error ? '' : type} className="rounded-lg bg-brand-dark border border-white/10 px-4 py-2 text-white">
          <option value="">Semua Tipe</option>
          <option value="LOMBA">Lomba</option>
          <option value="INTERNAL">Kegiatan Internal</option>
        </select>
        <button type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">Cari</button>
        {(q || type) && <Link href="/kegiatan" className="px-4 py-2 text-brand-neon underline">Reset filter</Link>}
      </form>
      {filter.error && <p role="alert" className="text-red-400 mb-4">{filter.error}</p>}
      <p className="text-sm text-gray-400 mb-6">{items.length} kegiatan{q || type ? ' ditemukan' : ''}</p>

      {items.length === 0 ? (
        <p className="text-gray-400">{q || type ? 'Tidak ada kegiatan yang cocok dengan pencarian atau jenis ini.' : 'Belum ada kegiatan.'}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/kegiatan/${item.slug}`} className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors">
              <span className="text-xs text-brand-neon uppercase tracking-wide">{item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}</span>
              <h2 className="text-lg font-semibold mt-2 mb-2">{item.name}</h2>
              <p className="text-sm text-gray-400">{item.date.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })}{item.time ? ` · ${item.time} WIB` : ''} &middot; {item.location}</p>
              <p className="text-sm text-gray-400 mt-2">Penyelenggara: {item.organizer}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
