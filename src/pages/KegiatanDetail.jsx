import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowLeft, Clock } from 'lucide-react';

function KegiatanDetail() {
  const { id } = useParams();

  // In a real app, you would fetch the data based on the ID.
  const kegiatan = {
    title: "Olimpiade Hukum Nasional 2026",
    date: "15 - 20 Agustus 2026",
    time: "08:00 - Selesai",
    location: "Fakultas Hukum UI, Depok",
    organizer: "Departemen Pendidikan dan Keilmuan",
    description: `
      Olimpiade Hukum Nasional (OHN) merupakan acara tahunan terbesar yang diselenggarakan oleh BEM FH UNAND. Acara ini bertujuan untuk mengasah kemampuan praktis mahasiswa hukum di seluruh Indonesia melalui serangkaian kompetisi bergengsi.
      
      Pada tahun ini, OHN mengusung tema "Menegakkan Keadilan di Era Transformasi Digital". Tema ini diangkat mengingat pesatnya perkembangan teknologi yang menuntut sistem hukum kita untuk beradaptasi dan tetap melindungi hak-hak masyarakat luas.
      
      Rangkaian acara akan terdiri dari Kompetisi Peradilan Semu (Moot Court), Kompetisi Debat Hukum, dan Lomba Karya Tulis Ilmiah. Selain kompetisi, akan ada juga Seminar Nasional yang menghadirkan pakar-pakar hukum terkemuka di Indonesia.
    `,
    highlights: [
      "Image Placeholder 1",
      "Image Placeholder 2",
      "Image Placeholder 3",
      "Image Placeholder 4"
    ]
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-brand-dark">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-gradient-radial-1 flex flex-col justify-end overflow-hidden">
        {/* Abstract shapes for premium feel */}
        <div className="absolute inset-0 bg-dark-overlay z-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-20 pb-12">
          <Link to="/kegiatan" className="inline-flex items-center gap-2 text-brand-neon hover:text-white transition-colors mb-6 font-medium text-sm">
            <ArrowLeft size={16} /> Kembali ke Galeri
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-4"
          >
            {kegiatan.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 text-sm font-medium text-gray-300"
          >
            <span className="flex items-center gap-1.5"><Calendar size={16} className="text-brand-neon" /> {kegiatan.date}</span>
            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-brand-neon" /> {kegiatan.location}</span>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
            >
              {kegiatan.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph.trim()}</p>
              ))}
            </motion.div>

            {/* Gallery Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Dokumentasi <span className="text-neon">Kegiatan</span></h3>
              <div className="grid grid-cols-2 gap-4">
                {kegiatan.highlights.map((img, idx) => (
                  <div key={idx} className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-neon/50 transition-colors cursor-pointer overflow-hidden group">
                     <span className="text-white/20 font-medium group-hover:scale-110 transition-transform duration-500">{img}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar / Meta Information */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md sticky top-32"
            >
              <h4 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Informasi Kegiatan</h4>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-neon/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-brand-neon" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Tanggal</p>
                    <p className="font-semibold text-gray-200">{kegiatan.date}</p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-neon/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-neon" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Waktu</p>
                    <p className="font-semibold text-gray-200">{kegiatan.time}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-neon/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-neon" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Lokasi</p>
                    <p className="font-semibold text-gray-200">{kegiatan.location}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-neon/10 flex items-center justify-center flex-shrink-0">
                    <Users className="text-brand-neon" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Penyelenggara</p>
                    <p className="font-semibold text-gray-200">{kegiatan.organizer}</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <button className="w-full py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(254,174,174,0.3)]">
                  Daftar Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KegiatanDetail;
