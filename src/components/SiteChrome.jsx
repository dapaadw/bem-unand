'use client';

import { usePathname } from 'next/navigation';
import SiteNav from './SiteNav';
import BackgroundWatermark from './BackgroundWatermark';
import SitePreloader from './SitePreloader';

export default function SiteChrome({ children, footer }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isHome = pathname === '/';
  const isPresidium = pathname === '/struktur/presidium';

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {isHome && <SitePreloader />}
      <SiteNav />
      <main className="flex-grow relative overflow-hidden bg-[#050103] text-[#f8f1e7]">
        {/* Document-anchored Background Canvas: Spans naturally across the page, scrolls with content, and never shifts on dropdown */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none bg-finall-canvas z-0 ${
            isHome
              ? 'bg-canvas-home'
              : isPresidium
              ? 'bg-canvas-presidium'
              : 'bg-canvas-subpage'
          }`}
        />

        <BackgroundWatermark isHome={isHome} />
        <div className="relative z-10">{children}</div>
      </main>
      {footer}
    </>
  );
}
