import Link from 'next/link';
import { loadPublications } from '../../lib/publicationQuery';
import { publicationCategory } from '../../lib/publication';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import { Search, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export const revalidate = 300;

export default async function PublikasiPage({ searchParams }) {
  const { items, total, page, totalPages, categories, q, category } = await loadPublications(await searchParams);
  const pageHref = (number) =>
    `/publikasi?${new URLSearchParams({
      page: String(number),
      ...(q ? { q } : {}),
      ...(category ? { category } : {}),
    })}`;

  const featuredItem = items.length > 0 ? items[0] : null;

  return (
    <section className="min-h-screen px-6 pt-32 pb-20 container mx-auto max-w-6xl">
      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-3">
          Publikasi
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Berita & Publikasi
        </h1>

        {/* Centered Search Bar */}
        <form method="get" action="/publikasi" className="relative max-w-xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            name="q"
            aria-label="Cari judul atau topik publikasi"
            defaultValue={q || ''}
            placeholder="Cari judul atau topik publikasi..."
            className="w-full rounded-full bg-white/5 border border-white/15 pl-11 pr-24 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-neon transition-colors"
          />
          {category && <input type="hidden" name="category" value={category} />}
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-brand-neon text-brand-dark text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Featured Banner / Carousel */}
      {featuredItem && page === 1 && !q && !category && (
        <div className="mb-14">
          <Link
            href={`/publikasi/${featuredItem.slug}`}
            className="block relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-red/35 via-black/85 to-brand-dark p-6 sm:p-8 md:p-12 min-h-[320px] md:min-h-[380px] flex flex-col justify-end group shadow-2xl hover:border-brand-neon/60 transition-all duration-300"
          >
            {featuredItem.imageUrl && isWebOrLocalUrl(featuredItem.imageUrl) && (
              <img
                src={featuredItem.imageUrl}
                alt={featuredItem.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top-Right Category Badge */}
            <span className="absolute top-5 right-5 px-3.5 py-1 rounded-full bg-black/70 border border-brand-neon/30 text-xs font-bold uppercase tracking-wider text-brand-neon backdrop-blur-md">
              {publicationCategory(featuredItem.category)}
            </span>

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs sm:text-sm text-gray-300 font-medium block mb-2">
                {featuredItem.publishedAt.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'Asia/Jakarta',
                })}{' '}
                &middot; {featuredItem.author}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-brand-neon transition-colors leading-tight mb-3">
                {featuredItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 md:line-clamp-3 leading-relaxed mb-4">
                {featuredItem.body}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-neon group-hover:translate-x-1 transition-transform">
                Baca Selengkapnya &rarr;
              </span>
            </div>
          </Link>

          {/* Carousel Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="w-6 h-2 rounded-full bg-brand-neon transition-all"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
          </div>
        </div>
      )}

      {/* Latest News Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Latest News</h2>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/publikasi${q ? `?q=${encodeURIComponent(q)}` : ''}`}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !category
                ? 'bg-brand-neon text-brand-dark shadow-[0_0_12px_rgba(254,174,174,0.3)]'
                : 'bg-white/5 border border-white/15 text-gray-300 hover:border-brand-neon/60 hover:text-white'
            }`}
          >
            Semua
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/publikasi?category=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                category === c
                  ? 'bg-brand-neon text-brand-dark shadow-[0_0_12px_rgba(254,174,174,0.3)]'
                  : 'bg-white/5 border border-white/15 text-gray-300 hover:border-brand-neon/60 hover:text-white'
              }`}
            >
              {c}
            </Link>
          ))}
          {(q || category) && (
            <Link href="/publikasi" className="ml-auto text-xs text-brand-neon hover:underline">
              Reset filter
            </Link>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-6">
        {total} publikasi{q || category ? ' ditemukan' : ''}
      </p>

      {/* Grid Content */}
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-gray-400">
            {q || category
              ? 'Tidak ada publikasi yang cocok dengan pencarian atau kategori ini.'
              : 'Belum ada publikasi.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/publikasi/${item.slug}`}
              className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Card Thumbnail / Header */}
                <div className="h-44 sm:h-48 relative overflow-hidden bg-gradient-to-br from-brand-red/25 via-black/75 to-brand-dark flex items-center justify-center border-b border-white/5">
                  {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon/70 group-hover:scale-110 group-hover:text-brand-neon transition-transform duration-300">
                      <BookOpen size={24} />
                    </div>
                  )}
                  {/* Top-Right Category Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-brand-neon backdrop-blur-md">
                    {publicationCategory(item.category)}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <span className="text-xs text-gray-400 font-medium block mb-2">
                    {item.publishedAt.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      timeZone: 'Asia/Jakarta',
                    })}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-neon transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-white/5">
                <span className="truncate">{item.author}</span>
                <span className="text-brand-neon font-semibold group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Halaman publikasi" className="flex items-center justify-center gap-4 mt-12 mb-6">
          {page > 1 ? (
            <Link
              href={pageHref(page - 1)}
              aria-label="Halaman sebelumnya"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-brand-neon hover:text-brand-neon flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </Link>
          ) : (
            <span className="w-10 h-10 rounded-full bg-white/5 border border-white/5 text-gray-600 flex items-center justify-center cursor-not-allowed opacity-40">
              <ChevronLeft size={18} />
            </span>
          )}

          <span className="text-sm font-medium text-gray-300">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={pageHref(page + 1)}
              aria-label="Halaman berikutnya"
              className="w-10 h-10 rounded-full bg-brand-neon text-brand-dark hover:opacity-90 flex items-center justify-center transition-all cursor-pointer font-bold shadow-[0_0_15px_rgba(254,174,174,0.3)]"
            >
              <ChevronRight size={18} />
            </Link>
          ) : (
            <span className="w-10 h-10 rounded-full bg-white/5 border border-white/5 text-gray-600 flex items-center justify-center cursor-not-allowed opacity-40">
              <ChevronRight size={18} />
            </span>
          )}
        </nav>
      )}
    </section>
  );
}
