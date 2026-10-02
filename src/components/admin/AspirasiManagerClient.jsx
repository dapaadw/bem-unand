'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { STATUS_LABEL } from '../../lib/aspirasi';
import {
  Search,
  ExternalLink,
  UserCheck,
  UserX,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Mail,
  Hash,
  Eye,
  MessageSquareWarning,
  Phone,
} from 'lucide-react';

const STATUS_CONFIG = {
  BARU: {
    label: 'BARU',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400',
  },
  DIPROSES: {
    label: 'DIPROSES',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    dot: 'bg-sky-400',
  },
  SELESAI: {
    label: 'SELESAI',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
};

export default function AspirasiManagerClient({ initialItems }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState('');

  async function updateStatus(id, status) {
    setUpdatingId(id);
    setMessage('');
    try {
      const res = await fetch(`/api/aspirasi/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah status.');
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: data.status } : i))
      );
      setMessage('Status berhasil diperbarui.');
      router.refresh();
    } catch (error) {
      setMessage(error.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setUpdatingId(null);
    }
  }

  // Count metrics
  const counts = useMemo(() => {
    return {
      ALL: items.length,
      BARU: items.filter((i) => i.status === 'BARU').length,
      DIPROSES: items.filter((i) => i.status === 'DIPROSES').length,
      SELESAI: items.filter((i) => i.status === 'SELESAI').length,
    };
  }, [items]);

  // Filter items based on search and statusFilter
  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      const matchName = item.nama?.toLowerCase().includes(q);
      const matchPihak = item.pihakDituju?.toLowerCase().includes(q);
      const matchDeskripsi = item.deskripsi?.toLowerCase().includes(q);
      const matchHarapan = item.harapan?.toLowerCase().includes(q);
      const matchNim = item.nim?.toLowerCase().includes(q);
      const matchEmail = item.email?.toLowerCase().includes(q);
      const matchTicket = item.ticketCode?.toLowerCase().includes(q);
      const matchKeluh = item.keluhKesah?.toLowerCase().includes(q);

      return matchName || matchPihak || matchDeskripsi || matchHarapan || matchNim || matchEmail || matchTicket || matchKeluh;
    });
  }, [items, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Status message */}
      {message && (
        <p role="status" className="text-xs text-brand-neon font-semibold">{message}</p>
      )}

      {/* Control Bar: Search & Status Filter Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Cari aspirasi, pengirim, kode tiket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 focus:ring-1 focus:ring-brand-neon/60 transition-all"
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

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: 'ALL', label: 'Semua', count: counts.ALL },
            { key: 'BARU', label: 'Baru', count: counts.BARU, color: 'text-amber-400' },
            { key: 'DIPROSES', label: 'Diproses', count: counts.DIPROSES, color: 'text-sky-400' },
            { key: 'SELESAI', label: 'Selesai', count: counts.SELESAI, color: 'text-emerald-400' },
          ].map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-brand-neon text-brand-dark shadow-[0_0_12px_rgba(254,174,174,0.3)]'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-brand-dark/30 text-brand-dark' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count Indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <p>
          Menampilkan <span className="font-semibold text-white">{filtered.length}</span> dari{' '}
          <span className="font-semibold text-white">{items.length}</span> aspirasi
        </p>
        {(search || statusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('ALL');
            }}
            className="text-brand-neon hover:underline text-xs"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 space-y-3">
          <div className="inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400">
            <MessageSquareWarning size={28} />
          </div>
          <h3 className="text-sm font-bold text-white">Tidak ada aspirasi yang cocok</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {search
              ? `Tidak ditemukan hasil untuk kata kunci "${search}". Coba kata kunci lain atau bersihkan filter pencarian.`
              : 'Belum ada aspirasi untuk kategori filter yang dipilih.'}
          </p>
        </div>
      )}

      {/* Aspirasi Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.BARU;
          const isUpdating = updatingId === item.id;

          return (
            <article
              key={item.id}
              className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 hover:border-brand-neon/30 p-5 md:p-6 transition-all duration-200 backdrop-blur-md shadow-lg space-y-4 break-words"
            >
              {/* Header: Ticket Code, Sender & Target Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-brand-neon shrink-0 mt-0.5">
                    {item.isAnonymous ? <UserX size={18} /> : <UserCheck size={18} />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.ticketCode && (
                        <span className="font-bold text-sm text-brand-neon">{item.ticketCode}</span>
                      )}
                      <span className="font-bold text-sm text-white">
                        {item.isAnonymous ? 'Pengirim Anonim' : item.nama || 'Mahasiswa'}
                      </span>
                      <span className="text-zinc-500">·</span>
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md bg-brand-red/30 text-brand-neon border border-brand-neon/20 font-medium">
                        Tujuan: {item.pihakDituju}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                      {item.jenisPengajuan && (
                        <span className="text-zinc-300 font-medium">{item.jenisPengajuan}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(item.createdAt).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })} WIB
                      </span>

                      {!item.isAnonymous && item.nim && (
                        <span className="flex items-center gap-1 font-mono text-zinc-300">
                          <Hash size={12} />
                          NIM: {item.nim}
                        </span>
                      )}

                      {!item.isAnonymous && item.cp && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Phone size={12} />
                          CP: {item.cp}
                        </span>
                      )}

                      {!item.isAnonymous && item.email && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Mail size={12} />
                          {item.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cfg.badge}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    {STATUS_LABEL[item.status] || cfg.label}
                  </span>
                </div>
              </div>

              {/* Body: Keluh Kesah, Deskripsi & Harapan */}
              <div className="space-y-3">
                {item.keluhKesah && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-neon mb-1">
                      Ringkasan / Keluh Kesah:
                    </p>
                    <p className="text-xs md:text-sm text-white leading-relaxed whitespace-pre-line bg-brand-neon/[0.04] p-3.5 rounded-xl border border-brand-neon/15 font-semibold">
                      {item.keluhKesah}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Isi Aspirasi / Deskripsi:
                  </p>
                  <p className="text-xs md:text-sm text-zinc-200 leading-relaxed whitespace-pre-line bg-black/20 p-3.5 rounded-xl border border-white/5">
                    {item.deskripsi}
                  </p>
                </div>

                {item.harapan && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-neon mb-1">
                      Harapan Mahasiswa:
                    </p>
                    <p className="text-xs md:text-sm text-zinc-300 italic bg-brand-neon/[0.04] p-3 rounded-xl border border-brand-neon/15">
                      &quot;{item.harapan}&quot;
                    </p>
                  </div>
                )}
              </div>

              {/* Footer: Attachment & Quick Status Changer */}
              <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {item.buktiUrl ? (
                    <a
                      href={`/api/aspirasi/${item.id}/bukti`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-neon text-xs font-medium border border-white/10 transition-colors"
                    >
                      <Eye size={13} />
                      <span>Lihat Dokumen Bukti</span>
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span className="text-[11px] text-zinc-400">Tidak ada lampiran bukti</span>
                  )}
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400 hidden md:inline">Ubah Status:</span>
                  <div className="inline-flex rounded-xl p-1 bg-black/40 border border-white/10 gap-1">
                    {Object.entries(STATUS_LABEL).map(([key, label]) => {
                      const active = item.status === key;
                      const Icon = key === 'BARU' ? AlertCircle : key === 'DIPROSES' ? RefreshCw : CheckCircle2;
                      return (
                        <button
                          key={key}
                          onClick={() => updateStatus(item.id, key)}
                          disabled={active || isUpdating}
                          aria-label={`Ubah ${item.ticketCode || ''} menjadi ${label}`}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            active
                              ? 'bg-white/15 text-white font-bold shadow-sm'
                              : 'text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-40'
                          }`}
                        >
                          <Icon size={12} className={active ? 'text-brand-neon' : ''} />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
