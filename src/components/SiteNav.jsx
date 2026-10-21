"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Publikasi", href: "/publikasi" },
  { name: "Kegiatan", href: "/kegiatan" },
  { name: "Departemen", href: "/departemen" },
  { name: "FH Guide", href: "/fh-guide" },
  { name: "Aspirasi", href: "https://forms.google.com", external: true },
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-[height,background-color,border-color,box-shadow,backdrop-filter] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "h-[68px] sm:h-[80px] bg-[#161013]/92 backdrop-blur-md border-b border-[#e3bbb9]/15 shadow-xl shadow-black/30"
          : "h-[80px] sm:h-[86px] bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div
        className={`w-full mx-auto h-full flex justify-between items-center transition-[max-width,padding] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "max-w-[1520px] px-6 lg:px-12"
            : "max-w-[1160px] px-5 sm:px-6 lg:px-8"
        }`}
      >
        {/* Left: Logo & Organization Identity (Node 100:1289) */}
        <Link
          href="/"
          className="flex items-center gap-3.5 cursor-pointer group shrink-0"
        >
          <div className="w-[46px] h-[39px] sm:w-[52px] sm:h-[44px] transition-all duration-300 rounded-[4px] flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo BEM FH UNAND"
              className="w-full h-full object-contain grayscale brightness-150 contrast-125 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-barlow font-bold text-[18px] sm:text-[20px] leading-[21.25px] tracking-[2px] uppercase text-[#f8f1e7] transition-colors duration-200">
              BEM FH UNAND
            </span>
            <span className="font-dm font-medium text-[10px] sm:text-[11px] leading-[15px] sm:leading-[16.5px] tracking-[1.4px] uppercase text-[#f8f1e7]/65 mt-0.5">
              Fakultas Hukum &middot; Universitas Andalas
            </span>
          </div>
        </Link>

        {/* Center: Primary Navigation Links (Node 100:1300) */}
        <div className="hidden xl:flex items-center gap-8">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`relative py-1 font-dm text-[14px] leading-[21px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#f8f1e7]"
                      : "text-[#f8f1e7]/75 hover:text-[#f8f1e7]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#e3bbb9]"
                      transition={{
                        type: "tween",
                        ease: [0.22, 1, 0.36, 1],
                        duration: 0.25,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Action Button (Node 100:1311) */}
          <Link
            href="/#kontak"
            className="w-[142px] h-[40px] rounded-[4px] bg-[#8f1b34]/90 hover:bg-[#a8203d] border border-[#e3bbb9]/30 text-[#f8f1e7] font-dm font-semibold text-[13px] leading-[20px] tracking-[0.65px] uppercase transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            HUBUNGI KAMI
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden relative w-10 h-10 rounded-[4px] bg-[#1a1517]/80 hover:bg-[#241b1e] active:scale-95 border border-[#e3bbb9]/20 flex flex-col justify-center items-center gap-1.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#e3bbb9] cursor-pointer"
        >
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-5 h-0.5 bg-[#f8f1e7] rounded-full origin-center"
          />
          <motion.span
            animate={
              mobileMenuOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-[#f8f1e7] rounded-full origin-center"
          />
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-5 h-0.5 bg-[#f8f1e7] rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              aria-hidden="true"
            />

            <motion.div
              key="mobile-nav-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden absolute top-full left-0 w-full bg-[#1a1214]/98 backdrop-blur-xl border-b border-[#e3bbb9]/15 px-6 py-6 flex flex-col gap-2 shadow-2xl"
            >
              {navLinks.map((link) => {
                const isActive = !link.external && pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-[4px] font-dm text-[15px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[#f8f1e7] bg-[#671c2d]/40 border border-[#e3bbb9]/25"
                        : "text-[#f8f1e7]/75 hover:text-[#f8f1e7] hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-[#e3bbb9]/12 mt-2">
                <Link
                  href="/#kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-5 rounded-[4px] bg-[#671c2d]/90 hover:bg-[#7c2236] border border-[#e3bbb9]/30 text-[#f8f1e7] font-dm font-semibold text-[13px] tracking-[0.65px] uppercase text-center flex items-center justify-center transition-all duration-200"
                >
                  HUBUNGI KAMI
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
