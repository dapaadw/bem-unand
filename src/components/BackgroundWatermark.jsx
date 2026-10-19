'use client';

// Watermark coordinates matching Figma node 149:4504 "Background logo putih "
// Color: #7C1D2B (R: 124, G: 29, B: 43)
// Exact Figma rotations (-16.33deg and -343.67deg), no horizontal flips!

const homeWatermarks = [
  { left: 984, top: 766, deg: -16.33 },
  { left: -358, top: 766, deg: -343.67 },
  { left: 193, top: 1124, deg: -343.67 },
  { left: 659, top: 1674, deg: -343.67 },
  { left: -254, top: 1825, deg: -343.67 },
  { left: 857, top: 2452, deg: -16.33 },
  { left: -286, top: 2885, deg: -343.67 },
  { left: 524, top: 3034, deg: -343.67 },
  { left: -45, top: 3550, deg: -16.33 },
  { left: 881, top: 3697, deg: -343.67 },
  { left: -212, top: 4231, deg: -343.67 },
  { left: 759, top: 4590, deg: -16.33 },
];

const subpageWatermarks = [
  { left: 984, top: 160, deg: -16.33 },
  { left: -358, top: 160, deg: -343.67 },
  { left: 193, top: 520, deg: -343.67 },
  { left: 659, top: 1070, deg: -343.67 },
  { left: -254, top: 1220, deg: -343.67 },
  { left: 857, top: 1850, deg: -16.33 },
  { left: -286, top: 2280, deg: -343.67 },
  { left: 524, top: 2430, deg: -343.67 },
  { left: -45, top: 2950, deg: -16.33 },
  { left: 881, top: 3100, deg: -343.67 },
  { left: -212, top: 3630, deg: -343.67 },
  { left: 759, top: 3990, deg: -16.33 },
  { left: -358, top: 4500, deg: -343.67 },
  { left: 984, top: 4500, deg: -16.33 },
];

export default function BackgroundWatermark({ isHome = false }) {
  const items = isHome ? homeWatermarks : subpageWatermarks;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
    >
      <div className="relative max-w-[1280px] mx-auto h-full min-h-screen">
        {items.map((item, idx) => (
          <img
            key={idx}
            src="/ornament-maroon.png"
            alt=""
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
              transform: `rotate(${item.deg}deg)`,
            }}
            className="absolute w-[651px] h-[687px] max-w-none object-contain opacity-[0.80] mix-blend-screen pointer-events-none select-none"
          />
        ))}
      </div>
    </div>
  );
}
