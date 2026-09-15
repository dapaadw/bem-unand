'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyForm = { type: 'INTERNAL', name: '', date: '', location: '', organizer: '', description: '', publicationUrl: '', registrationUrl: '' };

export default function KegiatanManagerClient({ initialItems }) {
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
      type: item.type,
      name: item.name,
      date: item.date.slice(0, 10),
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

  async function handleDelete(id) {
    if (!confirm('Hapus kegiatan ini?')) return;
    const res = await fetch(`/api/kegiatan/${id}`, { method: 'DELETE' });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <button onClick={openCreate} className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">
        <Plus size={18} /> Tambah Kegiatan
      </button>

      {formOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-brand-neon">{editingId ? 'Edit Kegiatan' : 'Kegiatan Baru'}</h2>
            <button type="button" onClick={() => setFormOpen(false)}><X size={20} /></button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2">
              <option value="INTERNAL">Kegiatan Internal</option>
              <option value="LOMBA">Lomba</option>
            </select>
            <input required placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input required placeholder="Lokasi" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input required placeholder="Penyelenggara" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            <input placeholder="URL Publikasi (opsional)" value={form.publicationUrl} onChange={(e) => setForm({ ...form, publicationUrl: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
            {form.type === 'LOMBA' && (
              <input placeholder="URL Pendaftaran (Google Form)" value={form.registrationUrl} onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 md:col-span-2" />
            )}
          </div>
          <textarea required placeholder="Deskripsi" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          <button disabled={saving} type="submit" className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">{item.type === 'LOMBA' ? 'Lomba' : 'Internal'} &middot; {item.date.slice(0, 10)} &middot; {item.location}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-white/10"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-white/10 text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400">Belum ada kegiatan.</p>}
      </div>
    </div>
  );
}
