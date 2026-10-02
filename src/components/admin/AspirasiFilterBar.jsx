'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  RotateCcw,
  Tag,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import CustomFilterDropdown from './CustomFilterDropdown';
import FilterDateRange from './FilterDateRange';
import { STATUS_LABEL } from '../../lib/aspirasi';

const STATUS_CONFIG = {
  ALL: {
    label: 'Semua Status',
    dotClass: 'bg-gray-400',
    activeClass: 'bg-brand-neon text-brand-dark font-bold border-brand-neon shadow-sm shadow-brand-neon/20',
  },
  BARU: {
    label: 'Pending',
    dotClass: 'bg-sky-400',
    activeClass: 'bg-sky-500/20 text-sky-200 border-sky-400/50 shadow-sm shadow-sky-500/10 font-bold',
  },
  DIPROSES: {
    label: 'Diproses',
    dotClass: 'bg-amber-400',
    activeClass: 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-sm shadow-amber-500/10 font-bold',
  },
  SELESAI: {
    label: 'Selesai',
    dotClass: 'bg-emerald-400',
    activeClass: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/50 shadow-sm shadow-emerald-500/10 font-bold',
  },
};

const JENIS_CONFIG = [
  { value: 'ASPIRASI', label: 'Aspirasi Mahasiswa' },
  { value: 'KELUHAN', label: 'Keluhan Layanan/Fasilitas' },
  { value: 'SARAN', label: 'Saran & Masukan' },
  { value: 'LAINNYA', label: 'Lain-lain' },
];

export default function AspirasiFilterBar({ currentFilters, totalCount = 0 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = currentFilters?.status || '';
  const currentJenis = currentFilters?.jenis || '';
  const currentFrom = currentFilters?.from || '';
  const currentTo = currentFilters?.to || '';

  const updateFilters = (newEntries) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newEntries).forEach(([key, val]) => {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const resetAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Determine active filters for badge chips
  const activeFilters = [];
  if (currentStatus) {
    activeFilters.push({
      key: 'status',
      label: `Status: ${STATUS_LABEL[currentStatus] || currentStatus}`,
      onRemove: () => updateFilters({ status: '' }),
    });
  }
  if (currentJenis) {
    const matchingJenis = JENIS_CONFIG.find((j) => j.value === currentJenis);
    activeFilters.push({
      key: 'jenis',
      label: `Jenis: ${matchingJenis?.label || currentJenis}`,
      onRemove: () => updateFilters({ jenis: '' }),
    });
  }
  if (currentFrom || currentTo) {
    let dateLabel = 'Periode: ';
    if (currentFrom && currentTo) {
      dateLabel += currentFrom === currentTo ? currentFrom : `${currentFrom} s/d ${currentTo}`;
    } else if (currentFrom) {
      dateLabel += `Mulai ${currentFrom}`;
    } else {
      dateLabel += `Hingga ${currentTo}`;
    }
    activeFilters.push({
      key: 'date',
      label: dateLabel,
      onRemove: () => updateFilters({ from: '', to: '' }),
    });
  }

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="relative z-20 rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-4">
      {/* Top Bar: Title & Filter Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-neon/10 text-brand-neon">
            <SlidersHorizontal size={15} aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Filter Aspirasi
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-neon/20 text-brand-neon border border-brand-neon/30">
              {activeFilters.length} aktif
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-gray-300">
            Ditemukan <strong className="text-brand-neon font-bold">{totalCount}</strong> aspirasi
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs transition-colors"
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Filter Section */}
      <div className="space-y-3.5">
        {/* Row 1: Status Respon (Tactile Pill Chips) */}
        <div>
          <span className="block text-[11px] font-semibold text-gray-300 mb-1.5 tracking-wide">
            Status Penanganan
          </span>
          <div
            role="radiogroup"
            aria-label="Pilih status penanganan aspirasi"
            className="flex flex-wrap items-center gap-2"
          >
            {/* "Semua" Chip */}
            <button
              type="button"
              role="radio"
              aria-checked={!currentStatus}
              onClick={() => updateFilters({ status: '' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                !currentStatus
                  ? STATUS_CONFIG.ALL.activeClass
                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  !currentStatus ? 'bg-brand-dark' : 'bg-gray-400'
                }`}
                aria-hidden="true"
              />
              <span>Semua Status</span>
            </button>

            {/* Individual Status Chips */}
            {Object.entries(STATUS_CONFIG).map(([key, config]) => {
              if (key === 'ALL') return null;
              const isSelected = currentStatus === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => updateFilters({ status: isSelected ? '' : key })}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? config.activeClass
                      : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${config.dotClass}`}
                    aria-hidden="true"
                  />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Jenis Pengajuan & Periode Waktu in Responsive Flex/Grid */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          {/* Jenis Dropdown */}
          <CustomFilterDropdown
            label="Kategori Pengajuan"
            value={currentJenis}
            options={JENIS_CONFIG}
            placeholder="Semua Kategori"
            onChange={(val) => updateFilters({ jenis: val })}
            icon={<Tag size={13} aria-hidden="true" />}
            searchable={false}
            className="flex-1 sm:max-w-xs"
          />

          {/* Date Range Selector */}
          <FilterDateRange
            label="Rentang Waktu (WIB)"
            from={currentFrom}
            to={currentTo}
            onChange={({ from, to }) => updateFilters({ from, to })}
            className="flex-1 sm:max-w-xs"
          />
        </div>
      </div>

      {/* Active Filter Badges Strip */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-gray-400 mr-1">
            Filter diterapkan:
          </span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-medium"
            >
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={filter.onRemove}
                title="Hapus filter ini"
                aria-label={`Hapus ${filter.label}`}
                className="p-0.5 rounded hover:bg-brand-neon/20 transition-colors"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
