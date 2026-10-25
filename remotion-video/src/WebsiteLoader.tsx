import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type WebsiteLoaderProps = {
  readonly logoSrc?: string;
  readonly orgLine1?: string;
  readonly orgLine2?: string;
  readonly kabinetName?: string;
  readonly tagline?: string;
  readonly showProgress?: boolean;
  readonly showStatusText?: boolean;
};

export const WebsiteLoader: React.FC<WebsiteLoaderProps> = ({
  logoSrc = staticFile("logo_warna.png"),
  orgLine1 = "BADAN EKSEKUTIF MAHASISWA",
  orgLine2 = "FAKULTAS HUKUM UNIVERSITAS ANDALAS",
  kabinetName = "KABINET AKSARA JUANG",
  tagline = "Semangat Beraksi, Perjuangkan Aspirasi",
  showProgress = true,
  showStatusText = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Master fade-out at the end (transition into website)
  const masterOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Background subtle pulse
  const bgGlowScale = interpolate(frame, [0, 45, 90, 120], [0.85, 1.15, 1.05, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bgGlowOpacity = interpolate(
    frame,
    [0, 25, 80, 110],
    [0.15, 0.45, 0.35, 0.5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Precision calibration ring rotation & entry
  const ringRotation = interpolate(frame, [0, 120], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ringOpacity = interpolate(frame, [5, 30], [0, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Corner marks opacity
  const cornerOpacity = interpolate(frame, [10, 35], [0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo Animation
  const logoOpacity = interpolate(frame, [6, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [6, 36], [0.8, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Gentle float / breathing after landing
  const logoFloat =
    frame > 36
      ? Math.sin(((frame - 36) / (fps * 2)) * Math.PI * 2) * 3
      : 0;

  // Crest glow behind logo
  const crestGlowOpacity = interpolate(frame, [15, 36, 92], [0, 0.6, 0.38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Typography stagger: Org Title
  const orgTitleOpacity = interpolate(frame, [20, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orgTitleY = interpolate(frame, [20, 42], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Typography stagger: Kabinet Name
  const kabinetOpacity = interpolate(frame, [30, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kabinetY = interpolate(frame, [30, 52], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [38, 58], [0, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Progress Bar & Percentage calculation
  // Progress goes from 0 to 100 across frames 16 to 94
  const progressPercent = Math.round(
    interpolate(frame, [16, 94], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 0.1, 0.22, 1),
    })
  );

  const progressOpacity = interpolate(frame, [18, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic Status Messages
  let statusText = "MENGHUBUNGKAN SISTEM...";
  if (frame >= 35 && frame < 65) {
    statusText = "MEMUAT KABINET AKSARA JUANG...";
  } else if (frame >= 65 && frame < 94) {
    statusText = "MENYIAPKAN PORTAL RESMI...";
  } else if (frame >= 94) {
    statusText = "SISTEM SIAP";
  }

  // Completion flash at 100%
  const completeFlash = interpolate(frame, [94, 98, 106], [0, 0.65, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isSquare = width === height;
  const logoDimension = isSquare ? 160 : 210;
  const progressBarWidth = isSquare ? 290 : 330;
  const ringSize = isSquare ? 450 : 540;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#140101",
        color: "#f7f2e3",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: masterOpacity,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 1. Ambient Background Radial Glows */}
      <div
        style={{
          position: "absolute",
          width: isSquare ? "120%" : "65vw",
          height: isSquare ? "120%" : "65vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(148, 27, 8, 0.38) 0%, rgba(99, 22, 10, 0.16) 45%, rgba(20, 1, 1, 0) 75%)",
          opacity: bgGlowOpacity,
          scale: `${bgGlowScale}`,
          pointerEvents: "none",
        }}
      />

      {/* 2. Institutional Calibration Rings (Delicate subtle rotation) */}
      <svg
        style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          rotate: `${ringRotation}deg`,
          opacity: ringOpacity,
          pointerEvents: "none",
        }}
        viewBox="0 0 540 540"
      >
        <circle
          cx="270"
          cy="270"
          r="250"
          fill="none"
          stroke="#f7f2e3"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
        <circle
          cx="270"
          cy="270"
          r="234"
          fill="none"
          stroke="#941b08"
          strokeWidth="1.5"
          strokeDasharray="45 180"
        />
        <circle
          cx="270"
          cy="270"
          r="218"
          fill="none"
          stroke="#f7f2e3"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
      </svg>

      {/* 3. Four Corner Aesthetic Reticles (Institutional / Modern Precision) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 48,
          opacity: cornerOpacity,
          display: "flex",
          gap: 10,
          alignItems: "center",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2.5,
          color: "#c9b8b5",
        }}
      >
        <div style={{ width: 16, height: 1.5, backgroundColor: "#c9b8b5" }} />
        <span>BEM KM FH UNAND</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 40,
          right: 48,
          opacity: cornerOpacity,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2.5,
          color: "#c9b8b5",
        }}
      >
        <span>PORTAL RESMI</span>
        <div
          style={{
            display: "inline-block",
            marginLeft: 10,
            width: 16,
            height: 1.5,
            backgroundColor: "#c9b8b5",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          opacity: cornerOpacity,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: 1.8,
          color: "#c9b8b5",
        }}
      >
        <span>EST. KM FH UNAND</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 48,
          opacity: cornerOpacity,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: 1.8,
          color: "#c9b8b5",
        }}
      >
        <span>PADANG, SUMATERA BARAT</span>
      </div>

      {/* 4. Main Central Content Column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          maxWidth: 780,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Emblem Container with Subtle Aura Glow */}
        <div
          style={{
            position: "relative",
            width: logoDimension,
            height: logoDimension,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: isSquare ? 22 : 30,
            scale: `${logoScale}`,
            translate: `0px ${logoFloat}px`,
            opacity: logoOpacity,
          }}
        >
          {/* Circular Aura Glow behind emblem */}
          <div
            style={{
              position: "absolute",
              width: logoDimension * 1.35,
              height: logoDimension * 1.35,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(148, 27, 8, 0.65) 0%, rgba(254, 174, 174, 0.18) 40%, rgba(20, 1, 1, 0) 70%)",
              opacity: crestGlowOpacity,
              filter: "blur(16px)",
              pointerEvents: "none",
            }}
          />

          {/* Logo Image */}
          <Img
            src={logoSrc}
            alt="Logo BEM KM FH UNAND"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 12px 28px rgba(0, 0, 0, 0.7))",
            }}
          />
        </div>

        {/* Institutional Title */}
        <div
          style={{
            opacity: orgTitleOpacity,
            translate: `0px ${orgTitleY}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isSquare ? 12 : 14,
              fontWeight: 700,
              letterSpacing: isSquare ? 3.5 : 5,
              color: "#c9b8b5",
              textTransform: "uppercase",
            }}
          >
            {orgLine1}
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isSquare ? 14 : 17,
              fontWeight: 800,
              letterSpacing: isSquare ? 2.5 : 3.5,
              color: "#f7f2e3",
              textTransform: "uppercase",
            }}
          >
            {orgLine2}
          </span>
        </div>

        {/* Kabinet Name Badge & Accent */}
        <div
          style={{
            opacity: kabinetOpacity,
            translate: `0px ${kabinetY}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginBottom: isSquare ? 24 : 32,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "5px 16px",
              borderRadius: 4,
              backgroundColor: "rgba(61, 9, 5, 0.8)",
              border: "1px solid rgba(79, 20, 8, 0.85)",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#FEAEAE",
                boxShadow: "0 0 8px #FEAEAE",
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isSquare ? 12 : 13.5,
                fontWeight: 700,
                letterSpacing: 2.5,
                color: "#FEAEAE",
                textTransform: "uppercase",
              }}
            >
              {kabinetName}
            </span>
          </div>

          {/* Tagline */}
          <span
            style={{
              opacity: taglineOpacity,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: "italic",
              fontSize: isSquare ? 11.5 : 13,
              fontWeight: 400,
              color: "#c9b8b5",
              letterSpacing: 0.6,
            }}
          >
            &ldquo;{tagline}&rdquo;
          </span>
        </div>

        {/* 5. Sleek Progress Bar Indicator */}
        {showProgress && (
          <div
            style={{
              opacity: progressOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: progressBarWidth,
            }}
          >
            {/* Progress Track */}
            <div
              style={{
                width: "100%",
                height: 3,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* Progress Fill */}
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #63160a 0%, #941b08 55%, #FEAEAE 100%)",
                  borderRadius: 2,
                  boxShadow:
                    completeFlash > 0
                      ? `0 0 18px rgba(254, 174, 174, ${completeFlash})`
                      : "0 0 10px rgba(148, 27, 8, 0.6)",
                }}
              />
            </div>

            {/* Bottom Meta Row: Status Text & Counter */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: 10,
                fontSize: 10.5,
                letterSpacing: 1.5,
                fontFamily: "'Montserrat', sans-serif",
                color: "#c9b8b5",
              }}
            >
              {showStatusText && (
                <span
                  style={{
                    color: progressPercent === 100 ? "#FEAEAE" : "#c9b8b5",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: isSquare ? 1 : 1.2,
                    fontSize: isSquare ? 9.5 : 10.5,
                    whiteSpace: "nowrap",
                  }}
                >
                  {statusText}
                </span>
              )}
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 700,
                  color: progressPercent === 100 ? "#f7f2e3" : "#c9b8b5",
                }}
              >
                {progressPercent.toString().padStart(2, "0")}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Completion Flash Overlay */}
      {completeFlash > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FEAEAE",
            opacity: completeFlash * 0.15,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
