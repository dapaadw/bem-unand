import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { InstagramIcon, WhatsAppIcon } from './SocialIcons';

export default async function SiteFooter() {
  const contacts = await prisma.contacts.findUnique({ where: { id: 1 } });
  const instagramUrl = contacts?.instagramUrl || 'https://www.instagram.com/bemfhua/';
  const whatsappUrl = contacts?.whatsappUrl || 'https://wa.me/6281234567890';
  const email = contacts?.email || 'bemfhunand.official@gmail.com';

  return (
    <>
      <footer className="bg-black py-12 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold tracking-wider font-montserrat">BEM FH UNAND © 2026</span>
            </div>
            <div className="w-8 flex justify-center mt-1">
              <Link
                href="/admin"
                className="text-[10px] font-mono tracking-widest text-black hover:text-brand-neon transition-colors duration-200 select-none block"
                title="VLAD"
              >
                VLAD
              </Link>
            </div>
          </div>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-brand-neon transition-colors flex items-center gap-1.5 text-sm"
            >
              <InstagramIcon size={16} className="text-brand-neon" />
              <span>Instagram</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-brand-neon transition-colors flex items-center gap-1.5 text-sm"
            >
              <WhatsAppIcon size={16} className="text-brand-neon" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="text-gray-400 hover:text-brand-neon transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
