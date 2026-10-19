import Link from 'next/link';
import { prisma } from '../lib/prisma';

export default async function SiteFooter() {
  const contacts = await prisma.contacts.findUnique({ where: { id: 1 } }).catch(() => null);

  const whatsappUrl = contacts?.whatsappUrl || 'https://wa.me/6281234567890';
  const instagramUrl = contacts?.instagramUrl || 'https://www.instagram.com/bemfhua/';
  const emailAddress = contacts?.email || 'bemfhunand.official@gmail.com';

  return (
    <footer className="bg-[#150e12] pt-16 pb-12 mt-auto text-[#f8f1e7] min-h-[409px] flex flex-col justify-between">
      <div className="max-w-[1120px] w-full mx-auto px-6 lg:px-0">
        {/* Three-Column Footer Content (Node 149:4518) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start pb-12">
          {/* Col 1: Identity & Campus Location (Node 149:4519) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-[42px] h-[38px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Logo BEM FH UNAND"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bricolage font-extrabold text-[18px] leading-[27px] tracking-[-0.45px] uppercase text-[#f8f1e7]">
                BEM FH UNAND
              </span>
            </Link>

            <p className="font-dm text-[14px] leading-[22.8px] text-[#f8f1e7]/70 max-w-[360px] mt-4">
              Ruang gagasan. Rumah aspirasi. Barisan yang terus belajar dan bergerak memperjuangkan keadilan dan konstitusi kemahasiswaan.
            </p>

            <div className="mt-5">
              <span className="font-dm font-semibold text-[12px] leading-[19.5px] text-[#d77b79] block">
                Lokasi Resmi Kampus:
              </span>
              <p className="font-dm text-[12px] leading-[19.5px] text-[#f8f1e7]/60 mt-0.5">
                Fakultas Hukum Universitas Andalas, Padang, Sumatera Barat, Indonesia
              </p>
            </div>

            {/* Discreet Admin Link */}
            <div className="mt-2">
              <Link
                href="/admin"
                className="text-[10px] font-mono-lib tracking-widest text-transparent hover:text-[#e3bbb9]/30 transition-colors select-none"
                title="VLAD"
              >
                VLAD
              </Link>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat (Node 149:4528) */}
          <div className="md:col-span-3">
            <h3 className="font-bricolage font-bold text-[14px] leading-[21px] tracking-[0.7px] uppercase text-[#f8f1e7] mb-4">
              NAVIGASI CEPAT
            </h3>
            <ul className="flex flex-col gap-3 font-dm text-[14px] leading-[21px] text-[#f8f1e7]/75">
              <li>
                <Link href="/" className="hover:text-[#f8f1e7] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/publikasi" className="hover:text-[#f8f1e7] transition-colors">
                  Publikasi 
                </Link>
              </li>
              <li>
                <Link href="/kegiatan" className="hover:text-[#f8f1e7] transition-colors">
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/departemen" className="hover:text-[#f8f1e7] transition-colors">
                  Departemen
                </Link>
              </li>
              <li>
                <Link href="/fh-guide" className="hover:text-[#f8f1e7] transition-colors">
                  FH Guide
                </Link>
              </li>
              <li>
                <Link href="/aspirasi" className="hover:text-[#f8f1e7] transition-colors">
                  Aspirasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak Resmi (dengan kontak sesuai kontak resmi home) */}
          <div className="md:col-span-4">
            <h3 className="font-bricolage font-bold text-[14px] leading-[21px] tracking-[0.7px] uppercase text-[#f8f1e7] mb-4">
              KONTAK RESMI
            </h3>
            <p className="font-dm text-[12px] leading-[19.5px] text-[#f8f1e7]/70 max-w-[340px] mb-4">
              Saluran komunikasi resmi serta sekretariat pengurus BEM FH UNAND. Terbuka bagi seluruh civitas akademika dan masyarakat luas.
            </p>

            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[13px] font-dm text-[#f8f1e7]/80 hover:text-[#e3bbb9] transition-colors group"
              >
                <div className="w-[30px] h-[30px] rounded-[4px] bg-[#1f151a] border border-[#e3bbb9]/20 flex items-center justify-center shrink-0 group-hover:border-[#e3bbb9]/50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M2 3.33333C2 2.59745 2.59745 2 3.33333 2H5.52C5.80683 2.00022 6.06136 2.18387 6.152 2.456L7.15067 5.45133C7.25528 5.76603 7.11267 6.10978 6.816 6.258L5.31133 7.01133C6.04888 8.64369 7.35631 9.95112 8.98867 10.6887L9.742 9.184C9.89022 8.88733 10.234 8.74472 10.5487 8.84933L13.544 9.848C13.8164 9.93871 14.0001 10.1936 14 10.4807V12.6667C14 13.4026 13.4026 14 12.6667 14H12C6.47733 14 2 9.52267 2 4V3.33333V3.33333"
                      stroke="#E3BBB9"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#f8f1e7] block leading-tight group-hover:text-[#e3bbb9] transition-colors">
                    WhatsApp
                  </span>
                  <span className="text-[11px] font-mono-lib text-[#f8f1e7]/60">
                    Informasi kontak resmi
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[13px] font-dm text-[#f8f1e7]/80 hover:text-[#e3bbb9] transition-colors group"
              >
                <div className="w-[30px] h-[30px] rounded-[4px] bg-[#1f151a] border border-[#e3bbb9]/20 flex items-center justify-center shrink-0 group-hover:border-[#e3bbb9]/50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M10.6663 7.58065C10.8351 8.71863 10.255 9.83655 9.22743 10.3538C8.19983 10.871 6.95637 10.6709 6.1429 9.85743C5.32943 9.04395 5.12934 7.8005 5.64656 6.7729C6.16378 5.7453 7.28169 5.16524 8.41967 5.33398C9.58166 5.50629 10.494 6.41867 10.6663 7.58065V7.58065M11.6663 4.33398H11.673M4.33301 1.33398H11.6663C13.3221 1.33398 14.6663 2.67824 14.6663 4.33398V11.6673C14.6663 13.3231 13.3221 14.6673 11.6663 14.6673H4.33301C2.67726 14.6673 1.33301 13.3231 1.33301 11.6673V4.33398C1.33301 2.67824 2.67726 1.33398 4.33301 1.33398L11.6663 4.33398"
                      stroke="#E3BBB9"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#f8f1e7] block leading-tight group-hover:text-[#e3bbb9] transition-colors">
                    Instagram
                  </span>
                  <span className="text-[11px] font-mono-lib text-[#f8f1e7]/80">
                    @bemfhunand
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-3 text-[13px] font-dm text-[#f8f1e7]/80 hover:text-[#e3bbb9] transition-colors group"
              >
                <div className="w-[30px] h-[30px] rounded-[4px] bg-[#1f151a] border border-[#e3bbb9]/20 flex items-center justify-center shrink-0 group-hover:border-[#e3bbb9]/50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M2 5.33398L7.26 8.84065C7.70805 9.13958 8.29195 9.13958 8.74 8.84065L14 5.33398M3.33333 12.6673H12.6667C13.4026 12.6673 14 12.0699 14 11.334V4.66732C14 3.93143 13.4026 3.33398 12.6667 3.33398H3.33333C2.59745 3.33398 2 3.93143 2 4.66732V11.334C2 12.0699 2.59745 12.6673 3.33333 12.6673L2 5.33398"
                      stroke="#E3BBB9"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#f8f1e7] block leading-tight group-hover:text-[#e3bbb9] transition-colors">
                    Email
                  </span>
                  <span className="text-[11px] font-mono-lib text-[#f8f1e7]/60">
                    {emailAddress}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Period Bar (Node 149:4550) */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-dm text-[12px] leading-[18px] text-[#f8f1e7]/50 text-center sm:text-left">
            &copy; 2026 BEM FH UNAND. Fakultas Hukum Universitas Andalas. Seluruh hak cipta dilindungi undang-undang.
          </p>

          <div className="px-3 py-1 rounded-[6px] bg-[#1d151a] inline-flex items-center justify-center shrink-0">
            <span className="font-dm text-[15px] leading-[15px] text-[#f48886]">
              Periode 2026 &bull; Aksara Juang
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
