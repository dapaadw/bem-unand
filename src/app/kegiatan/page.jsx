import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { kegiatanFilters } from '../../lib/kegiatan';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import { Search, Trophy, Calendar, Clock, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

export const revalidate = 300;

export default async function KegiatanPage({ searchParams }) {
  const filter = kegiatanFilters(await searchParams);
  const { q, type } = filter;

  const items = filter.error
    ? []
    : await prisma.kegiatan.findMany({
        where: filter.where,
        orderBy: [{ date: 'desc' }, { id: 'desc' }],
      });

  const featuredItem = items.length > 0 && !q && !type ? items[0] : null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-4 sm:px-6 pt-32 pb-20 container mx-auto max-w-7xl relative z-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-3">
          Agenda &amp; Acara
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Kegiatan &amp; Lomba Mahasiswa
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-8">
          Temukan informasi kompetisi hukum bergengsi, seminar nasional, serta seluruh agenda kegiatan mahasiswa Fakultas Hukum Universitas Andalas.
        </p>

        {/* Search & Filter Form */}
        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto"
          method="get"
          action="/kegiatan"
        >
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              name="q"
              aria-label="Cari nama kegiatan atau lomba"
              defaultValue={q || ''}
              placeholder="Cari nama kegiatan atau lomba..."
              className="w-full rounded-full bg-white/5 border border-white/15 pl-11 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-neon transition-colors"
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <select
              aria-label="Jenis kegiatan"
              name="type"
              defaultValue={filter.error ? '' : type}
              className="w-full sm:w-auto appearance-none rounded-full bg-brand-dark border border-white/15 pl-5 pr-11 py-3 text-sm text-white focus:outline-none focus:border-brand-neon cursor-pointer transition-colors"
            >
              <option value="">Semua Tipe</option>
              <option value="LOMBA">Lomba</option>
              <option value="INTERNAL">Kegiatan Internal</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-neon text-brand-dark text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(254,174,174,0.3)]"
          >
            Cari
          </button>
          {(q || type) && (
            <Link
              href="/kegiatan"
              className="px-2 py-1 text-xs text-brand-neon underline hover:opacity-80 transition-opacity"
            >
              Reset filter
            </Link>
          )}
        </form>
      </div>

      {filter.error && (
        <p role="alert" className="text-center text-red-400 mb-6 text-sm font-medium">
          {filter.error}
        </p>
      )}

      {/* Featured Event Banner (Hero) */}
      {featuredItem && (
        <div className="mb-14">
          <Link
            href={`/kegiatan/${featuredItem.slug}`}
            className="block relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-red/40 via-black/85 to-brand-dark p-6 sm:p-8 md:p-12 min-h-[340px] md:min-h-[400px] flex flex-col justify-end group shadow-2xl hover:border-brand-neon/60 transition-all duration-300"
          >
            {featuredItem.imageUrl && isWebOrLocalUrl(featuredItem.imageUrl) && (
              <img
                src={featuredItem.imageUrl}
                alt={featuredItem.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-black/70 border border-white/20 text-xs font-bold uppercase tracking-wider text-brand-neon backdrop-blur-md">
                {featuredItem.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}
              </span>
            </div>

            <div className="relative z-10 w-full">
              <div className="max-w-3xl mb-4">
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 font-medium mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-neon" />
                    {featuredItem.date.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'Asia/Jakarta',
                    })}
                  </span>
                  {featuredItem.time && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-neon" />
                      {featuredItem.time} WIB
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-brand-neon" />
                    {featuredItem.location}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:text-brand-neon transition-colors leading-tight mb-3">
                  {featuredItem.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {featuredItem.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 w-full">
                <span className="text-xs text-gray-400">Penyelenggara: {featuredItem.organizer}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-neon group-hover:translate-x-1 transition-transform">
                  Lihat Detail Agenda &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Filter Tabs & Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/kegiatan${q ? `?q=${encodeURIComponent(q)}` : ''}`}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !type
                ? 'bg-brand-neon text-brand-dark shadow-[0_0_12px_rgba(254,174,174,0.3)]'
                : 'bg-white/5 border border-white/15 text-gray-300 hover:border-brand-neon/60 hover:text-white'
            }`}
          >
            Semua
          </Link>
          <Link
            href={`/kegiatan?type=LOMBA${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              type === 'LOMBA'
                ? 'bg-brand-neon text-brand-dark shadow-[0_0_12px_rgba(254,174,174,0.3)]'
                : 'bg-white/5 border border-white/15 text-gray-300 hover:border-brand-neon/60 hover:text-white'
            }`}
          >
            Lomba
          </Link>
          <Link
            href={`/kegiatan?type=INTERNAL${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              type === 'INTERNAL'
                ? 'bg-brand-neon text-brand-dark shadow-[0_0_12px_rgba(254,174,174,0.3)]'
                : 'bg-white/5 border border-white/15 text-gray-300 hover:border-brand-neon/60 hover:text-white'
            }`}
          >
            Kegiatan Internal
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          {items.length} kegiatan{q || type ? ' ditemukan' : ''}
        </p>
      </div>

      {/* Grid Content */}
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-gray-400">
            {q || type
              ? 'Tidak ada kegiatan yang cocok dengan pencarian atau jenis ini.'
              : 'Belum ada kegiatan.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/kegiatan/${item.slug}`}
              className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Card Thumbnail / Header */}
                <div className="h-40 sm:h-44 relative overflow-hidden bg-gradient-to-br from-brand-red/25 via-black/75 to-brand-dark flex items-center justify-center border-b border-white/5">
                  {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon/70 group-hover:scale-110 group-hover:text-brand-neon transition-transform duration-300">
                      {item.type === 'LOMBA' ? <Trophy size={24} className="text-brand-neon" /> : <Calendar size={24} className="text-brand-neon" />}
                    </div>
                  )}

                  {/* Top-Right Category Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-brand-neon backdrop-blur-md">
                    {item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <span className="text-xs text-gray-400 font-medium block mb-1">
                    {item.date.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      timeZone: 'Asia/Jakarta',
                    })}
                    {item.time ? ` · ${item.time} WIB` : ''} &middot; {item.location}
                  </span>
                  <h2 className="text-base font-bold text-white group-hover:text-brand-neon transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.name}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400">Penyelenggara: {item.organizer}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-white/5">
                <span className="text-brand-neon font-medium">
                  {item.type === 'LOMBA' ? 'Kompetisi' : 'Agenda Internal'}
                </span>
                <span className="text-brand-neon font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Detail <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  </div>
);
}
