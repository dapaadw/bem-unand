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
    activeClass: 'bg-[#9e1c38] text-[#f8f1e7] font-bold border-[#ba2243] shadow-sm',
  },
  CREATE: {
    label: 'CREATE',
    sublabel: 'Penambahan',
    dotClass: 'bg-emerald-400',
    activeClass: 'bg-emerald-950/60 text-emerald-200 border-emerald-500/50 font-bold',
  },
  UPDATE: {
    label: 'UPDATE',
    sublabel: 'Pembaruan',
    dotClass: 'bg-[#ba2243]',
    activeClass: 'bg-[#3a0d18] text-[#e3bbb9] border-[#6d2031] font-bold',
  },
  DELETE: {
    label: 'DELETE',
    sublabel: 'Penghapusan',
    dotClass: 'bg-rose-400',
    activeClass: 'bg-[#4a0d18] text-rose-200 border-[#9e1c38] font-bold',
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
    <div className="relative z-20 rounded-none bg-[#1a1517]/90 border border-[#6d2031] p-4 sm:p-5 space-y-4">
      {/* Top Bar: Title & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#6d2031]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-none bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
            <SlidersHorizontal size={15} aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-[#f8f1e7] tracking-wide">
            Filter Audit Trail
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
              {activeFilters.length} aktif
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-[#d4c0bd]">
            Menampilkan <strong className="text-brand-neon font-bold">{pageCount}</strong> dari{' '}
            <strong className="text-[#f8f1e7] font-bold">{totalCount}</strong> catatan
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#1f151a] hover:bg-[#2c1d24] text-[#d4c0bd] hover:text-[#f8f1e7] border border-[#6d2031] text-xs transition-colors"
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
          <span className="block text-[11px] font-semibold text-[#d4c0bd] mb-1.5 tracking-wide">
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs transition-all cursor-pointer border ${
                !currentAction
                  ? ACTION_CONFIG.ALL.activeClass
                  : 'bg-[#14080e] text-[#d4c0bd] border-[#6d2031] hover:bg-[#23121b] hover:text-[#f8f1e7]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-none shrink-0 ${
                  !currentAction ? 'bg-[#f8f1e7]' : 'bg-[#d4c0bd]/60'
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs transition-all cursor-pointer border ${
                currentAction === 'CREATE'
                  ? ACTION_CONFIG.CREATE.activeClass
                  : 'bg-[#14080e] text-[#d4c0bd] border-[#6d2031] hover:bg-[#23121b] hover:text-[#f8f1e7]'
              }`}
            >
              <span className="w-2 h-2 rounded-none bg-emerald-400 shrink-0" aria-hidden="true" />
              <span>CREATE</span>
              <span className="text-[10px] opacity-75 font-normal">Penambahan</span>
            </button>

            {/* UPDATE Chip */}
            <button
              type="button"
              role="radio"
              aria-checked={currentAction === 'UPDATE'}
              onClick={() => updateFilters({ action: currentAction === 'UPDATE' ? '' : 'UPDATE' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs transition-all cursor-pointer border ${
                currentAction === 'UPDATE'
                  ? ACTION_CONFIG.UPDATE.activeClass
                  : 'bg-[#14080e] text-[#d4c0bd] border-[#6d2031] hover:bg-[#23121b] hover:text-[#f8f1e7]'
              }`}
            >
              <span className="w-2 h-2 rounded-none bg-[#ba2243] shrink-0" aria-hidden="true" />
              <span>UPDATE</span>
              <span className="text-[10px] opacity-75 font-normal">Pembaruan</span>
            </button>

            {/* DELETE Chip */}
            <button
              type="button"
              role="radio"
              aria-checked={currentAction === 'DELETE'}
              onClick={() => updateFilters({ action: currentAction === 'DELETE' ? '' : 'DELETE' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs transition-all cursor-pointer border ${
                currentAction === 'DELETE'
                  ? ACTION_CONFIG.DELETE.activeClass
                  : 'bg-[#14080e] text-[#d4c0bd] border-[#6d2031] hover:bg-[#23121b] hover:text-[#f8f1e7]'
              }`}
            >
              <span className="w-2 h-2 rounded-none bg-rose-400 shrink-0" aria-hidden="true" />
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
        <div className="pt-2 border-t border-[#6d2031]/40 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-[#d4c0bd] mr-1">
            Filter diterapkan:
          </span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#3a0d18] border border-[#6d2031] text-[#e3bbb9] text-xs font-medium"
            >
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={filter.onRemove}
                title="Hapus filter ini"
                aria-label={`Hapus ${filter.label}`}
                className="p-0.5 rounded-none hover:bg-[#521526] transition-colors"
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
