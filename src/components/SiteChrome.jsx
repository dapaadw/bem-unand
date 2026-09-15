'use client';

import { usePathname } from 'next/navigation';
import SiteNav from './SiteNav';

export default function SiteChrome({ children, footer }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNav />
      <main className="flex-grow">{children}</main>
      {footer}
    </>
  );
}
