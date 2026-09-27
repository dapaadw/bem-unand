import assert from 'node:assert/strict';
import { copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sealData } from 'iron-session';
import { youtubeEmbedUrl, isWebOrLocalUrl } from '../src/lib/homeMedia.js';
import { validateSchedule } from '../src/lib/kegiatanSchedule.js';

// Run after npm run build: node --env-file=.env scripts/verify-home.mjs
// All API writes target a disposable database copy, never the development database.
assert.equal(youtubeEmbedUrl('https://youtu.be/abcdefghijk?t=30'), 'https://www.youtube-nocookie.com/embed/abcdefghijk');
assert.equal(youtubeEmbedUrl('https://www.youtube.com/watch?v=abcdefghijk'), 'https://www.youtube-nocookie.com/embed/abcdefghijk');
assert.equal(youtubeEmbedUrl('https://www.youtube.com/shorts/abcdefghijk'), 'https://www.youtube-nocookie.com/embed/abcdefghijk');
for (const value of ['javascript:alert(1)', 'https://youtube.com.evil.test/watch?v=abcdefghijk', 'https://youtu.be/short']) assert.equal(youtubeEmbedUrl(value), null);
assert.equal(isWebOrLocalUrl('//evil.test/image.jpg'), false);
assert.equal(isWebOrLocalUrl('/uploads/image.jpg'), true);
assert.ok(validateSchedule({ time: '25:00' }));
assert.ok(validateSchedule({ publishedAt: 'invalid' }));
assert.equal(validateSchedule({ time: '09:30', publishedAt: '2026-09-27T00:00:00Z' }), null);

const source = process.env.DATABASE_URL;
assert.ok(source?.startsWith('file:'), 'SQLite DATABASE_URL required');
const database = path.resolve('.next/home-verification.db');
await copyFile(path.resolve('prisma', source.slice(5)), database);
const db = new PrismaClient({ datasourceUrl: `file:${database}` });
let server;
try {
  const user = await db.user.create({ data: { name: 'Home verification', email: `home-${Date.now()}@test.invalid`, passwordHash: bcrypt.hashSync('Home-Verification-Only', 10), role: 'ADMIN' } });
  const cookie = `bem_unand_session=${await sealData({ userId: user.id, role: 'ADMIN', name: user.name }, { password: process.env.SESSION_SECRET, ttl: 28800 })}`;
  await db.kegiatan.deleteMany();
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3101'], {
    env: { ...process.env, DATABASE_URL: `file:${database}` }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk; });
  server.stderr.on('data', (chunk) => { output += chunk; });
  const base = 'http://localhost:3101';
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(`${base}/api/profile`)).ok) { ready = true; break; } } catch {}
    if (server.exitCode !== null) throw new Error(output);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, output);
  async function api(route, method, body, authenticated = true) {
    const response = await fetch(base + route, { method, headers: { 'Content-Type': 'application/json', ...(authenticated ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, data: await response.json() };
  }
  assert.equal((await api('/api/profile', 'PUT', { title: 'Denied' }, false)).status, 401);
  assert.equal((await api('/api/profile', 'PUT', { videoUrl: 'javascript:alert(1)' })).status, 400);
  const profile = { title: 'Verification Home', subtitle: 'Verification subtitle', heroImageUrl: '/logo.png', heroImageAlt: 'Verification photo', videoUrl: 'https://youtu.be/abcdefghijk', visiMisi: 'Verification vision', logoPhilosophy: 'Verification philosophy', ctaText: 'Activities', ctaLink: '/kegiatan' };
  assert.equal((await api('/api/profile', 'PUT', profile)).status, 200);
  assert.equal((await api('/api/profile', 'GET')).data.videoUrl, profile.videoUrl);
  assert.equal((await api('/api/contacts', 'PUT', { whatsappUrl: 'https://wa.me/6281234567890', instagramUrl: 'https://instagram.com/test', email: 'test@example.com' })).status, 200);
  const ids = [];
  for (let index = 1; index <= 5; index++) {
    const result = await api('/api/kegiatan', 'POST', { type: 'INTERNAL', name: `Verification activity ${index}`, date: `2026-10-${String(10 - index).padStart(2, '0')}`, publishedAt: `2026-09-${String(20 + index).padStart(2, '0')}T00:00:00Z`, time: '09:30', location: 'Test location', organizer: 'Test organizer', description: 'Test description' });
    assert.equal(result.status, 201, JSON.stringify(result.data));
    ids.push(result.data.id);
  }
  let html = await (await fetch(base)).text();
  // Inspect rendered sections, excluding React's serialized payload.
  const renderedSections = (document) => document.slice(document.indexOf('<section'), document.lastIndexOf('</section>') + 10);
  html = renderedSections(html);
  for (const text of ['Verification Home', 'Verification photo', 'Verification vision', 'Verification philosophy', 'youtube-nocookie.com/embed/abcdefghijk', 'id="kontak"', 'mailto:test@example.com', '09:30']) assert.ok(html.includes(text), text);
  assert.ok(!html.includes('Verification activity 1'));
  for (let index = 5; index > 2; index--) assert.ok(html.indexOf(`Verification activity ${index}`) < html.indexOf(`Verification activity ${index - 1}`));
  assert.equal((await api(`/api/kegiatan/${ids[0]}`, 'PUT', { publishedAt: '2026-09-27T00:00:00Z' })).status, 200);
  html = renderedSections(await (await fetch(base)).text());
  assert.ok(html.indexOf('Verification activity 1') < html.indexOf('Verification activity 5'));
  assert.ok(!html.includes('Verification activity 2'));
  assert.equal((await api(`/api/kegiatan/${ids[0]}`, 'DELETE')).status, 200);
  html = renderedSections(await (await fetch(base)).text());
  assert.ok(html.includes('Verification activity 2'));
  assert.ok(!html.includes('Verification activity 1'));
  console.log('PASS: media validation, API authorization/persistence, Home sections, publication ordering, four-item replacement, update/delete revalidation.');
  if (process.env.HOME_VERIFY_REVIEW === '1') {
    console.log(`Disposable UI review: ${base}; login ${user.email} / Home-Verification-Only. Press Enter to clean up.`);
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
