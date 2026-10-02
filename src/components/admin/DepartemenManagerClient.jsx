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

function Field({ label, value, onChange, multiline = false }) {
  const inputClass = 'mt-1 block w-full min-w-0 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all';
  const props = { value: value || '', onChange: (event) => onChange(event.target.value), className: inputClass };
  return (
    <label className="block text-[11px] font-semibold text-zinc-300">
      {label}
      {multiline ? <textarea {...props} rows={3} className={`${inputClass} leading-relaxed`} /> : <input {...props} />}
    </label>
  );
}

export default function DepartemenManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || null);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const selected = items.find((item) => item.id === selectedId);

  function update(patch) {
    setItems((previous) => previous.map((item) => item.id === selectedId ? { ...item, ...patch } : item));
  }
  function updateRow(list, index, field, value) {
    update({ [list]: selected[list].map((row, position) => position === index ? { ...row, [field]: value } : row) });
  }

  function showToast(msg, error = false) {
    setMessage(msg);
    setIsError(error);
  }

  async function perform(method, body) {
    setSaving(true); setMessage(''); setIsError(false);
    try {
      const response = await fetch(method === 'POST' ? '/api/departemen' : `/api/departemen/${selectedId}`, {
        method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      if (!response.ok) { showToast(data.error || 'Gagal menyimpan perubahan.', true); return; }
      if (method === 'DELETE') {
        const remaining = items.filter((item) => item.id !== selectedId);
        setItems(remaining); setSelectedId(remaining[0]?.id || null); showToast('Departemen dihapus.');
      } else if (method === 'POST') {
        setItems((previous) => [...previous, data].sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedId(data.id); setNewName(''); showToast('Departemen ditambahkan. Lengkapi profil dan detailnya.');
      } else {
        setItems((previous) => previous.map((item) => item.id === selectedId ? { ...item, ...data } : item).sort((a, b) => a.name.localeCompare(b.name)));
        showToast(method === 'PUT' ? 'Profil tersimpan.' : 'Staff, program kerja, dan kontak tersimpan.');
      }
    } catch { showToast('Terjadi kesalahan jaringan. Silakan coba lagi.', true); }
    finally { setSaving(false); }
  }

  if (!selected && items.length === 0) {
    return (
      <div className="space-y-6">
        {/* Add Departemen Form */}
        <form onSubmit={(event) => { event.preventDefault(); perform('POST', { name: newName }); }} className="flex flex-col sm:flex-row gap-3">
          <input aria-label="Nama departemen baru" required disabled={saving} value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Nama departemen baru" className="min-w-0 flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all" />
          <button disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]">
            <Plus size={14} />
            <span>Tambah Departemen</span>
          </button>
        </form>
        <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
          <Building2 size={32} className="mx-auto text-zinc-500 mb-2" />
          <p className="text-zinc-400 text-sm">Belum ada departemen yang terdaftar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Departemen Form */}
      <form onSubmit={(event) => { event.preventDefault(); perform('POST', { name: newName }); }} className="flex flex-col sm:flex-row gap-3">
        <input aria-label="Nama departemen baru" required disabled={saving} value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Nama departemen baru" className="min-w-0 flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all" />
        <button disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]">
          <Plus size={14} />
          <span>Tambah Departemen</span>
        </button>
      </form>

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
                  disabled={saving}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedId(d.id);
                    setMessage('');
                    setIsError(false);
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
        {selected && (
          <fieldset disabled={saving} className="lg:col-span-3 space-y-6 min-w-0">
            {/* Section 1: Profil Utama */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
                  <Building2 size={18} />
                  <span>Profil Departemen: {selected.name}</span>
                </h2>
              </div>

              <div className="space-y-4">
                <Field label="Nama Departemen" value={selected.name} onChange={(name) => update({ name })} />
                <Field label="URL Foto Departemen / Logo" value={selected.photoUrl} onChange={(photoUrl) => update({ photoUrl })} />
                <Field label="Deskripsi Singkat Departemen" multiline value={selected.description} onChange={(description) => update({ description })} />

                <div className="flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={() => perform('PUT', { name: selected.name, photoUrl: selected.photoUrl, description: selected.description })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
                  >
                    <Save size={14} />
                    <span>Simpan Profil Departemen</span>
                  </button>
                </div>

                <button
                  onClick={() => { if (confirm(`Hapus departemen "${selected.name}" beserta seluruh staf, program kerja, dan kontaknya?`)) perform('DELETE'); }}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 border border-red-400/30 rounded-xl px-4 py-2 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Hapus Departemen Terpilih</span>
                </button>
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
                    Gunakan jabatan Kepala Departemen atau Ketua untuk kepala. Wakil Ketua tetap ditampilkan sebagai jajaran.
                  </p>
                </div>

                <button
                  onClick={() => update({ staff: [...selected.staff, { name: '', role: '', photoUrl: '', identity: '', achievements: '' }] })}
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
                    <div key={s.id || idx} className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[['name', 'Nama staf'], ['role', 'Jabatan'], ['photoUrl', 'URL foto staf'], ['identity', 'Identitas'], ['achievements', 'Prestasi']].map(([field, label]) => (
                          <Field key={field} label={`${label} ${idx + 1}`} value={s[field]} onChange={(value) => updateRow('staff', idx, field, value)} multiline={field === 'achievements'} />
                        ))}
                      </div>
                      <button
                        aria-label={`Hapus staf ${idx + 1}`}
                        onClick={() => update({ staff: selected.staff.filter((_, i) => i !== idx) })}
                        className="inline-flex items-center gap-1 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-xs"
                      >
                        <Trash2 size={14} />
                        <span>Hapus Staff</span>
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
                  onClick={() => update({ proker: [...selected.proker, { name: '', description: '' }] })}
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
                    <div key={p.id || idx} className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
                      <Field label={`Nama program kerja ${idx + 1}`} value={p.name} onChange={(value) => updateRow('proker', idx, 'name', value)} />
                      <Field label={`Deskripsi program kerja ${idx + 1}`} multiline value={p.description} onChange={(value) => updateRow('proker', idx, 'description', value)} />
                      <button
                        aria-label={`Hapus program kerja ${idx + 1}`}
                        onClick={() => update({ proker: selected.proker.filter((_, i) => i !== idx) })}
                        className="inline-flex items-center gap-1 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-xs"
                      >
                        <Trash2 size={14} />
                        <span>Hapus Program Kerja</span>
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
                <Field label="WhatsApp Link (https://wa.me/62...)" value={selected.contact?.whatsappUrl} onChange={(whatsappUrl) => update({ contact: { ...selected.contact, whatsappUrl } })} />
                <Field label="Instagram Link (https://instagram.com/...)" value={selected.contact?.instagramUrl} onChange={(instagramUrl) => update({ contact: { ...selected.contact, instagramUrl } })} />
              </div>

              <p className="text-xs text-zinc-400">Penambahan/penghapusan staf dan program kerja berlaku setelah tombol simpan detail ditekan.</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => perform('PATCH', { staff: selected.staff, proker: selected.proker, contact: selected.contact })}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)]"
                >
                  <Save size={14} />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Staf, Proker & Kontak'}</span>
                </button>
              </div>
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
}
