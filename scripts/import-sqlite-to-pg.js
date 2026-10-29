// Skrip untuk mengimpor seluruh data historis dari SQLite (sqlite-export.json) ke PostgreSQL
// Jalankan setelah database PostgreSQL dimigrasi: node --env-file=.env scripts/import-sqlite-to-pg.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exportPath = path.join(__dirname, 'sqlite-export.json');

if (!fs.existsSync(exportPath)) {
  console.error('File scripts/sqlite-export.json tidak ditemukan.');
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
const prisma = new PrismaClient();

const toDate = (val) => {
  if (!val) return null;
  return typeof val === 'number' ? new Date(val) : new Date(val);
};

async function main() {
  console.log('Memulai proses import data ke PostgreSQL...');

  // 1. Departemen
  if (rawData.Departemen && rawData.Departemen.length > 0) {
    for (const d of rawData.Departemen) {
      await prisma.departemen.upsert({
        where: { id: d.id },
        update: { name: d.name, slug: d.slug, photoUrl: d.photoUrl, description: d.description },
        create: { id: d.id, name: d.name, slug: d.slug, photoUrl: d.photoUrl, description: d.description },
      });
    }
    console.log(`✓ Departemen diimpor (${rawData.Departemen.length} baris)`);
  }

  // 2. Program Kerja
  if (rawData.ProgramKerja && rawData.ProgramKerja.length > 0) {
    for (const pk of rawData.ProgramKerja) {
      await prisma.programKerja.upsert({
        where: { id: pk.id },
        update: { departemenId: pk.departemenId, name: pk.name, description: pk.description },
        create: { id: pk.id, departemenId: pk.departemenId, name: pk.name, description: pk.description },
      });
    }
    console.log(`✓ ProgramKerja diimpor (${rawData.ProgramKerja.length} baris)`);
  }

  // 3. Departemen Staff
  if (rawData.DepartemenStaff && rawData.DepartemenStaff.length > 0) {
    for (const s of rawData.DepartemenStaff) {
      await prisma.departemenStaff.upsert({
        where: { id: s.id },
        update: {
          departemenId: s.departemenId,
          name: s.name,
          role: s.role,
          photoUrl: s.photoUrl,
          identity: s.identity,
          achievements: s.achievements,
        },
        create: {
          id: s.id,
          departemenId: s.departemenId,
          name: s.name,
          role: s.role,
          photoUrl: s.photoUrl,
          identity: s.identity,
          achievements: s.achievements,
        },
      });
    }
    console.log(`✓ DepartemenStaff diimpor (${rawData.DepartemenStaff.length} baris)`);
  }

  // 4. User
  if (rawData.User && rawData.User.length > 0) {
    for (const u of rawData.User) {
      await prisma.user.upsert({
        where: { id: u.id },
        update: { name: u.name, email: u.email, passwordHash: u.passwordHash, role: u.role, createdAt: toDate(u.createdAt) },
        create: { id: u.id, name: u.name, email: u.email, passwordHash: u.passwordHash, role: u.role, createdAt: toDate(u.createdAt) },
      });
    }
    console.log(`✓ User diimpor (${rawData.User.length} baris)`);
  }

  // 5. Contacts
  if (rawData.Contacts && rawData.Contacts.length > 0) {
    for (const c of rawData.Contacts) {
      await prisma.contacts.upsert({
        where: { id: c.id },
        update: { whatsappUrl: c.whatsappUrl, instagramUrl: c.instagramUrl, email: c.email, updatedAt: toDate(c.updatedAt) || new Date() },
        create: { id: c.id, whatsappUrl: c.whatsappUrl, instagramUrl: c.instagramUrl, email: c.email, updatedAt: toDate(c.updatedAt) || new Date() },
      });
    }
    console.log(`✓ Contacts diimpor (${rawData.Contacts.length} baris)`);
  }

  // 6. Publikasi
  if (rawData.Publikasi && rawData.Publikasi.length > 0) {
    for (const pub of rawData.Publikasi) {
      await prisma.publikasi.upsert({
        where: { id: pub.id },
        update: {
          title: pub.title,
          slug: pub.slug,
          publishedAt: toDate(pub.publishedAt),
          author: pub.author,
          category: pub.category,
          body: pub.body,
          attachmentUrl: pub.attachmentUrl,
          imageUrl: pub.imageUrl,
          createdBy: pub.createdBy,
          createdAt: toDate(pub.createdAt) || new Date(),
          updatedAt: toDate(pub.updatedAt) || new Date(),
        },
        create: {
          id: pub.id,
          title: pub.title,
          slug: pub.slug,
          publishedAt: toDate(pub.publishedAt),
          author: pub.author,
          category: pub.category,
          body: pub.body,
          attachmentUrl: pub.attachmentUrl,
          imageUrl: pub.imageUrl,
          createdBy: pub.createdBy,
          createdAt: toDate(pub.createdAt) || new Date(),
          updatedAt: toDate(pub.updatedAt) || new Date(),
        },
      });
    }
    console.log(`✓ Publikasi diimpor (${rawData.Publikasi.length} baris)`);
  }

  // 7. Kegiatan
  if (rawData.Kegiatan && rawData.Kegiatan.length > 0) {
    for (const k of rawData.Kegiatan) {
      await prisma.kegiatan.upsert({
        where: { id: k.id },
        update: {
          type: k.type,
          name: k.name,
          slug: k.slug,
          date: toDate(k.date),
          time: k.time,
          publishedAt: toDate(k.publishedAt) || new Date(),
          location: k.location,
          organizer: k.organizer,
          description: k.description,
          publicationUrl: k.publicationUrl,
          registrationUrl: k.registrationUrl,
          imageUrl: k.imageUrl,
          createdBy: k.createdBy,
          createdAt: toDate(k.createdAt) || new Date(),
          updatedAt: toDate(k.updatedAt) || new Date(),
        },
        create: {
          id: k.id,
          type: k.type,
          name: k.name,
          slug: k.slug,
          date: toDate(k.date),
          time: k.time,
          publishedAt: toDate(k.publishedAt) || new Date(),
          location: k.location,
          organizer: k.organizer,
          description: k.description,
          publicationUrl: k.publicationUrl,
          registrationUrl: k.registrationUrl,
          imageUrl: k.imageUrl,
          createdBy: k.createdBy,
          createdAt: toDate(k.createdAt) || new Date(),
          updatedAt: toDate(k.updatedAt) || new Date(),
        },
      });
    }
    console.log(`✓ Kegiatan diimpor (${rawData.Kegiatan.length} baris)`);
  }

  // 8. AuditLog
  if (rawData.AuditLog && rawData.AuditLog.length > 0) {
    for (const a of rawData.AuditLog) {
      await prisma.auditLog.upsert({
        where: { id: a.id },
        update: {
          userId: a.userId,
          action: a.action,
          entityType: a.entityType,
          entityId: a.entityId,
          summary: a.summary,
          createdAt: toDate(a.createdAt) || new Date(),
        },
        create: {
          id: a.id,
          userId: a.userId,
          action: a.action,
          entityType: a.entityType,
          entityId: a.entityId,
          summary: a.summary,
          createdAt: toDate(a.createdAt) || new Date(),
        },
      });
    }
    console.log(`✓ AuditLog diimpor (${rawData.AuditLog.length} baris)`);
  }

  console.log('Semua data berhasil diimpor ke PostgreSQL!');
}

main()
  .catch((e) => {
    console.error('Gagal mengimpor data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
