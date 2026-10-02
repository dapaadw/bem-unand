import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import { buildAuditLogWhere } from '../../../../lib/auditLogFilter';
import { ScrollText, Download, Filter, RotateCcw } from 'lucide-react';

export default async function AuditLogPage({ searchParams }) {
  await requirePageRole(['ADMIN', 'SUPERUSER']);
  const sp = await searchParams;
  let where;
  try { where = buildAuditLogWhere(sp); } catch (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <ScrollText size={22} className="text-brand-neon" />
            <span>Rekam Jejak Sistem &amp; Audit Log</span>
          </h1>
        </div>
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
          <p role="alert">{error.message}</p>
        </div>
        <a href="/admin/audit-log" className="inline-flex items-center gap-1.5 text-xs text-brand-neon hover:underline">
          <RotateCcw size={12} /> Reset filter
        </a>
      </div>
    );
  }

  const total = await prisma.auditLog.count({ where });
  const pages = Math.max(1, Math.ceil(total / 50));
  const requested = /^\d+$/.test(sp?.page || '') ? Number(sp.page) : 1;
  const page = Math.max(1, Math.min(pages, Number.isSafeInteger(requested) ? requested : 1));

  const [logs, admins, entityTypes] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: 50,
      skip: (page - 1) * 50,
    }),
    prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.auditLog.findMany({ distinct: ['entityType'], select: { entityType: true } }),
  ]);

  const query = new URLSearchParams(Object.entries(sp || {}).filter(([key, value]) => key !== 'page' && typeof value === 'string'));
  const exportQuery = query.toString();
  const pageLink = (number) => '/admin/audit-log?' + new URLSearchParams([...query.entries(), ['page', String(number)]]).toString();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <ScrollText size={22} className="text-brand-neon" />
            <span>Rekam Jejak Sistem &amp; Audit Log</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Pantau seluruh aktivitas pembuatan, pengubahan, dan penghapusan data oleh administrator.
          </p>
        </div>
        <a
          href={`/api/audit-log/export${exportQuery ? `?${exportQuery}` : ''}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)] self-start sm:self-auto"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </a>
      </div>

      {/* Filter Form */}
      <form method="get" className="bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-zinc-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Filter Aktivitas</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select aria-label="Nama admin" name="userId" defaultValue={sp?.userId || ''} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all">
            <option value="">Semua Admin</option>
            {admins.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <select aria-label="Aksi" name="action" defaultValue={sp?.action || ''} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all">
            <option value="">Semua Aksi</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
          <select aria-label="Entitas" name="entityType" defaultValue={sp?.entityType || ''} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all">
            <option value="">Semua Entitas</option>
            {entityTypes.map((e) => (
              <option key={e.entityType} value={e.entityType}>{e.entityType}</option>
            ))}
          </select>
          <input aria-label="Tanggal awal (WIB)" type="date" name="from" defaultValue={sp?.from || ''} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all" />
          <input aria-label="Tanggal akhir (WIB)" type="date" name="to" defaultValue={sp?.to || ''} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all" />
        </div>
        <div className="flex justify-end mt-3">
          <button type="submit" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors">Filter</button>
        </div>
      </form>

      {/* Table */}
      {logs.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 space-y-3">
          <div className="inline-flex p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400">
            <ScrollText size={28} />
          </div>
          <h3 className="text-sm font-bold text-white">Tidak ada aktivitas yang cocok</h3>
          <p className="text-xs text-zinc-400">Tidak ada aktivitas yang cocok dengan filter.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-zinc-400 border-b border-white/10 bg-black/20">
                <tr>
                  <th className="py-3 px-4 font-semibold">Waktu</th>
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Aksi</th>
                  <th className="py-3 px-4 font-semibold">Entitas</th>
                  <th className="py-3 px-4 font-semibold">Ringkasan</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-zinc-300">{log.createdAt.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</td>
                    <td className="py-3 px-4 text-white font-medium">{log.user.name}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        log.action === 'CREATE' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                        log.action === 'DELETE' ? 'bg-red-500/15 text-red-300 border border-red-500/30' :
                        'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{log.entityType}</td>
                    <td className="py-3 px-4 text-zinc-400">{log.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <nav className="flex flex-wrap items-center gap-4 text-xs text-zinc-400" aria-label="Halaman audit log">
        <p>{total} aktivitas · Halaman {page} dari {pages}</p>
        {page > 1 && (
          <a className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors" href={pageLink(page - 1)}>Sebelumnya</a>
        )}
        {page < pages && (
          <a className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors" href={pageLink(page + 1)}>Berikutnya</a>
        )}
        <a className="text-brand-neon hover:underline flex items-center gap-1" href="/admin/audit-log">
          <RotateCcw size={12} /> Reset filter
        </a>
      </nav>
    </div>
  );
}
