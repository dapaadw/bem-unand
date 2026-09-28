import { prisma } from './prisma';

export async function logAction({ userId, action, entityType, entityId, summary }) {
  if (!userId) return;
  await prisma.auditLog.create({
    data: { userId, action, entityType, entityId, summary },
  });
}
