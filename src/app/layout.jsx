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
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-brand-dark text-brand-ivory font-sans overflow-x-hidden selection:bg-brand-neon selection:text-brand-dark flex flex-col">
        <SiteChrome footer={<SiteFooter />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
