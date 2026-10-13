'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function VisiMisiInteractive({ visi, misi, profileVisiMisi }) {
  return (
    <section id="visi-misi" className="scroll-mt-24 py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header with fluid scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-left"
        >
          <span className="text-xs text-[#FEAEAE] uppercase tracking-wider font-semibold block mb-1">
            Landasan Pergerakan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f7f2e3] tracking-tight">
            Visi &amp; Misi
          </h2>
        </motion.div>

        {profileVisiMisi ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 rounded bg-[#200a0f] border border-[#4d0d12] text-[#f7f2e3] whitespace-pre-wrap leading-relaxed text-base"
          >
            {profileVisiMisi}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 bg-[#200a0f] border border-[#4d0d12] rounded p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#661118] transition-colors"
            >
              {/* Subtle crimson ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-48 h-48 bg-[#4d0d12]/30 rounded-full blur-3xl pointer-events-none"
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded bg-[#30050d] border border-[#4d0d12] text-[#FEAEAE] text-xs font-semibold uppercase tracking-wider">
                    Visi Utama
                  </span>
                  <Quote className="text-[#4d0d12] group-hover:text-[#661118] transition-colors" size={32} />
                </div>

                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-[#f7f2e3] leading-relaxed">
                  {visi}
                </blockquote>
              </div>

              <div className="pt-8 mt-6 border-t border-[#4d0d12]/60 flex items-center justify-between text-xs text-[#a89f9f]">
                <span className="font-semibold text-[#f7f2e3]">Kabinet Aksara Juang</span>
                <span>BEM FH UNAND</span>
              </div>
            </motion.div>

            {/* Right Column: Strategic Missions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 bg-[#16070a]/70 border border-[#4d0d12]/40 rounded p-7 sm:p-9 flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold text-[#f7f2e3] mb-6 flex items-center gap-2">
                <span>Misi Strategis</span>
              </h3>

              <div className="space-y-4">
                {misi.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 * idx,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-4 pb-4 border-b border-[#f7f2e3]/10 last:border-b-0 last:pb-0 group"
                  >
                    <span className="w-8 h-8 rounded bg-[#30050d] border border-[#4d0d12] text-[#f7f2e3] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FEAEAE]/50 group-hover:text-[#FEAEAE] transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm sm:text-base text-[#c5b8b8] leading-relaxed group-hover:text-[#f7f2e3] transition-colors">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
