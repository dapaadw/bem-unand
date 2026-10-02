import './globals.css';
import SiteChrome from '../components/SiteChrome';
import SiteFooter from '../components/SiteFooter';
import { prisma } from '../lib/prisma';

export const metadata = {
  title: 'BEM FH UNAND',
  description: 'Website resmi BEM Fakultas Hukum Universitas Andalas',
};

export default async function RootLayout({ children }) {
  const profile = await prisma.profile.findUnique({ where: { id: 1 }, select: { backgroundColor: true } });
  const color = /^#[0-9a-f]{6}$/i.test(profile?.backgroundColor || '') ? profile.backgroundColor : '#1a0000';
  return (
    <html lang="id" style={{ '--color-brand-dark': color }}>
      <body className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden selection:bg-brand-neon selection:text-brand-dark flex flex-col">
        <SiteChrome footer={<SiteFooter />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
