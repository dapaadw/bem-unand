import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import CopyLinkButton from '../../../components/CopyLinkButton';
import Link from 'next/link';
import { publicationCategory } from '../../../lib/publication';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import BackgroundTypography from '../../../components/BackgroundTypography';

export const revalidate = 300;

export default async function PublikasiDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.publikasi.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundTypography />
      <article className="px-6 pt-32 pb-16 container mx-auto max-w-3xl relative z-10">
        <Link href="/publikasi" className="block mb-6 text-sm text-brand-neon hover:underline">← Kembali ke Publikasi</Link>
      <div className="mb-3">
        <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-brand-neon uppercase tracking-wider font-semibold">
          {publicationCategory(item.category)}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 break-words">{item.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {item.publishedAt.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })} &middot; {item.author}
      </p>
      {item.imageUrl && isWebOrLocalUrl(item.imageUrl) && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 max-h-[450px] shadow-2xl">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="prose prose-invert max-w-none whitespace-pre-wrap break-words text-gray-200">{item.body}</div>
      {item.attachmentUrl && isWebOrLocalUrl(item.attachmentUrl) && (
        <a href={item.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-brand-neon/10 border border-brand-neon/20 text-brand-neon hover:bg-brand-neon/20 transition-colors text-sm font-semibold underline">
          Lampiran / Sumber Berita
        </a>
      )}
      <div className="mt-8">
        <CopyLinkButton />
      </div>
      </article>
    </div>
  );
}
