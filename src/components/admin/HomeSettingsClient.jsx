'use client';

import { useState } from 'react';
import {
  Palette,
  Image as ImageIcon,
  Video,
  FileText,
  PhoneCall,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from 'lucide-react';

export default function HomeSettingsClient({ initialProfile, initialContacts }) {
  const [profile, setProfile] = useState(
    initialProfile || {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      visiMisi: '',
      logoPhilosophy: '',
      backgroundColor: '#1a0000',
      heroImageUrl: '',
      heroImageAlt: '',
      videoUrl: '',
    }
  );
  const [contacts, setContacts] = useState(
    initialContacts || { whatsappUrl: '', instagramUrl: '', email: '' }
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingContacts, setSavingContacts] = useState(false);

  async function saveProfile() {
    setSavingProfile(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) setMessage('Profil dan tampilan utama berhasil disimpan.');
      else setError(data.error || 'Gagal menyimpan profil.');
    } catch {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setSavingProfile(false);
    }
  }

  async function saveContacts() {
    setSavingContacts(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacts),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Kontak resmi berhasil disimpan.');
      } else {
        setError(data.error || 'Gagal menyimpan kontak.');
      }
    } catch {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setSavingContacts(false);
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
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

      {/* Hero & Identity Settings */}
      <section className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
            <Palette size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base text-white">Hero &amp; Identitas Website</h2>
            <p className="text-xs text-gray-400">Atur warna tema, judul landing page, dan media utama</p>
          </div>
        </div>

        {/* Theme Color Picker */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
            Warna Latar Tema (Brand Dark)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={profile.backgroundColor || '#1a0000'}
              onChange={(e) => setProfile({ ...profile, backgroundColor: e.target.value })}
              className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-xs text-brand-neon bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              {profile.backgroundColor || '#1a0000'}
            </span>
            <button
              type="button"
              onClick={() => setProfile({ ...profile, backgroundColor: '#1a0000' })}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw size={13} />
              <span>Gunakan warna default (#1a0000)</span>
            </button>
          </div>
          <p className="text-[11px] text-gray-400">
            Pilihlah nuansa warna gelap agar teks putih kontras dan terbaca dengan baik.
          </p>
        </div>

        {/* Titles & Hero Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 md:col-span-2">
            Judul Utama Hero
            <input
              value={profile.title || ''}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              placeholder="Contoh: Bergerak Bersama BEM FH UNAND"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 md:col-span-2">
            Subjudul / Slogan Hero
            <textarea
              rows={2}
              value={profile.subtitle || ''}
              onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
              placeholder="Slogan atau narasi singkat organisasi..."
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all leading-relaxed"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Teks Tombol Aksi (CTA)
            <input
              value={profile.ctaText || ''}
              onChange={(e) => setProfile({ ...profile, ctaText: e.target.value })}
              placeholder="Contoh: Sampaikan Aspirasi"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Tautan Tombol Aksi (CTA Link)
            <input
              value={profile.ctaLink || ''}
              onChange={(e) => setProfile({ ...profile, ctaLink: e.target.value })}
              placeholder="Contoh: /aspirasi atau /tentang"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            URL Foto Hero / Path Lokal
            <input
              value={profile.heroImageUrl || ''}
              onChange={(e) => setProfile({ ...profile, heroImageUrl: e.target.value })}
              placeholder="https://... atau /uploads/hero.jpg"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Deskripsi Foto (Alt Text)
            <input
              value={profile.heroImageAlt || ''}
              onChange={(e) => setProfile({ ...profile, heroImageAlt: e.target.value })}
              placeholder="Contoh: Pengurus BEM FH UNAND 2026"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 md:col-span-2">
            URL Video Profil YouTube (Opsional)
            <input
              value={profile.videoUrl || ''}
              onChange={(e) => setProfile({ ...profile, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>
        </div>

        {/* Visi Misi & Filosofi */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
            Visi &amp; Misi Organisasi
            <textarea
              rows={4}
              value={profile.visiMisi || ''}
              onChange={(e) => setProfile({ ...profile, visiMisi: e.target.value })}
              placeholder="Tuliskan rumusan Visi dan butir-butir Misi organisasi..."
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all leading-relaxed"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
            Filosofi Logo &amp; Lambang
            <textarea
              rows={4}
              value={profile.logoPhilosophy || ''}
              onChange={(e) => setProfile({ ...profile, logoPhilosophy: e.target.value })}
              placeholder="Jelaskan makna bentuk, warna, dan simbolisme logo BEM FH UNAND..."
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all leading-relaxed"
            />
          </label>
        </div>

        <div className="pt-2">
          <button
            onClick={saveProfile}
            disabled={savingProfile}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-neon to-rose-200 text-brand-dark font-bold text-sm shadow hover:shadow-brand-neon/20 transition-all disabled:opacity-50"
          >
            {savingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{savingProfile ? 'Menyimpan...' : 'Simpan Profil & Tampilan'}</span>
          </button>
        </div>
      </section>

      {/* Official Contacts Settings */}
      <section className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
            <PhoneCall size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base text-white">Kontak Resmi Organisasi</h2>
            <p className="text-xs text-gray-400">Saluran komunikasi yang ditampilkan pada footer dan halaman kontak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            WhatsApp Resmi
            <input
              value={contacts.whatsappUrl || ''}
              onChange={(e) => setContacts({ ...contacts, whatsappUrl: e.target.value })}
              placeholder="https://wa.me/62..."
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Instagram Resmi
            <input
              value={contacts.instagramUrl || ''}
              onChange={(e) => setContacts({ ...contacts, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/bemfhunand"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Email Resmi
            <input
              value={contacts.email || ''}
              onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
              placeholder="bem@law.unand.ac.id"
              className="mt-1.5 block w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
            />
          </label>
        </div>

        <div className="pt-2">
          <button
            onClick={saveContacts}
            disabled={savingContacts}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-neon to-rose-200 text-brand-dark font-bold text-sm shadow hover:shadow-brand-neon/20 transition-all disabled:opacity-50"
          >
            {savingContacts ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{savingContacts ? 'Menyimpan...' : 'Simpan Kontak'}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
