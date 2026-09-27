'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Publikasi', href: '/publikasi' },
  { name: 'Kegiatan', href: '/kegiatan' },
  { name: 'Departemen', href: '/departemen' },
  { name: 'Aspirasi', href: '/aspirasi' },
  { name: 'FH Guide', href: '/fh-guide' },
];

export default function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg shadow-black/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-radial-1 flex items-center justify-center overflow-hidden border border-white/20 group-hover:border-brand-neon transition-colors duration-300">
            <img src="/logo.png" alt="Logo BEM FH UNAND" className="w-full h-full object-cover p-1" />
          </div>
          <h1 className="text-xl font-bold tracking-wider group-hover:text-neon transition-all">BEM FH UNAND</h1>
        </Link>

        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-brand-neon hover:scale-105 transition-all duration-200 ${pathname === link.href ? 'text-brand-neon' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/#kontak" className="px-5 py-2 rounded-full border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(254,174,174,0.3)] hover:shadow-[0_0_20px_rgba(254,174,174,0.6)]">
            Hubungi Kami
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-brand-neon hover:text-brand-dark text-gray-200 text-sm font-medium transition-all duration-200 border border-white/10 hover:border-brand-neon"
            title="Admin Panel"
          >
            <Shield size={16} />
            <span>Admin</span>
          </Link>
        </div>

        <button aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={mobileMenuOpen} className="xl:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-lg font-medium transition-colors ${pathname === link.href ? 'text-brand-neon' : 'text-gray-300 hover:text-brand-neon'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/#kontak" onClick={() => setMobileMenuOpen(false)} className="text-lg text-brand-neon">Hubungi Kami</Link>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 mt-2 py-2.5 rounded-xl bg-brand-neon/10 border border-brand-neon/30 text-brand-neon font-medium"
          >
            <Shield size={18} />
            <span>Admin Panel</span>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
