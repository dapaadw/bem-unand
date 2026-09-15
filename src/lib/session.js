import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret || sessionSecret.length < 32) {
  throw new Error('SESSION_SECRET must be set and at least 32 characters long');
}

export const sessionOptions = {
  password: sessionSecret,
  cookieName: 'bem_unand_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

// defaultSession describes the empty/unauthenticated shape
export const defaultSession = {
  userId: undefined,
  role: undefined,
  name: undefined,
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  return session;
}
