import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Eye } from 'lucide-react';
import { NewsContext } from '../../context/NewsContext';

function Dashboard() {
  const { news } = useContext(NewsContext);

  const stats = [
    { title: "Total Berita", value: news.length, icon: <FileText size={32} className="text-brand-neon" /> },
    { title: "Total Pengunjung", value: "1,245", icon: <Users size={32} className="text-brand-neon" /> },
    { title: "Views Hari Ini", value: "128", icon: <Eye size={32} className="text-brand-neon" /> }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-black/30 border border-white/10 p-6 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-4xl font-bold">{stat.value}</h3>
            </div>
            <div className="w-16 h-16 rounded-full bg-brand-neon/10 flex items-center justify-center">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-black/30 border border-white/10 p-6 md:p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">Berita Terbaru</h2>
        <div className="space-y-4">
          {news.slice(0, 3).map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <h4 className="font-bold text-white mb-1 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-brand-neon">{item.category} &bull; {item.date}</p>
              </div>
            </div>
          ))}
          {news.length === 0 && <p className="text-gray-400 text-sm">Belum ada berita yang diunggah.</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
