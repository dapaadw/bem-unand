import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import { HARDCODED_DEPARTEMEN, sortDepartments, getDeptPhotoPosition } from '../../data/departemen';

export const revalidate = 3600;

export default async function DepartemenPage() {
  let dbItems = [];
  try {
    dbItems = await prisma.departemen.findMany({
      include: { staff: true, proker: true, contact: true },
      orderBy: { name: 'asc' },
    });
  } catch {
    dbItems = [];
  }

  const hardcodedMap = new Map(HARDCODED_DEPARTEMEN.map((d) => [d.slug, d]));

  // Merge: DB is primary source of truth, fallback to hardcoded data
  const rawItems = dbItems.length > 0
    ? dbItems.map((db) => {
        const fallback = hardcodedMap.get(db.slug);
        return {
          ...fallback,
          ...db,
          name: db.name || fallback?.name,
          photoUrl: db.photoUrl || fallback?.photoUrl || null,
          description: db.description || fallback?.description || '',
          staff: db.staff?.length > 0 ? db.staff : (fallback?.staff || []),
          proker: db.proker?.length > 0 ? db.proker : (fallback?.proker || []),
          contact: db.contact || fallback?.contact || null,
        };
      })
    : HARDCODED_DEPARTEMEN;

  const items = sortDepartments(rawItems);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-6 pt-32 pb-20 container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-3">
            Struktur Organisasi
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Departemen
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-2">
            Mengenal seluruh departemen, biro, dan bidang kepengurusan Kabinet Aksara Juang dalam menjalankan roda organisasi.
          </p>
          <p className="text-xs text-brand-neon font-semibold">{items.length} departemen</p>
        </div>

        {!items.length && <p className="text-gray-400 text-center">Belum ada departemen.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id || item.slug}
              href={`/departemen/${item.slug}`}
              className="block min-w-0 break-words bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-6 hover:border-brand-neon hover:bg-[#23121b]/70 hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(254,174,174,0.22)] transition-all duration-500 ease-out text-center group backdrop-blur-md"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-radial-1 mb-4 overflow-hidden border-2 border-white/10 group-hover:border-brand-neon group-hover:scale-105 transition-all shadow-md">
                {item.photoUrl && isWebOrLocalUrl(item.photoUrl) ? (
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    loading="lazy"
                    className={`w-full h-full object-cover ${getDeptPhotoPosition(item.slug)}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-neon font-bold text-xl bg-brand-red/30">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="font-semibold text-white group-hover:text-brand-neon transition-colors leading-snug">{item.name}</h2>
              {item.description && <p className="mt-2.5 text-xs text-gray-300 line-clamp-3 leading-relaxed">{item.description}</p>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
