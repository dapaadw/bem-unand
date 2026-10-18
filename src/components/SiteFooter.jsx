import Link from 'next/link';

export default async function SiteFooter() {
  return (
    <footer className="bg-[#121112] pt-14 pb-12 mt-auto text-[#f8f1e7]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Integrated Three-Column Footer (Node 100:1253) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Identity & Spirit (Node 100:1254) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-[28px] h-[28px] rounded-[3px] bg-[#671c2d] flex items-center justify-center shrink-0">
                <span className="font-barlow font-bold text-[14px] leading-[21px] text-[#f8f1e7]">
                  AJ
                </span>
              </div>
              <span className="font-barlow font-bold text-[16px] leading-[24px] tracking-[0.8px] uppercase text-[#f8f1e7]">
                BEM FH UNAND
              </span>
            </Link>

            <p className="font-newsreader italic text-[14px] leading-[23px] text-[#f8f1e7]/65 max-w-[320px] mt-3">
              &ldquo;Ruang gagasan. Rumah aspirasi. Barisan yang terus belajar bergerak.&rdquo;
            </p>

            {/* Discreet Admin Link */}
            <div className="mt-4">
              <Link
                href="/admin"
                className="text-[10px] font-mono-lib tracking-widest text-transparent hover:text-[#e3bbb9]/30 transition-colors select-none"
                title="VLAD"
              >
                VLAD
              </Link>
            </div>
          </div>

          {/* Col 2: Tautan Cepat (Node 100:1262) */}
          <div className="md:col-span-4">
            <h3 className="font-barlow font-bold text-[12px] leading-[18px] tracking-[1.2px] uppercase text-[#e3bbb9] mb-3">
              TAUTAN CEPAT
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-dm text-[13px] leading-[20px] text-[#f8f1e7]/75 max-w-[352px]">
              <Link href="/" className="hover:text-[#f8f1e7] transition-colors">
                Home
              </Link>
              <Link href="/#visi-misi" className="hover:text-[#f8f1e7] transition-colors">
                Visi &amp; Misi
              </Link>
              <Link href="/#video-profil" className="hover:text-[#f8f1e7] transition-colors">
                Mengenal BEM
              </Link>
              <Link href="/kegiatan" className="hover:text-[#f8f1e7] transition-colors">
                Kegiatan
              </Link>
              <Link href="/#filosofi-logo" className="hover:text-[#f8f1e7] transition-colors">
                Filosofi Logo
              </Link>
              <Link href="/#kontak" className="hover:text-[#f8f1e7] transition-colors">
                Kontak Kami
              </Link>
            </div>
          </div>

          {/* Col 3: Institutional Location & Legal (Node 100:1278) */}
          <div className="md:col-span-3 flex flex-col md:items-end md:text-right">
            <h3 className="font-barlow font-bold text-[12px] leading-[18px] tracking-[1.2px] uppercase text-[#e3bbb9] mb-2">
              LOKASI KAMPUS
            </h3>
            <p className="font-dm text-[12px] leading-[20px] text-[#f8f1e7]/60">
              Fakultas Hukum Universitas Andalas
              <br />
              Padang, Sumatera Barat, Indonesia
            </p>
            <div className="w-full max-w-[256px] border-t border-[#e3bbb9]/40 pt-3 mt-4">
              <p className="font-mono-lib text-[11px] leading-[17px] text-[#f8f1e7]/45">
                &copy; 2026 BEM FH UNAND. Seluruh hak cipta
                <br />
                dilindungi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
