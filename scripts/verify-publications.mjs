import assert from 'node:assert/strict';
import { copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sealData } from 'iron-session';
import { publicationPayload, publicationPage } from '../src/lib/publication.js';

// npm run build, then node --env-file=.env scripts/verify-publications.mjs
// All test writes target a disposable copy of the database.
for (const value of ['abc', '-1', '0', '1.5', '99999999999999999999', ['2']]) assert.equal(publicationPage(value), 1);
assert.equal(publicationPage('2'), 2);
const valid = { title: 'Test', publishedAt: '2026-09-27', author: 'Test author', category: 'kajian', body: 'Test body' };
for (const change of [{ title: ' ' }, { author: 123 }, { publishedAt: '2026-02-30' }, { publishedAt: 'invalid' }, { category: 'unknown' }, { category: 'constructor' }, { attachmentUrl: 'javascript:alert(1)' }, { attachmentUrl: '//evil.test/file.pdf' }]) assert.ok(publicationPayload({ ...valid, ...change }).error);
assert.equal(publicationPayload(valid).data.category, 'Kajian');

const source = process.env.DATABASE_URL;
assert.ok(source?.startsWith('file:'), 'SQLite DATABASE_URL required');
const database = path.resolve('.next/publication-verification.db');
await copyFile(path.resolve('prisma', source.slice(5)), database);
const db = new PrismaClient({ datasourceUrl: `file:${database}` });
let server;
try {
  await db.publikasi.deleteMany();
  const user = await db.user.create({ data: { name: 'Publication verification', email: `publication-${Date.now()}@test.invalid`, passwordHash: bcrypt.hashSync('Publication-Verification-Only', 10), role: 'ADMIN' } });
  const makeCookie = async (role) => `bem_unand_session=${await sealData({ userId: user.id, role, name: user.name }, { password: process.env.SESSION_SECRET, ttl: 28800 })}`;
  const adminCookie = await makeCookie('ADMIN');
  const superuserCookie = await makeCookie('SUPERUSER');
  const legacy = await db.publikasi.create({ data: { title: 'Legacy Kajian', slug: 'legacy-kajian-test', publishedAt: new Date('2026-08-01'), author: 'Test author', category: 'kajian', body: 'Legacy body' } });
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3102'], { env: { ...process.env, DATABASE_URL: `file:${database}` }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk; });
  server.stderr.on('data', (chunk) => { output += chunk; });
  const base = 'http://localhost:3102';
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(`${base}/api/publikasi`)).ok) { ready = true; break; } } catch {}
    if (server.exitCode !== null) throw new Error(output);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, output);
  async function api(route, method = 'GET', body, cookie = adminCookie) {
    const response = await fetch(base + route, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, data: await response.json() };
  }
  assert.equal((await api('/api/publikasi', 'POST', valid, '')).status, 401);
  assert.equal((await api('/api/publikasi', 'POST', valid, superuserCookie)).status, 403);
  const items = [];
  for (let index = 1; index <= 11; index++) {
    const result = await api('/api/publikasi', 'POST', { ...valid, title: `Kajian Pengujian ${String(index).padStart(2, '0')}`, publishedAt: `2026-09-${String(index).padStart(2, '0')}`, body: 'Materi kajian\nBaris kedua <script>test</script>', attachmentUrl: 'https://example.com/source.pdf' });
    assert.equal(result.status, 201, JSON.stringify(result));
    items.push(result.data);
  }
  for (const params of ['', '?page=abc', '?page=-3']) {
    const result = await api(`/api/publikasi${params}`);
    assert.equal(result.status, 200);
    assert.equal(result.data.page, 1);
    assert.equal(result.data.items.length, 9);
    assert.equal(result.data.items[0].title, 'Kajian Pengujian 11');
  }
  let result = await api('/api/publikasi?page=999');
  assert.equal(result.data.page, 2);
  assert.equal(result.data.items.length, 3);
  result = await api('/api/publikasi?q=Pengujian&category=Kajian');
  assert.equal(result.data.total, 11);
  assert.equal((await api('/api/publikasi?category=kajian')).data.total, 12);
  result = await api('/api/publikasi?category=Pengumuman');
  assert.equal(result.data.total, 0);
  assert.equal(result.data.totalPages, 1);
  assert.equal(result.data.page, 1);
  const list = await fetch(`${base}/publikasi?q=Pengujian&category=Kajian&page=1`);
  assert.equal(list.status, 200);
  const listHtml = await list.text();
  assert.ok(listHtml.includes('page=2&amp;q=Pengujian&amp;category=Kajian'));
  const item = items[10];
  let detail = await (await fetch(`${base}/publikasi/${item.slug}`)).text();
  for (const text of [item.title, 'Test author', 'Materi kajian', '&lt;script&gt;', 'https://example.com/source.pdf', 'Salin link']) assert.ok(detail.includes(text), text);
  assert.equal((await api(`/api/publikasi/${item.id}`, 'PUT', { title: 'Changed' }, superuserCookie)).status, 403);
  assert.equal((await api(`/api/publikasi/${item.id}`, 'DELETE', undefined, '')).status, 401);
  for (const change of [{ title: ' ' }, { publishedAt: 'invalid' }, { attachmentUrl: 'javascript:alert(1)' }]) assert.equal((await api(`/api/publikasi/${item.id}`, 'PUT', change)).status, 400);
  assert.equal((await api(`/api/publikasi/${item.id}`, 'PUT', { title: 'Kajian Setelah Edit', attachmentUrl: '' })).status, 200);
  detail = await (await fetch(`${base}/publikasi/${item.slug}`)).text();
  assert.ok(detail.includes('Kajian Setelah Edit'));
  assert.ok(!detail.includes('https://example.com/source.pdf'));
  assert.equal((await api(`/api/publikasi/${legacy.id}`, 'PUT', { title: 'Legacy Kajian Updated' })).status, 200);
  assert.equal((await api(`/api/publikasi/${item.id}`, 'DELETE')).status, 200);
  assert.equal((await fetch(`${base}/publikasi/${item.slug}`)).status, 404);
  assert.equal((await api(`/api/publikasi/${item.id}`)).status, 404);
  assert.equal(await db.auditLog.count({ where: { entityType: 'Publikasi', userId: user.id } }), 14);
  console.log('PASS: CRUD, roles, validation, legacy categories, search/filter, pagination, escaped detail, attachment removal, delete/404, audit logging.');
  if (process.env.PUBLICATION_VERIFY_REVIEW === '1') {
    console.log(`Disposable UI review: ${base}; login ${user.email} / Publication-Verification-Only. Press Enter to clean up.`);
    const input = createInterface({ input: process.stdin, output: process.stdout });
    await new Promise((resolve) => input.once('line', resolve));
    input.close();
  }
} finally {
  if (server && server.exitCode === null) {
    server.kill();
    await new Promise((resolve) => server.once('exit', resolve));
  }
  await db.$disconnect();
  await rm(database, { force: true });
}
