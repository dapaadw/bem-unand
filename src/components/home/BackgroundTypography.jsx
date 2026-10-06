export default function BackgroundTypography({
  fadeFromHero = false,
  count = null,
  columns = 3,
  columnCount,
}) {
  const isSubpage = !fadeFromHero;
  const activeColumns = columnCount ?? columns;

  const leftCounts = count
    ? [count, Math.round(count * 1.25), count]
    : isSubpage
    ? [4, 5, 4]
    : [14, 18, 14];

  const rightCounts = count
    ? [count, Math.round(count * 1.25), count]
    : isSubpage
    ? [4, 5, 4]
    : [14, 18, 14];

  const allColumnsLeft = [
    { text: 'KABINET AKSARA JUANG', count: leftCounts[0] },
    { text: 'SEMANGAT BERAKSI', count: leftCounts[1] },
    { text: 'PERJUANGKAN ASPIRASI', count: leftCounts[2] },
  ];

  const allColumnsRight = [
    { text: 'BEM FH UNAND 2026', count: rightCounts[0] },
    { text: 'AKSARA JUANG', count: rightCounts[1] },
    { text: 'SEMANGAT PERJUANGAN', count: rightCounts[2] },
  ];

  const columnsLeft =
    activeColumns === 2
      ? [allColumnsLeft[0], allColumnsLeft[1]]
      : allColumnsLeft.slice(0, activeColumns);

  const columnsRight =
    activeColumns === 2
      ? [allColumnsRight[0], allColumnsRight[2]]
      : allColumnsRight.slice(0, activeColumns);

  const maskStyle = fadeFromHero
    ? 'linear-gradient(to bottom, transparent 0px, transparent 75vh, black 100vh, black 100%)'
    : 'linear-gradient(to bottom, transparent 0px, transparent 5rem, black 14rem, black 95%, transparent 100%)';

  return (
    <div
      className="home-bg-typography hidden min-[1440px]:block absolute inset-0 pointer-events-none select-none overflow-hidden -z-10"
      style={{
        maskImage: maskStyle,
        WebkitMaskImage: maskStyle,
      }}
      aria-hidden="true"
    >
      {/* Left Margin - 3 Vertical Lines in Outer Gutters */}
      <div className="absolute top-0 bottom-0 left-3 2xl:left-7 flex gap-2.5 2xl:gap-3 py-16 pointer-events-none select-none">
        {columnsLeft.map((col, cIdx) => (
          <div
            key={`left-col-${cIdx}`}
            className="flex flex-col justify-between h-full pointer-events-none select-none"
          >
            {Array.from({ length: col.count }).map((_, idx) => (
              <span
                key={idx}
                className="text-[9px] 2xl:text-[10px] font-light uppercase tracking-[0.25em] 2xl:tracking-[0.3em] font-montserrat select-none block [writing-mode:vertical-rl] rotate-180 my-2 whitespace-nowrap shrink-0"
                style={{
                  color: 'rgba(254, 248, 249, 0.11)',
                }}
              >
                {col.text}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Right Margin - 3 Vertical Lines in Outer Gutters */}
      <div className="absolute top-0 bottom-0 right-3 2xl:right-7 flex gap-2.5 2xl:gap-3 py-16 pointer-events-none select-none">
        {columnsRight.map((col, cIdx) => (
          <div
            key={`right-col-${cIdx}`}
            className="flex flex-col justify-between h-full pointer-events-none select-none"
          >
            {Array.from({ length: col.count }).map((_, idx) => (
              <span
                key={idx}
                className="text-[9px] 2xl:text-[10px] font-light uppercase tracking-[0.25em] 2xl:tracking-[0.3em] font-montserrat select-none block [writing-mode:vertical-rl] my-2 whitespace-nowrap shrink-0"
                style={{
                  color: 'rgba(254, 248, 249, 0.11)',
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
