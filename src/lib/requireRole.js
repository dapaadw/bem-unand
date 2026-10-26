import { NextResponse } from 'next/server';
import { getSession } from './session';
import { prisma } from './prisma';

// Route Handler guard: returns { session } on success, or { error } (a NextResponse) on failure.
export async function requireRole(allowedRoles) {
  const session = await getSession();
  if (!session.userId) {
    return {
      error: NextResponse.json({ error: 'Belum login.' }, { status: 401 }),
    };
  }

  // Verify user still exists in database and use current DB role
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, role: true, name: true, email: true },
  });

  if (!user) {
    session.destroy();
    return {
      error: NextResponse.json(
        { error: 'Sesi tidak valid atau akun telah dinonaktifkan.' },
        { status: 401 },
      ),
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      error: NextResponse.json(
        { error: 'Tidak memiliki akses.' },
        { status: 403 },
      ),
    };
  }

  session.role = user.role;
  session.name = user.name;
  session.email = user.email;

  return { session };
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export { slugify };
