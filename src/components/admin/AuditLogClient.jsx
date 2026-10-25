'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ScrollText,
  Clock,
  Trash2,
  Edit,
  PlusCircle,
  Database,
} from 'lucide-react';

const ACTION_MAP = {
  CREATE: {
    label: 'CREATE',
    badge: 'bg-emerald-950/60 text-emerald-200 border-emerald-500/50',
    icon: PlusCircle,
  },
  UPDATE: {
    label: 'UPDATE',
    badge: 'bg-[#3a0d18] text-[#e3bbb9] border-[#6d2031]',
    icon: Edit,
  },
  DELETE: {
    label: 'DELETE',
    badge: 'bg-[#4a0d18] text-rose-200 border-[#9e1c38]',
    icon: Trash2,
  },
};

export default function AuditLogClient({ initialLogs }) {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return initialLogs.filter((log) => {
      if (actionFilter !== 'ALL' && log.action !== actionFilter) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      const userName = log.user?.name?.toLowerCase() || '';
      const summary = log.summary?.toLowerCase() || '';
      const entity = log.entityType?.toLowerCase() || '';
      const action = log.action?.toLowerCase() || '';

      return userName.includes(q) || summary.includes(q) || entity.includes(q) || action.includes(q);
    });
  }, [initialLogs, search, actionFilter]);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1a1517]/90 border border-[#6d2031] p-4 sm:p-5 rounded-2xl shadow-xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4c0bd]/60" />
          <input
            type="text"
            placeholder="Cari user, ringkasan, atau entitas data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14080e] border border-[#6d2031] text-xs text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#d4c0bd]/60 hover:text-[#f8f1e7]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'CREATE', 'UPDATE', 'DELETE'].map((act) => {
            const active = actionFilter === act;
            return (
              <button
                key={act}
                onClick={() => setActionFilter(act)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-[#9e1c38] text-[#f8f1e7] border-[#ba2243] shadow-sm'
                    : 'bg-[#14080e] text-[#d4c0bd] hover:bg-[#23121b] hover:text-[#f8f1e7] border-[#6d2031]'
                }`}
              >
                {act === 'ALL' ? 'Semua Aksi' : act}
              </button>
            );
          })}
        </div>
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between text-xs text-[#d4c0bd] px-1">
        <p>
          Menampilkan <span className="font-semibold text-[#f8f1e7]">{filtered.length}</span> dari{' '}
          <span className="font-semibold text-[#f8f1e7]">{initialLogs.length}</span> rekam jejak aktivitas
        </p>
      </div>

      {/* Table Area */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-[#1a1517]/85 border border-dashed border-[#6d2031] space-y-3">
          <div className="inline-flex p-3.5 rounded-2xl bg-[#3a0d18] border border-[#6d2031] text-brand-neon">
            <ScrollText size={28} />
          </div>
          <h3 className="text-sm font-bold text-[#f8f1e7]">Tidak ada log aktivitas yang cocok</h3>
          <p className="text-xs text-[#d4c0bd] max-w-sm mx-auto">
            {search
              ? `Tidak ditemukan catatan audit dengan kata kunci "${search}".`
              : 'Belum ada catatan aktivitas untuk filter ini.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#6d2031] bg-[#1a1517]/85 shadow-xl">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase tracking-wider text-[#e3bbb9] border-b border-[#6d2031] bg-[#1f0d16]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Waktu &amp; Tanggal</th>
                <th className="py-3.5 px-4 font-semibold">Pengguna</th>
                <th className="py-3.5 px-4 font-semibold">Aksi</th>
                <th className="py-3.5 px-4 font-semibold">Entitas</th>
                <th className="py-3.5 px-4 font-semibold">Ringkasan Modifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6d2031]/30">
              {filtered.map((log) => {
                const actCfg = ACTION_MAP[log.action] || {
                  label: log.action,
                  badge: 'bg-[#14080e] text-[#d4c0bd] border-[#6d2031]',
                  icon: Database,
                };
                const Icon = actCfg.icon;

                return (
                  <tr
                    key={log.id}
                    className="hover:bg-[#23121b]/60 transition-colors"
                  >
                    <td className="py-3 px-4 text-[#d4c0bd] whitespace-nowrap font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#d4c0bd]/60" />
                        <span>
                          {new Date(log.createdAt).toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-[#f8f1e7] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#3a0d18] border border-[#6d2031] flex items-center justify-center text-[10px] font-bold text-brand-neon">
                          {log.user?.name ? log.user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{log.user?.name || 'Sistem / Anonim'}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${actCfg.badge}`}
                      >
                        <Icon size={11} />
                        <span>{actCfg.label}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#14080e] text-[#d4c0bd] border border-[#6d2031] font-mono">
                        {log.entityType}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-[#d4c0bd] leading-relaxed max-w-md">
                      {log.summary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
