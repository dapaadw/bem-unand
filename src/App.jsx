import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Publikasi from './pages/Publikasi';
import Kegiatan from './pages/Kegiatan';
import Departemen from './pages/Departemen';
import FhGuide from './pages/FhGuide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="publikasi" element={<Publikasi />} />
          <Route path="kegiatan" element={<Kegiatan />} />
          <Route path="departemen" element={<Departemen />} />
          <Route path="fh-guide" element={<FhGuide />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
