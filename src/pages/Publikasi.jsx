import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

function Publikasi() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-radial-2">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Ruang <span className="text-neon">Publikasi</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Kumpulan rilis, kajian, dan berita terbaru dari BEM FH UI.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: item * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-neon/50 transition-all duration-300 group"
            >
              <div className="h-48 bg-black/40 flex items-center justify-center relative overflow-hidden">
                <FileText size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <div className="text-brand-neon text-sm font-semibold mb-2">Kajian Strategis</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-neon transition-colors">Analisis RUU Terkini dan Dampaknya bagi Masyarakat</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className="text-sm font-bold text-white hover:text-brand-neon transition-colors">Baca Selengkapnya &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Publikasi;
