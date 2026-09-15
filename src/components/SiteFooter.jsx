import Link from 'next/link';
import { prisma } from '../lib/prisma';

export default async function SiteFooter() {
  const contacts = await prisma.contacts.findUnique({ where: { id: 1 } });

  return (
    <>
      <footer className="bg-black py-12 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-radial-1 flex items-center justify-center overflow-hidden border border-brand-neon/50">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover p-1" />
            </div>
            <span className="font-semibold tracking-wider">BEM FH UNAND © 2026</span>
          </div>
          <div className="flex gap-6 items-center">
            {contacts?.instagramUrl && (
              <a href={contacts.instagramUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-neon transition-colors">Instagram</a>
            )}
            {contacts?.whatsappUrl && (
              <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-neon transition-colors">WhatsApp</a>
            )}
            {contacts?.email && (
              <a href={`mailto:${contacts.email}`} className="text-gray-500 hover:text-brand-neon transition-colors">Email</a>
            )}
            <Link href="/admin" className="text-gray-500 hover:text-brand-neon transition-colors text-sm border-l border-white/20 pl-6">Admin Panel</Link>
          </div>
        </div>
      </footer>

      {contacts?.whatsappUrl && (
        <a
          href={contacts.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-neon text-brand-dark flex items-center justify-center shadow-lg shadow-black/50 font-bold"
          title="Hubungi via WhatsApp"
        >
          WA
        </a>
      )}
    </>
  );
}
