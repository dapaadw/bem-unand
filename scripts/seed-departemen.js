import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DEPARTEMEN_DATA = [
  {
    name: 'Kordept Pelayanan Pergerakan',
    slug: 'kordept-pelayanan-pergerakan',
    photoUrl: '/uploads/departemen/kordept-pelayanan-pergerakan.jpg',
    description:
      'Koordinator Departemen Pelayanan Pergerakan BEM FH UNAND mengoordinasikan bidang pelayanan mahasiswa, advokasi kesejahteraan, serta pergerakan politik dan hukum.',
    prokers: [],
  },
  {
    name: 'Kordept Relasi Pengembangan',
    slug: 'kordept-relasi-pengembangan',
    photoUrl: '/uploads/departemen/kordept-relasi-pengembangan.jpg',
    description:
      'Koordinator Departemen Relasi Pengembangan BEM FH UNAND mengoordinasikan bidang hubungan internal, hubungan eksternal, serta pengembangan potensi dan sumber daya mahasiswa.',
    prokers: [],
  },
  {
    name: 'Kordept Pengabdian Kreatifitas',
    slug: 'kordept-pengabdian-kreatifitas',
    photoUrl: '/uploads/departemen/kordept-pengabdian-kreatifitas.jpg',
    description:
      'Koordinator Departemen Pengabdian Kreatifitas BEM FH UNAND mengoordinasikan bidang pengabdian sosial masyarakat, seni, olahraga, budaya, ekonomi kreatif, serta pemberdayaan perempuan.',
    prokers: [],
  },
  {
    name: 'Inspektorat Jenderal',
    slug: 'inspektorat-jenderal',
    photoUrl: '/uploads/departemen/inspektorat-jenderal.jpg',
    description:
      'Lembaga Inspektorat Jenderal merupakan salah satu Lembaga yang berada di bawah naungan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas Kabinet Aksara Juang. Lembaga Inspektorat Jenderal memiliki peran penting dalam menjaga keseimbangan dinamika organisasi melalui fungsi pengawasan, pengakraban, serta penyelesaian konflik di lingkungan BEM FHUA. Sebagai lembaga independen, Inspektorat Jenderal berupaya memastikan seluruh program dan kegiatan berjalan sesuai dengan nilai-nilai transparansi, tanggung jawab, dan profesionalisme.',
    prokers: [
      {
        name: 'CONNECT (Creating Outstanding Networking & Nurturing Executive Chemistry Together)',
        description:
          'Upgrading fungsionaris sebagai kegiatan pengembangan diri serta membangun keakraban antar-pengurus BEM FHUA.',
      },
      {
        name: 'BEM Play & Bond Day: Dodgeball Challenge',
        description:
          'Wadah mempererat kebersamaan antaranggota BEM melalui turnamen olahraga dodgeball antardepartemen, biro, dan kantor.',
      },
      {
        name: 'SAPA (Silaturahmi Anggota Penuh Asa)',
        description:
          'Malam keakraban di akhir masa kepengurusan untuk mempererat silaturahmi, team building, dan malam penghargaan apresiasi fungsionaris.',
      },
      {
        name: 'INSPEKTA (Inspeksi Kinerja & Audit Anonim)',
        description:
          'Saluran pengaduan internal berbasis digital yang 100% anonim sebagai safe space bagi seluruh pengurus BEM FHUA dalam melaporkan kendala atau dinamika kerja.',
      },
      {
        name: 'RATA (Re-Alignment Talent Assessment)',
        description:
          'Program monitoring, peninjauan balik, dan evaluasi komprehensif terhadap performa kinerja divisi serta dinamika psikologis fungsionaris.',
      },
    ],
  },
  {
    name: 'Biro Kesekretariatan',
    slug: 'biro-kesekretariatan',
    photoUrl: '/uploads/departemen/biro-kesekretariatan.jpg',
    description:
      'Biro Kesekretariatan BEM FHUA periode 2026/2027 adalah biro yang bertugas mengelola tata kelola administrasi, pengarsipan dokumen, pendataan pengurus dan surat-menyurat, serta penataan inventaris dan fasilitas sekretariat organisasi. Biro ini juga berfungsi menyelaraskan timeline kegiatan seluruh unit organisasi dan memberikan pendampingan standar administrasi agar seluruh dokumen berjalan tertib, seragam, dan efisien.',
    prokers: [
      {
        name: 'ARSIPARIS (Arsip Integrasi, Praktis, dan Sistematis)',
        description:
          'Pengelolaan dan pengarsipan seluruh dokumen BEM FHUA (surat masuk dan keluar, proposal, sertifikat, notulensi rapat, program kerja, dan SOP) baik secara soft copy di Google Drive maupun hard copy di sekre BEM FHUA.',
      },
      {
        name: 'Peminjaman Inventaris & Penataan Fasilitas',
        description:
          'Penataan fasilitas sekretariat BEM FHUA, peminjaman barang inventaris, serta pemeliharaan aset organisasi.',
      },
      {
        name: 'Buku Tamu & Administrasi Terpadu',
        description:
          'Pencatatan buku tamu kunjungan organisasi dan pendampingan standarisasi surat-menyurat serta timeline kegiatan.',
      },
    ],
  },
  {
    name: 'Biro Keuangan',
    slug: 'biro-keuangan',
    photoUrl: '/uploads/departemen/biro-keuangan.jpg',
    description:
      'Biro Keuangan adalah bagian dari struktur organisasi yang memiliki tanggung jawab utama dalam mengelola seluruh aspek keuangan BEM FHUA. Tugasnya mencakup penyusunan pembukuan serta pelaporan keuangan secara menyeluruh. Biro ini memegang peranan krusial dalam memastikan stabilitas finansial organisasi serta mendukung tercapainya tujuan strategis BEM FHUA.',
    prokers: [
      {
        name: 'Pungutan Kas dan Catatan Keuangan',
        description:
          'Pengelolaan kas melalui iuran wajib pengurus untuk mendukung kegiatan BEM FHUA serta pencatatan cash flow pemasukan dan pengeluaran secara transparan kepada presidium.',
      },
      {
        name: 'Dana Operasional Fakultas (DOF)',
        description:
          'Pengelolaan dan koordinasi sumber pendanaan fakultas merujuk pada RAB yang diserahkan oleh masing-masing departemen, biro, lembaga, dan kantor.',
      },
      {
        name: 'KABENA (Kumpulan Bendahara FHUA)',
        description:
          'Grup komunikasi, seminar tatap muka bersama pihak fakultas, serta pelatihan/workshop pengelolaan dana organisasi bagi bendahara umum UKMF dan HIMA di FHUA.',
      },
      {
        name: 'Money Guide',
        description:
          'Sosialisasi dan edukasi mengenai tips menata keuangan mahasiswa dalam bentuk video singkat di akun Instagram BEM FHUA.',
      },
      {
        name: 'Money Master Quiz',
        description:
          'Kuis edukatif seputar pengelolaan keuangan untuk meningkatkan literasi finansial mahasiswa di lingkungan kampus.',
      },
    ],
  },
  {
    name: 'Kantor Media, Komunikasi, dan Informasi',
    slug: 'kantor-medkominfo',
    photoUrl: '/uploads/departemen/medkominfo.jpg',
    description:
      'Kantor Media, Komunikasi, dan Informasi (Medkominfo) adalah salah satu kantor di BEM FHUA yang bertugas mengelola dan menyampaikan informasi kepada mahasiswa serta civitas akademika Fakultas Hukum Universitas Andalas. Kantor ini mendukung kebutuhan komunikasi dan publikasi BEM FHUA, mulai dari penyampaian informasi kegiatan dan program kerja hingga berbagai hal yang berkaitan dengan kehidupan mahasiswa melalui platform media yang informatif, kreatif, dan responsif.',
    prokers: [
      {
        name: 'Graphic Standard Manual (GSM)',
        description:
          'Penyusunan, pengembangan, dan standarisasi visual grafis (logo, komposisi warna, tipografi, elemen desain) publikasi BEM FHUA.',
      },
      {
        name: 'Social Media Monitoring and Maintenance',
        description:
          'Pengelolaan aktivitas akun media sosial resmi BEM FHUA secara konsisten, informatif, dan interaktif.',
      },
      {
        name: 'FHUA Care',
        description:
          'Media informasi dan layanan publikasi bagi mahasiswa untuk menunjang kebutuhan perkuliahan dan informasi kampus.',
      },
      {
        name: 'Website Resmi BEM FHUA',
        description:
          'Pengembangan dan pemeliharaan website resmi BEM FHUA sebagai portal informasi digital terintegrasi.',
      },
      {
        name: 'Podcast BEM FHUA',
        description:
          'Program siaran audio-visual yang mengulas topik aktual, dinamika kampus, dan inspirasi mahasiswa hukum.',
      },
      {
        name: 'Press Release & Kalender FHUA',
        description:
          'Publikasi berkala rilis kegiatan dan kalender akademik serta agenda BEM FHUA.',
      },
    ],
  },
  {
    name: 'Departemen Hubungan Internal',
    slug: 'departemen-hubungan-internal',
    photoUrl: '/uploads/departemen/hubungan-internal.jpg',
    description:
      'Departemen Hubungan Internal bertugas menjaga keakraban antar-lembaga, membangun serta merawat jejaring silaturahmi yang harmonis antara BEM FHUA dengan seluruh Organisasi Mahasiswa (Lembaga, UKMF, dan HIMA) di lingkungan internal Fakultas Hukum Universitas Andalas. Menjadi ruang diskusi terbuka bagi penyampaian aspirasi dan keluh kesah guna menemukan solusi kolektif, serta menjalankan harmonisasi hubungan aktif lintas angkatan demi menjaga solidaritas internal.',
    prokers: [
      {
        name: 'Audiensi BAKTI & Law Expo',
        description:
          'Pengenalan lingkungan kampus dan akademik bagi mahasiswa baru Fakultas Hukum Universitas Andalas.',
      },
      {
        name: 'Kunjungan Silaturahmi (KUNSIL)',
        description:
          'Kunjungan langsung ke kesekretariatan UKMF dan HIMA FHUA untuk mempererat tali silaturahmi dan koordinasi.',
      },
      {
        name: 'BERAKSI (Berinteraksi dan Kawal Generasi)',
        description:
          'Inisiatif membangun komunikasi dan kerja sama harmonis antarmahasiswa lintas angkatan aktif di FHUA.',
      },
      {
        name: 'FORKOM (Forum Komunikasi)',
        description:
          'Forum diskusi rutin berkala antara BEM, UKMF, HIMA, dan Lembaga FHUA untuk memecahkan isu bersama.',
      },
      {
        name: 'PPKM (Perhelatan Pusat Kegiatan Mahasiswa)',
        description:
          'Wadah pendekatan dan bonding santai antar-pengurus UKMF, HIMA, dan Lembaga di lingkungan kampus.',
      },
      {
        name: 'Merah Berliga (RAGA FHUA)',
        description:
          'Liga olahraga sepak bola antar-angkatan aktif guna mempromosikan kebersamaan, kesehatan jasmani, dan sportivitas.',
      },
      {
        name: 'BISIK (Bincang Asyik Internal)',
        description:
          'Bincang santai media audio visual bersama fungsionaris UKMF dan lembaga kampus seputar aktivitas kemahasiswaan.',
      },
    ],
  },
  {
    name: 'Departemen Hubungan Eksternal',
    slug: 'departemen-hubungan-eksternal',
    photoUrl: '/uploads/departemen/hubungan-eksternal.jpg',
    description:
      'Departemen Hubungan Eksternal adalah departemen yang berperan dalam membangun dan mengembangkan hubungan serta kerja sama BEM FHUA dengan pihak eksternal. Departemen ini berfungsi sebagai penghubung dan representasi BEM FHUA dalam menjalin relasi, kolaborasi, komunikasi, serta kerja sama dengan berbagai organisasi, institusi, dan stakeholder eksternal, sekaligus memperluas jaringan dan meningkatkan citra positif BEM FHUA.',
    prokers: [
      {
        name: 'BEM Visit X PAF (Podcast Antar Fakultas)',
        description:
          'Kunjungan kerja dan kolaborasi podcast antara BEM FHUA dengan BEM fakultas lain di lingkungan Universitas Andalas.',
      },
      {
        name: 'Goes to School',
        description:
          'Program kunjungan edukatif ke SMP/SMA/SMK sebagai pengenalan perguruan tinggi hukum dan edukasi kesadaran hukum.',
      },
      {
        name: 'DIKSI (Diskusi dan Kunjungan Institusi)',
        description:
          'Kunjungan institusi dan diskusi langsung bersama Non-Governmental Organization (NGO) mengenai isu hukum dan kebijakan publik.',
      },
      {
        name: 'Career Hub',
        description:
          'Pendataan alumni serta penyebaran informasi peluang magang dan karier profesional bagi mahasiswa Fakultas Hukum UNAND.',
      },
    ],
  },
  {
    name: 'Departemen Advokasi dan Kesejahteraan Mahasiswa',
    slug: 'departemen-advokasi-dan-kesejahteraan-mahasiswa',
    photoUrl: '/uploads/departemen/adkesma.jpg',
    description:
      'Departemen Advokasi dan Kesejahteraan Mahasiswa (Adkesma) adalah departemen yang berfokus pada bidang advokasi dan pelayanan guna mendukung kesejahteraan mahasiswa. Departemen ini hadir sebagai tempat penyaluran aspirasi sekaligus jembatan antara mahasiswa dan pihak birokrasi kampus demi memastikan setiap kebutuhan dan permasalahan mahasiswa dapat tersampaikan serta ditindaklanjuti, mengawal hak-hak mahasiswa, penyesuaian UKT, fasilitas, serta menciptakan lingkungan akademik yang adil, kondusif, dan berpihak pada kepentingan mahasiswa.',
    prokers: [
      {
        name: 'HOTLINE',
        description:
          'Saluran komunikasi langsung via nomor telepon resmi di bio Instagram BEM FHUA untuk merespons pertanyaan dan kendala perkuliahan.',
      },
      {
        name: 'ADNEWSMA',
        description:
          'Pusat penyebaran informasi berkala mengenai kebijakan akademik, beasiswa, dan penyesuaian UKT.',
      },
      {
        name: 'SUARAKAN',
        description:
          'Kotak aspirasi digital berbasis QR Code dengan sistem pelaporan yang anonim, aman, dan menjaga kerahasiaan mahasiswa.',
      },
      {
        name: 'SADEKAN (Sehari Bersama Dekan)',
        description:
          'Ruang tatap muka dan dialog terbuka langsung antara mahasiswa dengan jajaran dekanat FHUA.',
      },
      {
        name: 'GAKS (Gerakan Anti Kekerasan Seksual)',
        description:
          'Seminar edukasi kode etik kampus, pencegahan kekerasan seksual, dan pengawalan ruang aman mahasiswa.',
      },
      {
        name: 'Ruang Pulih',
        description:
          'Pelatihan konselor sebaya mahasiswa per angkatan serta seminar edukasi kesehatan mental mahasiswa.',
      },
      {
        name: 'SKM (Survey Kepuasan Mahasiswa)',
        description:
          'Riset berkala evaluasi tingkat kepuasan mahasiswa terhadap pelayanan akademik dan fasilitas fakultas.',
      },
    ],
  },
  {
    name: 'Departemen Politik dan Hukum',
    slug: 'departemen-politik-dan-hukum',
    photoUrl: '/uploads/departemen/politik-dan-hukum.jpg',
    description:
      'Departemen Politik dan Hukum merupakan ruang bagi mahasiswa untuk membangun kesadaran kritis melalui kajian, advokasi, dan literasi, serta menghubungkan kajian dengan realitas untuk mengubah keresahan menjadi gagasan dan gagasan menjadi gerakan. Departemen ini menjalankan tiga fungsi utama: Aksi Propaganda dalam menyuarakan sikap publik, Kajian Strategis berbasis data ilmiah dan analisis kritis, serta Pembentukan UU dengan mengawal perumusan regulasi kampus yang demokratis dan berkeadilan.',
    prokers: [
      {
        name: 'Pendidikan Politik (PETIK)',
        description:
          'Pengenalan dan edukasi sistem politik kemahasiswaan (BEM, DLM, DPA, MPM, dan KAM) bagi mahasiswa.',
      },
      {
        name: 'Pendidikan Rakyat (PERAK)',
        description:
          'Penyuluhan dan edukasi hukum langsung kepada masyarakat dan warga lokal mengenai isu-isu hukum praktis sehari-hari.',
      },
      {
        name: 'GEMA (Gerakan Edukasi Mahasiswa)',
        description:
          'Publikasi digital materi edukatif seputar hukum tata negara dan dinamika sosial-politik kampus.',
      },
      {
        name: 'LENTERA (Lensa Telaah dan Ruang Analitik)',
        description:
          'Kajian bulanan mendalam isu sosial, politik, dan hukum berupa artikel telaah dan video analisis kebijakan publik.',
      },
      {
        name: 'SIKAPI (Serap Kajian Opini)',
        description:
          'Wadah publikasi opini dan karya tulis kritis mahasiswa FHUA terhadap dinamika perundang-undangan dan kebijakan publik.',
      },
      {
        name: 'NGOPI (Ngobrol Sosial, Politik, dan Hukum)',
        description:
          'Diskusi interaktif bedah film dan isu kemasyarakatan pasca-acara Panggung Rakyat.',
      },
      {
        name: 'KARYA (Kajian Raya)',
        description:
          'Forum konsolidasi strategis BEM se-Kota Padang yang merumuskan rekomendasi kebijakan bersama dalam bentuk Policy Brief dan Buku Putih.',
      },
    ],
  },
  {
    name: 'Departemen Pengembangan Sumber Daya Mahasiswa',
    slug: 'departemen-pengembangan-sumber-daya-mahasiswa',
    photoUrl: '/uploads/departemen/psdm.jpg',
    description:
      'Departemen Pengembangan Sumber Daya Mahasiswa (PSDM) memiliki peran strategis dalam proses pembinaan, pengembangan, dan penguatan kapasitas mahasiswa secara holistik. PSDM tidak hanya dipahami sebagai ruang peningkatan keterampilan teknis semata, tetapi juga sebagai wadah pembentukan karakter kepemimpinan, kesadaran kritis, serta internalisasi nilai-nilai humanisme, integritas, dan solidaritas dalam kehidupan berorganisasi.',
    prokers: [
      {
        name: 'LKMM-TD (Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar)',
        description:
          'Pelatihan manajemen organisasi, kepemimpinan, public speaking, personal branding, dan manajemen aksi.',
      },
      {
        name: 'Eksekutif Muda',
        description:
          'Pembekalan kepemimpinan bagi mahasiswa baru serta kesempatan magang langsung di lembaga pergerakan BEM FHUA.',
      },
      {
        name: 'How to be Mapres',
        description:
          'Platform pelatihan intensif KTI, portofolio capaian unggulan, dan coaching clinic persiapan seleksi Mahasiswa Berprestasi.',
      },
      {
        name: 'Magang With NGO',
        description:
          'Fasilitasi magang profesional di Non-Governmental Organization bidang hukum dan HAM (LBH Padang, WALHI Sumbar, LP2M, dll).',
      },
      {
        name: 'Career Pedia',
        description:
          'Seminar karier dan penyusunan konten edukatif ragam profesi hukum bersama alumni serta praktisi hukum profesional.',
      },
      {
        name: 'FHUA Legal Talent (Speech and Essay Competition)',
        description:
          'Kompetisi orasi dan esai hukum internal kampus untuk mengasah kemampuan retorika dan analisis kritis.',
      },
      {
        name: 'BAK & AK (Bintang Aktivis Kampus)',
        description:
          'Penghargaan apresiasi bagi wisudawan/wisudawati yang aktif berorganisasi dan berprestasi di FHUA.',
      },
    ],
  },
  {
    name: 'Departemen Sosial Masyarakat',
    slug: 'departemen-sosial-masyarakat',
    photoUrl: '/uploads/departemen/sosial-masyarakat.jpg',
    description:
      'Departemen Sosial Masyarakat Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas merupakan salah satu ruang pergerakan mahasiswa yang hadir untuk menumbuhkan kepedulian sosial, kepekaan terhadap persoalan masyarakat, serta keberanian untuk mengambil peran dalam menghadirkan perubahan. Sebagai mahasiswa hukum, pengabdian kepada masyarakat tidak hanya dimaknai sebagai bentuk pelaksanaan Tri Dharma Perguruan Tinggi, tetapi juga sebagai kesempatan untuk membawa pengetahuan, gagasan, dan nilai-nilai yang diperoleh di bangku perkuliahan agar dapat memberikan manfaat secara langsung bagi masyarakat.',
    prokers: [
      {
        name: 'Merah Mengabdi',
        description:
          'Program pengabdian masyarakat terpadu di nagari/desa binaan di Sumatera Barat.',
      },
      {
        name: 'MERDU (Merah Edukasi)',
        description:
          'Program edukatif melalui podcast berkolaborasi dengan Dinas Sosial mengenai isu perlindungan anak dan kesejahteraan sosial.',
      },
      {
        name: 'Advokasi Lingkungan & Konservasi Penyu',
        description:
          'Gerakan penyelamatan ekosistem pesisir, pelepasan tukik ke laut, dan kampanye digital kelestarian alam.',
      },
      {
        name: 'Bank Sampah',
        description:
          'Program pemberdayaan ekonomi lingkungan dengan pengumpulan dan pemilahan sampah anorganik bernilai ekonomis.',
      },
      {
        name: 'MERJI (Merah Jiwa)',
        description:
          'Aksi donor darah bekerjasama dengan PMI serta pengumpulan donasi pakaian layak pakai dan buku bermanfaat.',
      },
      {
        name: 'GALAKSI (Gala Aksi Penuh Dedikasi)',
        description:
          'Aksi cepat tanggap kepedulian sosial dan penggalangan dana solidaritas kemanusiaan saat terjadi bencana.',
      },
    ],
  },
  {
    name: 'Departemen Seni, Olahraga dan Budaya',
    slug: 'departemen-seni-olahraga-dan-budaya',
    photoUrl: '/uploads/departemen/seni-olahraga-budaya.jpg',
    description:
      'Departemen Seni, Olahraga, dan Budaya (Soraya) BEM FHUA Kabinet Aksara Juang merupakan departemen yang bergerak dalam penyelenggaraan ajang seni, olahraga, dan kebudayaan. Soraya berfokus menghadirkan event-event besar sebagai wadah kompetisi serta hiburan yang melibatkan mahasiswa, pelajar, dan masyarakat luas di Kota Padang, sekaligus menjalankan program strategis pelestarian serta pengenalan kembali kekayaan budaya lokal Minangkabau.',
    prokers: [
      {
        name: 'CLASH OF LEX FHUA',
        description:
          'Turnamen olahraga bergengsi cabang futsal dan bola basket antarmahasiswa dan antarpelajar SMA se-Sumatera Barat.',
      },
      {
        name: 'EKSPEDISI BUDAYA',
        description:
          'Program riset budaya dan pengabdian ke nagari di Sumatera Barat untuk meneliti dan memperkenalkan kekayaan tradisi Minangkabau.',
      },
      {
        name: 'SOUND FEST FHUA',
        description:
          'Wadah minat bakat musik mahasiswa yang memadukan festival pertunjukan band antarmahasiswa/kampus dan Karaoke Night.',
      },
    ],
  },
  {
    name: 'Departemen Ekonomi Kreatif',
    slug: 'departemen-ekonomi-kreatif',
    photoUrl: '/uploads/departemen/ekonomi-kreatif.jpg',
    description:
      'Departemen Ekonomi Kreatif merupakan salah satu departemen yang berada di bawah naungan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas Kabinet Aksara Juang. Departemen Ekonomi Kreatif BEM FHUA merupakan wadah bagi mahasiswa hukum untuk mengembangkan minat dan bakat dalam lingkup bisnis ide kreatif yang memiliki peluang keuntungan. Melalui berbagai program dan kegiatan, departemen ini berupaya untuk menumbuhkan semangat mahasiswa untuk menciptakan bisnis kreatif dengan menggabungkan teori hukum dengan praktik negosiasi, pengelolaan sponsorship (Funding & Partnership), dan pengembangan merchandise resmi (Creative Commerce).',
    prokers: [
      {
        name: 'Benang Merah',
        description:
          'Pengadaan pakaian dinas kerja/vest resmi BEM FHUA dan konveksi kebutuhan apparel kepanitiaan organisasi.',
      },
      {
        name: 'Ekraf Corner',
        description:
          'Pembukaan stand penjualan produk merchandise resmi BEM FHUA serta aneka makanan dan minuman pada setiap event kampus.',
      },
      {
        name: 'Talk Show Kreatif',
        description:
          'Seminar kewirausahaan menghadirkan alumni pebisnis dan dosen hukum bisnis perdata untuk membuka wawasan peluang usaha mahasiswa.',
      },
      {
        name: 'Glow Up Project',
        description:
          'Pengembangan identitas visual, logo, dan strategi branding toko resmi BEM FHUA (@creative.commercefhua).',
      },
      {
        name: 'Desain Kreatif Merchandise',
        description:
          'Pembuatan dan penjualan suvenir resmi (kaos, gantungan kunci, lighter, stiker) bertema identitas hukum dan mahasiswa.',
      },
      {
        name: 'Creative Alliance & Sponsor Assist',
        description:
          'Manajemen kemitraan sponsorship pihak luar serta database sponsor terstruktur bagi seluruh kepanitiaan BEM FHUA.',
      },
    ],
    staff: [
      { name: 'Faiza Fadhila', role: 'Kepala Departemen', identity: 'NIM: 2410111106' },
      { name: 'Audya Shifa Maharani', role: 'Sekretaris Departemen', identity: 'NIM: 2510112024' },
      { name: 'Fadly Syandika Putra', role: 'Kepala Bidang Funding & Partnership', identity: 'NIM: 2410111070' },
      { name: 'Dara Mulyawati Ali', role: 'Kepala Bidang Creative Hub & Commerce', identity: 'NIM: 2510112119' },
      { name: 'Annisa Aulia Putri', role: 'Staff Funding & Partnership', identity: 'NIM: 2510112016' },
      { name: 'Muhammad Ihsan Rahmawansyah', role: 'Staff Funding & Partnership', identity: 'NIM: 2510113159' },
      { name: 'Nailah Humairah Tabriz', role: 'Staff Creative Commerce', identity: 'NIM: 2510113029' },
      { name: 'Saskya Nabila Candra', role: 'Staff Creative Commerce', identity: 'NIM: 2510112021' },
    ],
  },
  {
    name: 'Departemen Pemberdayaan Perempuan',
    slug: 'departemen-pemberdayaan-perempuan',
    photoUrl: '/uploads/departemen/pemberdayaan-perempuan.jpg',
    description:
      'Departemen Pemberdayaan Perempuan bertugas memastikan keadilan dan rasa aman benar-benar hidup secara nyata bagi para mahasiswi di lingkungan kampus. Mendorong setiap perempuan untuk percaya diri mengambil peran kepemimpinan, mengedukasi masyarakat kampus untuk memiliki cara pandang gender yang adil dan membongkar bias patriarki, serta memastikan setiap mahasiswi hukum UNAND menyadari bahwa mereka memiliki hak, suara, dan kapasitas yang setara untuk melakukan perubahan.',
    prokers: [
      {
        name: 'Srikandi Peduli',
        description:
          'Edukasi remaja sekolah di Kota Padang mengenai masa pubertas, waspada pelecehan seksual, hak-hak perempuan, dan kesehatan mental.',
      },
      {
        name: 'HerStory',
        description:
          'Kampanye digital interaktif infografis hukum dan data isu perempuan memperingati momentum hari besar perempuan dunia.',
      },
      {
        name: 'Sorot Mata',
        description:
          'Saluran advokasi digital respons cepat menyajikan analisis hukum ringkas (Legal Statement) mengawal isu perempuan dan anak.',
      },
      {
        name: 'Ruang Puan',
        description:
          'Ruang diskusi inklusif dan apresiasi seni ekspresif yang membangun kesadaran pentingnya kesetaraan gender.',
      },
      {
        name: 'Untukmu, Perempuan Hebat',
        description:
          'Kampanye penulisan surat apresiasi dan pesan inspiratif memperkuat empati dan penghargaan bagi perjuangan perempuan.',
      },
    ],
  },
];

async function run() {
  console.log('Seeding official Departemen from docx files...');

  const validSlugs = DEPARTEMEN_DATA.map((d) => d.slug);

  // 1. Delete placeholder departments not in the official 13
  const deleted = await prisma.departemen.deleteMany({
    where: {
      slug: { notIn: validSlugs },
    },
  });
  console.log(`Removed ${deleted.count} legacy placeholder departments.`);

  // 2. Upsert each official department with docx descriptions and proker
  for (const item of DEPARTEMEN_DATA) {
    const dept = await prisma.departemen.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        ...(item.photoUrl ? { photoUrl: item.photoUrl } : {}),
      },
      create: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        ...(item.photoUrl ? { photoUrl: item.photoUrl } : {}),
      },
    });

    // Clean existing proker and staff for fresh insert
    await prisma.programKerja.deleteMany({ where: { departemenId: dept.id } });
    if (item.prokers && item.prokers.length > 0) {
      for (const p of item.prokers) {
        await prisma.programKerja.create({
          data: {
            departemenId: dept.id,
            name: p.name,
            description: p.description,
          },
        });
      }
    }

    if (item.staff && item.staff.length > 0) {
      await prisma.departemenStaff.deleteMany({ where: { departemenId: dept.id } });
      for (const s of item.staff) {
        await prisma.departemenStaff.create({
          data: {
            departemenId: dept.id,
            name: s.name,
            role: s.role,
            identity: s.identity || null,
          },
        });
      }
    }

    console.log(`✓ Synchronized ${item.name} (${item.prokers.length} proker)`);
  }

  const finalCount = await prisma.departemen.count();
  const finalProker = await prisma.programKerja.count();
  console.log(`\nSuccessfully populated ${finalCount} departments and ${finalProker} program kerja.`);
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
