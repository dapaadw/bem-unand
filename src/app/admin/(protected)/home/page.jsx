import { Sliders } from 'lucide-react';
import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import HomeSettingsClient from '../../../../components/admin/HomeSettingsClient';

export default async function HomeSettingsPage() {
  await requirePageRole(['ADMIN']);
  const [profile, contacts] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.contacts.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Sliders className="text-brand-neon" size={24} />
            <span>Pengaturan Website Utama</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Konfigurasi hero banner, visi &amp; misi, filosofi logo, warna tema, serta kontak resmi organisasi.
          </p>
        </div>
      </div>
      <HomeSettingsClient initialProfile={profile} initialContacts={contacts} />
    </div>
  );
}
