import { ExternalLink, FolderOpen, FileText } from 'lucide-react';

export const metadata = {
  title: 'FH Guide | BEM FH UNAND',
  description: 'Pusat panduan dan direktori dokumen resmi BEM Fakultas Hukum Universitas Andalas.',
};

export const revalidate = 3600;

export default function FhGuidePage() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center relative overflow-hidden py-20 px-4 sm:px-6">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(188,34,68,0.25)_0%,rgba(135,24,48,0.12)_45%,transparent_75%)] pointer-events-none blur-3xl -z-0"
      />

      <div className="w-full max-w-2xl relative z-10">
        <div className="relative rounded-3xl bg-[#1a0a13]/60 border border-white/10 backdrop-blur-xl p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle inner corner glows */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-60 h-60 bg-[#9e1c38]/20 rounded-full blur-2xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 w-60 h-60 bg-brand-neon/15 rounded-full blur-2xl pointer-events-none"
          />

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            FH Guide
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
            Direktori dokumen resmi dan panduan kemahasiswaan Fakultas Hukum Universitas Andalas.
          </p>

          {/* Drive CTA Button */}
          <div className="flex justify-center items-center">
            <a
              href="https://drive.google.com/drive/folders/1QUOTO2YNmHUlfrU9h1o3rdR_oSioUNdY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#9e1c38] via-[#ba2243] to-[#c7264a] hover:from-[#ba2243] hover:to-[#d82a52] text-white font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(158,28,56,0.35)] hover:shadow-[0_12px_40px_rgba(158,28,56,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 group cursor-pointer"
            >
              <FolderOpen size={20} className="text-brand-neon group-hover:scale-110 transition-transform duration-300" />
              <span>Buka Google Drive FH Guide</span>
              <ExternalLink size={16} className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 -translate-y-0.5 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
