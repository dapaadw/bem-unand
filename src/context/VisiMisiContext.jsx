import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultVisi = "Terwujudnya BEM FH UNAND sebagai episentrum pergerakan dan advokasi yang progresif, inklusif, responsif, dan berintegritas demi terwujudnya keadilan sosial serta kemaslahatan mahasiswa dan masyarakat.";

const defaultMisi = [
  "Mengoptimalkan fungsi advokasi dan pelayanan mahasiswa yang responsif, solutif, dan berpihak pada kesejahteraan civitas akademika.",
  "Menumbuhkan budaya intelektual kritis, riset hukum strategis, dan pengawalan kebijakan publik yang konstruktif.",
  "Mempererat sinergi, kolaborasi, dan harmonisasi antar kelembagaan di lingkungan FH UNAND maupun eksternal kampus.",
  "Mengembangkan potensi kepemimpinan, minat bakat, dan karakter mahasiswa yang berintegritas dan berwawasan luas.",
  "Menghadirkan aksi nyata dan pengabdian masyarakat yang solutif serta berdampak bagi lingkungan sekitar."
];

export const VisiMisiContext = createContext();

export const VisiMisiProvider = ({ children }) => {
  const [visi, setVisi] = useState(() => {
    const savedVisi = localStorage.getItem('bem_visi');
    return savedVisi !== null ? savedVisi : defaultVisi;
  });

  const [misi, setMisi] = useState(() => {
    const savedMisi = localStorage.getItem('bem_misi');
    if (savedMisi) {
      try {
        return JSON.parse(savedMisi);
      } catch (err) {
        console.error("Failed to parse saved misi:", err);
      }
    }
    return defaultMisi;
  });

  useEffect(() => {
    localStorage.setItem('bem_visi', visi);
  }, [visi]);

  useEffect(() => {
    localStorage.setItem('bem_misi', JSON.stringify(misi));
  }, [misi]);

  const saveVisiMisi = (newVisi, newMisi) => {
    setVisi(newVisi);
    setMisi(newMisi);
  };

  const resetToDefault = () => {
    setVisi(defaultVisi);
    setMisi(defaultMisi);
  };

  return (
    <VisiMisiContext.Provider value={{ visi, misi, saveVisiMisi, resetToDefault, defaultVisi, defaultMisi }}>
      {children}
    </VisiMisiContext.Provider>
  );
};

export const useVisiMisi = () => {
  const context = useContext(VisiMisiContext);
  if (!context) {
    throw new Error('useVisiMisi must be used within a VisiMisiProvider');
  }
  return context;
};

