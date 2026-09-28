'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { PUBLICATION_CATEGORIES, publicationCategory } from '../../lib/publication';

const emptyForm = { title: '', publishedAt: '', author: '', category: '', body: '', attachmentUrl: '', imageUrl: '' };

export default function NewsManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState('');
  const sortItems = (list) => [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt) || b.id.localeCompare(a.id));

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(true);
    setError('');
    setMessage('');
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      publishedAt: item.publishedAt.slice(0, 10),
      author: item.author,
      category: publicationCategory(item.category),
      body: item.body,
      attachmentUrl: item.attachmentUrl || '',
      imageUrl: item.imageUrl || '',
    });
    setEditingId(item.id);
    setFormOpen(true);
    setError('');
    setMessage('');
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
        setItems((prev) => sortItems(prev.map((i) => (i.id === editingId ? data : i))));
      } else {
        setItems((prev) => sortItems([data, ...prev]));
      }
      setFormOpen(false);
      setMessage('Publikasi tersimpan.');
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus publikasi ini?')) return;
    setDeletingId(id);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/publikasi/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Gagal menghapus publikasi.');
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) setFormOpen(false);
      setMessage('Publikasi dihapus.');
    } catch { setError('Terjadi kesalahan jaringan.'); }
    finally { setDeletingId(null); }
  }

  return (
    <div>
      {message && <p role="status" className="mb-4 text-sm text-brand-neon">{message}</p>}
      {error && <p role="alert" className="mb-4 text-sm text-red-400">{error}</p>}
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
            <button aria-label="Tutup form publikasi" type="button" onClick={() => setFormOpen(false)}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm text-gray-300">Judul
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="block mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
            <label className="text-sm text-gray-300">Tanggal publikasi
              <input required type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="block mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
            <label className="text-sm text-gray-300">Penulis
              <input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="block mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
            <label className="text-sm text-gray-300">Kategori
              <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="block mt-1 w-full rounded-lg bg-brand-dark border border-white/10 px-4 py-2">
                <option value="">Pilih kategori</option>
                {PUBLICATION_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
                {form.category && !PUBLICATION_CATEGORIES.includes(form.category) && <option value={form.category}>{form.category} (kategori lama)</option>}
              </select>
            </label>
            <label className="text-sm text-gray-300 md:col-span-2">URL lampiran/sumber (opsional)
              <input placeholder="https://... atau /uploads/sumber.pdf" value={form.attachmentUrl} onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })} className="block mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
            <label className="text-sm text-gray-300 md:col-span-2">URL Gambar / Thumbnail (opsional)
              <input placeholder="https://... atau /uploads/berita.jpg" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="block mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
          </div>
          <label className="block text-sm text-gray-300">Isi publikasi
            <textarea required rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="block mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          </label>
          <button disabled={saving} type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
            <div className="min-w-0 break-words">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-400">{publicationCategory(item.category)} &middot; {item.publishedAt.slice(0, 10)} &middot; {item.author}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button aria-label={`Edit ${item.title}`} disabled={saving || deletingId !== null} onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-white/10"><Pencil size={16} /></button>
              <button aria-label={`Hapus ${item.title}`} disabled={saving || deletingId !== null} onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-white/10 text-red-400 disabled:opacity-50"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400">Belum ada publikasi.</p>}
      </div>
    </div>
  );
}
