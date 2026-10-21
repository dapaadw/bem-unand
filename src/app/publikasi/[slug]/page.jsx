import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import CopyLinkButton from '../../../components/CopyLinkButton';
import Link from 'next/link';
import { publicationCategory } from '../../../lib/publication';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';



export const revalidate = 300;

export default async function PublikasiDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.publikasi.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <article className="px-6 pt-32 pb-24 max-w-[880px] mx-auto relative z-10 text-left">
      {/* Back button */}
      <Link
        href="/publikasi"
        className="inline-flex items-center gap-2 mb-8 font-mono-lib text-xs text-[#e3bbb9] hover:text-[#f8f1e7] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft size={14} /> Kembali ke Publikasi &amp; Artikel
      </Link>

      {/* Header category badge */}
      <div className="mb-3">
        <span className="font-mono-lib font-bold text-[11px] leading-[17px] tracking-[1.1px] text-[#e3bbb9] bg-[#1b080e]/90 px-3.5 py-1 rounded-[3px] border border-[#e3bbb9]/20 uppercase inline-block">
          {publicationCategory(item.category)}
        </span>
      </div>

      <h1 className="font-barlow font-extrabold text-3xl sm:text-4xl md:text-[44px] leading-[1.1] tracking-[-0.5px] text-[#f8f1e7] uppercase mb-4 break-words">
        {item.title}
      </h1>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono-lib text-[#e3bbb9] uppercase mb-8 pb-4 border-b border-[#e3bbb9]/15">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} className="text-[#e3bbb9]" />
          {item.publishedAt.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta',
          })}
        </span>
        <span className="flex items-center gap-1.5">
          <User size={13} className="text-[#e3bbb9]" />
          Penulis: {item.author}
        </span>
      </div>

      {/* Featured Image */}
      {item.imageUrl && isWebOrLocalUrl(item.imageUrl) && (
        <div className="mb-8 rounded-[4px] overflow-hidden border border-[#e3bbb9]/20 max-h-[500px] shadow-[0_8px_24px_rgba(0,0,0,0.5)] bg-[#1a1517]/80">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article Body Box */}
      <div className="rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 p-6 sm:p-8 md:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.45)] mb-8">
        <div className="font-dm text-sm sm:text-base leading-[28px] text-[#f8f1e7]/85 whitespace-pre-wrap break-words">
          {item.body}
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#e3bbb9]/20">
        {item.attachmentUrl && isWebOrLocalUrl(item.attachmentUrl) && (
          <a
            href={item.attachmentUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#762d2e] hover:bg-[#8e1b2e] border border-[#e3bbb9]/30 text-[#f8f1e7] font-barlow font-bold text-xs uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(118,45,46,0.5)] cursor-pointer"
          >
            <ExternalLink size={14} /> Lampiran / Sumber Berita
          </a>
        )}

        <div className="ml-auto">
          <CopyLinkButton />
        </div>
      </div>
    </article>
  );
}
