import { prisma } from '../../../../lib/prisma';
import FhGuideManagerClient from '../../../../components/admin/FhGuideManagerClient';
import { BookOpen } from 'lucide-react';

export default async function FhGuideManagerPage() {
  const [links, faqs] = await Promise.all([
    prisma.guideLink.findMany({ orderBy: { category: 'asc' } }),
    prisma.faq.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <BookOpen size={22} className="text-brand-neon" />
          <span>Pusat Informasi &amp; FAQ FH Guide</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Kelola direktori link penting dan FAQ untuk panduan mahasiswa Fakultas Hukum.
        </p>
      </div>
      <FhGuideManagerClient initialLinks={links} initialFaqs={faqs} />
    </div>
  );
}
