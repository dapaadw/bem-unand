import { prisma } from '../lib/prisma';
import Link from 'next/link';
import { youtubeEmbedUrl } from '../lib/homeMedia';

export const revalidate = 3600;

export default async function HomePage() {
  const [profile, activities, contacts] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.kegiatan.findMany({ take: 4, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }] }),
    prisma.contacts.findUnique({ where: { id: 1 } }),
  ]);
  const video = youtubeEmbedUrl(profile?.videoUrl);
  const contactLinks = [
    { label: 'WhatsApp', href: contacts?.whatsappUrl },
    { label: 'Instagram', href: contacts?.instagramUrl },
    { label: 'Email', href: contacts?.email ? `mailto:${contacts.email}` : null },
  ].filter((contact) => contact.href);

  const title = profile?.title || 'BEM FH UNAND';
  const subtitle = profile?.subtitle || 'Pusat informasi dan aspirasi mahasiswa Fakultas Hukum Universitas Andalas.';

  return (
    <div>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden">
        {profile?.heroImageUrl && <>
          <img src={profile.heroImageUrl} alt={profile.heroImageAlt || 'BEM Fakultas Hukum Universitas Andalas'} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/65 to-brand-dark" />
        </>}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider">{title}</h1>
          <p className="mt-6 max-w-xl text-gray-300">{subtitle}</p>
          {profile?.ctaText && profile?.ctaLink && (
            <a
              href={profile.ctaLink}
              className="mt-8 px-6 py-3 rounded-full bg-brand-neon text-brand-dark font-semibold"
            >
              {profile.ctaText}
            </a>
          )}
        </div>
      </section>

      {profile?.visiMisi && (
        <section className="px-6 py-16 container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-brand-neon">Visi &amp; Misi</h2>
          <p className="whitespace-pre-wrap text-gray-300">{profile.visiMisi}</p>
        </section>
      )}

      {video && <section className="px-6 py-16 container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-brand-neon">Mengenal BEM FH UNAND</h2>
        <iframe src={video} title="Video profil BEM FH UNAND" loading="lazy" className="aspect-video w-full rounded-2xl border border-white/10" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </section>}

      {profile?.logoPhilosophy && (
        <section className="px-6 py-16 container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-brand-neon">Filosofi Logo</h2>
          <img src="/logo.png" alt="Logo BEM FH UNAND" width="192" height="192" loading="lazy" className="w-48 h-48 object-contain mx-auto mb-8" />
          <p className="whitespace-pre-wrap text-gray-300">{profile.logoPhilosophy}</p>
        </section>
      )}
      <section className="px-6 py-16 container mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-brand-neon">Kegiatan Terbaru</h2>
          <Link href="/kegiatan" className="text-sm text-brand-neon hover:underline">Lihat semua kegiatan →</Link>
        </div>
        <div className="space-y-4">
          {activities.map((item) => <Link key={item.id} href={`/kegiatan/${item.slug}`} className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-neon/60 transition-colors">
            <span className="text-xs uppercase tracking-wider text-brand-neon">{item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.date.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: 'numeric', month: 'long', year: 'numeric' })}{item.time ? ` · ${item.time} WIB` : ''} · {item.location}</p>
            <p className="mt-3 text-gray-300 line-clamp-2">{item.description}</p>
            <span className="inline-block mt-4 text-sm text-brand-neon">Detail kegiatan →</span>
          </Link>)}
          {!activities.length && <p className="text-gray-400">Belum ada kegiatan yang dipublikasikan.</p>}
        </div>
      </section>
      <section id="kontak" className="scroll-mt-24 px-6 py-16 container mx-auto max-w-5xl">
        <div className="rounded-2xl border border-brand-neon/25 bg-white/5 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-brand-neon mb-4">Hubungi Kami</h2>
          <p className="text-gray-300 mb-6">Terhubung dengan BEM Fakultas Hukum Universitas Andalas melalui kontak resmi berikut.</p>
          <div className="flex flex-wrap gap-4">{contactLinks.map((contact) => <a key={contact.label} href={contact.href} target={contact.label === 'Email' ? undefined : '_blank'} rel="noreferrer" className="px-5 py-3 rounded-full border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark transition-colors">{contact.label}</a>)}</div>
          {!contactLinks.length && <p className="text-gray-400">Kontak resmi belum tersedia.</p>}
        </div>
      </section>
    </div>
  );
}
