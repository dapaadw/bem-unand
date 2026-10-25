'use client';

function MemberCard({ member }) {
  if (!member) return null;

  return (
    <div className="flex flex-col items-center text-center group w-full max-w-[240px] mx-auto">
      {/* JABATAN (Above Photo) */}
      <span className="text-[11px] sm:text-xs font-bold text-brand-neon uppercase tracking-wide text-center leading-snug mb-2.5 min-h-[32px] flex items-center justify-center">
        {member.role}
      </span>

      {/* Circular Avatar Frame */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-[#3a0d18] to-[#17040a] border-2 border-white/20 group-hover:border-brand-neon group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(254,174,174,0.3)] transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden shrink-0 relative">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-brand-red/30 flex items-center justify-center text-brand-neon font-bold text-xl">
            {member.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* NAMA (Below Photo) */}
      <p className="mt-3 text-xs sm:text-sm md:text-[15px] font-semibold text-white group-hover:text-brand-neon transition-colors leading-snug">
        {member.name}
      </p>
    </div>
  );
}

// Partition staff list into columnar groups matching the PDF wireframe
export default function StrukturDBKL({ staff = [], _deptName = '' }) {
  if (!staff || staff.length === 0) return null;

  const total = staff.length;
  const remainder = total % 3;
  const fullCount = total - remainder;
  const regularItems = staff.slice(0, fullCount);
  const remainderItems = staff.slice(fullCount);

  return (
    <section className="mt-16 sm:mt-24 pt-12 border-t border-white/10">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
          STRUKTUR DBKL
        </h2>
        <div className="w-16 h-1 bg-brand-neon/80 mx-auto mt-4 rounded-full" />
      </div>

      {/* Symmetric 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto items-start">
        {/* Full Rows (Multiples of 3) */}
        {regularItems.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}

        {/* Final Row: 1 Item Remainder (e.g. Total 10, 7, 4, 1) -> Centered in Middle */}
        {remainder === 1 && (
          <div className="col-span-1 md:col-span-3 flex justify-center">
            <MemberCard member={remainderItems[0]} />
          </div>
        )}

        {/* Final Row: 2 Items Remainder (e.g. Total 11, 8, 5, 2) -> 2 Centered Side-by-Side */}
        {remainder === 2 && (
          <div className="col-span-1 md:col-span-3 flex flex-wrap justify-center gap-8 sm:gap-10">
            <MemberCard member={remainderItems[0]} />
            <MemberCard member={remainderItems[1]} />
          </div>
        )}
      </div>
    </section>
  );
}
