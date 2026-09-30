'use client';

import { motion } from 'framer-motion';
const defaultElements = [
  {
    title: 'Timbangan Keadilan',
    desc: 'Menegaskan komitmen BEM FH UNAND terhadap supremasi hukum, kesetaraan di hadapan hukum, dan pembelaan hak-hak masyarakat.',
  },
  {
    title: 'Gonjong Rumah Gadang',
    desc: 'Identitas kultural Universitas Andalas di Ranah Minang, memegang teguh falsafah Adat Basandi Syarak, Syarak Basandi Kitabullah.',
  },
  {
    title: 'Aksara & Kesarjanaan',
    desc: 'Menjiwai nama Kabinet Aksara Juang sebagai simbol literasi hukum, ketajaman analisis intelektual, dan mimbar akademik yang progresif.',
  },
  {
    title: 'Api Semangat Perjuangan',
    desc: 'Simbol kobaran semangat yang pantang padam dalam mengawal aspirasi mahasiswa serta memperjuangkan keadilan sosial.',
  },
  {
    title: 'Lingkaran & Integritas',
    desc: 'Melambangkan kebulatan tekad, persatuan civitas akademika tanpa sekat primordial, serta integritas moral dalam memegang amanah.',
  },
  {
    title: 'Harmoni Marun & Emas',
    desc: 'Merah marun melambangkan keberanian dan ketegasan sikap, berpadu kilau emas yang melambangkan kemuliaan dan masa depan gemilang.',
  },
];

export default function FilosofiLogoInteractive({ profileLogoPhilosophy }) {
  return (
    <section id="filosofi-logo" className="scroll-mt-24 py-16 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Centered Short Section Divider */}
        <div className="w-1/3 max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" aria-hidden="true" />

        {/* Header with fluid scroll reveal - aligned left and positioned slightly lower */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pt-2 sm:pt-4 mb-10 text-left flex flex-col items-start"
        >
          <span className="text-xs text-brand-neon uppercase tracking-wide font-medium block">
            Identitas &amp; Makna
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Filosofi Logo</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl text-left">
            Setiap simbol dalam lambang BEM FH UNAND merefleksikan nafas pergerakan dan jati diri mahasiswa.
          </p>
        </motion.div>

        {profileLogoPhilosophy && (
          <div className="mb-8 p-5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm whitespace-pre-wrap leading-relaxed text-left max-w-3xl">
            {profileLogoPhilosophy}
          </div>
        )}

        {/* 2-Column Showcase: Left = Logo BEM FH UNAND, Right = Philosophy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Logo Badge with Radial Glow */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center w-full max-w-sm">
              {/* Radial ambient glow */}
              <div
                className="absolute -inset-6 rounded-full blur-3xl bg-brand-red/20 scale-95 opacity-70 pointer-events-none"
              />

              {/* Circular Logo Badge */}
              <div
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-4 sm:p-5 bg-[radial-gradient(circle,_#ffffff_40%,_#8e1616_100%)] shadow-[0_0_30px_rgba(142,22,22,0.5)] ring-2 ring-white/10 hover:scale-102 transition-all duration-500 flex items-center justify-center"
              >
                <img
                  src="/logo.png"
                  alt="Logo BEM FH UNAND"
                  className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy Cards (Shifted to the Right) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {defaultElements.map((elem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.06 * idx,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group rounded-xl p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer border bg-white/5 border-white/10 hover:border-brand-neon hover:bg-brand-red/20 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(254,174,174,0.25)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors text-gray-400 bg-white/5 border border-white/10 group-hover:bg-brand-neon group-hover:text-brand-dark"
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <h3
                      className="text-base font-semibold mb-2 transition-colors text-white group-hover:text-brand-neon"
                    >
                      {elem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {elem.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
