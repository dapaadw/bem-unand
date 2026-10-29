import Link from 'next/link';
import { loadPublications } from '../../lib/publicationQuery';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import Pagination from '../../components/Pagination';
import { Search, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PublikasiPage({ searchParams }) {
  const sp = await searchParams;
  const pageQuery = sp?.page;
  const q = sp?.q;
  const page = Math.max(1, parseInt(pageQuery, 10) || 1);
  const { items, totalPages, page: currentPage } = await loadPublications({ page, q });

  function pageHref(newPage) {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', String(newPage));
    if (q) params.set('q', q);
    const qs = params.toString();
    return `/publikasi${qs ? `?${qs}` : ''}`;
  }

  const featuredItem = items.length > 0 ? items[0] : null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-6 pt-32 pb-20 container mx-auto max-w-6xl relative z-10">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Publikasi
          </h1>

          {/* Search Form */}
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
            method="get"
            action="/publikasi"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                name="q"
                aria-label="Cari judul atau topik publikasi"
                defaultValue={q || ''}
                placeholder="Cari judul atau topik publikasi..."
                className="w-full rounded-full bg-[#1a0a13]/50 border border-white/15 pl-11 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-neon transition-colors backdrop-blur-md"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-neon text-brand-dark text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-md"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Featured Big Card (if on first page without search) */}
        {featuredItem && currentPage === 1 && !q && (
          <div className="mb-12">
            <Link
              href={`/publikasi/${featuredItem.slug}`}
              className="block relative rounded-3xl overflow-hidden border border-white/10 bg-[#1a0a13]/50 p-6 sm:p-8 md:p-10 min-h-[300px] md:min-h-[360px] flex flex-col justify-end group shadow-2xl hover:border-brand-neon hover:bg-[#23121b]/70 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(254,174,174,0.18)] transition-all duration-500 ease-out backdrop-blur-md"
            >
              {featuredItem.imageUrl && isWebOrLocalUrl(featuredItem.imageUrl) ? (
                <img
                  src={featuredItem.imageUrl}
                  alt={featuredItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/30 via-black/80 to-brand-dark flex items-center justify-center text-brand-neon/30">
                  <BookOpen size={80} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <span className="text-xs sm:text-sm text-gray-300 font-medium block mb-2.5">
                  {featuredItem.publishedAt.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'Asia/Jakarta',
                  })}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-brand-neon transition-colors leading-snug mb-3 text-balance">
                  {featuredItem.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-200/90 line-clamp-2 md:line-clamp-3 leading-relaxed mb-4">
                  {featuredItem.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-neon group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya &rarr;
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* List Grid */}
        {!items.length ? (
          <div className="text-center py-16 bg-[#1a0a13]/50 border border-white/10 rounded-2xl max-w-md mx-auto backdrop-blur-md">
            <p className="text-gray-400">Tidak ada publikasi yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/publikasi/${item.slug}`}
                className="bg-[#1a0a13]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon hover:bg-[#23121b]/70 hover:scale-[1.015] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(254,174,174,0.18)] transition-all duration-500 ease-out flex flex-col justify-between group backdrop-blur-md"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="h-48 w-full relative overflow-hidden bg-black/40 flex items-center justify-center">
                    {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-mid group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon">
                        <BookOpen size={24} />
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <span className="text-xs text-gray-400 font-medium block mb-1">
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
                <div className="px-5 pb-5 pt-2 flex items-center justify-end text-[11px] text-gray-500 border-t border-white/5">
                  <span className="text-brand-neon font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Baca Selengkapnya &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Numbered Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPageHref={pageHref}
        />
      </section>
    </div>
  );
}
