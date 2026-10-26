import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import {
  HARDCODED_DEPARTEMEN,
  sortDepartments,
  getDeptLogoUrl,
  getDeptCoverUrl,
} from '../../data/departemen';

export const metadata = {
  title: 'Kepengurusan | BEM FH UNAND',
  description: 'Mengenal seluruh struktur kepengurusan Kabinet Aksara Juang BEM FH UNAND.',
};

export const revalidate = 3600;

function DepartmentCard({ item }) {
  if (!item) return null;
  const displayLogo = item.logoUrl || item.photoUrl;

  return (
    <Link
      href={`/struktur/${item.slug}`}
      className="flex flex-col items-center justify-center min-w-0 break-words bg-[#1a0a13]/50 border border-white/10 rounded-2xl p-6 hover:border-brand-neon hover:bg-[#23121b]/70 hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(254,174,174,0.22)] transition-all duration-500 ease-out text-center group backdrop-blur-md"
    >
      <div className="w-24 h-24 mx-auto rounded-full bg-white mb-4 overflow-hidden border-2 border-white/20 group-hover:border-brand-neon group-hover:scale-105 transition-all shadow-md shrink-0 flex items-center justify-center p-2.5">
        {displayLogo && isWebOrLocalUrl(displayLogo) ? (
          <img
            src={displayLogo}
            alt={`Logo ${item.name}`}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-sm select-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-dark font-bold text-xl bg-gray-100">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <h2 className="font-semibold text-white group-hover:text-brand-neon transition-colors leading-snug">
        {item.name}
      </h2>
    </Link>
  );
}

function LogoAksaraJuang() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2 select-none">
      {/* Circle putih di belakang logo (diperbesar) */}
      <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full bg-white flex items-center justify-center p-4 sm:p-5 md:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.45)] shrink-0">
        <img
          src="/logo_warna.png"
          alt="Logo Kabinet Aksara Juang"
          loading="lazy"
          className="w-full h-full object-contain filter select-none"
        />
      </div>
      <h2 className="mt-4 font-extrabold text-lg sm:text-xl text-white leading-snug">
        Kabinet Aksara Juang
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-[260px]">
        BEM Fakultas Hukum Universitas Andalas
      </p>
    </div>
  );
}

export default async function DepartemenPage() {
  let dbItems = [];
  try {
    dbItems = await prisma.departemen.findMany({
      select: { id: true, slug: true, name: true, photoUrl: true },
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
        const logoUrl = getDeptLogoUrl(db.slug) || fallback?.logoUrl || db.photoUrl || null;
        const coverUrl = getDeptCoverUrl(db.slug) || fallback?.coverUrl || null;
        return {
          ...fallback,
          ...db,
          name: db.name || fallback?.name,
          logoUrl,
          coverUrl,
          photoUrl: logoUrl,
          description: db.description || fallback?.description || '',
          staff: db.staff?.length > 0 ? db.staff : (fallback?.staff || []),
          proker: db.proker?.length > 0 ? db.proker : (fallback?.proker || []),
          contact: db.contact || fallback?.contact || null,
        };
      })
    : HARDCODED_DEPARTEMEN;

  const items = sortDepartments(rawItems);

  const presidiumItem = items.find((d) => d.slug === 'presidium') || hardcodedMap.get('presidium');
  const inspektoratItem = items.find((d) => d.slug === 'inspektorat-jenderal') || hardcodedMap.get('inspektorat-jenderal');
  const remainingItems = items.filter(
    (d) => d.slug !== 'presidium' && d.slug !== 'inspektorat-jenderal'
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-6 pt-32 pb-20 container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Kepengurusan
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mb-2">
            Mengenal seluruh Departemen, Biro, Kepala dan Lembaga bidang kepengurusan Kabinet Aksara Juang.
          </p>
          <p className="text-xs text-brand-neon font-semibold">{items.length} bidang kepengurusan</p>
        </div>

        {!items.length && <p className="text-gray-400 text-center">Belum ada data kepengurusan.</p>}

        {/* Top Trio: Presidium (Left), Logo Aksara Juang (Center), Inspektorat Jenderal (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-end">
          <div>
            <DepartmentCard item={presidiumItem} />
          </div>
          <div className="order-first md:order-none">
            <LogoAksaraJuang />
          </div>
          <div>
            <DepartmentCard item={inspektoratItem} />
          </div>
        </div>

        {/* Remaining Departments Grid (15 Bidang Kepengurusan) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {remainingItems.map((item) => (
            <DepartmentCard key={item.id || item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
