import React from 'react';
import { motion } from 'framer-motion';

function Departemen() {
  const departments = [
    "Kajian Aksi Strategis",
    "Advokasi Kesejahteraan Mahasiswa",
    "Pendidikan dan Keilmuan",
    "Pengembangan Minat dan Bakat",
    "Hubungan Masyarakat",
    "Kewirausahaan"
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-radial-2">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Profil <span className="text-neon">Departemen</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Mengenal lebih dekat ujung tombak pergerakan BEM FH UI.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-black/30 border border-brand-neon/30 p-8 rounded-2xl text-center group cursor-pointer hover:bg-brand-neon/10 transition-colors"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-brand-neon transition-colors">
                <span className="text-2xl font-bold text-white/50 group-hover:text-brand-neon">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold">{dept}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Departemen;
