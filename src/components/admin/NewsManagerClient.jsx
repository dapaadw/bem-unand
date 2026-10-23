'use client';

import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  FileText,
  Calendar,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PUBLICATION_CATEGORIES, publicationCategory } from '../../lib/publication';

const emptyForm = { title: '', publishedAt: '', author: 'BEM FH UNAND', category: '', body: '', attachmentUrl: '', imageUrl: '' };

export default function NewsManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState('');
  const sortItems = (list) =>
    [...list].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt) || b.id.localeCompare(a.id)
    );

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
      author: item.author || 'BEM FH UNAND',
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
      setMessage(editingId ? 'Publikasi berhasil diperbarui.' : 'Publikasi baru berhasil diterbitkan.');
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Hapus publikasi "${title}"? Tindakan ini tidak dapat dibatalkan.`)) return;
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
      setMessage('Publikasi berhasil dihapus.');
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] font-bold text-sm shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Publikasi Baru</span>
        </button>

        {items.length > 0 && (
          <p className="text-xs text-[#d4c0bd] self-center">
            Menampilkan <span className="text-brand-neon font-semibold">{items.length}</span> artikel terpublikasi
          </p>
        )}
      </div>

      {message && (
        <div
          role="status"
          className="flex items-center gap-2.5 p-3.5 rounded-none bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-sm animate-in fade-in"
        >
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 rounded-none bg-[#3a0d18] border border-[#9e1c38] text-rose-200 text-sm animate-in fade-in"
        >
          <AlertCircle size={18} className="shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Slide-in or Collapsible Create/Edit Form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1517]/95 backdrop-blur-md border border-[#6d2031] rounded-none p-6 md:p-8 space-y-6 shadow-xl animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex justify-between items-center pb-4 border-b border-[#6d2031]/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-none bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
                <FileText size={18} />
              </div>
              <h2 className="font-bold text-base text-[#f8f1e7]">
                {editingId ? 'Edit Publikasi' : 'Tulis Publikasi Baru'}
              </h2>
            </div>
            <button
              aria-label="Tutup form publikasi"
              type="button"
              onClick={() => setFormOpen(false)}
              className="p-1.5 rounded-none text-gray-400 hover:text-white hover:bg-[#23121b] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd] md:col-span-2">
              Judul Artikel / Publikasi
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ketik judul artikel publikasi..."
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              Tanggal Publikasi
              <input
                required
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              Kategori Publikasi
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              >
                <option value="">Pilih kategori publikasi</option>
                {PUBLICATION_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                {form.category && !PUBLICATION_CATEGORIES.includes(form.category) && (
                  <option value={form.category}>{form.category} (kategori lama)</option>
                )}
              </select>
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              URL Lampiran / Sumber Dokumen (Opsional)
              <input
                placeholder="https://... atau /uploads/dokumen.pdf"
                value={form.attachmentUrl}
                onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })}
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              URL Gambar / Thumbnail (Opsional)
              <input
                aria-label="URL gambar publikasi"
                placeholder="https://... atau /uploads/berita.jpg"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
            Isi Naskah / Konten Publikasi
            <textarea
              required
              rows={8}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Tuliskan naskah lengkap artikel berita atau kajian hukum di sini..."
              className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-4 py-3 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all leading-relaxed"
            />
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              disabled={saving}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] font-bold text-sm shadow transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              <span>{saving ? 'Menyimpan...' : editingId ? 'Perbarui Publikasi' : 'Terbitkan Sekarang'}</span>
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2.5 rounded-none bg-[#1f151a] hover:bg-[#2c1d24] text-[#d4c0bd] hover:text-[#f8f1e7] text-sm font-medium border border-[#6d2031] transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* List of Publications */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1a1517]/80 backdrop-blur-sm border border-[#6d2031]/60 rounded-none p-5 hover:border-[#9e1c38] transition-all group"
          >
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider bg-[#3a0d18] text-brand-neon border border-[#6d2031] font-mono-lib">
                  {publicationCategory(item.category)}
                </span>
                <span className="text-[#6d2031] text-xs">•</span>
                <span className="text-xs text-[#d4c0bd] flex items-center gap-1 font-mono-lib">
                  <Calendar size={12} className="text-[#e3bbb9]" />
                  {item.publishedAt.slice(0, 10)}
                </span>

              </div>
              <h3 className="font-bold text-base text-[#f8f1e7] group-hover:text-brand-neon transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-[#d4c0bd] line-clamp-2 leading-relaxed">
                {item.body}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#6d2031]/30 w-full sm:w-auto justify-end">
              {item.attachmentUrl && (
                <a
                  href={item.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-none text-[#d4c0bd] hover:text-white hover:bg-[#23121b] transition-colors border border-transparent hover:border-[#6d2031]"
                  title="Buka lampiran"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              <button
                aria-label={`Edit ${item.title}`}
                disabled={saving || deletingId !== null}
                onClick={() => openEdit(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#1f151a] hover:bg-[#2c1d24] text-[#f8f1e7] text-xs font-medium border border-[#6d2031] transition-colors"
              >
                <Pencil size={13} className="text-brand-neon" />
                <span>Edit</span>
              </button>
              <button
                aria-label={`Hapus ${item.title}`}
                disabled={saving || deletingId !== null}
                onClick={() => handleDelete(item.id, item.title)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#3a0d18] hover:bg-[#521526] text-rose-200 text-xs font-medium border border-[#9e1c38]/60 transition-colors disabled:opacity-50"
              >
                <Trash2 size={13} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-16 rounded-none bg-[#1a1517]/40 border border-[#6d2031]/50 p-6">
            <FileText size={40} className="mx-auto text-gray-500 mb-3" />
            <p className="text-[#d4c0bd] text-sm">Belum ada publikasi atau berita terbit.</p>
          </div>
        )}
      </div>
    </div>
  );
}
