import assert from 'node:assert/strict';
import { copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import { sealData } from 'iron-session';
import { kegiatanPayload, isGoogleFormUrl } from '../src/lib/kegiatan.js';

// Run after npm run build. API writes only target a disposable database copy.
const valid = { type: 'LOMBA', name: 'Lomba Pengujian', date: '2026-10-15', time: '09:30', publishedAt: '2026-09-27T00:00:00Z', location: 'Lokasi uji', organizer: 'Tim uji', description: 'Deskripsi uji\nBaris kedua', publicationUrl: 'https://example.com/publikasi', registrationUrl: 'https://forms.gle/test-form' };
for (const changes of [{ name: ' ' }, { type: 'OTHER' }, { date: '2026-02-30' }, { date: '' }, { time: '24:00' }, { publishedAt: null }, { publicationUrl: 'javascript:alert(1)' }, { registrationUrl: 'https://forms.gle.evil.test/test' }, { registrationUrl: 'https://example.com/form' }]) assert.ok(kegiatanPayload({ ...valid, ...changes }).error);
assert.ok(isGoogleFormUrl('https://docs.google.com/forms/d/e/test/viewform'));
assert.equal(isGoogleFormUrl('http://forms.gle/test'), false);
assert.equal(kegiatanPayload({ ...valid, type: 'INTERNAL' }).data.registrationUrl, null);
const database = path.resolve('.next/kegiatan-verification.db');
assert.ok(process.env.DATABASE_URL?.startsWith('file:'));
await copyFile(path.resolve('prisma', process.env.DATABASE_URL.slice(5)), database);
const db = new PrismaClient({ datasourceUrl: `file:${database}` });
let server;
try {
  await db.kegiatan.deleteMany();
  const user = await db.user.create({ data: { name: 'Kegiatan verification', email: `kegiatan-${Date.now()}@test.invalid`, passwordHash: 'test-only', role: 'ADMIN' } });
  const cookie = async (role) => `bem_unand_session=${await sealData({ userId: user.id, role, name: user.name }, { password: process.env.SESSION_SECRET, ttl: 28800 })}`;
  const admin = await cookie('ADMIN');
  const superuser = await cookie('SUPERUSER');
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3103'], { env: { ...process.env, DATABASE_URL: `file:${database}` }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk; });
  server.stderr.on('data', (chunk) => { output += chunk; });
  const base = 'http://localhost:3103';
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(`${base}/api/kegiatan`)).ok) { ready = true; break; } } catch {}
    if (server.exitCode !== null) throw new Error(output);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, output);
  async function api(route, method = 'GET', body, session = admin) {
    const response = await fetch(base + route, { method, headers: { 'Content-Type': 'application/json', ...(session ? { Cookie: session } : {}) }, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, data: await response.json() };
  }
  assert.equal((await api('/api/kegiatan', 'POST', valid, '')).status, 401);
  assert.equal((await api('/api/kegiatan', 'POST', valid, superuser)).status, 403);
  for (const change of [{ name: ' ' }, { type: 'OTHER' }, { date: '2026-02-30' }, { registrationUrl: 'https://example.com/form' }]) assert.equal((await api('/api/kegiatan', 'POST', { ...valid, ...change })).status, 400);
  const items = [];
  for (let index = 1; index <= 5; index++) {
    const result = await api('/api/kegiatan', 'POST', { ...valid, type: index % 2 ? 'LOMBA' : 'INTERNAL', name: `Kegiatan Uji ${index}`, date: `2026-10-${String(20 - index).padStart(2, '0')}`, publishedAt: `2026-09-${20 + index}T00:00:00Z` });
    assert.equal(result.status, 201, JSON.stringify(result));
    if (index % 2 === 0) assert.equal(result.data.registrationUrl, null);
    items.push(result.data);
  }
  assert.equal((await api('/api/kegiatan?q=Uji&type=LOMBA')).data.items.length, 3);
  assert.equal((await api('/api/kegiatan?type=INTERNAL')).data.items.length, 2);
  assert.equal((await api('/api/kegiatan?q=does-not-exist')).data.items.length, 0);
  assert.equal((await api('/api/kegiatan?type=INVALID')).status, 400);
  assert.equal((await fetch(`${base}/kegiatan?type=INVALID`)).status, 200);
  const list = await (await fetch(`${base}/kegiatan?q=Uji&type=LOMBA`)).text();
  assert.ok(list.includes('Kegiatan Uji 1') && !list.includes('Kegiatan Uji 2'));
  const item = items[4];
  let detail = (await (await fetch(`${base}/kegiatan/${item.slug}`)).text()).replaceAll('<!-- -->', '');
  for (const text of ['09:30 WIB', 'Lokasi uji', 'Tim uji', valid.publicationUrl, valid.registrationUrl, 'Daftar Sekarang']) assert.ok(detail.includes(text), text);
  const internalDetail = await (await fetch(`${base}/kegiatan/${items[1].slug}`)).text();
  assert.ok(!internalDetail.includes('Daftar Sekarang'));
  const sections = (html) => html.slice(html.indexOf('<section'), html.lastIndexOf('</section>') + 10);
  let home = sections(await (await fetch(base)).text());
  assert.ok(!home.includes('Kegiatan Uji 1'));
  assert.ok(home.indexOf('Kegiatan Uji 5') < home.indexOf('Kegiatan Uji 4'));
  assert.equal((await api(`/api/kegiatan/${item.id}`, 'PUT', { name: 'Edited' }, superuser)).status, 403);
  assert.equal((await api(`/api/kegiatan/${item.id}`, 'DELETE', undefined, '')).status, 401);
  assert.equal((await api(`/api/kegiatan/${item.id}`, 'PUT', { date: '' })).status, 400);
  const updated = await api(`/api/kegiatan/${item.id}`, 'PUT', { name: 'Kegiatan Setelah Edit', publicationUrl: '', registrationUrl: '', time: '' });
  assert.equal(updated.status, 200);
  for (const field of ['publicationUrl', 'registrationUrl', 'time']) assert.equal(updated.data[field], null);
  detail = await (await fetch(`${base}/kegiatan/${item.slug}`)).text();
  assert.ok(detail.includes('Kegiatan Setelah Edit') && detail.includes('Link pendaftaran belum tersedia.'));
  assert.ok(!detail.includes('Daftar Sekarang'));
  assert.equal((await api(`/api/kegiatan/${items[0].id}`, 'PUT', { publishedAt: '2026-09-28T00:00:00Z' })).status, 200);
  home = sections(await (await fetch(base)).text());
  assert.ok(home.indexOf('Kegiatan Uji 1') < home.indexOf('Kegiatan Setelah Edit'));
  assert.equal((await api(`/api/kegiatan/${item.id}`, 'DELETE')).status, 200);
  assert.equal((await fetch(`${base}/kegiatan/${item.slug}`)).status, 404);
  assert.equal((await api(`/api/kegiatan/${item.id}`)).status, 404);
  home = sections(await (await fetch(base)).text());
  assert.ok(home.includes('Kegiatan Uji 2') && !home.includes('Kegiatan Setelah Edit'));
  assert.equal(await db.auditLog.count({ where: { userId: user.id, entityType: 'Kegiatan' } }), 8);
  console.log('PASS: Kegiatan CRUD/roles, schedules, Google Form links, internal events, search/filter, clearing links, delete/404, Home ordering/replacement, audit logging.');
} finally {
  if (server && server.exitCode === null) { server.kill(); await new Promise((resolve) => server.once('exit', resolve)); }
  await db.$disconnect();
  await rm(database, { force: true });
}
