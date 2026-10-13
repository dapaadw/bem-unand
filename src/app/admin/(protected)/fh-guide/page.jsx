import { BookOpen } from 'lucide-react';
import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import FhGuideManagerClient from '../../../../components/admin/FhGuideManagerClient';

export default async function FhGuideManagerPage() {
  await requirePageRole(['ADMIN']);
  const [links, faqs] = await Promise.all([
    prisma.guideLink.findMany({ orderBy: { category: 'asc' } }),
    prisma.faq.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <BookOpen className="text-brand-neon" size={24} />
            <span>Manajemen FH Guide &amp; FAQ</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Kelola direktori dokumen panduan akademik/kemahasiswaan serta pertanyaan umum (FAQ).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon font-medium">
            {links.length} Link Dokumen
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium">
            {faqs.length} FAQ
          </span>
        </div>
      </div>
      <FhGuideManagerClient initialLinks={links} initialFaqs={faqs} />
    </div>
  );
}
