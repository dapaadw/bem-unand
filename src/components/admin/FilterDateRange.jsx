'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check, X, ArrowRight } from 'lucide-react';

function getWibDate(daysOffset = 0, startOfMonth = false) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utc + 7 * 3600000);

  if (startOfMonth) {
    wib.setDate(1);
  } else if (daysOffset !== 0) {
    wib.setDate(wib.getDate() + daysOffset);
  }

  const yyyy = wib.getFullYear();
  const mm = String(wib.getMonth() + 1).padStart(2, '0');
  const dd = String(wib.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function FilterDateRange({
  from = '',
  to = '',
  onChange,
  label = 'Periode Waktu (WIB)',
  className = '',
  align = 'auto',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState(from);
  const [customTo, setCustomTo] = useState(to);
  const containerRef = useRef(null);

  // Synchronize internal custom date state when props change
  useEffect(() => {
    setCustomFrom(from);
    setCustomTo(to);
  }, [from, to]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const today = getWibDate(0);
  const sevenDaysAgo = getWibDate(-6);
  const thirtyDaysAgo = getWibDate(-29);
  const firstOfMonth = getWibDate(0, true);

  const presets = [
    { label: 'Semua Waktu', from: '', to: '' },
    { label: 'Hari Ini', from: today, to: today },
    { label: '7 Hari Terakhir', from: sevenDaysAgo, to: today },
    { label: '30 Hari Terakhir', from: thirtyDaysAgo, to: today },
    { label: 'Bulan Ini', from: firstOfMonth, to: today },
  ];

  // Detect which preset matches
  const activePreset = presets.find(
    (p) => p.from === from && p.to === to
  );

  const getDisplayLabel = () => {
    if (activePreset && activePreset.from) {
      return activePreset.label;
    }
    if (from && to) {
      return from === to ? from : `${from} s/d ${to}`;
    }
    if (from) {
      return `Sejak ${from}`;
    }
    if (to) {
      return `Hingga ${to}`;
    }
    return 'Semua Waktu';
  };

  const handlePresetClick = (preset) => {
    onChange({ from: preset.from, to: preset.to });
    setIsOpen(false);
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    onChange({ from: customFrom, to: customTo });
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ from: '', to: '' });
    setCustomFrom('');
    setCustomTo('');
    setIsOpen(false);
  };

  const hasActiveDate = Boolean(from || to);

  return (
    <div
      ref={containerRef}
      onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
      className={`relative min-w-[170px] sm:min-w-[190px] ${isOpen ? 'z-30' : 'z-10'} ${className}`}
    >
      {label && (
        <span className="block text-[11px] font-semibold text-gray-300 mb-1.5 tracking-wide">
          {label}
        </span>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Pilih rentang tanggal: ${getDisplayLabel()}`}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-none text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-neon/60 ${
          hasActiveDate
            ? 'bg-[#3a0d18] text-[#f8f1e7] border border-[#ba2243] shadow-sm'
            : 'bg-[#14080e] text-[#d4c0bd] border border-[#6d2031] hover:bg-[#23121b] hover:border-[#9e1c38]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <Calendar
            size={14}
            className={`shrink-0 ${hasActiveDate ? 'text-brand-neon' : 'text-[#d4c0bd]/70'}`}
            aria-hidden="true"
          />
          <span className="truncate font-medium">{getDisplayLabel()}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-[#d4c0bd]/70">
          {hasActiveDate && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e);
                }
              }}
              title="Hapus filter tanggal"
              aria-label="Hapus filter tanggal"
              className="p-0.5 rounded-none hover:bg-[#521526] hover:text-[#f8f1e7] transition-colors cursor-pointer"
            >
              <X size={13} aria-hidden="true" />
            </span>
          )}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-brand-neon' : 'text-[#d4c0bd]/70'
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Panel pemilihan tanggal"
          className={`absolute z-50 mt-1.5 w-72 sm:w-80 rounded-none bg-[#160a12] border border-[#6d2031] shadow-2xl p-3.5 text-xs text-[#f8f1e7] animate-in fade-in zoom-in-95 duration-150 ${
            align === 'right'
              ? 'right-0 left-auto'
              : align === 'left'
              ? 'left-0 right-auto'
              : 'right-0 sm:right-auto sm:left-0'
          }`}
        >
          {/* Preset Buttons */}
          <div className="space-y-1 pb-3 border-b border-[#6d2031]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4c0bd] block mb-1.5">
              Pilihan Cepat
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((preset) => {
                const isSelected = activePreset?.label === preset.label;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-none text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#9e1c38]/40 text-[#f8f1e7] font-bold border border-[#ba2243]'
                        : 'bg-[#14080e] text-[#d4c0bd] hover:bg-[#23121b] hover:text-[#f8f1e7] border border-[#6d2031]'
                    }`}
                  >
                    <span>{preset.label}</span>
                    {isSelected && (
                      <Check size={12} className="text-brand-neon shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Date Form */}
          <form onSubmit={handleApplyCustom} className="pt-3 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4c0bd] block">
              Rentang Tanggal Kustom
            </span>

            <div className="space-y-2">
              <div>
                <label className="block text-[10px] text-[#d4c0bd] mb-0.5">Dari Tanggal</label>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="w-full rounded-none bg-[#14080e] border border-[#6d2031] px-2.5 py-1.5 text-xs text-[#f8f1e7] focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#d4c0bd] mb-0.5">Sampai Tanggal</label>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="w-full rounded-none bg-[#14080e] border border-[#6d2031] px-2.5 py-1.5 text-xs text-[#f8f1e7] focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              {(customFrom || customTo) && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomFrom('');
                    setCustomTo('');
                  }}
                  className="px-2.5 py-1.5 text-xs text-[#d4c0bd] hover:text-[#f8f1e7]"
                >
                  Bersihkan
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] font-bold text-xs border border-[#ba2243] transition-all shadow-sm"
              >
                <span>Terapkan</span>
                <ArrowRight size={12} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
