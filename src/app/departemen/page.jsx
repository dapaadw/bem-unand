import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { isWebOrLocalUrl } from '../../lib/homeMedia';

export const revalidate = 3600;

export default async function DepartemenPage() {
  const items = await prisma.departemen.findMany({ orderBy: { name: 'asc' } });

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Departemen</h1>
      <p className="text-gray-400 mb-8">{items.length} departemen</p>
      {!items.length && <p className="text-gray-400">Belum ada departemen.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link key={item.id} href={`/departemen/${item.slug}`} className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-radial-1 mb-3 overflow-hidden">
              {item.photoUrl && isWebOrLocalUrl(item.photoUrl) && <img src={item.photoUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover" />}
            </div>
            <h2 className="font-semibold">{item.name}</h2>
            {item.description && <p className="mt-3 text-sm text-gray-400 line-clamp-3">{item.description}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
