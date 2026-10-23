'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
        isScrolled
          ? 'bg-[#1a0a13]/90 backdrop-blur-md shadow-xl shadow-black/40 border-white/10 py-3 sm:py-3.5'
          : 'bg-transparent border-transparent py-5 sm:py-6'
      }`}
    >
      <div
        className={`w-full mx-auto flex justify-between items-center transition-[max-width,padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-[1520px] px-6 lg:px-12'
            : 'max-w-[1160px] px-5 sm:px-6 lg:px-8'
        }`}
      >
        {/* Left: Logo & Organization Identity */}
        <Link href="/" className="flex items-center gap-3.5 cursor-pointer group shrink-0">
          <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="Logo BEM FH UNAND"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg sm:text-xl font-bold tracking-wider group-hover:text-brand-neon transition-colors font-montserrat text-white leading-tight">
              BEM <span className="font-montserrat">FH UNAND</span>
            </h1>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[1.2px] uppercase text-gray-400 font-sans leading-tight mt-0.5">
              Fakultas Hukum &middot; Universitas Andalas
            </span>
          </div>
        </Link>

        {/* Center/Right: Desktop Navigation Links with Animated Layout Pill */}
        <div className="hidden xl:flex items-center gap-1.5 relative">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-bold font-sans transition-colors duration-300 flex items-center justify-center ${
                    isActive
                      ? 'text-brand-neon'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-brand-neon/30 shadow-[0_0_15px_rgba(254,174,174,0.2)] -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/#kontak"
            className="ml-3 px-5 py-2 rounded-full border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-bold font-sans text-sm transition-all duration-300 shadow-[0_0_10px_rgba(254,174,174,0.3)] hover:shadow-[0_0_20px_rgba(254,174,174,0.6)] hover:scale-105"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Animated Hamburger Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden relative w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 flex flex-col justify-center items-center gap-1.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-neon/50 cursor-pointer"
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

      {/* Smooth Subpage Route Transition Beam */}
      <motion.div
        key={pathname}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-neon to-transparent shadow-[0_0_10px_rgba(254,174,174,0.7)] origin-left pointer-events-none"
      />

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
              className="xl:hidden absolute top-full left-0 w-full bg-[#1a0a13]/95 backdrop-blur-2xl border-t border-b border-white/10 px-6 py-6 flex flex-col gap-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] origin-top"
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
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold font-sans transition-all duration-200 ${
                        isActive
                          ? 'text-brand-neon bg-[#23121b]/60 border border-brand-neon/25 shadow-sm'
                          : 'text-gray-200 hover:text-brand-neon hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs tracking-wider opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold text-brand-neon">
                        &rarr;
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
                className="pt-3 border-t border-white/10 mt-2"
              >
                <Link
                  href="/#kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-5 rounded-full border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-bold font-sans text-center block transition-all duration-300 shadow-[0_0_15px_rgba(254,174,174,0.25)] hover:shadow-[0_0_20px_rgba(254,174,174,0.5)]"
                >
                  Hubungi Kami
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
