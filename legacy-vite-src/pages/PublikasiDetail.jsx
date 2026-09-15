import React, { useContext } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Tag, Share2 } from 'lucide-react';
import { NewsContext } from '../context/NewsContext';

function PublikasiDetail() {
  const { id } = useParams();
  const { news } = useContext(NewsContext);
  
  const article = news.find(item => item.id.toString() === id);

  if (!article) {
    return <Navigate to="/publikasi" />;
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/publikasi" className="inline-flex items-center gap-2 text-brand-neon hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Kembali ke Publikasi
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-neon/20 text-brand-neon text-sm font-bold mb-6">
              {article.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-white/10 mb-10 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <User size={18} className="text-brand-neon" />
                <span>Oleh <strong className="text-white">{article.author}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand-neon" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-brand-neon" />
                <span>BEM FH UNAND</span>
              </div>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-12">
              {article.content.split('\n').map((p, i) => p.trim() ? <p key={i} className="mb-6">{p.trim()}</p> : null)}
            </div>
            
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <span className="font-semibold">Bagikan:</span>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PublikasiDetail;
