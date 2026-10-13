import { prisma } from '../../lib/prisma';
import { isDriveUrl } from '../../lib/fhGuide';
import { ChevronDown, ExternalLink } from 'lucide-react';

export const revalidate = 3600;

export default async function FhGuidePage() {
  const [links, faqs] = await Promise.all([
    prisma.guideLink.findMany({ orderBy: { category: 'asc' } }),
    prisma.faq.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);

  const grouped = links.reduce((acc, link) => {
    acc[link.category] = acc[link.category] || [];
    acc[link.category].push(link);
    return acc;
  }, Object.create(null));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-6 pt-32 pb-20 container mx-auto max-w-4xl relative z-10 break-words">
        {/* Centered Page Header matching Home & other pages */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-xs font-semibold text-brand-neon uppercase tracking-wider mb-3">
            Pusat Panduan &amp; Informasi
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            FH Guide
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Direktori dokumen resmi, panduan akademik, administrasi perkuliahan, dan pertanyaan umum seputar kampus.
          </p>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <p className="text-gray-400 text-center mb-8">Direktori belum tersedia.</p>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div
              key={category}
              className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-md hover:border-brand-neon/40 transition-colors shadow-lg shadow-black/20"
            >
              <h2 className="text-sm text-brand-neon uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-neon" />
                {category}
              </h2>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.id} className="text-sm">
                    {isDriveUrl(link.url) ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-gray-200 hover:text-brand-neon transition-colors group"
                      >
                        <ExternalLink size={14} className="text-brand-neon shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        <span className="underline underline-offset-4 font-medium">{link.title}</span>
                        <span className="text-xs text-gray-400 group-hover:text-brand-neon/80 font-normal">
                          (Google Drive, tab baru)
                        </span>
                      </a>
                    ) : (
                      <span className="text-gray-400">{link.title} — Link menunggu pembaruan admin.</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        {faqs.length === 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-brand-neon">FAQ</h2>
            <p className="text-gray-400">FAQ belum tersedia.</p>
          </div>
        )}
        {faqs.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-brand-neon" />
              <h2 className="text-2xl font-bold text-white">FAQ</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-neon/40 transition-all [&_svg]:open:rotate-180"
                >
                  <summary className="cursor-pointer font-semibold text-white list-none flex justify-between items-center gap-4">
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className="text-brand-neon transition-transform duration-200 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed border-t border-white/10 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
