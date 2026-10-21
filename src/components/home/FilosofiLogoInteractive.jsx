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

        {/* 2-Column Showcase (Node 149:4691) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Emblem Stage Card (Node 149:4711 / 149:4712) following FINAL_HOME card design */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[381px] min-h-[424px] rounded-[4px] bg-[#1a1517]/60 backdrop-blur-[10px] border border-[#e3bbb9]/12 shadow-[0_4px_6px_rgba(0,0,0,0.4)] p-8 relative flex flex-col items-center justify-center overflow-hidden">
              {/* Top Pill Badge (Node 149:4713) */}
              <div className="mb-8 px-2.5 py-0.5 rounded-[2px] bg-[#762d2e] inline-flex items-center justify-center">
                <span className="font-bricolage font-extrabold text-[12px] leading-[18px] tracking-[0.6px] text-[#f8f1e7] uppercase text-center">
                  IDENTITAS SIMBOLIK KABINET
                </span>
              </div>

              {/* Circular White Stage with Crimson Glow & Official Color Logo (Node 149:4715 / 149:4716) */}
              <div className="relative z-10 w-[256px] h-[256px] rounded-full bg-white shadow-[0_0_36px_rgba(196,39,73,0.55),0_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center p-5">
                <img
                  src="/logo_warna.png"
                  alt="Lambang Resmi Kabinet Aksara Juang BEM FH UNAND"
                  className="w-[216px] h-[216px] object-contain select-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Heading with #c11a40 JUANG + Four Tabs (Node 149:4692) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
              04 / IDENTITAS SIMBOLIK
            </span>

            <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] uppercase mt-1.5">
              <span className="text-[#f8f1e7]">AKSARA </span>
              <span className="text-[#c11a40]">JUANG</span>
            </h2>

            {/* Four Compact Tabs (Node 149:4697) */}
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
                        ? 'bg-[#8f1b34] border border-[#e3bbb9]/35 text-[#f8f1e7] shadow-[0_0_15px_rgba(143,27,52,0.4)]'
                        : 'bg-[#1a1517]/60 backdrop-blur-[10px] border border-[#e3bbb9]/12 text-[#f8f1e7]/70 hover:text-[#f8f1e7] hover:border-[#e3bbb9]/25'
                    }`}
                  >
                    {elem.tab}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content (Node 149:4706) */}
            <div className="rounded-[4px] bg-[#1a1517]/60 backdrop-blur-[10px] border border-[#e3bbb9]/12 p-6 min-h-[137px] flex flex-col justify-center">
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
