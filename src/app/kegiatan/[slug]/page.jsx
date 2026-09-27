import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { isGoogleFormUrl } from '../../../lib/kegiatan';

export const revalidate = 300;

export default async function KegiatanDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.kegiatan.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <article className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-3xl">
      <Link href="/kegiatan" className="block mb-6 text-sm text-brand-neon hover:underline">← Kembali ke Kegiatan &amp; Lomba</Link>
      <span className="text-xs text-brand-neon uppercase tracking-wide">{item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}</span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 break-words">{item.name}</h1>
      <p className="text-sm text-gray-400 mb-1">Tanggal: {item.date.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })}</p>
      <p className="text-sm text-gray-400 mb-1 break-words">Lokasi: {item.location}</p>
      {item.time && <p className="text-sm text-gray-400 mb-1">Waktu: {item.time} WIB</p>}
      <p className="text-sm text-gray-400 mb-6 break-words">Penyelenggara: {item.organizer}</p>
      <div className="whitespace-pre-wrap break-words text-gray-200 mb-6">{item.description}</div>

      <div className="flex flex-wrap gap-4">
        {item.publicationUrl && isWebOrLocalUrl(item.publicationUrl) && (
          <a href={item.publicationUrl} target="_blank" rel="noreferrer" className="text-brand-neon underline">
            Lihat Publikasi
          </a>
        )}
        {item.type === 'LOMBA' && item.registrationUrl && isGoogleFormUrl(item.registrationUrl) && (
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
      {item.type === 'LOMBA' && (!item.registrationUrl || !isGoogleFormUrl(item.registrationUrl)) && <p className="mt-4 text-sm text-gray-400">Link pendaftaran belum tersedia.</p>}
    </article>
  );
}
