'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const defaultCards = [
  {
    tagLeft: '01 / DISKUSI',
    tagRight: 'KAMPUS',
    eyebrow: 'RUANG YANG BISA KITA BANGUN',
    title: 'HUKUM, KAMPUS, DAN HAL-HAL DI SEKITAR KITA.',
    desc: 'Ruang bertukar pikiran dan membaca isu bersama.',
    footer: 'Diskusi Publik',
  },
  {
    tagLeft: '02 / ADVOKASI',
    tagRight: 'STUDI',
    eyebrow: 'RUANG YANG BISA KITA BANGUN',
    title: 'HUKUM, KAMPUS, DAN HAL-HAL DI SEKITAR KITA.',
    desc: 'Ruang bertukar pikiran dan membaca isu bersama.',
    footer: 'Kajian Kebijakan',
  },
  {
    tagLeft: '03 / PENALARAN',
    tagRight: 'RISET',
    eyebrow: 'RUANG YANG BISA KITA BANGUN',
    title: 'HUKUM, KAMPUS, DAN HAL-HAL DI SEKITAR KITA.',
    desc: 'Ruang bertukar pikiran dan membaca isu bersama.',
    footer: 'Diskusi Publik',
  },
  {
    tagLeft: '04 / PENGABDIAN',
    tagRight: 'SOSIAL',
    eyebrow: 'RUANG YANG BISA KITA BANGUN',
    title: 'HUKUM, KAMPUS, DAN HAL-HAL DI SEKITAR KITA.',
    desc: 'Ruang bertukar pikiran dan membaca isu bersama.',
    footer: 'Aksi Sosial',
  },
];

export default function AgendaHomeInteractive({ activities = [] }) {
  const cards = defaultCards.map((card, idx) => {
    const dbItem = activities[idx];
    return {
      ...card,
      href: dbItem?.slug ? `/kegiatan/${dbItem.slug}` : '/kegiatan',
    };
  });

  return (
    <section id="kegiatan" className="scroll-mt-24 py-16 sm:py-20 relative z-10">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Section Header (Node 100:1047) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-[#e3bbb9]/12 pb-5 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left"
        >
          <div>
            <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
              05 / WARTA &amp; AKTIVITAS
            </span>
            <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] text-[#f8f1e7] uppercase mt-1">
              KEGIATAN
            </h2>
            <p className="font-newsreader italic text-[18px] leading-[27px] text-[#f8f1e7]/70 mt-0.5">
              Ada banyak cara untuk ambil peran.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono-lib text-[11px] leading-[17px] tracking-[0.55px] text-[#f8f1e7]/50 uppercase">
              PRATINJAU KONTEN KEGIATAN
            </span>
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

        {/* Four Compact Activity Cards Evenly Spaced (Node 100:1063) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 hover:border-[#e3bbb9]/30 hover:bg-[#241b1e]/80 p-[25px] min-h-[264px] flex flex-col justify-between transition-all duration-300 group text-left"
            >
              <div>
                {/* Top metadata row */}
                <div className="flex items-center justify-between font-mono-lib text-[11px] leading-[17px] uppercase mb-2">
                  <span className="text-[#e3bbb9]">{card.tagLeft}</span>
                  <span className="text-[#f8f1e7]/40">{card.tagRight}</span>
                </div>

                {/* Eyebrow */}
                <span className="font-dm font-semibold text-[11px] leading-[17px] tracking-[0.55px] text-[#e3bbb9]/80 uppercase block mt-2 mb-1.5">
                  {card.eyebrow}
                </span>

                {/* Heading */}
                <h3 className="font-barlow font-bold text-[18px] leading-[27px] tracking-[-0.45px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors uppercase mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-dm text-[13px] leading-[21px] text-[#f8f1e7]/70">
                  {card.desc}
                </p>
              </div>

              {/* Bottom border row */}
              <div className="pt-3 mt-6 border-t border-[#e3bbb9]/50 flex items-center justify-between">
                <span className="font-dm text-[12px] leading-[18px] text-[#f8f1e7]/50 group-hover:text-[#f8f1e7]/80 transition-colors">
                  {card.footer}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
