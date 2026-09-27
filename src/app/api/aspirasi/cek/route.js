import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

const STATUS_LABEL = {
  BARU: 'Pending',
  DIPROSES: 'Diproses',
  SELESAI: 'Selesai',
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ticketCode = searchParams.get('ticketCode')?.trim().toUpperCase();

  if (!ticketCode || !/^ASP-[A-Z0-9]{6,12}$/.test(ticketCode)) {
    return NextResponse.json({ error: 'Ticket code wajib diisi.' }, { status: 400 });
  }

  const aspirasi = await prisma.aspirasi.findUnique({
    where: { ticketCode },
    select: { ticketCode: true, pihakDituju: true, status: true, createdAt: true },
  });

  if (!aspirasi) {
    return NextResponse.json({ error: 'Ticket code tidak ditemukan.' }, { status: 404 });
  }

  return NextResponse.json({
    ticketCode: aspirasi.ticketCode,
    pihakDituju: aspirasi.pihakDituju,
    status: aspirasi.status,
    statusLabel: STATUS_LABEL[aspirasi.status],
    createdAt: aspirasi.createdAt,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
