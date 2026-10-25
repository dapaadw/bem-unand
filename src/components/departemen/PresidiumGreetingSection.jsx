import { FileText, Award } from 'lucide-react';

const PRESIDIUM_DATA = {
  presiden: {
    name: 'Muhammad Dzaki',
    role: 'Ketua BEM FHUA',
    photoUrl: '/uploads/departemen/staff/presidium/muhammad-dzaki.png',
    greetingGreeting: 'Salam Perjuangan, Salam Mahasiswa Hukum!',
    greetingParagraphs: [
      'Melalui Kabinet Aksara Juang, kami bertekad untuk menjadikan BEM FHUA sebagai ruang gerak mahasiswa yang kritis, inklusif, dan berintegritas, serta senantiasa berkomitmen terhadap perjuangan keadilan dan kemanusiaan. Kami meyakini bahwa setiap langkah perjuangan membutuhkan sinergi, kepercayaan, dan tanggung jawab bersama. Oleh karena itu, dengan semangat kolektif dan kesungguhan dalam mengemban amanah, kami akan terus berupaya menghadirkan gerakan mahasiswa yang bermakna, progresif, dan berpihak pada kepentingan mahasiswa serta nilai-nilai kemanusiaan.',
    ],
  },
  wakilPresiden: {
    name: 'Sabrina Najwa Aqilla',
    role: 'Wakil Ketua BEM FHUA',
    photoUrl: '/uploads/departemen/staff/presidium/sabrina-najwa-aqilla.png',
    greetingGreeting: 'Bergerak Bersama, Berdampak Nyata.',
    greetingParagraphs: [
      'Sebagai Wakil Ketua Badan Eksekutif Mahasiswa (BEM), saya percaya bahwa organisasi bukan sekadar tempat menjalankan program kerja, tetapi juga ruang untuk bertumbuh, menyatukan gagasan, memperkuat solidaritas, serta melahirkan perubahan yang bermanfaat bagi mahasiswa dan masyarakat.',
      'Saya berharap BEM dapat terus menjadi wadah yang terbuka terhadap aspirasi, berani menghadapi tantangan, serta konsisten dalam memperjuangkan kepentingan mahasiswa. Dengan semangat kebersamaan, tanggung jawab, dan kolaborasi, mari kita wujudkan organisasi yang progresif, berintegritas, dan memberikan dampak nyata.',
      'Karena pada akhirnya, keberhasilan organisasi bukan hanya tentang apa yang telah kita laksanakan, tetapi juga tentang seberapa besar manfaat yang dapat kita tinggalkan.'
    ],
  },
  sekretariat: {
    name: 'Annisa Salsabillany Yusuf',
    role: 'Sekretaris Kabinet',
    photoUrl: '/uploads/departemen/staff/presidium/annisa-salsabillany-yusuf.png',
    title: 'Tata Kelola Administrasi & Harmonisasi Kebijakan',
    description:
      'Sekretariat Kabinet bertugas sebagai poros sentral tata kelola administrasi di bawah kepemimpinan Presidium BEM FH UNAND. Mengemban tanggung jawab utama dalam standardisasi operasional persuratan, perumusan dan pengawalan SOP kepengurusan, penerbitan Keputusan Ketua BEM, serta menjamin kelancaran koordinasi terpadu antar seluruh departemen, biro, dan lembaga.',
  },
};

export default function PresidiumGreetingSection() {
  const { presiden, wakilPresiden, sekretariat } = PRESIDIUM_DATA;

  return (
    <section className="mb-16 sm:mb-24">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
          Pimpinan BEM FHUA
        </h2>
        <div className="w-16 h-1 bg-brand-neon/80 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-10 sm:space-y-12">
        {/* 1. PRESIDEN BEM (Photo Left, Greeting Right on Desktop) */}
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#1a0a13]/70 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative overflow-hidden group">
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-72 h-72 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Circular Avatar Frame: Presiden BEM */}
          <div className="flex flex-col items-center text-center shrink-0 w-full sm:w-auto">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full bg-gradient-to-b from-[#3a0d18] to-[#17040a] border-3 border-brand-neon/40 group-hover:border-brand-neon group-hover:scale-105 group-hover:shadow-[0_12px_30px_rgba(254,174,174,0.35)] transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden shrink-0 relative">
              <img
                src={presiden.photoUrl}
                alt={presiden.name}
                loading="lazy"
                className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 text-base sm:text-lg font-bold text-white group-hover:text-brand-neon transition-colors leading-snug">
              {presiden.name}
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-400 mt-0.5 max-w-[200px]">
              {presiden.role}
            </p>
          </div>

          {/* Kata Sambutan Presiden BEM */}
          <div className="flex-1 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold text-brand-neon uppercase tracking-wider">
              <span>Sambutan Presiden Mahasiswa</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 text-brand-neon/95">
              &ldquo;{presiden.greetingGreeting}&rdquo;
            </h4>
            <div className="space-y-3 text-xs sm:text-sm lg:text-[14px] text-gray-200 leading-relaxed text-justify">
              {presiden.greetingParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 2. WAKIL PRESIDEN BEM (Greeting Left, Photo Right on Desktop) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#1a0a13]/70 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative overflow-hidden group">
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Circular Avatar Frame: Wakil Presiden BEM */}
          <div className="flex flex-col items-center text-center shrink-0 w-full sm:w-auto">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full bg-gradient-to-b from-[#3a0d18] to-[#17040a] border-3 border-brand-neon/40 group-hover:border-brand-neon group-hover:scale-105 group-hover:shadow-[0_12px_30px_rgba(254,174,174,0.35)] transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden shrink-0 relative">
              <img
                src={wakilPresiden.photoUrl}
                alt={wakilPresiden.name}
                loading="lazy"
                className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 text-base sm:text-lg font-bold text-white group-hover:text-brand-neon transition-colors leading-snug">
              {wakilPresiden.name}
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-400 mt-0.5 max-w-[200px]">
              {wakilPresiden.role}
            </p>
          </div>

          {/* Kata Sambutan Wakil Presiden BEM */}
          <div className="flex-1 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold text-brand-neon uppercase tracking-wider">
              <span>Sambutan Wakil Presiden Mahasiswa</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 text-brand-neon/95">
              &ldquo;{wakilPresiden.greetingGreeting}&rdquo;
            </h4>
            <div className="space-y-3 text-xs sm:text-sm lg:text-[14px] text-gray-200 leading-relaxed text-justify">
              {wakilPresiden.greetingParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SEKRETARIAT KABINET (Circular Avatar Frame & Tata Kelola Administrasi) */}
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#16060f]/60 border border-white/10 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.45)] ring-1 ring-white/5 relative overflow-hidden group">
          {/* Circular Avatar Frame: Sekretariat */}
          <div className="flex flex-col items-center text-center shrink-0 w-full sm:w-auto">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full bg-gradient-to-b from-[#3a0d18] to-[#17040a] border-2 border-white/20 group-hover:border-brand-neon group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(254,174,174,0.3)] transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden shrink-0 relative">
              <img
                src={sekretariat.photoUrl}
                alt={sekretariat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-3.5 text-base sm:text-lg font-bold text-white group-hover:text-brand-neon transition-colors leading-snug">
              {sekretariat.name}
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-400 mt-0.5 max-w-[200px]">
              {sekretariat.role}
            </p>
          </div>

          {/* Portfolio & Penjelasan Tata Kelola Administrasi */}
          <div className="flex-1 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold text-brand-neon uppercase tracking-wider">
              <FileText size={14} />
              <span>Poros Tata Kelola Kabinet</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-2.5">
              {sekretariat.title}
            </h4>
            <p className="text-xs sm:text-sm lg:text-[14px] text-gray-200 leading-relaxed text-justify mb-4">
              {sekretariat.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
