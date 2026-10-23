import Link from "next/link";
import { loadPublications } from "../../lib/publicationQuery";
import { publicationCategory } from "../../lib/publication";
import { isWebOrLocalUrl } from "../../lib/homeMedia";
import { Search, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export const revalidate = 300;

export default async function PublikasiPage({ searchParams }) {
  const { items, total, page, totalPages, categories, q, category } =
    await loadPublications(await searchParams);
  const pageHref = (number) =>
    `/publikasi?${new URLSearchParams({
      page: String(number),
      ...(q ? { q } : {}),
      ...(category ? { category } : {}),
    })}`;

  const featuredItem = items.length > 0 ? items[0] : null;

  return (
    <section className="px-6 pt-32 pb-24 max-w-[1120px] mx-auto relative z-10 text-left">
      {/* Page Header */}
      <div className="border-b border-[#e3bbb9]/15 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-1">
            01 / KAJIAN &amp; WARTA
          </span>
          <h1 className="font-barlow font-extrabold text-4xl sm:text-[46px] md:text-5xl leading-[1.05] tracking-[-1px] text-[#f8f1e7] uppercase mt-1">
            PUBLIKASI &amp; ARTIKEL
          </h1>
          <p className="font-dm text-sm sm:text-base leading-[24px] text-[#f8f1e7]/75 max-w-2xl mt-2">
            Kumpulan kajian hukum, siaran pers, artikel ilmiah, dan warta
            kegiatan resmi Kabinet Aksara Juang BEM FH UNAND.
          </p>
        </div>

        <div className="shrink-0">
          <span className="font-mono-lib text-[11px] leading-[16px] text-[#e3bbb9] font-semibold inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#1b080e]/85 border border-[#e3bbb9]/20 shadow-sm uppercase tracking-wider">
            {total} Publikasi{q || category ? " Ditemukan" : ""}
          </span>
        </div>
      </div>

      {/* Search Bar Box */}
      <div className="mb-10 rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 p-4 sm:p-5">
        <form
          method="get"
          action="/publikasi"
          className="flex flex-col sm:flex-row items-center gap-3 w-full"
        >
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f8f1e7]/40 pointer-events-none"
            />
            <input
              type="text"
              name="q"
              aria-label="Cari judul atau topik publikasi"
              defaultValue={q || ""}
              placeholder="Cari judul kajian, artikel, atau topik hukum..."
              className="w-full rounded-[4px] bg-[#22161c]/80 border border-[#e3bbb9]/20 pl-10 pr-4 py-2.5 text-sm text-[#f8f1e7] placeholder-[#f8f1e7]/40 focus:outline-none focus:border-[#e3bbb9]/60 font-dm transition-colors"
            />
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-[3px] bg-[#762d2e] hover:bg-[#8e1b2e] border border-[#e3bbb9]/30 text-[#f8f1e7] font-barlow font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_2px_8px_rgba(118,45,46,0.5)] shrink-0"
          >
            Cari Publikasi
          </button>
          {(q || category) && (
            <Link
              href="/publikasi"
              className="px-2 py-1 text-xs font-mono-lib text-[#e3bbb9] hover:underline uppercase transition-opacity shrink-0"
            >
              Reset filter
            </Link>
          )}
        </form>
      </div>

      {/* Featured Banner (Hero Card) */}
      {featuredItem && page === 1 && !q && !category && (
        <div className="mb-12">
          <Link
            href={`/publikasi/${featuredItem.slug}`}
            className="block relative rounded-[4px] overflow-hidden border border-[#e3bbb9]/20 bg-[#1a1517]/70 backdrop-blur-[10px] p-6 sm:p-8 md:p-10 min-h-[320px] md:min-h-[380px] flex flex-col justify-end group shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-[#e3bbb9]/40 hover:bg-[#26161e]/85 transition-all duration-300 text-left"
          >
            {featuredItem.imageUrl && isWebOrLocalUrl(featuredItem.imageUrl) ? (
              <>
                <img
                  src={featuredItem.imageUrl}
                  alt={featuredItem.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e070a] via-[#1a0c12]/80 to-transparent pointer-events-none" />
              </>
            ) : (
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, #9e1933 0%, #6e1223 25%, #460b16 55%, #170308 100%)",
                }}
              />
            )}

            {/* Top Badges */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="font-mono-lib font-bold text-[11px] leading-[17px] uppercase tracking-[1.1px] text-[#e3bbb9] bg-[#1b080e]/90 px-3 py-1 rounded-[3px] border border-[#e3bbb9]/20">
                PUBLIKASI UTAMA / HIGHLIGHT
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#1b080e]/90 border border-white/20 text-[10px] font-jakarta font-bold uppercase tracking-wider text-[#f8f1e7] backdrop-blur-md">
                {publicationCategory(featuredItem.category)}
              </span>
            </div>

            <div className="relative z-10 w-full mt-12">
              <div className="max-w-3xl mb-4">
                <span className="font-mono-lib text-xs text-[#e3bbb9] uppercase block mb-3">
                  {featuredItem.publishedAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Jakarta",
                  })}{" "}
                  &middot; PENULIS: {featuredItem.author}
                </span>

                <h2 className="font-barlow font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors uppercase leading-tight mb-3">
                  {featuredItem.title}
                </h2>
                <p className="font-dm text-sm sm:text-base leading-[24px] text-[#f8f1e7]/80 line-clamp-2 md:line-clamp-3">
                  {featuredItem.body}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#e3bbb9]/20 w-full">
                <span className="font-dm text-xs text-[#f8f1e7]/60">
                  Kajian &amp; Opini BEM FH UNAND
                </span>
                <span className="inline-flex items-center gap-1.5 font-dm text-xs font-semibold text-[#e3bbb9] group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Category Filter Pills & Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/publikasi${q ? `?q=${encodeURIComponent(q)}` : ""}`}
            className={`px-4 py-1.5 rounded-[3px] text-xs font-barlow font-bold uppercase tracking-wider transition-all ${
              !category
                ? "bg-[#762d2e] border border-[#e3bbb9]/40 text-[#f8f1e7] shadow-[0_2px_8px_rgba(118,45,46,0.5)]"
                : "bg-[#1a1517]/70 border border-[#e3bbb9]/15 text-[#f8f1e7]/60 hover:text-[#f8f1e7] hover:border-[#e3bbb9]/35"
            }`}
          >
            Semua
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/publikasi?category=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`px-4 py-1.5 rounded-[3px] text-xs font-barlow font-bold uppercase tracking-wider transition-all ${
                category === c
                  ? "bg-[#762d2e] border border-[#e3bbb9]/40 text-[#f8f1e7] shadow-[0_2px_8px_rgba(118,45,46,0.5)]"
                  : "bg-[#1a1517]/70 border border-[#e3bbb9]/15 text-[#f8f1e7]/60 hover:text-[#f8f1e7] hover:border-[#e3bbb9]/35"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
        <p className="font-mono-lib text-xs text-[#f8f1e7]/50 uppercase">
          {total} publikasi{q || category ? " ditemukan" : ""}
        </p>
      </div>

      {/* Grid Content */}
      {items.length === 0 ? (
        <div className="text-center py-16 rounded-[4px] bg-[#1a1517]/70 border border-[#e3bbb9]/15">
          <p className="font-dm text-sm text-[#f8f1e7]/60">
            {q || category
              ? "Tidak ada publikasi yang cocok dengan pencarian atau kategori ini."
              : "Belum ada publikasi."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => {
            const numLabel = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            const categoryName = publicationCategory(item.category);
            const hasValidImage =
              item.imageUrl && isWebOrLocalUrl(item.imageUrl);

            return (
              <Link
                key={item.id}
                href={`/publikasi/${item.slug}`}
                className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/35 hover:bg-[#26161e]/85 p-[25px] flex flex-col justify-between transition-all duration-300 group text-left shadow-[0_4px_12px_rgba(0,0,0,0.45)] hover:-translate-y-1 min-h-[390px]"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between font-mono-lib text-[11px] leading-[17px] uppercase mb-3">
                    <span className="text-[#e3bbb9] font-medium">
                      {numLabel} / {categoryName}
                    </span>
                    <span className="text-[#f8f1e7]/50 font-medium">
                      BEM FH UNAND
                    </span>
                  </div>

                  {/* Visual Banner Box */}
                  <div
                    className="w-full h-[170px] mb-4 border border-[#48121f] rounded-[2px] relative flex items-center justify-center overflow-hidden bg-[#240c14]"
                    style={{
                      background:
                        "linear-gradient(180deg, #9e1933 0%, #6e1223 15%, #460b16 35%, #27060d 60%, #170308 100%)",
                    }}
                  >
                    {hasValidImage ? (
                      <>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-[44px] h-[44px] rounded-[12px] bg-[#3a0d18] border border-[#e3bbb9]/20 flex items-center justify-center text-[#e3bbb9] shadow-[0_0_15px_rgba(158,25,51,0.5)]">
                        <BookOpen size={22} className="text-[#e3bbb9]" />
                      </div>
                    )}

                    {/* Top-Right Category Pill Badge */}
                    <div className="absolute top-3 right-3 px-3 py-0.5 rounded-full bg-[#1b080e]/85 border border-white/20 backdrop-blur-xl inline-flex items-center justify-center shadow-sm">
                      <span className="font-jakarta font-bold text-[10px] leading-[15px] text-[#f8f1e7]">
                        {categoryName}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="mb-2">
                    <span className="font-mono-lib text-[11px] text-[#e3bbb9] uppercase block mb-1">
                      {item.publishedAt.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "Asia/Jakarta",
                      })}
                    </span>
                    <h2 className="font-barlow font-bold text-[18px] sm:text-[20px] leading-[25px] tracking-[-0.45px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors uppercase line-clamp-2 mb-2">
                      {item.title}
                    </h2>
                    <p className="font-dm text-[13px] leading-[21px] text-[#f8f1e7]/75 line-clamp-2">
                      {item.body}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 mt-4 border-t border-[#e3bbb9]/25 flex items-center justify-between">
                  <span className="font-dm text-[12px] leading-[18px] text-[#f8f1e7]/60 group-hover:text-[#f8f1e7]/90 transition-colors truncate max-w-[200px]">
                    Penulis: {item.author}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="text-[#e3bbb9] group-hover:translate-x-0.5 transition-transform shrink-0"
                  >
                    <path
                      d="M5.25 2.91602L9.33333 6.99935L5.25 11.0827"
                      stroke="currentColor"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Halaman publikasi"
          className="flex items-center justify-center gap-4 mt-14 mb-6"
        >
          {page > 1 ? (
            <Link
              href={pageHref(page - 1)}
              aria-label="Halaman sebelumnya"
              className="w-10 h-10 rounded-[3px] bg-[#1a1517]/80 border border-[#e3bbb9]/20 text-[#f8f1e7] hover:border-[#e3bbb9]/60 hover:bg-[#26161e] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </Link>
          ) : (
            <span className="w-10 h-10 rounded-[3px] bg-[#1a1517]/40 border border-[#e3bbb9]/10 text-[#f8f1e7]/30 flex items-center justify-center cursor-not-allowed">
              <ChevronLeft size={18} />
            </span>
          )}

          <span className="font-mono-lib text-xs text-[#e3bbb9] uppercase tracking-wider">
            HALAMAN {page} DARI {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={pageHref(page + 1)}
              aria-label="Halaman berikutnya"
              className="w-10 h-10 rounded-[3px] bg-[#762d2e] hover:bg-[#8e1b2e] border border-[#e3bbb9]/40 text-[#f8f1e7] flex items-center justify-center transition-all cursor-pointer shadow-[0_2px_8px_rgba(118,45,46,0.5)]"
            >
              <ChevronRight size={18} />
            </Link>
          ) : (
            <span className="w-10 h-10 rounded-[3px] bg-[#1a1517]/40 border border-[#e3bbb9]/10 text-[#f8f1e7]/30 flex items-center justify-center cursor-not-allowed">
              <ChevronRight size={18} />
            </span>
          )}
        </nav>
      )}
    </section>
  );
}
