'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  User,
  Layers,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import CustomFilterDropdown from './CustomFilterDropdown';
import FilterDateRange from './FilterDateRange';

const ACTION_CONFIG = {
  ALL: {
    label: 'Semua Tindakan',
    dotClass: 'bg-gray-400',
    activeClass: 'bg-brand-neon text-brand-dark font-bold border-brand-neon shadow-sm shadow-brand-neon/20',
  },
  CREATE: {
    label: 'CREATE',
    sublabel: 'Penambahan',
    dotClass: 'bg-emerald-400',
    activeClass: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/50 shadow-sm shadow-emerald-500/10 font-bold',
  },
  UPDATE: {
    label: 'UPDATE',
    sublabel: 'Pembaruan',
    dotClass: 'bg-amber-400',
    activeClass: 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-sm shadow-amber-500/10 font-bold',
  },
  DELETE: {
    label: 'DELETE',
    sublabel: 'Penghapusan',
    dotClass: 'bg-rose-400',
    activeClass: 'bg-rose-500/20 text-rose-200 border-rose-400/50 shadow-sm shadow-rose-500/10 font-bold',
  },
};

export default function AuditLogFilterBar({
  admins = [],
  entityTypes = [],
  currentFilters,
  totalCount = 0,
  pageCount = 0,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentAction = currentFilters?.action || '';
  const currentUserId = currentFilters?.userId || '';
  const currentEntityType = currentFilters?.entityType || '';
  const currentFrom = currentFilters?.from || '';
  const currentTo = currentFilters?.to || '';

  const updateFilters = (newEntries) => {
    const params = new URLSearchParams(searchParams.toString());
    // Reset pagination to page 1 whenever filters change
    params.delete('page');

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

  // Resolve labels for active filters strip
  const activeFilters = [];

  if (currentAction) {
    activeFilters.push({
      key: 'action',
      label: `Aksi: ${currentAction}`,
      onRemove: () => updateFilters({ action: '' }),
    });
  }

  if (currentUserId) {
    const admin = admins.find((a) => a.id === currentUserId);
    activeFilters.push({
      key: 'userId',
      label: `Petugas: ${admin ? admin.name : currentUserId}`,
      onRemove: () => updateFilters({ userId: '' }),
    });
  }

  if (currentEntityType) {
    activeFilters.push({
      key: 'entityType',
      label: `Entitas: ${currentEntityType}`,
      onRemove: () => updateFilters({ entityType: '' }),
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
      {/* Top Bar: Title & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-neon/10 text-brand-neon">
            <SlidersHorizontal size={15} aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Filter Audit Trail
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-neon/20 text-brand-neon border border-brand-neon/30">
              {activeFilters.length} aktif
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-gray-300">
            Menampilkan <strong className="text-brand-neon font-bold">{pageCount}</strong> dari{' '}
            <strong className="text-white font-bold">{totalCount}</strong> catatan
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
        {/* Row 1: Action (Tindakan) Segmented Chips */}
        <div>
          <span className="block text-[11px] font-semibold text-gray-300 mb-1.5 tracking-wide">
            Tipe Tindakan Mutasi
          </span>
          <div
            role="radiogroup"
            aria-label="Pilih tipe tindakan audit"
            className="flex flex-wrap items-center gap-2"
          >
            {/* "Semua Tindakan" */}
            <button
              type="button"
              role="radio"
              aria-checked={!currentAction}
              onClick={() => updateFilters({ action: '' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                !currentAction
                  ? ACTION_CONFIG.ALL.activeClass
                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  !currentAction ? 'bg-brand-dark' : 'bg-gray-400'
                }`}
                aria-hidden="true"
              />
              <span>Semua Tindakan</span>
            </button>

            {/* CREATE Chip */}
            <button
              type="button"
              role="radio"
              aria-checked={currentAction === 'CREATE'}
              onClick={() => updateFilters({ action: currentAction === 'CREATE' ? '' : 'CREATE' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                currentAction === 'CREATE'
                  ? ACTION_CONFIG.CREATE.activeClass
                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
              <span>CREATE</span>
              <span className="text-[10px] opacity-75 font-normal">Penambahan</span>
            </button>

            {/* UPDATE Chip */}
            <button
              type="button"
              role="radio"
              aria-checked={currentAction === 'UPDATE'}
              onClick={() => updateFilters({ action: currentAction === 'UPDATE' ? '' : 'UPDATE' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                currentAction === 'UPDATE'
                  ? ACTION_CONFIG.UPDATE.activeClass
                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
              <span>UPDATE</span>
              <span className="text-[10px] opacity-75 font-normal">Pembaruan</span>
            </button>

            {/* DELETE Chip */}
            <button
              type="button"
              role="radio"
              aria-checked={currentAction === 'DELETE'}
              onClick={() => updateFilters({ action: currentAction === 'DELETE' ? '' : 'DELETE' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                currentAction === 'DELETE'
                  ? ACTION_CONFIG.DELETE.activeClass
                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" aria-hidden="true" />
              <span>DELETE</span>
              <span className="text-[10px] opacity-75 font-normal">Penghapusan</span>
            </button>
          </div>
        </div>

        {/* Row 2: Petugas, Entitas, and Date Range in Responsive Flex/Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {/* Admin / Petugas Dropdown */}
          <CustomFilterDropdown
            label="Petugas / Admin"
            value={currentUserId}
            options={admins.map((a) => ({
              value: a.id,
              label: a.name,
              badge: a.role,
            }))}
            placeholder="Semua Petugas"
            onChange={(val) => updateFilters({ userId: val })}
            icon={<User size={13} aria-hidden="true" />}
            searchable={admins.length > 4}
          />

          {/* Entitas Dropdown */}
          <CustomFilterDropdown
            label="Entitas Terkait"
            value={currentEntityType}
            options={entityTypes}
            placeholder="Semua Entitas"
            onChange={(val) => updateFilters({ entityType: val })}
            icon={<Layers size={13} aria-hidden="true" />}
            searchable={entityTypes.length > 4}
          />

          {/* Periode Waktu */}
          <FilterDateRange
            label="Rentang Waktu (WIB)"
            from={currentFrom}
            to={currentTo}
            onChange={({ from, to }) => updateFilters({ from, to })}
            align="right"
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
