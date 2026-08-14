import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { NewsContext } from '../../context/NewsContext';

function NewsManager() {
  const { news, addNews, deleteNews, updateNews } = useContext(NewsContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', author: '', content: '' });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ title: item.title, category: item.category, author: item.author, content: item.content });
    } else {
      setEditingId(null);
      setFormData({ title: '', category: '', author: '', content: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', category: '', author: '', content: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    
    if (editingId) {
      updateNews(editingId, { ...formData, date });
    } else {
      addNews({ ...formData, date });
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manajemen Berita</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-neon text-brand-dark px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={20} /> Tambah Berita
        </button>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-gray-300 text-sm">
              <th className="p-4 font-semibold">Judul</th>
              <th className="p-4 font-semibold">Kategori</th>
              <th className="p-4 font-semibold">Tanggal</th>
              <th className="p-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white max-w-xs truncate">{item.title}</td>
                <td className="p-4 text-sm text-gray-400">{item.category}</td>
                <td className="p-4 text-sm text-gray-400">{item.date}</td>
                <td className="p-4 flex justify-end gap-3">
                  <button onClick={() => handleOpenModal(item)} className="p-2 bg-white/10 text-brand-neon rounded-lg hover:bg-brand-neon hover:text-brand-dark transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteNews(item.id)} className="p-2 bg-white/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">Belum ada berita. Silakan tambahkan berita pertama Anda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-dark border border-white/20 rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Berita' : 'Tambah Berita'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Judul Berita</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-neon" placeholder="Masukkan judul..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-neon" placeholder="Misal: Kajian Strategis" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Penulis</label>
                  <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-neon" placeholder="Nama Penulis / Departemen" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Konten Berita</label>
                <textarea required rows="8" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-neon" placeholder="Tuliskan isi berita di sini... (Gunakan Enter 2x untuk paragraf baru)"></textarea>
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors">Batal</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-brand-neon text-brand-dark font-bold hover:scale-105 transition-transform">
                  Simpan Berita
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default NewsManager;
