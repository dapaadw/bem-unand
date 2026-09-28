'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, CalendarDays, Building2, MessageSquareWarning, BookOpen, ScrollText, LogOut } from 'lucide-react';

export default function AdminShell({ children, name, role }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'SUPERUSER'] },
    { path: '/admin/news', name: 'Manajemen Berita', icon: <FileText size={20} />, roles: ['ADMIN'] },
    { path: '/admin/kegiatan', name: 'Kegiatan & Lomba', icon: <CalendarDays size={20} />, roles: ['ADMIN'] },
    { path: '/admin/departemen', name: 'Departemen', icon: <Building2 size={20} />, roles: ['ADMIN'] },
    { path: '/admin/aspirasi', name: 'Aspirasi', icon: <MessageSquareWarning size={20} />, roles: ['ADMIN'] },
    { path: '/admin/fh-guide', name: 'FH Guide', icon: <BookOpen size={20} />, roles: ['ADMIN'] },
    { path: '/admin/audit-log', name: 'Audit Log', icon: <ScrollText size={20} />, roles: ['ADMIN', 'SUPERUSER'] },
  ].filter((item) => item.roles.includes(role));

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-brand-dark flex text-white font-sans selection:bg-brand-neon selection:text-brand-dark">
      <aside className="w-64 bg-black/50 border-r border-white/10 flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="h-8 w-auto flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain rounded-sm" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-brand-neon tracking-wider">ADMIN PANEL</h2>
            <p className="text-xs text-gray-400">{name} &middot; {role}</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === item.path
                  ? 'bg-brand-neon/20 text-brand-neon font-bold border border-brand-neon/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <span>Ke Web Publik</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 flex flex-col h-screen overflow-hidden">
        <header className="md:hidden bg-black/50 border-b border-white/10 p-4 flex justify-between items-center">
          <h2 className="font-bold text-brand-neon">ADMIN PANEL</h2>
          <button onClick={handleLogout} className="text-sm text-gray-400">Logout</button>
        </header>
        <nav className="md:hidden p-4 bg-black/50" aria-label="Menu admin mobile">
          <label className="block text-sm">Menu admin
            <select value={pathname} onChange={(e) => router.push(e.target.value)} className="mt-1 w-full rounded-lg bg-brand-dark border border-white/20 p-2">
              {menuItems.map((item) => <option key={item.path} value={item.path}>{item.name}</option>)}
            </select>
          </label>
          <Link href="/" className="inline-block mt-2 text-sm text-brand-neon">Ke Web Publik</Link>
        </nav>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gradient-radial-1">
          {children}
        </div>
      </main>
    </div>
  );
}
