import { NextResponse } from 'next/server';
import { getSession } from './session';

// Route Handler guard: returns { session } on success, or { error } (a NextResponse) on failure.
export async function requireRole(allowedRoles) {
  const session = await getSession();
  if (!session.userId) {
    return { error: NextResponse.json({ error: 'Belum login.' }, { status: 401 }) };
  }
  if (!allowedRoles.includes(session.role)) {
    return { error: NextResponse.json({ error: 'Tidak memiliki akses.' }, { status: 403 }) };
  }
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
