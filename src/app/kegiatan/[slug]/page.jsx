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

  return (
    <article className="min-h-screen px-6 pt-32 pb-20 container mx-auto max-w-4xl">
      {/* Back button */}
      <Link
        href="/kegiatan"
        className="inline-flex items-center gap-2 mb-8 text-sm text-brand-neon hover:underline font-medium"
      >
        <ArrowLeft size={16} /> Kembali ke Kegiatan &amp; Lomba
      </Link>

      {/* Header category badge */}
      <div className="mb-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/15 text-brand-neon">
          {item.type === 'LOMBA' ? 'Lomba' : 'Kegiatan Internal'}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 break-words leading-tight">
        {item.name}
      </h1>

      {/* Poster Image */}
      {item.imageUrl && isWebOrLocalUrl(item.imageUrl) && (
        <div className="mb-8 rounded-3xl overflow-hidden border border-white/10 max-h-[500px] shadow-2xl bg-black/40">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Tanggal Kegiatan</span>
            <p className="text-sm font-semibold text-white">
              Tanggal: {item.date.toLocaleDateString('id-ID', {
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
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Waktu Pelaksanaan</span>
              <p className="text-sm font-semibold text-white">Waktu: {item.time} WIB</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Lokasi Acara</span>
            <p className="text-sm font-semibold text-white break-words">Lokasi: {item.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
            <Users size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Pihak Penyelenggara</span>
            <p className="text-sm font-semibold text-white break-words">Penyelenggara: {item.organizer}</p>
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Deskripsi Kegiatan</h2>
        <div className="whitespace-pre-wrap break-words text-gray-200 leading-relaxed bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          {item.description}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
        {item.publicationUrl && isWebOrLocalUrl(item.publicationUrl) && (
          <a
            href={item.publicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-brand-neon hover:border-brand-neon hover:bg-brand-neon/10 transition-colors text-sm font-medium underline"
          >
            <ExternalLink size={16} /> Lihat Publikasi
          </a>
        )}

        {item.type === 'LOMBA' && item.registrationUrl && isGoogleFormUrl(item.registrationUrl) && (
          <a
            href={item.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full bg-brand-neon text-brand-dark font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(254,174,174,0.4)] text-sm cursor-pointer"
          >
            Daftar Sekarang
          </a>
        )}

        <div className="ml-auto">
          <CopyLinkButton />
        </div>
      </div>

      {item.type === 'LOMBA' && (!item.registrationUrl || !isGoogleFormUrl(item.registrationUrl)) && (
        <p className="mt-4 text-sm text-gray-400">Link pendaftaran belum tersedia.</p>
      )}
    </article>
  );
}
