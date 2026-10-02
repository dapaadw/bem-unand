'use client';

import { useState } from 'react';
import {
  Sparkles,
  Phone,
  Save,
  CheckCircle2,
  AlertCircle,
  Type,
  FileText,
  MousePointerClick,
  Link2,
  Eye,
  BookHeart,
  MessageCircle,
  Image,
  Video,
  Palette,
} from 'lucide-react';

export default function HomeSettingsClient({ initialProfile, initialContacts }) {
  const [profile, setProfile] = useState(initialProfile || { title: '', subtitle: '', ctaText: '', ctaLink: '', visiMisi: '', logoPhilosophy: '', backgroundColor: '#1a0000', heroImageUrl: '', heroImageAlt: '', videoUrl: '' });
  const [contacts, setContacts] = useState(initialContacts || { whatsappUrl: '', instagramUrl: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveProfile() {
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) setMessage('Profil beranda berhasil disimpan.');
      else setError(data.error || 'Gagal menyimpan profil.');
    } catch { setError('Terjadi kesalahan jaringan. Silakan coba lagi.'); }
    finally { setSaving(false); }
  }

  async function saveContacts() {
    setSaving(true);
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
        setMessage('Kontak berhasil disimpan.');
      } else {
        setError(data.error || 'Gagal menyimpan kontak.');
      }
    } catch { setError('Terjadi kesalahan jaringan. Silakan coba lagi.'); }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-6">
      {/* Toast / Notification Banner */}
      {message && (
        <div className="p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl flex items-center gap-2.5 text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-300">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1: Hero / Profil Utama */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
              <Sparkles size={18} />
              <span>Hero &amp; Profil Utama</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Konten utama yang ditampilkan pada bagian hero halaman beranda.
            </p>
          </div>
        </div>

        {/* Background Color */}
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <Palette size={11} />
              Warna latar tema
            </label>
            <input type="color" value={profile.backgroundColor || '#1a0000'} onChange={(e) => setProfile({ ...profile, backgroundColor: e.target.value })} className="block w-20 h-10 rounded-lg border border-white/10 cursor-pointer" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-400">Pilih warna gelap agar tulisan tetap terbaca. Warna diterapkan setelah Simpan Profil.</p>
            <button type="button" onClick={() => setProfile({ ...profile, backgroundColor: '#1a0000' })} className="text-[11px] text-brand-neon hover:underline">Gunakan warna bawaan</button>
          </div>
        </div>

        {/* Hero Image & Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <Image size={11} />
              URL Foto Hero
            </label>
            <input
              value={profile.heroImageUrl || ''}
              onChange={(e) => setProfile({ ...profile, heroImageUrl: e.target.value })}
              placeholder="https://... atau /uploads/foto.jpg"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <FileText size={11} />
              Deskripsi Foto (teks alternatif)
            </label>
            <input
              value={profile.heroImageAlt || ''}
              onChange={(e) => setProfile({ ...profile, heroImageAlt: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <Video size={11} />
              URL Video Profil YouTube
            </label>
            <input
              value={profile.videoUrl || ''}
              onChange={(e) => setProfile({ ...profile, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
            <p className="text-[10px] text-zinc-400">Foto dan video tampil setelah URL diisi. Video ditampilkan di bawah Visi &amp; Misi.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <Type size={11} />
              Judul Utama
            </label>
            <input
              value={profile.title || ''}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              placeholder="Judul hero section"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <FileText size={11} />
              Subjudul
            </label>
            <input
              value={profile.subtitle || ''}
              onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
              placeholder="Deskripsi singkat hero section"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <MousePointerClick size={11} />
              Teks Tombol CTA
            </label>
            <input
              value={profile.ctaText || ''}
              onChange={(e) => setProfile({ ...profile, ctaText: e.target.value })}
              placeholder="Contoh: Jelajahi Sekarang"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <Link2 size={11} />
              Link CTA
            </label>
            <input
              value={profile.ctaLink || ''}
              onChange={(e) => setProfile({ ...profile, ctaLink: e.target.value })}
              placeholder="https://... atau /path"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <Eye size={11} />
            Visi &amp; Misi
          </label>
          <textarea
            value={profile.visiMisi || ''}
            onChange={(e) => setProfile({ ...profile, visiMisi: e.target.value })}
            placeholder="Tulis visi dan misi organisasi..."
            rows={4}
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all leading-relaxed"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <BookHeart size={11} />
            Filosofi Logo
          </label>
          <textarea
            value={profile.logoPhilosophy || ''}
            onChange={(e) => setProfile({ ...profile, logoPhilosophy: e.target.value })}
            placeholder="Jelaskan makna dan filosofi di balik logo organisasi..."
            rows={4}
            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all leading-relaxed"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
          >
            <Save size={14} />
            <span>{saving ? 'Menyimpan...' : 'Simpan Profil Beranda'}</span>
          </button>
        </div>
      </div>

      {/* Section 2: Kontak */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h2 className="font-bold text-sm md:text-base text-brand-neon flex items-center gap-2">
              <Phone size={18} />
              <span>Informasi Kontak</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Kontak yang ditampilkan di footer dan halaman kontak web utama.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              <MessageCircle size={11} />
              WhatsApp Link
            </label>
            <input
              value={contacts.whatsappUrl || ''}
              onChange={(e) => setContacts({ ...contacts, whatsappUrl: e.target.value })}
              placeholder="https://wa.me/62..."
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              Instagram Link
            </label>
            <input
              value={contacts.instagramUrl || ''}
              onChange={(e) => setContacts({ ...contacts, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
              Email
            </label>
            <input
              value={contacts.email || ''}
              onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
              placeholder="email@fh.unand.ac.id"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand-neon/60 transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={saveContacts}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]"
          >
            <Save size={14} />
            <span>{saving ? 'Menyimpan...' : 'Simpan Kontak'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
