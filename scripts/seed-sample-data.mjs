import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const aspirasiCount = await prisma.aspirasi.count();
  if (aspirasiCount === 0) {
    console.log('Seeding sample aspirasi...');
    await prisma.aspirasi.createMany({
      data: [
        {
          ticketCode: 'ASP-7K9M2X4P9Q8R',
          nama: 'Ahmad Farhan',
          nim: '2210112045',
          cp: '081234567890',
          email: 'ahmadfarhan@student.unand.ac.id',
          pihakDituju: 'Bagian Akademik & Dekanat',
          jenisPengajuan: 'KELUHAN',
          keluhKesah: 'Jadwal kuliah Hukum Pidana Lanjutan bentrok dengan Praktik Peradilan.',
          deskripsi: 'Mohon peninjauan ulang jadwal kuliah semester ganjil karena terjadi bentrok ruangan dan jam untuk kelas reguler B.',
          harapan: 'Jadwal salah satu mata kuliah digeser atau dibuka kelas paralel tambahan.',
          status: 'BARU',
          isAnonymous: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
        },
        {
          ticketCode: 'ASP-3H5N8V1W6L2K',
          nama: 'Siti Rahmawati',
          nim: '2310113012',
          cp: '081298765432',
          email: 'siti.rahma@student.unand.ac.id',
          pihakDituju: 'Departemen Advokasi BEM',
          jenisPengajuan: 'SARAN',
          keluhKesah: 'Stopkontak dan fasilitas pendingin di ruang baca lantai 2 sering padam.',
          deskripsi: 'Usulan penambahan terminal stopkontak dan perbaikan AC di perpustakaan Fakultas Hukum untuk kenyamanan belajar mandiri.',
          harapan: 'Fasilitas segera diperbaiki oleh bagian sarana prasarana fakultas.',
          status: 'DIPROSES',
          isAnonymous: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 hari lalu
        },
        {
          ticketCode: 'ASP-9B2C4D6F8J1M',
          nama: 'Rian Pratama',
          nim: '2110111088',
          cp: '081377889900',
          email: 'rian.pratama@student.unand.ac.id',
          pihakDituju: 'BEM FH & Pimpinan Dekanat',
          jenisPengajuan: 'ASPIRASI',
          keluhKesah: 'Keterlambatan permohonan dispensasi UKT.',
          deskripsi: 'Permohonan bantuan advokasi perpanjangan masa pembayaran dan cicilan UKT bagi mahasiswa tingkat akhir yang terdampak ekonomi keluarga.',
          harapan: 'BEM mendampingi audiensi dengan Wakil Dekan II bidang Keuangan.',
          status: 'SELESAI',
          isAnonymous: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 hari lalu
        },
        {
          ticketCode: 'ASP-4P6R8T2V4X7Z',
          nama: null,
          nim: null,
          cp: null,
          email: null,
          pihakDituju: 'Bagian Kemahasiswaan & BEM',
          jenisPengajuan: 'LAINNYA',
          keluhKesah: 'Minimnya info sosialisasi pendampingan PKM bidang Hukum.',
          deskripsi: 'Harapan diadakannya klinik penulisan proposal Program Kreativitas Mahasiswa (PKM) dan beasiswa alumni secara intensif.',
          harapan: 'Diagendakan workshop penulisan karya ilmiah mahasiswa bersama dosen pembina.',
          status: 'BARU',
          isAnonymous: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 jam lalu
        },
      ],
    });
  }

  const pubCount = await prisma.publikasi.count();
  if (pubCount === 0) {
    console.log('Seeding sample publikasi...');
    await prisma.publikasi.createMany({
      data: [
        {
          title: 'Kajian Strategis: Tinjauan Kritis RUU KUHAP dan Prinsip Due Process of Law',
          slug: 'kajian-strategis-tinjauan-ruu-kuhap-2026',
          author: 'Departemen Kajian Strategis',
          category: 'Kajian Hukum',
          body: 'Kajian komprehensif BEM FH UNAND mengenai urgensi perlindungan hak asasi manusia dalam proses peradilan pidana dan jaminan bantuan hukum bagi masyarakat marginal.',
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        },
        {
          title: 'Pelepasan Delegasi Moot Court FH UNAND Menuju National Moot Court Competition 2026',
          slug: 'pelepasan-delegasi-nmcc-2026',
          author: 'Departemen Media & Informasi',
          category: 'Prestasi & Berita',
          body: 'Dekanat Fakultas Hukum bersama Dosen Pembina resmi melepas kontingen delegasi peradilan semu untuk berkompetisi di tingkat nasional membawa nama almamater.',
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
        },
        {
          title: 'Rilis Pers: Hasil Audiensi Terbuka Pengurus BEM dengan Dekanat Terkait Fasilitas Kampus',
          slug: 'rilis-pers-audiensi-fasilitas-kampus-2026',
          author: 'Departemen Advokasi',
          category: 'Rilis Pers',
          body: 'Notula dan kesepakatan bersama mengenai peremajaan sarana prasarana ruang perkuliahan, wifi fakultas, serta transparansi alokasi dana kemahasiswaan.',
          publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
        },
      ],
    });
  }

  const kegiatanCount = await prisma.kegiatan.count();
  if (kegiatanCount === 0) {
    console.log('Seeding sample kegiatan...');
    await prisma.kegiatan.createMany({
      data: [
        {
          name: 'National Moot Court Competition (NMCC) Piala Dekan FH UNAND 2026',
          slug: 'nmcc-piala-dekan-2026',
          type: 'LOMBA',
          date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 hari ke depan
          time: '08:30 WIB',
          location: 'Ruang Sidang Utama Prof. Harun Al-Rasyid FH UNAND',
          organizer: 'UKIM & Bagian Kemahasiswaan FH',
          description: 'Ajang kompetisi simulasi persidangan peradilan pidana tingkat nasional antar fakultas hukum se-Indonesia.',
          registrationUrl: 'https://bit.ly/nmcc-fhunand-2026',
          publicationUrl: '',
        },
        {
          name: 'Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD) 2026',
          slug: 'lkmm-td-bem-fh-2026',
          type: 'INTERNAL',
          date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 hari ke depan
          time: '08:00 WIB',
          location: 'Convention Hall Universitas Andalas',
          organizer: 'Departemen PSDM BEM FH UNAND',
          description: 'Pelatihan kepemimpinan, etika berorganisasi, dan manajemen program kerja untuk mahasiswa baru Fakultas Hukum angkatan 2026.',
          registrationUrl: 'https://bit.ly/lkmmtd-fhunand-2026',
          publicationUrl: '',
        },
        {
          name: 'Lomba Debat Hukum Nasional & Legislative Drafting Competition',
          slug: 'lomba-debat-hukum-nasional-2026',
          type: 'LOMBA',
          date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25), // 25 hari ke depan
          time: '09:00 WIB',
          location: 'Auditorium Pascasarjana FH UNAND',
          organizer: 'Departemen Riset dan Teknologi',
          description: 'Kompetisi adu gagasan kritis hukum konstitusi dan teknik perancangan naskah akademik undang-undang.',
          registrationUrl: 'https://bit.ly/debathukum-2026',
          publicationUrl: '',
        },
      ],
    });
  }

  // Seed sample proker & staff for some departemen if none
  const staffCount = await prisma.departemenStaff.count();
  if (staffCount === 0) {
    const advokasi = await prisma.departemen.findFirst({ where: { slug: 'departemen-advokasi' } });
    if (advokasi) {
      await prisma.departemenStaff.createMany({
        data: [
          { departemenId: advokasi.id, name: 'Muhammad Alif, S.H.', role: 'Kepala Departemen Advokasi' },
          { departemenId: advokasi.id, name: 'Annisa Putri', role: 'Sekretaris Departemen' },
          { departemenId: advokasi.id, name: 'Bagas Wicaksono', role: 'Staff Advokasi Kampus' },
        ],
      });
      await prisma.programKerja.createMany({
        data: [
          { departemenId: advokasi.id, name: 'Advocacy Care & Crisis Center', description: 'Pendampingan langsung kasus akademik dan finansial mahasiswa.' },
          { departemenId: advokasi.id, name: 'Kawal UKT & Beasiswa', description: 'Verifikasi dan advokasi permohonan penyesuaian UKT.' },
        ],
      });
    }

    const kastrat = await prisma.departemen.findFirst({ where: { slug: 'departemen-kajian-strategis' } });
    if (kastrat) {
      await prisma.departemenStaff.createMany({
        data: [
          { departemenId: kastrat.id, name: 'Daffa Ramadhan', role: 'Kepala Departemen Kastrat' },
          { departemenId: kastrat.id, name: 'Fadhilah Zahra', role: 'Staff Kajian Hukum Publik' },
        ],
      });
      await prisma.programKerja.createMany({
        data: [
          { departemenId: kastrat.id, name: 'Mimbar Hukum & Bedah RUU', description: 'Diskusi publik berkala bersama pakar dan dosen hukum tata negara.' },
          { departemenId: kastrat.id, name: 'Penerbitan Policy Brief BEM FH', description: 'Rangkuman rekomendasi kebijakan atas regulasi daerah dan nasional.' },
        ],
      });
    }
  }

  console.log('Sample data seeding complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
