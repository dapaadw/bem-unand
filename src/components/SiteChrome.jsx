'use client';

import { usePathname } from 'next/navigation';
import SiteNav from './SiteNav';
import BackgroundWatermark from './BackgroundWatermark';

export default function SiteChrome({ children, footer }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  const isHome = pathname === '/';

  return (
    <>
      <SiteNav />
      <main className="flex-grow relative overflow-hidden bg-finall-canvas text-[#f8f1e7]">
        <BackgroundWatermark isHome={isHome} />
        <div className="relative z-10">{children}</div>
      </main>
      {footer}
    </>
  );
}
