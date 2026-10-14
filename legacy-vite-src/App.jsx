import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context
import { NewsProvider } from './context/NewsContext';

// Components
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Publikasi from './pages/Publikasi';
import PublikasiDetail from './pages/PublikasiDetail';
import Kegiatan from './pages/Kegiatan';
import KegiatanDetail from './pages/KegiatanDetail';
import Departemen from './pages/Departemen';
import DepartemenDetail from './pages/DepartemenDetail';
import FhGuide from './pages/FhGuide';
import Aspirasi from './pages/Aspirasi';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import NewsManager from './pages/admin/NewsManager';

function App() {
  return (
    <NewsProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="publikasi" element={<Publikasi />} />
            <Route path="publikasi/:id" element={<PublikasiDetail />} />
            <Route path="kegiatan" element={<Kegiatan />} />
            <Route path="kegiatan/:id" element={<KegiatanDetail />} />
            <Route path="departemen" element={<Departemen />} />
            <Route path="departemen/:id" element={<DepartemenDetail />} />
            <Route path="fh-guide" element={<FhGuide />} />
            <Route path="aspirasi" element={<Aspirasi />} />
            <Route path="*" element={<Home />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="news" element={<NewsManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NewsProvider>
  );
}

export default App;
