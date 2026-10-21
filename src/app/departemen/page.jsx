import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import { HARDCODED_DEPARTEMEN } from '../../data/departemen';



export const revalidate = 3600;

export default async function DepartemenPage() {
  let dbItems = [];
  try {
    dbItems = await prisma.departemen.findMany({ select: { slug: true, photoUrl: true } });
  } catch {
    dbItems = [];
  }

  const dbPhotoMap = new Map(dbItems.map((d) => [d.slug, d.photoUrl]));

  // Use hardcoded departments as source of truth, merging any DB photo customizations
  const items = HARDCODED_DEPARTEMEN.map((dept) => ({
    ...dept,
    photoUrl: dbPhotoMap.get(dept.slug) || dept.photoUrl,
  }));

  return (
    <section className="px-6 pt-32 pb-24 max-w-[1120px] mx-auto relative z-10 text-left">
      {/* Page Header matching Home style */}
      <div className="border-b border-[#e3bbb9]/15 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-1">
            01 / STRUKTUR ORGANISASI
          </span>
          <h1 className="font-barlow font-extrabold text-4xl sm:text-[46px] md:text-5xl leading-[1.05] tracking-[-1px] text-[#f8f1e7] uppercase mt-1">
            DEPARTEMEN &amp; BIRO
          </h1>
          <p className="font-dm text-sm sm:text-base leading-[24px] text-[#f8f1e7]/75 max-w-2xl mt-2">
            Mengenal seluruh departemen, biro, lembaga, dan kantor kepengurusan Kabinet Aksara Juang BEM FH UNAND dalam menjalankan roda organisasi.
          </p>
        </div>

        <div className="shrink-0">
          <span className="font-mono-lib text-[11px] leading-[16px] text-[#e3bbb9] font-semibold inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#1b080e]/85 border border-[#e3bbb9]/20 shadow-sm uppercase tracking-wider">
            {items.length} Departemen Tetap
          </span>
        </div>
      </div>

      {!items.length ? (
        <div className="text-center py-16 rounded-[4px] bg-[#1a1517]/70 border border-[#e3bbb9]/15">
          <p className="font-dm text-sm text-[#f8f1e7]/60">Belum ada data departemen.</p>
        </div>
      ) : (
        /* 3-column layout matching user request */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const numLabel = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            const categoryLabel = item.category || 'Departemen';
            const hasValidPhoto = item.photoUrl && isWebOrLocalUrl(item.photoUrl);

            return (
              <Link
                key={item.id}
                href={`/departemen/${item.slug}`}
                className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/35 hover:bg-[#26161e]/85 p-[25px] flex flex-col justify-between transition-all duration-300 group shadow-[0_4px_12px_rgba(0,0,0,0.45)] hover:-translate-y-1 text-left min-h-[420px]"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between font-mono-lib text-[11px] leading-[17px] uppercase mb-3">
                    <span className="text-[#e3bbb9] font-medium">{numLabel} / {categoryLabel}</span>
                    <span className="text-[#f8f1e7]/50 font-medium">BEM FH UNAND</span>
                  </div>

                  {/* Visual Box with gradient fallback matching Home */}
                  <div
                    className="w-full h-[175px] mb-4 border border-[#48121f] rounded-[2px] relative flex items-center justify-center overflow-hidden bg-[#240c14]"
                    style={{
                      background:
                        'linear-gradient(180deg, #9e1933 0%, #6e1223 15%, #460b16 35%, #27060d 60%, #170308 100%)',
                    }}
                  >
                    {hasValidPhoto ? (
                      <>
                        <img
                          src={item.photoUrl}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-[52px] h-[52px] rounded-[12px] bg-[#3a0d18] border border-[#e3bbb9]/25 flex items-center justify-center text-[#e3bbb9] font-barlow font-bold text-2xl shadow-[0_0_15px_rgba(158,25,51,0.5)] group-hover:scale-105 transition-transform">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    {/* Category pill badge */}
                    <div className="absolute top-3 right-3 px-3 py-0.5 rounded-full bg-[#1b080e]/85 border border-white/20 backdrop-blur-xl inline-flex items-center justify-center shadow-sm">
                      <span className="font-jakarta font-bold text-[10px] leading-[15px] text-[#f8f1e7]">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Name Title */}
                  <h2 className="font-barlow font-bold text-[19px] sm:text-[21px] leading-[26px] tracking-[-0.45px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors uppercase line-clamp-2 mb-2.5">
                    {item.name}
                  </h2>

                  {/* Description from docx */}
                  {item.description && (
                    <p className="font-dm text-[13px] leading-[22px] text-[#f8f1e7]/75 line-clamp-3 mb-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Footer link row */}
                <div className="pt-3 mt-4 border-t border-[#e3bbb9]/25 flex items-center justify-between">
                  <span className="font-dm text-[12px] leading-[18px] text-[#f8f1e7]/60 group-hover:text-[#f8f1e7]/90 transition-colors">
                    Struktur &amp; Program Kerja
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="text-[#e3bbb9] group-hover:translate-x-0.5 transition-transform"
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
    </section>
  );
}
