import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole } from '../../../lib/requireRole';
import { saveFile, removeEvidence } from '../../../lib/storage';
import { sendAspirasiNotification } from '../../../lib/mailer';
import { generateTicketCode } from '../../../lib/ticketCode';
import { aspirasiPayload, aspirasiWhere } from '../../../lib/aspirasi';

export async function POST(request) {
  let data, file, buktiUrl = null;
  try {
    let payload;
    if (request.headers.get('content-type')?.includes('multipart/form-data')) {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
      if (!['true', 'false'].includes(payload.isAnonymous)) throw new Error('Pilihan anonim tidak valid.');
      payload.isAnonymous = payload.isAnonymous === 'true';
      file = form.get('bukti');
    } else payload = await request.json();
    data = aspirasiPayload(payload);
    if (file?.size > 0) buktiUrl = await saveFile(file);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Formulir tidak valid.' }, { status: 400 });
  }
  let created;
  try {
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        created = await prisma.aspirasi.create({ data: { ...data, buktiUrl, ticketCode: await generateTicketCode() } });
        break;
      } catch (error) { if (error.code !== 'P2002' || attempt === 4) throw error; }
    }
  } catch {
    if (buktiUrl) await removeEvidence(buktiUrl);
    return NextResponse.json({ error: 'Aspirasi belum tersimpan. Silakan coba lagi.' }, { status: 500 });
  }
  await sendAspirasiNotification(created).catch(() => console.error('[mailer] Notifikasi gagal; aspirasi tetap tersimpan.'));
  revalidatePath('/admin/aspirasi');
  return NextResponse.json({ ok: true, ticketCode: created.ticketCode }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
}
export async function GET(request) {
  const { error } = await requireRole(['SUPERUSER']);
  if (error) return error;
  let where;
  try { where = aspirasiWhere(Object.fromEntries(new URL(request.url).searchParams)); }
  catch (error) { return NextResponse.json({ error: error.message }, { status: 400 }); }
  const items = await prisma.aspirasi.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] });
  return NextResponse.json({ items }, { headers: { 'Cache-Control': 'private, no-store' } });
}
