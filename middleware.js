import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './src/lib/session.js';

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession(request, response, sessionOptions);

  if (!session.userId) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
