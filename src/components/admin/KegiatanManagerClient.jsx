'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyForm = { type: 'INTERNAL', name: '', date: '', time: '', publishedAt: '', location: '', organizer: '', description: '', publicationUrl: '', registrationUrl: '', imageUrl: '' };

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
  const sortItems = (list) => [...list].sort((a, b) => new Date(b.date) - new Date(a.date) || b.id.localeCompare(a.id));

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
      imageUrl: item.imageUrl || '',
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
        setError(data.error || 'Gagal menyimpan.');
        return;
      }
      if (editingId) {
        setItems((prev) => sortItems(prev.map((i) => (i.id === editingId ? data : i))));
      } else {
        setItems((prev) => sortItems([data, ...prev]));
      }
      setFormOpen(false);
      setMessage('Kegiatan tersimpan.');
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus kegiatan ini?')) return;
    setDeletingId(id);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/kegiatan/${id}`, { method: 'DELETE' });
      if (!res.ok) { const data = await res.json(); setError(data.error || 'Gagal menghapus kegiatan.'); return; }
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) setFormOpen(false);
      setMessage('Kegiatan dihapus.');
    } catch { setError('Terjadi kesalahan jaringan.'); }
    finally { setDeletingId(null); }
  }

  return (
            <div className="min-w-0 break-words">
      {message && <p role="status" className="mb-4 text-sm text-brand-neon">{message}</p>}
      {error && <p role="alert" className="mb-4 text-sm text-red-400">{error}</p>}
      <button onClick={openCreate} className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">
        <Plus size={18} /> Tambah Kegiatan
      </button>

      {formOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-brand-neon">{editingId ? 'Edit Kegiatan' : 'Kegiatan Baru'}</h2>
            <button aria-label="Tutup form kegiatan" type="button" onClick={() => setFormOpen(false)}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select aria-label="Jenis kegiatan" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, registrationUrl: e.target.value === 'INTERNAL' ? '' : form.registrationUrl })} className="rounded-lg bg-brand-dark border border-white/10 px-4 py-2">
              <option value="INTERNAL">Kegiatan Internal</option>
              <option value="LOMBA">Lomba</option>
            </select>
            <input aria-label="Nama kegiatan" required placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input aria-label="Tanggal kegiatan" required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <label className="text-sm text-gray-300">Waktu kegiatan (WIB, opsional)
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="block w-full mt-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
            <label className="text-sm text-gray-300">Tanggal publikasi (zona waktu perangkat)
              <input required type="datetime-local" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="block w-full mt-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            </label>
            <input aria-label="Lokasi" required placeholder="Lokasi" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input aria-label="Penyelenggara" required placeholder="Penyelenggara" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input aria-label="URL publikasi" placeholder="URL Publikasi (opsional)" value={form.publicationUrl} onChange={(e) => setForm({ ...form, publicationUrl: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input aria-label="URL poster kegiatan" placeholder="URL Poster / Banner Kegiatan (opsional)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            {form.type === 'LOMBA' && (
              <input aria-label="URL pendaftaran Google Form" placeholder="https://forms.gle/... (opsional)" value={form.registrationUrl} onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 md:col-span-2" />
            )}
          </div>
          <textarea aria-label="Deskripsi" required placeholder="Deskripsi" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          <button disabled={saving} type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
            <div className="min-w-0 break-words">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">{item.type === 'LOMBA' ? 'Lomba' : 'Internal'} &middot; {item.date.slice(0, 10)} &middot; {item.location}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button aria-label={`Edit ${item.name}`} disabled={saving || deletingId !== null} onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-white/10"><Pencil size={16} /></button>
              <button aria-label={`Hapus ${item.name}`} disabled={saving || deletingId !== null} onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-white/10 text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400">Belum ada kegiatan.</p>}
      </div>
    </div>
  );
}
