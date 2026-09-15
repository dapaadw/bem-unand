import React, { createContext, useState, useEffect } from 'react';

export const NewsContext = createContext();

const initialNews = [
  {
    id: 1,
    title: "Analisis RUU Terkini dan Dampaknya bagi Masyarakat",
    category: "Kajian Strategis",
    author: "Departemen Kajian Aksi Strategis",
    date: "12 Agustus 2026",
    content: "Kehadiran Rancangan Undang-Undang (RUU) terbaru memicu perdebatan hangat di berbagai kalangan masyarakat. Kajian ini disusun untuk memberikan pandangan objektif dan kritis dari kacamata hukum ketatanegaraan.\n\nDalam bab pertama RUU tersebut, terdapat beberapa pasal yang berpotensi menimbulkan penafsiran ganda (multitafsir). Hal ini sangat riskan apabila diterapkan di masyarakat karena dapat mencederai asas kepastian hukum.\n\nSelain itu, proses legislasi yang dinilai tergesa-gesa tanpa partisipasi publik yang bermakna (meaningful participation) menjadi preseden buruk bagi demokrasi kita. BEM FH UNAND merekomendasikan agar DPR dan Pemerintah menunda pengesahan RUU ini dan membuka kembali ruang dialog bersama akademisi dan masyarakat sipil."
  },
  {
    id: 2,
    title: "Membangun Kesadaran Hukum Generasi Z",
    category: "Opini Publik",
    author: "Departemen Pendidikan dan Keilmuan",
    date: "10 Agustus 2026",
    content: "Di era digital yang serba cepat ini, akses informasi menjadi sangat mudah, termasuk informasi mengenai hak dan kewajiban hukum. Sayangnya, pemahaman mendalam tentang hukum masih dirasa kurang di kalangan generasi muda.\n\nOleh karena itu, BEM FH UNAND berinisiatif untuk mengkampanyekan kesadaran hukum melalui media sosial agar lebih mudah dipahami oleh Gen Z."
  }
];

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('bem_news');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialNews;
  });

  useEffect(() => {
    localStorage.setItem('bem_news', JSON.stringify(news));
  }, [news]);

  const addNews = (newArticle) => {
    setNews([{ ...newArticle, id: Date.now() }, ...news]);
  };

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  const updateNews = (id, updatedArticle) => {
    setNews(news.map(item => (item.id === id ? { ...updatedArticle, id } : item)));
  };

  return (
    <NewsContext.Provider value={{ news, addNews, deleteNews, updateNews }}>
      {children}
    </NewsContext.Provider>
  );
};
