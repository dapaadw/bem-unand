import { prisma } from '../lib/prisma';
import { youtubeEmbedUrl } from '../lib/homeMedia';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';
import HeroContentAnimation from '../components/home/HeroContentAnimation';
import VisiMisiInteractive from '../components/home/VisiMisiInteractive';
import FilosofiLogoInteractive from '../components/home/FilosofiLogoInteractive';
import PublikasiHomeInteractive from '../components/home/PublikasiHomeInteractive';
import AgendaHomeInteractive from '../components/home/AgendaHomeInteractive';
import FluidScrollSection from '../components/home/FluidScrollSection';

export const revalidate = 3600;

export default async function HomePage() {
  const [activities, publications, contacts] = await Promise.all([
    prisma.kegiatan.findMany({
      take: 3,
      orderBy: [{ publishedAt: 'desc' }, { date: 'desc' }, { id: 'desc' }],
    }),
    prisma.publikasi.findMany({
      take: 3,
      orderBy: [{ publishedAt: 'desc' }, { id: 'desc' }],
    }),
    prisma.contacts.findUnique({ where: { id: 1 } }),
  ]);

  const serializedActivities = activities.map((item) => ({
    ...item,
    date: item.date ? item.date.toISOString() : null,
    publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
    createdAt: item.createdAt ? item.createdAt.toISOString() : null,
    updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
  }));

  const serializedPublications = publications.map((item) => ({
    ...item,
    publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
    createdAt: item.createdAt ? item.createdAt.toISOString() : null,
    updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
  }));

  const whatsappUrl = contacts?.whatsappUrl || 'https://wa.me/6281266234461';
  const instagramUrl = contacts?.instagramUrl || 'https://www.instagram.com/bemfhua/';
  const emailAddress = contacts?.email || 'kantormedkominfo.bemfhua@gmail.com';

  const title = 'BEM FH UNAND';
  const subtitle =
    'Pusat informasi, advokasi, publikasi ilmiah, dan penyalur aspirasi seluruh mahasiswa Fakultas Hukum Universitas Andalas.';

  const video = youtubeEmbedUrl('https://youtu.be/Nfs-Moa_1Ko?si=x2jXESWTxrrpOoas');

  const visi =
    'Mewujudkan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas yang berlandaskan nilai-nilai humanisme dalam membangun gerakan mahasiswa yang kritis, inklusif, berintegritas, serta berkomitmen terhadap perjuangan keadilan dan kemanusiaan.';

  const misi = [
    'Membangun ruang gerakan mahasiswa yang kritis dan progresif melalui diskusi, kajian, dan advokasi terhadap berbagai isu hukum, sosial, dan kemasyarakatan.',
    'Menumbuhkan nilai humanisme dan solidaritas dalam setiap kegiatan kemahasiswaan dengan mengedepankan kepedulian terhadap sesama serta keberpihakan pada keadilan dan kemanusiaan.',
    'Mewujudkan organisasi yang inklusif dengan membuka ruang bagi seluruh Masyarakat fakultas hukum universitas andalas untuk berkontribusi dalam kegiatan BEM tanpa diskriminasi.',
    'Menguatkan peran BEM sebagai wadah perjuangan aspirasi mahasiswa dengan menjalin kerja sama strategis dengan UKM F dan HIMA yang ada di fakultas hukum universitas andalas.',
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Centered Photo with Smooth Mask dissolving into Canvas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_45%,rgba(0,0,0,0.5)_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_45%,rgba(0,0,0,0.5)_75%,transparent_100%)]"
        >
          <img
            src="/hero.PNG"
            alt="Foto pengurus Kabinet Aksara Juang BEM FH UNAND"
            className="w-full h-full object-cover object-[center_28%] opacity-40 brightness-75"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        {/* Ambient relaxed maroon aura behind content */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(188,34,68,0.32)_0%,rgba(130,20,48,0.16)_45%,transparent_75%)] pointer-events-none blur-3xl z-[1]"
        />

        {/* Centered Content Container with Fluid Entrance */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex justify-center items-center text-center">
          <HeroContentAnimation className="max-w-2xl py-12 flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold sm:font-black tracking-normal text-white mb-2 leading-tight drop-shadow-lg">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-brand-neon mb-3 drop-shadow">
              Kabinet Aksara Juang
            </p>
            <p className="text-sm sm:text-base font-medium italic text-gray-300 mb-8 drop-shadow max-w-lg mx-auto">
              {subtitle}
            </p>

            <div className="flex justify-center items-center">
              <a
                href="#visi-misi"
                className="px-6 py-3 rounded-full bg-brand-neon text-brand-dark font-bold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-black/30 hover:scale-105"
              >
                <span>Jelajahi</span>
                <ArrowDown size={16} />
              </a>
            </div>
          </HeroContentAnimation>
        </div>
      </section>

      {/* Visi & Misi Interactive Section */}
      <VisiMisiInteractive
        visi={visi}
        misi={misi}
      />

      {/* Video Mengenal BEM FH UNAND - Fluid Scroll Section with Ambient Glow */}
      {video && (
        <FluidScrollSection className="py-20 relative z-10">
          <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" aria-hidden="true" />

          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <div className="mb-10 text-center">
              <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
                Video Profil BEM
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Mengenal BEM FH UNAND</h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
                Melalui video ini, kami mengajak Anda mengenal lebih dekat struktur, visi, misi, serta sinergi dari seluruh Presidium, Departemen, Biro, Kantor dan Lembaga yang bergerak bersama dalam satu irama perjuangan.
              </p>
            </div>

            {/* Video Container with Pure Ambient Glow */}
            <div className="relative mx-auto max-w-4xl">
              <div
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-8 md:-inset-12 rounded-3xl bg-[radial-gradient(ellipse_at_center,_#8e1616_0%,_rgba(142,22,22,0.45)_45%,_transparent_75%)] blur-2xl md:blur-[70px] opacity-85 -z-10 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-r from-brand-red/50 via-brand-neon/25 to-brand-red/50 rounded-full blur-[60px] md:blur-[90px] opacity-70 -z-10 pointer-events-none"
              />
              <div className="aspect-[1914/1080] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl shadow-black/80 relative border border-white/10">
                <iframe
                  src={video}
                  title="Video Profil BEM FH UNAND"
                  loading="lazy"
                  className="w-full h-full scale-[1.015] origin-center border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </FluidScrollSection>
      )}

      {/* Filosofi Logo Section */}
      <FilosofiLogoInteractive />

      {/* Publikasi Section (3 publikasi terbaru) */}
      <PublikasiHomeInteractive publications={serializedPublications} />

      {/* Agenda / Kegiatan Section (3 kegiatan terbaru) */}
      <AgendaHomeInteractive activities={serializedActivities} />

      {/* Kontak Section */}
      <FluidScrollSection id="kontak" className="scroll-mt-24 py-16 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
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

          <div className="grid grid-cols-1 gap-4">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a0a13]/50 border border-white/10 hover:border-brand-neon hover:bg-[#23121b]/70 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(254,174,174,0.18)] rounded-xl p-4 sm:p-5 transition-all duration-500 ease-out flex items-center gap-4 group backdrop-blur-md shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0 group-hover:scale-105 group-hover:bg-brand-red/30 transition-all duration-300">
                <WhatsAppIcon size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Contact Person</span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-neon transition-colors duration-300 block">
                  +62 812-6623-4461
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a0a13]/50 border border-white/10 hover:border-brand-neon hover:bg-[#23121b]/70 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(254,174,174,0.18)] rounded-xl p-4 sm:p-5 transition-all duration-500 ease-out flex items-center gap-4 group backdrop-blur-md shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0 group-hover:scale-105 group-hover:bg-brand-red/30 transition-all duration-300">
                <InstagramIcon size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Instagram</span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-neon transition-colors duration-300 block">
                  @bemfhua
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${emailAddress}`}
              className="bg-[#1a0a13]/50 border border-white/10 hover:border-brand-neon hover:bg-[#23121b]/70 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(254,174,174,0.18)] rounded-xl p-4 sm:p-5 transition-all duration-500 ease-out flex items-center gap-4 group backdrop-blur-md shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0 group-hover:scale-105 group-hover:bg-brand-red/30 transition-all duration-300">
                <Mail size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Email</span>
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-neon transition-colors duration-300 block break-all sm:break-normal">
                  {emailAddress}
                </span>
              </div>
            </a>

            {/* Sekretariat */}
            <div className="bg-[#1a0a13]/50 border border-white/10 rounded-xl p-4 sm:p-5 flex items-center gap-4 backdrop-blur-md shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-neon shrink-0">
                <MapPin size={22} className="text-brand-neon" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5 font-medium">Lokasi</span>
                <span className="text-sm sm:text-base font-semibold text-white block leading-snug">
                  Pusat Kegiatan Mahasiswa Fakultas Hukum Universitas Andalas
                </span>
              </div>
            </div>
          </div>
        </div>
      </FluidScrollSection>
    </div>
  );
}
