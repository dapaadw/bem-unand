'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  FileText,
  CalendarDays,
  Building2,
  MessageSquareWarning,
  BookOpen,
  ScrollText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const MENU_GROUPS = [
  {
    title: 'UTAMA',
    items: [
      { path: '/admin', name: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'SUPERUSER'] },
    ],
  },
  {
    title: 'MANAJEMEN KONTEN',
    items: [
      { path: '/admin/news', name: 'Publikasi & Berita', icon: FileText, roles: ['ADMIN'] },
      { path: '/admin/kegiatan', name: 'Kegiatan & Lomba', icon: CalendarDays, roles: ['ADMIN'] },
      { path: '/admin/departemen', name: 'Departemen & Biro', icon: Building2, roles: ['ADMIN'] },
      { path: '/admin/fh-guide', name: 'FH Guide', icon: BookOpen, roles: ['ADMIN'] },
      { path: '/admin/home', name: 'Pengaturan Beranda', icon: Home, roles: ['ADMIN'] },
    ],
  },
  {
    title: 'LAYANAN & SISTEM',
    items: [
      { path: '/admin/aspirasi', name: 'Aspirasi Mahasiswa', icon: MessageSquareWarning, roles: ['ADMIN'], badgeKey: 'aspirasi' },
      { path: '/admin/audit-log', name: 'Audit Log & Keamanan', icon: ScrollText, roles: ['ADMIN', 'SUPERUSER'] },
    ],
  },
];

const ROUTE_LABELS = {
  '/admin': 'Dashboard Overview',
  '/admin/news': 'Manajemen Publikasi & Berita',
  '/admin/kegiatan': 'Manajemen Kegiatan & Lomba',
  '/admin/departemen': 'Struktur & Staf Departemen',
  '/admin/fh-guide': 'Pusat Informasi & FAQ FH Guide',
  '/admin/home': 'Konfigurasi Profil Beranda',
  '/admin/aspirasi': 'Pusat Aspirasi & Masukan Mahasiswa',
  '/admin/audit-log': 'Rekam Jejak Sistem & Audit Log',
};

export default function AdminShell({ children, name, role, unreadAspirasi = 0 }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const currentTitle = ROUTE_LABELS[pathname] || 'Admin Workspace';
  const activeMenuItem = MENU_GROUPS.flatMap((group) => group.items).find((item) =>
    item.path === pathname || (item.path !== '/admin' && pathname.startsWith(item.path))
  );
  const CurrentIcon = activeMenuItem?.icon || Sparkles;

  // Flat menu items for mobile dropdown
  const menuItems = MENU_GROUPS.flatMap((group) => group.items).filter((item) => item.roles.includes(role));

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-red to-black p-1 border border-brand-neon/30 flex items-center justify-center shadow-[0_0_15px_rgba(142,22,22,0.5)] group-hover:border-brand-neon/70 transition-all">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-white">BEM FH UNAND</span>
              
            </div>
            <p className="text-[11px] text-gray-400 font-mono tracking-tight">Admin Console</p>
          </div>
        </Link>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 md:hidden"
            aria-label="Tutup Menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
        {MENU_GROUPS.map((group) => {
          const visibleItems = group.items.filter((item) => item.roles.includes(role));
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1">
              <p className="px-3 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                {group.title}
              </p>
              <div className="space-y-1 mt-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-red/50 to-brand-neon/15 text-brand-neon border border-brand-neon/40 shadow-[0_0_20px_rgba(254,174,174,0.12)]'
                          : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-brand-neon/20 text-brand-neon shadow-[0_0_8px_rgba(254,174,174,0.4)]'
                              : 'text-zinc-400 group-hover:text-zinc-200 group-hover:bg-white/5'
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>

                      {item.badgeKey === 'aspirasi' && unreadAspirasi > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)] animate-pulse">
                          {unreadAspirasi}
                        </span>
                      )}

                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand-neon shadow-[0_0_8px_#FEAEAE]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Admin Profile & Actions */}
      <div className="p-3 border-t border-white/10 bg-black/30 space-y-2">
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-red to-zinc-900 border border-brand-neon/30 flex items-center justify-center font-bold text-sm text-brand-neon shadow-[0_0_10px_rgba(142,22,22,0.4)]">
            {name ? name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="text-[10px] text-zinc-400 font-medium tracking-tight uppercase">
                {role}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/5"
            title="Buka Web Publik"
          >
            <ExternalLink size={13} />
            <span>Web</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/10"
            title="Keluar dari Admin Panel"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark flex text-white font-sans selection:bg-brand-neon selection:text-brand-dark antialiased">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 flex-col hidden md:flex shrink-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-zinc-950 border-r border-white/10 shadow-2xl flex flex-col z-10">
            <NavContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 px-4 md:px-8 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 md:hidden focus:outline-none focus:ring-2 focus:ring-brand-neon"
              aria-label="Buka Menu"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-300 font-medium hidden sm:inline">Admin</span>
              <ChevronRight size={14} className="text-zinc-400 hidden sm:inline" />
              <span className="text-brand-neon font-semibold flex items-center gap-1.5">
                <CurrentIcon size={13} className="text-brand-neon animate-pulse" />
                {currentTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Sesi Aman</span>
              <span className="text-zinc-400">·</span>
              <span className="font-mono text-zinc-200">{role}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-200 border border-white/10 transition-colors"
            >
              <ExternalLink size={13} className="text-brand-neon" />
              <span className="hidden sm:inline">Lihat Web</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-radial-1 scrollbar-thin scrollbar-thumb-white/10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
