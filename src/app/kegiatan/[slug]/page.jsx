import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';

export const revalidate = 300;

export default async function KegiatanDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.kegiatan.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <article className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-3xl">
      <span className="text-xs text-brand-neon uppercase tracking-wide">{item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}</span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{item.name}</h1>
      <p className="text-sm text-gray-400 mb-1">Tanggal: {item.date.toLocaleDateString('id-ID')}</p>
      <p className="text-sm text-gray-400 mb-1">Lokasi: {item.location}</p>
      <p className="text-sm text-gray-400 mb-6">Penyelenggara: {item.organizer}</p>
      <div className="whitespace-pre-wrap text-gray-200 mb-6">{item.description}</div>

      <div className="flex flex-wrap gap-4">
        {item.publicationUrl && (
          <a href={item.publicationUrl} target="_blank" rel="noreferrer" className="text-brand-neon underline">
            Lihat Publikasi
          </a>
        )}
        {item.type === 'LOMBA' && item.registrationUrl && (
          <a
            href={item.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full bg-brand-neon text-brand-dark font-semibold"
          >
            Daftar Sekarang
          </a>
        )}
      </div>
    </article>
  );
}
