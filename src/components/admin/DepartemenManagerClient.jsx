'use client';

import { useState } from 'react';

function Field({ label, value, onChange, multiline = false }) {
  const props = { value: value || '', onChange: (event) => onChange(event.target.value), className: 'mt-1 block w-full min-w-0 rounded-lg bg-white/5 border border-white/10 px-3 py-2' };
  return <label className="block text-sm text-gray-300">{label}{multiline ? <textarea {...props} rows={3} /> : <input {...props} />}</label>;
}

export default function DepartemenManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || null);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const selected = items.find((item) => item.id === selectedId);

  function update(patch) {
    setItems((previous) => previous.map((item) => item.id === selectedId ? { ...item, ...patch } : item));
  }
  function updateRow(list, index, field, value) {
    update({ [list]: selected[list].map((row, position) => position === index ? { ...row, [field]: value } : row) });
  }
  async function perform(method, body) {
    setSaving(true); setMessage(''); setError('');
    try {
      const response = await fetch(method === 'POST' ? '/api/departemen' : `/api/departemen/${selectedId}`, {
        method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Gagal menyimpan perubahan.'); return; }
      if (method === 'DELETE') {
        const remaining = items.filter((item) => item.id !== selectedId);
        setItems(remaining); setSelectedId(remaining[0]?.id || null); setMessage('Departemen dihapus.');
      } else if (method === 'POST') {
        setItems((previous) => [...previous, data].sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedId(data.id); setNewName(''); setMessage('Departemen ditambahkan. Lengkapi profil dan detailnya.');
      } else {
        setItems((previous) => previous.map((item) => item.id === selectedId ? { ...item, ...data } : item).sort((a, b) => a.name.localeCompare(b.name)));
        setMessage(method === 'PUT' ? 'Profil tersimpan.' : 'Staff, program kerja, dan kontak tersimpan.');
      }
    } catch { setError('Terjadi kesalahan jaringan. Silakan coba lagi.'); }
    finally { setSaving(false); }
  }

  return <div>
    <form onSubmit={(event) => { event.preventDefault(); perform('POST', { name: newName }); }} className="flex flex-col sm:flex-row gap-3 mb-5">
      <input aria-label="Nama departemen baru" required disabled={saving} value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Nama departemen baru" className="min-w-0 flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
      <button disabled={saving} className="px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">Tambah Departemen</button>
    </form>
    {message && <p role="status" className="mb-5 text-sm text-brand-neon">{message}</p>}
    {error && <p role="alert" className="mb-5 text-sm text-red-400">{error}</p>}
    {!selected ? <p className="text-gray-400">Belum ada departemen.</p> : <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 space-y-1 max-h-[70vh] overflow-y-auto">
        {items.map((item) => <button key={item.id} disabled={saving} aria-pressed={selectedId === item.id} onClick={() => { setSelectedId(item.id); setMessage(''); setError(''); }} className={`w-full text-left break-words px-3 py-2 rounded-lg text-sm ${selectedId === item.id ? 'bg-brand-neon/20 text-brand-neon' : 'text-gray-400 hover:bg-white/5'}`}>{item.name}</button>)}
      </div>
      <fieldset disabled={saving} className="md:col-span-3 space-y-8 min-w-0">
        <section className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-brand-neon">Profil</h2>
          <Field label="Nama departemen" value={selected.name} onChange={(name) => update({ name })} />
          <Field label="URL foto departemen / path lokal" value={selected.photoUrl} onChange={(photoUrl) => update({ photoUrl })} />
          <Field label="Deskripsi singkat" multiline value={selected.description} onChange={(description) => update({ description })} />
          <button onClick={() => perform('PUT', { name: selected.name, photoUrl: selected.photoUrl, description: selected.description })} className="px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">Simpan Profil</button>
          <button onClick={() => { if (confirm(`Hapus departemen "${selected.name}" beserta seluruh staf, program kerja, dan kontaknya?`)) perform('DELETE'); }} className="block text-red-400 border border-red-400/30 rounded-lg px-4 py-2">Hapus Departemen Terpilih</button>
        </section>
        <section className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-brand-neon">Staff / BPH</h2>
          <p className="text-sm text-gray-400">Gunakan jabatan Kepala Departemen atau Ketua untuk kepala. Wakil Ketua tetap ditampilkan sebagai jajaran.</p>
          <button onClick={() => update({ staff: [...selected.staff, { name: '', role: '', photoUrl: '', identity: '', achievements: '' }] })} className="px-3 py-2 rounded-lg bg-white/10">Tambah Staff</button>
          {selected.staff.map((staff, index) => <div key={staff.id || index} className="border border-white/10 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[['name', 'Nama staf'], ['role', 'Jabatan'], ['photoUrl', 'URL foto staf / path lokal'], ['identity', 'Identitas'], ['achievements', 'Prestasi']].map(([field, label]) => <Field key={field} label={`${label} ${index + 1}`} value={staff[field]} onChange={(value) => updateRow('staff', index, field, value)} multiline={field === 'achievements'} />)}
            </div>
            <button aria-label={`Hapus staf ${index + 1}`} onClick={() => update({ staff: selected.staff.filter((_, position) => position !== index) })} className="text-sm text-red-400">Hapus Staff</button>
          </div>)}
        </section>
        <section className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-brand-neon">Program Kerja</h2>
          <button onClick={() => update({ proker: [...selected.proker, { name: '', description: '' }] })} className="px-3 py-2 rounded-lg bg-white/10">Tambah Program Kerja</button>
          {selected.proker.map((program, index) => <div key={program.id || index} className="border border-white/10 rounded-lg p-4 space-y-3">
            <Field label={`Nama program kerja ${index + 1}`} value={program.name} onChange={(value) => updateRow('proker', index, 'name', value)} />
            <Field label={`Deskripsi program kerja ${index + 1}`} multiline value={program.description} onChange={(value) => updateRow('proker', index, 'description', value)} />
            <button aria-label={`Hapus program kerja ${index + 1}`} onClick={() => update({ proker: selected.proker.filter((_, position) => position !== index) })} className="text-sm text-red-400">Hapus Program Kerja</button>
          </div>)}
        </section>
        <section className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-brand-neon">Kontak Departemen</h2>
          <Field label="WhatsApp departemen (https://wa.me/62...)" value={selected.contact?.whatsappUrl} onChange={(whatsappUrl) => update({ contact: { ...selected.contact, whatsappUrl } })} />
          <Field label="Instagram departemen (https://instagram.com/...)" value={selected.contact?.instagramUrl} onChange={(instagramUrl) => update({ contact: { ...selected.contact, instagramUrl } })} />
        </section>
        <p className="text-sm text-gray-400">Penambahan/penghapusan staf dan program kerja berlaku setelah tombol simpan detail ditekan.</p>
        <button onClick={() => perform('PATCH', { staff: selected.staff, proker: selected.proker, contact: selected.contact })} className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold">{saving ? 'Menyimpan...' : 'Simpan Staff, Proker & Kontak'}</button>
      </fieldset>
    </div>}
  </div>;
}
