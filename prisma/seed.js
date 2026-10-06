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

  await prisma.contacts.upsert({
    where: { id: 1 },
    update: {
      instagramUrl: 'https://www.instagram.com/bemfhua/',
      whatsappUrl: 'https://wa.me/6281234567890',
      email: 'bemfhunand.official@gmail.com',
    },
    create: {
      id: 1,
      instagramUrl: 'https://www.instagram.com/bemfhua/',
      whatsappUrl: 'https://wa.me/6281234567890',
      email: 'bemfhunand.official@gmail.com',
    },
  });

  const pubCount = await prisma.publikasi.count();
  if (pubCount === 0 || pubCount === 1) {
    const samplePubs = [
      {
        title: 'Kajian Kritis RUU Hukum Acara Peradilan: Menjamin Keadilan Substantif Bagi Pencari Keadilan',
        slug: 'kajian-kritis-ruu-hukum-acara-peradilan',
        author: 'Departemen Kajian Strategis',
        category: 'Kajian',
        publishedAt: new Date('2026-09-25T08:00:00Z'),
        body: 'Kajian ini menelaah secara komprehensif substansi pembaruan hukum acara di Indonesia guna memastikan prinsip fair trial dan pemenuhan hak asasi manusia tercapai di seluruh tingkatan peradilan.\n\nDalam dinamika hukum nasional, pembaruan prosedur hukum acara mutlak diperlukan untuk menjawab tantangan era digitalisasi dan reformasi sistem peradilan yang transparan.',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
        attachmentUrl: 'https://example.com/kajian-lengkap.pdf',
      },
      {
        title: 'Pelantikan Pengurus Kabinet Sinergi Progresif BEM Fakultas Hukum Universitas Andalas 2026',
        slug: 'pelantikan-pengurus-kabinet-sinergi-progresif-2026',
        author: 'Biro Hubungan Masyarakat',
        category: 'Berita Kegiatan',
        publishedAt: new Date('2026-09-20T10:00:00Z'),
        body: 'Bertempat di Convention Hall Universitas Andalas, kepengurusan BEM FH UNAND Periode 2026 resmi dilantik oleh Dekan Fakultas Hukum. Acara dihadiri oleh segenap pimpinan fakultas, delegasi ormawa, dan civitas akademika.\n\nKabinet Sinergi Progresif mengusung visi dedikasi tanpa henti untuk mengawal integritas pergerakan mahasiswa serta memberikan kontribusi nyata bagi masyarakat Sumatera Barat dan Indonesia.',
        imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Rilis Resmi: Catatan Advokasi dan Evaluasi Kebijakan UKT Semester Genap Mahasiswa FH UNAND',
        slug: 'rilis-resmi-catatan-advokasi-ukt-semester-genap',
        author: 'Departemen Advokasi & Kesejahteraan Mahasiswa',
        category: 'Rilis Resmi',
        publishedAt: new Date('2026-09-15T09:30:00Z'),
        body: 'Departemen Advokasi BEM FH UNAND menyampaikan laporan hasil pendampingan terhadap mahasiswa yang mengajukan penyesuaian Uang Kuliah Tunggal (UKT). Lebih dari 120 mahasiswa telah berhasil difasilitasi dalam proses verifikasi dan keringanan pembiayaan kuliah.\n\nBEM FH UNAND menegaskan komitmen bahwa tidak boleh ada mahasiswa yang putus kuliah karena kendala ekonomi.',
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
      },
    ];

    for (const pub of samplePubs) {
      await prisma.publikasi.upsert({
        where: { slug: pub.slug },
        update: pub,
        create: pub,
      });
    }
  }

  const kegCount = await prisma.kegiatan.count();
  if (kegCount === 0 || kegCount === 1) {
    const sampleKegs = [
      {
        name: 'Andalas National Moot Court Competition (ANMCC) IX 2026',
        slug: 'anmcc-ix-2026',
        type: 'LOMBA',
        date: new Date('2026-11-15T09:00:00Z'),
        time: '09:00',
        publishedAt: new Date('2026-09-26T00:00:00Z'),
        location: 'Ruang Sidang Semu Prof. Dr. Ismail Suny, Kampus Limau Manis',
        organizer: 'Departemen Minat & Bakat BEM FH UNAND',
        description: 'Kompetisi peradilan semu tingkat nasional terbesar yang diselenggarakan oleh BEM FH UNAND, memperebutkan Piala Bergilir Mahkamah Agung RI.\n\nPendaftaran dibuka bagi seluruh delegasi fakultas hukum se-Indonesia.',
        publicationUrl: 'https://example.com/publikasi/anmcc-2026',
        registrationUrl: 'https://forms.gle/anmcc2026unand',
        imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        name: 'Seminar Nasional: Transformasi Hukum dan Keadilan Lingkungan di Ranah Minang',
        slug: 'seminar-nasional-hukum-lingkungan-2026',
        type: 'INTERNAL',
        date: new Date('2026-10-28T08:30:00Z'),
        time: '08:30',
        publishedAt: new Date('2026-09-24T00:00:00Z'),
        location: 'Auditorium Gedung B Fakultas Hukum UNAND',
        organizer: 'Departemen Kajian Strategis',
        description: 'Seminar nasional mengundang akademisi, praktisi hukum lingkungan, dan perwakilan masyarakat adat untuk mendiskusikan keberlanjutan ekologis serta perlindungan hak ulayat di Sumatera Barat.',
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
      },
      {
        name: 'Legal Drafting & Legislative Drafting Challenge 2026',
        slug: 'legal-drafting-challenge-2026',
        type: 'LOMBA',
        date: new Date('2026-10-20T09:30:00Z'),
        time: '09:30',
        publishedAt: new Date('2026-09-22T00:00:00Z'),
        location: 'Gedung Pascasarjana Kampus Padang',
        organizer: 'BEM FH UNAND x DPM FH UNAND',
        description: 'Ajang penyusunan naskah akademik dan legal drafting rancangan peraturan perundang-undangan bagi mahasiswa hukum.',
        registrationUrl: 'https://forms.gle/legaldraftingunand2026',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
      },
    ];

    for (const keg of sampleKegs) {
      await prisma.kegiatan.upsert({
        where: { slug: keg.slug },
        update: keg,
        create: keg,
      });
    }
  }

  console.log('Seed selesai:');
  console.log(`  16 departemen`);
  console.log(`  Kontak resmi (IG: https://www.instagram.com/bemfhua/, WA filler)`);
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
