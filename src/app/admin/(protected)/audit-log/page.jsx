import { prisma } from '../../../../lib/prisma';
import AuditLogClient from '../../../../components/admin/AuditLogClient';
import { ScrollText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  }).catch(() => []);

  const serializableLogs = logs.map((log) => ({
    ...log,
    createdAt: log.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <ScrollText size={22} className="text-brand-neon" />
          <span>Rekam Jejak Sistem & Audit Log</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Pantau seluruh aktivitas pembuatan, pengubahan, dan penghapusan data oleh administrator.
        </p>
      </div>

      <AuditLogClient initialLogs={serializableLogs} />
    </div>
  );
}
