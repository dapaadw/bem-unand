import { redirect } from 'next/navigation';
import { getSession } from './session';
import { prisma } from './prisma';

export async function requirePageRole(roles) {
  const session = await getSession();
  if (!session.userId) redirect('/admin/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, role: true, name: true, email: true },
  });

  if (!user) {
    redirect('/admin/login');
  }

  if (!roles.includes(user.role)) {
    redirect('/admin');
  }

  return {
    ...session,
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  };
}
