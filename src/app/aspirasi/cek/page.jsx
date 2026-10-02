'use client';

import { useState } from 'react';

const STATUS_COLORS = {
  BARU: 'bg-yellow-500/20 text-yellow-300',
  DIPROSES: 'bg-blue-500/20 text-blue-300',
  SELESAI: 'bg-green-500/20 text-green-300',
};

export default function CekAspirasiPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/aspirasi/cek?ticketCode=${encodeURIComponent(ticketCode)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal memeriksa status.');
        return;
      }
      setResult(data);
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-md">
      <h1 className="text-3xl font-bold mb-2">Cek Status Aspirasi</h1>
      <p className="text-gray-400 mb-8">Masukkan kode tiket yang kamu dapat saat mengirim aspirasi.</p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          required
          aria-label="Kode tiket"
          maxLength={16}
          placeholder="ASP-XXXXXXXXXXXX"
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          className="min-w-0 flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 uppercase tracking-wide"
        />
        <button disabled={loading} type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
          {loading ? '...' : 'Cek'}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>
      )}

      {result && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex flex-wrap gap-2 justify-between items-start mb-3">
            <p className="font-semibold tracking-widest">{result.ticketCode}</p>
            <span className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[result.status]}`}>{result.statusLabel}</span>
          </div>
          <p className="text-sm text-gray-400">Ditujukan ke: {result.pihakDituju}</p>
          <p className="text-sm text-gray-400">Dikirim: {new Date(result.createdAt).toLocaleString('id-ID')}</p>
        </div>
      )}
      <a className="inline-block mt-6 text-brand-neon underline" href="/aspirasi">Kembali ke formulir aspirasi</a>
    </section>
  );
}
