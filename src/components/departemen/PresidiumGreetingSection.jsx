
const PRESIDIUM_DATA = {
  presiden: {
    name: 'Muhammad Dzaki',
    role: 'Ketua BEM FHUA',
    badge: 'Ketua BEM FHUA',
    photoUrl: '/uploads/departemen/staff/presidium/individual/ketua-bem.png',
    greetingGreeting: 'Salam Perjuangan, Salam Mahasiswa Hukum!',
    greetingParagraphs: [
      'Melalui Kabinet Aksara Juang, kami bertekad untuk menjadikan BEM FHUA sebagai ruang gerak mahasiswa yang kritis, inklusif, dan berintegritas, serta senantiasa berkomitmen terhadap perjuangan keadilan dan kemanusiaan.',
      'Kami meyakini bahwa setiap langkah perjuangan membutuhkan sinergi, kepercayaan, dan tanggung jawab bersama. Oleh karena itu, dengan semangat kolektif dan kesungguhan dalam mengemban amanah, kami akan terus berupaya menghadirkan gerakan mahasiswa yang bermakna, progresif, dan berpihak pada kepentingan mahasiswa serta nilai-nilai kemanusiaan.',
    ],
  },
  wakilPresiden: {
    name: 'Sabrina Najwa Aqilla',
    role: 'Wakil Ketua BEM FHUA',
    badge: 'Wakil Ketua BEM FHUA',
    photoUrl: '/uploads/departemen/staff/presidium/individual/wakil-ketua-bem.png',
    greetingGreeting: 'Bergerak Bersama, Berdampak Nyata.',
    greetingParagraphs: [
      'Sebagai Wakil Ketua Badan Eksekutif Mahasiswa (BEM), saya percaya bahwa organisasi bukan sekadar tempat menjalankan program kerja, tetapi juga ruang untuk bertumbuh, menyatukan gagasan, memperkuat solidaritas, serta melahirkan perubahan yang bermanfaat bagi mahasiswa dan masyarakat.',
      'Saya berharap BEM dapat terus menjadi wadah yang terbuka terhadap aspirasi, berani menghadapi tantangan, serta konsisten dalam memperjuangkan kepentingan mahasiswa. Dengan semangat kebersamaan, tanggung jawab, dan kolaborasi, mari kita wujudkan organisasi yang progresif, berintegritas, dan memberikan dampak nyata.',
      'Karena pada akhirnya, keberhasilan organisasi bukan hanya tentang apa yang telah kita laksanakan, tetapi juga tentang seberapa besar manfaat yang dapat kita tinggalkan.',
    ],
  },
  sekretariat: {
    name: 'Annisa Salsabillany Yusuf',
    role: 'Sekretaris Kabinet',
    badge: 'Sekretaris Kabinet',
    photoUrl: '/uploads/departemen/staff/presidium/individual/sekretaris-kabinet.png',
    title: 'Tata Kelola Administrasi & Harmonisasi Kebijakan',
    description:
      'Sekretariat Kabinet bertugas sebagai poros sentral tata kelola administrasi di bawah kepemimpinan Presidium BEM FH UNAND. Mengemban tanggung jawab utama dalam standardisasi operasional persuratan, perumusan dan pengawalan SOP kepengurusan, penerbitan Keputusan Ketua BEM, serta menjamin kelancaran koordinasi terpadu antar seluruh departemen, biro, dan lembaga.',
  },
};

export default function PresidiumGreetingSection() {
  const { presiden, wakilPresiden, sekretariat } = PRESIDIUM_DATA;

  return (
    <section className="mb-20 sm:mb-28">
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
          Pimpinan Kabinet
        </h2>
        <div className="w-16 h-1 bg-brand-neon/80 mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-16 sm:space-y-24">
        {/* 1. PRESIDEN MAHASISWA / KETUA BEM (Photo Left, Text Right) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative">
          {/* Portrait Photo */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] shrink-0 relative group mx-auto lg:mx-0">
            {/* Ambient Backlight Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-tr from-brand-red/30 via-brand-neon/20 to-transparent rounded-3xl blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:border-brand-neon/50 transition-all duration-500 bg-neutral-900">
              <img
                src={presiden.photoUrl}
                alt={presiden.name}
                loading="lazy"
                className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050103]/85 via-[#050103]/25 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-[#1a0a13]/80 border border-white/10 text-xs font-bold text-brand-neon uppercase tracking-wider shadow-sm backdrop-blur-md">
              <span>{presiden.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              {presiden.name}
            </h3>
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-brand-neon/90 italic mb-5 leading-snug">
              &ldquo;{presiden.greetingGreeting}&rdquo;
            </h4>
            {/* Sambutan Paragraphs inside Glassmorphic Container */}
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#1a0a13]/65 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5">
              <div className="space-y-3.5 text-xs sm:text-sm lg:text-[14.5px] text-gray-200 leading-relaxed text-justify">
                {presiden.greetingParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />

        {/* 2. WAKIL PRESIDEN MAHASISWA / WAKIL KETUA BEM (Text Left, Photo Right on Desktop) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-14 relative">
          {/* Portrait Photo */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] shrink-0 relative group mx-auto lg:mx-0">
            {/* Ambient Backlight Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-tl from-brand-red/30 via-brand-neon/20 to-transparent rounded-3xl blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:border-brand-neon/50 transition-all duration-500 bg-neutral-900">
              <img
                src={wakilPresiden.photoUrl}
                alt={wakilPresiden.name}
                loading="lazy"
                className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050103]/85 via-[#050103]/25 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-[#1a0a13]/80 border border-white/10 text-xs font-bold text-brand-neon uppercase tracking-wider shadow-sm backdrop-blur-md">
              <span>{wakilPresiden.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              {wakilPresiden.name}
            </h3>
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-brand-neon/90 italic mb-5 leading-snug">
              &ldquo;{wakilPresiden.greetingGreeting}&rdquo;
            </h4>
            {/* Sambutan Paragraphs inside Glassmorphic Container */}
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#1a0a13]/65 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5">
              <div className="space-y-3.5 text-xs sm:text-sm lg:text-[14.5px] text-gray-200 leading-relaxed text-justify">
                {wakilPresiden.greetingParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />

        {/* 3. SEKRETARIAT KABINET (Photo Left, Text Right) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative">
          {/* Portrait Photo */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] shrink-0 relative group mx-auto lg:mx-0">
            {/* Ambient Backlight Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-tr from-brand-red/30 via-brand-neon/20 to-transparent rounded-3xl blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:border-brand-neon/50 transition-all duration-500 bg-neutral-900">
              <img
                src={sekretariat.photoUrl}
                alt={sekretariat.name}
                loading="lazy"
                className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050103]/85 via-[#050103]/25 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-[#1a0a13]/80 border border-white/10 text-xs font-bold text-brand-neon uppercase tracking-wider shadow-sm backdrop-blur-md">
              <span>{sekretariat.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              {sekretariat.name}
            </h3>
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-brand-neon/90 mb-5 leading-snug">
              {sekretariat.title}
            </h4>
            {/* Deskripsi Tata Kelola inside Glassmorphic Container */}
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#1a0a13]/65 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5">
              <p className="text-xs sm:text-sm lg:text-[14.5px] text-gray-200 leading-relaxed text-justify">
                {sekretariat.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
