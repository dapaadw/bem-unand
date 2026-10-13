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
    title: 'Bentuk simentris',
    desc: 'Melambangkan kehidupan, semangat, dan harapan. Daun ini menggambarkan keberanian untuk tetap berdiri tegak dan terus maju.',
  },
];

export default function FilosofiLogoInteractive({ profileLogoPhilosophy }) {
  return (
    <section id="filosofi-logo" className="scroll-mt-24 py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header with fluid scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-left flex flex-col items-start"
        >
          <span className="text-xs text-[#FEAEAE] uppercase tracking-wider font-semibold block mb-1">
            Identitas &amp; Makna
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f7f2e3] tracking-tight">
            Filosofi Logo
          </h2>
          <p className="text-sm sm:text-base text-[#c5b8b8] mt-2 max-w-xl text-left leading-relaxed">
            Aksara Juang
          </p>
        </motion.div>

        {profileLogoPhilosophy && (
          <div className="mb-8 p-6 rounded bg-[#200a0f] border border-[#4d0d12] text-[#f7f2e3] text-sm whitespace-pre-wrap leading-relaxed text-left max-w-3xl">
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
                className="absolute -inset-6 rounded-full blur-3xl bg-[#4d0d12]/40 scale-95 opacity-80 pointer-events-none"
              />

              {/* Circular Logo Badge */}
              <div
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-4 sm:p-5 bg-[radial-gradient(circle,_#ffffff_35%,_#30050d_100%)] shadow-[0_0_35px_rgba(77,13,18,0.6)] ring-2 ring-[#4d0d12]/50 hover:scale-102 transition-all duration-500 flex items-center justify-center"
              >
                <img
                  src="/logo_warna.png"
                  alt="Logo BEM FH UNAND"
                  className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform duration-500"
                />
              </div>
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
                    duration: 0.6,
                    delay: 0.06 * idx,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group rounded p-5 transition-all duration-300 flex flex-col justify-between cursor-default border bg-[#200a0f] border-[#4d0d12]/60 hover:border-[#661118] hover:bg-[#280c13] hover:scale-[1.01] hover:-translate-y-0.5 shadow-lg shadow-black/20"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider transition-colors text-[#FEAEAE] bg-[#30050d] border border-[#4d0d12]"
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold mb-2 transition-colors text-[#f7f2e3] group-hover:text-[#FEAEAE]"
                    >
                      {elem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#c5b8b8] leading-relaxed">
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
