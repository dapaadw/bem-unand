'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoProfileInteractive({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const autoplayUrl = videoUrl
    ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`
    : '';

  return (
    <section id="video-profil" className="scroll-mt-24 py-16 sm:py-20 relative z-10">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Header (Node 100:989 - 100:993) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px] mx-auto text-center mb-8"
        >
          <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
            03 / PROFIL LEMBAGA
          </span>
          <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] text-[#f8f1e7] uppercase mt-1.5">
            MENGENAL BEM FH UNAND
          </h2>
          <p className="font-dm text-[15px] sm:text-[16px] leading-[26px] text-[#f8f1e7]/80 mt-2">
            Melalui video ini, kami mengajak Anda mengenal lebih dekat struktur, visi, misi, serta sinergi dari seluruh Presidium, Departemen, Biro, Kantor dan Lembaga yang bergerak bersama dalam satu irama perjuangan.
          </p>
        </motion.div>

        {/* Video Player Thumbnail / Embed (Node 100:995) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[880px] mx-auto"
        >
          <div className="w-full h-[320px] sm:h-[460px] md:h-[543px] rounded-[4px] bg-[#1a1517]/80 border border-[#e3bbb9]/12 overflow-hidden relative shadow-[0_25px_50px_rgba(0,0,0,0.55)] flex flex-col">
            {isPlaying && autoplayUrl ? (
              <iframe
                src={autoplayUrl}
                title="Video Profil BEM FH UNAND"
                className="w-full h-full flex-1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <>
                {/* Top bar of video frame */}
                <div className="h-[49px] w-full bg-[#21181b]/90 shrink-0" />

                {/* Main dark video canvas */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Putar Video Profil BEM FH UNAND"
                  className="flex-1 w-full bg-[#110c0e]/95 relative flex flex-col items-center justify-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e3bbb9]"
                >
                  {/* Play button circle (Node 100:998) */}
                  <div className="w-[80px] h-[80px] rounded-full bg-[#671c2d]/90 group-hover:bg-[#7c2236] border border-[#e3bbb9]/40 flex items-center justify-center shadow-[0_0_30px_rgba(103,28,45,0.5)] group-hover:scale-105 transition-all duration-300">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path
                        d="M10.667 6.66602V25.3327L25.3337 15.9993L10.667 6.66602"
                        fill="#F8F1E7"
                      />
                    </svg>
                  </div>

                  {/* Preview label (Node 100:1003) */}
                  <div className="mt-4 px-3.5 py-1.5 rounded-[3px] bg-black/60 border border-white/10">
                    <span className="font-mono-lib text-[11px] sm:text-[12px] leading-[18px] tracking-[0.6px] text-[#f8f1e7]/80 uppercase">
                      VIDEO PROFIL BEM FH UNAND &middot; PRATINJAU
                    </span>
                  </div>

                  {/* Bottom-left Video Badge (Node 100:1005) */}
                  <div className="absolute bottom-4 left-4 text-left pointer-events-none">
                    <span className="font-mono-lib text-[11px] leading-[17px] text-[#f8f1e7]/50 uppercase">
                      DOKUMENTER KELEMBAGAAN &bull; PERIODE 2026
                    </span>
                  </div>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
