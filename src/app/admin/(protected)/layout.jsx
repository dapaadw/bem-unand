import { redirect } from 'next/navigation';
import { getSession } from '../../../lib/session';
import { prisma } from '../../../lib/prisma';
import AdminShell from '../../../components/AdminShell';

export default async function AdminProtectedLayout({ children }) {
  const session = await getSession();

  if (!session.userId) {
    redirect('/admin/login');
  }

  const unreadAspirasi = await prisma.aspirasi.count({
    where: { status: 'BARU' },
  }).catch(() => 0);

  return (
    <AdminShell name={session.name} role={session.role} unreadAspirasi={unreadAspirasi}>
      {children}
    </AdminShell>
  );
}
