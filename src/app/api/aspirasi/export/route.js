import { prisma } from '../../../../lib/prisma';
import { requireRole } from '../../../../lib/requireRole';
import { aspirasiWhere, STATUS_LABEL } from '../../../../lib/aspirasi';
import { toCsv } from '../../../../lib/csv';
export async function GET(request) {
  const { error } = await requireRole(['ADMIN', 'SUPERUSER']);
  if (error) return error;
  let where;
  try { where = aspirasiWhere(Object.fromEntries(new URL(request.url).searchParams)); }
  catch (error) { return Response.json({ error: error.message }, { status: 400 }); }
  const items = await prisma.aspirasi.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] });
  const rows = [['Tiket', 'Tanggal (UTC)', 'Jenis', 'Status', 'Anonim', 'Nama', 'NIM', 'CP', 'Email', 'Pihak dituju', 'Keluh kesah', 'Deskripsi', 'Harapan', 'Bukti (akses admin)'], ...items.map((i) => [i.ticketCode, i.createdAt.toISOString(), i.jenisPengajuan, STATUS_LABEL[i.status], i.isAnonymous ? 'Ya' : 'Tidak', ...['nama', 'nim', 'cp', 'email'].map((key) => i.isAnonymous ? '' : i[key]), i.pihakDituju, i.keluhKesah, i.deskripsi, i.harapan, i.buktiUrl ? '/api/aspirasi/' + i.id + '/bukti' : ''])];
  return new Response(toCsv(rows), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="rekap-aspirasi.csv"', 'Cache-Control': 'private, no-store' } });
}
