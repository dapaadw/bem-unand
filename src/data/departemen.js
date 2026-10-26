/**
 * Data Departemen, Biro, Lembaga, dan Kantor BEM FH UNAND (Kabinet Aksara Juang)
 * Ditetapkan secara permanen (hardcoded) berdasarkan dokumen resmi organisasi.
 */

import staffData from './staff-data.json';

export const DEPT_LOGOS = {
  "presidium": "/uploads/departemen/logos/presidium.png",
  "kordept-pelayanan-pergerakan": "/uploads/departemen/logos/kordept-pelayanan-pergerakan.png",
  "kordept-relasi-pengembangan": "/uploads/departemen/logos/kordept-relasi-pengembangan.png",
  "kordept-pengabdian-kreatifitas": "/uploads/departemen/logos/kordept-pengabdian-kreatifitas.png",
  "departemen-advokasi-dan-kesejahteraan-mahasiswa": "/uploads/departemen/logos/departemen-advokasi-dan-kesejahteraan-mahasiswa.png",
  "departemen-hubungan-internal": "/uploads/departemen/logos/departemen-hubungan-internal.png",
  "departemen-sosial-masyarakat": "/uploads/departemen/logos/departemen-sosial-masyarakat.png",
  "departemen-politik-dan-hukum": "/uploads/departemen/logos/departemen-politik-dan-hukum.png",
  "departemen-hubungan-eksternal": "/uploads/departemen/logos/departemen-hubungan-eksternal.png",
  "departemen-seni-olahraga-dan-budaya": "/uploads/departemen/logos/departemen-seni-olahraga-dan-budaya.png",
  "departemen-pemberdayaan-perempuan": "/uploads/departemen/logos/departemen-pemberdayaan-perempuan.png",
  "departemen-pengembangan-sumber-daya-mahasiswa": "/uploads/departemen/logos/departemen-pengembangan-sumber-daya-mahasiswa.png",
  "departemen-ekonomi-kreatif": "/uploads/departemen/logos/departemen-ekonomi-kreatif.png",
  "biro-kesekretariatan": "/uploads/departemen/logos/biro-kesekretariatan.png",
  "kantor-medkominfo": "/uploads/departemen/logos/kantor-medkominfo.png",
  "biro-keuangan": "/uploads/departemen/logos/biro-keuangan.png",
  "inspektorat-jenderal": "/uploads/departemen/logos/inspektorat-jenderal.png"
};

export const DEPT_COVERS = {
  "presidium": "/uploads/departemen/presidium.png",
  "kordept-pelayanan-pergerakan": "/uploads/departemen/kordept-pelayanan-pergerakan.png",
  "kordept-relasi-pengembangan": "/uploads/departemen/kordept-relasi-pengembangan.png",
  "kordept-pengabdian-kreatifitas": "/uploads/departemen/kordept-pengabdian-kreatifitas.png",
  "departemen-advokasi-dan-kesejahteraan-mahasiswa": "/uploads/departemen/departemen-advokasi-dan-kesejahteraan-mahasiswa.png",
  "departemen-hubungan-internal": "/uploads/departemen/departemen-hubungan-internal.png",
  "departemen-sosial-masyarakat": "/uploads/departemen/departemen-sosial-masyarakat.png",
  "departemen-politik-dan-hukum": "/uploads/departemen/departemen-politik-dan-hukum.png",
  "departemen-hubungan-eksternal": "/uploads/departemen/departemen-hubungan-eksternal.png",
  "departemen-seni-olahraga-dan-budaya": "/uploads/departemen/departemen-seni-olahraga-dan-budaya.png",
  "departemen-pemberdayaan-perempuan": "/uploads/departemen/departemen-pemberdayaan-perempuan.png",
  "departemen-pengembangan-sumber-daya-mahasiswa": "/uploads/departemen/departemen-pengembangan-sumber-daya-mahasiswa.png",
  "departemen-ekonomi-kreatif": "/uploads/departemen/departemen-ekonomi-kreatif.png",
  "biro-kesekretariatan": "/uploads/departemen/biro-kesekretariatan.png",
  "kantor-medkominfo": "/uploads/departemen/kantor-medkominfo.png",
  "biro-keuangan": "/uploads/departemen/biro-keuangan.png",
  "inspektorat-jenderal": "/uploads/departemen/inspektorat-jenderal.png"
};

export function getDeptLogoUrl(slug) {
  if (!slug) return null;
  return DEPT_LOGOS[slug] || `/uploads/departemen/logos/${slug}.png`;
}

export function getDeptCoverUrl(slug) {
  if (!slug) return null;
  return DEPT_COVERS[slug] || `/uploads/departemen/${slug}.png`;
}

export function getDeptStaff(slug) {
  if (!slug) return [];
  return staffData[slug] || [];
}

const RAW_HARDCODED_DEPARTEMEN = [
  {
    id: 'dept-presidium',
    name: 'Presidium',
    slug: 'presidium',
    category: 'Presidium',
    logoUrl: '/uploads/departemen/logos/presidium.png',
    coverUrl: '/uploads/departemen/presidium.png',
    photoUrl: '/uploads/departemen/logos/presidium.png',
    description:
      'Presidium BEM merupakan badan pimpinan inti yang memegang kedaulatan eksekutif tertinggi organisasi. Berada di bawah kepemimpinan Ketua, Wakil Ketua, dan Sekretaris Kabinet, Presidium bertugas merumuskan arah kebijakan strategis serta menjaga keselarasan gerak seluruh kementerian. Selain menjadi representasi resmi mahasiswa di tingkat internal maupun eksternal, Presidium bertanggung jawab memastikan tata kelola administrasi dan operasional organisasi berjalan secara efektif dan akuntabel.',
    proker: [
      {
        id: 'proker-pres-1',
        name: 'Pendataan Surat Masuk dan Keluar Terpusat',
        description:
          'Deskripsi Proker: Program kerja ini dilakukan dengan mencatat seluruh informasi surat masuk dan surat keluar. Program kerja ini dilakukan dengan menyusunnya dalam Spreadsheets yang telah disediakan, sekretaris DBKL menginput nomor setiap surat yang dikeluarkannya dan akan dirapikan oleh Biro Kesekretariatan terkait penyusunannya, Sekretaris kabinet akan selalu memantau dan menjamin pendataannya secara terstruktur.',
      },
      {
        id: 'proker-pres-2',
        name: 'Penetapan SOP BEM FHUA 2026',
        description:
          'Deskripsi Proker: Program kerja ini dilakukan dengan menetapkan SOP BEM FHUA Periode 2026 yang telah dikodifikasikan oleh Biro Kesekretariatan. Selanjutnya untuk memastikan seluruh pengurus BEM FHUA Periode 2026 mematuhi SOP yang telah disusun adalah tugas dari Sekretaris Kabinet.',
      },
      {
        id: 'proker-pres-3',
        name: 'Koordinasi Administrasi Terpadu DBKL',
        description:
          'Deskripsi Proker: antara Program kerja ini dilakukan dengan mengadakan pertemuan Sekretaris Kabinet, Biro Kesekretariatan, dan seluruh Sekretaris DBKL BEM FHUA Periode 2026. Pertemuan dilakukan baik secara offline ataupun online. Pembahasan dalam koordinasi ini adalah mengenai administrasi BEM FHUA ataupun terkait administrasi FHUA, sekaligus menjadi wadah evaluasi kinerja.',
      },
      {
        id: 'proker-pres-4',
        name: 'Penerbitan Keputusan Ketua BEM FHUA 2026',
        description:
          'Deskripsi Proker: Program kerja ini dilakukan langsung oleh Sekretaris Kabinet atas persetujuan Ketua BEM FHUA Periode 2026. Dimana setiap keputusan disusun, diketik, dan diterbitkan langsung oleh Sekretaris Kabinet.',
      },
      {
        id: 'proker-pres-5',
        name: 'Legalisasi & Tindak Lanjut SOP Bersama Fakultas',
        description:
          'Deskripsi Proker: Program kerja ini penyusunannya dilaksanakan dengan berkoordinasi dan ditandatangani langsung oleh pihak fakultas',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-kordept-pelayanan-pergerakan',
    name: 'Kordept Pelayanan Pergerakan',
    slug: 'kordept-pelayanan-pergerakan',
    category: 'Koordinator Departemen',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/kordept-pelayanan-pergerakan.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Koordinator Departemen Pelayanan dan Pergerakan BEM FHUA bertugas mengoordinasikan, mendampingi, dan memastikan sinergi program kerja bidang pelayanan mahasiswa, advokasi kesejahteraan, serta pergerakan politik dan hukum.',
    proker: [
      {
        id: 'proker-kpp-1',
        name: 'Koordinasi & Supervisi Departemen Pelayanan Pergerakan',
        description:
          'Melakukan koordinasi rutin, penyusunan rancangan timeline kerja, evaluasi berkala, dan pendampingan strategis terhadap Departemen Advokasi dan Kesejahteraan Mahasiswa serta Departemen Politik dan Hukum.',
      },
      {
        id: 'proker-kpp-2',
        name: 'Jembatan Koordinasi Strategis ke Presidium',
        description:
          'Menjadi penghubung komunikasi, pelaporan capaian, serta pertimbangan strategis antara departemen yang dibawahi dengan Ketua dan Wakil Ketua BEM FHUA.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-kordept-relasi-pengembangan',
    name: 'Kordept Relasi Pengembangan',
    slug: 'kordept-relasi-pengembangan',
    category: 'Koordinator Departemen',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/kordept-relasi-pengembangan.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Koordinator Departemen Relasi dan Pengembangan BEM FHUA bertanggung jawab memastikan Departemen Hubungan Internal, Departemen Hubungan Eksternal, dan Departemen Pengembangan Sumber Daya Mahasiswa menjalankan tugas dan fungsinya secara optimal serta selaras dengan visi dan misi BEM FHUA.',
    proker: [
      {
        id: 'proker-krp-1',
        name: 'Koordinasi Intensif Departemen Relasi Pengembangan',
        description:
          'Koordinator melakukan komunikasi dan koordinasi secara rutin dengan setiap departemen, meliputi penyusunan rancangan program kerja, pemantauan jadwal pelaksanaan, pemantauan kondisi internal, serta penanganan hal-hal yang diperlukan untuk mendukung kelancaran kerja departemen.',
      },
      {
        id: 'proker-krp-2',
        name: 'Penghubung Strategis Departemen dan Presidium',
        description:
          'Koordinator menjadi penghubung komunikasi antara masing-masing departemen dengan Ketua dan Wakil Ketua BEM FHUA. Fungsi ini mencakup penyampaian laporan, informasi, saran, dan pertimbangan agar koordinasi serta pelaksanaan kebijakan organisasi berjalan dengan baik.',
      },
      {
        id: 'proker-krp-3',
        name: 'Pendampingan & Supervisi Program Kerja',
        description:
          'Koordinator memberikan pendampingan dan arahan sekaligus mengawasi pelaksanaan program kerja departemen agar target yang telah ditetapkan tercapai dan pelaksanaannya tetap sesuai dengan visi dan misi BEM FHUA, termasuk dalam kegiatan kolaborasi dengan departemen lain.',
      },
      {
        id: 'proker-krp-4',
        name: 'Analisis Efektivitas Fungsi dan Evaluasi Berkala',
        description:
          'Koordinator melakukan pemantauan dan evaluasi berkala terhadap pelaksanaan program kerja setiap departemen untuk mengidentifikasi pencapaian dan kendala. Hasil evaluasi digunakan sebagai dasar penyusunan laporan analisis dan rekomendasi perbaikan guna meningkatkan kinerja departemen.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-kordept-pengabdian-kreatifitas',
    name: 'Kordept Pengabdian Kreatifitas',
    slug: 'kordept-pengabdian-kreatifitas',
    category: 'Koordinator Departemen',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/kordept-pengabdian-kreatifitas.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Koordinator Departemen Pengabdian dan Kreatifitas BEM FHUA mengoordinasikan bidang pengabdian sosial masyarakat, seni, olahraga, budaya, ekonomi kreatif, serta pemberdayaan perempuan demi terwujudnya program kerja yang berdampak nyata.',
    proker: [
      {
        id: 'proker-kpk-1',
        name: 'Koordinasi Intensif Departemen Pengabdian Kreatifitas',
        description:
          'Memastikan Departemen Sosial Masyarakat, Departemen Seni Olahraga dan Budaya, Departemen Ekonomi Kreatif, dan Departemen Pemberdayaan Perempuan menjalankan fungsi secara progresif dan terarah.',
      },
      {
        id: 'proker-kpk-2',
        name: 'Pendampingan & Pengawasan Program Kerja Unggulan',
        description:
          'Memberikan arahan, supervisi lapangan, serta evaluasi menyeluruh terhadap penyelenggaraan event besar kemahasiswaan dan pengabdian masyarakat.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-inspektorat-jenderal',
    name: 'Inspektorat Jenderal',
    slug: 'inspektorat-jenderal',
    category: 'Lembaga',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/inspektorat-jenderal.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Lembaga Inspektorat Jenderal merupakan salah satu Lembaga yang berada di bawah naungan Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas Kabinet Aksara Juang. Lembaga Inspektorat Jenderal memiliki peran penting dalam menjaga keseimbangan dinamika organisasi melalui fungsi pengawasan, pengakraban, serta penyelesaian konflik di lingkungan BEM FHUA.',
    proker: [
      {
        id: 'proker-ij-1',
        name: 'CONNECT (Creating Outstanding Networking & Nurturing Executive Chemistry Together)',
        description:
          'CONNECT merupakan kegiatan Upgrading berupa pengembangan diri serta membangun keakraban antar anggota BEM FHUA melalui aktivitas kebersamaan yang dilaksanakan di awal kepengurusan.',
      },
      {
        id: 'proker-ij-2',
        name: 'BEM Play & Bond Day: Dodgeball Challenge',
        description:
          'BEM Play & Bond Day: Dodgeball Challenge merupakan program fungsi yang diselenggarakan oleh Lembaga Inspektorat Jenderal BEM Fakultas Hukum Universitas Andalas sebagai wadah untuk mempererat kebersamaan antaranggota BEM melalui kegiatan olahraga. Kegiatan ini dikemas dalam bentuk pertandingan dodgeball yang diikuti oleh tim dari setiap Departemen, Biro, dan Kantor, serta Koordinator Departemen dan Presidium sebagai peserta. Melalui permainan ini, setiap tim dituntut untuk bekerja sama, menyusun strategi, dan berkomunikasi dengan baik selama pertandingan. Selain menjadi ajang kompetisi yang sehat, kegiatan ini juga diharapkan dapat menjadi sarana refreshing di tengah padatnya aktivitas organisasi dan perkuliahan, sehingga tercipta hubungan yang lebih akrab, solid, dan harmonis antaranggota BEM Fakultas Hukum Universitas Andalas.',
      },
      {
        id: 'proker-ij-3',
        name: 'SAPA (Silaturahmi Anggota Penuh Asa)',
        description:
          'SAPA (Silaturahmi Anggota Penuh Asa) merupakan program fungsi yang diselenggarakan oleh Lembaga Inspektorat Jenderal Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas di akhir masa kepengurusan sebagai wadah untuk mempererat silaturahmi, meningkatkan rasa kekeluargaan, serta membangun komunikasi yang harmonis antaranggota BEM. Kegiatan ini dikemas dalam bentuk malam keakraban yang menghadirkan berbagai rangkaian acara, seperti sesi perkenalan, permainan kelompok (team building), refleksi, hiburan, serta Malam Penghargaan dan apresiasi bagi para pengurus.',
      },
      {
        id: 'proker-ij-4',
        name: 'INSPEKTA (Inspeksi Kinerja & Audit Anonim)',
        description:
          'INSPEKTA adalah tempat pengaduan internal berbasis digital yang menggunakan Google Form bersifat 100% anonim sebagai media pelaporan. Program ini menyediakan safe space bagi seluruh anggota BEM untuk melaporkan berbagai permasalahan, konflik, atau kendala internal yang dialami selama menjalankan tugas di BEM. Form pengaduan INSPEKTA tersedia 24/7 dan dapat diakses kapan saja oleh seluruh anggota BEM. Identitas pengisi tidak terdeteksi oleh siapa pun (termasuk admin form) sehingga anggota dapat melapor secara jujur tanpa rasa takut akan intimidasi dari pihak mana pun.',
      },
      {
        id: 'proker-ij-5',
        name: 'RATA (Re-Alignment Talent Assessment)',
        description:
          'RATA (Re-Alignment Talent Assessment) merupakan program evaluasi dan asesmen berkala terhadap kinerja serta keselarasan penempatan pengurus di setiap bidang guna memastikan efektivitas dan keharmonisan kerja organisasi BEM FHUA.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-biro-kesekretariatan',
    name: 'Biro Kesekretariatan',
    slug: 'biro-kesekretariatan',
    category: 'Biro',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/biro-kesekretariatan.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Biro Kesekretariatan BEM FHUA periode 2026/2027 adalah biro yang bertugas mengelola tata kelola administrasi, pengarsipan dokumen, pendataan pengurus dan surat-menyurat, serta penataan inventaris dan fasilitas sekretariat organisasi. Biro ini juga berfungsi menyelaraskan timeline kegiatan seluruh unit organisasi dan memberikan pendampingan standar administrasi agar seluruh dokumen berjalan tertib, seragam, dan efisien.',
    proker: [
      {
        id: 'proker-kesek-1',
        name: 'ARSIPARIS (Arsip Integrasi, Praktis, dan Sistematis)',
        description:
          'ARSIPARIS (Arsip Integrasi, Praktis, dan Sistematis) adalah program kerja utama dari Biro Kesekretariatan yang mengelola arsip seluruh dokumen BEM FHUA, baik surat masuk maupun keluar, proposal, sertifikat, notulensi rapat, SOP, dan RAB, yang disimpan secara digital di Google Drive serta dokumen fisik di Sekretariat BEM FHUA.',
      },
      {
        id: 'proker-kesek-2',
        name: 'SENSUS (Sinkronisasi Data Pengurus dan Surat-menyurat)',
        description:
          'SENSUS (Sinkronisasi Data Pengurus dan Surat Menyurat) adalah program kerja yang berfungsi mengawasi dan mengelola database pengurus periode 2026/2027 serta database seluruh dokumen masuk dan keluar secara tersinkronisasi di Google Sheets guna menyamakan data fisik dengan catatan digital.',
      },
      {
        id: 'proker-kesek-3',
        name: 'Kodifikasi SOP BEM FHUA',
        description:
          'Program kerja ini bertujuan menghimpun, menyusun, dan mengkodifikasikan seluruh Standar Operasional Prosedur (SOP) BEM FHUA, meliputi SOP Administrasi, Kesekretariatan, Media, Keuangan, Bintang Aktivis Kampus (BAK), Pemberian SP, dan lainnya demi menciptakan alur kerja yang efektif, efisien, dan transparan.',
      },
      {
        id: 'proker-kesek-4',
        name: 'NAVIGASI (Penyelarasan Jadwal Kegiatan dan Informasi Acara FHUA)',
        description:
          'Program kerja yang menyelaraskan jadwal seluruh kegiatan dan proker dari UKMF, HIMA, dan Lembaga di lingkungan FHUA guna menghindari bentrok agenda. Data dihimpun menjadi Kalender FHUA terpadu yang dipublikasikan secara berkala melalui media sosial BEM FHUA.',
      },
      {
        id: 'proker-kesek-5',
        name: 'KLINIK ADMINISTRASI',
        description:
          'Memberikan pedoman, bimbingan, dan pendampingan terstruktur terkait administrasi serta tata kelola persuratan kepada seluruh sekretaris departemen, biro, kantor, maupun kepanitiaan program kerja agar seluruh berkas terlaksana secara tertib, seragam, dan berstandar resmi.',
      },
      {
        id: 'proker-kesek-6',
        name: 'MARKAS (Manajemen Aset, Renovasi, Kebersihan, dan Administrasi Sekretariat)',
        description:
          'Program kerja pengelolaan dan optimalisasi Sekretariat BEM FHUA sebagai pusat aktivitas organisasi melalui penataan ruangan, jadwal piket kebersihan, pengadaan dan pelabelan inventaris, serta pengawasan peminjaman dan penitipan aset organisasi.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-biro-keuangan',
    name: 'Biro Keuangan',
    slug: 'biro-keuangan',
    category: 'Biro',
    logoUrl: '/uploads/departemen/logos/biro-keuangan.png',
    coverUrl: '/uploads/departemen/biro-keuangan.png',
    photoUrl: '/uploads/departemen/logos/biro-keuangan.png',
    description:
      'Biro Keuangan adalah bagian dari struktur organisasi yang memiliki tanggungjawab utama dalam mengelola seluruh aspek keuangan BEM FHUA. Tugasnya mencakup penyusunan pembukuan serta pelaporan keuangan secara menyeluruh. Biro ini memegang peranan krusial dalam memastikan stabilitas finansial organisasi serta mendukung tercapainya tujuan strategis BEM FHUA.',
    proker: [
      {
        id: 'proker-keu-1',
        name: 'Pungutan Kas dan Catatan Keuangan',
        description:
          'Pungutan KAS merupakan program kerja untuk mendukung kegiatan BEM FHUA melalui dana yang berasal dari iuran wajib pengurus. Iuran tersebut harus dilunasi dalam satu periode kepengurusan. Catatan keuangan bertujuan untuk mencatat pemasukan dan pengeluaran dana BEM FHUA serta melaporkan kondisi keuangan kepada presidium setiap bulan.',
      },
      {
        id: 'proker-keu-2',
        name: 'Dana Operasional Fakultas (DOF)',
        description:
          'Dana Operasional fakultas (DOF) merupakan salah satu bentuk sumber pencarian dana untuk mendukung berbagai kegiatan yang dilaksanakan oleh BEM FHUA sebagai bentuk tambahan danainternal. Dana yang diberikan oleh fakultas merujuk pada RAB yang diserahkan oleh masing-masing departemen/biro/lembaga/kantor.',
      },
      {
        id: 'proker-keu-3',
        name: 'Kumpulan Bendahara FHUA (KABENA)',
        description:
          'KABENA (Kumpulan Bendaraha FHUA) merupakan sebuah grup chat bagi bendahara umum UKMF dan HIMA dibawah naungan biro keuangan BEM FHUA dimana semua pihak dapat saling berbagi dan mendapatkan informasi terkait pengurusan dana fakultas maupun universitas. Pada pelaksanaan KABENA kali ini berbagai informasi mengenai proses pengurusan dana fakultas tidak hanya dilakukan dengan pembuatan grup KABENA saja melainkan mengadakan seminar dengan menghadirkan langsung pihak fakultas agar bisa langsung berdiskusi dengan pihak fakultas. Pada program kerja ini memuat inovasi baru yakni melakukan pelatihan atau workshop terkait pengelolaan danaorganisasi.',
      },
      {
        id: 'proker-keu-4',
        name: 'Money Guide',
        description:
          'Money Guide adalah sosialisasi mengenai keuangan seperti tips menata keuangan, atau info lainnya yang berhubungan dengan keuangan dalam bentuk video singkat yang akan diposting di account instagram BEM FHUA.',
      },
      {
        id: 'proker-keu-5',
        name: 'Money Master Quiz',
        description:
          'Money Master Quiz merupakan program kerja interaktif dari Biro Keuangan berupa kuis dan tantangan literasi keuangan yang diselenggarakan melalui media sosial untuk menguji serta memperluas wawasan finansial mahasiswa FHUA dengan cara yang menyenangkan dan edukatif.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-kantor-medkominfo',
    name: 'Kantor Media, Komunikasi, dan Informasi',
    slug: 'kantor-medkominfo',
    category: 'Kantor',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/medkominfo.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Kantor Media, Komunikasi, dan Informasi (Medikominfo) adalah salah satu kantor di BEM FHUA yang bertugas mengelola dan menyampaikan informasi kepada mahasiswa serta civitas akademika Fakultas Hukum Universitas Andalas. Kantor ini mendukung kebutuhan komunikasi dan publikasi BEM FHUA, mulai dari penyampaian informasi kegiatan dan program kerja hingga berbagai hal yang berkaitan dengan kehidupan mahasiswa.\n\nDalam menjalankan perannya, Kantor Medikominfo mengelola berbagai platform media sebagai sarana komunikasi dengan mahasiswa. Selain publikasi, kantor ini juga mengembangkan konten, desain, dokumentasi, dan berbagai bentuk media kreatif untuk menunjang penyampaian informasi. Melalui pengelolaan media yang konsisten serta kolaborasi dengan berbagai bidang, Kantor Medikominfo diharapkan mampu menghadirkan informasi yang menarik, mudah dipahami, dan menjangkau mahasiswa secara lebih luas.',
    proker: [
      {
        id: 'proker-med-1',
        name: 'Graphic Standard Manual (GSM)',
        description:
          'Deskripsi: Graphic Standard Manual (GSM) merupakan program kerja yang bertujuan menyusun, mengembangkan serta merumuskan standar identitas visual dalam penggunaan identitas grafis Fakultas Hukum Universitas Andalas (FHUA). Melalui GSM, diatur secara rinci ketentuan pemakaian logo, komposisi dan pemilihan warna, tipografi, elemen desain pendukung, hingga format berbagai media publikasi yang digunakan FHUA.',
      },
      {
        id: 'proker-med-2',
        name: 'Social Media Monitoring and Maintenance',
        description:
          'Deskripsi: Social Media Monitoring and Maintenance adalah program kerja yang berfokus pada pengelolaan aktivitas media sosial BEM Fakultas Hukum Universitas Andalas melalui pemantauan akun, publikasi konten secara terjadwal, pengelolaan interaksi dengan pengikut, serta pemeliharaan akun agar tetap aktif, informatif, menarik, dan konsisten sebagai sarana komunikasi dan publikasi.',
      },
      {
        id: 'proker-med-3',
        name: 'FHUA Care',
        description:
          'Deskripsi: FHUA Care merupakan program kerja yang berfungsi sebagai media informasi dan layanan publik bagi civitas akademika FHUA dalam penyampaian informasi mengenai barang hilang maupun barang temuan di lingkungan Fakultas Hukum Universitas Andalas. Program ini dilaksanakan melalui publikasi laporan pada media sosial resmi BEM FHUA sehingga informasi dapat tersebar secara cepat, luas, dan mudah diakses oleh seluruh warga Fakultas Hukum Universitas Andalas.',
      },
      {
        id: 'proker-med-4',
        name: 'Cabinet Logo Project & Maskot',
        description:
          'Deskripsi: Program ini berfokus pada perancangan logo bagi setiap Departemen, Biro, Lembaga, dan Kantor BEM FHUA sebagai identitas visual organisasi. Setiap logo dirancang agar merepresentasikan karakter, fungsi, dan nilai yang dimiliki oleh masing-masing bidang sehingga memiliki identitas yang khas, mudah dikenali, dan konsisten dalam berbagai media publikasi. Sedangkan maskot BEM FHUA menjadi simbol visual yang memperkuat citra organisasi dalam berbagai kegiatan dan media komunikasi.',
      },
      {
        id: 'proker-med-5',
        name: 'Peringatan Hari Besar',
        description:
          'Deskripsi: Program kerja ini diselenggarakan sebagai bentuk partisipasi BEM Fakultas Hukum Universitas Andalas dalam memperingati berbagai hari besar nasional yang memiliki makna penting bagi bangsa Indonesia.',
      },
      {
        id: 'proker-med-6',
        name: 'Database Media & Publikasi',
        description:
          'Deskripsi: Merupakan program kerja yang berfungsi sebagai pusat penyimpanan dan penyedia informasi akademik bagi mahasiswa Fakultas Hukum Universitas Andalas. Program ini menyediakan kumpulan materi perkuliahan dan soal ujian periode lalu yang disusun secara sistematis sehingga dapat diakses dengan lebih mudah oleh mahasiswa sebagai sarana pendukung proses pembelajaran.',
      },
      {
        id: 'proker-med-7',
        name: 'Press Release',
        description:
          'Deskripsi: Press Release merupakan program kerja yang bertujuan memperkenalkan jajaran pengurus BEM Fakultas Hukum Universitas Andalas melalui media sosial resmi BEM FHUA. Publikasi dilakukan dalam bentuk unggahan yang memuat foto pengurus beserta informasi mengenai nama, jabatan, dan bidang yang diemban. Melalui program ini, diharapkan mahasiswa dapat lebih mengenal struktur kepengurusan BEM FHUA serta membangun hubungan yang lebih dekat antara organisasi dengan mahasiswa.',
      },
      {
        id: 'proker-med-8',
        name: 'Kalender FHUA',
        description:
          'Deskripsi: Kalender FHUA merupakan program kerja yang berfokus pada penyampaian informasi mengenai agenda bulanan Fakultas Hukum Universitas Andalas. Publikasi dilakukan secara berkala melalui media sosial resmi BEM FHUA dan memuat berbagai kegiatan akademik, non-akademik, maupun agenda resmi lainnya. Program ini diharapkan dapat mempermudah masyarakat FHUA dalam memperoleh informasi mengenai jadwal kegiatan secara cepat dan terstruktur.',
      },
      {
        id: 'proker-med-9',
        name: 'Website Resmi BEM FHUA (WEB BEM)',
        description:
          'Deskripsi: WEB BEM (Website Badan Eksekutif Mahasiswa) merupakan program fungsi yang berfokus pada pengembangan dan pengelolaan platform digital resmi Badan Eksekutif Mahasiswa sebagai sarana informasi, komunikasi, publikasi, dokumentasi, dan pelayanan kemahasiswaan. Website ini dirancang untuk menjadi pusat informasi terintegrasi yang dapat diakses oleh mahasiswa, civitas akademika, serta masyarakat umum guna memperoleh informasi yang akurat, aktual, dan terpercaya mengenai kegiatan serta program fungsi BEM.',
      },
      {
        id: 'proker-med-10',
        name: 'Podcast BEM FHUA',
        description:
          'Deskripsi: Podcast BEM FHUA merupakan program fungsi yang berfungsi sebagai wadah penyampaian informasi dan membahas berbagai isu yang relevan dengan mahasiswa dan civitas akademika lainnya, khususnya isu hukum, politik, sosial, kemahasiswaan, serta isu aktual lainnya. Melalui pembahasan tersebut, program ini diharapkan dapat meningkatkan wawasan pendengar serta memperkuat citra BEM FHUA sebagai organisasi yang aktif dalam memberikan edukasi.',
      },
      {
        id: 'proker-med-11',
        name: 'Profile Video Kabinet Aksara Juang',
        description:
          'Deskripsi: Program fungsi ini bertujuan menghadirkan media komunikasi audio-visual yang informatif dan edukatif sekaligus memperkenalkan jajaran, visi-misi, serta identitas BEM Fakultas Hukum Universitas Andalas Kabinet Aksara Juang kepada mahasiswa dan khalayak luas.',
      },
      {
        id: 'proker-med-12',
        name: 'Recap Moment',
        description:
          'Deskripsi: Program fungsi ini menghadirkan sebuah video yang berisi kilas balik berbagai aktivitas BEM FHUA selama satu periode kepengurusan. Isi video mencakup dokumentasi program fungsi, kegiatan, serta capaian organisasi yang disusun secara ringkas dan menarik.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-hubungan-internal',
    name: 'Departemen Hubungan Internal',
    slug: 'departemen-hubungan-internal',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/departemen-hubungan-internal.png',
    coverUrl: '/uploads/departemen/hubungan-internal.png',
    photoUrl: '/uploads/departemen/logos/departemen-hubungan-internal.png',
    description:
      'Departemen Hubungan Internal BEM FHUA bertugas menjaga dan merawat jejaring silaturahmi yang harmonis antara BEM FHUA dengan seluruh Lembaga, UKMF, dan HIMA, menjadi ruang diskusi terbuka untuk menyelesaikan dinamika organisasi, serta memelihara soliditas lintas angkatan mahasiswa Fakultas Hukum Universitas Andalas.',
    proker: [
      {
        id: 'proker-hubin-1',
        name: 'Audiensi BAKTI & Law Expo',
        description:
          'BAKTI merupakan wadah pengenalan lingkungan kampus sekaligus pengenalan akademik bagi mahasiswa baru Fakultas Hukum Universitas Andalas. BAKTI Fakultas dilaksanakan setelah diadakannya BAKTI Universitas. Kegiatan ini bertujuan memperkenalkan aspek-aspek penting terkait perkuliahan, lingkungan fakultas, dan dinamika kehidupan kampus di Fakultas Hukum.',
      },
      {
        id: 'proker-hubin-2',
        name: 'Kunjungan Silaturahmi (KUNSIL)',
        description:
          'Kunjungan Silaturahmi ialah kegiatan mempererat tali silaturahmi antara BEM FHUA dengan UKMF dan HIMA FHUA yang ada di Fakultas Hukum Universitas Andalas. Kunjungan Silaturahmi akan diprioritaskan dengan kunjungan langsung di kesekretariatan UKMF dan HIMA FHUA yang ada, tetapi jika tidak dapat dilaksanakan di kesekretariatan UKMF dan HIMA FHUA akan tetap dilaksanakan secara kondisional',
      },
      {
        id: 'proker-hubin-3',
        name: 'Berinteraksi dan Kawal Generasi (BERAKSI)',
        description:
          'Berinteraksi dan Kawal Generasi (BERAKSI) program kerja yang dilakukan oleh Departemen Hubungan Internal Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas yang berupa inisiatif untuk membangun komunikasi dan kerja sama antar-angkatan aktif di Fakultas Hukum, guna melancarkan komunikasi, menciptakan hubungan yang harmonis, serta mendukung kolaborasi.',
      },
      {
        id: 'proker-hubin-4',
        name: 'Forum Komunikasi (FORKOM)',
        description:
          'Program kerja Forum Komunikasi merupakan program kerja yang mewadahi setiap UKMF, HIMA, dan Lembaga-Lembaga FHUA untuk berdiskusi mengenai isu bersama. Kegiatan ini idealnya dilakukan secara luring, namun dapat dialihkan ke daring jika terkendala, untuk mencapai solusi kolektif.',
      },
      {
        id: 'proker-hubin-5',
        name: 'Perhelatan Pusat Kegiatan Mahasiswa (PPKM)',
        description:
          'PPKM adalah wadah pendekatan UKMF, HIMA, dan Lembaga- Lembaga FHUA. Program ini hadir sebagai harapan terjalin nya hubungan yang erat dan harmonis antara UKMF, HIMA, dan Lembaga-Lembaga FHUA. PPKM akan direalisasikan dengan acara ringan yang membangun keakraban, seperti membuat bonding antara UKMF, HIMA, dan Lembaga-Lembaga FHUA melalui program acara yang dilaksanakan di lingkungan kampus FHUA.',
      },
      {
        id: 'proker-hubin-6',
        name: 'Merah Berliga (RAGA FHUA)',
        description:
          'RAGA merupakan Liga Sepak Bola yang mewajibkan setiap angkatan aktif mengirimkan tim sepak bola nya untuk bertanding dalam format liga. Kegiatan ini bertujuan mempromosikan kebersamaan dan pengenalan antar mahasiswa melalui olahraga dan dukungan tim agar semua terlibat dan saling mengenal. RAGA FHUA juga hadir sebagai salah satu aktivitas penting dalam menunjang kesehatan jasmani dan rohani mahasiswa di tengah padatnya kegiatan akademik, mahasiswa membutuhkan sarana untuk menjaga kebugaran, melatih kerja sama tim, serta mengembangkan potensi diri di bidang non-akademik. Melalui penyelenggaraan kegiatan RAGA FHUA, diharapkan tercipta lingkungan akademik yang seimbang antara intelektual, fisik, dan sosial sehingga mahasiswa dapat berkembang secara optimal.',
      },
      {
        id: 'proker-hubin-7',
        name: 'Bincang Asyik Internal (BISIK)',
        description:
          'Program media audio visual berupa bincang santai , interaktif, namun tetap substansif dengan menghadirkan fungsionaris unit kegiatan mahasiswa Fakultas Hukum sebagai Narasumber utama.1. Tugas dan tupoksi hubin adalah Menjaga Keakraban Antar Lembaga: membangun serta merawat jejaring silaturahmi yang harmonis antara BEM FHUA dengan seluruh Organisasi Mahasiswa (Lembaga, UKMF, dan HIMA) di lingkungan internal Fakultas Hukum Universitas Andalas;',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-hubungan-eksternal',
    name: 'Departemen Hubungan Eksternal',
    slug: 'departemen-hubungan-eksternal',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/departemen-hubungan-eksternal.png',
    coverUrl: '/uploads/departemen/hubungan-eksternal.png',
    photoUrl: '/uploads/departemen/logos/departemen-hubungan-eksternal.png',
    description:
      'Departemen Hubungan Eksternal adalah departemen yang berperan dalam membangun dan mengembangkan hubungan serta kerja sama BEM FHUA dengan pihak eksternal. Departemen ini berfungsi sebagai penghubung dan representasi BEM FHUA dalam menjalin relasi, kolaborasi, komunikasi, serta kerja sama dengan berbagai organisasi, institusi, dan stakeholder eksternal, sekaligus memperluas jaringan dan meningkatkan citra positif BEM FHUA.',
    proker: [
      {
        id: 'proker-hubex-1',
        name: 'BEM Visit X PAF (Podcast Antar Fakultas)',
        description:
          'Merupakan kegiatan untuk menjalin hubungan komunikasu dan kerja sama antara BEM FHUA dengan BEM Fakultas lain di dalam lingkup Universitas Andalas. Kegiatan ini dilaksanakan melalui kunjungan kerjaa ke BEM Fakultas lain yang kemudian dilanjutkan dengan PAF (Podcast Antar Fakultas) sebagai wadah diskusi dan bertukar pandangan mengenai isu yang relevan dengan saat ini.',
      },
      {
        id: 'proker-hubex-2',
        name: 'Goes to School',
        description:
          'Merupakan program yng ditujukan kepada siswa/I SMP/SMA/SMK sebagai bentuk pengenalan perguruan tinggi, khususnya Fakultas Hukum Universitas Andalas. Kegiatan ini dilaksanakan melalui kunjungan dan penyampaian informasi mengenai Pendidikan tinggi, Fakultas Hukum Univeritas Andalas, serta edukasi mengenai pengetahuan dan kesadaran hukum.',
      },
      {
        id: 'proker-hubex-3',
        name: 'DIKSI (Diskusi dan Kunjungan Institusi)',
        description:
          'Program yang bertujuan menajdi wadah bagi mahasiswa, khususnya mahasiswa Fakultas Hukum dan pengurus BEM, untuk memperoleh pemahaman secara langsung mengenai isu hukum, sosial, dan kebijakan public melalui interaksi dengan Non- Governmental Organization (NGO).',
      },
      {
        id: 'proker-hubex-4',
        name: 'Career Hub',
        description:
          'Program ini menghimpun informasi peluang magang, pekerjaan serta jejaring alumni bagi mahasiswa Fakultas Hukum Universitas Andalas. Kegiatan ini dilaksanakan melalui pendataan alumni serta pengumpulan dan penyebaran informasi karier yang relevan menggunakan media digital seperti Google form dan Google Drive',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-adkesma',
    name: 'Departemen Advokasi dan Kesejahteraan Mahasiswa',
    slug: 'departemen-advokasi-dan-kesejahteraan-mahasiswa',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/departemen-advokasi-dan-kesejahteraan-mahasiswa.png',
    coverUrl: '/uploads/departemen/adkesma.png',
    photoUrl: '/uploads/departemen/logos/departemen-advokasi-dan-kesejahteraan-mahasiswa.png',
    description:
      'Departemen Advokasi dan Kesejahteraan Mahasiswa (Adkesma) adalah departemen yang berfokus pada bidang advokasi dan pelayanan guna mendukung kesejahteraan mahasiswa. Departemen ini hadir sebagai tempat penyaluran aspirasi sekaligus jembatan antara mahasiswa dan pihak birokrasi atau pemangku kebijakan kampus, demi memastikan setiap kebutuhan dan permasalahan mahasiswa dapat tersampaikan serta ditindaklanjuti dengan semestinya. Melalui peran tersebut, Adkesma berkomitmen untuk senantiasa mengawal hak-hak mahasiswa serta menghadirkan ruang pelayanan yang responsif dalam menghadapi berbagai dinamika dan tantangan yang dialami mahasiswa selama menjalani proses pendidikan. Dengan semangat pengabdian dan kepedulian yang tinggi, Adkesma terus berupaya menciptakan lingkungan akademik yang adil, kondusif, dan berpihak pada kepentingan mahasiswa.',
    proker: [
      {
        id: 'proker-adkesma-1',
        name: 'HOTLINE',
        description:
          'Hotline merupakan wadah komunikasi berupa nomor telepon yang tercantum pada bio akun Instagram BEM FHUA sebagai sarana bagi Mahasiswa Fakultas Hukum Universitas Andalas untuk menyampaikan pertanyaan terkait perkuliahan, pelayanan, dan kesejahteraan mahasiswa. Melalui Hotline ini, mahasiswa dapat dengan mudah dan cepat menghubungi pengurus Adkesma tanpa harus datang langsung, sehingga setiap keluhan maupun pertanyaan dapat direspon secara responsif dan tepat waktu.',
      },
      {
        id: 'proker-adkesma-2',
        name: 'ADNEWSMA',
        description:
          'Adnewsma merupakan sebuah wadah untuk komunikasi terbuka antara mahasiswa dan berfungsi sebagai pusat informasi bagi Mahasiswa untuk mengetahui informasi dalam bidang akademik maupun non akademik dengan akses informasi yang mudah dijangkau dan menarik dilihat oleh seluruh Mahasiswa Fakultas Hukum Universitas Andalas. Program ini dikemas melalui kontenkonten informatif secara berkala agar mahasiswa selalu mendapatkan pembaruan informasi kampus secara akurat dan tepat waktu.',
      },
      {
        id: 'proker-adkesma-3',
        name: 'SUARAKAN',
        description:
          'Suarakan merupakan program kerja untuk mendengarkan semua keluh kesah mahasiswa Fakultas Hukum Universitas Andalas yang mana keluh kesah ini kami tampung dalam bentuk quick response code (QR). Ketika menampung aspirasi tersebut, identitas dari pengirim tidak akan diketahui dan kami jaga kerahasiaan baik data pribadi dan aspirasi dari mahasiswa. Dengan sistem anonim ini, mahasiswa diharapkan lebih terbuka dan berani menyampaikan aspirasi maupun keluhan tanpa rasa khawatir, sehingga permasalahan yang ada dapat segera ditindaklanjuti oleh pihak terkait.',
      },
      {
        id: 'proker-adkesma-4',
        name: 'SADEKAN (Sehari Bersama Dekan)',
        description:
          'Sadekan merupakan suatu program kerja dari departemen Adkesma yang mana program kerja ini nantinya semua mahasiswa yang memiliki aspirasi akan duduk bersama dengan para jajaran fakultas di satu tempat yang sama, dan besar harapan agar semua aspirasi dari mahasiswa mendapat tindak lanjut dari para jajaran fakultas. Kegiatan ini menjadi ruang dialog langsung antara mahasiswa dan pimpinan fakultas guna mempererat komunikasi dua arah serta mempercepat penyelesaian berbagai permasalahan akademik maupun non akademik.',
      },
      {
        id: 'proker-adkesma-5',
        name: 'GAKS (Gerakan Anti Kekerasan Seksual)',
        description:
          'GAKS merupakan suatu program kerja Adkesma untuk mengadakan seminar yang mengangkat isu kekerasan seksual yang terjadi di lingkungan kampus Fakultas Hukum dan mengaitkan isu-isu tersebut dengan kode etik dosen dan mahasiswa, serta menyerukan gerakan anti kekerasan seksual di lingkungan kampus. Melalui kegiatan ini, mahasiswa diharapkan lebih memahami bentuk-bentuk kekerasan seksual, hak-hak korban, serta mekanisme pelaporan yang tersedia di lingkungan kampus.',
      },
      {
        id: 'proker-adkesma-6',
        name: 'Ruang Pulih (Seminar Mental Health)',
        description:
          'Ruang Pulih merupakan (Ruang Ungkap, Aksi Nyata, Generasi Sehat, Peduli, Utuh, Lestari, Inklusif, Harmoni) dengan mengadakan pelatihan 2 mahasiswa/i per angkatan sebagai konselor sebaya, serta seminar untuk membahas isu kesehatan mental mahasiswa. Program ini bertujuan untuk membangun kepedulian bersama terhadap kesehatan mental mahasiswa sekaligus menyediakan wadah pendampingan awal bagi mahasiswa yang membutuhkan dukungan psikologis.',
      },
      {
        id: 'proker-adkesma-7',
        name: 'Adkesma Newsroom',
        description:
          'Adkesma Newsroom merupakan suatu program kerja untuk membuat saluran WhatsApp resmi Departemen Advokasi dan Kesejahteraan Mahasiswa (Adkesma) yang menjadi pusat penyebaran informasi bagi mahasiswa Fakultas Hukum. Melalui saluran ini, informasi seputar advokasi, kesejahteraan, dan kegiatan Adkesma dapat tersampaikan secara langsung, cepat, dan mudah diakses oleh seluruh mahasiswa.',
      },
      {
        id: 'proker-adkesma-8',
        name: 'Survey Kepuasan Mahasiswa (SKM)',
        description:
          'Survey Kepuasan Mahasiswa merupakan suatu program kerja Adkesma dalam menghimpun survey berkala untuk mengukur tingkat kepuasan mahasiswa terhadap pelayanan akademik, fasilitas, dan kebijakan fakultas. Hasil survey ini nantinya akan menjadi bahan evaluasi dan rekomendasi bagi pihak fakultas guna meningkatkan kualitas pelayanan serta fasilitas yang diberikan kepada mahasiswa.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-politik-hukum',
    name: 'Departemen Politik dan Hukum',
    slug: 'departemen-politik-dan-hukum',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/departemen-politik-dan-hukum.png',
    coverUrl: '/uploads/departemen/politik-dan-hukum.png',
    photoUrl: '/uploads/departemen/logos/departemen-politik-dan-hukum.png',
    description:
      'Departemen Politik dan Hukum merupakan ruang bagi mahasiswa untuk membangun kesadaran kritis melalui kajian, advokasi, dan literasi, serta menghubungkan kajian dengan realitas untuk mengubah keresahan menjadi gagasan dan gagasan menjadi gerakan.\n\nDepartemen Politik dan Hukum hadir sebagai ruang untuk membaca realitas, menguji kebijakan, dan menyuarakan kepentingan mahasiswa melalui kajian, sikap, dan gerakan.',
    proker: [
      {
        id: 'proker-polhuk-1',
        name: 'Panggung Rakyat (PANGRAT)',
        description:
          'Panggung Rakyat merupakan yang dikemas dalam bentuk open exhibition sebagai ruang ekspresi bagi mahasiswa dan masyarakat melalui berbagai bentuk seni dan penyampaian gagasan, seperti musik, puisi, dan orasi. Rangkaian kegiatan dilanjutkan dengan pemutaran film dan nonton bersama, kemudian ditutup melalui NGOPI (Ngobrol Sosial, Politik, dan Hukum), yaitu forum diskusi untuk membahas dan merefleksikan isu yang diangkat dalam film. Panggung Rakyat hadir sebagai ruang untuk menghidupkan ingatan, merawat keberanian bersuara, dan mempertemukan seni dengan perjuangan untuk keadilan.',
      },
      {
        id: 'proker-polhuk-2',
        name: 'Pendidikan Politik (PETIK)',
        description:
          'Pendidikan Politik merupakan program pengenalan dan pembelajaran mengenai sistem politik kemahasiswaan di lingkungan Universitas Andalas. Program ini memberikan pemahaman mengenai fungsi dan peran lembaga-lembaga politik kampus, meliputi Badan Eksekutif Mahasiswa (BEM), Dewan Legislatif Mahasiswa (DLM), Dewan Perwakilan Angkatan (DPA), dan Majelis Permusyawaratan Mahasiswa (MPM), serta mengenalkan Kelompok Aspirasi Mahasiswa (KAM) sebagai salah satu ruang partisipasi mahasiswa dalam kehidupan politik kampus.',
      },
      {
        id: 'proker-polhuk-3',
        name: 'Pendidikan Rakyat (PERAK)',
        description:
          'Pendidikan Rakyat merupakan program edukasi hukum yang dilaksanakan bersama masyarakat melalui sosialisasi mengenai isu-isu hukum yang relevan dengan kehidupan sehari-hari. Program ini dilaksanakan secara kolaboratif dengan warga lokal dengan pendekatan yang komunikatif dan mudah dipahami, sehingga pengetahuan hukum dapat diakses secara lebih luas dan bermanfaat bagi masyarakat. Pendidikan Rakyat hadir untuk membawa pengetahuan hukum keluar dari ruang kelas, mendekatkannya kepada masyarakat, dan menjadikan ilmu sebagai bagian dari kebermanfaatan mahasiswa bagi rakyat.',
      },
      {
        id: 'proker-polhuk-4',
        name: 'GEMA (Gerakan Edukasi Mahasiswa)',
        description:
          'GEMA (Gerakan Edukasi Mahasiswa) merupakan program publikasi edukatif yang mengolah kembali materi yang disampaikan dalam program kerja Pendidikan Politik (PETIK) ke dalam bentuk konten informatif yang menarik dan mudah dipahami. Melalui media digital, GEMA menjadi sarana untuk memperluas jangkauan materi sekaligus membantu mahasiswa mengingat dan memahami kembali pengetahuan yang telah diperoleh selama kegiatan. GEMA hadir untuk memastikan pengetahuan tidak berhenti di ruang kegiatan, tetapi terus bergema dan dapat diakses oleh lebih banyak mahasiswa.',
      },
      {
        id: 'proker-polhuk-5',
        name: 'LENTERA (Lensa Telaah dan Ruang Analitik)',
        description:
          'LENTERA (Lensa Telaah dan Ruang Analistik) merupakan program kerja berupa kajian terhadap isu-isu sosial, politik, dan hukum terkini yang dikemas melalui publikasi tulisan pada paruh pertama setiap bulannya serta video analisis pada paruh kedua setiap bulannya. Sebagaimana sebuah lentera yang menerangi jalan, program ini diharapkan menjadi ruang yang membantu mahasiswa melihat berbagai persoalan secara lebih jernih, kritis, dan berlandaskan argumentasi ilmiah.',
      },
      {
        id: 'proker-polhuk-6',
        name: 'SIKAPI (Serap Kajian Opini)',
        description:
          'SIKAPI (Serap Kajian Opini) merupakan program kerja Departemen Politik dan Hukum yang menjadi wadah bagi mahasiswa Fakultas Hukum Universitas Andalas untuk menyampaikan opini dan gagasan terhadap isu-isu sosial, politik, dan hukum yang sedang berkembang. Opini terbaik akan dipublikasikan dan pemberian reward sebagai bentuk apresiasi.',
      },
      {
        id: 'proker-polhuk-7',
        name: 'NGOPI (Ngobrol Sosial, Politik, dan Hukum)',
        description:
          'NGOPI (Ngobrol Politik) merupakan forum diskusi yang dilaksanakan sebagai rangkaian lanjutan setelah pemutaran film dalam Panggung Rakyat. Diskusi diarahkan untuk membedah isu dan pesan yang diangkat dalam film serta menghubungkannya dengan persoalan sosial, politik, dan hukum yang terjadi di masyarakat. Dikemas secara santai, interaktif, dan partisipatif, NGOPI menjadi ruang bagi mahasiswa dan masyarakat untuk bertukar perspektif dan merefleksikan kembali persoalan yang telah disaksikan bersama.',
      },
      {
        id: 'proker-polhuk-8',
        name: 'KARYA (Kajian Raya)',
        description:
          'KARYA (Kajian Raya) merupakan forum konsolidasi dan diskusi strategis yang mempertemukan Badan Eksekutif Mahasiswa se-Kota Padang untuk membahas isu-isu sosial, politik, dan hukum yang aktual. Melalui format diskusi partisipatif, setiap delegasi akan menyampaikan pandangan dan hasil kajian dari kampus masing-masing yang kemudian dirumuskan menjadi rekomendasi bersama dalam bentuk press release, policy brief, dan Buku Putih sebagai representasi sikap serta gagasan mahasiswa Kota Padang.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-psdm',
    name: 'Departemen Pengembangan Sumber Daya Mahasiswa',
    slug: 'departemen-pengembangan-sumber-daya-mahasiswa',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/psdm.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Merupakan salah satu departemen dalam BEM FHUA yang memiliki peran strategis dalam proses pembinaan, pengembangan, dan penguatan kapasitas mahasiswa secara holistik. PSDM tidak hanya dipahami sebagai ruang peningkatan keterampilan teknis semata, tetapi juga sebagai wadah pembentukan karakter, kesadaran kritis, serta internalisasi nilai-nilai humanisme, integritas, dan solidaritas dalam kehidupan berorganisasi.',
    proker: [
      {
        id: 'proker-psdm-1',
        name: 'BAK & AK (Bintang Aktivis Kampus & Aktivis Kampus)',
        description:
          'Bintang Aktivis Kampus adalah kegiatan pemberian penghargaan terhadap wisudawan/ti yang telah menyelesaikan masa studinya di Fakultas Hukum Universitas Andalas yang dinilai secara objektif dari keaktifan berorganisasi, prestasi akademik maupun non akademik yang akan dinilai oleh Departemen PSDM dan Fakultas.',
      },
      {
        id: 'proker-psdm-2',
        name: 'FHUA Berprestasi',
        description:
          'FHUA Berprestasi merupakan wadah apresiasi bagi mahasiswa Fakultas Hukum Universitas Andalas yang baru saja meraih prestasi di bidang akademik maupun non akademik dalam bentuk postingan Instagram BEM FHUA.',
      },
      {
        id: 'proker-psdm-3',
        name: 'How to be Mapres (Mahasiswa Berprestasi)',
        description:
          'Penjelasan: Program kerja ini dirancang sebagai platform edukasi, pelatihan, dan pendampingan intensif bagi mahasiswa Fakultas Hukum Universitas Andalas untuk mempersiapkan diri menghadapi seleksi Mahasiswa Berprestasi (Pilmapres) di tingkat fakultas hingga universitas.\n\nFase 1 (Workshop & Sharing Session): Seminar interaktif terbuka yang menghadirkan Mapres FHUA atau Mapres UNAND terdahulu untuk membedah strategi penyusunan Karya Tulis Ilmiah (KTI), pengumpulan portofolio capaian unggulan, serta teknik presentasi dalam bahasa Inggris.\n\nFase 2 (Mentoring Inkubasi): Pendampingan intensif (Coaching Clinic) khusus bagi mahasiswa yang potensial dan berminat serius mendaftar Pilmapres, di mana draf KTI dan berkas mereka akan ditinjau langsung oleh mentor.',
      },
      {
        id: 'proker-psdm-4',
        name: 'FHUA Legal Talent (Speech and Essay Competition)',
        description:
          'FHUA Legal Talent merupakan kompetisi orasi dan esai tingkat internal Fakultas Hukum yang diselenggarakan secara online sebagai wadah bagi mahasiswa untuk menyalurkan gagasan, aspirasi, serta pandangan kritis terhadap berbagai isu hukum, sosial, pendidikan, demokrasi, dan kebangsaan. Melalui cabang orasi, peserta didorong untuk menyampaikan pendapat secara persuasif, terstruktur, dan komunikatif. Sementara itu, melalui cabang esai, peserta diberikan ruang untuk menuangkan analisis, argumentasi, dan gagasan solutif secara tertulis. Dengan pelaksanaan kegiatan ini, FHUA Legal Talent diharapkan mampu menjadi sarana pengembangan kemampuan public speaking, berpikir kritis, retorika, serta penulisan argumentatif di kalangan mahasiswa Fakultas Hukum.',
      },
      {
        id: 'proker-psdm-5',
        name: 'Magang With NGO',
        description:
          'Magang With NGO merupakan program kerja dari Bidang Pengembangan Karir Departemen PSDM BEM FHUA 2026 yang memfasilitasi mahasiswa Fakultas Hukum Universitas Andalas untuk memperoleh pengalaman magang di berbagai Non-Governmental Organization (NGO) yang bergerak di bidang hukum, hak asasi manusia, lingkungan hidup, pemberdayaan masyarakat, dan isu-isu sosial lainnya. Program ini diawali dengan publikasi program magang, seleksi peserta, penempatan mahasiswa pada NGO sesuai minat dan kebutuhan, dan monitoring serta evaluasi selama masa magang. Dalam pelaksanaan magang, peserta akan memperoleh pengalaman profesional, pendampingan, dan evaluasi sebagai bekal untuk memasuki dunia kerja. Contoh NGO yang direncanakan menjadi mitra magang adalah LBH (Lembaga Bantuan Hukum) Padang, WALHI Sumatera Barat, LP2M, dan lainnya.',
      },
      {
        id: 'proker-psdm-6',
        name: 'Career Pedia',
        description:
          'Career Pedia merupakan program kerja dari Bidang Pengembangan Karir Departemen PSDM BEM FHUA 2026 yang dilaksanakan dalam bentuk seminar offline berskala sedang dengan pelaksanaan sebanyak dua kali selama masa kepengurusan BEM FHUA 2026. Bentuk kegiatan Career Pedia adalah dengan menghadirkan narasumber yang kompeten, seperti alumni, praktisi hukum, akademisi, maupun profesional di bidang hukum yang membahas topik-topik seputar pengembangan karir, dunia kerja, studi lanjut, pengembangan soft skills, personal branding, hingga peluang profesi bagi mahasiswa hukum. Selain itu, program kerja ini juga mencakup pembuatan konten atau tulisan edukatif mengenai berbagai profesi hukum seperti hakim, jaksa, advokat, dan lainnya yang dipublikasikan setiap bulan selama masa kepengurusan BEM FHUA 2026 di media sosial BEM FHUA atau media sosial yang khusus dibentuk untuk program kerja Career Pedia. Melalui kombinasi seminar dan penyebaran konten di media sosial, Career Pedia diharapkan menjadi sumber informasi karir yang mudah diakses oleh seluruh mahasiswa Fakultas Hukum Universitas Andalas.',
      },
      {
        id: 'proker-psdm-7',
        name: 'Eksekutif Muda',
        description:
          'Eksekutif Muda merupakan program pembentukan pemimpin generasi penerus melalui pembekalan materi seputar ilmu dan pengetahuan terkait organisasi, melatih soft skill, hingga berkesempatan magang dalam Lembaga Pergerakan BEM FHUA.',
      },
      {
        id: 'proker-psdm-8',
        name: 'LKMM-TD (Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar)',
        description:
          'LKMM-TD merupakan kegiatan-kegiatan yang mampu mempererat hubungan antar Mahasiswa FHUA dengan mahasiswa baru FHUA agar dapat meningkatkan kemampuan manajemen organisasi, kepemimpinan, kerja sama tim serta manajemen waktu yang baik, seperti: pemberian materi mengenai keorganisasian, kepemimpinan, kemampuan manajerial, Public Speaking, Personal Branding dan Manajemen Aksi.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-sosial-masyarakat',
    name: 'Departemen Sosial Masyarakat',
    slug: 'departemen-sosial-masyarakat',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/departemen-sosial-masyarakat.png',
    coverUrl: '/uploads/departemen/sosial-masyarakat.png',
    photoUrl: '/uploads/departemen/logos/departemen-sosial-masyarakat.png',
    description:
      'Departemen Sosial Masyarakat Badan Eksekutif Mahasiswa Fakultas Hukum Universitas Andalas merupakan salah satu ruang pergerakan mahasiswa yang hadir untuk menumbuhkan kepedulian sosial, kepekaan terhadap persoalan masyarakat, serta keberanian untuk mengambil peran dalam menghadirkan perubahan. Sebagai mahasiswa hukum, pengabdian kepada masyarakat tidak hanya dimaknai sebagai bentuk pelaksanaan Tri DharmaPerguruan Tinggi, tetapi juga sebagai kesempatan untuk membawa pengetahuan, gagasan, dan nilai-nilai yang diperoleh di bangku perkuliahan agar dapat memberikan manfaat secara langsung bagi masyarakat.',
    proker: [
      {
        id: 'proker-sosmas-1',
        name: 'Merah Mengabdi Vol 4',
        description:
          'kepada masyarakat yang diselenggarakan oleh  Departemen Sosial Masyarakat Badan Eksekutif  Mahasiswa Fakultas Hukum Universitas Andalas  sebagai bentuk implementasi Tri Dharma Perguruan  Tinggi, khususnya pada bidang pengabdian kepada masyarakat. Kegiatan ini menjadi wadah bagi mahasiswa untuk berkontribusi secara langsung dalam membantu masyarakat melalui berbagai program  pemberdayaan, edukasi hukum, sosial, kesehatan, pendidikan, lingkungan, serta pengembangan potensi daerah. Melalui kolaborasi antara mahasiswa, pemerintah  nagari, pemuda, dan masyarakat setempat, Merah Mengabdi diharapkan mampu menghadirkan manfaat yang berkelanjutan serta memperkuat hubungan antara  civitas akademika Fakultas Hukum Universitas Andalas dengan masyarakat.',
      },
      {
        id: 'proker-sosmas-2',
        name: 'MERDU (Merah Edukasi)',
        description:
          'MERDU (Merah Edukasi) merupakan program  edukatif yang diselenggarakan oleh Departemen Sosial  Masyarakat BEM Fakultas Hukum Universitas Andalas  melalui media podcast yang berkolaborasi dengan  Dinas Sosial. Program ini dirancang sebagai wadah  penyebarluasan informasi, edukasi, serta diskusi  mengenai isu-isu sosial yang relevan dengan kehidupan masyarakat, khususnya generasi muda. Melalui format podcast yang interaktif dan mudah  diakses, MERDU menghadirkan narasumber dari Dinas Sosial serta pihak-pihak terkait untuk membahas berbagai topik seperti kesejahteraan sosial,  perlindungan anak, pemberdayaan masyarakat,  penanganan permasalahan sosial, hingga peran pemuda dalam pembangunan sosial. Program ini diharapkan dapat menjadi media edukasi yang informatif, menarik, dan berdampak positif bagi masyarakat luas.',
      },
      {
        id: 'proker-sosmas-3',
        name: 'Advokasi Lingkungan & Publikasi Isu Ekologis',
        description:
          'Gerakan digital berbasis tulisan atau opini yang dibuat oleh anggota lingkungan hidup yang kemudian dipublikasikan melalui akun instagram merah lestari dan publish di media terkait',
      },
      {
        id: 'proker-sosmas-4',
        name: 'Konservasi Penyu',
        description:
          'Aksi nyata penyelamatan ekosistem pesisir melalui kunjungan langsung ke pusat konservasi penyu, edukasi pentingnya fauna laut, serta pelepasan tukik (anak Penyu) kembali ke laut.',
      },
      {
        id: 'proker-sosmas-5',
        name: 'Bank Sampah & Aksi Bersih Pesisir',
        description:
          'Program berbasis pemberdayaan ekonomi lingkungan dengan menginisiasi atau mengaktifkan sistem pengumpulan, pemilahan, dan penyetoran sampah kering (anorganik) yang bernilai ekonomis serta aksi bersih kawasan pesisir.',
      },
      {
        id: 'proker-sosmas-7',
        name: 'MERJI (Merah Jiwa)',
        description:
          'Program pengabdian dan kepedulian sosial Departemen Sosial Masyarakat BEM FHUA yang berfokus pada kesehatan mental dan kemanusiaan melalui kunjungan sosial serta berbagi bersama masyarakat yang membutuhkan.',
      },
      {
        id: 'proker-sosmas-6',
        name: 'GALAKSI (Gala Aksi Penuh Dedikasi)',
        description:
          'Setiap pendonor akan menerima bingkisan apresiasi dan  tablet tambah darah. Selain itu, membuka ruang untuk  partisipasi sosial melalui donasi buku, baju layak dipakai atau barang bermanfaat lainnya. Donasi tersebut akan  disalurkan pada program kerja di bidang Pengabdian  Masyarakat yaitu Merah Mangabdi',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-seni-olahraga-budaya',
    name: 'Departemen Seni, Olahraga dan Budaya',
    slug: 'departemen-seni-olahraga-dan-budaya',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/seni-olahraga-budaya.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Departemen Seni, Olahraga, dan Budaya BEM FHUA Kabinet Aksara Juang merupakan departemen yang bergerak dalam penyelenggaraan ajang seni,  olahraga, dan kebudayaan. Pada bidang Seni dan Olahraga, Soraya berfokus menghadirkan event-event besar berskala besar sebagai wadah kompetisi serta hiburan yang melibatkan mahasiswa ataupun pelajar dan masyarakat luas di Kota Padang. Sementara pada bidang Budaya, Soraya berfokus menjalankan program-program kerja strategis yang berorientasi langsung pada pelestarian serta pengenalan kembali kekayaan budaya lokal yang tumbuh di berbagai daerah Minangkabau.',
    proker: [
      {
        id: 'proker-soraya-1',
        name: 'CLASH OF LEX FHUA',
        description:
          'Clash Of Lex adalah program kerja unggulan dari Departemen Seni, Olahraga, dan Budaya yang dirancang sebagai wadah strategis untuk menyalurkan minat, bakat, serta potensi generasi muda di bidang olahraga. Mengusung semangat kompetisi yang sehat, kegiatan ini bertujuan untuk meningkatkan sportivitas, solidaritas, dan kebersamaan melalui dua cabang olahraga utama yaitu futsal dan basket, yang dibagi ke dalam kategori antar-mahasiswa dan antar- Pelajar SMA.',
      },
      {
        id: 'proker-soraya-2',
        name: 'EKSPEDISI BUDAYA',
        description:
          'Ekspedisi Budaya adalah salah satu program kerja dari Departemen Seni, Olahraga dan Budaya, yang program kerja ini lebih berfokus kepada budaya Minangkabau. Program kerja ini berfokus dengan melakukan pengabdian kepada salah satu nagari yang ada di Sumatera Barat, yang nanti para Volunteer akan meneliti dan mempelajari kebudayaan khusus di nagari tersebut, yang tidak banyak dikenal oleh khalayak banyak.',
      },
      {
        id: 'proker-soraya-3',
        name: 'SOUND FEST FHUA',
        description:
          'Sound Fest merupakan program kerja yang digagas oleh Bidang Seni dan Budaya, Departemen Seni, Olahraga dan Budaya BEM FHUA, sebagai wadah bagi mahasiswa untuk menyalurkan minat dan bakat di bidang musik. Kegiatan ini terdiri dari dua rangkaian utama, yaitu Pertunjukan Band dan Karaoke Night. Pertunjukan Band terbuka bagi peserta dari kalangan mahasiswa Fakultas Hukum Universitas Andalas, mahasiswa dari fakultas/kampus lain, maupun masyarakat umum yang ingin menampilkan karya dan penampilan bandnya. Sementara itu, Karaoke Night dihadirkan untuk membangun suasana kebersamaan yang lebih santai dan interaktif antar peserta.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-ekonomi-kreatif',
    name: 'Departemen Ekonomi Kreatif',
    slug: 'departemen-ekonomi-kreatif',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/.png',
    coverUrl: '/uploads/departemen/ekonomi-kreatif.png',
    photoUrl: '/uploads/departemen/logos/.png',
    description:
      'Pada bidang Funding and Partnership, Departemen Ekonomi Kreatif hadir untuk wadah mengumpulkan, mencari, dan melakukan kerjasama dengan pihak luar untuk membantu organisasi dalam perihal sponsorship dan partnership. Sementara itu, pada bidang Creative Commerce, departemen ini memberikan kesempatan bagi mahasiswa untuk mengasah kemampuan digital kreatif berupa desain kreatif serta melakukan penjualan pada tiap-tiap event BEM Fakultas Hukum Universitas Andalas.\n\nDengan adanya Departemen Ekonomi Kreatif, diharapkan mahasiswa Fakultas Hukum Universitas Andalas dapat menemukan ruang yang tepat untuk menyalurkan minat bakat mencari dan membuat peluang usahanya sendiri.',
    proker: [
      {
        id: 'proker-ekraf-1',
        name: 'Benang Merah',
        description:
          'Program kerja wirausaha dengan menjual makanan ringan, minuman, maupun produk kreatif di lingkungan Fakultas Hukum dan acara BEM FHUA untuk menumbuhkan jiwa entrepreneurship pengurus.',
      },
      {
        id: 'proker-ekraf-2',
        name: 'Ekraf Corner',
        description:
          'Bentuk kegiatan dengan membuka stand penjualan pada berbagai acara yang diselenggarakan di lingkungan Fakultas Hukum. Produk yang dijual berupa merchandise resmi BEM FHUA, makanan, dan minuman. Tujuannya sebagai sarana melatih keterampilan berwirausaha bagi pengurus BEM. Sasaran dari proker ini yaitu Seluruh civitas akademika Universitas Andalas, mahasiswa Fakultas Hukum, serta masyarakat umum yang hadir atau berada di sekitar lokasi kegiatan',
      },
      {
        id: 'proker-ekraf-3',
        name: 'Talk Show Kreatif',
        description:
          'Program kerja ini hadir untuk membuka cakrawala mahasiswa Fakultas Hukum Universitas Andalas agar mampu melihat peluang bisnis, membangun potensi usaha sejak kuliah, sekaligus memahami pentingnya aspek hukum  dalam melindungi usaha kreatif mereka. Pada Talk Show Kreatif ini akan menghadirkan 2 narasumber yaitu alumni/mahasiswa Fakultas Hukum yang memiliki bisnis dan usaha; serta dosen Fakultas Hukum Perdata Bisnis.',
      },
      {
        id: 'proker-ekraf-4',
        name: 'Glow Up Project',
        description:
          'Program kerja ini berfokus pada pembuatan nama baru, logo, serta identitas visual toko BEM FHUA. Rebranding ini bertujuan memperkuat citra toko sebagai unit kewirausahaan yang profesional, menarik, dan mudah dikenali oleh mahasiswa.',
      },
      {
        id: 'proker-ekraf-5',
        name: 'Desain Kreatif & Merchandise Resmi',
        description:
          'Program kerja ini berfokus pada pembuatan dan penjualan merchandise resmi BEM FHUA yang dapat digunakan sebagai identitas sekaligus media branding organisasi. Merchandise dapat berupa lighter, gantungan kunci, sticker, kaos, hingga aksesoris lain yang relevan dengan mahasiswa hukum.',
      },
      {
        id: 'proker-ekraf-6',
        name: 'Creative Alliance',
        description:
          'Menjembatani hubungan antara organisasi dan berbagai partner dalam rangka mendukung dan menyukseskan acara demi menjaga kepercayaan dan memastikan bahwa semua pihak yang berkaitan mendapatkan keuntungan dan sesuai perjanjian.',
      },
      {
        id: 'proker-ekraf-7',
        name: 'Sponsor Assist (Database & Kemitraan)',
        description:
          'Proker Data Sponsor merupakan program kerja yang berfokus pada pendataan, pengelolaan, dan pemutakhiran informasi sponsor atau mitra yang pernah maupun berpotensi menjalin kerja sama dengan kepanitiaan BEM FHUA. Data yang dihimpun meliputi nama sponsor, dan jenis sponsor yang diberikan. Kegiatan ini bertujuan untuk memudahkan divisi sponsor dan dana di kepanitiaan yang ada di BEM dalam mencari sponsor di masa kepanitiaan berlangsung. Dengan adanya Data Sponsor, BEM memiliki arsip sponsor yang jelas, sehingga proses pencarian, pengelolaan, maupun evaluasi kerja sama dapat dilakukan lebih efektif dan efisien.',
      },
    ],
    staff: [],
  },
  {
    id: 'dept-pemberdayaan-perempuan',
    name: 'Departemen Pemberdayaan Perempuan',
    slug: 'departemen-pemberdayaan-perempuan',
    category: 'Departemen',
    logoUrl: '/uploads/departemen/logos/departemen-pemberdayaan-perempuan.png',
    coverUrl: '/uploads/departemen/pemberdayaan-perempuan.png',
    photoUrl: '/uploads/departemen/logos/departemen-pemberdayaan-perempuan.png',
    description:
      'Departemen Pemberdayaan Perempuan BEM FHUA bertugas memastikan keadilan dan rasa aman bagi mahasiswi di lingkungan kampus, mendorong kepemimpinan perempuan, serta mengedukasi kesetaraan gender demi menghadirkan ruang akademik yang aman, suportif, dan bebas dari diskriminasi maupun kekerasan seksual.',
    proker: [
      {
        id: 'proker-pp-1',
        name: 'Srikandi Peduli',
        description:
          'Srikandi Peduli adalah program kerja unggulan Departemen Pemberdayaan Perempuan BEM FHUA yang digagas oleh Bidang Advokasi dan Pergerakan Perempuan. Program ini hadir untuk mengedukasi remaja SMP di Kota Padang agar sigap menghadapi masa pubertas, waspada terhadap pelecehan seksual, serta paham mengenai hak perempuan dan kesehatan mental.',
      },
      {
        id: 'proker-pp-2',
        name: 'HerStory',
        description:
          'Kampanye digital Bidang Advokasi dan Pergerakan Perempuan di Instagram BEM FHUA ini memanfaatkan momentum hari besar perempuan dan anak untuk mengedukasi publik. Program HerStory berinovasi dengan tidak hanya menyajikan ucapan formal, tetapi juga mengintegrasikan infografis ringkas berbasis data hukum kontemporer serta fitur interaktif seperti Quiz, Polls, atau Add Yours. Melalui pendekatan yang praktis, modern, dan solutif ini, program dapat berjalan efisien tanpa menyita waktu kepengurusan, sekaligus memiliki daya edukasi yang tinggi dan sukses membangun keterlibatan aktif dari mahasiswi serta masyarakat luas.',
      },
      {
        id: 'proker-pp-3',
        name: 'Sorot Mata',
        description:
          'Program digital advokasi melalui media sosial BEM FHUA berfungsi sebagai sarana edukasi, respons cepat, dan pengawalan isu sosial-hukum terkait perempuan dan anak. Program ini merespons isu viral secara taktis dengan menyajikan informasi terkini yang dipadukan analisis hukum ringkas (Legal Statement). Dikemas lewat konten kreatif seperti infografis, video pendek, atau podcast, kegiatan ini fleksibel namun tetap efektif meningkatkan literasi hukum publik dan menjaga peran mahasiswa dalam mengawal ruang aman bagi perempuan.',
      },
      {
        id: 'proker-pp-4',
        name: 'Ruang Puan',
        description:
          'Program kerja yang menyediakan wadah edukatif, kreatif, dan inklusif bagi mahasiswa untuk memahami pentingnya pemberdayaan perempuan dan kesetaraan. Acara ini dikemas melalui sesi diskusi inspiratif bersama narasumber, sesi interaktif, serta berbagai aktivitas seni yang ekspresif (seperti melukis dan menyanyi). Terbuka untuk perempuan maupun laki-laki, program ini bertujuan membangun kesadaran bahwa terciptanya lingkungan yang setara adalah tanggung jawab Bersama.',
      },
      {
        id: 'proker-pp-5',
        name: 'Untukmu, Perempuan Hebat',
        description:
          'Merupakan program kerja yang mengajak mahasiswa untuk menuliskan surat berisi apresiasi, rasa terima kasih, doa, dan semangat kepada perempuan-perempuan hebat di sekitar mereka. Kegiatan ini mencakup penulisan surat, penyaluran surat kepada penerima, serta kampanye positif melalui dokumentasi dan publikasi isi pesan inspiratif. Program ini bertujuan menumbuhkan budaya saling menghargai, memperkuat empati, serta mengingatkan bahwa setiap perempuan layak diapresiasi atas setiap perjuangan dan kontribusinya.',
      },
    ],
    staff: [],
  },
];

export const HARDCODED_DEPARTEMEN = RAW_HARDCODED_DEPARTEMEN.map((d) => ({
  ...d,
  staff: staffData[d.slug] || d.staff || [],
}));

export const DEPARTMENT_SLUG_ORDER = [
  'presidium',
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
    case 'departemen-pengembangan-sumber-daya-mahasiswa':
      return 'center 48%';
    case 'biro-keuangan':
      return 'center 52%';
    case 'inspektorat-jenderal':
      return 'center 54%';
    case 'biro-kesekretariatan':
      return 'center 48%';
    case 'kantor-medkominfo':
      return 'center 46%';
    case 'departemen-ekonomi-kreatif':
      return 'center 45%';
    case 'departemen-sosial-masyarakat':
      return 'center 46%';
    case 'departemen-hubungan-internal':
      return 'center 38%';
    case 'departemen-advokasi-dan-kesejahteraan-mahasiswa':
      return 'center 40%';
    case 'departemen-seni-olahraga-dan-budaya':
      return 'center 36%';
    case 'departemen-pemberdayaan-perempuan':
      return 'center 40%';
    case 'kordept-pelayanan-pergerakan':
      return 'center 38%';
    case 'kordept-relasi-pengembangan':
      return 'center 40%';
    case 'kordept-pengabdian-kreatifitas':
      return 'center 40%';
    case 'departemen-politik-dan-hukum':
      return 'center 34%';
    case 'departemen-hubungan-eksternal':
      return 'center 30%';
    case 'presidium':
      return 'center 45%';
    default:
      return 'center 42%';
  }
}
