'use client';

import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  Calendar,
  Clock,
  MapPin,
  Building,
  Trophy,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

const emptyForm = {
  type: 'INTERNAL',
  name: '',
  date: '',
  time: '',
  publishedAt: '',
  location: '',
  organizer: '',
  description: '',
  publicationUrl: '',
  registrationUrl: '',
  imageUrl: '',
};

function localDateTime(value) {
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default function KegiatanManagerClient({ initialItems }) {
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
      (a, b) => new Date(b.date) - new Date(a.date) || b.id.localeCompare(a.id)
    );

  function openCreate() {
    setMessage('');
    setForm({ ...emptyForm, publishedAt: localDateTime(new Date()) });
    setEditingId(null);
    setFormOpen(true);
    setError('');
  }

  function openEdit(item) {
    setMessage('');
    setForm({
      type: item.type,
      name: item.name,
      date: item.date.slice(0, 10),
      time: item.time || '',
      publishedAt: localDateTime(item.publishedAt),
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
        body: JSON.stringify({ ...form, publishedAt: new Date(form.publishedAt).toISOString() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan agenda kegiatan.');
        return;
      }
      if (editingId) {
        setItems((prev) => sortItems(prev.map((i) => (i.id === editingId ? data : i))));
      } else {
        setItems((prev) => sortItems([data, ...prev]));
      }
      setFormOpen(false);
      setMessage(editingId ? 'Agenda kegiatan diperbarui.' : 'Agenda kegiatan baru berhasil disimpan.');
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Hapus agenda kegiatan "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setDeletingId(id);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/kegiatan/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Gagal menghapus kegiatan.');
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) setFormOpen(false);
      setMessage('Agenda kegiatan berhasil dihapus.');
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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-neon to-rose-200 text-brand-dark font-bold text-sm shadow-md hover:shadow-brand-neon/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Agenda / Lomba Baru</span>
        </button>

        {items.length > 0 && (
          <p className="text-xs text-gray-400 self-center">
            Menampilkan <span className="text-brand-neon font-semibold">{items.length}</span> agenda kegiatan
          </p>
        )}
      </div>

      {message && (
        <div
          role="status"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm animate-in fade-in"
        >
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm animate-in fade-in"
        >
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Drawer / Container */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
                <CalendarDays size={18} />
              </div>
              <h2 className="font-bold text-base text-white">
                {editingId ? 'Edit Agenda / Lomba' : 'Tambah Agenda / Lomba Baru'}
              </h2>
            </div>
            <button
              aria-label="Tutup form kegiatan"
              type="button"
              onClick={() => setFormOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Jenis Kegiatan
              <select
                aria-label="Jenis kegiatan"
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                    registrationUrl: e.target.value === 'INTERNAL' ? '' : form.registrationUrl,
                  })
                }
                className="mt-1.5 block w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              >
                <option value="INTERNAL">Kegiatan Internal BEM</option>
                <option value="LOMBA">Lomba / Kompetisi Eksternal</option>
              </select>
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Nama Kegiatan / Kompetisi
              <input
                aria-label="Nama kegiatan"
                required
                placeholder="Contoh: Law Fair Nasional 2026"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Tanggal Pelaksanaan
              <input
                aria-label="Tanggal kegiatan"
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Waktu Kegiatan (WIB, Opsional)
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Lokasi / Tempat Pelaksanaan
              <input
                aria-label="Lokasi"
                required
                placeholder="Contoh: Gedung Serbaguna FH UNAND / Zoom"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Penyelenggara
              <input
                aria-label="Penyelenggara"
                required
                placeholder="Contoh: BEM FH UNAND / Universitas Indonesia"
                value={form.organizer}
                onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Tanggal &amp; Waktu Terbit
              <input
                aria-label="Tanggal publikasi"
                required
                type="datetime-local"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              URL Publikasi (Opsional)
              <input
                aria-label="URL publikasi"
                placeholder="https://... atau /uploads/publikasi.pdf"
                value={form.publicationUrl}
                onChange={(e) => setForm({ ...form, publicationUrl: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 md:col-span-2">
              URL Poster / Banner Kegiatan (Opsional)
              <input
                aria-label="URL poster kegiatan"
                placeholder="https://... atau /uploads/poster.jpg"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            {form.type === 'LOMBA' && (
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 md:col-span-2">
                URL Pendaftaran / Registrasi Lomba (Google Form / Link)
                <input
                  aria-label="URL pendaftaran Google Form"
                  placeholder="https://forms.gle/... atau link pendaftaran resmi"
                  value={form.registrationUrl}
                  onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
                  className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                />
              </label>
            )}
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
            Deskripsi Lengkap Kegiatan
            <textarea
              aria-label="Deskripsi"
              required
              placeholder="Jelaskan detail susunan acara, tema, syarat keikutsertaan, narahubung, dll..."
              rows={6}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all leading-relaxed"
            />
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              disabled={saving}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-neon to-rose-200 text-brand-dark font-bold text-sm shadow hover:shadow-brand-neon/20 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              <span>{saving ? 'Menyimpan...' : editingId ? 'Perbarui Agenda' : 'Simpan Agenda'}</span>
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* List of Activities */}
      <div className="space-y-3">
        {items.map((item) => {
          const isLomba = item.type === 'LOMBA';
          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group"
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      isLomba
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                        : 'bg-brand-neon/10 text-brand-neon border-brand-neon/20'
                    }`}
                  >
                    {isLomba ? 'Kompetisi / Lomba' : 'Kegiatan Internal'}
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} className="text-gray-500" />
                    {item.date.slice(0, 10)}
                    {item.time ? ` (${item.time} WIB)` : ''}
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={12} className="text-gray-500" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-brand-neon transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                  <Building size={12} />
                  <span>Penyelenggara: {item.organizer}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5 w-full sm:w-auto justify-end">
                {item.registrationUrl && (
                  <a
                    href={item.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-colors"
                    title="Buka form pendaftaran"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <button
                  aria-label={`Edit ${item.name}`}
                  disabled={saving || deletingId !== null}
                  onClick={() => openEdit(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10 transition-colors"
                >
                  <Pencil size={13} className="text-brand-neon" />
                  <span>Edit</span>
                </button>
                <button
                  aria-label={`Hapus ${item.name}`}
                  disabled={saving || deletingId !== null}
                  onClick={() => handleDelete(item.id, item.name)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/20 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-16 rounded-2xl bg-white/[0.02] border border-white/10 p-6">
            <CalendarDays size={40} className="mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400 text-sm">Belum ada agenda kegiatan atau lomba.</p>
          </div>
        )}
      </div>
    </div>
  );
}
