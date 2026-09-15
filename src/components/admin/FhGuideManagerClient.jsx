'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function FhGuideManagerClient({ initialLinks, initialFaqs }) {
  const [links, setLinks] = useState(initialLinks);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [linkForm, setLinkForm] = useState({ category: '', title: '', url: '' });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [error, setError] = useState('');

  async function addLink(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/fh-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'link', ...linkForm }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setLinks((prev) => [...prev, data]);
    setLinkForm({ category: '', title: '', url: '' });
  }

  async function removeLink(id) {
    const res = await fetch(`/api/fh-guide/link/${id}`, { method: 'DELETE' });
    if (res.ok) setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function addFaq(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/fh-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'faq', ...faqForm }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setFaqs((prev) => [...prev, data]);
    setFaqForm({ question: '', answer: '' });
  }

  async function removeFaq(id) {
    const res = await fetch(`/api/fh-guide/faq/${id}`, { method: 'DELETE' });
    if (res.ok) setFaqs((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-10 max-w-2xl">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-brand-neon">Direktori Link</h2>
        <form onSubmit={addLink} className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input required placeholder="Kategori" value={linkForm.category} onChange={(e) => setLinkForm({ ...linkForm, category: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" />
          <input required placeholder="Judul" value={linkForm.title} onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" />
          <input required placeholder="URL Drive" value={linkForm.url} onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" />
          <button type="submit" className="md:col-span-3 flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold"><Plus size={16} /> Tambah Link</button>
        </form>
        <div className="space-y-2">
          {links.map((l) => (
            <div key={l.id} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2 text-sm">
              <span>{l.category} &middot; {l.title}</span>
              <button onClick={() => removeLink(l.id)} className="text-red-400"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-brand-neon">FAQ</h2>
        <form onSubmit={addFaq} className="space-y-2">
          <input required placeholder="Pertanyaan" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" />
          <textarea required placeholder="Jawaban" rows={3} value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" />
          <button type="submit" className="flex items-center gap-1 px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold"><Plus size={16} /> Tambah FAQ</button>
        </form>
        <div className="space-y-2">
          {faqs.map((f) => (
            <div key={f.id} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2 text-sm">
              <span>{f.question}</span>
              <button onClick={() => removeFaq(f.id)} className="text-red-400"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
