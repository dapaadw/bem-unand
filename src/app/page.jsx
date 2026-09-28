  import { prisma } from '../lib/prisma';

export const revalidate = 3600;

export default async function HomePage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });

  const title = profile?.title || 'BEM FH UNAND';
  const subtitle = profile?.subtitle || 'Pusat informasi dan aspirasi mahasiswa Fakultas Hukum Universitas Andalas.';

  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
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
      </section>

      {profile?.visiMisi && (
        <section className="px-6 py-16 container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-brand-neon">Visi &amp; Misi</h2>
          <p className="whitespace-pre-wrap text-gray-300">{profile.visiMisi}</p>
        </section>
      )}

      {profile?.logoPhilosophy && (
        <section className="px-6 py-16 container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-brand-neon">Filosofi Logo</h2>
          <p className="whitespace-pre-wrap text-gray-300">{profile.logoPhilosophy}</p>
        </section>
      )}
    </div>
  );
}
