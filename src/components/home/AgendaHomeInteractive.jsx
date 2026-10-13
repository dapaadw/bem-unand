'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { isWebOrLocalUrl } from '../../lib/homeMedia';

export default function AgendaHomeInteractive({ activities = [] }) {
  return (
    <section id="kegiatan" className="scroll-mt-24 py-20 overflow-hidden relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header: Left-aligned with entrance animation from the left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left"
        >
          <div>
            <span className="text-xs text-[#FEAEAE] uppercase tracking-wider font-semibold block mb-1">
              Agenda Terkini
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f7f2e3] tracking-tight font-montserrat">
              Kegiatan &amp; Lomba
            </h2>
          </div>
          <div>
            <Link
              href="/kegiatan"
              className="text-sm font-semibold text-[#FEAEAE] hover:underline inline-flex items-center gap-1.5 group"
            >
              <span>Lihat semua agenda</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Kegiatan Cards: 4 columns with 1x boxy corner radius */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {activities.map((item) => (
            <Link
              key={item.id}
              href={`/kegiatan/${item.slug}`}
              className="block min-w-0 break-words bg-[#200a0f] border border-[#4d0d12]/70 rounded overflow-hidden hover:border-[#661118] hover:bg-[#280c13] transition-all duration-300 text-left flex flex-col justify-between group hover:-translate-y-1 shadow-lg shadow-black/30"
            >
              <div>
                {/* Event Thumbnail Image */}
                <div className="h-40 w-full relative overflow-hidden bg-black/60 flex items-center justify-center border-b border-[#4d0d12]/50">
                  {item.imageUrl && isWebOrLocalUrl(item.imageUrl) ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-[#30050d] border border-[#4d0d12] flex items-center justify-center text-[#FEAEAE] group-hover:scale-105 transition-transform">
                      {item.type === 'LOMBA' ? (
                        <Trophy size={22} />
                      ) : (
                        <Calendar size={22} />
                      )}
                    </div>
                  )}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#30050d]/90 border border-[#4d0d12] text-[10px] font-bold uppercase tracking-wider text-[#FEAEAE] backdrop-blur-sm">
                    {item.type === 'LOMBA' ? 'Lomba' : 'Internal'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4">
                  <span className="text-[11px] text-[#a89f9f] font-medium block mb-1.5 flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#FEAEAE] shrink-0" />
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
                  <h3 className="text-sm font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#a89f9f] truncate flex items-center gap-1">
                    <MapPin size={12} className="text-[#FEAEAE] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-[#4d0d12]/40 flex items-center justify-between text-xs text-[#FEAEAE] font-semibold">
                <span>Detail agenda</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </motion.div>

        {!activities.length && (
          <div className="py-10 text-center bg-[#200a0f] rounded border border-[#4d0d12]/50 max-w-md mx-auto mt-6">
            <p className="text-[#c5b8b8] text-sm">Belum ada kegiatan yang dipublikasikan saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
