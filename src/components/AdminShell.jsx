"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Building2,
  MessageSquareWarning,
  BookOpen,
  ScrollText,
  Sliders,
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
        path: "/admin/aspirasi",
        name: "Aspirasi Mahasiswa",
        icon: MessageSquareWarning,
        roles: ["ADMIN"],
        badgeKey: "aspirasi",
      },
      {
        path: "/admin/departemen",
        name: "Departemen & Staff",
        icon: Building2,
        roles: ["ADMIN"],
        badgeKey: null,
      },
      {
        path: "/admin/home",
        name: "Pengaturan Web",
        icon: Sliders,
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
  unreadAspirasi = 0,
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
    <div className="flex flex-col h-full bg-brand-dark/95 backdrop-blur-xl text-white">
      {/* Brand Header */}
      <div className="p-4 lg:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-gradient-to-r from-brand-red/30 via-brand-dark to-transparent shrink-0">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon rounded-xl p-1"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-red to-brand-dark border border-brand-neon/40 flex items-center justify-center p-1.5 shadow-sm group-hover:border-brand-neon transition-colors shrink-0">
            <img
              src="/logo.png"
              alt="Logo BEM FH UNAND"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-sm tracking-wide text-white group-hover:text-brand-neon transition-colors block truncate">
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
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
            aria-label="Tutup navigasi"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* System Status Banner */}
      <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block shadow-sm animate-pulse" />
          <span className="text-[11px] text-gray-400">Sistem:</span>
          <span className="text-[11px] font-medium text-emerald-400">
            Terhubung
          </span>
        </div>
        <span className="text-[10px] font-mono text-brand-neon/90 bg-brand-neon/10 px-2 py-0.5 rounded border border-brand-neon/20">
          FH UNAND
        </span>
      </div>

      {/* Vertical Navigation Groups */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10"
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
                <p className="text-[10px] font-bold tracking-widest text-brand-neon/80 uppercase">
                  {group.title}
                </p>
                <div className="h-px flex-1 ml-2 bg-white/5" />
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
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon ${
                        isActive
                          ? "bg-gradient-to-r from-brand-red/60 to-brand-neon/15 text-white font-semibold border border-brand-neon/40 shadow-sm"
                          : "text-gray-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isActive
                              ? "bg-brand-neon/20 text-brand-neon"
                              : "text-gray-400 group-hover:text-white group-hover:bg-white/5"
                          }`}
                        >
                          <Icon size={16} aria-hidden="true" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>

                      {item.badgeKey === "aspirasi" && unreadAspirasi > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-neon text-brand-dark shadow-sm">
                          {unreadAspirasi} Baru
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User Info & Actions Footer */}
      <div className="p-3 border-t border-white/10 bg-black/40 space-y-2.5 shrink-0">
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
              isDosen
                ? "bg-gradient-to-br from-amber-600 to-brand-dark text-amber-200 border-amber-400/40"
                : "bg-gradient-to-br from-brand-red to-brand-dark text-brand-neon border-brand-neon/40"
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
              className="text-xs font-semibold text-white truncate"
              title={name}
            >
              {name}
            </p>
            {email ? (
              <p
                className="text-[10px] text-gray-400 truncate font-mono"
                title={email}
              >
                {email}
              </p>
            ) : null}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
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
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
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
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-900/40 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
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
    <div className="min-h-screen bg-brand-dark flex text-white font-sans selection:bg-brand-neon selection:text-brand-dark antialiased overflow-hidden">
      {/* Desktop Persistent Left Sidebar (Vertical Layout) */}
      <aside
        className="w-64 lg:w-72 bg-black/50 border-r border-white/10 flex-col hidden md:flex shrink-0 z-30 h-screen"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85vw] bg-brand-dark border-r border-white/10 shadow-2xl flex flex-col z-10 h-full">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative bg-brand-dark">
        {/* Fixed Ambient Background Canvas */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-brand-dark overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-radial-1 opacity-95" />
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-brand-neon/10 blur-[130px] rounded-full" />
          <div className="absolute -bottom-36 right-0 w-[580px] h-[380px] bg-brand-red/25 blur-[140px] rounded-full" />
        </div>

        {/* Top Header Bar */}
        <header className="relative h-16 px-4 md:px-8 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
              aria-label="Buka menu navigasi"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb Trail */}
            <nav
              className="flex items-center gap-2 text-xs"
              aria-label="Breadcrumb"
            >
              <span className="text-gray-400 font-medium hidden sm:inline">
                Admin Portal
              </span>
              <ChevronRight
                size={14}
                className="text-gray-500 hidden sm:inline"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-semibold">
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
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] ${
                isDosen
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                  : "bg-white/[0.04] border-white/10 text-gray-300"
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
              <span className="font-medium">{roleDisplayTitle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-400 font-mono text-[10px]">
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
          className="relative z-10 flex-1 overflow-y-auto overscroll-y-contain p-4 md:p-8 pb-28 scroll-smooth bg-transparent scrollbar-thin scrollbar-thumb-white/15 hover:scrollbar-thumb-brand-neon/30"
        >
          <div className="max-w-7xl mx-auto w-full space-y-6 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
