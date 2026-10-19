'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { isWebOrLocalUrl } from '../../lib/homeMedia';

const fallbackActivities = [
  {
    id: 'fallback-1',
    name: 'Andalas National Moot Court Competition (ANMCC) IX 2026',
    slug: 'anmcc-ix-2026',
    type: 'LOMBA',
    description: 'Kompetisi peradilan semu tingkat nasional terbesar yang diselenggarakan oleh BEM FH UNAND, memperebutkan Piala Bergilir Mahkamah Agung RI.',
    imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1200&auto=format&fit=crop',
    organizer: 'Departemen Minat & Bakat BEM FH UNAND',
    location: 'Ruang Sidang Semu Prof. Dr. Ismail Suny',
  },
  {
    id: 'fallback-2',
    name: 'Seminar Nasional: Transformasi Hukum dan Keadilan Lingkungan di Ranah Minang',
    slug: 'seminar-nasional-hukum-lingkungan-2026',
    type: 'INTERNAL',
    description: 'Seminar nasional mengundang akademisi, praktisi hukum lingkungan, dan perwakilan masyarakat adat untuk mendiskusikan keberlanjutan ekologis serta perlindungan hak ulayat di Sumatera Barat.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    organizer: 'Departemen Kajian Strategis',
    location: 'Auditorium Gedung B FH UNAND',
  },
  {
    id: 'fallback-3',
    name: 'Legal Drafting & Legislative Drafting Challenge 2026',
    slug: 'legal-drafting-challenge-2026',
    type: 'LOMBA',
    description: 'Ajang penyusunan naskah akademik dan legal drafting rancangan peraturan perundang-undangan bagi mahasiswa hukum se-Indonesia.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    organizer: 'BEM FH UNAND x DPM FH UNAND',
    location: 'Gedung Pascasarjana Kampus Padang',
  },
  {
    id: 'fallback-4',
    name: 'Diskusi Publik: Refleksi Konstitusi dan Arah Demokrasi Indonesia',
    slug: 'diskusi-publik-konstitusi-2026',
    type: 'INTERNAL',
    description: 'Ruang dialektika kritis mahasiswa Fakultas Hukum Universitas Andalas dalam menelaah perkembangan putusan peradilan tata negara, penegakan hukum, dan pemenuhan hak-hak sipil.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    organizer: 'Departemen Kajian Strategis & Advokasi',
    location: 'Selasar Merah FH UNAND',
  },
];

export default function AgendaHomeInteractive({ activities = [] }) {
  // Combine real activities from DB with fallbacks if fewer than 4 exist
  const existingSlugs = new Set((activities || []).map((a) => a?.slug).filter(Boolean));
  const mergedItems = [
    ...(activities || []),
    ...fallbackActivities.filter((f) => !existingSlugs.has(f.slug)),
  ].slice(0, 4);

  return (
    <section id="kegiatan" className="scroll-mt-24 py-16 sm:py-20 relative z-10">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Section Header (Node 149:4556) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-[#e3bbb9]/15 pb-5 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left"
        >
          <div>
            <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
              05 / WARTA &amp; AKTIVITAS
            </span>
            <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] text-[#f8f1e7] uppercase mt-1">
              KEGIATAN
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/kegiatan"
              className="font-barlow font-bold text-[13px] leading-[20px] tracking-[0.65px] text-[#e3bbb9] uppercase inline-flex items-center gap-1.5 group hover:text-[#f8f1e7] transition-colors"
            >
              <span>LIHAT SEMUA KEGIATAN</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <path
                  d="M9.33333 3.33301L14 7.99967M14 7.99967L9.33333 12.6663M14 7.99967H2"
                  stroke="currentColor"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Four Connected Activity Cards (Node 149:4570) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {mergedItems.map((item, idx) => {
            const isLomba = item.type === 'LOMBA';
            const categoryLabel = isLomba ? 'Lomba' : 'Kegiatan';
            const tagLeft = `0${idx + 1} / ${isLomba ? 'KOMPETISI' : 'AGENDA'}`;
            const tagRight = isLomba ? 'NASIONAL' : 'KAMPUS';
            const footerText = isLomba ? 'Kompetisi Mahasiswa' : 'Kegiatan Kampus';
            const href = item.slug ? `/kegiatan/${item.slug}` : '/kegiatan';
            const hasValidImage = item.imageUrl && isWebOrLocalUrl(item.imageUrl);

            return (
              <Link
                key={item.id || idx}
                href={href}
                className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 hover:border-[#e3bbb9]/35 hover:bg-[#26161e]/85 p-[25px] min-h-[411px] flex flex-col justify-between transition-all duration-300 group text-left shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
              >
                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between font-mono-lib text-[11px] leading-[17px] uppercase mb-3">
                    <span className="text-[#e3bbb9] font-medium">{tagLeft}</span>
                    <span className="text-[#f8f1e7]/50">{tagRight}</span>
                  </div>

                  {/* Visual Banner Box connected with real image or gradient fallback */}
                  <div
                    className="w-full h-[160px] mb-4 border border-[#48121f] rounded-[2px] relative flex items-center justify-center overflow-hidden bg-[#240c14]"
                    style={{
                      background:
                        'linear-gradient(180deg, #9e1933 0%, #6e1223 15%, #460b16 35%, #27060d 60%, #170308 100%)',
                    }}
                  >
                    {hasValidImage ? (
                      <>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Gradient tint over image for unified look & readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      /* Fallback icon with glowing maroon background */
                      <div className="w-[42px] h-[42px] rounded-[12px] bg-[#3a0d18] border border-[#e3bbb9]/20 flex items-center justify-center shadow-[0_0_15px_rgba(158,25,51,0.5)]">
                        {isLomba ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 1.66602H15V7.49935C15 10.2608 12.7614 12.4993 10 12.4993C7.23858 12.4993 5 10.2608 5 7.49935V1.66602Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 4.16602H2.5V5.83268C2.5 7.67363 3.99238 9.16602 5.83333 9.16602"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 4.16602H17.5V5.83268C17.5 7.67363 16.0076 9.16602 14.1667 9.16602"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 12.5V16.6667"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.66699 16.666H13.3337"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                            <path d="M8 2v4" />
                            <path d="M16 2v4" />
                          </svg>
                        )}
                      </div>
                    )}

                    {/* Top-right category pill badge */}
                    <div className="absolute top-3 right-3 px-3 py-0.5 rounded-full bg-[#1b080e]/85 border border-white/20 backdrop-blur-xl inline-flex items-center justify-center shadow-sm">
                      <span className="font-jakarta font-bold text-[10px] leading-[15px] text-[#f8f1e7]">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Connected Title (Name) */}
                  <h3 className="font-barlow font-bold text-[18px] leading-[25px] tracking-[-0.45px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors uppercase mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Connected Description */}
                  <p className="font-dm text-[13px] leading-[21px] text-[#f8f1e7]/75 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom border row */}
                <div className="pt-3 mt-4 border-t border-[#e3bbb9]/40 flex items-center justify-between">
                  <span className="font-dm text-[12px] leading-[18px] text-[#f8f1e7]/60 group-hover:text-[#f8f1e7]/90 transition-colors">
                    {footerText}
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
        </motion.div>
      </div>
    </section>
  );
}
