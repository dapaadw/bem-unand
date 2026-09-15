import { prisma } from '../../../../lib/prisma';
import HomeSettingsClient from '../../../../components/admin/HomeSettingsClient';

export default async function HomeSettingsPage() {
  const [profile, contacts] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.contacts.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pengaturan Home</h1>
      <HomeSettingsClient initialProfile={profile} initialContacts={contacts} />
    </div>
  );
}
