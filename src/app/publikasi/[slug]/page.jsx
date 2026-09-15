import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import CopyLinkButton from '../../../components/CopyLinkButton';

export const revalidate = 300;

export default async function PublikasiDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.publikasi.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <article className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-3xl">
      <span className="text-xs text-brand-neon uppercase tracking-wide">{item.category}</span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{item.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {item.publishedAt.toLocaleDateString('id-ID')} &middot; {item.author}
      </p>
      <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-200">{item.body}</div>
      {item.attachmentUrl && (
        <a href={item.attachmentUrl} target="_blank" rel="noreferrer" className="inline-block mt-6 text-brand-neon underline">
          Lampiran / Sumber Berita
        </a>
      )}
      <div className="mt-8">
        <CopyLinkButton />
      </div>
    </article>
  );
}
