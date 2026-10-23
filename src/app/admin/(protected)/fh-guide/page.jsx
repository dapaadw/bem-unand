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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#6d2031]/50">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#f8f1e7] flex items-center gap-2.5">
            <BookOpen className="text-brand-neon" size={24} />
            <span>Manajemen FH Guide &amp; FAQ</span>
          </h1>
          <p className="text-xs md:text-sm text-[#d4c0bd] mt-1">
            Kelola direktori dokumen panduan akademik/kemahasiswaan serta pertanyaan umum (FAQ).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-none bg-[#3a0d18] border border-[#6d2031] text-brand-neon font-medium font-mono-lib">
            {links.length} Link Dokumen
          </span>
          <span className="text-xs px-3 py-1 rounded-none bg-[#1f151a] border border-[#6d2031] text-[#d4c0bd] font-medium font-mono-lib">
            {faqs.length} FAQ
          </span>
        </div>
      </div>
      <FhGuideManagerClient initialLinks={links} initialFaqs={faqs} />
    </div>
  );
}
