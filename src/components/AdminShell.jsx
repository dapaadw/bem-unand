"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Building2,
  BookOpen,
  ScrollText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
  GraduationCap,
} from "lucide-react";

const MENU_GROUPS = [
  {
    title: "Ringkasan & Analitik",
    items: [
      {
        path: "/admin",
        name: "Dashboard Overview",
        icon: LayoutDashboard,
        roles: ["ADMIN", "SUPERUSER"],
        badgeKey: null,
      },
    ],
  },
  {
    title: "Manajemen Konten",
    items: [
      {
        path: "/admin/news",
        name: "Publikasi & Berita",
        icon: FileText,
        roles: ["ADMIN"],
        badgeKey: null,
      },
      {
        path: "/admin/kegiatan",
        name: "Agenda & Lomba",
        icon: CalendarDays,
        roles: ["ADMIN"],
        badgeKey: null,
      },
      {
        path: "/admin/fh-guide",
        name: "FH Guide & FAQ",
        icon: BookOpen,
        roles: ["ADMIN"],
        badgeKey: null,
      },
    ],
  },
  {
    title: "Organisasi & Layanan",
    items: [
      {
        path: "/admin/departemen",
        name: "Departemen & Staff",
        icon: Building2,
        roles: ["ADMIN"],
        badgeKey: null,
      },
    ],
  },
  {
    title: "Sistem & Kepatuhan",
    items: [
      {
        path: "/admin/audit-log",
        name: "Audit Trail Sistem",
        icon: ScrollText,
        roles: ["ADMIN", "SUPERUSER"],
        badgeKey: null,
      },
    ],
  },
];

export default function AdminShell({
  children,
  name = "Pengguna",
  role = "ADMIN",
  email = "",
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setIsLoggingOut(false);
    }
  }

  // Active page title and icon
  let currentTitle = "Dashboard Overview";
  let CurrentIcon = LayoutDashboard;
  for (const group of MENU_GROUPS) {
    for (const item of group.items) {
      if (
        pathname === item.path ||
        (item.path !== "/admin" && pathname.startsWith(item.path))
      ) {
        currentTitle = item.name;
        CurrentIcon = item.icon;
        break;
      }
    }
  }

  const isDosen = role === "SUPERUSER";
  const roleDisplayTitle = isDosen ? "Dosen Pembina" : "Administrator BEM";

  // Navigation Component (shared between desktop sidebar and mobile drawer)
  const SidebarContent = ({ onNavigate }) => (
    <div className="flex flex-col h-full bg-[#12050b]/98 backdrop-blur-xl text-white">
      {/* Brand Header */}
      <div className="p-4 lg:p-5 border-b border-[#6d2031]/60 flex items-center justify-between gap-3 bg-gradient-to-r from-[#521526]/80 via-[#1a0a13] to-transparent shrink-0">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon rounded-none p-1"
        >
          <div className="h-10 w-10 rounded-none bg-[#23121b] border border-[#6d2031] flex items-center justify-center p-1.5 shadow-sm group-hover:border-[#e3bbb9] transition-colors shrink-0">
            <img
              src="/logo.png"
              alt="Logo BEM FH UNAND"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-sm tracking-wide text-[#f8f1e7] group-hover:text-brand-neon transition-colors block truncate">
              BEM FH UNAND
            </span>
            <p className="text-[10px] font-semibold text-brand-neon uppercase tracking-widest truncate">
              Admin Portal
            </p>
          </div>
        </Link>

        {/* Mobile close button */}
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            className="p-2 rounded-none text-gray-400 hover:text-white hover:bg-[#23121b] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
            aria-label="Tutup navigasi"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* System Status Banner */}
      <div className="px-4 py-2 border-b border-[#6d2031]/40 bg-[#1a0a13]/70 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-none bg-emerald-400 inline-block shadow-sm animate-pulse" />
          <span className="text-[11px] text-[#d4c0bd]">Sistem:</span>
          <span className="text-[11px] font-medium text-emerald-400">
            Terhubung
          </span>
        </div>
        <span className="text-[10px] font-mono text-brand-neon bg-[#3a0d18] px-2 py-0.5 rounded-none border border-[#6d2031]">
          FH UNAND
        </span>
      </div>

      {/* Vertical Navigation Groups */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-[#6d2031]/40"
        aria-label="Menu Utama Admin"
      >
        {MENU_GROUPS.map((group) => {
          const visibleItems = group.items.filter((item) =>
            item.roles.includes(role),
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1.5">
              <div className="flex items-center justify-between px-3 mb-1">
                <p className="text-[10px] font-bold tracking-widest text-brand-neon/90 uppercase font-mono-lib">
                  {group.title}
                </p>
                <div className="h-px flex-1 ml-2 bg-[#6d2031]/30" />
              </div>

              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.path ||
                    (item.path !== "/admin" && pathname.startsWith(item.path));

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={onNavigate}
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-none text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-neon ${
                        isActive
                          ? "bg-gradient-to-r from-[#9e1c38]/70 to-[#521526]/50 text-[#f8f1e7] font-semibold border-l-2 border-l-[#e3bbb9] border-[#6d2031] shadow-sm"
                          : "text-[#d4c0bd] hover:text-[#f8f1e7] hover:bg-[#23121b] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-none transition-colors ${
                            isActive
                              ? "bg-[#521526] text-brand-neon"
                              : "text-gray-400 group-hover:text-white group-hover:bg-[#23121b]"
                          }`}
                        >
                          <Icon size={16} aria-hidden="true" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User Info & Actions Footer */}
      <div className="p-3 border-t border-[#6d2031]/60 bg-[#0e0409] space-y-2.5 shrink-0">
        <div className="p-2.5 rounded-none bg-[#1a1517] border border-[#6d2031]/70 flex items-center gap-3">
          <div
            className={`h-9 w-9 rounded-none flex items-center justify-center font-bold text-sm shrink-0 border ${
              isDosen
                ? "bg-gradient-to-br from-amber-700 to-[#1a0a13] text-amber-200 border-amber-500/40"
                : "bg-gradient-to-br from-[#9e1c38] to-[#1a0a13] text-[#f8f1e7] border-[#6d2031]"
            }`}
          >
            {isDosen ? (
              <GraduationCap size={18} aria-hidden="true" />
            ) : name ? (
              name.charAt(0).toUpperCase()
            ) : (
              "A"
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-xs font-semibold text-[#f8f1e7] truncate"
              title={name}
            >
              {name}
            </p>
            {email ? (
              <p
                className="text-[10px] text-[#d4c0bd]/70 truncate font-mono"
                title={email}
              >
                {email}
              </p>
            ) : null}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-none ${
                  isDosen ? "bg-amber-400" : "bg-brand-neon"
                }`}
              />
              <span
                className={`text-[10px] font-semibold tracking-wider uppercase truncate ${
                  isDosen ? "text-amber-300" : "text-brand-neon"
                }`}
              >
                {roleDisplayTitle}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-[#f8f1e7] hover:bg-[#2c1d24] rounded-none transition-colors border border-[#6d2031] bg-[#1d151a]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-neon"
            title="Buka Website Publik BEM FH UNAND di tab baru"
          >
            <ExternalLink
              size={13}
              className="text-brand-neon"
              aria-hidden="true"
            />
            <span>Web Publik</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-rose-200 hover:bg-[#521526] rounded-none transition-colors border border-[#9e1c38]/60 bg-[#3a0d18] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
            title="Keluar dari sesi admin"
          >
            <LogOut size={13} aria-hidden="true" />
            <span>{isLoggingOut ? "Keluar..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-portal min-h-screen bg-[#0e0409] flex text-[#f8f1e7] font-sans selection:bg-brand-neon selection:text-brand-dark antialiased overflow-hidden">
      {/* Desktop Persistent Left Sidebar (Vertical Layout) */}
      <aside
        className="w-64 lg:w-72 bg-[#14060e] border-r border-[#6d2031]/60 flex-col hidden md:flex shrink-0 z-30 h-screen"
        aria-label="Sidebar Navigasi Admin"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sheet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi Menu Mobile"
        >
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#14060e] border-r border-[#6d2031] shadow-2xl flex flex-col z-10 h-full">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative bg-[#0e0409]">
        {/* Fixed Ambient Background Canvas matching home page */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[#0e0409] overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-radial-1 opacity-90" />
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-brand-neon/10 blur-[130px] rounded-none" />
          <div className="absolute -bottom-36 right-0 w-[580px] h-[380px] bg-[#9e1c38]/20 blur-[140px] rounded-none" />
        </div>

        {/* Top Header Bar */}
        <header className="relative h-16 px-4 md:px-8 bg-[#14060e]/90 backdrop-blur-md border-b border-[#6d2031]/60 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-none text-gray-300 hover:text-white hover:bg-[#23121b] md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-neon"
              aria-label="Buka menu navigasi"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb Trail */}
            <nav
              className="flex items-center gap-2 text-xs"
              aria-label="Breadcrumb"
            >
              <span className="text-[#d4c0bd] font-medium hidden sm:inline">
                Admin Portal
              </span>
              <ChevronRight
                size={14}
                className="text-[#6d2031] hidden sm:inline"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#1a1517] border border-[#6d2031] text-[#f8f1e7] font-semibold">
                <CurrentIcon
                  size={14}
                  className="text-brand-neon"
                  aria-hidden="true"
                />
                <span>{currentTitle}</span>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Faculty Advisor / Admin Role Pill */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-none border text-[11px] ${
                isDosen
                  ? "bg-amber-950/40 border-amber-600/40 text-amber-200"
                  : "bg-[#1a1517] border-[#6d2031] text-[#d4c0bd]"
              }`}
            >
              {isDosen ? (
                <GraduationCap
                  size={13}
                  className="text-amber-400"
                  aria-hidden="true"
                />
              ) : (
                <Shield
                  size={13}
                  className="text-brand-neon"
                  aria-hidden="true"
                />
              )}
              <span className="font-medium text-[#f8f1e7]">{roleDisplayTitle}</span>
              <span className="text-[#6d2031]">·</span>
              <span className="text-[#d4c0bd]/80 font-mono text-[10px]">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Scroll Area */}
        <main
          role="main"
          className="relative z-10 flex-1 overflow-y-auto overscroll-y-contain p-4 md:p-8 pb-28 scroll-smooth bg-transparent scrollbar-thin scrollbar-thumb-[#6d2031]/40 hover:scrollbar-thumb-brand-neon/30"
        >
          <div className="max-w-7xl mx-auto w-full space-y-6 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
