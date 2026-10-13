import { redirect } from 'next/navigation';
import { getSession } from '../../../lib/session';
import AdminShell from '../../../components/AdminShell';

export default async function AdminProtectedLayout({ children }) {
  const session = await getSession();

  if (!session.userId) {
    redirect('/admin/login');
  }

  return (
    <AdminShell
      name={session.name}
      role={session.role}
      email={session.email || ''}
    >
      {children}
    </AdminShell>
  );
}

