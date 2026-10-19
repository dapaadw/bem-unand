import { prisma } from '../../lib/prisma';
import { isDriveUrl } from '../../lib/fhGuide';
import { ChevronDown, ExternalLink, FileText, HelpCircle } from 'lucide-react';

export const revalidate = 3600;

export default async function FhGuidePage() {
  const [links, faqs] = await Promise.all([
    prisma.guideLink.findMany({ orderBy: { category: 'asc' } }),
    prisma.faq.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);

  const grouped = links.reduce((acc, link) => {
    acc[link.category] = acc[link.category] || [];
    acc[link.category].push(link);
    return acc;
  }, Object.create(null));

  return (
    <section className="px-6 pt-32 pb-24 max-w-[1120px] mx-auto relative z-10 text-left">
      {/* Page Header */}
      <div className="border-b border-[#e3bbb9]/15 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-1">
            04 / PUSAT INFORMASI
          </span>
          <h1 className="font-barlow font-extrabold text-4xl sm:text-[46px] md:text-5xl leading-[1.05] tracking-[-1px] text-[#f8f1e7] uppercase mt-1">
            FH GUIDE &amp; DIREKTORI
          </h1>
          <p className="font-dm text-sm sm:text-base leading-[24px] text-[#f8f1e7]/75 max-w-2xl mt-2">
            Direktori dokumen resmi, panduan akademik, administrasi perkuliahan, dan pertanyaan umum seputar kampus Fakultas Hukum Universitas Andalas.
          </p>
        </div>

        <div className="shrink-0">
          <span className="font-mono-lib text-[11px] leading-[16px] text-[#e3bbb9] font-semibold inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#1b080e]/85 border border-[#e3bbb9]/20 shadow-sm uppercase tracking-wider">
            {links.length} Dokumen Panduan
          </span>
        </div>
      </div>

      {/* Directory Links Grid / Sections */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-16 rounded-[4px] bg-[#1a1517]/70 border border-[#e3bbb9]/15 mb-12">
          <p className="font-dm text-sm text-[#f8f1e7]/60">Direktori dokumen belum tersedia.</p>
        </div>
      ) : (
        <div className="space-y-6 mb-16">
          {Object.entries(grouped).map(([category, items], idx) => {
            const numLabel = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <div
                key={category}
                className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/30 p-6 sm:p-7 shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#e3bbb9]/15 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-lib font-bold text-[11px] text-[#e3bbb9] uppercase">
                      {numLabel} / PANDUAN
                    </span>
                    <span className="text-[#e3bbb9]/40">&bull;</span>
                    <h2 className="font-barlow font-bold text-lg sm:text-xl uppercase tracking-[-0.3px] text-[#f8f1e7]">
                      {category}
                    </h2>
                  </div>
                  <span className="font-mono-lib text-[10px] text-[#f8f1e7]/50 uppercase">
                    {items.length} Tautan
                  </span>
                </div>

                {/* Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((link) => {
                    const validDrive = isDriveUrl(link.url);
                    return (
                      <div key={link.id}>
                        {validDrive ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-[4px] bg-[#22161c]/70 border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/35 hover:bg-[#2a1721] p-3.5 flex items-center justify-between gap-3 transition-all group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-[3px] bg-[#3a0d18] border border-[#e3bbb9]/20 flex items-center justify-center text-[#e3bbb9] shrink-0">
                                <FileText size={16} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-dm text-sm font-semibold text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors truncate">
                                  {link.title}
                                </p>
                                <span className="font-mono-lib text-[10px] text-[#e3bbb9]/70 uppercase block">
                                  Google Drive &bull; Tab Baru
                                </span>
                              </div>
                            </div>
                            <ExternalLink
                              size={14}
                              className="text-[#e3bbb9] group-hover:translate-x-0.5 transition-transform shrink-0"
                            />
                          </a>
                        ) : (
                          <div className="rounded-[4px] bg-[#22161c]/40 border border-[#e3bbb9]/10 p-3.5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-[3px] bg-[#22161c] border border-white/10 flex items-center justify-center text-[#f8f1e7]/40 shrink-0">
                              <FileText size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-dm text-sm text-[#f8f1e7]/60 truncate">{link.title}</p>
                              <span className="font-mono-lib text-[10px] text-[#f8f1e7]/40 uppercase block">
                                Link menunggu update admin
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-14 pt-10 border-t border-[#e3bbb9]/15">
        <div className="mb-8">
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block mb-1">
            05 / TANYA JAWAB
          </span>
          <h2 className="font-barlow font-extrabold text-3xl sm:text-4xl uppercase tracking-[-0.8px] text-[#f8f1e7]">
            PERTANYAAN UMUM (FAQ)
          </h2>
          <p className="font-dm text-sm sm:text-base leading-[24px] text-[#f8f1e7]/75 max-w-2xl mt-1">
            Jawaban lengkap atas pertanyaan yang paling sering diajukan mahasiswa mengenai akademik, administrasi, dan organisasi.
          </p>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center py-12 rounded-[4px] bg-[#1a1517]/70 border border-[#e3bbb9]/15">
            <p className="font-dm text-sm text-[#f8f1e7]/60">Belum ada pertanyaan umum yang terdaftar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/35 p-5 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.45)] [&_svg]:open:rotate-180"
              >
                <summary className="cursor-pointer font-barlow font-bold text-base sm:text-lg uppercase text-[#f8f1e7] group-hover:text-[#e3bbb9] list-none flex justify-between items-center gap-4 transition-colors">
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-[#e3bbb9] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown size={18} className="text-[#e3bbb9] transition-transform duration-200 shrink-0" />
                </summary>
                <p className="mt-3.5 font-dm text-sm leading-[24px] text-[#f8f1e7]/85 whitespace-pre-wrap border-t border-[#e3bbb9]/15 pt-3.5 pl-7">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
