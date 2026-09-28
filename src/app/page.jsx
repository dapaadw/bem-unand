import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { youtubeEmbedUrl } from '../lib/homeMedia';
import {
  ArrowDown,
  Scale,
  Landmark,
  BookOpen,
  Flame,
  ShieldCheck,
  Award,
  Mail,
  MapPin,
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/SocialIcons';

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
  const video = youtubeEmbedUrl(profile?.videoUrl || 'https://www.youtube.com/watch?v=mCshOnYXFXA');

  const visi =
    'Terwujudnya BEM FH UNAND sebagai episentrum pergerakan dan advokasi yang progresif, inklusif, responsif, dan berintegritas demi terwujudnya keadilan sosial serta kemaslahatan mahasiswa dan masyarakat.';

  const misi = [
    'Mengoptimalkan fungsi advokasi dan pelayanan mahasiswa yang responsif, solutif, dan berpihak pada kesejahteraan civitas akademika.',
    'Menumbuhkan budaya intelektual kritis, riset hukum strategis, dan pengawalan kebijakan publik yang konstruktif.',
    'Mempererat sinergi, kolaborasi, dan harmonisasi antar kelembagaan di lingkungan FH UNAND maupun eksternal kampus.',
    'Mengembangkan potensi kepemimpinan, minat bakat, dan karakter mahasiswa yang berintegritas dan berwawasan luas.',
    'Menghadirkan aksi nyata dan pengabdian masyarakat yang solutif serta berdampak bagi lingkungan sekitar.',
  ];

  const logoElements = [
    {
      title: 'Timbangan Keadilan',
      icon: <Scale size={20} className="text-brand-neon" />,
      desc: 'Menegaskan komitmen BEM FH UNAND terhadap supremasi hukum, kesetaraan di hadapan hukum, dan pembelaan hak-hak masyarakat.',
    },
    {
      title: 'Gonjong Rumah Gadang',
      icon: <Landmark size={20} className="text-brand-neon" />,
      desc: 'Identitas kultural Universitas Andalas di Ranah Minang, memegang teguh falsafah Adat Basandi Syarak, Syarak Basandi Kitabullah.',
    },
    {
      title: 'Aksara & Kesarjanaan',
      icon: <BookOpen size={20} className="text-brand-neon" />,
      desc: 'Menjiwai nama Kabinet Aksara Juang sebagai simbol literasi hukum, ketajaman analisis intelektual, dan mimbar akademik yang progresif.',
    },
    {
      title: 'Api Semangat Perjuangan',
      icon: <Flame size={20} className="text-brand-neon" />,
      desc: 'Simbol kobaran semangat yang pantang padam dalam mengawal aspirasi mahasiswa serta memperjuangkan keadilan sosial.',
    },
    {
      title: 'Lingkaran & Integritas',
      icon: <ShieldCheck size={20} className="text-brand-neon" />,
      desc: 'Melambangkan kebulatan tekad, persatuan civitas akademika tanpa sekat primordial, serta integritas moral dalam memegang amanah.',
    },
    {
      title: 'Harmoni Marun & Emas',
      icon: <Award size={20} className="text-brand-neon" />,
      desc: 'Merah marun melambangkan keberanian dan ketegasan sikap, berpadu kilau emas yang melambangkan kemuliaan dan masa depan gemilang.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Right-Side Photo with Grayscale & Gradient Fade (only right half displayed) */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 h-full pointer-events-none flex items-center justify-end z-0 overflow-hidden">
          <div
            className="relative w-full h-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%, black 100%)',
            }}
          >
            <img
              src={profile?.heroImageUrl || '/hero.jpg'}
              alt={profile?.heroImageAlt || 'Verification photo'}
              className="w-full h-full object-cover object-[75%_center] grayscale contrast-110 brightness-95 opacity-75 lg:opacity-85"
              fetchPriority="high"
            />
            {/* Ambient Overlays to Blend Softly into Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/70 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Left-Side Content Container */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center">
          <div className="max-w-xl sm:ml-8 md:ml-16 lg:ml-20 py-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-brand-neon mb-3">
              Kabinet Aksara Juang
            </p>
            <p className="text-sm sm:text-base font-medium text-gray-300 italic mb-8">
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
          </div>
        </div>
      </section>

      {/* Visi & Misi Section - Center Aligned */}
      <section id="visi-misi" className="scroll-mt-24 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="mb-10 text-center">
            <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
              Landasan Pergerakan
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Visi &amp; Misi</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Arah strategis dan komitmen kepengurusan BEM FH UNAND Kabinet Aksara Juang.
            </p>
          </div>

          <div className="space-y-8">
            {profile?.visiMisi ? (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-gray-200 whitespace-pre-wrap leading-relaxed text-sm text-center">
                {profile.visiMisi}
              </div>
            ) : (
              <>
                {/* Visi Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-brand-neon transition-colors text-center">
                  <span className="text-xs text-brand-neon uppercase tracking-wide font-semibold block mb-3">
                    Visi Utama
                  </span>
                  <blockquote className="text-base sm:text-lg font-medium text-white leading-relaxed max-w-3xl mx-auto">
                    &ldquo;{visi}&rdquo;
                  </blockquote>
                </div>

                {/* Misi Cards */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">Misi Strategis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {misi.map((item, idx) => {
                      const isLastOdd = misi.length % 2 !== 0 && idx === misi.length - 1;
                      return (
                        <div
                          key={idx}
                          className={`bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors flex items-start gap-3.5 ${
                            isLastOdd
                              ? 'md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto md:justify-self-center'
                              : ''
                          }`}
                        >
                          <span className="w-7 h-7 rounded-lg bg-brand-neon/10 border border-brand-neon/20 text-brand-neon font-bold text-xs flex items-center justify-center shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video Mengenal BEM FH UNAND - Center Aligned */}
      {video && (
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="mb-8 text-center">
              <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
                Profil Organisasi
              </span>
              <h2 className="text-3xl font-bold text-white mt-1">Mengenal BEM FH UNAND</h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
                Tayangan profil pengenalan organisasi, dinamika pergerakan, dan dedikasi bagi almamater.
              </p>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 mx-auto shadow-xl">
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
        </section>
      )}

      {/* Filosofi Logo Section - Center Aligned */}
      <section id="filosofi-logo" className="scroll-mt-24 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="mb-10 text-center">
            <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
              Identitas &amp; Makna
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Filosofi Logo</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Setiap simbol dalam lambang BEM FH UNAND merefleksikan nafas pergerakan dan jati diri mahasiswa.
            </p>
          </div>

          {profile?.logoPhilosophy && (
            <div className="mb-8 p-5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm whitespace-pre-wrap leading-relaxed text-center max-w-3xl mx-auto">
              {profile.logoPhilosophy}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {logoElements.map((elem, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon transition-colors flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center mb-3 text-brand-neon group-hover:scale-110 transition-transform">
                  {elem.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {elem.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {elem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Terkini Section - Center Aligned */}
      <section id="kegiatan" className="scroll-mt-24 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-8">
            <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
              Agenda Terkini
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Kegiatan &amp; Lomba</h2>
            <div className="mt-2">
              <Link
                href="/kegiatan"
                className="text-sm font-semibold text-brand-neon hover:underline inline-flex items-center gap-1"
              >
                Lihat semua agenda &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((item) => (
              <Link
                key={item.id}
                href={`/kegiatan/${item.slug}`}
                className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-xl p-4 hover:border-brand-neon transition-colors text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-brand-neon uppercase tracking-wide font-medium block mb-1">
                    {item.type === 'LOMBA' ? 'Lomba' : 'Internal'}
                  </span>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {item.date ? new Date(item.date).toLocaleDateString('id-ID', {
                      timeZone: 'Asia/Jakarta',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }) : ''}
                    {item.time ? ` · ${item.time} WIB` : ''}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {item.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {!activities.length && (
            <div className="py-10 text-center bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
              <p className="text-gray-400 text-sm">Belum ada kegiatan yang dipublikasikan saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Kontak Section - Center Aligned */}
      <section id="kontak" className="scroll-mt-24 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="mb-8 text-center">
            <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
              Hubungi Kami
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Kontak</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
              Saluran komunikasi dan alamat resmi BEM FH UNAND.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:border-brand-neon rounded-xl p-5 transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-3 group-hover:scale-105 transition-transform">
                <WhatsAppIcon size={20} />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">WhatsApp</span>
              <span className="text-xs font-semibold text-white group-hover:text-brand-neon transition-colors truncate w-full">
                +62 812-3456-7890
              </span>
            </a>

            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:border-brand-neon rounded-xl p-5 transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-3 group-hover:scale-105 transition-transform">
                <InstagramIcon size={20} />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Instagram</span>
              <span className="text-xs font-semibold text-white group-hover:text-brand-neon transition-colors truncate w-full">
                @bemfhua
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${emailAddress}`}
              className="bg-white/5 border border-white/10 hover:border-brand-neon rounded-xl p-5 transition-colors flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon mb-3 group-hover:scale-105 transition-transform">
                <Mail size={20} />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Email</span>
              <span className="text-xs font-semibold text-white group-hover:text-brand-neon transition-colors truncate w-full">
                {emailAddress}
              </span>
            </a>

            {/* Sekretariat */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-lg bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon mb-3">
                <MapPin size={20} />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Sekretariat</span>
              <span className="text-xs font-semibold text-white leading-snug">
                PKM FH UNAND, Padang
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
