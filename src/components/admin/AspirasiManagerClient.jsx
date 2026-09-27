'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { STATUS_LABEL } from '../../lib/aspirasi';
export default function AspirasiManagerClient({ initialItems }) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  async function updateStatus(id, status) {
    setBusy(id); setMessage('');
    try {
      const res = await fetch('/api/aspirasi/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah status.');
      setMessage('Status berhasil diperbarui.'); router.refresh();
    } catch (error) { setMessage(error.message || 'Terjadi kesalahan jaringan.'); }
    finally { setBusy(''); }
  }
  return <div className="space-y-4">
    {message && <p role="status" className="text-brand-neon">{message}</p>}
    {!initialItems.length && <p className="text-gray-400">Tidak ada aspirasi yang cocok dengan filter.</p>}
    {initialItems.map((item) => <article key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-5 break-words">
      <div className="flex justify-between gap-3 flex-wrap">
        <div><h2 className="font-semibold text-brand-neon">{item.ticketCode}</h2><p>{item.isAnonymous ? 'Anonim' : item.nama || '-'} → {item.pihakDituju}</p></div>
        <p>{STATUS_LABEL[item.status]}</p>
      </div>
      <p className="text-sm text-gray-400">{item.jenisPengajuan} · {new Date(item.createdAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
      {!item.isAnonymous && <p className="text-sm text-gray-400">NIM: {item.nim || '-'} · CP: {item.cp || '-'} · Email: {item.email || '-'}</p>}
      <p className="mt-3 font-semibold whitespace-pre-wrap">{item.keluhKesah || 'Ringkasan belum tersedia (data lama)'}</p>
      <p className="mt-2 whitespace-pre-wrap">{item.deskripsi}</p>
      {item.harapan && <p className="mt-2 text-gray-300 whitespace-pre-wrap">Harapan: {item.harapan}</p>}
      {item.buktiUrl && <a href={'/api/aspirasi/' + item.id + '/bukti'} target="_blank" rel="noreferrer" className="inline-block mt-3 text-brand-neon underline">Lihat bukti</a>}
      <div className="mt-4 flex flex-wrap gap-2">{Object.entries(STATUS_LABEL).map(([value, label]) => <button key={value} onClick={() => updateStatus(item.id, value)} disabled={busy !== '' || item.status === value} className="px-3 py-2 rounded-lg bg-white/10 disabled:opacity-40" aria-label={'Ubah ' + item.ticketCode + ' menjadi ' + label}>{label}</button>)}</div>
    </article>)}
  </div>;
}
