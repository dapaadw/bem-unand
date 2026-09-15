import { prisma } from '../../../../lib/prisma';

export default async function AuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Audit Log</h1>
      {logs.length === 0 ? (
        <p className="text-gray-400">Belum ada aktivitas tercatat.</p>
      ) : (
        <table className="w-full text-sm text-left">
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
                <td className="py-2 pr-4">{log.createdAt.toLocaleString('id-ID')}</td>
                <td className="py-2 pr-4">{log.user.name}</td>
                <td className="py-2 pr-4">{log.action}</td>
                <td className="py-2 pr-4">{log.entityType}</td>
                <td className="py-2">{log.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
