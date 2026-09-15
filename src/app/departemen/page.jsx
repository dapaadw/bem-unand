import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const revalidate = 3600;

export default async function DepartemenPage() {
  const items = await prisma.departemen.findMany({ orderBy: { name: 'asc' } });

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Departemen</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link key={item.id} href={`/departemen/${item.slug}`} className="block bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-radial-1 mb-3 overflow-hidden">
              {item.photoUrl && <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />}
            </div>
            <h2 className="font-semibold">{item.name}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
