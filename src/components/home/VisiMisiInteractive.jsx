'use client';

import { motion } from 'framer-motion';

export default function VisiMisiInteractive({ visi, misi, profileVisiMisi }) {
  return (
    <section id="visi-misi" className="scroll-mt-24 py-16 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        {/* Centered Short Section Divider */}
        <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" aria-hidden="true" />

        {/* Header with fluid scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
            Landasan Pergerakan
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Visi &amp; Misi</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
            Arah strategis dan komitmen kepengurusan BEM FH UNAND Kabinet Aksara Juang.
          </p>
        </motion.div>

        <div className="space-y-8">
          {profileVisiMisi ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 text-gray-200 whitespace-pre-wrap leading-relaxed text-sm text-center"
            >
              {profileVisiMisi}
            </motion.div>
          ) : (
            <>
              {/* Visi Card with fluid scroll reveal */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
                className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-brand-neon transition-colors text-center cursor-default shadow-lg shadow-black/20"
              >
                <span className="text-xs text-brand-neon uppercase tracking-wide font-semibold block mb-3">
                  Visi Utama
                </span>
                <blockquote className="text-base sm:text-lg font-medium text-white leading-relaxed max-w-3xl mx-auto">
                  &ldquo;{visi}&rdquo;
                </blockquote>
              </motion.div>

              {/* Misi Cards with staggered fluid reveal */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl font-semibold text-white mb-6 text-center"
                >
                  Misi Strategis
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {misi.map((item, idx) => {
                    const isLastOdd = misi.length % 2 !== 0 && idx === misi.length - 1;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{
                          duration: 0.6,
                          delay: 0.08 * idx,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{
                          y: -3,
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        className={`bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon hover:bg-white/10 transition-colors flex items-start gap-3.5 cursor-default shadow-md shadow-black/10 ${
                          isLastOdd
                            ? 'md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto md:justify-self-center'
                            : ''
                        }`}
                      >
                        <span className="w-7 h-7 rounded-lg bg-brand-neon/10 border border-brand-neon/20 text-brand-neon font-bold text-xs flex items-center justify-center shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
