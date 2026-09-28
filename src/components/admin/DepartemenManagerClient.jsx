'use client';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  Building2,
  Users,
  Layers,
  Phone,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react';

export default function DepartemenManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const selected = items.find((d) => d.id === selectedId);

  function updateSelected(patch) {
    setItems((prev) => prev.map((d) => (d.id === selectedId ? { ...d, ...patch } : d)));
  }

  async function handleSaveProfile() {
    setSaving(true);
    setMessage('');
    setIsError(false);
    try {
      const res = await fetch(`/api/departemen/${selectedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: selected.name, photoUrl: selected.photoUrl, description: selected.description }),
      });
      setSaving(false);
      if (res.ok) {
        setMessage('Profil departemen berhasil disimpan.');
      } else {
        setIsError(true);
        setMessage('Gagal menyimpan profil departemen.');
      }
    } catch {
      setSaving(false);
      setIsError(true);
      setMessage('Terjadi kesalahan jaringan.');
    }
  }

  async function handleSaveDetails() {
    setSaving(true);
    setMessage('');
    setIsError(false);
    try {
      const res = await fetch(`/api/departemen/${selectedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff: selected.staff, proker: selected.proker, contact: selected.contact }),
      });
      const data = await res.json();
      setSaving(false);
      if (res.ok) {
        setItems((prev) => prev.map((d) => (d.id === selectedId ? data : d)));
        setMessage('Staff, program kerja, dan kontak berhasil disimpan.');
      } else {
        setIsError(true);
        setMessage('Gagal menyimpan detail departemen.');
      }
    } catch {
      setSaving(false);
      setIsError(true);
      setMessage('Terjadi kesalahan jaringan.');
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

  if (!selected) {
    return (
      <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
        <Building2 size={32} className="mx-auto text-zinc-500 mb-2" />
        <p className="text-zinc-400 text-sm">Belum ada departemen yang terdaftar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast / Notification Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold ${
            isError
              ? 'bg-red-500/10 border border-red-500/20 text-red-300'
              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
          }`}
        >
          {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Department List */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Daftar Departemen & Biro ({items.length})
          </p>
          <div className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
            {items.map((d) => {
              const isSelected = d.id === selectedId;
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedId(d.id);
                    setMessage('');
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-red/50 to-brand-neon/15 text-white border border-brand-neon/40 shadow-[0_0_15px_rgba(254,174,174,0.12)]'
                      : 'bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06] hover:text-white border border-white/5'
                  }`}
                >
                  <span className={`font-semibold ${isSelected ? 'text-brand-neon' : 'text-white'}`}>
                    {d.name}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                    <span>{d.staff?.length || 0} Staf</span>
                    <span>·</span>
                    <span>{d.proker?.length || 0} Proker</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Department Detail Forms */}
        <div className="lg:col-span-3 space-y-6">
          {/* Section 1: Profil Utama */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
                <Building2 size={18} />
                <span>Profil Departemen: {selected.name}</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Nama Departemen</label>
                <input
                  value={selected.name}
                  onChange={(e) => updateSelected({ name: e.target.value })}
                  placeholder="Nama departemen"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">URL Foto Departemen / Logo</label>
                <input
                  value={selected.photoUrl || ''}
                  onChange={(e) => updateSelected({ photoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Deskripsi Singkat Departemen</label>
                <textarea
                  value={selected.description || ''}
                  onChange={(e) => updateSelected({ description: e.target.value })}
                  placeholder="Tulis ringkasan tugas dan fungsi departemen..."
                  rows={3}
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
                >
                  <Save size={14} />
                  <span>Simpan Profil Departemen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Staff / BPH */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
                  <Users size={18} />
                  <span>Staf & BPH Departemen ({selected.staff?.length || 0})</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Tandai kepala departemen pada kolom Jabatan/Role (contoh: "Kepala Departemen").
                </p>
              </div>

              <button
                onClick={addStaff}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                <Plus size={14} />
                <span>Tambah Staf</span>
              </button>
            </div>

            <div className="space-y-3">
              {selected.staff.length === 0 ? (
                <p className="text-xs text-zinc-400 py-4 text-center">Belum ada data staf yang ditambahkan.</p>
              ) : (
                selected.staff.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/20 border border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 items-center"
                  >
                    <input
                      value={s.name}
                      onChange={(e) => updateStaff(idx, 'name', e.target.value)}
                      placeholder="Nama Lengkap"
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                    />
                    <input
                      value={s.role}
                      onChange={(e) => updateStaff(idx, 'role', e.target.value)}
                      placeholder="Jabatan / Role"
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                    />
                    <input
                      value={s.identity || ''}
                      onChange={(e) => updateStaff(idx, 'identity', e.target.value)}
                      placeholder="NIM / Angkatan"
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                    />
                    <input
                      value={s.achievements || ''}
                      onChange={(e) => updateStaff(idx, 'achievements', e.target.value)}
                      placeholder="Prestasi / Bio"
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                    />
                    <button
                      onClick={() => removeStaff(idx)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg justify-self-start sm:justify-self-end transition-colors"
                      title="Hapus Staf"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 3: Program Kerja */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
                <Layers size={18} />
                <span>Program Kerja ({selected.proker?.length || 0})</span>
              </h2>

              <button
                onClick={addProker}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                <Plus size={14} />
                <span>Tambah Proker</span>
              </button>
            </div>

            <div className="space-y-3">
              {selected.proker.length === 0 ? (
                <p className="text-xs text-zinc-400 py-4 text-center">Belum ada program kerja yang didaftarkan.</p>
              ) : (
                selected.proker.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/20 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-2 items-center"
                  >
                    <input
                      value={p.name}
                      onChange={(e) => updateProker(idx, 'name', e.target.value)}
                      placeholder="Nama Program Kerja"
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                    />
                    <input
                      value={p.description || ''}
                      onChange={(e) => updateProker(idx, 'description', e.target.value)}
                      placeholder="Keterangan singkat proker"
                      className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                    />
                    <button
                      onClick={() => removeProker(idx)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg justify-self-start md:justify-self-end transition-colors"
                      title="Hapus Proker"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 4: Kontak & Final Save Button */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-4">
            <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
              <Phone size={18} />
              <span>Contact Person Departemen</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">WhatsApp Link</label>
                <input
                  value={selected.contact?.whatsappUrl || ''}
                  onChange={(e) => updateSelected({ contact: { ...(selected.contact || {}), whatsappUrl: e.target.value } })}
                  placeholder="https://wa.me/62..."
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-300">Instagram Link</label>
                <input
                  value={selected.contact?.instagramUrl || ''}
                  onChange={(e) => updateSelected({ contact: { ...(selected.contact || {}), instagramUrl: e.target.value } })}
                  placeholder="https://instagram.com/..."
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveDetails}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)]"
              >
                <Save size={14} />
                <span>{saving ? 'Menyimpan...' : 'Simpan Staf, Proker & Kontak'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
