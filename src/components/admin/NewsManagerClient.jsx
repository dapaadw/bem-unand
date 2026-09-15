'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyForm = { title: '', publishedAt: '', author: '', category: '', body: '', attachmentUrl: '' };

export default function NewsManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(true);
    setError('');
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      publishedAt: item.publishedAt.slice(0, 10),
      author: item.author,
      category: item.category,
      body: item.body,
      attachmentUrl: item.attachmentUrl || '',
    });
    setEditingId(item.id);
    setFormOpen(true);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editingId ? `/api/publikasi/${editingId}` : '/api/publikasi';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan.');
        return;
      }

      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? { ...data } : i)));
      } else {
        setItems((prev) => [data, ...prev]);
      }
      setFormOpen(false);
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus publikasi ini?')) return;
    const res = await fetch(`/api/publikasi/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  }

  return (
    <div>
      <button
        onClick={openCreate}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold"
      >
        <Plus size={18} /> Tambah Publikasi
      </button>

      {formOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-brand-neon">{editingId ? 'Edit Publikasi' : 'Publikasi Baru'}</h2>
            <button type="button" onClick={() => setFormOpen(false)}><X size={20} /></button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input required type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input required placeholder="Penulis" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input required placeholder="Kategori (rilis/kajian/berita/pengumuman/opini)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input placeholder="URL lampiran/sumber (opsional)" value={form.attachmentUrl} onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 md:col-span-2" />
          </div>
          <textarea required placeholder="Isi berita" rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          <button disabled={saving} type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-400">{item.category} &middot; {item.publishedAt.slice(0, 10)} &middot; {item.author}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-white/10"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-white/10 text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400">Belum ada publikasi.</p>}
      </div>
    </div>
  );
}
