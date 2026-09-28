export default function BackgroundTypography() {
  const columnsLeft = [
    { text: 'KABINET AKSARA JUANG', count: 14 },
    { text: 'SEMANGAT BERAKSI', count: 18 },
    { text: 'PERJUANGKAN ASPIRASI', count: 14 },
  ];

  const columnsRight = [
    { text: 'BEM FH UNAND 2026', count: 14 },
    { text: 'AKSARA JUANG', count: 18 },
    { text: 'SEMANGAT PERJUANGAN', count: 14 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 4%, black 10%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 4%, black 10%, black 100%)',
      }}
      aria-hidden="true"
    >
      {/* Left Margin - 3 Vertical Lines */}
      <div className="absolute top-0 bottom-0 left-1 sm:left-3 md:left-5 lg:left-8 flex gap-2 sm:gap-3 md:gap-4 lg:gap-3 py-16 pointer-events-none select-none">
        {columnsLeft.map((col, cIdx) => (
          <div
            key={`left-col-${cIdx}`}
            className="flex flex-col justify-between h-full pointer-events-none select-none"
          >
            {Array.from({ length: col.count }).map((_, idx) => (
              <span
                key={idx}
                className="text-[9px] sm:text-[10px] md:text-xs font-light uppercase tracking-[0.25em] sm:tracking-[0.3em] font-montserrat select-none block [writing-mode:vertical-rl] rotate-180 my-2 sm:my-3"
                style={{
                  color: 'rgba(254, 248, 249, 0.12)',
                }}
              >
                {col.text}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Right Margin - 3 Vertical Lines */}
      <div className="absolute top-0 bottom-0 right-1 sm:right-3 md:right-5 lg:right-8 flex gap-2 sm:gap-3 md:gap-4 lg:gap-3 py-16 pointer-events-none select-none">
        {columnsRight.map((col, cIdx) => (
          <div
            key={`right-col-${cIdx}`}
            className="flex flex-col justify-between h-full pointer-events-none select-none"
          >
            {Array.from({ length: col.count }).map((_, idx) => (
              <span
                key={idx}
                className="text-[9px] sm:text-[10px] md:text-xs font-light uppercase tracking-[0.25em] sm:tracking-[0.3em] font-montserrat select-none block [writing-mode:vertical-rl] my-2 sm:my-3"
                style={{
                  color: 'rgba(254, 248, 249, 0.12)',
                }}
              >
                {col.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
