'use client';
import { useState } from 'react';
import {
  Plus,
  Trash2,
  Link2,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Save,
  FolderOpen,
  Pencil,
  X,
} from 'lucide-react';

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
  const Icon = kind === 'link' ? Link2 : HelpCircle;

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

  // Group links by category
  const groupedLinks = kind === 'link' ? items.reduce((acc, link) => {
    const cat = link.category || 'Lainnya';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(link);
    return acc;
  }, {}) : null;

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div>
          <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
            <Icon size={18} />
            <span>{kind === 'link' ? `Direktori Link (${items.length})` : `FAQ – Pertanyaan Umum (${items.length})`}</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {kind === 'link'
              ? 'Kumpulan tautan penting untuk mahasiswa berdasarkan kategori.'
              : 'Daftar pertanyaan dan jawaban yang sering ditanyakan mahasiswa.'}
          </p>
        </div>
      </div>

      {/* Toast messages */}
      {error && (
        <div className="p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-300">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div className="p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={submit} className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{editing ? 'Edit ' : 'Tambah '}{title}</p>
        <div className={kind === 'link' ? 'grid grid-cols-1 md:grid-cols-3 gap-3' : 'space-y-3'}>
          {Object.keys(empty[kind]).map((key) => (
            <div key={key} className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">{labels[key]}</label>
              {key === 'answer' ? (
                <textarea required maxLength={10000} rows={4} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all leading-relaxed" />
              ) : (
                <input required type={key === 'url' ? 'url' : 'text'} maxLength={key === 'url' ? 2000 : key === 'category' ? 100 : key === 'question' ? 500 : 250} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={key === 'category' ? 'Contoh: Akademik, Organisasi' : key === 'url' ? 'https://drive.google.com/...' : ''}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all" />
              )}
            </div>
          ))}
        </div>
        {kind === 'link' && <p className="text-[10px] text-zinc-400">Gunakan link dokumen atau folder Google Drive/Docs. Pastikan izin berbagi memungkinkan mahasiswa membukanya.</p>}
        <div className="flex justify-end gap-3">
          {editing && (
            <button disabled={busy} type="button" onClick={() => { setEditing(''); setForm(empty[kind]); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
              Batal edit
            </button>
          )}
          <button disabled={busy} type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]">
            {busy ? <Save size={14} /> : <Plus size={14} />}
            <span>{busy ? 'Menyimpan...' : editing ? 'Simpan ' + title : 'Tambah ' + title}</span>
          </button>
        </div>
      </form>

      {/* Items List */}
      {kind === 'link' ? (
        <div className="space-y-4">
          {Object.keys(groupedLinks).length === 0 ? (
            <div className="py-8 text-center rounded-xl bg-white/[0.02] border border-dashed border-white/10">
              <Link2 size={28} className="mx-auto text-zinc-500 mb-2" />
              <p className="text-zinc-400 text-xs">Belum ada link yang ditambahkan.</p>
            </div>
          ) : (
            Object.entries(groupedLinks).map(([category, categoryLinks]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <FolderOpen size={13} className="text-zinc-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    {category} ({categoryLinks.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {categoryLinks.map((l) => (
                    <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all group">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-1.5 rounded-lg bg-white/5 text-brand-neon shrink-0">
                          <ExternalLink size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{l.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate break-all">{l.url}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button disabled={busy} onClick={() => { setEditing(l.id); setForm({ category: l.category, title: l.title, url: l.url }); setMessage(''); setError(''); }}
                          className="p-2 text-brand-neon hover:bg-brand-neon/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100" aria-label={'Edit ' + l.title}>
                          <Pencil size={14} />
                        </button>
                        <button disabled={busy} onClick={() => remove(l)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100" title="Hapus Link">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {items.length === 0 ? (
            <div className="py-8 text-center rounded-xl bg-white/[0.02] border border-dashed border-white/10">
              <HelpCircle size={28} className="mx-auto text-zinc-500 mb-2" />
              <p className="text-zinc-400 text-xs">Belum ada FAQ yang ditambahkan.</p>
            </div>
          ) : (
            items.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all group space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/5 text-brand-neon shrink-0 mt-0.5">
                      <HelpCircle size={14} />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-semibold text-white">{f.question}</p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed whitespace-pre-wrap">{f.answer}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button disabled={busy} onClick={() => { setEditing(f.id); setForm({ question: f.question, answer: f.answer }); setMessage(''); setError(''); }}
                      className="p-2 text-brand-neon hover:bg-brand-neon/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100" aria-label={'Edit ' + f.question}>
                      <Pencil size={14} />
                    </button>
                    <button disabled={busy} onClick={() => remove(f)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100 shrink-0" title="Hapus FAQ">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function FhGuideManagerClient({ initialLinks, initialFaqs }) {
  return <div className="space-y-6"><Editor kind="link" initialItems={initialLinks} /><Editor kind="faq" initialItems={initialFaqs} /></div>;
}
