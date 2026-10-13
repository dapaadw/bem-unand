import { redirect } from 'next/navigation';
import { getSession } from '../../../lib/session';
import { prisma } from '../../../lib/prisma';
import AdminShell from '../../../components/AdminShell';

export default async function AdminProtectedLayout({ children }) {
  const session = await getSession();

  if (!session.userId) {
    redirect('/admin/login');
  }

  let unreadAspirasi = 0;
  try {
    unreadAspirasi = await prisma.aspirasi.count({ where: { status: 'BARU' } });
  } catch (err) {
    console.error('Failed to count unread aspirasi:', err);
  }

  return (
    <AdminShell
      name={session.name}
      role={session.role}
      email={session.email || ''}
      unreadAspirasi={unreadAspirasi}
    >
      {children}
    </AdminShell>
  );
}

