import React from "react";
import { ArrowRight, Scale, Landmark, BookOpen, Flame, ShieldCheck, Sparkles, Target, Compass, MessageCircle, Mail, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useVisiMisi } from "../context/VisiMisiContext";
import { InstagramIcon } from "../components/SocialIcons";

function Home() {
  const { visi, misi } = useVisiMisi();

  const logoElements = [
    {
      title: "Timbangan Keadilan",
      icon: <Scale size={28} className="text-brand-neon" />,
      desc: "Menegaskan komitmen BEM FH UNAND terhadap supremasi hukum, kesetaraan di hadapan hukum (equality before the law), dan pembelaan hak-hak masyarakat."
    },
    {
      title: "Gonjong Rumah Gadang",
      icon: <Landmark size={28} className="text-brand-neon" />,
      desc: "Identitas kultural Universitas Andalas di Ranah Minang, memegang teguh falsafah Adat Basandi Syarak, Syarak Basandi Kitabullah sebagai landasan moral dan etika."
    },
    {
      title: "Aksara & Kesarjanaan",
      icon: <BookOpen size={28} className="text-brand-neon" />,
      desc: "Menjiwai nama Kabinet Aksara Juang sebagai simbol literasi hukum, ketajaman analisis intelektual, dan kebebasan mimbar akademik yang progresif."
    },
    {
      title: "Api Semangat Perjuangan",
      icon: <Flame size={28} className="text-brand-neon" />,
      desc: "Simbol kobaran semangat yang pantang padam dalam mengawal aspirasi mahasiswa serta memperjuangkan keadilan sosial bagi seluruh rakyat."
    },
    {
      title: "Lingkaran & Integritas",
      icon: <ShieldCheck size={28} className="text-brand-neon" />,
      desc: "Melambangkan kebulatan tekad, persatuan civitas akademika tanpa sekat primordial, serta integritas moral pengurus dalam memegang amanah."
    },
    {
      title: "Harmoni Marun & Emas",
      icon: <Sparkles size={28} className="text-brand-neon" />,
      desc: "Warna merah marun melambangkan keberanian dan ketegasan sikap, berpadu kilau emas yang melambangkan kemuliaan, kejayaan, dan masa depan gemilang."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-radial-1 pt-20 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-neon rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-300">
              Selamat Datang di
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter"
          >
            <span className="block text-white mb-2">BEM FH UNAND</span>
            <span className="block text-neon">Kabinet Aksara Juang</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-200 w-full mx-auto font-bold tracking-widest whitespace-nowrap"
          >
            "SEMANGAT BERAKSI, PERJUANGKAN ASPIRASI"
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <a href="#visi-misi" className="group relative px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(254,174,174,0.4)]">
              <span className="relative z-10">Jelajahi Visi & Misi</span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </a>
            <a href="#filosofi-logo" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              Filosofi Logo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section id="visi-misi" className="py-28 bg-gradient-radial-2 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-brand-neon/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-xs font-bold tracking-wider uppercase mb-4">
              <Target size={14} /> Landasan Pergerakan
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Visi & <span className="text-neon">Misi</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Arah strategis dan komitmen kepengurusan BEM FH UNAND Kabinet Aksara Juang dalam melayani mahasiswa dan masyarakat.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Visi Box */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 md:p-12 rounded-3xl bg-black/40 border border-brand-neon/30 backdrop-blur-md shadow-[0_0_30px_rgba(254,174,174,0.15)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-neon/10 border border-brand-neon/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(254,174,174,0.2)]">
                  <Compass size={32} className="text-brand-neon" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-brand-neon uppercase mb-2">Visi Utama</div>
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed tracking-tight">
                    &ldquo;{visi}&rdquo;
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Misi Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-8 bg-brand-neon rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Misi Strategis</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {misi.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-neon/50 backdrop-blur-sm transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 text-brand-neon font-black text-base flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand-neon group-hover:text-brand-dark transition-all duration-300">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofi Logo BEM UNAND Section */}
      <section id="filosofi-logo" className="py-28 bg-gradient-radial-1 relative overflow-hidden border-t border-white/10">
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-red rounded-full mix-blend-screen filter blur-[150px] opacity-40"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles size={14} /> Identitas & Makna
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Filosofi <span className="text-neon">Logo</span> BEM FH UNAND
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
              Setiap lekuk, warna, dan simbol dalam lambang BEM FH UNAND merefleksikan nafas pergerakan, keluhuran hukum, dan jati diri mahasiswa.
            </p>
          </motion.div>

          {/* Logo Showcase & Intro */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-brand-neon rounded-full filter blur-2xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-black/60 border-2 border-brand-neon/40 p-6 flex items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(254,174,174,0.25)] group-hover:border-brand-neon transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="Logo BEM FH UNAND"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(254,174,174,0.4)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-xl text-center lg:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Simbol Perjuangan & Keberpihakan Hukum
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Lambang BEM FH UNAND bukan sekadar identitas visual, melainkan kompas moral dan manifestasi perjuangan civitas akademika dalam mewujudkan tatanan hukum yang berkeadilan, bermartabat, dan berakar pada kearifan Ranah Minang.
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-brand-neon">
                <ShieldCheck size={18} /> Lambang Resmi BEM FH UNAND
              </div>
            </motion.div>
          </div>

          {/* Grid Element Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoElements.map((elem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-black/40 border border-white/10 hover:border-brand-neon/50 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-neon/20 transition-all duration-300">
                    {elem.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-neon transition-colors">
                    {elem.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {elem.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-28 bg-gradient-radial-2 relative overflow-hidden border-t border-white/10">
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-neon/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-xs font-bold tracking-wider uppercase mb-4">
              <MessageCircle size={14} /> Terhubung Bersama Kami
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Kontak <span className="text-neon">& Informasi</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Pintu komunikasi BEM FH UNAND senantiasa terbuka. Hubungi kami langsung melalui WhatsApp, Instagram, atau kunjungi sekretariat kami.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="bg-black/40 border border-white/10 hover:border-brand-neon/60 p-8 rounded-3xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group shadow-[0_0_25px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle size={32} />
                </div>
                <div className="text-xs font-bold tracking-widest text-green-400 uppercase mb-2">Layanan Respons Cepat</div>
                <h3 className="text-2xl font-bold text-white mb-3">WhatsApp Resmi</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Sampaikan pertanyaan, konfirmasi kemitraan, atau permohonan informasi seputar kegiatan BEM FH UNAND secara langsung kepada narahubung kami.
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm mb-6 flex items-center justify-between">
                  <span>+62 812-3456-7890</span>
                  <span className="text-xs text-brand-neon bg-brand-neon/10 px-2.5 py-1 rounded-full">Aktif</span>
                </div>
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-brand-neon text-brand-dark font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(254,174,174,0.3)]"
              >
                <span>Chat via WhatsApp</span>
                <ExternalLink size={18} />
              </a>
            </motion.div>

            {/* Instagram Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="bg-black/40 border border-white/10 hover:border-brand-neon/60 p-8 rounded-3xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group shadow-[0_0_25px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                  <InstagramIcon size={32} />
                </div>
                <div className="text-xs font-bold tracking-widest text-pink-400 uppercase mb-2">Kanal Media Sosial</div>
                <h3 className="text-2xl font-bold text-white mb-3">Instagram Resmi</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Ikuti informasi rilis pers terkini, liputan kegiatan, infografis hukum, pengumuman ormawa, dan dokumentasi pergerakan kami setiap hari.
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm mb-6 flex items-center justify-between">
                  <span>@bemfhunand</span>
                  <span className="text-xs text-brand-neon bg-brand-neon/10 px-2.5 py-1 rounded-full">Official</span>
                </div>
              </div>

              <a
                href="https://instagram.com/bemfhunand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(254,174,174,0.2)]"
              >
                <span>Kunjungi Instagram</span>
                <ExternalLink size={18} />
              </a>
            </motion.div>
          </div>

          {/* Additional Info Cards */}
          <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center shrink-0 text-brand-neon">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Sekretariat</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Gedung Pusat Kegiatan Mahasiswa Fakultas Hukum Universitas Andalas, Limau Manis, Kec. Pauh, Kota Padang, Sumatera Barat 25175.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center shrink-0 text-brand-neon">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Surat Elektronik (Email)</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  bemfhunand.official@gmail.com
                </p>
                <a href="mailto:bemfhunand.official@gmail.com" className="text-xs text-brand-neon hover:underline mt-1 inline-block">
                  Kirim Email Kemitraan &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

