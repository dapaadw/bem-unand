import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

import { DEPARTEMEN_DATA } from '../scripts/seed-departemen.js';

async function main() {
  // 1. Departemen & Program Kerja
  for (const item of DEPARTEMEN_DATA) {
    const dept = await prisma.departemen.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        category: item.category,
        description: item.description,
        order: item.order,
      },
      create: {
        name: item.name,
        slug: item.slug,
        category: item.category,
        description: item.description,
        order: item.order,
      },
    });

    if (item.programs && item.programs.length > 0) {
      for (const prog of item.programs) {
        await prisma.programKerja.upsert({
          where: {
            departemenId_name: {
              departemenId: dept.id,
              name: prog.name,
            },
          },
          update: {
            description: prog.description,
          },
          create: {
            departemenId: dept.id,
            name: prog.name,
            description: prog.description,
          },
        });
      }
    }
  }

  // 2. Akun Otentikasi Pengurus
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@bemfhunand.local';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'ChangeMe123!';
  const superEmail = process.env.SUPERUSER_SEED_EMAIL || 'dosen@bemfhunand.local';
  const superPassword = process.env.SUPERUSER_SEED_PASSWORD || 'ChangeMe123!';

  if (adminPassword.length < 8 || superPassword.length < 8) {
    throw new Error('ADMIN_SEED_PASSWORD dan SUPERUSER_SEED_PASSWORD wajib minimal 8 karakter.');
  }

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const superHash = await bcrypt.hash(superPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin BEM FH UNAND',
      email: adminEmail,
      passwordHash: adminHash,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: superEmail },
    update: {},
    create: {
      name: 'Dosen Pembina',
      email: superEmail,
      passwordHash: superHash,
      role: 'SUPERUSER',
    },
  });

  // 3. Kontak Resmi
  await prisma.contacts.upsert({
    where: { id: 1 },
    update: {
      instagramUrl: 'https://www.instagram.com/bemfhua/',
      whatsappUrl: 'https://wa.me/6281266234461',
      email: 'kantormedkominfo.bemfhua@gmail.com',
    },
    create: {
      id: 1,
      instagramUrl: 'https://www.instagram.com/bemfhua/',
      whatsappUrl: 'https://wa.me/6281266234461',
      email: 'kantormedkominfo.bemfhua@gmail.com',
    },
  });

  console.log('Seed selesai:');
  console.log('  16 departemen & program kerja');
  console.log('  Kontak resmi BEM FH UNAND');
  console.log(`  Admin login: ${adminEmail}`);
  console.log(`  Super User login: ${superEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
