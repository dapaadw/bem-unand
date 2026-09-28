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
} from 'lucide-react';

export default function FhGuideManagerClient({ initialLinks, initialFaqs }) {
  const [links, setLinks] = useState(initialLinks);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [linkForm, setLinkForm] = useState({ category: '', title: '', url: '' });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function showToast(msg, error = false) {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(''), 4000);
  }

  async function addLink(e) {
    e.preventDefault();
    const res = await fetch('/api/fh-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'link', ...linkForm }),
    });
    const data = await res.json();
    if (!res.ok) return showToast(data.error || 'Gagal menambah link.', true);
    setLinks((prev) => [...prev, data]);
    setLinkForm({ category: '', title: '', url: '' });
    showToast('Link berhasil ditambahkan.');
  }

  async function removeLink(id) {
    const res = await fetch(`/api/fh-guide/link/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      showToast('Link berhasil dihapus.');
    } else {
      showToast('Gagal menghapus link.', true);
    }
  }

  async function addFaq(e) {
    e.preventDefault();
    const res = await fetch('/api/fh-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'faq', ...faqForm }),
    });
    const data = await res.json();
    if (!res.ok) return showToast(data.error || 'Gagal menambah FAQ.', true);
    setFaqs((prev) => [...prev, data]);
    setFaqForm({ question: '', answer: '' });
    showToast('FAQ berhasil ditambahkan.');
  }

  async function removeFaq(id) {
    const res = await fetch(`/api/fh-guide/faq/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      showToast('FAQ berhasil dihapus.');
    } else {
      showToast('Gagal menghapus FAQ.', true);
    }
  }

  // Group links by category
  const groupedLinks = links.reduce((acc, link) => {
    const cat = link.category || 'Lainnya';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(link);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Toast / Notification Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold ${
            isError
              ? 'bg-red-500/10 border border-red-500/20 text-red-300'
              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
          }`}
        >
          {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{message}</span>
        </div>
      )}

      {/* Section 1: Direktori Link */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
              <Link2 size={18} />
              <span>Direktori Link ({links.length})</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Kumpulan tautan penting untuk mahasiswa berdasarkan kategori.
            </p>
          </div>
        </div>

        {/* Add Link Form */}
        <form onSubmit={addLink} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">Kategori</label>
              <input
                required
                placeholder="Contoh: Akademik, Organisasi"
                value={linkForm.category}
                onChange={(e) => setLinkForm({ ...linkForm, category: e.target.value })}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">Judul Link</label>
              <input
                required
                placeholder="Nama dokumen atau link"
                value={linkForm.title}
                onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">URL / Link Drive</label>
              <input
                required
                placeholder="https://drive.google.com/..."
                value={linkForm.url}
                onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
            >
              <Plus size={14} />
              <span>Tambah Link</span>
            </button>
          </div>
        </form>

        {/* Links List - Grouped by Category */}
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
                    <div
                      key={l.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-1.5 rounded-lg bg-white/5 text-brand-neon shrink-0">
                          <ExternalLink size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{l.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{l.url}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeLink(l.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100"
                        title="Hapus Link"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section 2: FAQ */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
              <HelpCircle size={18} />
              <span>FAQ – Pertanyaan Umum ({faqs.length})</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Daftar pertanyaan dan jawaban yang sering ditanyakan mahasiswa.
            </p>
          </div>
        </div>

        {/* Add FAQ Form */}
        <form onSubmit={addFaq} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300">Pertanyaan</label>
            <input
              required
              placeholder="Tulis pertanyaan yang sering diajukan..."
              value={faqForm.question}
              onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300">Jawaban</label>
            <textarea
              required
              placeholder="Tulis jawaban lengkap untuk pertanyaan ini..."
              rows={3}
              value={faqForm.answer}
              onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all leading-relaxed"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
            >
              <Plus size={14} />
              <span>Tambah FAQ</span>
            </button>
          </div>
        </form>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqs.length === 0 ? (
            <div className="py-8 text-center rounded-xl bg-white/[0.02] border border-dashed border-white/10">
              <HelpCircle size={28} className="mx-auto text-zinc-500 mb-2" />
              <p className="text-zinc-400 text-xs">Belum ada FAQ yang ditambahkan.</p>
            </div>
          ) : (
            faqs.map((f) => (
              <div
                key={f.id}
                className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all group space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/5 text-brand-neon shrink-0 mt-0.5">
                      <HelpCircle size={14} />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-semibold text-white">{f.question}</p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{f.answer}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFaq(f.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100 shrink-0"
                    title="Hapus FAQ"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
