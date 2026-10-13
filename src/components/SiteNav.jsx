'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Publikasi', href: '/publikasi' },
  { name: 'Kegiatan', href: '/kegiatan' },
  { name: 'Departemen', href: '/departemen' },
  { name: 'FH Guide', href: '/fh-guide' },
  { name: 'Aspirasi', href: 'https://forms.google.com', external: true },
];

export default function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? 'bg-[#14080a]/95 backdrop-blur-md shadow-lg shadow-black/50 border-white/10 py-3'
          : 'bg-[#14080a]/90 backdrop-blur-sm border-white/10 py-4'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Logo BEM FH UNAND" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-wider text-[#f7f2e3] font-montserrat leading-tight">
              BEM FH UNAND
            </h1>
            <p className="text-[11px] text-[#c5b8b8] leading-none mt-0.5">
              Fakultas Hukum &middot; Universitas Andalas
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#f7f2e3] font-semibold'
                      : 'text-[#c5b8b8] hover:text-[#f7f2e3]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f7f2e3]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <Link
            href="/#kontak"
            className="px-4 py-2 rounded bg-[#4a0d13] hover:bg-[#60111a] border border-[#6b141d] text-[#f7f2e3] font-medium text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm"
          >
            <span>Hubungi Kami</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Animated Hamburger Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden relative w-10 h-10 rounded bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 flex flex-col justify-center items-center gap-1.5 transition-all duration-200 focus:outline-none cursor-pointer"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-5 h-0.5 bg-white rounded-full origin-center"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-white rounded-full origin-center"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-5 h-0.5 bg-white rounded-full origin-center"
          />
        </button>
      </div>

      {/* Fluid Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Soft backdrop overlay */}
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="xl:hidden fixed inset-0 top-0 bg-black/60 backdrop-blur-sm -z-10"
              aria-hidden="true"
            />

            {/* Fluid dropdown panel */}
            <motion.div
              key="mobile-nav-panel"
              initial={{ opacity: 0, y: -16, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -16, scaleY: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden absolute top-full left-0 w-full bg-[#14080a]/98 backdrop-blur-2xl border-t border-b border-[#f7f2e3]/10 px-6 py-6 flex flex-col gap-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] origin-top"
            >
              {navLinks.map((link, idx) => {
                const isActive = !link.external && pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.04 + idx * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between px-4 py-3 rounded text-base font-semibold font-sans transition-colors duration-200 ${
                        isActive
                          ? 'text-[#f7f2e3] bg-[#30050d] border border-[#4d0d12]'
                          : 'text-[#c5b8b8] hover:text-[#f7f2e3] hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs tracking-wider opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold">
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.04 + navLinks.length * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-3 border-t border-[#f7f2e3]/10 mt-2"
              >
                <Link
                  href="/#kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-5 rounded bg-[#4a0d13] hover:bg-[#60111a] border border-[#6b141d] text-[#f7f2e3] font-semibold text-center block transition-all duration-200 shadow-lg shadow-black/40 flex items-center justify-center gap-2"
                >
                  <span>Hubungi Kami</span>
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
