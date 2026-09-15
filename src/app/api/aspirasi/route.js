import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';
import { requireRole } from '../../../lib/requireRole';
import { saveFile } from '../../../lib/storage';
import { sendAspirasiNotification } from '../../../lib/mailer';

export async function POST(request) {
  const contentType = request.headers.get('content-type') || '';
  let payload = {};
  let buktiUrl = null;

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    payload = {
      nama: form.get('nama')?.toString() || '',
      nim: form.get('nim')?.toString() || '',
      cp: form.get('cp')?.toString() || '',
      email: form.get('email')?.toString() || '',
      pihakDituju: form.get('pihakDituju')?.toString() || '',
      deskripsi: form.get('deskripsi')?.toString() || '',
      harapan: form.get('harapan')?.toString() || '',
      isAnonymous: form.get('isAnonymous') === 'true',
    };
    const file = form.get('bukti');
    if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
      try {
        buktiUrl = await saveFile(file);
      } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
    }
  } else {
    payload = await request.json().catch(() => ({}));
  }

  if (!payload.pihakDituju || !payload.deskripsi) {
    return NextResponse.json({ error: 'Pihak dituju dan deskripsi wajib diisi.' }, { status: 400 });
  }

  const created = await prisma.aspirasi.create({
    data: {
      nama: payload.isAnonymous ? null : (payload.nama || null),
      nim: payload.isAnonymous ? null : (payload.nim || null),
      cp: payload.isAnonymous ? null : (payload.cp || null),
      email: payload.isAnonymous ? null : (payload.email || null),
      pihakDituju: payload.pihakDituju,
      deskripsi: payload.deskripsi,
      buktiUrl,
      harapan: payload.harapan || null,
      isAnonymous: !!payload.isAnonymous,
    },
  });

  sendAspirasiNotification(created).catch((e) => console.error('Gagal mengirim notifikasi aspirasi:', e.message));

  revalidatePath('/admin/aspirasi');

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
}

export async function GET() {
  const { error } = await requireRole(['ADMIN']);
  if (error) return error;

  const items = await prisma.aspirasi.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}
