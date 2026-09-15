import './globals.css';
import SiteChrome from '../components/SiteChrome';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'BEM FH UNAND',
  description: 'Website resmi BEM Fakultas Hukum Universitas Andalas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden selection:bg-brand-neon selection:text-brand-dark flex flex-col">
        <SiteChrome footer={<SiteFooter />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
