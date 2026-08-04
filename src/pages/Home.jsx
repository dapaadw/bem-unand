import React from 'react';
import { ArrowRight, BookOpen, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
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
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-300">Selamat Datang di</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter"
          >
            <span className="block text-white mb-2">BEM FH UI</span>
            <span className="block text-neon">Berdampak &</span>
            <span className="block text-neon">Berintegritas</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Wadah kolaborasi, advokasi, dan inovasi bagi seluruh mahasiswa Fakultas Hukum Universitas Indonesia. Bersama membangun supremasi hukum.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <button className="group relative px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(254,174,174,0.4)]">
              <span className="relative z-10">Jelajahi Program</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-gradient-radial-2 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Pilar <span className="text-neon">Utama</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Fokus pergerakan kami dalam mewujudkan visi BEM FH UI yang inklusif dan progresif.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Advokasi Kesejahteraan", icon: <Users size={32} className="text-brand-neon" />, desc: "Memastikan hak dan kesejahteraan mahasiswa terpenuhi melalui dialog dan aksi nyata." },
              { title: "Kajian Strategis", icon: <BookOpen size={32} className="text-brand-neon" />, desc: "Menganalisis isu-isu hukum dan sosial terkini secara komprehensif dan kritis." },
              { title: "Pengembangan Minat", icon: <Calendar size={32} className="text-brand-neon" />, desc: "Memfasilitasi potensi mahasiswa dalam bidang akademik maupun non-akademik." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-brand-neon/50 transition-colors duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-neon/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
