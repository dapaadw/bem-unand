import { requirePageRole } from '../../../../lib/requirePageRole';
import { prisma } from '../../../../lib/prisma';
import { buildAuditLogWhere } from '../../../../lib/auditLogFilter';

export default async function AuditLogPage({ searchParams }) {
  await requirePageRole(['ADMIN', 'SUPERUSER']);
  const sp = await searchParams;
  let where;
  try { where = buildAuditLogWhere(sp); } catch (error) { return <div><h1 className="text-2xl font-bold mb-4">Audit Log</h1><p role="alert">{error.message}</p><a href="/admin/audit-log" className="underline">Reset filter</a></div>; }
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
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Audit Log</h1>
        <a
          href={`/api/audit-log/export${exportQuery ? `?${exportQuery}` : ''}`}
          className="text-sm px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold"
        >
          Export CSV
        </a>
      </div>

      <form method="get" className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        <select aria-label="Nama admin" name="userId" defaultValue={sp?.userId || ''} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          <option value="">Semua Admin</option>
          {admins.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <select aria-label="Aksi" name="action" defaultValue={sp?.action || ''} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          <option value="">Semua Aksi</option>
          <option value="CREATE">CREATE</option>
          <option value="UPDATE">UPDATE</option>
          <option value="DELETE">DELETE</option>
        </select>
        <select aria-label="Entitas" name="entityType" defaultValue={sp?.entityType || ''} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          <option value="">Semua Entitas</option>
          {entityTypes.map((e) => (
            <option key={e.entityType} value={e.entityType}>{e.entityType}</option>
          ))}
        </select>
        <input aria-label="Tanggal awal (WIB)" type="date" name="from" defaultValue={sp?.from || ''} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        <input aria-label="Tanggal akhir (WIB)" type="date" name="to" defaultValue={sp?.to || ''} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        <button type="submit" className="col-span-2 md:col-span-1 px-3 py-2 rounded-lg bg-white/10 text-sm">Filter</button>
      </form>

      {logs.length === 0 ? (
        <p className="text-gray-400">Tidak ada aktivitas yang cocok dengan filter.</p>
      ) : (
        <div className="overflow-x-auto"><table className="w-full text-sm text-left">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-2 pr-4">Waktu</th>
              <th className="py-2 pr-4">User</th>
              <th className="py-2 pr-4">Aksi</th>
              <th className="py-2 pr-4">Entitas</th>
              <th className="py-2">Ringkasan</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-white/5">
                <td className="py-2 pr-4">{log.createdAt.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</td>
                <td className="py-2 pr-4">{log.user.name}</td>
                <td className="py-2 pr-4">{log.action}</td>
                <td className="py-2 pr-4">{log.entityType}</td>
                <td className="py-2">{log.summary}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      )}
      <nav className="mt-5 flex flex-wrap gap-4" aria-label="Halaman audit log">
        <p>{total} aktivitas · Halaman {page} dari {pages}</p>
        {page > 1 && <a className="underline" href={pageLink(page - 1)}>Sebelumnya</a>}
        {page < pages && <a className="underline" href={pageLink(page + 1)}>Berikutnya</a>}
        <a className="underline" href="/admin/audit-log">Reset filter</a>
      </nav>
    </div>
  );
}
