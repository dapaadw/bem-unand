/**
 * Data Departemen, Biro, Lembaga, dan Kantor BEM FH UNAND (Kabinet Aksara Juang)
 * Ditetapkan secara permanen (hardcoded) berdasarkan dokumen resmi organisasi.
 */

export const HARDCODED_DEPARTEMEN = [
  {
    id: 'dept-kordept-pelayanan-pergerakan',
    name: 'Kordept Pelayanan Pergerakan',
    slug: 'kordept-pelayanan-pergerakan',
    category: 'Koordinator Departemen',
    photoUrl: '/uploads/departemen/kordept-pelayanan-pergerakan.jpg',
    description:
      'Koordinator Departemen Pelayanan Pergerakan BEM FH UNAND mengoordinasikan bidang pelayanan mahasiswa, advokasi kesejahteraan, serta pergerakan politik dan hukum.',
    proker: [],
    staff: [],
  },
  {
    id: 'dept-kordept-relasi-pengembangan',
    name: 'Kordept Relasi Pengembangan',
    slug: 'kordept-relasi-pengembangan',
    category: 'Koordinator Departemen',
    photoUrl: '/uploads/departemen/kordept-relasi-pengembangan.jpg',
    description:
      'Koordinator Departemen Relasi Pengembangan BEM FH UNAND mengoordinasikan bidang hubungan internal, hubungan eksternal, serta pengembangan potensi dan sumber daya mahasiswa.',
    proker: [],
    staff: [],
  },
  {
    id: 'dept-kordept-pengabdian-kreatifitas',
    name: 'Kordept Pengabdian Kreatifitas',
    slug: 'kordept-pengabdian-kreatifitas',
    category: 'Koordinator Departemen',
    photoUrl: '/uploads/departemen/kordept-pengabdian-kreatifitas.jpg',
    description:
      'Koordinator Departemen Pengabdian Kreatifitas BEM FH UNAND mengoordinasikan bidang pengabdian sosial masyarakat, seni, olahraga, budaya, ekonomi kreatif, serta pemberdayaan perempuan.',
    proker: [],
    staff: [],
  },
  {
    id: 'dept-inspektorat-jenderal',
    name: 'Inspektorat Jenderal',
    slug: 'inspektorat-jenderal',
    category: 'Lembaga',
    photoUrl: '/uploads/departemen/inspektorat-jenderal.jpg',
    description:
      'Lembaga Inspektorat Jenderal merupakan salah satu Lembaga yang berada di bawah naungan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas Kabinet Aksara Juang. Lembaga Inspektorat Jenderal memiliki peran penting dalam menjaga keseimbangan dinamika organisasi melalui fungsi pengawasan, pengakraban, serta penyelesaian konflik di lingkungan BEM FHUA. Sebagai lembaga independen, Inspektorat Jenderal berupaya memastikan seluruh program dan kegiatan berjalan sesuai dengan nilai-nilai transparansi, tanggung jawab, dan profesionalisme.',
    proker: [
      {
        id: 'proker-ij-1',
        name: 'CONNECT (Creating Outstanding Networking & Nurturing Executive Chemistry Together)',
        description:
          'Upgrading fungsionaris sebagai kegiatan pengembangan diri serta membangun keakraban antar-pengurus BEM FHUA.',
      },
      {
        id: 'proker-ij-2',
        name: 'BEM Play & Bond Day: Dodgeball Challenge',
        description:
          'Wadah mempererat kebersamaan antaranggota BEM melalui turnamen olahraga dodgeball antardepartemen, biro, dan kantor.',
      },
      {
        id: 'proker-ij-3',
        name: 'SAPA (Silaturahmi Anggota Penuh Asa)',
        description:
          'Malam keakraban di akhir masa kepengurusan untuk mempererat silaturahmi, team building, dan malam penghargaan apresiasi fungsionaris.',
      },
      {
        id: 'proker-ij-4',
        name: 'INSPEKTA (Inspeksi Kinerja & Audit Anonim)',
        description:
          'Saluran pengaduan internal berbasis digital yang 100% anonim sebagai safe space bagi seluruh pengurus BEM FHUA dalam melaporkan kendala atau dinamika kerja.',
      },
      {
        id: 'proker-ij-5',
        name: 'RATA (Re-Alignment Talent Assessment)',
        description:
          'Program monitoring, peninjauan balik, dan evaluasi komprehensif terhadap performa kinerja divisi serta dinamika psikologis fungsionaris.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-biro-kesekretariatan',
    name: 'Biro Kesekretariatan',
    slug: 'biro-kesekretariatan',
    category: 'Biro',
    photoUrl: '/uploads/departemen/biro-kesekretariatan.jpg',
    description:
      'Biro Kesekretariatan BEM FHUA periode 2026/2027 adalah biro yang bertugas mengelola tata kelola administrasi, pengarsipan dokumen, pendataan pengurus dan surat-menyurat, serta penataan inventaris dan fasilitas sekretariat organisasi. Biro ini juga berfungsi menyelaraskan timeline kegiatan seluruh unit organisasi dan memberikan pendampingan standar administrasi agar seluruh dokumen berjalan tertib, seragam, dan efisien.',
    proker: [
      {
        id: 'proker-ks-1',
        name: 'ARSIPARIS (Arsip Integrasi, Praktis, dan Sistematis)',
        description:
          'Pengelolaan dan pengarsipan seluruh dokumen BEM FHUA (surat masuk dan keluar, proposal, sertifikat, notulensi rapat, program kerja, dan SOP) baik secara soft copy di Google Drive maupun hard copy di sekre BEM FHUA.',
      },
      {
        id: 'proker-ks-2',
        name: 'Peminjaman Inventaris & Penataan Fasilitas',
        description:
          'Penataan fasilitas sekretariat BEM FHUA, peminjaman barang inventaris, serta pemeliharaan aset organisasi.',
      },
      {
        id: 'proker-ks-3',
        name: 'Buku Tamu & Administrasi Terpadu',
        description:
          'Pencatatan buku tamu kunjungan organisasi dan pendampingan standarisasi surat-menyurat serta timeline kegiatan.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-biro-keuangan',
    name: 'Biro Keuangan',
    slug: 'biro-keuangan',
    category: 'Biro',
    photoUrl: '/uploads/departemen/biro-keuangan.jpg',
    description:
      'Biro Keuangan adalah bagian dari struktur organisasi yang memiliki tanggung jawab utama dalam mengelola seluruh aspek keuangan BEM FHUA. Tugasnya mencakup penyusunan pembukuan serta pelaporan keuangan secara menyeluruh. Biro ini memegang peranan krusial dalam memastikan stabilitas finansial organisasi serta mendukung tercapainya tujuan strategis BEM FHUA.',
    proker: [
      {
        id: 'proker-keu-1',
        name: 'Pungutan Kas dan Catatan Keuangan',
        description:
          'Pengelolaan kas melalui iuran wajib pengurus untuk mendukung kegiatan BEM FHUA serta pencatatan cash flow pemasukan dan pengeluaran secara transparan kepada presidium.',
      },
      {
        id: 'proker-keu-2',
        name: 'Dana Operasional Fakultas (DOF)',
        description:
          'Pengelolaan dan koordinasi sumber pendanaan fakultas merujuk pada RAB yang diserahkan oleh masing-masing departemen, biro, lembaga, dan kantor.',
      },
      {
        id: 'proker-keu-3',
        name: 'KABENA (Kumpulan Bendahara FHUA)',
        description:
          'Grup komunikasi, seminar tatap muka bersama pihak fakultas, serta pelatihan/workshop pengelolaan dana organisasi bagi bendahara umum UKMF dan HIMA di FHUA.',
      },
      {
        id: 'proker-keu-4',
        name: 'Money Guide',
        description:
          'Sosialisasi dan edukasi mengenai tips menata keuangan mahasiswa dalam bentuk video singkat di akun Instagram BEM FHUA.',
      },
      {
        id: 'proker-keu-5',
        name: 'Money Master Quiz',
        description:
          'Kuis edukatif seputar pengelolaan keuangan untuk meningkatkan literasi finansial mahasiswa di lingkungan kampus.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-kantor-medkominfo',
    name: 'Kantor Media, Komunikasi, dan Informasi',
    slug: 'kantor-medkominfo',
    category: 'Kantor',
    photoUrl: '/uploads/departemen/medkominfo.jpg',
    description:
      'Kantor Media, Komunikasi, dan Informasi (Medkominfo) adalah salah satu kantor di BEM FHUA yang bertugas mengelola dan menyampaikan informasi kepada mahasiswa serta civitas akademika Fakultas Hukum Universitas Andalas. Kantor ini mendukung kebutuhan komunikasi dan publikasi BEM FHUA, mulai dari penyampaian informasi kegiatan dan program kerja hingga berbagai hal yang berkaitan dengan kehidupan mahasiswa melalui platform media yang informatif, kreatif, dan responsif.',
    proker: [
      {
        id: 'proker-med-1',
        name: 'Graphic Standard Manual (GSM)',
        description:
          'Penyusunan, pengembangan, dan standarisasi visual grafis (logo, komposisi warna, tipografi, elemen desain) publikasi BEM FHUA.',
      },
      {
        id: 'proker-med-2',
        name: 'Social Media Monitoring and Maintenance',
        description:
          'Pengelolaan aktivitas akun media sosial resmi BEM FHUA secara konsisten, informatif, dan interaktif.',
      },
      {
        id: 'proker-med-3',
        name: 'FHUA Care',
        description:
          'Media informasi dan layanan publikasi bagi mahasiswa untuk menunjang kebutuhan perkuliahan dan informasi kampus.',
      },
      {
        id: 'proker-med-4',
        name: 'Website Resmi BEM FHUA',
        description:
          'Pengembangan dan pemeliharaan website resmi BEM FHUA sebagai portal informasi digital terintegrasi.',
      },
      {
        id: 'proker-med-5',
        name: 'Podcast BEM FHUA',
        description:
          'Program siaran audio-visual yang mengulas topik aktual, dinamika kampus, dan inspirasi mahasiswa hukum.',
      },
      {
        id: 'proker-med-6',
        name: 'Press Release & Kalender FHUA',
        description:
          'Publikasi berkala rilis kegiatan dan kalender akademik serta agenda BEM FHUA.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-hubungan-internal',
    name: 'Departemen Hubungan Internal',
    slug: 'departemen-hubungan-internal',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/hubungan-internal.jpg',
    description:
      'Departemen Hubungan Internal bertugas menjaga keakraban antar-lembaga, membangun serta merawat jejaring silaturahmi yang harmonis antara BEM FHUA dengan seluruh Organisasi Mahasiswa (Lembaga, UKMF, dan HIMA) di lingkungan internal Fakultas Hukum Universitas Andalas. Menjadi ruang diskusi terbuka bagi penyampaian aspirasi dan keluh kesah guna menemukan solusi kolektif, serta menjalankan harmonisasi hubungan aktif lintas angkatan demi menjaga solidaritas internal.',
    proker: [
      {
        id: 'proker-hi-1',
        name: 'Audiensi BAKTI & Law Expo',
        description:
          'Pengenalan lingkungan kampus dan akademik bagi mahasiswa baru Fakultas Hukum Universitas Andalas.',
      },
      {
        id: 'proker-hi-2',
        name: 'Kunjungan Silaturahmi (KUNSIL)',
        description:
          'Kunjungan langsung ke kesekretariatan UKMF dan HIMA FHUA untuk mempererat tali silaturahmi dan koordinasi.',
      },
      {
        id: 'proker-hi-3',
        name: 'BERAKSI (Berinteraksi dan Kawal Generasi)',
        description:
          'Inisiatif membangun komunikasi dan kerja sama harmonis antarmahasiswa lintas angkatan aktif di FHUA.',
      },
      {
        id: 'proker-hi-4',
        name: 'FORKOM (Forum Komunikasi)',
        description:
          'Forum diskusi rutin berkala antara BEM, UKMF, HIMA, dan Lembaga FHUA untuk memecahkan isu bersama.',
      },
      {
        id: 'proker-hi-5',
        name: 'PPKM (Perhelatan Pusat Kegiatan Mahasiswa)',
        description:
          'Wadah pendekatan dan bonding santai antar-pengurus UKMF, HIMA, dan Lembaga di lingkungan kampus.',
      },
      {
        id: 'proker-hi-6',
        name: 'Merah Berliga (RAGA FHUA)',
        description:
          'Liga olahraga sepak bola antar-angkatan aktif guna mempromosikan kebersamaan, kesehatan jasmani, dan sportivitas.',
      },
      {
        id: 'proker-hi-7',
        name: 'BISIK (Bincang Asyik Internal)',
        description:
          'Bincang santai media audio visual bersama fungsionaris UKMF dan lembaga kampus seputar aktivitas kemahasiswaan.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-hubungan-eksternal',
    name: 'Departemen Hubungan Eksternal',
    slug: 'departemen-hubungan-eksternal',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/hubungan-eksternal.jpg',
    description:
      'Departemen Hubungan Eksternal adalah departemen yang berperan dalam membangun dan mengembangkan hubungan serta kerja sama BEM FHUA dengan pihak eksternal. Departemen ini berfungsi sebagai penghubung dan representasi BEM FHUA dalam menjalin relasi, kolaborasi, komunikasi, serta kerja sama dengan berbagai organisasi, institusi, dan stakeholder eksternal, sekaligus memperluas jaringan dan meningkatkan citra positif BEM FHUA.',
    proker: [
      {
        id: 'proker-he-1',
        name: 'BEM Visit X PAF (Podcast Antar Fakultas)',
        description:
          'Kunjungan kerja dan kolaborasi podcast antara BEM FHUA dengan BEM fakultas lain di lingkungan Universitas Andalas.',
      },
      {
        id: 'proker-he-2',
        name: 'Goes to School',
        description:
          'Program kunjungan edukatif ke SMP/SMA/SMK sebagai pengenalan perguruan tinggi hukum dan edukasi kesadaran hukum.',
      },
      {
        id: 'proker-he-3',
        name: 'DIKSI (Diskusi dan Kunjungan Institusi)',
        description:
          'Kunjungan institusi dan diskusi langsung bersama Non-Governmental Organization (NGO) mengenai isu hukum dan kebijakan publik.',
      },
      {
        id: 'proker-he-4',
        name: 'Career Hub',
        description:
          'Pendataan alumni serta penyebaran informasi peluang magang dan karier profesional bagi mahasiswa Fakultas Hukum UNAND.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-adkesma',
    name: 'Departemen Advokasi dan Kesejahteraan Mahasiswa',
    slug: 'departemen-advokasi-dan-kesejahteraan-mahasiswa',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/adkesma.jpg',
    description:
      'Departemen Advokasi dan Kesejahteraan Mahasiswa (Adkesma) adalah departemen yang berfokus pada bidang advokasi dan pelayanan guna mendukung kesejahteraan mahasiswa. Departemen ini hadir sebagai tempat penyaluran aspirasi sekaligus jembatan antara mahasiswa dan pihak birokrasi kampus demi memastikan setiap kebutuhan dan permasalahan mahasiswa dapat tersampaikan serta ditindaklanjuti, mengawal hak-hak mahasiswa, penyesuaian UKT, fasilitas, serta menciptakan lingkungan akademik yang adil, kondusif, dan berpihak pada kepentingan mahasiswa.',
    proker: [
      {
        id: 'proker-adk-1',
        name: 'HOTLINE',
        description:
          'Saluran komunikasi langsung via nomor telepon resmi di bio Instagram BEM FHUA untuk merespons pertanyaan dan kendala perkuliahan.',
      },
      {
        id: 'proker-adk-2',
        name: 'ADNEWSMA',
        description:
          'Pusat penyebaran informasi berkala mengenai kebijakan akademik, beasiswa, dan penyesuaian UKT.',
      },
      {
        id: 'proker-adk-3',
        name: 'SUARAKAN',
        description:
          'Kotak aspirasi digital berbasis QR Code dengan sistem pelaporan yang anonim, aman, dan menjaga kerahasiaan mahasiswa.',
      },
      {
        id: 'proker-adk-4',
        name: 'SADEKAN (Sehari Bersama Dekan)',
        description:
          'Ruang tatap muka dan dialog terbuka langsung antara mahasiswa dengan jajaran dekanat FHUA.',
      },
      {
        id: 'proker-adk-5',
        name: 'GAKS (Gerakan Anti Kekerasan Seksual)',
        description:
          'Seminar edukasi kode etik kampus, pencegahan kekerasan seksual, dan pengawalan ruang aman mahasiswa.',
      },
      {
        id: 'proker-adk-6',
        name: 'Ruang Pulih',
        description:
          'Pelatihan konselor sebaya mahasiswa per angkatan serta seminar edukasi kesehatan mental mahasiswa.',
      },
      {
        id: 'proker-adk-7',
        name: 'SKM (Survey Kepuasan Mahasiswa)',
        description:
          'Riset berkala evaluasi tingkat kepuasan mahasiswa terhadap pelayanan akademik dan fasilitas fakultas.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-politik-hukum',
    name: 'Departemen Politik dan Hukum',
    slug: 'departemen-politik-dan-hukum',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/politik-dan-hukum.jpg',
    description:
      'Departemen Politik dan Hukum merupakan ruang bagi mahasiswa untuk membangun kesadaran kritis melalui kajian, advokasi, dan literasi, serta menghubungkan kajian dengan realitas untuk mengubah keresahan menjadi gagasan dan gagasan menjadi gerakan. Departemen ini menjalankan tiga fungsi utama: Aksi Propaganda dalam menyuarakan sikap publik, Kajian Strategis berbasis data ilmiah dan analisis kritis, serta Pembentukan UU dengan mengawal perumusan regulasi kampus yang demokratis dan berkeadilan.',
    proker: [
      {
        id: 'proker-pol-1',
        name: 'Pendidikan Politik (PETIK)',
        description:
          'Pengenalan dan edukasi sistem politik kemahasiswaan (BEM, DLM, DPA, MPM, dan KAM) bagi mahasiswa.',
      },
      {
        id: 'proker-pol-2',
        name: 'Pendidikan Rakyat (PERAK)',
        description:
          'Penyuluhan dan edukasi hukum langsung kepada masyarakat dan warga lokal mengenai isu-isu hukum praktis sehari-hari.',
      },
      {
        id: 'proker-pol-3',
        name: 'GEMA (Gerakan Edukasi Mahasiswa)',
        description:
          'Publikasi digital materi edukatif seputar hukum tata negara dan dinamika sosial-politik kampus.',
      },
      {
        id: 'proker-pol-4',
        name: 'LENTERA (Lensa Telaah dan Ruang Analitik)',
        description:
          'Kajian bulanan mendalam isu sosial, politik, dan hukum berupa artikel telaah dan video analisis kebijakan publik.',
      },
      {
        id: 'proker-pol-5',
        name: 'SIKAPI (Serap Kajian Opini)',
        description:
          'Wadah publikasi opini dan karya tulis kritis mahasiswa FHUA terhadap dinamika perundang-undangan dan kebijakan publik.',
      },
      {
        id: 'proker-pol-6',
        name: 'NGOPI (Ngobrol Sosial, Politik, dan Hukum)',
        description:
          'Diskusi interaktif bedah film dan isu kemasyarakatan pasca-acara Panggung Rakyat.',
      },
      {
        id: 'proker-pol-7',
        name: 'KARYA (Kajian Raya)',
        description:
          'Forum konsolidasi strategis BEM se-Kota Padang yang merumuskan rekomendasi kebijakan bersama dalam bentuk Policy Brief dan Buku Putih.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-psdm',
    name: 'Departemen Pengembangan Sumber Daya Mahasiswa',
    slug: 'departemen-pengembangan-sumber-daya-mahasiswa',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/psdm.jpg',
    description:
      'Departemen Pengembangan Sumber Daya Mahasiswa (PSDM) memiliki peran strategis dalam proses pembinaan, pengembangan, dan penguatan kapasitas mahasiswa secara holistik. PSDM tidak hanya dipahami sebagai ruang peningkatan keterampilan teknis semata, tetapi juga sebagai wadah pembentukan karakter kepemimpinan, kesadaran kritis, serta internalisasi nilai-nilai humanisme, integritas, dan solidaritas dalam kehidupan berorganisasi.',
    proker: [
      {
        id: 'proker-psdm-1',
        name: 'LKMM-TD (Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar)',
        description:
          'Pelatihan manajemen organisasi, kepemimpinan, public speaking, personal branding, dan manajemen aksi.',
      },
      {
        id: 'proker-psdm-2',
        name: 'Eksekutif Muda',
        description:
          'Pembekalan kepemimpinan bagi mahasiswa baru serta kesempatan magang langsung di lembaga pergerakan BEM FHUA.',
      },
      {
        id: 'proker-psdm-3',
        name: 'How to be Mapres',
        description:
          'Platform pelatihan intensif KTI, portofolio capaian unggulan, dan coaching clinic persiapan seleksi Mahasiswa Berprestasi.',
      },
      {
        id: 'proker-psdm-4',
        name: 'Magang With NGO',
        description:
          'Fasilitasi magang profesional di Non-Governmental Organization bidang hukum dan HAM (LBH Padang, WALHI Sumbar, LP2M, dll).',
      },
      {
        id: 'proker-psdm-5',
        name: 'Career Pedia',
        description:
          'Seminar karier dan penyusunan konten edukatif ragam profesi hukum bersama alumni serta praktisi hukum profesional.',
      },
      {
        id: 'proker-psdm-6',
        name: 'FHUA Legal Talent (Speech and Essay Competition)',
        description:
          'Kompetisi orasi dan esai hukum internal kampus untuk mengasah kemampuan retorika dan analisis kritis.',
      },
      {
        id: 'proker-psdm-7',
        name: 'BAK & AK (Bintang Aktivis Kampus)',
        description:
          'Penghargaan apresiasi bagi wisudawan/wisudawati yang aktif berorganisasi dan berprestasi di FHUA.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-sosial-masyarakat',
    name: 'Departemen Sosial Masyarakat',
    slug: 'departemen-sosial-masyarakat',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/sosial-masyarakat.jpg',
    description:
      'Departemen Sosial Masyarakat Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas merupakan salah satu ruang pergerakan mahasiswa yang hadir untuk menumbuhkan kepedulian sosial, kepekaan terhadap persoalan masyarakat, serta keberanian untuk mengambil peran dalam menghadirkan perubahan. Sebagai mahasiswa hukum, pengabdian kepada masyarakat tidak hanya dimaknai sebagai bentuk pelaksanaan Tri Dharma Perguruan Tinggi, tetapi juga sebagai kesempatan untuk membawa pengetahuan, gagasan, dan nilai-nilai yang diperoleh di bangku perkuliahan agar dapat memberikan manfaat secara langsung bagi masyarakat.',
    proker: [
      {
        id: 'proker-sos-1',
        name: 'Merah Mengabdi',
        description:
          'Program pengabdian masyarakat terpadu di nagari/desa binaan di Sumatera Barat.',
      },
      {
        id: 'proker-sos-2',
        name: 'MERDU (Merah Edukasi)',
        description:
          'Program edukatif melalui podcast berkolaborasi dengan Dinas Sosial mengenai isu perlindungan anak dan kesejahteraan sosial.',
      },
      {
        id: 'proker-sos-3',
        name: 'Advokasi Lingkungan & Konservasi Penyu',
        description:
          'Gerakan penyelamatan ekosistem pesisir, pelepasan tukik ke laut, dan kampanye digital kelestarian alam.',
      },
      {
        id: 'proker-sos-4',
        name: 'Bank Sampah',
        description:
          'Program pemberdayaan ekonomi lingkungan dengan pengumpulan dan pemilahan sampah anorganik bernilai ekonomis.',
      },
      {
        id: 'proker-sos-5',
        name: 'MERJI (Merah Jiwa)',
        description:
          'Aksi donor darah bekerjasama dengan PMI serta pengumpulan donasi pakaian layak pakai dan buku bermanfaat.',
      },
      {
        id: 'proker-sos-6',
        name: 'GALAKSI (Gala Aksi Penuh Dedikasi)',
        description:
          'Aksi cepat tanggap kepedulian sosial dan penggalangan dana solidaritas kemanusiaan saat terjadi bencana.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-seni-olahraga-budaya',
    name: 'Departemen Seni, Olahraga dan Budaya',
    slug: 'departemen-seni-olahraga-dan-budaya',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/seni-olahraga-budaya.jpg',
    description:
      'Departemen Seni, Olahraga, dan Budaya (Soraya) BEM FHUA Kabinet Aksara Juang merupakan departemen yang bergerak dalam penyelenggaraan ajang seni, olahraga, dan kebudayaan. Pada bidang Seni dan Olahraga, Soraya berfokus menghadirkan event-event besar berskala besar sebagai wadah kompetisi serta hiburan yang melibatkan mahasiswa ataupun pelajar dan masyarakat luas di Kota Padang. Sementara pada bidang Budaya, Soraya berfokus menjalankan program-program kerja strategis yang berorientasi langsung pada pelestarian serta pengenalan kembali kekayaan budaya lokal yang tumbuh di berbagai daerah Minangkabau.',
    proker: [
      {
        id: 'proker-sor-1',
        name: 'CLASH OF LEX FHUA',
        description:
          'Turnamen olahraga bergengsi cabang futsal dan bola basket antarmahasiswa dan antarpelajar SMA se-Sumatera Barat.',
      },
      {
        id: 'proker-sor-2',
        name: 'EKSPEDISI BUDAYA',
        description:
          'Program riset budaya dan pengabdian ke nagari di Sumatera Barat untuk meneliti dan memperkenalkan kekayaan tradisi Minangkabau.',
      },
      {
        id: 'proker-sor-3',
        name: 'SOUND FEST FHUA',
        description:
          'Wadah minat bakat musik mahasiswa yang memadukan festival pertunjukan band antarmahasiswa/kampus dan Karaoke Night.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-ekonomi-kreatif',
    name: 'Departemen Ekonomi Kreatif',
    slug: 'departemen-ekonomi-kreatif',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/ekonomi-kreatif.jpg',
    description:
      'Departemen Ekonomi Kreatif merupakan salah satu departemen yang berada di bawah naungan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas Kabinet Aksara Juang. Departemen Ekonomi Kreatif BEM FHUA merupakan wadah bagi mahasiswa hukum untuk mengembangkan minat dan bakat dalam lingkup bisnis ide kreatif yang memiliki peluang keuntungan. Melalui berbagai program dan kegiatan, departemen ini berupaya untuk menumbuhkan semangat mahasiswa untuk menciptakan bisnis kreatif dengan menggabungkan teori hukum dengan praktik negosiasi, pengelolaan sponsorship (Funding & Partnership), dan pengembangan merchandise resmi (Creative Commerce).',
    proker: [
      {
        id: 'proker-ekr-1',
        name: 'Benang Merah',
        description:
          'Pengadaan pakaian dinas kerja/vest resmi BEM FHUA dan konveksi kebutuhan apparel kepanitiaan organisasi.',
      },
      {
        id: 'proker-ekr-2',
        name: 'Ekraf Corner',
        description:
          'Pembukaan stand penjualan produk merchandise resmi BEM FHUA serta aneka makanan dan minuman pada setiap event kampus.',
      },
      {
        id: 'proker-ekr-3',
        name: 'Talk Show Kreatif',
        description:
          'Seminar kewirausahaan menghadirkan alumni pebisnis dan dosen hukum bisnis perdata untuk membuka wawasan peluang usaha mahasiswa.',
      },
      {
        id: 'proker-ekr-4',
        name: 'Glow Up Project',
        description:
          'Pengembangan identitas visual, logo, dan strategi branding toko resmi BEM FHUA (@creative.commercefhua).',
      },
      {
        id: 'proker-ekr-5',
        name: 'Desain Kreatif Merchandise',
        description:
          'Pembuatan dan penjualan suvenir resmi (kaos, gantungan kunci, lighter, stiker) bertema identitas hukum dan mahasiswa.',
      },
      {
        id: 'proker-ekr-6',
        name: 'Creative Alliance & Sponsor Assist',
        description:
          'Manajemen kemitraan sponsorship pihak luar serta database sponsor terstruktur bagi seluruh kepanitiaan BEM FHUA.',
      },
    ],
    staff: [
      { id: 'staff-ekr-1', name: 'Faiza Fadhila', role: 'Kepala Departemen', identity: 'NIM: 2410111106' },
      { id: 'staff-ekr-2', name: 'Audya Shifa Maharani', role: 'Sekretaris Departemen', identity: 'NIM: 2510112024' },
      { id: 'staff-ekr-3', name: 'Fadly Syandika Putra', role: 'Kepala Bidang Funding & Partnership', identity: 'NIM: 2410111070' },
      { id: 'staff-ekr-4', name: 'Dara Mulyawati Ali', role: 'Kepala Bidang Creative Hub & Commerce', identity: 'NIM: 2510112119' },
      { id: 'staff-ekr-5', name: 'Annisa Aulia Putri', role: 'Staff Funding & Partnership', identity: 'NIM: 2510112016' },
      { id: 'staff-ekr-6', name: 'Muhammad Ihsan Rahmawansyah', role: 'Staff Funding & Partnership', identity: 'NIM: 2510113159' },
      { id: 'staff-ekr-7', name: 'Nailah Humairah Tabriz', role: 'Staff Creative Commerce', identity: 'NIM: 2510113029' },
      { id: 'staff-ekr-8', name: 'Saskya Nabila Candra', role: 'Staff Creative Commerce', identity: 'NIM: 2510112021' },
    ],
  },
  {
    id: 'dept-pemberdayaan-perempuan',
    name: 'Departemen Pemberdayaan Perempuan',
    slug: 'departemen-pemberdayaan-perempuan',
    category: 'Departemen',
    photoUrl: '/uploads/departemen/pemberdayaan-perempuan.jpg',
    description:
      'Departemen Pemberdayaan Perempuan bertugas memastikan keadilan dan rasa aman benar-benar hidup secara nyata bagi para mahasiswi di lingkungan kampus. Mendorong setiap perempuan untuk percaya diri mengambil peran kepemimpinan, mengedukasi masyarakat kampus untuk memiliki cara pandang gender yang adil dan membongkar bias patriarki, serta memastikan setiap mahasiswi hukum UNAND menyadari bahwa mereka memiliki hak, suara, dan kapasitas yang setara untuk melakukan perubahan.',
    proker: [
      {
        id: 'proker-pp-1',
        name: 'Srikandi Peduli',
        description:
          'Edukasi remaja sekolah di Kota Padang mengenai masa pubertas, waspada pelecehan seksual, hak-hak perempuan, dan kesehatan mental.',
      },
      {
        id: 'proker-pp-2',
        name: 'HerStory',
        description:
          'Kampanye digital interaktif infografis hukum dan data isu perempuan memperingati momentum hari besar perempuan dunia.',
      },
      {
        id: 'proker-pp-3',
        name: 'Sorot Mata',
        description:
          'Saluran advokasi digital respons cepat menyajikan analisis hukum ringkas (Legal Statement) mengawal isu perempuan dan anak.',
      },
      {
        id: 'proker-pp-4',
        name: 'Ruang Puan',
        description:
          'Ruang diskusi inklusif dan apresiasi seni ekspresif yang membangun kesadaran pentingnya kesetaraan gender.',
      },
      {
        id: 'proker-pp-5',
        name: 'Untukmu, Perempuan Hebat',
        description:
          'Kampanye penulisan surat apresiasi dan pesan inspiratif memperkuat empati dan penghargaan bagi perjuangan perempuan.',
      },
    ],
    staff: [],
  },
];

export const DEPARTMENT_SLUG_ORDER = [
  'kordept-pelayanan-pergerakan',
  'kordept-relasi-pengembangan',
  'kordept-pengabdian-kreatifitas',
  'departemen-advokasi-dan-kesejahteraan-mahasiswa',
  'departemen-hubungan-internal',
  'departemen-sosial-masyarakat',
  'departemen-politik-dan-hukum',
  'departemen-hubungan-eksternal',
  'departemen-seni-olahraga-dan-budaya',
  'departemen-pemberdayaan-perempuan',
  'departemen-pengembangan-sumber-daya-mahasiswa',
  'departemen-ekonomi-kreatif',
  'biro-kesekretariatan',
  'kantor-medkominfo',
  'biro-keuangan',
  'inspektorat-jenderal',
];

export function sortDepartments(departments = []) {
  const orderMap = new Map(DEPARTMENT_SLUG_ORDER.map((slug, idx) => [slug, idx]));
  return [...departments].sort((a, b) => {
    const orderA = orderMap.has(a.slug) ? orderMap.get(a.slug) : 999;
    const orderB = orderMap.has(b.slug) ? orderMap.get(b.slug) : 999;
    if (orderA !== orderB) return orderA - orderB;
    return (a.name || '').localeCompare(b.name || '');
  });
}

export function getHardcodedDepartemenList() {
  return sortDepartments(HARDCODED_DEPARTEMEN);
}

export function getHardcodedDepartemenBySlug(slug) {
  return HARDCODED_DEPARTEMEN.find((d) => d.slug === slug) || null;
}

export function getDeptPhotoPosition(slug) {
  switch (slug) {
    case 'biro-keuangan':
      return 'object-[center_70%]';
    case 'departemen-pengembangan-sumber-daya-mahasiswa':
      return 'object-[center_65%]';
    case 'departemen-politik-dan-hukum':
    case 'departemen-sosial-masyarakat':
      return 'object-center';
    default:
      return 'object-[center_25%]';
  }
}
