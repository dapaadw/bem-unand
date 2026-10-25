import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { kegiatanFilters } from '../../lib/kegiatan';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import { Search, Calendar, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';



export const revalidate = 300;

export default async function KegiatanPage({ searchParams }) {
  const filter = kegiatanFilters(await searchParams);
  const { page: pageQuery } = await searchParams;
  const page = Math.max(1, parseInt(pageQuery, 10) || 1);
  const pageSize = 9;

  const where = filter.where || {};
  const total = await prisma.kegiatan.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  const items = await prisma.kegiatan.findMany({
    where,
    orderBy: [{ publishedAt: 'desc' }, { date: 'desc' }, { id: 'desc' }],
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const featuredItem = items.length > 0 && !filter.q && !filter.type && currentPage === 1 ? items[0] : null;

  function pageHref(newPage) {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', String(newPage));
    if (filter.q) params.set('q', filter.q);
    if (filter.type) params.set('type', filter.type);
    const qs = params.toString();
    return `/kegiatan${qs ? `?${qs}` : ''}`;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-6 pt-32 pb-20 container mx-auto max-w-6xl relative z-10">
        {/* Page Header */}
        <div className="text-center mb-10">
          {/* <span className="inline-block px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-3">
            Agenda &amp; Acara
          </span> */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Kegiatan
          </h1>
          {/* <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-8">
            Temukan informasi kompetisi hukum bergengsi, seminar nasional, serta seluruh agenda kegiatan mahasiswa Fakultas Hukum Universitas Andalas.
          </p> */}

          {/* Search Form */}
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
            method="get"
            action="/kegiatan"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                name="q"
                aria-label="Cari nama kegiatan atau lomba"
                defaultValue={filter.q || ''}
                placeholder="Cari nama kegiatan atau lomba..."
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

        {/* Featured Big Card (if no search active) */}
        {featuredItem && (
          <div className="mb-12">
            <Link
              href={`/kegiatan/${featuredItem.slug}`}
              className="block relative rounded-3xl overflow-hidden border border-white/10 bg-[#1a0a13]/50 p-6 sm:p-8 md:p-10 min-h-[300px] md:min-h-[360px] flex flex-col justify-end group shadow-2xl hover:border-brand-neon hover:bg-[#23121b]/70 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(254,174,174,0.18)] transition-all duration-500 ease-out backdrop-blur-md"
            >
              {featuredItem.imageUrl && isWebOrLocalUrl(featuredItem.imageUrl) ? (
                <img
                  src={featuredItem.imageUrl}
                  alt={featuredItem.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/30 via-black/80 to-brand-dark flex items-center justify-center text-brand-neon/30">
                  <Calendar size={80} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                {/* Meta details: Date · Time · Location */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-300 font-medium mb-3">
                  <span className="flex items-center gap-1.5 text-brand-neon">
                    <Calendar size={14} />
                    <span>
                      {featuredItem.date.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'Asia/Jakarta',
                      })}
                    </span>
                  </span>
                  {featuredItem.time && (
                    <>
                      <span className="text-white/30">&bull;</span>
                      <span className="flex items-center gap-1.5 text-gray-300">
                        <Clock size={13} className="text-brand-neon" />
                        <span>{featuredItem.time} WIB</span>
                      </span>
                    </>
                  )}
                  {featuredItem.location && (
                    <>
                      <span className="text-white/30">&bull;</span>
                      <span className="flex items-center gap-1.5 text-gray-300 max-w-xs sm:max-w-sm truncate">
                        <MapPin size={13} className="text-brand-neon shrink-0" />
                        <span className="truncate">{featuredItem.location}</span>
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-brand-neon transition-colors leading-snug mb-3 text-balance">
                  {featuredItem.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-200/90 line-clamp-2 md:line-clamp-3 leading-relaxed mb-4">
                  {featuredItem.description}
                </p>

                {/* Action & Organizer */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand-neon group-hover:translate-x-1 transition-transform">
                    Detail Acara <ArrowRight size={14} />
                  </span>
                  {featuredItem.organizer && (
                    <>
                      <span className="text-white/30">&bull;</span>
                      <span className="text-gray-400">
                        Penyelenggara: <span className="text-gray-300">{featuredItem.organizer}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* List Grid */}
        {!items.length ? (
          <div className="text-center py-16 bg-[#1a0a13]/50 border border-white/10 rounded-2xl max-w-md mx-auto backdrop-blur-md">
            <p className="text-gray-400">Tidak ada kegiatan yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/kegiatan/${item.slug}`}
                className="bg-[#1a0a13]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon hover:bg-[#23121b]/70 hover:scale-[1.015] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(254,174,174,0.18)] transition-all duration-500 ease-out flex flex-col justify-between group backdrop-blur-md"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="h-48 w-full relative overflow-hidden bg-black/40 flex items-center justify-center">
                    {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon">
                        <Calendar size={24} />
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                      <Calendar size={13} className="text-brand-neon shrink-0" />
                      <span>
                        {item.date.toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          timeZone: 'Asia/Jakarta',
                        })}
                      </span>
                      {item.time && <span>&middot; {item.time} WIB</span>}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-2 truncate">
                      <MapPin size={12} className="text-brand-neon/80 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <h2 className="text-base font-bold text-white group-hover:text-brand-neon transition-colors line-clamp-2 mb-2 leading-snug">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-4 pt-2 flex items-center justify-between text-[11px] text-gray-400 border-t border-white/5">
                  <span className="truncate pr-2">Oleh: {item.organizer}</span>
                  <span className="text-brand-neon font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                    Detail <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav aria-label="Halaman kegiatan" className="flex items-center justify-center gap-4 mt-12 mb-6">
            {currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1)}
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
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={pageHref(currentPage + 1)}
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
    </div>
  );
}
