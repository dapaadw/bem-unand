import { prisma } from "../../../../lib/prisma";
import { requirePageRole } from "../../../../lib/requirePageRole";
import { aspirasiWhere } from "../../../../lib/aspirasi";
import { Suspense } from "react";
import AspirasiManagerClient from "../../../../components/admin/AspirasiManagerClient";
import AspirasiFilterBar from "../../../../components/admin/AspirasiFilterBar";
import {
  MessageSquareWarning,
  Download,
} from "lucide-react";

export default async function AspirasiManagerPage({ searchParams }) {
  await requirePageRole(["ADMIN"]);
  const sp = await searchParams;
  let where, error;
  try {
    where = aspirasiWhere(sp);
  } catch (e) {
    error = e.message;
  }

  const items = error
    ? []
    : await prisma.aspirasi.findMany({
        where,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      });
  const query = new URLSearchParams(
    Object.entries(sp || {}).filter(([, v]) => typeof v === "string"),
  ).toString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
              <MessageSquareWarning size={20} aria-hidden="true" />
            </div>
            <span>Aspirasi &amp; Aduan Mahasiswa</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Daftar masukan, saran, dan pengaduan fasilitas civitas akademika FH
            UNAND
          </p>
        </div>

        {!error && (
          <a
            href={"/api/aspirasi/export?" + query}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:brightness-105 transition-all shadow-sm self-start sm:self-auto"
          >
            <Download size={14} aria-hidden="true" />
            <span>Unduh Rekap CSV</span>
          </a>
        )}
      </div>

      {/* Modern Interactive Filter Bar */}
      <Suspense fallback={<div className="h-32 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse" />}>
        <AspirasiFilterBar
          currentFilters={{
            from: sp?.from || "",
            to: sp?.to || "",
            jenis: sp?.jenis || "",
            status: sp?.status || "",
          }}
          totalCount={items.length}
        />
      </Suspense>

      {error ? (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs"
        >
          {error}
        </div>
      ) : (
        <div className="relative z-10">
          <AspirasiManagerClient
            initialItems={items.map((i) => ({
              ...i,
              createdAt: i.createdAt.toISOString(),
            }))}
          />
        </div>
      )}
    </div>
  );
}
