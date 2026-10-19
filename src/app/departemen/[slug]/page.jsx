import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { isDepartmentHead, departmentContactUrl } from '../../../lib/departemen';
import { getHardcodedDepartemenBySlug } from '../../../data/departemen';

export const revalidate = 3600;

export default async function DepartemenDetailPage({ params }) {
  const { slug } = await params;
  const hardcoded = getHardcodedDepartemenBySlug(slug);

  if (!hardcoded) notFound();

  let dbItem = null;
  try {
    dbItem = await prisma.departemen.findUnique({
      where: { slug },
      include: { staff: true, proker: true, contact: true },
    });
  } catch {
    dbItem = null;
  }

  const item = {
    ...hardcoded,
    photoUrl: dbItem?.photoUrl || hardcoded.photoUrl,
    contact: dbItem?.contact || null,
    staff: (dbItem?.staff && dbItem.staff.length > 0) ? dbItem.staff : hardcoded.staff,
    proker: (dbItem?.proker && dbItem.proker.length > 0) ? dbItem.proker : hardcoded.proker,
  };

  const heads = item.staff.filter((s) => isDepartmentHead(s.role));
  const others = item.staff.filter((s) => !isDepartmentHead(s.role));
  const hasValidPhoto = item.photoUrl && isWebOrLocalUrl(item.photoUrl);

  return (
    <article className="px-6 pt-32 pb-24 max-w-[960px] mx-auto relative z-10 text-left">
      {/* Back Button */}
      <Link
        href="/departemen"
        className="inline-flex items-center gap-2 mb-8 font-mono-lib text-xs text-[#e3bbb9] hover:text-[#f8f1e7] transition-colors uppercase tracking-wider group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <path
            d="M8.75 11.0827L4.66667 6.99935L8.75 2.91602"
            stroke="currentColor"
            strokeWidth="1.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Kembali ke Departemen
      </Link>

      {/* Main Department Banner Card */}
      <div className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/20 p-6 sm:p-8 md:p-10 mb-10 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          {/* Photo / Emblem Box */}
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-[3px] border border-[#48121f] overflow-hidden relative flex items-center justify-center bg-[#240c14] shadow-md"
            style={{
              background:
                'linear-gradient(180deg, #9e1933 0%, #6e1223 15%, #460b16 35%, #27060d 60%, #170308 100%)',
            }}
          >
            {hasValidPhoto ? (
              <img
                src={item.photoUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-barlow font-bold text-3xl sm:text-4xl text-[#e3bbb9] tracking-wider">
                {item.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1">
            <span className="font-mono-lib font-bold text-[11px] leading-[16px] tracking-[1.1px] text-[#e3bbb9] uppercase block mb-1">
              STRUKTUR ORGANISASI &middot; BEM FH UNAND
            </span>
            <h1 className="font-barlow font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#f8f1e7] leading-tight mb-3">
              {item.name}
            </h1>
            {item.description && (
              <p className="font-dm text-sm sm:text-base leading-[25px] text-[#f8f1e7]/80 whitespace-pre-wrap">
                {item.description}
              </p>
            )}

            {/* Department Contacts */}
            {item.contact && (item.contact.whatsappUrl || item.contact.instagramUrl) && (
              <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-[#e3bbb9]/15">
                {item.contact.whatsappUrl && departmentContactUrl(item.contact.whatsappUrl, 'whatsapp') && (
                  <a
                    href={item.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[3px] bg-[#762d2e] hover:bg-[#8e1b2e] border border-[#e3bbb9]/30 text-[#f8f1e7] px-4 py-2 text-xs font-dm font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-[0_2px_8px_rgba(118,45,46,0.4)]"
                  >
                    <span>Hubungi via WhatsApp</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                {item.contact.instagramUrl && departmentContactUrl(item.contact.instagramUrl, 'instagram') && (
                  <a
                    href={item.contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[3px] bg-[#1a1517]/90 hover:bg-[#281b22] border border-[#e3bbb9]/20 text-[#f8f1e7] px-4 py-2 text-xs font-dm font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
                  >
                    <span>Kanal Instagram</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leadership / Kepala Departemen Section */}
      {heads.length > 0 && (
        <div className="mb-12">
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-3">
            PIMPINAN DEPARTEMEN
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {heads.map((kepala) => (
              <div
                key={kepala.id}
                className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/20 hover:border-[#e3bbb9]/35 p-6 flex flex-col sm:flex-row items-start gap-5 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
              >
                {kepala.photoUrl && isWebOrLocalUrl(kepala.photoUrl) ? (
                  <img
                    src={kepala.photoUrl}
                    alt={kepala.name}
                    loading="lazy"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-[3px] object-cover shrink-0 border border-[#e3bbb9]/25 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[3px] bg-[#3a0d18] border border-[#e3bbb9]/25 shrink-0 flex items-center justify-center text-[#e3bbb9] font-barlow font-bold text-2xl">
                    {kepala.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-mono-lib text-[11px] text-[#e3bbb9] uppercase tracking-wider block mb-1">
                    {kepala.role}
                  </span>
                  <h3 className="font-barlow font-bold text-xl uppercase text-[#f8f1e7] leading-snug mb-1">
                    {kepala.name}
                  </h3>
                  {kepala.identity && (
                    <p className="font-dm text-xs text-[#f8f1e7]/65 mt-1.5 leading-relaxed">
                      {kepala.identity}
                    </p>
                  )}
                  {kepala.achievements && (
                    <p className="font-dm text-xs text-[#e3bbb9]/85 mt-2 leading-relaxed">
                      Prestasi: {kepala.achievements}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff / BPH Section */}
      {others.length > 0 && (
        <div className="mb-12">
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-3">
            STAFF &amp; ANGGOTA DEPARTEMEN
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((s) => (
              <div
                key={s.id}
                className="rounded-[4px] bg-[#1a1517]/60 backdrop-blur-[10px] border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/30 p-4 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  {s.photoUrl && isWebOrLocalUrl(s.photoUrl) ? (
                    <img
                      src={s.photoUrl}
                      alt={s.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-[2px] object-cover shrink-0 border border-[#e3bbb9]/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-[2px] bg-[#3a0d18] border border-[#e3bbb9]/20 shrink-0 flex items-center justify-center text-[#e3bbb9] font-barlow font-bold text-base">
                      {s.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-barlow font-bold text-base uppercase text-[#f8f1e7] leading-tight">
                      {s.name}
                    </h4>
                    <span className="font-mono-lib text-[10px] text-[#e3bbb9] uppercase block mt-0.5">
                      {s.role}
                    </span>
                  </div>
                </div>

                {(s.identity || s.achievements) && (
                  <div className="pt-2 border-t border-[#e3bbb9]/10 font-dm text-[11px] text-[#f8f1e7]/60 space-y-1">
                    {s.identity && <p>{s.identity}</p>}
                    {s.achievements && <p className="text-[#e3bbb9]/80">{s.achievements}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Program Kerja Section */}
      <div className="mb-8">
        <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-3">
          PROGRAM KERJA &amp; AGENDA
        </span>

        {item.proker.length > 0 ? (
          <div className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/20 p-6 sm:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
            <div className="divide-y divide-[#e3bbb9]/15">
              {item.proker.map((p, idx) => (
                <div key={p.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="font-mono-lib text-xs text-[#e3bbb9] font-bold shrink-0 mt-0.5">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    <div>
                      <h4 className="font-barlow font-bold text-lg uppercase text-[#f8f1e7] leading-snug">
                        {p.name}
                      </h4>
                      {p.description && (
                        <p className="font-dm text-sm leading-[22px] text-[#f8f1e7]/70 mt-1">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[4px] bg-[#1a1517]/60 border border-[#e3bbb9]/15 p-6 text-center">
            <p className="font-dm text-sm text-[#f8f1e7]/60">
              Daftar program kerja sedang disiapkan oleh pengurus departemen.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
