'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logoElements = [
  {
    tab: 'KEPALAN TANGAN',
    heading: 'KEADILAN',
    desc: 'Kepalan tangan melambangkan tekad, keberanian, kekuatan, dan semangat juang yang tak pernah padam untuk memperjuangkan kebenaran, keadilan, dan perubahan.',
  },
  {
    tab: 'SAYAP',
    heading: 'GERAK MAJU & SEMANGAT',
    desc: 'Melambangkan gerak maju, kecepatan, semangat pantang menyerah, dan tekad untuk mencapai tujuan setinggi mungkin.',
  },
  {
    tab: 'DAUN',
    heading: 'KESEIMBANGAN & HARMONI',
    desc: 'Melambangkan keseimbangan, persatuan, serta harmoni antara pemikiran dan tindakan dalam mewujudkan perubahan nyata.',
  },
  {
    tab: 'BENTUK SIMETRIS',
    heading: 'KEHIDUPAN & HARAPAN',
    desc: 'Melambangkan kehidupan, semangat, dan harapan. Bentuk ini menggambarkan keberanian untuk tetap berdiri tegak dan terus maju.',
  },
];

export default function FilosofiLogoInteractive({ profileLogoPhilosophy }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = logoElements[activeTab] || logoElements[0];

  return (
    <section id="filosofi-logo" className="scroll-mt-24 py-16 sm:py-24 relative z-10">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {profileLogoPhilosophy && (
          <div className="mb-8 p-6 rounded-[4px] bg-[#1a1517]/60 border border-[#e3bbb9]/12 text-[#f8f1e7] text-sm whitespace-pre-wrap leading-relaxed text-left max-w-3xl font-dm">
            {profileLogoPhilosophy}
          </div>
        )}

        {/* 2-Column Showcase (Node 100:1011) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Emblem Surface (Node 100:1012) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[340px] aspect-square rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 shadow-[0_25px_50px_rgba(0,0,0,0.45)] relative flex flex-col items-center justify-center overflow-hidden">
              {/* Concentric delicate orbital circles in SVG (Node 100:1014) */}
              <svg
                viewBox="0 0 338 338"
                fill="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
              >
                <g opacity="0.2">
                  <circle
                    cx="169"
                    cy="169"
                    r="139.176"
                    stroke="#E3BBB9"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="169"
                    cy="169"
                    r="109.353"
                    stroke="#E3BBB9"
                    strokeWidth="1.19"
                  />
                  <circle
                    cx="169"
                    cy="169"
                    r="79.53"
                    stroke="#E3BBB9"
                    strokeWidth="1"
                  />
                </g>
              </svg>

              {/* Emblem Shape (Node 100:1018) */}
              <div className="relative z-10 w-[128px] h-[128px] rounded-full bg-gradient-to-tr from-[#340c14] via-[#671c2d] to-[#4a1320] border-2 border-[#e3bbb9]/40 flex items-center justify-center shadow-lg">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M32.0002 5.33398L5.3335 18.6673L32.0002 32.0007L58.6668 18.6673L32.0002 5.33398V5.33398M5.3335 45.334L32.0002 58.6673L58.6668 45.334M5.3335 32.0007L32.0002 45.334L58.6668 32.0007"
                    stroke="#F8F1E7"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Caption below Emblem (Node 100:1021) */}
              <div className="relative z-10 mt-6 text-center">
                <span className="font-barlow font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
                  LAMBANG RESMI
                </span>
                <span className="font-mono-lib text-[10px] leading-[15px] tracking-[0.5px] text-[#f8f1e7]/50 uppercase block mt-0.5">
                  KABINET AKSARA JUANG
                </span>
              </div>
            </div>
          </div>

          {/* Right: Heading with Muted Red JUANG + Four Tabs (Node 100:1027) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
              04 / IDENTITAS SIMBOLIK
            </span>

            <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] uppercase mt-1.5">
              <span className="text-[#f8f1e7]">AKSARA </span>
              <span className="text-[#671c2d]">JUANG</span>
            </h2>

            {/* Four Compact Tabs (Node 100:1032) */}
            <div
              role="tablist"
              aria-label="Elemen Filosofi Logo"
              className="flex flex-wrap items-center gap-2 mt-4 mb-5"
            >
              {logoElements.map((elem, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={elem.tab}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(idx)}
                    className={`h-[32px] px-4 rounded-[3px] font-barlow font-bold text-[12px] leading-[18px] tracking-[0.6px] uppercase transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e3bbb9] ${
                      isSelected
                        ? 'bg-[#671c2d] border border-[#e3bbb9]/30 text-[#f8f1e7]'
                        : 'bg-[#1a1517]/60 border border-[#e3bbb9]/12 text-[#f8f1e7]/70 hover:text-[#f8f1e7] hover:border-[#e3bbb9]/25'
                    }`}
                  >
                    {elem.tab}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content (Node 100:1041) */}
            <div className="rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 p-6 min-h-[137px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-barlow font-bold text-[20px] leading-[30px] tracking-[1px] text-[#e3bbb9] uppercase mb-2">
                    {current.heading}
                  </h3>
                  <p className="font-dm text-[15px] leading-[24px] text-[#f8f1e7]/80">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
