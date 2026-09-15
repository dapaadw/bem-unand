'use client';

import { useState } from 'react';

export default function AspirasiPage() {
  const [form, setForm] = useState({
    nama: '', nim: '', cp: '', email: '', pihakDituju: '', deskripsi: '', harapan: '', isAnonymous: false,
  });
  const [bukti, setBukti] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (bukti) fd.append('bukti', bukti);

      const res = await fetch('/api/aspirasi', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Gagal mengirim aspirasi.');
        setStatus('idle');
        return;
      }

      setStatus('success');
    } catch {
      setError('Terjadi kesalahan jaringan.');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-brand-neon">Aspirasi Terkirim</h1>
        <p className="text-gray-300">Terima kasih, aspirasimu sudah kami terima dan akan segera ditindaklanjuti.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Aspirasi</h1>
      <p className="text-gray-400 mb-8">Sampaikan keluh kesahmu. Bisa dikirim secara anonim.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>}

        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={form.isAnonymous}
            onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
          />
          Kirim sebagai anonim
        </label>

        {!form.isAnonymous && (
          <>
            <input placeholder="Nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input placeholder="NIM" value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input placeholder="Contact Person (nomor HP)" value={form.cp} onChange={(e) => setForm({ ...form, cp: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          </>
        )}

        <input required placeholder="Pihak yang dituju" value={form.pihakDituju} onChange={(e) => setForm({ ...form, pihakDituju: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <textarea required placeholder="Deskripsi aspirasi/keluhan" rows={5} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <textarea placeholder="Harapan" rows={3} value={form.harapan} onChange={(e) => setForm({ ...form, harapan: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Bukti (opsional, JPG/PNG maks 500KB)</label>
          <input type="file" accept="image/jpeg,image/png" onChange={(e) => setBukti(e.target.files?.[0] || null)} className="text-sm" />
        </div>

        <button disabled={status === 'loading'} type="submit" className="px-6 py-2.5 rounded-full bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
          {status === 'loading' ? 'Mengirim...' : 'Kirim Aspirasi'}
        </button>
      </form>
    </section>
  );
}
