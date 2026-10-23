'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';

/**
 * Modern, accessible filter dropdown component for Admin views.
 * Supports searching, custom badges, clear-on-click, and keyboard navigation.
 */
export default function CustomFilterDropdown({
  label,
  value,
  options = [],
  placeholder = 'Semua',
  onChange,
  icon: LeadingIcon,
  searchable = false,
  className = '',
  ariaLabel,
  align = 'left',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listboxId = useId();

  // Normalize options into { value, label, badge }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return {
      value: opt.value ?? opt.id ?? '',
      label: opt.label ?? opt.name ?? opt.entityType ?? String(opt.value),
      badge: opt.badge ?? opt.role ?? null,
    };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, searchable]);

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const filteredOptions = searchable && searchQuery.trim()
    ? normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (opt.badge && opt.badge.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : normalizedOptions;

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const isSelected = Boolean(value);

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative min-w-[160px] sm:min-w-[180px] ${isOpen ? 'z-30' : 'z-10'} ${className}`}
    >
      {label && (
        <span className="block text-[11px] font-semibold text-gray-300 mb-1.5 tracking-wide">
          {label}
        </span>
      )}

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel || label || placeholder}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-none text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-neon/60 ${
          isSelected
            ? 'bg-[#3a0d18] text-[#f8f1e7] border border-[#ba2243] shadow-sm'
            : 'bg-[#14080e] text-[#d4c0bd] border border-[#6d2031] hover:bg-[#23121b] hover:border-[#9e1c38]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          {LeadingIcon && (
            <span
              className={`shrink-0 ${
                isSelected ? 'text-brand-neon' : 'text-[#d4c0bd]/70'
              }`}
            >
              {LeadingIcon}
            </span>
          )}
          <span className="truncate font-medium text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="shrink-0 text-[10px] px-1.5 py-0.2 rounded-none bg-[#12060b] border border-[#6d2031] text-[#d4c0bd] font-mono">
              {selectedOption.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 text-[#d4c0bd]/70">
          {isSelected && (
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
              title="Hapus pilihan"
              aria-label="Hapus filter ini"
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

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className={`absolute z-50 mt-1.5 w-full min-w-[210px] max-w-[320px] rounded-none bg-[#160a12] border border-[#6d2031] shadow-2xl p-1.5 text-xs text-[#f8f1e7] animate-in fade-in zoom-in-95 duration-150 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {/* Search box if enabled */}
          {searchable && (
            <div className="p-1 mb-1 border-b border-[#6d2031]">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-none bg-[#14080e] border border-[#6d2031]">
                <Search size={12} className="text-[#d4c0bd]/60 shrink-0" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari..."
                  className="w-full bg-transparent text-xs text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[#d4c0bd]/60 hover:text-[#f8f1e7]"
                  >
                    <X size={11} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-0.5 scrollbar-thin scrollbar-thumb-[#6d2031]">
            {/* "All" Reset Option */}
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => handleSelect('')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-none text-left transition-colors ${
                !value
                  ? 'bg-[#9e1c38]/40 text-[#f8f1e7] border border-[#9e1c38]/50 font-semibold'
                  : 'text-[#d4c0bd] hover:bg-[#23121b] hover:text-[#f8f1e7]'
              }`}
            >
              <span>{placeholder}</span>
              {!value && <Check size={13} className="text-brand-neon" aria-hidden="true" />}
            </button>

            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-center text-[11px] text-[#d4c0bd]">
                Tidak ada pilihan ditemukan
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-none text-left transition-colors ${
                      active
                        ? 'bg-[#9e1c38]/40 text-[#f8f1e7] border border-[#9e1c38]/50 font-semibold'
                        : 'text-[#d4c0bd] hover:bg-[#23121b] hover:text-[#f8f1e7]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate">{opt.label}</span>
                      {opt.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-[#12060b] border border-[#6d2031] text-[#d4c0bd] font-mono shrink-0">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    {active && (
                      <Check size={13} className="text-brand-neon shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
