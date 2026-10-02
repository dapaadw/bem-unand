'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  FileText,
  Calendar,
  User,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { PUBLICATION_CATEGORIES, publicationCategory } from '../../lib/publication';

const emptyForm = {
  title: '',
  publishedAt: '',
  author: '',
  category: '',
  body: '',
  attachmentUrl: '',
};

const CATEGORIES = ['Semua', ...PUBLICATION_CATEGORIES];

export default function NewsManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState('');
  const sortItems = (list) => [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt) || b.id.localeCompare(a.id));

  function openCreate() {
    setForm({
      title: '',
      publishedAt: new Date().toISOString().slice(0, 10),
      author: 'BEM FH UNAND',
      category: 'berita',
      body: '',
      attachmentUrl: '',
    });
    setEditingId(null);
    setFormOpen(true);
    setError('');
    setMessage('');
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      publishedAt: item.publishedAt ? item.publishedAt.slice(0, 10) : '',
      author: item.author,
      category: publicationCategory(item.category),
      body: item.body,
      attachmentUrl: item.attachmentUrl || '',
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
      setMessage('Publikasi dihapus.');
    } catch { setError('Terjadi kesalahan jaringan.'); }
    finally { setDeletingId(null); }
  }

  // Filtered publications
  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== 'Semua' && publicationCategory(item.category) !== selectedCategory) {
        return false;
      }
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q)
      );
    });
  }, [items, search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Bar with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText size={22} className="text-brand-neon" />
            <span>Manajemen Publikasi & Berita</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Kelola rilis pers, kajian ilmiah, berita kegiatan, dan opini mahasiswa.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)] self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Publikasi Baru</span>
        </button>
      </div>

      {/* Messages */}
      {message && <p role="status" className="text-xs text-brand-neon font-semibold">{message}</p>}
      {error && !formOpen && <p role="alert" className="text-xs text-red-400 font-semibold">{error}</p>}

      {/* Control Bar: Search & Category Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari judul, penulis, atau kata kunci..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  active
                    ? 'bg-brand-neon text-brand-dark shadow-[0_0_10px_rgba(254,174,174,0.3)]'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Drawer / Box (Create / Edit) */}
      {formOpen && (
        <div className="rounded-2xl bg-black/60 border border-brand-neon/30 p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <h2 className="font-bold text-base text-brand-neon flex items-center gap-2">
              <FileText size={18} />
              <span>{editingId ? 'Edit Publikasi' : 'Tulis Publikasi Baru'}</span>
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup form publikasi"
            >
              <X size={18} />
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Judul Publikasi *</label>
                <input
                  required
                  placeholder="Contoh: Sikap BEM FH UNAND Terhadap Rancangan Undang-Undang..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Tanggal Publikasi *</label>
                <input
                  required
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Penulis / Sumber *</label>
                <input
                  required
                  placeholder="Contoh: Biro Humas / Kementerian Kastrat"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Kategori *</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all"
                >
                  <option value="">Pilih kategori</option>
                  {PUBLICATION_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
                  {form.category && !PUBLICATION_CATEGORIES.includes(form.category) && <option value={form.category}>{form.category} (kategori lama)</option>}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">URL Lampiran / Dokumen Sumber (Opsional)</label>
                <input
                  placeholder="https://... atau /uploads/sumber.pdf"
                  value={form.attachmentUrl}
                  onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">Konten / Isi Lengkap *</label>
              <textarea
                required
                placeholder="Tuliskan isi berita, analisis, atau pernyataan lengkap di sini..."
                rows={8}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Batal
              </button>
              <button
                disabled={saving}
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
              >
                {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Terbitkan Sekarang'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Publications Count & List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <p>
            Menampilkan <span className="font-semibold text-white">{filtered.length}</span> dari{' '}
            <span className="font-semibold text-white">{items.length}</span> publikasi
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 space-y-3">
            <div className="inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400">
              <BookOpen size={28} />
            </div>
            <h3 className="text-sm font-bold text-white">Tidak ada publikasi yang cocok</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {search
                ? `Tidak ditemukan publikasi dengan kata kunci "${search}".`
                : 'Belum ada publikasi yang ditambahkan.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 hover:border-brand-neon/30 p-4 md:p-5 transition-all duration-200 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
                      {publicationCategory(item.category)}
                    </span>
                    <span className="text-zinc-500">·</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Calendar size={12} />
                      {item.publishedAt ? item.publishedAt.slice(0, 10) : '-'}
                    </span>
                    <span className="text-zinc-500">·</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <User size={12} />
                      {item.author}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm md:text-base text-white group-hover:text-brand-neon transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                    {item.body}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  {item.slug && (
                    <Link
                      href={`/publikasi/${item.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                      title="Lihat Halaman Publik"
                    >
                      <ExternalLink size={15} />
                    </Link>
                  )}

                  <button
                    onClick={() => openEdit(item)}
                    disabled={saving || deletingId !== null}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-brand-neon transition-colors border border-white/5"
                    aria-label={`Edit ${item.title}`}
                    title="Edit Artikel"
                  >
                    <Pencil size={14} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={saving || deletingId !== null}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20 disabled:opacity-50"
                    aria-label={`Hapus ${item.title}`}
                    title="Hapus Artikel"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
