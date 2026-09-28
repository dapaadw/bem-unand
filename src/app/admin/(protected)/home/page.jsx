import { prisma } from '../../../../lib/prisma';
import HomeSettingsClient from '../../../../components/admin/HomeSettingsClient';
import { Home } from 'lucide-react';

export default async function HomeSettingsPage() {
  const [profile, contacts] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.contacts.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Home size={22} className="text-brand-neon" />
          <span>Konfigurasi Profil Beranda</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Atur konten hero, profil organisasi, visi misi, dan informasi kontak pada halaman utama web.
        </p>
      </div>
      <HomeSettingsClient initialProfile={profile} initialContacts={contacts} />
    </div>
  );
}
