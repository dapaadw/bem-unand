'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { isWebOrLocalUrl } from '../../lib/homeMedia';

export default function AgendaHomeInteractive({ activities = [] }) {
  return (
    <section id="kegiatan" className="scroll-mt-24 py-16 overflow-hidden relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Centered Short Section Divider */}
        <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" aria-hidden="true" />

        {/* Header: Animating from right (outbound hidden) to align right */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-right flex flex-col items-end mb-8"
        >
          <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
            Agenda Terkini
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Kegiatan &amp; Lomba</h2>
          <div className="mt-2">
            <Link
              href="/kegiatan"
              className="text-sm font-semibold text-brand-neon hover:underline inline-flex items-center gap-1"
            >
              Lihat semua agenda &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Kegiatan Cards: Animating from left (outbound hidden) to center */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {activities.map((item) => (
            <Link
              key={item.id}
              href={`/kegiatan/${item.slug}`}
              className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon hover:bg-white/10 transition-all duration-300 text-left flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              <div>
                {/* Event Thumbnail Image */}
                <div className="h-36 sm:h-40 w-full relative overflow-hidden bg-gradient-to-br from-brand-red/30 via-black/80 to-brand-dark flex items-center justify-center border-b border-white/5">
                  {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon/80 group-hover:scale-110 transition-transform">
                      {item.type === 'LOMBA' ? (
                        <Trophy size={20} className="text-brand-neon" />
                      ) : (
                        <Calendar size={20} className="text-brand-neon" />
                      )}
                    </div>
                  )}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-brand-neon backdrop-blur-md">
                    {item.type === 'LOMBA' ? 'Lomba' : 'Internal'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4">
                  <span className="text-[11px] text-gray-400 font-medium block mb-1.5 flex items-center gap-1.5">
                    <Calendar size={12} className="text-brand-neon shrink-0" />
                    <span>
                      {item.date
                        ? new Date(item.date).toLocaleDateString('id-ID', {
                            timeZone: 'Asia/Jakarta',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : ''}
                      {item.time ? ` · ${item.time} WIB` : ''}
                    </span>
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-neon transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                    <MapPin size={12} className="text-brand-neon shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-brand-neon font-semibold">
                <span>Detail agenda</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </motion.div>

        {!activities.length && (
          <div className="py-10 text-center bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto mt-6">
            <p className="text-gray-400 text-sm">Belum ada kegiatan yang dipublikasikan saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
