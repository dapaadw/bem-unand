import { prisma } from '../../lib/prisma';
import { isDriveUrl } from '../../lib/fhGuide';

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
    <section className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-3xl break-words">
      <h1 className="text-3xl font-bold mb-2">FH Guide</h1>
      <p className="text-gray-400 mb-8">Direktori dokumen &amp; pertanyaan umum seputar akademik, administrasi, organisasi, dan layanan kampus.</p>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-400 mb-8">Direktori belum tersedia.</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-3">{category}</h2>
            <ul className="space-y-2">
              {items.map((link) => (
                <li key={link.id}>
                  {isDriveUrl(link.url) ? <a href={link.url} target="_blank" rel="noreferrer" className="text-gray-200 hover:text-brand-neon underline">{link.title} <span className="text-xs">(Google Drive, tab baru)</span></a> : <span>{link.title} — Link menunggu pembaruan admin.</span>}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {faqs.length === 0 && <div><h2 className="text-2xl font-bold mb-4 text-brand-neon">FAQ</h2><p className="text-gray-400">FAQ belum tersedia.</p></div>}
      {faqs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-brand-neon">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <summary className="cursor-pointer font-medium">{faq.question}</summary>
                <p className="mt-2 text-gray-300 whitespace-pre-wrap">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
