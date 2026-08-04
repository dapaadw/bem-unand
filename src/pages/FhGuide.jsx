import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

function FhGuide() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-radial-1">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">FH <span className="text-neon">Guide</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Panduan komprehensif kehidupan kampus Fakultas Hukum Universitas Indonesia.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-black/40 border border-brand-neon/20 rounded-3xl p-8 md:p-12 backdrop-blur-md text-center">
          <BookOpen size={64} className="mx-auto text-brand-neon mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold mb-4">Buku Panduan Mahasiswa Baru</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Dapatkan informasi lengkap seputar sistem akademik, fasilitas kampus, organisasi kemahasiswaan, dan tips bertahan hidup di Fakultas Hukum Universitas Indonesia.
          </p>
          <button className="px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(254,174,174,0.4)]">
            Unduh FH Guide 2026
          </button>
        </div>
      </div>
    </div>
  );
}

export default FhGuide;
