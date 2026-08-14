import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Target, CheckCircle2 } from 'lucide-react';

function DepartemenDetail() {
  const { id } = useParams();

  const dept = {
    name: "Departemen Kajian Aksi Strategis",
    description: "Ujung tombak pergerakan dan intelektualitas mahasiswa dalam merespon isu-isu sosial, politik, dan hukum di Indonesia. Kami berfokus pada analisis mendalam dan advokasi kebijakan publik yang berdampak langsung pada masyarakat.",
    programs: [
      "Diskusi Publik Bulanan",
      "Sekolah Pergerakan",
      "Kajian Kebijakan Strategis",
      "Aksi dan Advokasi Massa"
    ],
    members: 24,
    memberList: [
      { name: "Andi Saputra", role: "Kepala Departemen" },
      { name: "Budi Santoso", role: "Wakil Kepala Departemen" },
      { name: "Citra Lestari", role: "Staf Ahli" },
      { name: "Dewi Kirana", role: "Staf" },
      { name: "Eko Prasetyo", role: "Staf" },
      { name: "Fajar Gemilang", role: "Staf" }
    ]
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-6">
        <Link to="/departemen" className="inline-flex items-center gap-2 text-brand-neon hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Kembali ke Profil Departemen
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md"
            >
              <div className="w-24 h-24 rounded-full bg-brand-neon/20 flex items-center justify-center mb-8 border border-brand-neon/50">
                 <Users size={40} className="text-brand-neon" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{dept.name}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {dept.description}
              </p>
              
              <div className="flex items-center gap-4 text-brand-neon font-semibold bg-white/5 inline-flex px-6 py-3 rounded-full border border-white/10">
                 <Users size={20} /> {dept.members} Pengurus Aktif
              </div>
            </motion.div>

            {/* Members List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Struktur <span className="text-neon">Anggota</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dept.memberList.map((member, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:border-brand-neon/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-brand-neon/10 flex items-center justify-center flex-shrink-0">
                      <Users size={20} className="text-brand-neon" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{member.name}</h4>
                      <p className="text-sm text-brand-neon font-medium">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Programs Sidebar */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-radial-1 border border-brand-neon/30 p-8 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <Target className="text-brand-neon" size={28} />
                <h3 className="text-2xl font-bold">Program Kerja</h3>
              </div>
              
              <ul className="space-y-6">
                {dept.programs.map((prog, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-brand-neon mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg font-medium text-white">{prog}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-10 py-4 bg-transparent border-2 border-brand-neon text-brand-neon font-bold rounded-full hover:bg-brand-neon hover:text-brand-dark transition-colors">
                Hubungi Departemen
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartemenDetail;
