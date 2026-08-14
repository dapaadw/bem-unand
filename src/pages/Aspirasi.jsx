import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

function Aspirasi() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    category: 'Akademik',
    message: '',
    isAnonymous: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', nim: '', category: 'Akademik', message: '', isAnonymous: false });
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-radial-1 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-neon rounded-full mix-blend-multiply filter blur-[150px] opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-sm font-bold mb-6">
            <MessageSquare size={16} /> Suara Mahasiswa
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Form <span className="text-neon">Aspirasi</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Punya keluhan, kritik, atau saran untuk kemajuan Fakultas Hukum UNAND? Sampaikan aspirasi Anda di sini. Kami jamin kerahasiaan identitas Anda.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-2/3 bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-brand-neon/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-brand-neon" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Aspirasi Terkirim!</h3>
                <p className="text-gray-400 mb-8">Terima kasih telah berkontribusi untuk kemajuan FH UNAND. Aspirasi Anda telah kami catat dan akan segera ditindaklanjuti oleh departemen terkait.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-brand-neon text-brand-dark font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Kirim Aspirasi Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required={!formData.isAnonymous}
                      disabled={formData.isAnonymous}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-neon transition-colors disabled:opacity-50"
                      placeholder={formData.isAnonymous ? "Anonim" : "Masukkan nama..."} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">NIM / No. BP</label>
                    <input 
                      type="text" 
                      required={!formData.isAnonymous}
                      disabled={formData.isAnonymous}
                      value={formData.nim}
                      onChange={(e) => setFormData({...formData, nim: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-neon transition-colors disabled:opacity-50"
                      placeholder={formData.isAnonymous ? "Dirahasiakan" : "Masukkan NIM..."} 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <input 
                    type="checkbox" 
                    id="anonymous" 
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                    className="w-5 h-5 accent-brand-neon cursor-pointer"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-300 cursor-pointer flex-1">
                    Kirim sebagai <strong>Anonim</strong> (Identitas Anda akan disembunyikan sepenuhnya)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kategori Aspirasi</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-brand-dark/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-neon transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Akademik">Fasilitas Akademik & Perkuliahan</option>
                    <option value="Infrastruktur">Infrastruktur Kampus</option>
                    <option value="Layanan">Layanan Administrasi / Birokrasi</option>
                    <option value="Kemahasiswaan">Kegiatan Kemahasiswaan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pesan Aspirasi</label>
                  <textarea 
                    required
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-neon transition-colors resize-none"
                    placeholder="Ceritakan detail masalah atau saran Anda di sini..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-brand-neon text-brand-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-brand-dark transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)]"
                >
                  Kirim Aspirasi <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-1/3 space-y-6"
          >
            <div className="bg-brand-neon/10 border border-brand-neon/30 p-6 rounded-3xl">
              <ShieldCheck size={40} className="text-brand-neon mb-4" />
              <h3 className="text-xl font-bold mb-3">Keamanan Terjamin</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Platform ini dienkripsi dengan standar tinggi. Jika Anda memilih opsi Anonim, sistem tidak akan menyimpan data identitas Anda dalam bentuk apapun.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-3">Alur Tindak Lanjut</h3>
              <ol className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3"><span className="text-brand-neon font-bold">1.</span> Verifikasi masalah oleh BEM</li>
                <li className="flex gap-3"><span className="text-brand-neon font-bold">2.</span> Eskalasi ke departemen/pihak dekanat</li>
                <li className="flex gap-3"><span className="text-brand-neon font-bold">3.</span> Dialog atau audiensi terbuka</li>
                <li className="flex gap-3"><span className="text-brand-neon font-bold">4.</span> Publikasi hasil advokasi</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Aspirasi;
