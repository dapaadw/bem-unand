import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  getPageHref,
  className = '',
}) {
  if (totalPages <= 1) return null;

  // Generate pagination items
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...');
    if (!pages.includes(totalPages)) pages.push(totalPages);
  }

  return (
    <nav
      aria-label="Navigasi Halaman"
      className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-12 mb-6 ${className}`}
    >
      {/* Tombol Sebelumnya */}
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          aria-label="Halaman Sebelumnya"
          className="inline-flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-brand-neon hover:text-brand-neon hover:bg-white/10 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed opacity-40 text-xs sm:text-sm font-semibold select-none"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Sebelumnya</span>
        </span>
      )}

      {/* Nomor Halaman: 1, 2, 3... */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`dots-${idx}`}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 font-bold select-none text-xs sm:text-sm"
              >
                ...
              </span>
            );
          }

          const isCurrent = p === currentPage;

          return isCurrent ? (
            <span
              key={p}
              aria-current="page"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-neon text-brand-dark font-extrabold flex items-center justify-center shadow-[0_0_15px_rgba(254,174,174,0.4)] scale-105 text-xs sm:text-sm select-none"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={getPageHref(p)}
              aria-label={`Ke Halaman ${p}`}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-brand-neon hover:text-brand-neon hover:bg-white/10 flex items-center justify-center transition-all text-xs sm:text-sm font-medium cursor-pointer active:scale-95"
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Tombol Selanjutnya */}
      {currentPage < totalPages ? (
        <Link
          href={getPageHref(currentPage + 1)}
          aria-label="Halaman Selanjutnya"
          className="inline-flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-brand-neon hover:text-brand-neon hover:bg-white/10 transition-all text-xs sm:text-sm font-semibold cursor-pointer active:scale-95"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed opacity-40 text-xs sm:text-sm font-semibold select-none"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
