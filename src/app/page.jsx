import { prisma } from '../lib/prisma';
import { youtubeEmbedUrl } from '../lib/homeMedia';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';
import HeroContentAnimation from '../components/home/HeroContentAnimation';
import VisiMisiInteractive from '../components/home/VisiMisiInteractive';
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

  // URL Video Profil YouTube (Hardcode: ganti link di sini kapan saja)
  const video = youtubeEmbedUrl('https://www.youtube.com/watch?v=Nfs-Moa_1Ko');

  const visi =
    'Mewujudkan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas yang berlandaskan nilai-nilai humanisme dalam membangun gerakan mahasiswa yang kritis, inklusif, berintegritas, serta berkomitmen terhadap perjuangan keadilan dan kemanusiaan.';

  const misi = [
    'Membangun ruang gerakan mahasiswa yang kritis dan progresif melalui diskusi, kajian, dan advokasi terhadap berbagai isu hukum, sosial, dan kemasyarakatan.',
    'Menumbuhkan nilai humanisme dan solidaritas dalam setiap kegiatan kemahasiswaan dengan mengedepankan kepedulian terhadap sesama serta keberpihakan pada keadilan dan kemanusian',
    'Mewujudkan organisasi yang inklusif dengan membuka ruang bagi seluruh Masyarakat fakultas hukum universitas andalas untuk berkontribusi dalam kegiatan BEM tanpa diskriminasi.',
    'Menguatkan peran BEM sebagai wadah perjuangan aspirasi mahasiswa dengan menjalin kerja sama strategis dengan UKM F dan HIMA yang ada di fakultas hukum universitas andalas.',
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#14080a] text-[#f7f2e3]">
      {/* Hero Section: Full screen reaching bottom, zoomed/cropped to fill, 75% opacity with gradient to website background color (#14080a) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#14080a]">
        {/* Full-width and full-height image container, zoomed/cropped with object-cover and scale */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <img
            src={profile?.heroImageUrl || '/hero.PNG'}
            alt="Foto pengurus BEM FH UNAND"
            className="w-full h-full object-cover object-[center_35%] scale-105 opacity-35"
            fetchPriority="high"
          />
        </div>

        {/* Top gradient for smooth navbar blending */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-[#14080a]/90 via-[#14080a]/40 to-transparent pointer-events-none z-[1]"
        />

        {/* Bottom gradient fading smoothly to website background color (#14080a) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-t from-[#14080a] via-[#14080a]/80 via-40% to-transparent pointer-events-none z-[1]"
        />

        {/* Content Container: Centered */}
        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 pt-28 pb-16 lg:py-24 flex flex-col items-center justify-center text-center">
          <HeroContentAnimation className="w-full flex flex-col items-center text-center">
            {/* 2-line Subtitle Header */}
            <div className="mb-5 space-y-0.5 text-xs font-semibold tracking-wider uppercase text-[#c5b8b8] text-center drop-shadow-md">
              <p>BADAN EKSEKUTIF MAHASISWA</p>
              <p>FAKULTAS HUKUM UNIVERSITAS ANDALAS</p>
            </div>

            {/* Centered Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#f7f2e3] tracking-tight leading-tight mb-4 font-montserrat text-center drop-shadow-lg">
              {title}
            </h1>

            {/* Kabinet Name */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#f7f2e3] mb-2 text-center drop-shadow-md">
              Kabinet Aksara Juang
            </h2>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-[#c5b8b8] italic mb-6 text-center drop-shadow-md">
              &ldquo;Semangat Beraksi, Perjuangkan Aspirasi&rdquo;
            </p>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-[#c5b8b8] leading-relaxed mb-8 max-w-2xl mx-auto text-center drop-shadow-md">
              {subtitle}
            </p>

            {/* Actions: Visi & Misi Button (1x boxy) & Kegiatan link (underline) */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a
                href="#visi-misi"
                className="px-5 py-2.5 rounded bg-[#4a0d13] hover:bg-[#60111a] border border-[#6b141d] text-[#f7f2e3] font-semibold text-sm transition-all duration-200 flex items-center gap-2 group shadow-lg"
              >
                <span>Visi &amp; Misi</span>
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#kegiatan"
                className="text-sm font-medium text-[#f7f2e3] hover:text-[#FEAEAE] underline underline-offset-8 decoration-[#f7f2e3]/40 hover:decoration-[#FEAEAE] transition-colors drop-shadow"
              >
                Kegiatan &amp; publikasi
              </a>
            </div>
          </HeroContentAnimation>
        </div>
      </section>

      {/* Quick Nav Button Bar: 3 Columns Directly Matching Image 2 */}
      <section className="bg-[#14080a] border-y border-white/10 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Button 1: Publikasi */}
            <Link
              href="/publikasi"
              className="py-6 px-6 md:px-8 flex items-center justify-between group hover:bg-[#20080d] transition-colors duration-200"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors">
                  Publikasi
                </h3>
                <p className="text-xs sm:text-sm text-[#a89f9f] mt-1">
                  Informasi dan Kajian
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-[#a89f9f] group-hover:text-[#FEAEAE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4"
              />
            </Link>

            {/* Button 2: Kegiatan */}
            <Link
              href="/kegiatan"
              className="py-6 px-6 md:px-8 flex items-center justify-between group hover:bg-[#20080d] transition-colors duration-200"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors">
                  Kegiatan
                </h3>
                <p className="text-xs sm:text-sm text-[#a89f9f] mt-1">
                  Agenda Mahasiswa
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-[#a89f9f] group-hover:text-[#FEAEAE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4"
              />
            </Link>

            {/* Button 3: Aspirasi */}
            <Link
              href="/aspirasi"
              target="_blank"
              rel="noopener noreferrer"
              className="py-6 px-6 md:px-8 flex items-center justify-between group hover:bg-[#20080d] transition-colors duration-200"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors">
                  Aspirasi
                </h3>
                <p className="text-xs sm:text-sm text-[#a89f9f] mt-1">
                  Saluran Aspirasi
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-[#a89f9f] group-hover:text-[#FEAEAE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section: 2 Columns */}
      <VisiMisiInteractive
        visi={visi}
        misi={misi}
        profileVisiMisi={profile?.visiMisi}
      />

      {/* Video Profil Section: Seamless background matching home page (#14080a), centered video with text above */}
      {video && (
        <section id="video-profil" className="scroll-mt-24 py-20 relative z-10">
          <div className="container mx-auto px-6 max-w-5xl">
            {/* Header / Narrative above video: Centered */}
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-xs text-[#FEAEAE] uppercase tracking-wider font-semibold block mb-2">
                Profil Organisasi
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f7f2e3] tracking-tight leading-tight mb-4 font-montserrat">
                Mengenal BEM FH UNAND
              </h2>
              <p className="text-sm sm:text-base text-[#c5b8b8] leading-relaxed">
                Melalui video ini, kami mengajak Anda mengenal lebih dekat struktur, visi, misi, serta sinergi dari seluruh Presidium, Departemen, Biro, Kantor dan Lembaga yang bergerak bersama dalam satu irama perjuangan.
              </p>
            </div>

            {/* Centered 16:9 Video Player */}
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video w-full rounded overflow-hidden bg-black shadow-2xl shadow-black/80 border border-white/10 ring-1 ring-white/5 relative">
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
        </section>
      )}

      {/* Filosofi Logo Section */}
      <FilosofiLogoInteractive profileLogoPhilosophy={profile?.logoPhilosophy} />

      {/* Kegiatan & Lomba: Format Asli Dikembalikan (4 Kolom dengan corner radius 1x) */}
      <AgendaHomeInteractive activities={activities} />

      {/* Kontak Kami Section: Background aligned with home page (#14080a), vertically stacked communication channels */}
      <section id="kontak" className="scroll-mt-24 py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="mb-8 text-left">
            <span className="text-xs text-[#FEAEAE] uppercase tracking-wider font-semibold block mb-1">
              Saluran Komunikasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f7f2e3] tracking-tight font-montserrat">
              Kontak Kami
            </h2>
            <p className="text-sm sm:text-base text-[#c5b8b8] mt-2 leading-relaxed">
              Saluran komunikasi resmi serta sekretariat pengurus BEM FH UNAND.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a0a0e] border border-white/10 hover:border-white/20 hover:bg-[#220a10] rounded p-4 sm:p-5 transition-all flex items-center justify-between group shadow-lg shadow-black/20"
            >
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded bg-[#28060d] border border-white/10 flex items-center justify-center text-[#FEAEAE] group-hover:scale-105 transition-transform shrink-0">
                  <WhatsAppIcon size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs text-[#a89f9f] uppercase tracking-wider block font-medium">WhatsApp</span>
                  <span className="text-base sm:text-lg font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors truncate block">
                    +62 812-3456-7890
                  </span>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[#a89f9f] group-hover:text-[#FEAEAE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4"
              />
            </a>

            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a0a0e] border border-white/10 hover:border-white/20 hover:bg-[#220a10] rounded p-4 sm:p-5 transition-all flex items-center justify-between group shadow-lg shadow-black/20"
            >
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded bg-[#28060d] border border-white/10 flex items-center justify-center text-[#FEAEAE] group-hover:scale-105 transition-transform shrink-0">
                  <InstagramIcon size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs text-[#a89f9f] uppercase tracking-wider block font-medium">Instagram</span>
                  <span className="text-base sm:text-lg font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors truncate block">
                    @bemfhua
                  </span>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[#a89f9f] group-hover:text-[#FEAEAE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4"
              />
            </a>

            {/* Email */}
            <a
              href={`mailto:${emailAddress}`}
              className="bg-[#1a0a0e] border border-white/10 hover:border-white/20 hover:bg-[#220a10] rounded p-4 sm:p-5 transition-all flex items-center justify-between group shadow-lg shadow-black/20"
            >
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded bg-[#28060d] border border-white/10 flex items-center justify-center text-[#FEAEAE] group-hover:scale-105 transition-transform shrink-0">
                  <Mail size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs text-[#a89f9f] uppercase tracking-wider block font-medium">Email</span>
                  <span className="text-base sm:text-lg font-bold text-[#f7f2e3] group-hover:text-[#FEAEAE] transition-colors truncate block">
                    {emailAddress}
                  </span>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[#a89f9f] group-hover:text-[#FEAEAE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4"
              />
            </a>

            {/* Sekretariat */}
            <div className="bg-[#1a0a0e] border border-white/10 rounded p-4 sm:p-5 transition-all flex items-center justify-between shadow-lg shadow-black/20">
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded bg-[#28060d] border border-white/10 flex items-center justify-center text-[#FEAEAE] shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs text-[#a89f9f] uppercase tracking-wider block font-medium">Sekretariat</span>
                  <span className="text-base sm:text-lg font-bold text-[#f7f2e3] block">
                    PKM FH UNAND, Padang
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

