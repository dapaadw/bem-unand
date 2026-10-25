import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import CopyLinkButton from '../../../components/CopyLinkButton';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 300;

export default async function PublikasiDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.publikasi.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <article className="px-6 pt-32 pb-16 container mx-auto max-w-3xl relative z-10">
        <Link
          href="/publikasi"
          className="inline-flex items-center gap-2 mb-6 text-sm text-brand-neon hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Publikasi
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 break-words leading-tight">{item.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          {item.publishedAt.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta',
          })}
        </p>
        {item.imageUrl && isWebOrLocalUrl(item.imageUrl) && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-80 md:h-[420px] max-h-[450px] w-full shadow-2xl bg-black/40 flex items-center justify-center">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose prose-invert max-w-none whitespace-pre-wrap break-words text-gray-200 leading-relaxed bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          {item.body}
        </div>
        <div className="mt-8">
          <CopyLinkButton />
        </div>
      </article>
    </div>
  );
}
