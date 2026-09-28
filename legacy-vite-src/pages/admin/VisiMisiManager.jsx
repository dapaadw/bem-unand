import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CheckCircle2, RotateCcw, Save } from 'lucide-react';
import { useVisiMisi } from '../../context/VisiMisiContext';

function VisiMisiManager() {
  const { visi, misi, saveVisiMisi, resetToDefault } = useVisiMisi();

  const [formData, setFormData] = useState({
    visi: visi,
    misi: [...misi]
  });

  const [notification, setNotification] = useState('');

  const handleVisiChange = (e) => {
    setFormData({ ...formData, visi: e.target.value });
  };

  const handleMisiChange = (index, value) => {
    const updatedMisi = [...formData.misi];
    updatedMisi[index] = value;
    setFormData({ ...formData, misi: updatedMisi });
  };

  const handleAddMisi = () => {
    setFormData({
      ...formData,
      misi: [...formData.misi, '']
    });
  };

  const handleRemoveMisi = (index) => {
    const updatedMisi = formData.misi.filter((_, idx) => idx !== index);
    setFormData({ ...formData, misi: updatedMisi });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanMisi = formData.misi.filter(item => item.trim() !== '');
    saveVisiMisi(formData.visi, cleanMisi);
    setFormData({ ...formData, misi: cleanMisi });
    setNotification('Visi & Misi berhasil disimpan!');
    setTimeout(() => setNotification(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan Visi & Misi ke pengaturan bawaan (default)?')) {
      resetToDefault();
      const defaultMisiList = [
        "Mengoptimalkan fungsi advokasi dan pelayanan mahasiswa yang responsif, solutif, dan berpihak pada kesejahteraan civitas akademika.",
        "Menumbuhkan budaya intelektual kritis, riset hukum strategis, dan pengawalan kebijakan publik yang konstruktif.",
        "Mempererat sinergi, kolaborasi, dan harmonisasi antar kelembagaan di lingkungan FH UNAND maupun eksternal kampus.",
        "Mengembangkan potensi kepemimpinan, minat bakat, dan karakter mahasiswa yang berintegritas dan berwawasan luas.",
        "Menghadirkan aksi nyata dan pengabdian masyarakat yang solutif serta berdampak bagi lingkungan sekitar."
      ];
      const defaultVisiText = "Terwujudnya BEM FH UNAND sebagai episentrum pergerakan dan advokasi yang progresif, inklusif, responsif, dan berintegritas demi terwujudnya keadilan sosial serta kemaslahatan mahasiswa dan masyarakat.";
      setFormData({
        visi: defaultVisiText,
        misi: defaultMisiList
      });
      setNotification('Visi & Misi dikembalikan ke bawaan.');
      setTimeout(() => setNotification(''), 4000);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Visi & Misi</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola pernyataan visi dan misi yang ditampilkan di halaman depan (Home).</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-medium transition-colors"
        >
          <RotateCcw size={16} />
          <span>Reset ke Bawaan</span>
        </button>
      </div>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 flex items-center gap-3 text-sm font-medium"
        >
          <CheckCircle2 size={18} />
          <span>{notification}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Visi Section */}
        <div className="bg-black/30 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-neon"></span>
              Visi Organisasi
            </h2>
            <p className="text-xs text-gray-400 mt-1">Rumuskan visi besar kepengurusan BEM FH UNAND.</p>
          </div>
          <textarea
            required
            rows={4}
            value={formData.visi}
            onChange={handleVisiChange}
            placeholder="Tuliskan visi BEM FH UNAND di sini..."
            className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon leading-relaxed text-sm md:text-base"
          />
        </div>

        {/* Misi Section */}
        <div className="bg-black/30 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-neon"></span>
                Misi Organisasi
              </h2>
              <p className="text-xs text-gray-400 mt-1">Daftar langkah strategis untuk mewujudkan visi.</p>
            </div>
            <button
              type="button"
              onClick={handleAddMisi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-neon/10 hover:bg-brand-neon/20 border border-brand-neon/30 text-brand-neon text-xs font-semibold transition-colors"
            >
              <Plus size={16} /> Tambah Misi
            </button>
          </div>

          <div className="space-y-4">
            {formData.misi.map((item, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-brand-neon font-bold text-sm flex items-center justify-center shrink-0 mt-2 border border-white/10 group-focus-within:border-brand-neon">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <textarea
                    required
                    rows={2}
                    value={item}
                    onChange={(e) => handleMisiChange(index, e.target.value)}
                    placeholder={`Tuliskan butir misi ke-${index + 1}...`}
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon text-sm leading-relaxed"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMisi(index)}
                  disabled={formData.misi.length <= 1}
                  className="p-2.5 mt-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                  title="Hapus butir misi"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-neon text-brand-dark font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)]"
          >
            <Save size={18} />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default VisiMisiManager;

