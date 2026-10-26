import {
  ExternalLink,
} from 'lucide-react';

export const metadata = {
  title: 'Pusat Aspirasi & Survei Mahasiswa | BEM FH UNAND',
  description:
    'Salurkan suara, keluhan, masukan, dan evaluasi kepuasan mahasiswa Fakultas Hukum Universitas Andalas secara langsung dan transparan.',
};

export const revalidate = 3600;

const ASPIRASI_CHANNELS = [
  {
    id: 'suarakan',
    title: 'Suarakan FHUA',
    description:
      'Sampaikan aspirasi, kritik, saran atau keluhan.',
    targetUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeX1iLz4N_GE0IjlXTLkip6oIacd-2-Qk1fnD4WQqvVzV8jGA/viewform?pli=1',
    buttonText: 'Isi Formulir',
  },
  {
    id: 'skm',
    title: 'Survey Kepuasan Mahasiswa (SKM)',
    description:
      'Penilaian kinerja & evaluasi akademik, fasilitas/kebijakan fakultas.',
    targetUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSerBDBbqYrsQYuaBI5g2-dRpmagrXMhuQvfYh8izQpF8YcbpQ/viewform',
    buttonText: 'Isi Formulir',
  },
];

export default function AspirasiHubPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="px-6 pt-32 sm:pt-36 pb-24 container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <header className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Aspirasi
          </h1>
        </header>

        {/* 2-Column Cards Grid */}
        <section
          aria-label="Daftar Saluran Aspirasi dan Survei"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        >
          {ASPIRASI_CHANNELS.map((channel) => {
            const Icon = channel.icon;

            return (
              <article
                key={channel.id}
                className="group relative rounded-3xl bg-[#1a0a13]/60 hover:bg-[#23121b]/80 border border-white/10 hover:border-brand-neon p-7 sm:p-9 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(254,174,174,0.18)] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  {/* Channel Title & Description */}
                  <div className="space-y-2.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-neon transition-colors">
                      {channel.title}
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={channel.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-crimson hover:bg-brand-crimson-hover text-brand-ivory border border-brand-crimson-hover font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(232,196,194,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
                  >
                    <span>{channel.buttonText}</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </div>
  );
}
