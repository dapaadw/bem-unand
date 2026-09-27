import { prisma } from '../../../../../lib/prisma';
import { requireRole } from '../../../../../lib/requireRole';
import { readEvidence } from '../../../../../lib/storage';
export async function GET(_request, { params }) {
  const { error } = await requireRole(['ADMIN']);
  if (error) return error;
  const { id } = await params;
  const item = await prisma.aspirasi.findUnique({ where: { id }, select: { buktiUrl: true } });
  const name = item?.buktiUrl;
  const buffer = name && await readEvidence(name);
  if (!buffer) return Response.json({ error: 'Bukti tidak ditemukan.' }, { status: 404 });
  return new Response(buffer, { headers: { 'Content-Type': name.endsWith('.png') ? 'image/png' : 'image/jpeg', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'Content-Disposition': 'inline; filename="bukti.' + (name.endsWith('.png') ? 'png' : 'jpg') + '"' } });
}
