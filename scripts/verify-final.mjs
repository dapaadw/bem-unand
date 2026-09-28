import assert from 'node:assert/strict';
import { copyFile, rm, mkdir, readdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sealData } from 'iron-session';
import { aspirasiPayload, dateRange } from '../src/lib/aspirasi.js';
import { toCsv } from '../src/lib/csv.js';
import { guidePayload } from '../src/lib/fhGuide.js';

assert.throws(() => dateRange('2026-02-30', ''));
assert.throws(() => dateRange('2026-09-28', '2026-09-27'));
assert.equal(dateRange('2026-09-27', '2026-09-27').lt.toISOString(), '2026-09-27T17:00:00.000Z');
assert.ok(toCsv([[' =SUM(1)', 'a,"b"\nc']]).includes("' =SUM"));
for (const url of ['javascript:alert(1)', 'https://drive.google.com.evil.test/a', 'https://evil.test/a', 'https://user@drive.google.com/a']) assert.throws(() => guidePayload('link', { category: 'a', title: 'b', url }));
const directory = path.resolve('.next/final-verification');
await mkdir(directory, { recursive: true });
const database = path.join(directory, 'database.db');
await copyFile(path.resolve('prisma', process.env.DATABASE_URL.slice(5)), database);
const db = new PrismaClient({ datasourceUrl: 'file:' + database });
let server;
try {
  await db.aspirasi.deleteMany(); await db.guideLink.deleteMany(); await db.faq.deleteMany();
  const user = await db.user.create({ data: { name: 'Verifikasi Lokal', email: 'final-' + Date.now() + '@test.invalid', passwordHash: bcrypt.hashSync('Final-Verification-Only', 10), role: 'ADMIN' } });
  const cookie = async (role) => 'bem_unand_session=' + await sealData({ userId: user.id, role, name: user.name }, { password: process.env.SESSION_SECRET, ttl: 28800 });
  const admin = await cookie('ADMIN'), superuser = await cookie('SUPERUSER');
  const base = 'http://localhost:3105';
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3105'], { env: { ...process.env, DATABASE_URL: 'file:' + database, ASPIRASI_UPLOAD_DIR: path.join(directory, 'uploads'), ASPIRASI_NOTIFICATION_MODE: 'mock' }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  let output = '';
  server.stdout.on('data', (c) => { output += c; }); server.stderr.on('data', (c) => { output += c; });
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(base + '/api/fh-guide')).ok) { ready = true; break; } } catch {}
    if (server.exitCode !== null) throw new Error(output);
    await new Promise((r) => setTimeout(r, 100));
  }
  assert.ok(ready, output);
  async function api(route, method = 'GET', body, session = admin) {
    const response = await fetch(base + route, { method, headers: { 'Content-Type': 'application/json', ...(session ? { Cookie: session } : {}) }, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'manual' });
    const text = await response.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    return { status: response.status, data, headers: response.headers };
  }
  const payload = { isAnonymous: false, nama: 'Mahasiswa Dummy', nim: '012345', cp: '080000000', email: 'mahasiswa@test.invalid', pihakDituju: 'BEM Dummy', jenisPengajuan: 'SARAN', keluhKesah: '=1+1', deskripsi: 'Deskripsi dummy, dengan koma\ndan baris baru.', harapan: 'Harapan dummy' };
  assert.throws(() => aspirasiPayload({ ...payload, isAnonymous: 'false' }));
  for (const body of [null, { ...payload, nama: ' ' }, { ...payload, jenisPengajuan: 'BAD' }, { ...payload, deskripsi: {} }, { ...payload, email: 'invalid' }]) assert.equal((await api('/api/aspirasi', 'POST', body, '')).status, 400);
  const submitted = await api('/api/aspirasi', 'POST', payload, '');
  assert.equal(submitted.status, 201, JSON.stringify(submitted.data)); assert.match(submitted.data.ticketCode, /^ASP-[A-Z0-9]{12}$/);
  const first = await db.aspirasi.findUnique({ where: { ticketCode: submitted.data.ticketCode } });
  assert.equal(first.nama, payload.nama); assert.equal(first.jenisPengajuan, 'SARAN');
  const anonymous = await api('/api/aspirasi', 'POST', { ...payload, isAnonymous: true, jenisPengajuan: 'KELUHAN' }, '');
  const anonRecord = await db.aspirasi.findUnique({ where: { ticketCode: anonymous.data.ticketCode } });
  for (const field of ['nama', 'nim', 'cp', 'email']) assert.equal(anonRecord[field], null);
  const form = () => { const fd = new FormData(); for (const [key, value] of Object.entries({ ...payload, isAnonymous: true })) fd.append(key, String(value)); return fd; };
  const invalidImage = form(); invalidImage.append('bukti', new Blob(['not an image'], { type: 'image/png' }), 'fake.png');
  assert.equal((await fetch(base + '/api/aspirasi', { method: 'POST', body: invalidImage })).status, 400);
  const tooLarge = form(); tooLarge.append('bukti', new Blob([new Uint8Array(512001)], { type: 'image/png' }), 'large.png');
  assert.equal((await fetch(base + '/api/aspirasi', { method: 'POST', body: tooLarge })).status, 400);
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j2ioAAAAASUVORK5CYII=', 'base64');
  const withImage = form(); withImage.append('bukti', new Blob([png], { type: 'image/png' }), 'proof.png');
  const uploadResponse = await fetch(base + '/api/aspirasi', { method: 'POST', body: withImage });
  assert.equal(uploadResponse.status, 201);
  const imageRecord = await db.aspirasi.findUnique({ where: { ticketCode: (await uploadResponse.json()).ticketCode } });
  const evidencePath = '/api/aspirasi/' + imageRecord.id + '/bukti';
  assert.equal((await api(evidencePath, 'GET', undefined, '')).status, 401);
  assert.equal((await api(evidencePath, 'GET', undefined, superuser)).status, 403);
  const evidence = await fetch(base + evidencePath, { headers: { Cookie: admin } });
  assert.equal(evidence.status, 200); assert.deepEqual(Buffer.from(await evidence.arrayBuffer()), png);
  assert.equal((await fetch(base + '/uploads/' + imageRecord.buktiUrl)).status, 404);
  assert.equal((await readdir(path.join(directory, 'uploads'))).length, 1);
  for (const route of ['/api/aspirasi', '/api/aspirasi/export']) {
    assert.equal((await api(route, 'GET', undefined, '')).status, 401);
    assert.equal((await api(route, 'GET', undefined, superuser)).status, 403);
  }
  assert.equal((await api('/api/aspirasi/' + first.id, 'PATCH', { status: 'SELESAI' }, superuser)).status, 403);
  assert.equal((await api('/api/aspirasi/' + first.id, 'PATCH', { status: 'INVALID' })).status, 400);
  assert.equal((await api('/api/aspirasi/missing', 'PATCH', { status: 'SELESAI' })).status, 404);
  for (const status of ['DIPROSES', 'SELESAI']) {
    assert.equal((await api('/api/aspirasi/' + first.id, 'PATCH', { status })).status, 200);
    const track = await api('/api/aspirasi/cek?ticketCode=' + first.ticketCode.toLowerCase(), 'GET', undefined, '');
    assert.equal(track.data.status, status);
    for (const key of ['nama', 'nim', 'cp', 'email', 'deskripsi', 'buktiUrl', 'keluhKesah']) assert.equal(track.data[key], undefined);
  }
  assert.equal((await api('/api/aspirasi/cek?ticketCode=ASP-ZZZZZZZZZZZZ', 'GET', undefined, '')).status, 404);
  assert.equal((await api('/api/aspirasi?from=2026-02-30')).status, 400);
  assert.equal((await api('/api/aspirasi?jenis=KELUHAN')).data.items.length, 1);
  const csv = await api('/api/aspirasi/export?jenis=KELUHAN');
  assert.ok(csv.data.includes(anonRecord.ticketCode)); assert.ok(!csv.data.includes(first.ticketCode));
  assert.ok(!csv.data.includes(payload.email)); assert.ok(csv.data.includes("'=1+1"));
  assert.match(csv.headers.get('cache-control'), /no-store/);
  const today = new Date(first.createdAt.getTime() + 7 * 3600000).toISOString().slice(0, 10);
  assert.equal((await api('/api/aspirasi?from=' + today + '&to=' + today)).data.items.length, 3);
  assert.equal((await api('/api/aspirasi?to=2000-01-01')).data.items.length, 0);
  for (const section of ['home', 'news', 'kegiatan', 'departemen', 'aspirasi', 'fh-guide']) {
    const denied = await api('/admin/' + section, 'GET', undefined, superuser);
    assert.ok([307, 308].includes(denied.status), section + ': ' + denied.status);
    assert.ok(!denied.data.includes(payload.email), 'Private data leaked');
  }
  const guide = { kind: 'link', category: 'constructor', title: 'Panduan Dummy', url: 'https://drive.google.com/drive/folders/dummy-verification' };
  assert.equal((await api('/api/fh-guide', 'POST', guide, '')).status, 401);
  assert.equal((await api('/api/fh-guide', 'POST', guide, superuser)).status, 403);
  assert.equal((await api('/api/fh-guide', 'POST', { ...guide, url: 'javascript:alert(1)' })).status, 400);
  const link = await api('/api/fh-guide', 'POST', guide); assert.equal(link.status, 201);
  const faq = await api('/api/fh-guide', 'POST', { kind: 'faq', question: 'Pertanyaan dummy?', answer: 'Jawaban dummy\nBaris kedua.' }); assert.equal(faq.status, 201);
  assert.ok((await api('/fh-guide', 'GET', undefined, '')).data.includes('Panduan Dummy'));
  assert.equal((await api('/api/fh-guide/link/' + link.data.id, 'PUT', { ...guide, title: 'Panduan Setelah Edit' })).status, 200);
  assert.equal((await api('/api/fh-guide/faq/' + faq.data.id, 'PUT', { question: 'FAQ Setelah Edit?', answer: 'Jawaban diperbarui.' })).status, 200);
  let publicGuide = await api('/fh-guide', 'GET', undefined, '');
  assert.ok(publicGuide.data.includes('Panduan Setelah Edit')); assert.ok(publicGuide.data.includes('Jawaban diperbarui.'));
  for (const method of ['PUT', 'DELETE']) assert.equal((await api('/api/fh-guide/link/' + link.data.id, method, guide, superuser)).status, 403);
  assert.equal((await api('/api/fh-guide/constructor/x', 'DELETE')).status, 400);
  assert.equal((await api('/api/fh-guide/faq/missing', 'DELETE')).status, 404);
  assert.equal((await api('/api/fh-guide/link/' + link.data.id, 'DELETE')).status, 200);
  assert.equal((await api('/api/fh-guide/faq/' + faq.data.id, 'DELETE')).status, 200);
  publicGuide = await api('/fh-guide', 'GET', undefined, '');
  assert.ok(publicGuide.data.includes('Direktori belum tersedia.')); assert.ok(publicGuide.data.includes('FAQ belum tersedia.'));
  const logs = await db.auditLog.findMany({ where: { userId: user.id } });
  for (const action of ['CREATE', 'UPDATE', 'DELETE']) assert.ok(logs.some((log) => log.action === action && log.entityType === 'GuideLink'));
  for (let i = 0; i < 205; i++) await db.auditLog.create({ data: { userId: user.id, action: 'UPDATE', entityType: 'PaginationTest', entityId: String(i), summary: 'Audit dummy ' + i } });
  const audit = await api('/admin/audit-log?entityType=PaginationTest&page=5', 'GET', undefined, superuser);
  assert.equal(audit.status, 200); assert.ok(audit.data.includes('Audit dummy 0')); assert.ok(audit.data.includes('205'));
  assert.equal((await api('/api/audit-log/export?action=INVALID', 'GET', undefined, superuser)).status, 400);
  assert.equal((await api('/api/audit-log/export?from=2026-02-30', 'GET', undefined, superuser)).status, 400);
  assert.ok((await api('/api/audit-log/export?entityType=PaginationTest', 'GET', undefined, superuser)).data.includes('Audit dummy 0'));
  assert.equal((await api('/api/audit-log/export', 'POST', {}, superuser)).status, 405);
  const original = (await api('/api/profile')).data;
  assert.equal((await api('/api/profile', 'PUT', { ...original, backgroundColor: 'red' })).status, 400);
  assert.equal((await api('/api/profile', 'PUT', { ...original, backgroundColor: '#102030' })).status, 200);
  assert.ok((await api('/', 'GET', undefined, '')).data.includes('--color-brand-dark:#102030'));
  assert.equal((await api('/api/profile', 'PUT', original || { backgroundColor: null })).status, 200);
  const restored = (await api('/', 'GET', undefined, '')).data;
  assert.ok(restored.includes('--color-brand-dark:' + (original?.backgroundColor || '#1a0000')));
  assert.ok(output.includes('[mailer] Mock:'));
  console.log('PASS: Aspirasi form/anonymous/tickets/upload privacy/status/date filters/CSV; FH Guide CRUD/validation/empty states; page/API roles; complete audit pagination/export; theme persistence; mocked notifications.');
  if (process.env.FINAL_VERIFY_REVIEW === '1') {
    await api('/api/fh-guide', 'POST', { ...guide, category: 'Akademik (Dummy)', title: 'Panduan Akademik Dummy' });
    await api('/api/fh-guide', 'POST', { kind: 'faq', question: 'Bagaimana menggunakan FH Guide?', answer: 'Pilih dokumen sesuai kategori. Data ini hanya untuk pengujian.' });
    console.log('Disposable browser review: ' + base + '; login ' + user.email + ' / Final-Verification-Only; ticket ' + first.ticketCode + '. Press Enter to clean up.');
    const input = createInterface({ input: process.stdin, output: process.stdout });
    await new Promise((resolve) => input.once('line', resolve)); input.close();
  }
} finally {
  if (server && server.exitCode === null) { server.kill(); await new Promise((resolve) => server.once('exit', resolve)); }
  await db.$disconnect();
  // This directory is fixed within this project's .next workspace, never a user-supplied path.
  assert.equal(path.dirname(directory), path.resolve('.next'));
  await rm(directory, { force: true, recursive: true });
}
