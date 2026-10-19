import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { isGoogleFormUrl } from '../../../lib/kegiatan';
import CopyLinkButton from '../../../components/CopyLinkButton';
import { Calendar, Clock, MapPin, Users, ExternalLink, ArrowLeft } from 'lucide-react';

export const revalidate = 300;

export default async function KegiatanDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.kegiatan.findUnique({ where: { slug } });

  if (!item) notFound();

  const isLomba = item.type === 'LOMBA';
  const categoryLabel = isLomba ? 'Lomba / Kompetisi' : 'Kegiatan Internal';

  return (
    <article className="px-6 pt-32 pb-24 max-w-[880px] mx-auto relative z-10 text-left">
      {/* Back button */}
      <Link
        href="/kegiatan"
        className="inline-flex items-center gap-2 mb-8 font-mono-lib text-xs text-[#e3bbb9] hover:text-[#f8f1e7] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft size={14} /> Kembali ke Kegiatan &amp; Lomba
      </Link>

      {/* Header category badge */}
      <div className="mb-3">
        <span className="font-mono-lib font-bold text-[11px] leading-[17px] tracking-[1.1px] text-[#e3bbb9] bg-[#1b080e]/90 px-3.5 py-1 rounded-[3px] border border-[#e3bbb9]/20 uppercase inline-block">
          {categoryLabel}
        </span>
      </div>

      <h1 className="font-barlow font-extrabold text-3xl sm:text-4xl md:text-[44px] leading-[1.1] tracking-[-0.5px] text-[#f8f1e7] uppercase mb-6 break-words">
        {item.name}
      </h1>

      {/* Poster Image */}
      {item.imageUrl && isWebOrLocalUrl(item.imageUrl) && (
        <div className="mb-8 rounded-[4px] overflow-hidden border border-[#e3bbb9]/20 max-h-[500px] shadow-[0_8px_24px_rgba(0,0,0,0.5)] bg-[#1a1517]/80">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 sm:p-6 rounded-[4px] bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-[3px] bg-[#3a0d18] border border-[#e3bbb9]/25 flex items-center justify-center text-[#e3bbb9] shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <span className="font-mono-lib text-[11px] text-[#e3bbb9] uppercase block mb-0.5">Tanggal Kegiatan</span>
            <p className="font-dm text-sm font-semibold text-[#f8f1e7]">
              {item.date.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Jakarta',
              })}
            </p>
          </div>
        </div>

        {item.time && (
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[3px] bg-[#3a0d18] border border-[#e3bbb9]/25 flex items-center justify-center text-[#e3bbb9] shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <span className="font-mono-lib text-[11px] text-[#e3bbb9] uppercase block mb-0.5">Waktu Pelaksanaan</span>
              <p className="font-dm text-sm font-semibold text-[#f8f1e7]">{item.time} WIB</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-[3px] bg-[#3a0d18] border border-[#e3bbb9]/25 flex items-center justify-center text-[#e3bbb9] shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <span className="font-mono-lib text-[11px] text-[#e3bbb9] uppercase block mb-0.5">Lokasi Acara</span>
            <p className="font-dm text-sm font-semibold text-[#f8f1e7] break-words">{item.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-[3px] bg-[#3a0d18] border border-[#e3bbb9]/25 flex items-center justify-center text-[#e3bbb9] shrink-0">
            <Users size={18} />
          </div>
          <div>
            <span className="font-mono-lib text-[11px] text-[#e3bbb9] uppercase block mb-0.5">Penyelenggara</span>
            <p className="font-dm text-sm font-semibold text-[#f8f1e7] break-words">{item.organizer}</p>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="mb-10">
        <h2 className="font-barlow font-bold text-xl uppercase tracking-[-0.3px] text-[#f8f1e7] mb-3">
          Deskripsi Kegiatan
        </h2>
        <div className="whitespace-pre-wrap break-words font-dm text-sm sm:text-base leading-[26px] text-[#f8f1e7]/85 bg-[#1a1517]/70 backdrop-blur-[10px] border border-[#e3bbb9]/15 rounded-[4px] p-6 sm:p-7 shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
          {item.description}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#e3bbb9]/20">
        {item.publicationUrl && isWebOrLocalUrl(item.publicationUrl) && (
          <a
            href={item.publicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#1a1517]/70 border border-[#e3bbb9]/20 text-[#e3bbb9] hover:border-[#e3bbb9]/50 hover:text-[#f8f1e7] transition-all text-xs font-barlow font-bold uppercase tracking-wider"
          >
            <ExternalLink size={14} /> Lihat Publikasi
          </a>
        )}

        {item.type === 'LOMBA' && item.registrationUrl && isGoogleFormUrl(item.registrationUrl) && (
          <a
            href={item.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-[3px] bg-[#762d2e] hover:bg-[#8e1b2e] border border-[#e3bbb9]/30 text-[#f8f1e7] font-barlow font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_2px_8px_rgba(118,45,46,0.5)]"
          >
            Daftar Sekarang
          </a>
        )}

        <div className="ml-auto">
          <CopyLinkButton />
        </div>
      </div>

      {item.type === 'LOMBA' && (!item.registrationUrl || !isGoogleFormUrl(item.registrationUrl)) && (
        <p className="mt-4 font-dm text-xs text-[#f8f1e7]/50">Link pendaftaran belum tersedia.</p>
      )}
    </article>
  );
}
