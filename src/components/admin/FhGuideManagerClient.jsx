'use client';
import { useState } from 'react';
const empty = { link: { category: '', title: '', url: '' }, faq: { question: '', answer: '' } };
const labels = { category: 'Kategori', title: 'Judul dokumen', url: 'URL Google Drive', question: 'Pertanyaan', answer: 'Jawaban' };
function Editor({ kind, initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState(empty[kind]);
  const [editing, setEditing] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const title = kind === 'link' ? 'Link' : 'FAQ';
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const res = await fetch(editing ? '/api/fh-guide/' + kind + '/' + editing : '/api/fh-guide', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, kind }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan.');
      setItems((old) => editing ? old.map((i) => i.id === editing ? data : i) : [...old, data]);
      setForm(empty[kind]); setEditing(''); setMessage(title + ' berhasil disimpan.');
    } catch (e) { setError(e.message || 'Terjadi kesalahan jaringan.'); }
    finally { setBusy(false); }
  }
  async function remove(item) {
    if (!window.confirm('Hapus ' + (item.title || item.question) + '?')) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const res = await fetch('/api/fh-guide/' + kind + '/' + item.id, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus.');
      setItems((old) => old.filter((i) => i.id !== item.id));
      if (editing === item.id) { setEditing(''); setForm(empty[kind]); }
      setMessage(title + ' berhasil dihapus.');
    } catch (e) { setError(e.message || 'Terjadi kesalahan jaringan.'); }
    finally { setBusy(false); }
  }
  return <section className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">
    <h2 className="font-bold text-brand-neon">{kind === 'link' ? 'Direktori Link' : 'FAQ'}</h2>
    {error && <p role="alert" className="text-red-400">{error}</p>}
    {message && <p role="status" className="text-brand-neon">{message}</p>}
    <form onSubmit={submit} className="space-y-3">
      <p className="text-sm text-gray-400">{editing ? 'Edit ' : 'Tambah '}{title}</p>
      {Object.keys(empty[kind]).map((key) => <label key={key} className="block text-sm">{labels[key]}
        {key === 'answer' ? <textarea required maxLength={10000} rows={4} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full bg-white/5 border border-white/20 rounded-lg p-2" /> : <input required type={key === 'url' ? 'url' : 'text'} maxLength={key === 'url' ? 2000 : key === 'category' ? 100 : key === 'question' ? 500 : 250} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full bg-white/5 border border-white/20 rounded-lg p-2" />}
      </label>)}
      {kind === 'link' && <p className="text-xs text-gray-400">Gunakan link dokumen atau folder Google Drive/Docs. Pastikan izin berbagi memungkinkan mahasiswa membukanya.</p>}
      <div className="flex gap-3"><button disabled={busy} className="bg-brand-neon text-brand-dark rounded-lg px-4 py-2 disabled:opacity-50">{busy ? 'Menyimpan...' : editing ? 'Simpan ' + title : 'Tambah ' + title}</button>{editing && <button disabled={busy} type="button" onClick={() => { setEditing(''); setForm(empty[kind]); }} className="underline">Batal edit</button>}</div>
    </form>
    {!items.length && <p className="text-gray-400">Belum ada {title.toLowerCase()}.</p>}
    <div className="space-y-3">{items.map((item) => <article key={item.id} className="bg-white/5 rounded-lg p-3 break-words">
      <p className="font-semibold">{item.title || item.question}</p>
      <p className="text-sm text-gray-400 whitespace-pre-wrap">{item.category || item.answer}</p>
      {item.url && <p className="text-xs text-gray-400 break-all">{item.url}</p>}
      <div className="mt-3 flex gap-4"><button disabled={busy} onClick={() => { setEditing(item.id); setForm(Object.fromEntries(Object.keys(empty[kind]).map((key) => [key, item[key]]))); setMessage(''); setError(''); }} className="text-brand-neon" aria-label={'Edit ' + (item.title || item.question)}>Edit</button><button disabled={busy} onClick={() => remove(item)} className="text-red-400" aria-label={'Hapus ' + (item.title || item.question)}>Hapus</button></div>
    </article>)}</div>
  </section>;
}
export default function FhGuideManagerClient({ initialLinks, initialFaqs }) {
  return <div className="space-y-8 max-w-2xl"><Editor kind="link" initialItems={initialLinks} /><Editor kind="faq" initialItems={initialFaqs} /></div>;
}
