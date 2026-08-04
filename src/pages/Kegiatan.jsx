import React from 'react';
import { motion } from 'framer-motion';

function Kegiatan() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-radial-1">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Galeri <span className="text-neon">Kegiatan</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Dokumentasi program kerja dan acara BEM FH UI.</p>
        </motion.div>

        <div className="space-y-12">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, x: item % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item * 0.2 }}
              className={`flex flex-col ${item % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 bg-black/20 p-6 rounded-3xl border border-white/5 backdrop-blur-sm`}
            >
              <div className="w-full md:w-1/2 aspect-video bg-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
                <span className="text-white/30 font-semibold">Image Placeholder</span>
              </div>
              <div className="w-full md:w-1/2 px-4 md:px-8">
                <div className="inline-block px-3 py-1 rounded-full bg-brand-neon/20 text-brand-neon text-xs font-bold mb-4">Agustus 2026</div>
                <h3 className="text-3xl font-bold mb-4">Olimpiade Hukum Nasional</h3>
                <p className="text-gray-300 leading-relaxed mb-6">Kompetisi peradilan semu dan debat hukum tingkat nasional yang diselenggarakan untuk mengasah kemampuan praktis mahasiswa hukum seluruh Indonesia.</p>
                <button className="px-6 py-3 rounded-full border border-white/30 hover:border-brand-neon hover:text-brand-neon transition-colors font-semibold">Lihat Detail</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kegiatan;
