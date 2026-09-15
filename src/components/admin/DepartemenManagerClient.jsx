'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function DepartemenManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const selected = items.find((d) => d.id === selectedId);

  function updateSelected(patch) {
    setItems((prev) => prev.map((d) => (d.id === selectedId ? { ...d, ...patch } : d)));
  }

  async function handleSaveProfile() {
    setSaving(true);
    setMessage('');
    const res = await fetch(`/api/departemen/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: selected.name, photoUrl: selected.photoUrl, description: selected.description }),
    });
    setSaving(false);
    setMessage(res.ok ? 'Profil tersimpan.' : 'Gagal menyimpan profil.');
  }

  async function handleSaveDetails() {
    setSaving(true);
    setMessage('');
    const res = await fetch(`/api/departemen/${selectedId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staff: selected.staff, proker: selected.proker, contact: selected.contact }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setItems((prev) => prev.map((d) => (d.id === selectedId ? data : d)));
      setMessage('Staff, program kerja, dan kontak tersimpan.');
    } else {
      setMessage('Gagal menyimpan.');
    }
  }

  function addStaff() {
    updateSelected({ staff: [...selected.staff, { name: '', role: '', identity: '', achievements: '' }] });
  }
  function updateStaff(idx, field, value) {
    const staff = [...selected.staff];
    staff[idx] = { ...staff[idx], [field]: value };
    updateSelected({ staff });
  }
  function removeStaff(idx) {
    updateSelected({ staff: selected.staff.filter((_, i) => i !== idx) });
  }

  function addProker() {
    updateSelected({ proker: [...selected.proker, { name: '', description: '' }] });
  }
  function updateProker(idx, field, value) {
    const proker = [...selected.proker];
    proker[idx] = { ...proker[idx], [field]: value };
    updateSelected({ proker });
  }
  function removeProker(idx) {
    updateSelected({ proker: selected.proker.filter((_, i) => i !== idx) });
  }

  if (!selected) return <p className="text-gray-400">Belum ada departemen.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 space-y-1 max-h-[70vh] overflow-y-auto">
        {items.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedId(d.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${d.id === selectedId ? 'bg-brand-neon/20 text-brand-neon' : 'text-gray-400 hover:bg-white/5'}`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="md:col-span-3 space-y-8">
        {message && <p className="text-sm text-brand-neon">{message}</p>}

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-brand-neon">Profil</h2>
          <input value={selected.name} onChange={(e) => updateSelected({ name: e.target.value })} placeholder="Nama departemen" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          <input value={selected.photoUrl || ''} onChange={(e) => updateSelected({ photoUrl: e.target.value })} placeholder="URL Foto" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          <textarea value={selected.description || ''} onChange={(e) => updateSelected({ description: e.target.value })} placeholder="Deskripsi singkat" rows={3} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
          <button onClick={handleSaveProfile} disabled={saving} className="px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">Simpan Profil</button>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-brand-neon">Staff / BPH (tandai kepala departemen di kolom Role, contoh: "Kepala Departemen")</h2>
            <button onClick={addStaff} className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-white/10"><Plus size={14} /> Tambah</button>
          </div>
          {selected.staff.map((s, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <input value={s.name} onChange={(e) => updateStaff(idx, 'name', e.target.value)} placeholder="Nama" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 md:col-span-1" />
              <input value={s.role} onChange={(e) => updateStaff(idx, 'role', e.target.value)} placeholder="Role" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 md:col-span-1" />
              <input value={s.identity || ''} onChange={(e) => updateStaff(idx, 'identity', e.target.value)} placeholder="Identitas" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 md:col-span-1" />
              <input value={s.achievements || ''} onChange={(e) => updateStaff(idx, 'achievements', e.target.value)} placeholder="Prestasi" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 md:col-span-1" />
              <button onClick={() => removeStaff(idx)} className="p-2 text-red-400 hover:bg-white/10 rounded-lg justify-self-start"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-brand-neon">Program Kerja</h2>
            <button onClick={addProker} className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-white/10"><Plus size={14} /> Tambah</button>
          </div>
          {selected.proker.map((p, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <input value={p.name} onChange={(e) => updateProker(idx, 'name', e.target.value)} placeholder="Nama proker" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 md:col-span-1" />
              <input value={p.description || ''} onChange={(e) => updateProker(idx, 'description', e.target.value)} placeholder="Deskripsi" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 md:col-span-1" />
              <button onClick={() => removeProker(idx)} className="p-2 text-red-400 hover:bg-white/10 rounded-lg justify-self-start"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-brand-neon">Contact Person</h2>
          <input
            value={selected.contact?.whatsappUrl || ''}
            onChange={(e) => updateSelected({ contact: { ...(selected.contact || {}), whatsappUrl: e.target.value } })}
            placeholder="https://wa.me/62..."
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2"
          />
          <input
            value={selected.contact?.instagramUrl || ''}
            onChange={(e) => updateSelected({ contact: { ...(selected.contact || {}), instagramUrl: e.target.value } })}
            placeholder="https://instagram.com/..."
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2"
          />
        </div>

        <button onClick={handleSaveDetails} disabled={saving} className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">
          {saving ? 'Menyimpan...' : 'Simpan Staff, Proker & Kontak'}
        </button>
      </div>
    </div>
  );
}
