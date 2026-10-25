'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronsUpDown } from 'lucide-react';

export default function ProkerAccordion({ prokers = [] }) {
  // Store set of open indices. By default, open the first item so the user immediately sees it's interactive.
  const [openIndices, setOpenIndices] = useState(() => (prokers.length > 0 ? new Set([0]) : new Set()));

  if (!prokers || prokers.length === 0) {
    return (
      <div className="bg-[#1a0a13]/50 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md shadow-lg text-center">
        <p className="text-gray-400 text-sm">Program fungsi dan kegiatan belum tersedia.</p>
      </div>
    );
  }

  const allOpen = openIndices.size === prokers.length;

  const toggleItem = (idx) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allOpen) {
      setOpenIndices(new Set());
    } else {
      setOpenIndices(new Set(prokers.map((_, i) => i)));
    }
  };

  return (
    <div className="bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-5 sm:p-7 mb-8 backdrop-blur-md shadow-xl">
      {/* Accordion Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
        <h2 className="text-brand-neon font-semibold text-base sm:text-lg flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-neon animate-pulse" />
          <span className="tracking-wide">Program Fungsi &amp; Kegiatan</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-neon/15 text-brand-neon border border-brand-neon/20 font-mono font-bold">
            {prokers.length}
          </span>
        </h2>

        {prokers.length > 1 && (
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 text-xs text-brand-neon/90 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer select-none"
          >
            <ChevronsUpDown size={14} />
            <span>{allOpen ? 'Tutup Semua' : 'Buka Semua'}</span>
          </button>
        )}
      </div>

      {/* Accordion Items List */}
      <div className="space-y-3">
        {prokers.map((p, idx) => {
          const isOpen = openIndices.has(idx);
          const itemId = p.id || `proker-${idx}`;

          return (
            <div
              key={itemId}
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white/[0.04] border-brand-neon/30 shadow-md'
                  : 'bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              {/* Proker Header (Clickable Dropdown Trigger) */}
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                aria-controls={`proker-desc-${idx}`}
                className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 transition-colors cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                  <span className="text-brand-neon font-mono text-xs sm:text-sm font-extrabold px-2 sm:px-2.5 py-1 rounded-md bg-brand-neon/10 border border-brand-neon/20 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-white text-sm sm:text-base leading-snug group-hover:text-brand-neon transition-colors line-clamp-2">
                    {p.name}
                  </h3>
                </div>

                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-brand-neon/20 border-brand-neon/40 text-brand-neon rotate-180'
                      : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Proker Description (Dropdown Content with Smooth CSS Transition) */}
              <div
                id={`proker-desc-${idx}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-white/5 text-gray-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {p.description ? (
                      <p className="text-gray-200/95 leading-relaxed">{p.description}</p>
                    ) : (
                      <p className="text-gray-400 italic">Deskripsi program fungsi belum ditambahkan.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
