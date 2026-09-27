import Link from 'next/link';
import { loadPublications } from '../../lib/publicationQuery';
import { publicationCategory } from '../../lib/publication';

export const revalidate = 300;

export default async function PublikasiPage({ searchParams }) {
  const { items, total, page, totalPages, categories, q, category } = await loadPublications(await searchParams);
  const pageHref = (number) => `/publikasi?${new URLSearchParams({ page: String(number), ...(q ? { q } : {}), ...(category ? { category } : {}) })}`;

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Publikasi</h1>

      <form className="flex flex-col sm:flex-row gap-3 mb-8" method="get">
        <input
          type="text"
          name="q"
          aria-label="Cari judul publikasi"
          defaultValue={q || ''}
          placeholder="Cari judul..."
          className="min-w-0 flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-neon"
        />
        <select
          name="category"
          aria-label="Kategori publikasi"
          defaultValue={category || ''}
          className="rounded-lg bg-brand-dark border border-white/10 px-4 py-2 text-white"
        >
          <option value="">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">
          Cari
        </button>
        {(q || category) && <Link href="/publikasi" className="px-4 py-2 text-brand-neon underline">Reset filter</Link>}
      </form>
      <p className="text-sm text-gray-400 mb-6">{total} publikasi{q || category ? ' ditemukan' : ''}</p>

      {items.length === 0 ? (
        <p className="text-gray-400">{q || category ? 'Tidak ada publikasi yang cocok dengan pencarian atau kategori ini.' : 'Belum ada publikasi.'}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/publikasi/${item.slug}`}
              className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors"
            >
              <span className="text-xs text-brand-neon uppercase tracking-wide">{publicationCategory(item.category)}</span>
              <h2 className="text-lg font-semibold mt-2 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-400">
                {item.publishedAt.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })} &middot; {item.author}
              </p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Halaman publikasi" className="flex flex-wrap items-center gap-2 justify-center mt-10">
          {page > 1 && <Link href={pageHref(page - 1)} className="px-3 py-2 rounded-lg bg-white/5">Sebelumnya</Link>}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => Math.max(1, Math.min(page - 2, totalPages - 4)) + i).map((p) => (
            <Link
              key={p}
              href={pageHref(p)}
              aria-label={`Halaman ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${p === page ? 'bg-brand-neon text-brand-dark font-bold' : 'bg-white/5 text-gray-300'}`}
            >
              {p}
            </Link>
          ))}
          {page < totalPages && <Link href={pageHref(page + 1)} className="px-3 py-2 rounded-lg bg-white/5">Berikutnya</Link>}
          <span className="text-sm text-gray-400">Halaman {page} dari {totalPages}</span>
        </nav>
      )}
    </section>
  );
}
