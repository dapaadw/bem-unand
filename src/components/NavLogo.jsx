import Image from 'next/image';

export default function NavbarLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Container untuk Logo */}
      <div className="relative w-8 h-8">
        <Image 
          src="/public/logo_warna.png" // Ganti dengan path file logo Anda di folder /public
          alt="Logo BEM FH UNAND"
          fill
          className="object-contain"
        />
      </div>

      {/* Tulisan BEM FH UNAND */}
      <span className="font-semibold text-white tracking-wide">
        BEM FH UNAND
      </span>
    </div>
  );
}