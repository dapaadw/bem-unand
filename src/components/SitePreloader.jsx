"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import AnimatedEmblem from "./emblem/AnimatedEmblem";

// Suppress the development-only Framer Motion reduced-motion warning in the browser console.
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV !== "production" &&
  !window.__bemPreloaderWarnPatched
) {
  window.__bemPreloaderWarnPatched = true;
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Reduced Motion enabled on your device")
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

// In-memory flag across client-side navigation within the tab
let hasPlayedInTab = false;

export default function SitePreloader() {
  const [isVisible, setIsVisible] = useState(() => !hasPlayedInTab);
  const [isShifted, setIsShifted] = useState(false);

  const lockAppliedRef = useRef(false);
  const cleanupFnRef = useRef(null);

  const releaseLock = useCallback(() => {
    if (typeof window === "undefined" || !lockAppliedRef.current) return;
    lockAppliedRef.current = false;

    document.documentElement.classList.remove("preloader-lock");
    document.body.classList.remove("preloader-lock");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    if (cleanupFnRef.current) {
      cleanupFnRef.current();
      cleanupFnRef.current = null;
    }
  }, []);

  const applyLock = useCallback(() => {
    if (typeof window === "undefined" || lockAppliedRef.current) return;
    lockAppliedRef.current = true;

    document.documentElement.classList.add("preloader-lock");
    document.body.classList.add("preloader-lock");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const preventDefault = (e) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e) => {
      if (e.key === "Escape") return;
      const scrollKeys = [
        " ",
        "Space",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (scrollKeys.includes(e.key) || scrollKeys.includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, { passive: false });

    cleanupFnRef.current = () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, []);

  const handleDismiss = useCallback(() => {
    hasPlayedInTab = true;
    setIsVisible(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    releaseLock();
  }, [releaseLock]);

  useEffect(() => {
    if (!isVisible) {
      hasPlayedInTab = true;
      releaseLock();
      return;
    }

    applyLock();

    // Phase 1: Emblem draws centered for ~1.0s.
    // Phase 2: Emblem translates left and "AKSARA JUANG" wipes from left to right.
    const shiftTimer = setTimeout(() => {
      setIsShifted(true);
    }, 1000);

    // Phase 3: Curtain slides up to reveal the main site.
    const holdTimer = setTimeout(() => {
      handleDismiss();
    }, 2900);

    // Safety fallback: Unconditionally release locks after 4.5s
    const safetyTimer = setTimeout(() => {
      releaseLock();
    }, 4500);

    return () => {
      clearTimeout(shiftTimer);
      clearTimeout(holdTimer);
      clearTimeout(safetyTimer);
      releaseLock();
    };
  }, [isVisible, handleDismiss, applyLock, releaseLock]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleDismiss]);

  return (
    <MotionConfig reducedMotion="never">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isVisible && (
          <motion.div
            key="bem-fh-unand-preloader"
            role="dialog"
            aria-modal="true"
            aria-label="Pembuka portal resmi BEM FH UNAND"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark text-brand-ivory px-4 sm:px-6 overflow-hidden select-none"
          >
            {/* Central Stage: Logo starts centered, shifts left, text wipes in on right */}
            <motion.div
              exit={{
                y: -28,
                opacity: 0,
                transition: {
                  duration: 0.35,
                  ease: [0.33, 1, 0.68, 1],
                },
              }}
              className="relative flex flex-row items-center justify-center max-w-full"
            >
              {/* Emblem Logo: starts centered, glides left seamlessly as right box expands */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <AnimatedEmblem className="w-16 h-16 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-[0_0_24px_rgba(200,40,63,0.3)]" />
              </div>

              {/* Vertical Accent Line and Wiped Text Box */}
              <motion.div
                initial={false}
                animate={{
                  width: isShifted ? "auto" : 0,
                  opacity: isShifted ? 1 : 0,
                }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex items-center"
              >
                {/* Vertical Divider Accent: perfectly centered on the same axis */}
                <motion.div
                  initial={false}
                  animate={{ scaleY: isShifted ? 1 : 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-[2px] h-12 sm:h-10 md:h-24 bg-gradient-to-b from-brand-red/10 via-brand-red to-brand-red/10 ml-3 sm:ml-5 mr-3 sm:mr-5 flex-shrink-0 origin-center"
                />

                {/* Text Block: AKSARA JUANG centered dead-on with the logo */}
                <div className="relative overflow-hidden flex items-center py-1 pr-2">
                  <motion.div
                    initial={false}
                    animate={{
                      clipPath: isShifted
                        ? "inset(0% 0% 0% 0%)"
                        : "inset(0% 100% 0% 0%)",
                      opacity: isShifted ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center text-left whitespace-nowrap select-none"
                  >
                    <h1 className="font-dm font-black text-2xl sm:text-3xl md:text-6xl tracking-[0.14em] uppercase text-brand-white leading-none flex items-center">
                      AKSARA JUANG
                    </h1>
                  </motion.div>

                  {/* Left-to-right sweep shimmer accent line */}
                  <motion.div
                    initial={false}
                    animate={
                      isShifted
                        ? { left: ["0%", "100%"], opacity: [0, 1, 0] }
                        : { left: "0%", opacity: 0 }
                    }
                    transition={{
                      duration: 0.7,
                      delay: 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-brand-neon to-transparent pointer-events-none"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Screen reader notification */}
            <span className="sr-only" role="status" aria-live="polite">
              Memuat portal resmi BEM FH UNAND, Kabinet Aksara Juang
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
