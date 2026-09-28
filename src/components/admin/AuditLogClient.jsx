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
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: PlusCircle,
  },
  UPDATE: {
    label: 'UPDATE',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    icon: Edit,
  },
  DELETE: {
    label: 'DELETE',
    badge: 'bg-red-500/15 text-red-300 border-red-500/30',
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari user, ringkasan, atau entitas data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
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
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-brand-neon text-brand-dark shadow-[0_0_10px_rgba(254,174,174,0.3)]'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {act === 'ALL' ? 'Semua Aksi' : act}
              </button>
            );
          })}
        </div>
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <p>
          Menampilkan <span className="font-semibold text-white">{filtered.length}</span> dari{' '}
          <span className="font-semibold text-white">{initialLogs.length}</span> rekam jejak aktivitas
        </p>
      </div>

      {/* Table Area */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 space-y-3">
          <div className="inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400">
            <ScrollText size={28} />
          </div>
          <h3 className="text-sm font-bold text-white">Tidak ada log aktivitas yang cocok</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {search
              ? `Tidak ditemukan catatan audit dengan kata kunci "${search}".`
              : 'Belum ada catatan aktivitas untuk filter ini.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-xl">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-400 border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Waktu & Tanggal</th>
                <th className="py-3.5 px-4 font-semibold">Pengguna</th>
                <th className="py-3.5 px-4 font-semibold">Aksi</th>
                <th className="py-3.5 px-4 font-semibold">Entitas</th>
                <th className="py-3.5 px-4 font-semibold">Ringkasan Modifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((log) => {
                const actCfg = ACTION_MAP[log.action] || {
                  label: log.action,
                  badge: 'bg-white/10 text-zinc-300 border-white/20',
                  icon: Database,
                };
                const Icon = actCfg.icon;

                return (
                  <tr
                    key={log.id}
                    className="hover:bg-white/[0.04] transition-colors"
                  >
                    <td className="py-3 px-4 text-zinc-300 whitespace-nowrap font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-zinc-500" />
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

                    <td className="py-3 px-4 font-medium text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-brand-neon">
                          {log.user?.name ? log.user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{log.user?.name || 'Sistem / Anonim'}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${actCfg.badge}`}
                      >
                        <Icon size={11} />
                        <span>{actCfg.label}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 font-mono">
                        {log.entityType}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-zinc-200 leading-relaxed max-w-md">
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
