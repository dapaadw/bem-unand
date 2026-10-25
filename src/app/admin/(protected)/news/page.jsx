import { FileText } from "lucide-react";
import { requirePageRole } from "../../../../lib/requirePageRole";
import { prisma } from "../../../../lib/prisma";
import NewsManagerClient from "../../../../components/admin/NewsManagerClient";

export default async function NewsManagerPage() {
  await requirePageRole(["ADMIN"]);
  const items = await prisma.publikasi.findMany({
    orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
  });

  const serializable = items.map((i) => ({
    ...i,
    publishedAt: i.publishedAt.toISOString(),
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#6d2031]/50">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#f8f1e7] flex items-center gap-2.5">
            <FileText className="text-brand-neon" size={24} />
            <span>Manajemen Publikasi</span>
          </h1>
          <p className="text-xs md:text-sm text-[#d4c0bd] mt-1">
            Publikasikan artikel, rilis pers, kajian hukum, dan berita resmi BEM
            FH UNAND.
          </p>
        </div>
        <span className="text-xs px-3.5 py-1.5 rounded-full bg-[#3a0d18] border border-[#6d2031] text-brand-neon font-medium font-mono-lib self-start sm:self-auto">
          {serializable.length} Publikasi
        </span>
      </div>
      <NewsManagerClient initialItems={serializable} />
    </div>
  );
}
