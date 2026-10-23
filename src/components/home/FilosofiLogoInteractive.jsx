'use client';

import { motion } from 'framer-motion';

const defaultElements = [
  {
    title: 'Kepalan Tangan',
    desc: 'Kepalan tangan melambangkan tekad, keberanian, kekuatan, dan semangat juang yang tak pernah padam untuk memperjuangkan kebenaran, keadilan, dan perubahan.',
  },
  {
    title: 'Sayap',
    desc: 'Melambangkan gerak maju, kecepatan, semangat pantang menyerah, dan tekad untuk mencapai tujuan setinggi mungkin.',
  },
  {
    title: 'Daun',
    desc: 'Melambangkan keseimbangan, persatuan, serta harmoni antara pemikiran dan tindakan dalam mewujudkan perubahan nyata.',
  },
  {
    title: 'Bentuk Simetris',
    desc: 'Melambangkan kehidupan, semangat, dan harapan. Daun ini menggambarkan keberanian untuk tetap berdiri tegak dan terus maju.',
  },
];

export default function FilosofiLogoInteractive({ profileLogoPhilosophy }) {
  return (
    <section id="filosofi-logo" className="scroll-mt-24 py-16 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Centered Short Section Divider */}
        <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" aria-hidden="true" />

        {/* Header with fluid scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 sm:pt-4 mb-10 text-left flex flex-col items-start"
        >
          <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
            Identitas &amp; Makna
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Filosofi Logo</h2>
        </motion.div>

        {profileLogoPhilosophy && (
          <div className="mb-8 p-5 rounded-xl bg-[#1a0a13]/50 border border-white/10 text-gray-300 text-sm whitespace-pre-wrap leading-relaxed text-left max-w-3xl backdrop-blur-md shadow-lg">
            {profileLogoPhilosophy}
          </div>
        )}

        {/* 2-Column Showcase: Left = Logo BEM FH UNAND, Right = Philosophy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Logo Badge with Radial Glow */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center w-full max-w-sm">
              {/* Radial ambient glow */}
              <div
                className="absolute -inset-6 rounded-full blur-3xl bg-brand-red/20 scale-95 opacity-70 pointer-events-none"
              />

              {/* Circular Logo Badge with fluid hover */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-4 sm:p-5 bg-[radial-gradient(circle,_#ffffff_40%,_#8e1616_100%)] shadow-[0_0_30px_rgba(142,22,22,0.5)] ring-2 ring-white/10 flex items-center justify-center cursor-pointer"
              >
                <img
                  src="/logo_warna.png"
                  alt="Logo BEM FH UNAND"
                  className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Philosophy Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {defaultElements.map((elem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.75,
                    delay: 0.06 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.015,
                    transition: { type: 'spring', stiffness: 350, damping: 25 },
                  }}
                  className="group rounded-xl p-5 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer border bg-[#1a0a13]/50 border-white/10 hover:border-brand-neon hover:bg-[#23121b]/70 hover:shadow-[0_12px_28px_rgba(254,174,174,0.2)] backdrop-blur-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300 text-gray-400 bg-white/5 border border-white/10 group-hover:bg-brand-neon group-hover:text-brand-dark"
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <h3
                      className="text-base font-semibold mb-2 transition-colors duration-300 text-white group-hover:text-brand-neon"
                    >
                      {elem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {elem.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
