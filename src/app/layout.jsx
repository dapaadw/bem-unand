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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden selection:bg-brand-neon selection:text-brand-dark flex flex-col">
        <SiteChrome footer={<SiteFooter />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
