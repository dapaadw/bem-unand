import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';
import { getSession } from '../../../../lib/session';
import { checkRateLimit, resetRateLimit } from '../../../../lib/rateLimit';

// Precomputed bcrypt hash (cost 10) to equalize response timing when user email does not exist
const DUMMY_PASSWORD_HASH =
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

export async function POST(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'local';
  const rateKey = `login:${ip}`;

  const rl = checkRateLimit(rateKey, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error:
          'Terlalu banyak percobaan login. Silakan tunggu beberapa menit sebelum mencoba kembali.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfterSec) },
      },
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password || email.length > 254 || password.length > 128) {
    return NextResponse.json(
      { error: 'Email dan password wajib diisi.' },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const targetHash = user ? user.passwordHash : DUMMY_PASSWORD_HASH;
  const valid = await bcrypt.compare(password, targetHash);

  if (!user || !valid) {
    return NextResponse.json(
      { error: 'Email atau password salah.' },
      { status: 401 },
    );
  }

  resetRateLimit(rateKey);

  const session = await getSession();
  session.userId = user.id;
  session.role = user.role;
  session.name = user.name;
  session.email = user.email;
  await session.save();

  return NextResponse.json({ ok: true, role: user.role, name: user.name });
}
