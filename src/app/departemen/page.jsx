import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { isWebOrLocalUrl } from '../../lib/homeMedia';

export const revalidate = 3600;

export default async function DepartemenPage() {
  const items = await prisma.departemen.findMany({ orderBy: { name: 'asc' } });

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-6xl">
      <div className="mb-8">
        <span className="inline-block px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-3">
          Struktur Organisasi
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Departemen</h1>
        <p className="text-gray-400 mt-2 text-sm">{items.length} departemen</p>
      </div>
      {!items.length && <p className="text-gray-400">Belum ada departemen.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link key={item.id} href={`/departemen/${item.slug}`} className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon hover:bg-white/10 transition-all text-center group">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-radial-1 mb-3 overflow-hidden border border-white/10 group-hover:border-brand-neon transition-colors">
              {item.photoUrl && isWebOrLocalUrl(item.photoUrl) && <img src={item.photoUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover" />}
            </div>
            <h2 className="font-semibold text-white group-hover:text-brand-neon transition-colors">{item.name}</h2>
            {item.description && <p className="mt-3 text-sm text-gray-400 line-clamp-3">{item.description}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
