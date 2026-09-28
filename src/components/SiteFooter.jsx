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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 p-0.5 bg-[radial-gradient(circle,_#ffffff_40%,_#8e1616_100%)] shadow-md shadow-black/40">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold tracking-wider font-montserrat">BEM FH UNAND © 2026</span>
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

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-neon text-brand-dark flex items-center justify-center shadow-lg shadow-black/50 hover:scale-105 transition-transform"
        title="Hubungi via WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>
    </>
  );
}
