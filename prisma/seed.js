import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEPARTEMEN_NAMES = [
  'Inspektorat Jenderal',
  'Sekretaris Kabinet',
  'Bendahara Kabinet',
  'Departemen Dalam Negeri',
  'Departemen Luar Negeri',
  'Departemen Advokasi',
  'Departemen Kajian Strategis',
  'Departemen Pengembangan Sumber Daya Mahasiswa',
  'Departemen Sosial Masyarakat',
  'Departemen Minat dan Bakat',
  'Departemen Kewirausahaan',
  'Departemen Hubungan Masyarakat',
  'Departemen Media dan Informasi',
  'Departemen Agama dan Kerohanian',
  'Departemen Riset dan Teknologi',
  'Departemen Kesekretariatan',
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  for (const name of DEPARTEMEN_NAMES) {
    const slug = slugify(name);
    await prisma.departemen.upsert({
      where: { slug },
      update: {},
      create: { name, slug, description: `Deskripsi singkat ${name} (placeholder, edit di admin panel).` },
    });
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@bemfhunand.local';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'AdminDev123!';
  const superEmail = process.env.SUPERUSER_SEED_EMAIL || 'dosen@bemfhunand.local';
  const superPassword = process.env.SUPERUSER_SEED_PASSWORD || 'SuperDev123!';

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

  console.log('Seed selesai:');
  console.log(`  16 departemen`);
  console.log(`  Admin login: ${adminEmail} / (password dari env ADMIN_SEED_PASSWORD)`);
  console.log(`  Super User login: ${superEmail} / (password dari env SUPERUSER_SEED_PASSWORD)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
