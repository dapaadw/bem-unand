'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { STATUS_LABEL } from '../../lib/aspirasi';
import {
  CheckCircle2,
  User,
  Paperclip,
  Check,
  Loader2,
  Copy,
  ExternalLink,
} from 'lucide-react';

export default function AspirasiManagerClient({ initialItems }) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  async function updateStatus(id, status) {
    setBusy(id);
    setMessage('');
    try {
      const res = await fetch('/api/aspirasi/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah status.');
      setMessage('Status aspirasi berhasil diperbarui.');
      router.refresh();
    } catch (error) {
      setMessage(error.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setBusy('');
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard?.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(''), 2000);
  }

  return (
    <div className="space-y-4">
      {message && (
        <div role="status" className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}

      {initialItems.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-gray-400">
          Tidak ada aspirasi yang cocok dengan kriteria filter saat ini.
        </div>
      ) : (
        <div className="space-y-4">
          {initialItems.map((item) => {
            const isBusy = busy === item.id;
            const createdAtDate = new Date(item.createdAt);

            return (
              <article
                key={item.id}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md hover:border-brand-neon/30 transition-all space-y-4 shadow-sm"
              >
                {/* Header: Ticket Code & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-neon bg-brand-neon/15 px-2.5 py-1 rounded-lg border border-brand-neon/30">
                      {item.ticketCode}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.ticketCode)}
                      className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                      title="Salin Kode Tiket"
                      aria-label="Salin Kode Tiket"
                    >
                      {copiedCode === item.ticketCode ? (
                        <Check size={13} className="text-emerald-400" aria-hidden="true" />
                      ) : (
                        <Copy size={13} aria-hidden="true" />
                      )}
                    </button>
                    <span className="text-gray-600">·</span>
                    <span className="text-xs font-semibold text-gray-300">
                      {item.jenisPengajuan}
                    </span>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                      item.status === 'BARU'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : item.status === 'DIPROSES'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>

                {/* Sub: Sender & Target */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-black/30 p-3.5 rounded-xl border border-white/5 text-xs">
                  <div className="flex items-center gap-2 text-gray-200">
                    <User size={14} className="text-brand-neon shrink-0" aria-hidden="true" />
                    <span className="text-gray-400">Pengirim:</span>
                    <span className="font-semibold text-white">
                      {item.isAnonymous ? 'Anonim (Dirahasiakan)' : item.nama || '-'}
                    </span>
                    {!item.isAnonymous && item.nim && (
                      <span className="text-gray-400 font-mono">({item.nim})</span>
                    )}
                  </div>

                  <div className="text-gray-200">
                    <span className="text-gray-400">Pihak yang Dituju:</span>{' '}
                    <span className="font-semibold text-brand-neon">{item.pihakDituju}</span>
                  </div>

                  {!item.isAnonymous && (item.cp || item.email) && (
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-1.5 text-[11px] text-gray-400 border-t border-white/5 mt-0.5">
                      {item.cp && <span>Kontak / WA: <strong className="text-white">{item.cp}</strong></span>}
                      {item.email && <span>Email: <strong className="text-white">{item.email}</strong></span>}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2.5 text-xs leading-relaxed">
                  {item.keluhKesah && (
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                        Pokok Masalah:
                      </p>
                      <p className="font-semibold text-white whitespace-pre-wrap">
                        {item.keluhKesah}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Uraian Lengkap:
                    </p>
                    <p className="text-gray-300 bg-black/40 p-3.5 rounded-xl border border-white/5 whitespace-pre-wrap">
                      {item.deskripsi}
                    </p>
                  </div>

                  {item.harapan && (
                    <div className="text-gray-400 pt-0.5">
                      <span className="font-semibold text-gray-200">Harapan Pemohon:</span>{' '}
                      {item.harapan}
                    </div>
                  )}

                  {item.buktiUrl && (
                    <div className="pt-1">
                      <a
                        href={'/api/aspirasi/' + item.id + '/bukti'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-neon border border-brand-neon/30 text-xs font-semibold transition-colors"
                      >
                        <Paperclip size={13} aria-hidden="true" />
                        <span>Lihat Lampiran Bukti</span>
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer: Date & Status Buttons */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-gray-400 font-mono">
                    Diajukan pada{' '}
                    {createdAtDate.toLocaleString('id-ID', {
                      timeZone: 'Asia/Jakarta',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    WIB
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-gray-400 mr-1">Ubah Status:</span>
                    {Object.entries(STATUS_LABEL).map(([value, label]) => {
                      const isCurrent = item.status === value;
                      return (
                        <button
                          key={value}
                          onClick={() => updateStatus(item.id, value)}
                          disabled={isBusy || isCurrent}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            isCurrent
                              ? 'bg-white/10 text-gray-400 cursor-default opacity-60'
                              : value === 'SELESAI'
                              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                              : value === 'DIPROSES'
                              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
                          }`}
                          aria-label={`Ubah status ${item.ticketCode} menjadi ${label}`}
                        >
                          {isBusy && <Loader2 size={12} className="animate-spin" aria-hidden="true" />}
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
