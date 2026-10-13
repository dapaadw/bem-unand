import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { InstagramIcon, WhatsAppIcon } from './SocialIcons';
import { Mail, MapPin } from 'lucide-react';

export default async function SiteFooter() {
  const contacts = await prisma.contacts.findUnique({ where: { id: 1 } });
  const instagramUrl = contacts?.instagramUrl || 'https://www.instagram.com/bemfhua/';
  const whatsappUrl = contacts?.whatsappUrl || 'https://wa.me/6281234567890';
  const email = contacts?.email || 'bemfhunand.official@gmail.com';

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 mt-auto text-brand-ivory-muted">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-brand-ivory/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Logo BEM FH UNAND" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold tracking-wider font-montserrat text-lg text-brand-ivory block">
                  BEM FH UNAND
                </span>
                <span className="text-[11px] uppercase tracking-wider text-brand-neon block font-medium">
                  Kabinet Aksara Juang
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-brand-ivory-muted max-w-md mb-6">
              PKM FH UNAND, Padang
            </p>
            {/* Discreet Admin Link */}
            <div className="mt-auto">
              <Link
                href="/admin"
                className="text-[10px] font-mono tracking-widest text-transparent hover:text-brand-border transition-colors select-none"
                title="VLAD"
              >
                VLAD
              </Link>
            </div>
          </div>

          {/* Column 2: Navigasi Cepat */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-ivory mb-4">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-ivory transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/publikasi" className="hover:text-brand-ivory transition-colors">
                  Publikasi 
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="hover:text-brand-ivory transition-colors">
                  Kegiatan 
                </Link>
              </li>
              <li>
                <Link href="/departemen" className="hover:text-brand-ivory transition-colors">
                  Departemen
                </Link>
              </li>
              <li>
                <Link href="/fh-guide" className="hover:text-brand-ivory transition-colors">
                  FH Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontak Resmi */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-ivory mb-4">
              Kontak Resmi
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-brand-ivory transition-colors group"
                >
                  <span className="w-8 h-8 rounded bg-brand-burgundy border border-brand-border flex items-center justify-center text-brand-neon group-hover:scale-105 transition-transform">
                    <WhatsAppIcon size={16} />
                  </span>
                  <span>WhatsApp: +62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-brand-ivory transition-colors group"
                >
                  <span className="w-8 h-8 rounded bg-brand-burgundy border border-brand-border flex items-center justify-center text-brand-neon group-hover:scale-105 transition-transform">
                    <InstagramIcon size={16} />
                  </span>
                  <span>Instagram: @bemfhua</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 hover:text-brand-ivory transition-colors group"
                >
                  <span className="w-8 h-8 rounded bg-brand-burgundy border border-brand-border flex items-center justify-center text-brand-neon group-hover:scale-105 transition-transform">
                    <Mail size={16} />
                  </span>
                  <span className="break-all">{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded bg-brand-burgundy border border-brand-border flex items-center justify-center text-brand-neon shrink-0 mt-0.5">
                  <MapPin size={16} />
                </span>
                <span className="leading-snug">
                  Gedung PKM Fakultas Hukum Universitas Andalas, Kampus Limau Manis, Padang, Sumatera Barat.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-ivory-muted">
          <p>© {new Date().getFullYear()} BEM FH UNAND — Kabinet Aksara Juang</p>
          <p className="tracking-wide">Fakultas Hukum Universitas Andalas</p>
        </div>
      </div>
    </footer>
  );
}
