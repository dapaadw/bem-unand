import { prisma } from '../lib/prisma';
import { youtubeEmbedUrl } from '../lib/homeMedia';
import Link from 'next/link';
import HeroContentAnimation from '../components/home/HeroContentAnimation';
import VisiMisiInteractive from '../components/home/VisiMisiInteractive';
import VideoProfileInteractive from '../components/home/VideoProfileInteractive';
import FilosofiLogoInteractive from '../components/home/FilosofiLogoInteractive';
import AgendaHomeInteractive from '../components/home/AgendaHomeInteractive';

export const revalidate = 3600;

export default async function HomePage() {
  const [activities, profile, contacts] = await Promise.all([
    prisma.kegiatan.findMany({
      take: 4,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
    }),
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.contacts.findUnique({ where: { id: 1 } }),
  ]);

  const whatsappUrl = contacts?.whatsappUrl || 'https://wa.me/6281234567890';
  const instagramUrl = contacts?.instagramUrl || 'https://www.instagram.com/bemfhua/';
  const emailAddress = contacts?.email || 'bemfhunand.official@gmail.com';

  const title = profile?.title || 'BEM FH UNAND';
  const subtitle =
    profile?.subtitle ||
    'Pusat informasi, advokasi, publikasi ilmiah, dan penyalur aspirasi seluruh mahasiswa Fakultas Hukum Universitas Andalas.';

  // URL Video Profil YouTube
  const video = youtubeEmbedUrl('https://www.youtube.com/watch?v=Nfs-Moa_1Ko');

  const visi =
    'Mewujudkan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas yang berlandaskan nilai-nilai humanisme dalam membangun gerakan mahasiswa yang kritis, inklusif, berintegritas, serta berkomitmen terhadap perjuangan keadilan dan kemanusiaan.';

  const misi = [
    'Membangun ruang gerakan mahasiswa yang kritis dan progresif melalui diskusi, kajian, dan advokasi terhadap berbagai isu hukum, sosial, dan kemasyarakatan.',
    'Menumbuhkan nilai humanisme dan solidaritas dalam setiap kegiatan kemahasiswaan dengan mengedepankan kepedulian terhadap sesama serta keberpihakan pada keadilan dan kemanusiaan.',
    'Mewujudkan organisasi yang inklusif dengan membuka ruang bagi seluruh masyarakat Fakultas Hukum Universitas Andalas untuk berkontribusi dalam kegiatan BEM tanpa diskriminasi.',
    'Menguatkan peran BEM sebagai wadah perjuangan aspirasi mahasiswa dengan menjalin kerja sama strategis dengan UKM-F dan HIMA yang ada di Fakultas Hukum Universitas Andalas.',
  ];

  const accessBlocks = [
    {
      num: '01 / LAYANAN',
      tag: 'ASPIRASI',
      heading: 'ADA YANG INGIN DISUARAKAN?',
      footer: 'Kanal Advokasi & Aduan',
      href: '/aspirasi',
      external: true,
    },
    {
      num: '02 / PARTISIPASI',
      tag: 'KEGIATAN',
      heading: 'TEMUKAN RUANGMU.',
      footer: 'Agenda & Ruang Diskusi',
      href: '/kegiatan',
      external: false,
    },
    {
      num: '03 / PEMIKIRAN',
      tag: 'PUBLIKASI',
      heading: 'BUKA SUDUT PANDANG.',
      footer: 'Kajian Hukum & Riset',
      href: '/publikasi',
      external: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-finall-canvas text-[#f8f1e7]">
      {/* =================================================================
          HERO SECTION: Background Image with Seamless Mask Fade
          ================================================================= */}
      <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex flex-col justify-center items-center pt-[110px] pb-10 sm:pb-14 overflow-hidden">
        {/* Full-width hero background image with smooth alpha mask fade */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_35%,rgba(0,0,0,0.6)_65%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,rgba(0,0,0,0.6)_65%,transparent_96%)]"
        >
          <img
            src={profile?.heroImageUrl || '/hero.PNG'}
            alt="Foto pengurus Kabinet Aksara Juang BEM FH UNAND"
            className="w-full h-full object-cover object-[center_28%] opacity-35 scale-105"
            fetchPriority="high"
          />
          {/* Subtle dark tint to ensure text legibility */}
          <div className="absolute inset-0 bg-[#141213]/40" />
        </div>

        {/* Top gradient from header */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#161013]/85 via-[#161013]/35 to-transparent pointer-events-none z-[1]"
        />

        {/* Decorative Burgundy Ornament Layer with soft bottom mask fade (Node 100:1353 - Group 7) */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1450px] max-w-none h-[755px] pointer-events-none select-none z-[2] mix-blend-color-dodge opacity-45 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
        >
          <img
            src="/ornament-hero.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hero Text Content (Node 100:1338 - Group 3) */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 flex flex-col items-center text-center">
          <HeroContentAnimation className="w-full flex flex-col items-center text-center">
            {/* Eyebrow Badge (Node 100:889) */}
            <div className="px-5 py-1.5 rounded-[8px] bg-[#671c2d]/70 border border-[#e3bbb9]/25 mb-4 shadow-lg backdrop-blur-sm">
              <p className="font-dm font-semibold text-[10px] sm:text-[11px] leading-[16.5px] tracking-[1.1px] uppercase text-[#ffe8e7] text-center drop-shadow-sm">
                BADAN EKSEKUTIF MAHASISWA
                <br />
                FAKULTAS HUKUM UNIVERSITAS ANDALAS
              </p>
            </div>

            {/* Main Heading (Node 100:892) */}
            <h1 className="font-barlow font-extrabold text-5xl sm:text-7xl md:text-[84px] leading-[0.92] tracking-[-2.1px] uppercase text-[#f8f1e7] text-center drop-shadow-lg">
              {title}
            </h1>

            {/* Subheading (Node 100:893) */}
            <h2 className="font-newsreader font-normal text-2xl sm:text-4xl md:text-[50px] leading-[1.26] text-[#f8f1e7] text-center mt-3 drop-shadow-md">
              KABINET AKSARA JUANG
            </h2>

            {/* Description (Node 100:894) */}
            <p className="font-jakarta font-normal text-xs sm:text-[15px] leading-[24px] sm:leading-[30px] uppercase text-[#e3e3e3] max-w-[648px] mx-auto text-center mt-3 drop-shadow-md">
              {subtitle}
            </p>

            {/* Jelajahi Button (Node 100:1336) */}
            <div className="mt-5">
              <a
                href="#visi-misi"
                className="inline-flex items-center justify-center gap-1.5 px-4 h-[32px] rounded-[5px] bg-[#571b28] bg-gradient-to-r from-[#5a1e2a] to-[#37181c] border border-white/25 text-[#f1d8d7] font-dm font-semibold text-[14px] leading-[17px] tracking-[1.1px] uppercase hover:brightness-110 transition-all shadow-lg"
              >
                <span>Jelajahi</span>
                <span aria-hidden="true">&gt;</span>
              </a>
            </div>
          </HeroContentAnimation>
        </div>
      </section>

      {/* =================================================================
          SECTION 01: THREE ACCESS BLOCKS (Node 100:945)
          ================================================================= */}
      <section className="pt-2 sm:pt-4 pb-20 sm:pb-28 relative z-10">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
          {/* Three Compact Rectangular Text Access Blocks (Node 100:945) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessBlocks.map((block) => (
              <Link
                key={block.num}
                href={block.href}
                target={block.external ? '_blank' : undefined}
                rel={block.external ? 'noopener noreferrer' : undefined}
                className="rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 hover:border-[#e3bbb9]/30 hover:bg-[#241b1e]/80 p-[29px] min-h-[191px] flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-mono-lib font-bold text-[11px] leading-[17px] tracking-[1.1px] text-[#e3bbb9] uppercase">
                      {block.num}
                    </span>
                    <span className="font-barlow font-bold text-[12px] leading-[18px] tracking-[0.6px] text-[#f8f1e7]/50 uppercase">
                      {block.tag}
                    </span>
                  </div>

                  <h3 className="font-barlow font-bold text-[22px] leading-[33px] tracking-[-0.55px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors uppercase">
                    {block.heading}
                  </h3>
                </div>

                <div className="pt-4 mt-5 border-t border-[#e3bbb9]/60 flex items-center justify-between">
                  <span className="font-dm text-[13px] leading-[20px] text-[#f8f1e7]/65 group-hover:text-[#f8f1e7] transition-colors">
                    {block.footer}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="text-[#e3bbb9] group-hover:translate-x-0.5 transition-transform"
                  >
                    <path
                      d="M9.33333 3.33301L14 7.99967M14 7.99967L9.33333 12.6663M14 7.99967H2"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 02 & 03 WRAPPER WITH GROUP 6 ORNAMENT LAYER
          ================================================================= */}
      <div className="relative">
        {/* Decorative Burgundy Ornament Layer (Node 100:1351 - Group 6) */}
        <div
          aria-hidden="true"
          className="absolute top-[110px] left-1/2 -translate-x-1/2 w-[1450px] max-w-none h-[755px] pointer-events-none select-none z-0 mix-blend-color-dodge opacity-85"
        >
          <img
            src="/ornament-section.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Section 02: Visi & Misi (Node 100:1147) */}
        <VisiMisiInteractive
          visi={visi}
          misi={misi}
          profileVisiMisi={profile?.visiMisi}
        />

        {/* Section 03: Mengenal BEM FH UNAND / Video Profil (Node 100:988) */}
        {video && <VideoProfileInteractive videoUrl={video} />}
      </div>

      {/* =================================================================
          SECTION 04: IDENTITAS SIMBOLIK / FILOSOFI LOGO (Node 100:1011)
          ================================================================= */}
      <FilosofiLogoInteractive profileLogoPhilosophy={profile?.logoPhilosophy} />

      {/* =================================================================
          SECTION 05: WARTA & AKTIVITAS / KEGIATAN (Node 100:1046)
          ================================================================= */}
      <AgendaHomeInteractive activities={activities} />

      {/* =================================================================
          SECTION 06: HUBUNGI KAMI / KONTAK RESMI (Node 100:1210)
          ================================================================= */}
      <section id="kontak" className="scroll-mt-24 pt-16 sm:pt-20 pb-4 relative z-10">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
          <div className="border-b border-[#e3bbb9]/12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Left Statement (Node 100:1212) */}
            <div className="lg:col-span-7 text-left">
              <span className="font-mono-lib font-bold text-[12px] leading-[18px] tracking-[1.2px] text-[#e3bbb9] uppercase block">
                06 / HUBUNGI KAMI
              </span>
              <h2 className="font-barlow font-extrabold text-4xl sm:text-[46px] leading-[1.15] sm:leading-[69px] tracking-[-1.15px] text-[#f8f1e7] uppercase mt-1.5">
                KONTAK RESMI
              </h2>
              <p className="font-dm text-base sm:text-[17px] leading-[28px] text-[#f8f1e7]/85 mt-3 max-w-[540px]">
                Saluran komunikasi resmi serta sekretariat pengurus BEM FH UNAND. Terbuka bagi seluruh civitas akademika dan masyarakat luas.
              </p>
            </div>

            {/* Right Compact Rows (Node 100:1219) */}
            <div className="lg:col-span-5 flex flex-col gap-3 w-full">
              {/* WhatsApp Row (Node 100:1220) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[66px] rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 hover:border-[#e3bbb9]/30 hover:bg-[#241b1e]/80 px-4 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[32px] h-[32px] rounded-[3px] bg-[#671c2d]/30 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M2 3.33333C2 2.59745 2.59745 2 3.33333 2H5.52C5.80683 2.00022 6.06136 2.18387 6.152 2.456L7.15067 5.45133C7.25528 5.76603 7.11267 6.10978 6.816 6.258L5.31133 7.01133C6.04888 8.64369 7.35631 9.95112 8.98867 10.6887L9.742 9.184C9.89022 8.88733 10.234 8.74472 10.5487 8.84933L13.544 9.848C13.8164 9.93871 14.0001 10.1936 14 10.4807V12.6667C14 13.4026 13.4026 14 12.6667 14H12C6.47733 14 2 9.52267 2 4V3.33333V3.33333"
                        stroke="#E3BBB9"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-dm font-medium text-[14px] leading-[21px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors">
                    WhatsApp
                  </span>
                </div>
                <span className="font-mono-lib text-[12px] sm:text-[13px] leading-[20px] text-[#f8f1e7]/60">
                  Informasi kontak resmi
                </span>
              </a>

              {/* Instagram Row (Node 100:1229) */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[66px] rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 hover:border-[#e3bbb9]/30 hover:bg-[#241b1e]/80 px-4 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[32px] h-[32px] rounded-[3px] bg-[#671c2d]/30 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M10.6663 7.58065C10.8351 8.71863 10.255 9.83655 9.22743 10.3538C8.19983 10.871 6.95637 10.6709 6.1429 9.85743C5.32943 9.04395 5.12934 7.8005 5.64656 6.7729C6.16378 5.7453 7.28169 5.16524 8.41967 5.33398C9.58166 5.50629 10.494 6.41867 10.6663 7.58065V7.58065M11.6663 4.33398H11.673M4.33301 1.33398H11.6663C13.3221 1.33398 14.6663 2.67824 14.6663 4.33398V11.6673C14.6663 13.3231 13.3221 14.6673 11.6663 14.6673H4.33301C2.67726 14.6673 1.33301 13.3231 1.33301 11.6673V4.33398C1.33301 2.67824 2.67726 1.33398 4.33301 1.33398L11.6663 4.33398"
                        stroke="#E3BBB9"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-dm font-medium text-[14px] leading-[21px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors">
                    Instagram
                  </span>
                </div>
                <span className="font-mono-lib text-[12px] sm:text-[13px] leading-[20px] text-[#f8f1e7]/80">
                  @bemfhunand
                </span>
              </a>

              {/* Email Row (Node 100:1238) */}
              <a
                href={`mailto:${emailAddress}`}
                className="h-[66px] rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 hover:border-[#e3bbb9]/30 hover:bg-[#241b1e]/80 px-4 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[32px] h-[32px] rounded-[3px] bg-[#671c2d]/30 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M2 5.33398L7.26 8.84065C7.70805 9.13958 8.29195 9.13958 8.74 8.84065L14 5.33398M3.33333 12.6673H12.6667C13.4026 12.6673 14 12.0699 14 11.334V4.66732C14 3.93143 13.4026 3.33398 12.6667 3.33398H3.33333C2.59745 3.33398 2 3.93143 2 4.66732V11.334C2 12.0699 2.59745 12.6673 3.33333 12.6673L2 5.33398"
                        stroke="#E3BBB9"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-dm font-medium text-[14px] leading-[21px] text-[#f8f1e7] group-hover:text-[#e3bbb9] transition-colors">
                    Email
                  </span>
                </div>
                <span className="font-mono-lib text-[12px] sm:text-[13px] leading-[20px] text-[#f8f1e7]/60">
                  Informasi kontak resmi
                </span>
              </a>

              {/* Sekretariat Row (Node 100:1247) */}
              <div className="min-h-[99px] rounded-[4px] bg-[#1a1517]/75 border border-[#e3bbb9]/12 p-4 flex flex-col justify-center">
                <span className="font-barlow font-bold text-[12px] leading-[18px] tracking-[0.6px] text-[#e3bbb9] uppercase block">
                  SEKRETARIAT
                </span>
                <p className="font-dm text-[13px] leading-[21px] text-[#f8f1e7]/70 mt-1">
                  Fakultas Hukum Universitas Andalas, Padang, Sumatera Barat,
                  <br />
                  Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
