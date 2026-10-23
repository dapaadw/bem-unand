import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { isDepartmentHead, departmentContactUrl } from '../../../lib/departemen';
import { getHardcodedDepartemenBySlug, getDeptPhotoPosition } from '../../../data/departemen';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

export default async function DepartemenDetailPage({ params }) {
  const { slug } = await params;
  const hardcoded = getHardcodedDepartemenBySlug(slug);

  let dbItem = null;
  try {
    dbItem = await prisma.departemen.findUnique({
      where: { slug },
      include: { staff: true, proker: true, contact: true },
    });
  } catch {
    dbItem = null;
  }

  if (!dbItem && !hardcoded) notFound();

  const item = {
    ...hardcoded,
    ...dbItem,
    name: dbItem?.name || hardcoded?.name,
    photoUrl: dbItem?.photoUrl || hardcoded?.photoUrl || null,
    description: dbItem?.description || hardcoded?.description || '',
    staff: dbItem?.staff?.length > 0 ? dbItem.staff : (hardcoded?.staff || []),
    proker: dbItem?.proker?.length > 0 ? dbItem.proker : (hardcoded?.proker || []),
    contact: dbItem?.contact || hardcoded?.contact || null,
  };

  const heads = item.staff.filter((s) => isDepartmentHead(s.role));
  const others = item.staff.filter((s) => !isDepartmentHead(s.role));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <article className="px-6 pt-32 pb-16 container mx-auto max-w-4xl relative z-10">
        <Link
          href="/departemen"
          className="inline-flex items-center gap-2 mb-6 text-sm text-brand-neon hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Departemen
        </Link>

        {/* Main Banner Card */}
        <div className="bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-radial-1 border-2 border-white/10 shrink-0 flex items-center justify-center shadow-lg">
              {item.photoUrl && isWebOrLocalUrl(item.photoUrl) ? (
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className={`w-full h-full object-cover ${getDeptPhotoPosition(item.slug)}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-neon font-bold text-3xl bg-brand-red/30">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-1 min-w-0">
              <span className="inline-block px-3 py-0.5 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-2">
                {item.category || 'Departemen'}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 break-words">
                {item.name}
              </h1>
              {item.description && (
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Kepala Departemen */}
        {heads.map((kepala) => (
          <div key={kepala.id || kepala.name} className="bg-[#1a0a13]/50 border border-white/10 rounded-xl p-5 mb-6 break-words backdrop-blur-md shadow-lg">
            <h2 className="text-xs text-brand-neon uppercase tracking-wide font-semibold mb-2">Kepala Departemen</h2>
            <div className="flex items-center gap-4">
              {kepala.photoUrl && isWebOrLocalUrl(kepala.photoUrl) ? (
                <img src={kepala.photoUrl} alt={kepala.name} className="w-16 h-16 rounded-full object-cover border border-white/10" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-red/30 border border-white/10 flex items-center justify-center text-brand-neon font-bold text-lg">
                  {kepala.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold text-lg text-white">{kepala.name}</p>
                <p className="text-sm text-gray-400">{kepala.role}</p>
                {kepala.identity && <p className="text-xs text-gray-500 mt-0.5">{kepala.identity}</p>}
              </div>
            </div>
          </div>
        ))}

        {/* Staff & Pengurus */}
        {others.length > 0 && (
          <div className="bg-[#1a0a13]/50 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md shadow-lg">
            <h2 className="text-brand-neon font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-neon" />
              Staff &amp; Pengurus ({others.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {others.map((s) => (
                <div key={s.id || s.name} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                  {s.photoUrl && isWebOrLocalUrl(s.photoUrl) ? (
                    <img src={s.photoUrl} alt={s.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/10" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-neon text-xs font-bold shrink-0">
                      {s.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                    <p className="text-xs text-gray-400 truncate">{s.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Program Kerja */}
        {item.proker.length > 0 ? (
          <div className="bg-[#1a0a13]/50 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-md shadow-lg">
            <h2 className="text-brand-neon font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-neon" />
              Program Kerja &amp; Kegiatan ({item.proker.length})
            </h2>
            <div className="divide-y divide-white/10">
              {item.proker.map((p, idx) => (
                <div key={p.id || idx} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-neon font-mono text-xs font-bold shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-sm sm:text-base">{p.name}</h3>
                      {p.description && (
                        <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">{p.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mb-8">Program kerja dan kegiatan belum tersedia.</p>
        )}

        {/* Contact Links */}
        {item.contact && (item.contact.whatsappUrl || item.contact.instagramUrl) && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {item.contact.whatsappUrl && departmentContactUrl(item.contact.whatsappUrl, 'whatsapp') && (
              <a
                href={item.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#1a0a13]/50 border border-white/10 hover:border-brand-neon hover:bg-[#23121b]/70 text-brand-neon text-sm font-semibold transition-colors backdrop-blur-md"
              >
                WhatsApp Departemen &rarr;
              </a>
            )}
            {item.contact.instagramUrl && departmentContactUrl(item.contact.instagramUrl, 'instagram') && (
              <a
                href={item.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#1a0a13]/50 border border-white/10 hover:border-brand-neon hover:bg-[#23121b]/70 text-brand-neon text-sm font-semibold transition-colors backdrop-blur-md"
              >
                Instagram Departemen &rarr;
              </a>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
