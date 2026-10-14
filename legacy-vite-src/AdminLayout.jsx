import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';

function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/news', name: 'Manajemen Berita', icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex text-white font-sans selection:bg-brand-neon selection:text-brand-dark">
      {/* Sidebar */}
      <aside className="w-64 bg-black/50 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="h-8 w-auto flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain rounded-sm" />
          </div>
          <h2 className="font-bold text-lg text-brand-neon tracking-wider">ADMIN PANEL</h2>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === item.path 
                  ? 'bg-brand-neon/20 text-brand-neon font-bold border border-brand-neon/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <LogOut size={20} />
            <span>Ke Web Publik</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar for Mobile */}
        <header className="md:hidden bg-black/50 border-b border-white/10 p-4 flex justify-between items-center">
          <h2 className="font-bold text-brand-neon">ADMIN PANEL</h2>
          <Link to="/" className="text-sm text-gray-400">Ke Web Publik</Link>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gradient-radial-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
