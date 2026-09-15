'use client';

import { useState } from 'react';

export default function HomeSettingsClient({ initialProfile, initialContacts }) {
  const [profile, setProfile] = useState(initialProfile || { title: '', subtitle: '', ctaText: '', ctaLink: '', visiMisi: '', logoPhilosophy: '' });
  const [contacts, setContacts] = useState(initialContacts || { whatsappUrl: '', instagramUrl: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveProfile() {
    setSaving(true);
    setMessage('');
    setError('');
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    if (res.ok) setMessage('Profil Home tersimpan.');
    else setError('Gagal menyimpan profil.');
  }

  async function saveContacts() {
    setSaving(true);
    setMessage('');
    setError('');
    const res = await fetch('/api/contacts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contacts),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setMessage('Kontak tersimpan.');
    } else {
      setError(data.error || 'Gagal menyimpan kontak.');
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {message && <p className="text-sm text-brand-neon">{message}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-brand-neon">Hero / Profil</h2>
        <input value={profile.title || ''} onChange={(e) => setProfile({ ...profile, title: e.target.value })} placeholder="Judul" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <textarea value={profile.subtitle || ''} onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })} placeholder="Subjudul" rows={2} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <input value={profile.ctaText || ''} onChange={(e) => setProfile({ ...profile, ctaText: e.target.value })} placeholder="Teks tombol CTA (opsional)" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <input value={profile.ctaLink || ''} onChange={(e) => setProfile({ ...profile, ctaLink: e.target.value })} placeholder="Link CTA (opsional)" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <textarea value={profile.visiMisi || ''} onChange={(e) => setProfile({ ...profile, visiMisi: e.target.value })} placeholder="Visi & Misi" rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <textarea value={profile.logoPhilosophy || ''} onChange={(e) => setProfile({ ...profile, logoPhilosophy: e.target.value })} placeholder="Filosofi Logo" rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <button onClick={saveProfile} disabled={saving} className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">Simpan Profil</button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-brand-neon">Kontak</h2>
        <input value={contacts.whatsappUrl || ''} onChange={(e) => setContacts({ ...contacts, whatsappUrl: e.target.value })} placeholder="https://wa.me/62..." className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <input value={contacts.instagramUrl || ''} onChange={(e) => setContacts({ ...contacts, instagramUrl: e.target.value })} placeholder="https://instagram.com/..." className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <input value={contacts.email || ''} onChange={(e) => setContacts({ ...contacts, email: e.target.value })} placeholder="Email" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2" />
        <button onClick={saveContacts} disabled={saving} className="px-5 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold disabled:opacity-50">Simpan Kontak</button>
      </div>
    </div>
  );
}
