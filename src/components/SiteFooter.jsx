import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { InstagramIcon, WhatsAppIcon } from './SocialIcons';
import { Mail } from 'lucide-react';

export default async function SiteFooter() {
  const contacts = await prisma.contacts.findUnique({ where: { id: 1 } }).catch(() => null);

  const whatsappUrl = contacts?.whatsappUrl || 'https://wa.me/6281266234461';
  const instagramUrl = contacts?.instagramUrl || 'https://www.instagram.com/bemfhua/';
  const emailAddress = contacts?.email || 'kantormedkominfo.bemfhua@gmail.com';

  return (
    <footer className="bg-[#150e12]/95 border-t border-white/10 pt-16 pb-12 mt-auto text-white min-h-[409px] flex flex-col justify-between relative z-10">
      <div className="max-w-[1120px] w-full mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start pb-12">
          {/* Col 1: Identity & Campus Location */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-white/10 bg-white/5 p-1">
                <img
                  src="/logo.png"
                  alt="Logo BEM FH UNAND"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg uppercase tracking-wider text-white">
                BEM FH UNAND
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-300 max-w-[360px] mt-4">
              Ruang gagasan. Rumah aspirasi. Barisan yang terus belajar dan bergerak memperjuangkan keadilan dan konstitusi kemahasiswaan.
            </p>

            <div className="mt-5">
              <span className="text-xs font-semibold text-brand-neon block">
                Lokasi:
              </span>
              <p className="text-xs text-gray-400 mt-0.5">
                Pusat Kegiatan Mahasiswa Fakultas Hukum Universitas Andalas
              </p>
            </div>

            {/* Discreet Admin Link */}
            <div className="mt-3">
              <Link
                href="/admin"
                className="text-[10px] font-mono tracking-widest text-transparent hover:text-brand-neon/40 transition-colors select-none"
                title="VLAD"
              >
                VLAD
              </Link>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-sm tracking-wider uppercase text-white mb-4">
              NAVIGASI CEPAT
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-brand-neon transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/publikasi" className="hover:text-brand-neon transition-colors">
                  Publikasi
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="hover:text-brand-neon transition-colors">
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/departemen" className="hover:text-brand-neon transition-colors">
                  Kepengurusan
                </Link>
              </li>
              <li>
                <Link href="/fh-guide" className="hover:text-brand-neon transition-colors">
                  FH Guide
                </Link>
              </li>
              <li>
                <Link href="/aspirasi" className="hover:text-brand-neon transition-colors">
                  Aspirasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak Resmi */}
          <div className="md:col-span-4">
            <h3 className="font-bold text-sm tracking-wider uppercase text-white mb-4">
              KONTAK RESMI
            </h3>
            <p className="text-xs text-gray-400 max-w-[340px] mb-4">
              Saluran komunikasi resmi serta sekretariat pengurus BEM FH UNAND. Terbuka bagi seluruh civitas akademika dan masyarakat luas.
            </p>

            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-brand-neon transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon group-hover:border-brand-neon group-hover:bg-brand-red/20 transition-all">
                  <WhatsAppIcon size={16} className="text-brand-neon" />
                </div>
                <div>
                  <span className="font-medium text-white block leading-tight group-hover:text-brand-neon transition-colors">
                    WhatsApp (Contact Person)
                  </span>
                  <span className="text-[11px] text-gray-400">
                    +62 812-6623-4461
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-brand-neon transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon group-hover:border-brand-neon group-hover:bg-brand-red/20 transition-all">
                  <InstagramIcon size={16} className="text-brand-neon" />
                </div>
                <div>
                  <span className="font-medium text-white block leading-tight group-hover:text-brand-neon transition-colors">
                    Instagram
                  </span>
                  <span className="text-[11px] text-gray-400">
                    @bemfhua
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-brand-neon transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon group-hover:border-brand-neon group-hover:bg-brand-red/20 transition-all">
                  <Mail size={16} className="text-brand-neon" />
                </div>
                <div>
                  <span className="font-medium text-white block leading-tight group-hover:text-brand-neon transition-colors">
                    Email
                  </span>
                  <span className="text-[11px] text-gray-400 break-all">
                    {emailAddress}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Period Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            &copy; 2026 BEM FH UNAND. Fakultas Hukum Universitas Andalas. Seluruh hak cipta dilindungi undang-undang.
          </p>

          <div className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 inline-flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-brand-neon">
              Periode 2026 &bull; Aksara Juang
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
