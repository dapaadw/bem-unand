import { Suspense } from "react";
import { requirePageRole } from "../../../../lib/requirePageRole";
import { prisma } from "../../../../lib/prisma";
import { buildAuditLogWhere } from "../../../../lib/auditLogFilter";
import AuditLogFilterBar from "../../../../components/admin/AuditLogFilterBar";
import {
  ScrollText,
  Download,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default async function AuditLogPage({ searchParams }) {
  await requirePageRole(["ADMIN", "SUPERUSER"]);
  const sp = await searchParams;
  let where;
  try {
    where = buildAuditLogWhere(sp);
  } catch (error) {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3">
        <h1 className="text-lg font-bold text-white">Audit Log Sistem</h1>
        <p role="alert" className="text-rose-400 text-xs">
          {error.message}
        </p>
        <Link
          href="/admin/audit-log"
          className="inline-flex items-center gap-1.5 text-xs text-brand-neon hover:underline"
        >
          <RotateCcw size={13} aria-hidden="true" />
          <span>Reset Filter</span>
        </Link>
      </div>
    );
  }

  const total = await prisma.auditLog.count({ where });
  const pages = Math.max(1, Math.ceil(total / 50));
  const requested = /^\d+$/.test(sp?.page || "") ? Number(sp.page) : 1;
  const page = Math.max(
    1,
    Math.min(pages, Number.isSafeInteger(requested) ? requested : 1),
  );

  const [logs, admins, entityTypes] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: { user: { select: { name: true, role: true } } },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 50,
      skip: (page - 1) * 50,
    }),
    prisma.user.findMany({
      select: { id: true, name: true, role: true },
      orderBy: { name: "asc" },
    }),
    prisma.auditLog.findMany({
      distinct: ["entityType"],
      select: { entityType: true },
    }),
  ]);

  const query = new URLSearchParams(
    Object.entries(sp || {}).filter(
      ([key, value]) => key !== "page" && typeof value === "string",
    ),
  );
  const exportQuery = query.toString();
  const pageLink = (number) =>
    "/admin/audit-log?" +
    new URLSearchParams([
      ...query.entries(),
      ["page", String(number)],
    ]).toString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
              <ScrollText size={20} aria-hidden="true" />
            </div>
            <span>Audit Trail &amp; Kepatuhan</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Rekam jejak setiap mutasi data oleh pengelola BEM FH UNAND untuk
            transparansi dan integritas
          </p>
        </div>

        <a
          href={`/api/audit-log/export${exportQuery ? `?${exportQuery}` : ""}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:brightness-105 transition-all shadow-sm self-start sm:self-auto"
        >
          <Download size={14} aria-hidden="true" />
          <span>Ekspor CSV Laporan</span>
        </a>
      </div>

      {/* Modern Interactive Filter Bar */}
      <Suspense fallback={<div className="h-32 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse" />}>
        <AuditLogFilterBar
          admins={admins}
          entityTypes={entityTypes.map((e) => e.entityType)}
          currentFilters={{
            userId: sp?.userId || "",
            action: sp?.action || "",
            entityType: sp?.entityType || "",
            from: sp?.from || "",
            to: sp?.to || "",
          }}
          totalCount={total}
          pageCount={logs.length}
        />
      </Suspense>

      {/* Audit Log Table */}
      <div className="relative z-10 rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden backdrop-blur-md">
        {logs.length === 0 ? (
          <div className="p-10 text-center text-xs text-gray-400 space-y-1.5">
            <p>
              Tidak ada catatan aktivitas audit yang sesuai dengan kriteria
              filter.
            </p>
            <Link
              href="/admin/audit-log"
              className="text-brand-neon hover:underline"
            >
              Reset kriteria pencarian
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-black/30 text-gray-400 border-b border-white/10 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3.5 px-4">Waktu (WIB)</th>
                  <th className="py-3.5 px-4">Pengguna</th>
                  <th className="py-3.5 px-4">Tindakan</th>
                  <th className="py-3.5 px-4">Entitas</th>
                  <th className="py-3.5 px-4">Ringkasan Mutasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-400 whitespace-nowrap">
                      {log.createdAt.toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      WIB
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-white block">
                        {log.user.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {log.user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          log.action === "CREATE"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : log.action === "DELETE"
                              ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                              : "bg-brand-neon/15 text-brand-neon border-brand-neon/30"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-200">
                      {log.entityType}
                    </td>
                    <td className="py-3.5 px-4 text-gray-300 max-w-md">
                      {log.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination & Count Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            Menampilkan <strong>{logs.length}</strong> dari{" "}
            <strong>{total}</strong> log aktivitas · Halaman {page} dari {pages}
          </p>

          <div className="flex items-center gap-1.5">
            {page > 1 ? (
              <Link
                href={pageLink(page - 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              >
                <ChevronLeft size={13} aria-hidden="true" />
                <span>Sebelumnya</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.02] text-gray-600 border border-white/5 cursor-not-allowed">
                <ChevronLeft size={13} aria-hidden="true" />
                <span>Sebelumnya</span>
              </span>
            )}

            {page < pages ? (
              <Link
                href={pageLink(page + 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              >
                <span>Berikutnya</span>
                <ChevronRight size={13} aria-hidden="true" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.02] text-gray-600 border border-white/5 cursor-not-allowed">
                <span>Berikutnya</span>
                <ChevronRight size={13} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
