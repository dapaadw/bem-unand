import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import { isWebOrLocalUrl } from '../../lib/homeMedia';
import BackgroundTypography from '../../components/BackgroundTypography';

export const revalidate = 3600;

export default async function DepartemenPage() {
  const items = await prisma.departemen.findMany({ orderBy: { name: 'asc' } });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundTypography />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/departemen/${item.slug}`}
              className="block min-w-0 break-words bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-neon hover:bg-white/[0.08] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(254,174,174,0.2)] transition-all text-center group backdrop-blur-sm"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-radial-1 mb-4 overflow-hidden border-2 border-white/10 group-hover:border-brand-neon group-hover:scale-105 transition-all shadow-md">
                {item.photoUrl && isWebOrLocalUrl(item.photoUrl) ? (
                  <img src={item.photoUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
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
