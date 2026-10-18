'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultMissions = [
  {
    num: '01',
    title: 'GERAKAN KRITIS DAN PROGRESIF',
    desc: 'Membangun ruang gerakan mahasiswa yang kritis dan progresif melalui diskusi, kajian, dan advokasi terhadap berbagai isu hukum, sosial, dan kemasyarakatan.',
  },
  {
    num: '02',
    title: 'HUMANISME DAN SOLIDARITAS',
    desc: 'Menumbuhkan nilai humanisme dan solidaritas dalam setiap kegiatan kemahasiswaan dengan mengedepankan kepedulian terhadap sesama serta keberpihakan pada keadilan dan kemanusiaan.',
  },
  {
    num: '03',
    title: 'ORGANISASI YANG INKLUSIF',
    desc: 'Mewujudkan organisasi yang inklusif dengan membuka ruang bagi seluruh masyarakat Fakultas Hukum Universitas Andalas untuk berkontribusi dalam kegiatan BEM tanpa diskriminasi.',
  },
  {
    num: '04',
    title: 'WADAH PERJUANGAN ASPIRASI',
    desc: 'Menguatkan peran BEM sebagai wadah perjuangan aspirasi mahasiswa dengan menjalin kerja sama strategis dengan UKM-F dan HIMA yang ada di Fakultas Hukum Universitas Andalas.',
  },
];

export default function VisiMisiInteractive({ visi, misi, profileVisiMisi }) {
  const [openIndex, setOpenIndex] = useState(0);

  const missionItems = defaultMissions.map((item, idx) => ({
    ...item,
    desc: Array.isArray(misi) && misi[idx] ? misi[idx] : item.desc,
  }));

  return (
    <section id="visi-misi" className="scroll-mt-24 py-16 sm:py-20 relative z-10">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Section Header (Node 100:1148) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 text-left"
        >
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
            02 / KOMPAS GERAKAN
          </span>
          <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] text-[#f8f1e7] uppercase mt-1.5">
            VISI &amp; MISI
          </h2>
        </motion.div>

        {profileVisiMisi ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 rounded-[4px] bg-[#1a1517]/60 border border-[#e3bbb9]/12 text-[#f8f1e7] whitespace-pre-wrap leading-relaxed text-base font-dm"
          >
            {profileVisiMisi}
          </motion.div>
        ) : (
          /* Two Balanced Columns (Node 100:1153) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Full Vision Statement (Node 100:1154) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 rounded-[4px] bg-[#1a1517]/80 border border-[#e3bbb9]/12 p-7 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[406px] shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              <div>
                <div className="mb-6">
                  <span className="inline-block px-3.5 py-1 rounded-[3px] bg-[#671c2d]/35 border border-[#e3bbb9]/20 font-dm font-semibold text-[11px] leading-[17px] tracking-[1.1px] text-[#e3bbb9] uppercase">
                    VISI ORGANISASI
                  </span>
                </div>

                <blockquote className="font-dm font-normal text-[17px] sm:text-[18px] leading-[31px] text-[#f8f1e7]">
                  &ldquo;{visi}&rdquo;
                </blockquote>
              </div>

              <div className="pt-6 mt-8 border-t border-[#e3bbb9]/12 flex items-center justify-between font-mono-lib text-[12px] leading-[18px] text-[#f8f1e7]/60 uppercase">
                <span>BEM FH UNAND 2026</span>
                <span>KABINET AKSARA JUANG</span>
              </div>
            </motion.div>

            {/* Right Column: Four Missions Accordion / Disclosures (Node 100:1167) */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              {missionItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 * idx,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-[4px] bg-[#1a1517]/80 border border-[#e3bbb9]/12 hover:border-[#e3bbb9]/25 transition-colors backdrop-blur-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e3bbb9]"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="font-mono-lib font-bold text-[16px] leading-[24px] text-[#e3bbb9] shrink-0">
                          {item.num}
                        </span>
                        <span className="font-barlow font-bold text-[17px] leading-[26px] tracking-[0.85px] text-[#f8f1e7] uppercase truncate">
                          {item.title}
                        </span>
                      </div>

                      <span className="w-[28px] h-[28px] rounded-[2px] bg-white/5 flex items-center justify-center shrink-0">
                        {isOpen ? (
                          <svg width="20" height="20" viewBox="0 0 23 23" fill="none" aria-hidden="true">
                            <path
                              d="M15.3328 7.66615L7.66619 15.3328M15.3328 15.3328L7.66619 7.66615"
                              stroke="#F8F1E7"
                              strokeOpacity="0.6"
                              strokeWidth="1.35"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                              d="M8.00033 2.66602V13.3327M13.3337 7.99935H2.66699"
                              stroke="#F8F1E7"
                              strokeOpacity="0.6"
                              strokeWidth="1.33"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="px-5 pb-5"
                        >
                          <div className="border-t border-[#e3bbb9]/40 pt-3.5 pl-9">
                            <p className="font-dm text-[14px] leading-[23px] text-[#f8f1e7]/75">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
