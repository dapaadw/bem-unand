import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./src/lib/session.js";

const ADMIN_ALLOWED_PREFIXES = [
  "/admin/news",
  "/admin/kegiatan",
  "/admin/audit-log",
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession(request, response, sessionOptions);

  if (!session.userId) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Admin hanya dapat mengakses dashboard (/admin), publikasi (/admin/news), agenda (/admin/kegiatan), dan audit trail (/admin/audit-log)
  if (session.role === "ADMIN") {
    const isDashboardRoot = pathname === "/admin" || pathname === "/admin/";
    const isAllowedAdminPath =
      isDashboardRoot ||
      ADMIN_ALLOWED_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
      );

    if (!isAllowedAdminPath) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
