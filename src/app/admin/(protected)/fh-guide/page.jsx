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
    <div>
      <h1 className="text-2xl font-bold mb-6">Manajemen FH Guide</h1>
      <FhGuideManagerClient initialLinks={links} initialFaqs={faqs} />
    </div>
  );
}
