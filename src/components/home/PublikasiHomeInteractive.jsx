'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, BookOpen } from 'lucide-react';
import { isWebOrLocalUrl } from '../../lib/homeMedia';

export default function PublikasiHomeInteractive({ publications = [] }) {
  return (
    <section id="publikasi" className="scroll-mt-24 py-16 overflow-hidden relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Centered Short Section Divider */}
        <div
          className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
          aria-hidden="true"
        />

        {/* Header: Fluid scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-left flex flex-col items-start mb-8"
        >
          <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
            Berita Terkini
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Publikasi</h2>
          <div className="mt-2">
            <Link
              href="/publikasi"
              className="text-sm font-semibold text-brand-neon hover:underline inline-flex items-center gap-1 transition-colors"
            >
              Lihat semua publikasi &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Publikasi Cards: Staggered fluid entrance (3 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {publications.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.8,
                delay: 0.08 * idx,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 350, damping: 25 },
              }}
              className="h-full"
            >
              <Link
                href={`/publikasi/${item.slug}`}
                className="h-full min-w-0 break-words bg-[#1a0a13]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon hover:bg-[#23121b]/70 hover:shadow-[0_12px_30px_rgba(254,174,174,0.18)] transition-all duration-500 ease-out text-left flex flex-col justify-between group backdrop-blur-md"
              >
                <div>
                  {/* Article Thumbnail Image */}
                  <div className="h-40 sm:h-44 w-full relative overflow-hidden bg-gradient-to-br from-brand-red/30 via-black/80 to-brand-dark flex items-center justify-center border-b border-white/5">
                    {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon/80 group-hover:scale-110 transition-transform duration-500">
                        <BookOpen size={20} className="text-brand-neon" />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <span className="text-[11px] text-gray-400 font-medium block mb-1.5 flex items-center gap-1.5">
                      <Calendar size={12} className="text-brand-neon shrink-0" />
                      <span>
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString('id-ID', {
                              timeZone: 'Asia/Jakarta',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                      </span>
                      {item.author && (
                        <span className="text-gray-400 truncate max-w-[140px]">
                          &bull; {item.author}
                        </span>
                      )}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-brand-neon transition-colors duration-300 line-clamp-2 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    {item.body && (
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-brand-neon font-semibold">
                  <span>Baca artikel</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!publications.length && (
          <div className="py-10 text-center bg-[#1a0a13]/50 rounded-xl border border-white/10 max-w-md mx-auto mt-6 backdrop-blur-md">
            <p className="text-gray-400 text-sm">Belum ada publikasi yang diterbitkan saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
