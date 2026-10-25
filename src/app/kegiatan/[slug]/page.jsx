import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import CopyLinkButton from '../../../components/CopyLinkButton';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';

export const revalidate = 300;

export default async function KegiatanDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.kegiatan.findUnique({ where: { slug } });

  if (!item) notFound();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <article className="px-6 pt-32 pb-20 container mx-auto max-w-4xl relative z-10">
        {/* Back button */}
        <Link
          href="/kegiatan"
          className="inline-flex items-center gap-2 mb-8 text-sm text-brand-neon hover:underline font-medium"
        >
          <ArrowLeft size={16} /> Kembali ke Kegiatan
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 break-words leading-tight">
          {item.name}
        </h1>

        {/* Poster Image */}
        {item.imageUrl && isWebOrLocalUrl(item.imageUrl) && (
          <div className="mb-8 rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-80 md:h-[450px] max-h-[500px] w-full shadow-2xl bg-black/40 flex items-center justify-center">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover object-center" />
          </div>
        )}

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Tanggal Kegiatan</span>
              <p className="text-sm font-semibold text-white">
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
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Waktu Pelaksanaan</span>
                <p className="text-sm font-semibold text-white">{item.time} WIB</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Lokasi Acara</span>
              <p className="text-sm font-semibold text-white break-words">{item.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shrink-0">
              <Users size={20} />
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Pihak Penyelenggara</span>
              <p className="text-sm font-semibold text-white break-words">{item.organizer}</p>
            </div>
          </div>
        </div>

        {/* Description Content */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Deskripsi Kegiatan</h2>
          <div className="whitespace-pre-wrap break-words text-gray-200 leading-relaxed bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            {item.description}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end pt-6 border-t border-white/10">
          <CopyLinkButton />
        </div>
      </article>
    </div>
  );
}
