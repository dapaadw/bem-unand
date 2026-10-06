import { prisma } from '../lib/prisma';
import { youtubeEmbedUrl } from '../lib/homeMedia';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';
import HeroContentAnimation from '../components/home/HeroContentAnimation';
import VisiMisiInteractive from '../components/home/VisiMisiInteractive';
import FilosofiLogoInteractive from '../components/home/FilosofiLogoInteractive';
import FluidScrollSection from '../components/home/FluidScrollSection';
import AgendaHomeInteractive from '../components/home/AgendaHomeInteractive';
import BackgroundTypography from '../components/home/BackgroundTypography';

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
  const _subtitle =
    profile?.subtitle ||
    'Pusat informasi, advokasi, publikasi ilmiah, dan penyalur aspirasi seluruh mahasiswa Fakultas Hukum Universitas Andalas.';
  const video = youtubeEmbedUrl('https://www.youtube.com/watch?v=ixO2bbWHgVE');

  const visi =
    'Terwujudnya BEM FH UNAND sebagai episentrum pergerakan dan advokasi yang progresif, inklusif, responsif, dan berintegritas demi terwujudnya keadilan sosial serta kemaslahatan mahasiswa dan masyarakat.';

  const misi = [
    'Mengoptimalkan fungsi advokasi dan pelayanan mahasiswa yang responsif, solutif, dan berpihak pada kesejahteraan civitas akademika.',
    'Menumbuhkan budaya intelektual kritis, riset hukum strategis, dan pengawalan kebijakan publik yang konstruktif.',
    'Mempererat sinergi, kolaborasi, dan harmonisasi antar kelembagaan di lingkungan FH UNAND maupun eksternal kampus.',
    'Mengembangkan potensi kepemimpinan, minat bakat, dan karakter mahasiswa yang berintegritas dan berwawasan luas.',
    'Menghadirkan aksi nyata dan pengabdian masyarakat yang solutif serta berdampak bagi lingkungan sekitar.',
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Typography Watermark Grid ("KABINET AKSARA JUANG" & "SEMANGAT PERJUANGAN") */}
      <BackgroundTypography fadeFromHero />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center overflow-hidden pt-20">
        {/* Centered Photo with Color & Bottom Fade towards Visi Misi */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center z-0 overflow-hidden">
          <div
            className="relative w-full h-full"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            }}
          >
            <img
              src={profile?.heroImageUrl || '/hero.jpg'}
              alt={profile?.heroImageAlt || 'Verification photo'}
              className="w-full h-full object-cover object-center brightness-60"
              fetchPriority="high"
            />
            {/* Fade only at the bottom towards Visi Misi */}
            <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-brand-dark pointer-events-none" />
          </div>
        </div>

        {/* Left-Side Content Container with Fluid Entrance */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center text-nowrap">
          <HeroContentAnimation className="max-w-xl sm:ml-8 md:ml-16 lg:ml-20 py-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold sm:font-black tracking-normal text-white mb-2 leading-tight drop-shadow-lg">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-brand-neon mb-3 drop-shadow">
              Kabinet Aksara Juang
            </p>
            <p className="text-sm sm:text-base font-medium text-gray-300 italic mb-8 drop-shadow">
              &ldquo;Semangat Beraksi, Perjuangkan Aspirasi&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#visi-misi"
                className="px-5 py-2.5 rounded-lg bg-brand-neon text-brand-dark font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-lg shadow-black/30"
              >
                <span>Lihat Visi &amp; Misi</span>
                <ArrowDown size={16} />
              </a>
              <a
                href="#kontak"
                className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:border-brand-neon hover:text-brand-neon transition-colors cursor-pointer"
              >
                Hubungi Kami
              </a>
            </div>
          </HeroContentAnimation>
        </div>
      </section>

      {/* Visi & Misi Section - Fluid Interactive Reveal */}
      <VisiMisiInteractive
        visi={visi}
        misi={misi}
        profileVisiMisi={profile?.visiMisi}
      />

      {/* Video Mengenal BEM FH UNAND - Fluid Scroll Section with Ambient Glow (No Mockup Chassis) */}
      {video && (
        <FluidScrollSection className="py-20 relative">
          {/* Centered Short Section Divider */}
          <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" aria-hidden="true" />

          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <div className="mb-10 text-center">
              <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
                Profil Organisasi
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Mengenal BEM FH UNAND</h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
                Tayangan profil pengenalan organisasi, dinamika pergerakan, dan dedikasi bagi almamater.
              </p>
            </div>

            {/* Video Container with Pure Ambient Glow */}
            <div className="relative mx-auto max-w-4xl">
              {/* Outer Maroon Radial Glow / Backlight */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-8 md:-inset-12 rounded-3xl bg-[radial-gradient(ellipse_at_center,_#8e1616_0%,_rgba(142,22,22,0.45)_45%,_transparent_75%)] blur-2xl md:blur-[70px] opacity-85 -z-10 pointer-events-none"
              />

              {/* Inner Soft Neon Maroon Accent Glow */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-r from-brand-red/50 via-brand-neon/25 to-brand-red/50 rounded-full blur-[60px] md:blur-[90px] opacity-70 -z-10 pointer-events-none"
              />

              {/* Pure Video Player without Mockup Chassis */}
              <div className="aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl shadow-black/80 relative">
                <iframe
                  src={video}
                  title="Video Profil BEM FH UNAND"
                  loading="lazy"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </FluidScrollSection>
      )}

      {/* Filosofi Logo Section - Logo on Left, Philosophy on Right with Hover Highlight & Scale */}
      <FilosofiLogoInteractive profileLogoPhilosophy={profile?.logoPhilosophy} />

      {/* Agenda Terkini Section - Animated Right-aligned Header & Left-emerging Cards */}
      <AgendaHomeInteractive activities={activities} />

      {/* Kontak Section - Header on Left, Contact Boxes Centered */}
      <FluidScrollSection id="kontak" className="scroll-mt-24 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Centered Short Section Divider */}
          <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" aria-hidden="true" />

          <div className="mb-8 text-left flex flex-col items-start">
            <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
              Hubungi Kami
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Kontak</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-md text-left">
              Saluran komunikasi dan alamat resmi BEM FH UNAND.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp - Maroon theme logo & badge */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:border-brand-neon hover:bg-white/[0.08] rounded-xl p-4 sm:p-5 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0 group-hover:scale-105 group-hover:bg-brand-red/30 transition-all">
                <WhatsAppIcon size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">WhatsApp</span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-neon transition-colors block">
                  +62 812-3456-7890
                </span>
              </div>
            </a>

            {/* Instagram - Maroon theme logo & badge */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:border-brand-neon hover:bg-white/[0.08] rounded-xl p-4 sm:p-5 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0 group-hover:scale-105 group-hover:bg-brand-red/30 transition-all">
                <InstagramIcon size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Instagram</span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-neon transition-colors block">
                  @bemfhua
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${emailAddress}`}
              className="bg-white/5 border border-white/10 hover:border-brand-neon hover:bg-white/[0.08] rounded-xl p-4 sm:p-5 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0 group-hover:scale-105 group-hover:bg-brand-red/30 transition-all">
                <Mail size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Email</span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-neon transition-colors block break-all sm:break-normal">
                  {emailAddress}
                </span>
              </div>
            </a>

            {/* Sekretariat */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0">
                <MapPin size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Sekretariat</span>
                <span className="text-sm sm:text-base font-semibold text-white block leading-snug">
                  PKM FH UNAND, Padang
                </span>
              </div>
            </div>
          </div>
        </div>
      </FluidScrollSection>
    </div>
  );
}
