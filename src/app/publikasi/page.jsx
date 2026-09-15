import Link from 'next/link';
import { prisma } from '../../lib/prisma';

const PAGE_SIZE = 9;

export const revalidate = 300;

export default async function PublikasiPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page || '1', 10));
  const q = sp?.q?.trim();
  const category = sp?.category?.trim();

  const where = {
    ...(q ? { title: { contains: q } } : {}),
    ...(category ? { category } : {}),
  };

  const [items, total, categories] = await Promise.all([
    prisma.publikasi.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.publikasi.count({ where }),
    prisma.publikasi.findMany({ distinct: ['category'], select: { category: true } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Publikasi</h1>

      <form className="flex flex-col sm:flex-row gap-3 mb-8" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q || ''}
          placeholder="Cari judul..."
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-neon"
        />
        <select
          name="category"
          defaultValue={category || ''}
          className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
        >
          <option value="">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c.category} value={c.category}>{c.category}</option>
          ))}
        </select>
        <button type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">
          Cari
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-gray-400">Belum ada publikasi.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/publikasi/${item.slug}`}
              className="block bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors"
            >
              <span className="text-xs text-brand-neon uppercase tracking-wide">{item.category}</span>
              <h2 className="text-lg font-semibold mt-2 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-400">
                {item.publishedAt.toLocaleDateString('id-ID')} &middot; {item.author}
              </p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/publikasi?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${p === page ? 'bg-brand-neon text-brand-dark font-bold' : 'bg-white/5 text-gray-300'}`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
