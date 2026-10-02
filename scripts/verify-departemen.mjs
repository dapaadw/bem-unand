import assert from 'node:assert/strict';
import { copyFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sealData } from 'iron-session';
import { departmentProfile, departmentDetails, isDepartmentHead } from '../src/lib/departemen.js';

// npm run build, then node --env-file=.env scripts/verify-departemen.mjs
// Writes target a disposable database copy; official development records remain untouched.
assert.equal(isDepartmentHead('Wakil Ketua'), false);
assert.equal(isDepartmentHead('Kepala Departemen'), true);
assert.ok(departmentProfile({ name: ' ' }).error);
assert.ok(departmentDetails(null).error);
for (const body of [{ staff: null }, { staff: [{ name: 'Test', role: '' }] }, { proker: [{}] }, { contact: { whatsappUrl: 'javascript:alert(1)' } }, { contact: { instagramUrl: 'https://instagram.com.evil.test/test' } }]) assert.ok(departmentDetails(body).error);
const database = path.resolve('.next/departemen-verification.db');
await copyFile(path.resolve('prisma', process.env.DATABASE_URL.slice(5)), database);
const db = new PrismaClient({ datasourceUrl: `file:${database}` });
let server;
try {
  await db.departemen.deleteMany();
  const user = await db.user.create({ data: { name: 'Department verification', email: `department-${Date.now()}@test.invalid`, passwordHash: bcrypt.hashSync('Department-Verification-Only', 10), role: 'ADMIN' } });
  const cookie = async (role) => `bem_unand_session=${await sealData({ userId: user.id, role, name: user.name }, { password: process.env.SESSION_SECRET, ttl: 28800 })}`;
  const admin = await cookie('ADMIN');
  const superuser = await cookie('SUPERUSER');
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3104'], { env: { ...process.env, DATABASE_URL: `file:${database}` }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk; });
  server.stderr.on('data', (chunk) => { output += chunk; });
  const base = 'http://localhost:3104';
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(`${base}/api/departemen`)).ok) { ready = true; break; } } catch {}
    if (server.exitCode !== null) throw new Error(output);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, output);
  async function api(route, method = 'GET', body, session = admin) {
    const response = await fetch(base + route, { method, headers: { 'Content-Type': 'application/json', ...(session ? { Cookie: session } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
    return { status: response.status, data: await response.json() };
  }
  assert.equal((await api('/api/departemen', 'POST', { name: 'Denied' }, '')).status, 401);
  assert.equal((await api('/api/departemen', 'POST', { name: 'Denied' }, superuser)).status, 403);
  const created = await api('/api/departemen', 'POST', { name: 'Departemen Uji A', photoUrl: '/logo.png', description: 'Deskripsi departemen\nBaris kedua' });
  assert.equal(created.status, 201);
  const item = created.data;
  const route = `/api/departemen/${item.id}`;
  const second = (await api('/api/departemen', 'POST', { name: 'Departemen Uji B' })).data;
  assert.equal((await api('/api/departemen')).data.items.length, 2);
  const details = {
    staff: [{ name: 'Wakil Uji', role: 'Wakil Ketua', photoUrl: '/logo.png' }, { name: 'Kepala Uji', role: 'Kepala Departemen', photoUrl: '/logo.png', identity: 'Identitas uji', achievements: 'Prestasi uji' }],
    proker: [{ name: 'Program Uji', description: 'Deskripsi program' }],
    contact: { whatsappUrl: 'https://wa.me/6281234567890', instagramUrl: 'https://instagram.com/departemenuji' },
  };
  assert.equal((await api(route, 'PATCH', details)).status, 200);
  for (const method of ['PUT', 'PATCH', 'DELETE']) assert.equal((await api(route, method, method === 'DELETE' ? undefined : {}, superuser)).status, 403);
  assert.equal((await api(route, 'PUT', null)).status, 400);
  for (const body of [null, { staff: null }, { staff: [{}] }, { proker: [{ name: ' ' }] }, { contact: { instagramUrl: 'javascript:alert(1)' } }]) assert.equal((await api(route, 'PATCH', body)).status, 400);
  assert.equal((await api(route)).data.staff.length, 2, 'Invalid payload must not erase staff');
  assert.equal((await api(route, 'PATCH', { proker: [{ name: 'Program Baru' }] })).status, 200);
  let current = (await api(route)).data;
  assert.equal(current.staff.length, 2, 'Omitted staff must remain intact');
  assert.equal(current.contact.instagramUrl, details.contact.instagramUrl);
  assert.equal((await api(`/api/departemen/${second.id}`)).data.staff.length, 0, 'Details must stay in their department');
  let detail = await (await fetch(`${base}/departemen/${item.slug}`)).text();
  for (const text of ['Kepala Uji', 'Wakil Uji', 'Identitas uji', 'Prestasi uji', 'Program Baru', '/logo.png', details.contact.whatsappUrl, details.contact.instagramUrl]) assert.ok(detail.includes(text), text);
  assert.ok(detail.indexOf('Kepala Uji') < detail.indexOf('Wakil Uji'), 'Deputy must not be selected as head');
  assert.equal((await api(route, 'PUT', { name: 'Departemen Setelah Edit', photoUrl: '' })).status, 200);
  current = (await api(route)).data;
  assert.equal(current.slug, item.slug);
  assert.equal(current.photoUrl, null);
  assert.equal((await api(route, 'PATCH', { contact: null })).status, 200);
  current = (await api(route)).data;
  assert.equal(current.contact, null);
  assert.equal(current.staff.length, 2);
  assert.equal((await api(`/api/departemen/${second.id}`, 'DELETE')).status, 200);
  assert.equal((await api(route, 'DELETE')).status, 200);
  assert.equal((await fetch(`${base}/departemen/${item.slug}`)).status, 404);
  assert.equal((await api(route)).status, 404);
  assert.equal(await db.departemenStaff.count({ where: { departemenId: item.id } }), 0);
  assert.equal(await db.programKerja.count({ where: { departemenId: item.id } }), 0);
  assert.ok((await (await fetch(`${base}/departemen`)).text()).includes('Belum ada departemen.'));
  console.log('PASS: dynamic departments, CRUD/roles, profile/photos, head/deputy detection, staff/proker/contact validation, omitted-field preservation, clearing contacts, cascade delete/404.');
  if (process.env.DEPARTMENT_VERIFY_REVIEW === '1') {
    console.log(`Disposable UI review: ${base}; login ${user.email} / Department-Verification-Only. Press Enter to clean up.`);
    const input = createInterface({ input: process.stdin, output: process.stdout });
    await new Promise((resolve) => input.once('line', resolve)); input.close();
  }
} finally {
  if (server && server.exitCode === null) { server.kill(); await new Promise((resolve) => server.once('exit', resolve)); }
  await db.$disconnect(); await rm(database, { force: true });
}
