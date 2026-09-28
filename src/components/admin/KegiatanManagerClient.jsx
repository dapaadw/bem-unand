'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Trophy,
  Calendar,
  MapPin,
  Building,
  ExternalLink,
  CalendarDays,
} from 'lucide-react';

const emptyForm = {
  type: 'INTERNAL',
  name: '',
  date: '',
  location: '',
  organizer: '',
  description: '',
  publicationUrl: '',
  registrationUrl: '',
};

export default function KegiatanManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setForm({
      type: 'INTERNAL',
      name: '',
      date: new Date().toISOString().slice(0, 10),
      location: 'Fakultas Hukum Universitas Andalas',
      organizer: 'BEM FH UNAND',
      description: '',
      publicationUrl: '',
      registrationUrl: '',
    });
    setEditingId(null);
    setFormOpen(true);
    setError('');
  }

  function openEdit(item) {
    setForm({
      type: item.type,
      name: item.name,
      date: item.date ? item.date.slice(0, 10) : '',
      location: item.location,
      organizer: item.organizer,
      description: item.description,
      publicationUrl: item.publicationUrl || '',
      registrationUrl: item.registrationUrl || '',
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
      const url = editingId ? `/api/kegiatan/${editingId}` : '/api/kegiatan';
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
        setItems((prev) => prev.map((i) => (i.id === editingId ? data : i)));
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

  async function handleDelete(id, name) {
    if (!confirm(`Hapus kegiatan "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    const res = await fetch(`/api/kegiatan/${id}`, { method: 'DELETE' });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const counts = useMemo(() => {
    return {
      ALL: items.length,
      LOMBA: items.filter((i) => i.type === 'LOMBA').length,
      INTERNAL: items.filter((i) => i.type === 'INTERNAL').length,
    };
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.organizer.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [items, search, typeFilter]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Trophy size={22} className="text-brand-neon" />
            <span>Manajemen Kegiatan & Kompetisi</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Kelola agenda kerja internal, seminar, dan informasi perlombaan mahasiswa.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)] self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Kegiatan Baru</span>
        </button>
      </div>

      {/* Control Bar: Search & Type Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari kegiatan, lokasi, atau penyelenggara..."
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

        {/* Type Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: 'ALL', label: 'Semua', count: counts.ALL },
            { key: 'LOMBA', label: 'Lomba & Kompetisi', count: counts.LOMBA },
            { key: 'INTERNAL', label: 'Internal BEM', count: counts.INTERNAL },
          ].map((tab) => {
            const active = typeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setTypeFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-brand-neon text-brand-dark shadow-[0_0_10px_rgba(254,174,174,0.3)]'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-brand-dark/30 text-brand-dark' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
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
              <CalendarDays size={18} />
              <span>{editingId ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</span>
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
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
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Tipe Kegiatan *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all"
                >
                  <option value="INTERNAL">Kegiatan Internal BEM</option>
                  <option value="LOMBA">Lomba / Kompetisi Mahasiswa</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Nama Kegiatan / Agenda *</label>
                <input
                  required
                  placeholder="Contoh: Law Fair BEM FH UNAND 2026"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Tanggal Pelaksanaan *</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Lokasi / Tempat *</label>
                <input
                  required
                  placeholder="Contoh: Gedung Serbaguna FH UNAND / Zoom Cloud"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Penyelenggara *</label>
                <input
                  required
                  placeholder="Contoh: Kementerian PSDM & Olahraga"
                  value={form.organizer}
                  onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">URL Publikasi / Leaflet (Opsional)</label>
                <input
                  placeholder="https://..."
                  value={form.publicationUrl}
                  onChange={(e) => setForm({ ...form, publicationUrl: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              {form.type === 'LOMBA' && (
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-brand-neon">URL Pendaftaran / Panduan Lomba (Google Form / Link)</label>
                  <input
                    placeholder="https://forms.gle/..."
                    value={form.registrationUrl}
                    onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
                    className="w-full rounded-xl bg-brand-neon/[0.05] border border-brand-neon/30 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon transition-all"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-300">Deskripsi Lengkap Kegiatan *</label>
              <textarea
                required
                placeholder="Jelaskan mengenai tujuan, target audiens, dan detail acara..."
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Terbitkan Kegiatan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kegiatan Count & Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <p>
            Menampilkan <span className="font-semibold text-white">{filtered.length}</span> dari{' '}
            <span className="font-semibold text-white">{items.length}</span> kegiatan
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 space-y-3">
            <div className="inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400">
              <CalendarDays size={28} />
            </div>
            <h3 className="text-sm font-bold text-white">Tidak ada kegiatan yang cocok</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {search
                ? `Tidak ditemukan kegiatan dengan kata kunci "${search}".`
                : 'Belum ada kegiatan yang didaftarkan.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((item) => {
              const isLomba = item.type === 'LOMBA';

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 hover:border-brand-neon/30 p-4 md:p-5 transition-all duration-200 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${
                          isLomba
                            ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            : 'bg-brand-red/20 text-brand-neon border-brand-neon/30'
                        }`}
                      >
                        {isLomba ? <Trophy size={11} /> : <Calendar size={11} />}
                        <span>{isLomba ? 'Lomba & Kompetisi' : 'Internal BEM'}</span>
                      </span>

                      <span className="text-zinc-500">·</span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Calendar size={12} />
                        {item.date ? item.date.slice(0, 10) : '-'}
                      </span>

                      <span className="text-zinc-500">·</span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <MapPin size={12} />
                        {item.location}
                      </span>

                      <span className="text-zinc-500">·</span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Building size={12} />
                        {item.organizer}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm md:text-base text-white group-hover:text-brand-neon transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                    {item.slug && (
                      <Link
                        href={`/kegiatan/${item.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <ExternalLink size={15} />
                      </Link>
                    )}

                    <button
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-brand-neon transition-colors border border-white/5"
                      title="Edit Kegiatan"
                    >
                      <Pencil size={14} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20"
                      title="Hapus Kegiatan"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
