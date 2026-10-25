import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./src/lib/session.js";

export async function proxy(request) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession(request, response, sessionOptions);

  if (!session.userId) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Admin hanya dapat mengakses url publikasi (/admin/news), agenda (/admin/kegiatan), dan audit trail (/admin/audit-log)
  if (session.role === "ADMIN") {
    const isAllowedAdminPath =
      request.nextUrl.pathname.startsWith("/admin/news") ||
      request.nextUrl.pathname.startsWith("/admin/kegiatan") ||
      request.nextUrl.pathname.startsWith("/admin/audit-log");

    if (!isAllowedAdminPath) {
      return NextResponse.redirect(new URL("/admin/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
