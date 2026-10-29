import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '../../../lib/prisma';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { departmentContactUrl } from '../../../lib/departemen';
import {
  getHardcodedDepartemenBySlug,
  getDeptPhotoPosition,
  getDeptLogoUrl,
  getDeptCoverUrl,
} from '../../../data/departemen';
import ProkerAccordion from '../../../components/departemen/ProkerAccordion';
import StrukturDBKL from '../../../components/departemen/StrukturDBKL';
import PresidiumGreetingSection from '../../../components/departemen/PresidiumGreetingSection';

export const revalidate = 3600;

export default async function DepartemenDetailPage({ params }) {
  const { slug } = await params;
  const hardcoded = getHardcodedDepartemenBySlug(slug);

  let dbItem = null;
  try {
    dbItem = await prisma.departemen.findUnique({
      where: { slug },
      include: { staff: true, proker: true },
    });
  } catch {
    dbItem = null;
  }

  if (!dbItem && !hardcoded) notFound();

  const logoUrl = getDeptLogoUrl(slug) || hardcoded?.logoUrl || dbItem?.photoUrl || null;
  const coverUrl = getDeptCoverUrl(slug) || hardcoded?.coverUrl || null;

  // Deduplicate proker by normalized name so no redundancy ever renders
  const rawProkers = dbItem?.proker?.length > 0 ? dbItem.proker : (hardcoded?.proker || []);
  const seenProkers = new Set();
  const uniqueProkers = rawProkers.filter((p) => {
    const key = (p.name || '').trim().toLowerCase();
    if (!key || seenProkers.has(key)) return false;
    seenProkers.add(key);
    return true;
  });

  // Deduplicate staff by normalized name
  const hardcodedStaffMap = new Map(
    (hardcoded?.staff || []).map((s) => [(s.name || '').trim().toLowerCase(), s])
  );

  const rawStaff = (dbItem?.staff?.length > 0 ? dbItem.staff : (hardcoded?.staff || [])).map((s) => {
    const fallback = hardcodedStaffMap.get((s.name || '').trim().toLowerCase());
    return {
      ...fallback,
      ...s,
      photoUrl: s.photoUrl || fallback?.photoUrl || null,
    };
  });
  const seenStaff = new Set();
  const uniqueStaff = rawStaff.filter((s) => {
    const key = (s.name || '').trim().toLowerCase();
    if (!key || seenStaff.has(key)) return false;
    seenStaff.add(key);
    return true;
  });

  const item = {
    ...hardcoded,
    ...dbItem,
    name: dbItem?.name || hardcoded?.name,
    category: dbItem?.category || hardcoded?.category || '',
    logoUrl,
    coverUrl,
    photoUrl: logoUrl,
    description: dbItem?.description || hardcoded?.description || '',
    staff: uniqueStaff,
    proker: uniqueProkers,
    contact: hardcoded?.contact || null,
  };

  const isLongName = (item.name || '').length > 30;
  const isKordept = item.category === 'Koordinator Departemen' || slug.startsWith('kordept-');
  const prokerLabel = isKordept ? 'Program Fungsi' : 'Program Kerja';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section: Asymmetric Edge-Fade Split (Full Left Photo with Narrow 15% Right Fade) */}
      <section className="relative flex flex-col lg:flex-row items-center min-h-0 lg:min-h-[100dvh] overflow-hidden lg:overflow-visible">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] lg:w-[1400px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(188,34,68,0.28)_0%,rgba(135,24,48,0.14)_50%,transparent_75%)] pointer-events-none blur-3xl z-0"
        />

        {/* Left / Top Photo: Flush to top under navbar on mobile, full-height on desktop */}
        {coverUrl && isWebOrLocalUrl(coverUrl) && (
          <div
            aria-hidden="true"
            className="w-full relative top-0 lg:absolute lg:left-0 lg:top-0 lg:h-[105vh] lg:w-[48vw] xl:w-[46vw] max-w-[760px] z-0 overflow-hidden shrink-0 aspect-[4/5] max-h-[52vh] sm:max-h-[60vh] lg:max-h-none lg:aspect-auto [mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.4)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.4)_88%,transparent_100%)] lg:[mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.5)_90%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.5)_90%,transparent_100%)]"
          >
            <div className="w-full h-full lg:[mask-image:linear-gradient(to_right,black_0%,black_80%,rgba(0,0,0,0.45)_91%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_80%,rgba(0,0,0,0.45)_91%,transparent_100%)]">
              <img
                src={coverUrl}
                alt={`Foto Pengurus ${item.name}`}
                className="w-full h-full object-cover select-none brightness-105 contrast-[1.03]"
                style={{ objectPosition: getDeptPhotoPosition(item.slug) }}
                fetchPriority="high"
              />
              {/* Subtle top vignette for navbar contrast */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050103]/80 via-[#050103]/30 to-transparent pointer-events-none" />
            </div>
          </div>
        )}

        <div className="container mx-auto px-6 sm:px-10 max-w-7xl relative z-10 w-full min-h-0 lg:min-h-[100dvh] flex flex-col justify-center items-center lg:items-end pt-0 lg:pt-24 sm:lg:pt-28 pb-8 lg:pb-12 -mt-8 sm:-mt-12 lg:mt-0">
          <div className="w-full lg:w-[50%] xl:w-[52%] flex flex-col justify-center text-center lg:text-left lg:ml-auto lg:pl-6 my-auto">
            {/* Back Button to Kepengurusan Directory */}
            <Link
              href="/struktur"
              className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-[#1a0a13]/70 hover:bg-[#23121b]/90 border border-white/10 hover:border-brand-neon/60 text-xs sm:text-sm text-brand-neon font-medium transition-all duration-300 w-fit mx-auto lg:mx-0 group shadow-sm backdrop-blur-md"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Kembali ke Kepengurusan</span>
            </Link>

            <p className="text-xs sm:text-sm font-bold text-brand-neon drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-2 sm:mb-2.5 uppercase tracking-wider">
              Kabinet Aksara Juang &bull; BEM FH UNAND
            </p>

            <h1
              className={`font-black tracking-normal text-white mb-3 sm:mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] ${
                isLongName
                  ? 'text-2xl sm:text-3xl md:text-4xl xl:text-[40px] leading-[1.14]'
                  : 'text-3xl sm:text-4xl md:text-5xl xl:text-[54px] leading-tight'
              }`}
            >
              {item.name}
            </h1>

            {/* Department Description (inside container, justified, with sleek scrollbar if long) */}
            {item.description && (
              <div className="max-w-xl mx-auto lg:mx-0 mb-5 p-4 sm:p-5 rounded-2xl bg-[#1a0a13]/65 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5">
                <div className="max-h-[160px] sm:max-h-[190px] lg:max-h-[210px] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(254,174,174,0.35)_transparent]">
                  <p className="text-gray-200 text-xs sm:text-sm lg:text-[14px] leading-relaxed text-justify whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              {item.staff?.length > 0 && (
                <div className="px-4 py-2 rounded-xl bg-[#1a0a13]/70 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-sm">
                  <span className="font-bold text-white text-base mr-1.5">{item.staff.length}</span>
                  Pengurus
                </div>
              )}
              {item.proker?.length > 0 && (
                <div className="px-4 py-2 rounded-xl bg-[#1a0a13]/70 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-sm">
                  <span className="font-bold text-brand-neon text-base mr-1.5">{item.proker.length}</span>
                  {prokerLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <article className="px-6 pb-28 container mx-auto max-w-5xl relative z-10 pt-8 sm:pt-14 lg:pt-36">
        {/* Presidium Specific: Greeting & Executive Section right below Hero */}
        {slug === 'presidium' && <PresidiumGreetingSection />}

        {/* Program Fungsi (Interactive Dropdown Accordion) */}
        <ProkerAccordion prokers={item.proker} isKordept={isKordept} />

        {/* Struktur Organisasi (Below Program Fungsi, Layout matching PDF) */}
        <StrukturDBKL staff={item.staff} deptName={item.name} slug={slug} />

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
