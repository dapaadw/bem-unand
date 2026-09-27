'use client';

import { useState } from 'react';
import { JENIS_PENGAJUAN } from '../../lib/aspirasi';

export default function AspirasiPage() {
  const [form, setForm] = useState({
    nama: '', nim: '', cp: '', email: '', pihakDituju: '', jenisPengajuan: '', keluhKesah: '', deskripsi: '', harapan: '', isAnonymous: false,
  });
  const [bukti, setBukti] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [ticketCode, setTicketCode] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (!form.isAnonymous || !['nama', 'nim', 'cp', 'email'].includes(k)) fd.append(k, v);
      });
      if (bukti) fd.append('bukti', bukti);

      const res = await fetch('/api/aspirasi', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Gagal mengirim aspirasi.');
        setStatus('idle');
        return;
      }

      setTicketCode(data.ticketCode);
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

        <div className="mt-8 inline-block bg-white/5 border border-brand-neon/30 rounded-xl px-8 py-6">
          <p className="text-sm text-gray-400 mb-1">Kode Tiket Kamu</p>
          <p className="text-xl sm:text-2xl break-all font-bold tracking-wide text-brand-neon">{ticketCode}</p>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Simpan kode ini untuk cek status aspirasimu di{' '}
          <a href="/aspirasi/cek" className="text-brand-neon underline">halaman cek status</a>.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Aspirasi</h1>
      <p className="text-gray-400 mb-8">Sampaikan keluh kesahmu. Bisa dikirim secara anonim.</p>
      <a href="/aspirasi/cek" className="inline-block mb-6 text-brand-neon underline">Sudah punya tiket? Cek status aspirasi</a>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>}

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
            {[[ 'nama', 'Nama', 150 ], ['nim', 'NIM', 50], ['cp', 'Contact Person (opsional)', 50], ['email', 'Email (opsional)', 254]].map(([key, label, max]) => (
              <label key={key} className="block text-sm text-gray-300">{label}
                <input required={['nama', 'nim'].includes(key)} type={key === 'email' ? 'email' : 'text'} maxLength={max} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
              </label>
            ))}
          </>
        )}

        {form.isAnonymous && <p className="text-sm text-gray-400">Nama, NIM, nomor kontak, dan email tidak disimpan. Hindari menuliskan identitas dalam isi atau bukti jika ingin tetap anonim.</p>}
        <label className="block text-sm text-gray-300">Jenis pengajuan
          <select required value={form.jenisPengajuan} onChange={(e) => setForm({ ...form, jenisPengajuan: e.target.value })} className="mt-1 w-full rounded-lg bg-brand-dark border border-white/10 px-4 py-2">
            <option value="">Pilih jenis pengajuan</option>
            {JENIS_PENGAJUAN.map((v) => <option key={v} value={v}>{v.charAt(0) + v.slice(1).toLowerCase()}</option>)}
          </select>
        </label>
        {[[ 'pihakDituju', 'Pihak yang dituju', 200, 1 ], ['keluhKesah', 'Keluh kesah (ringkasan)', 500, 2], ['deskripsi', 'Deskripsi lengkap', 10000, 5], ['harapan', 'Harapan (opsional)', 5000, 3]].map(([key, label, max, rows]) => (
          <label key={key} className="block text-sm text-gray-300">{label}
            <textarea required={key !== 'harapan'} rows={rows} maxLength={max} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          </label>
        ))}

        <div>
          <label htmlFor="bukti" className="block text-sm text-gray-400 mb-1">Bukti (opsional, JPG/PNG maks 500KB)</label>
          <input id="bukti" type="file" accept="image/jpeg,image/png" onChange={(e) => setBukti(e.target.files?.[0] || null)} className="text-sm w-full" />
        </div>

        <button disabled={status === 'loading'} type="submit" className="px-6 py-2.5 rounded-full bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
          {status === 'loading' ? 'Mengirim...' : 'Kirim Aspirasi'}
        </button>
      </form>
    </section>
  );
}
