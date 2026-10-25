import React from "react";
import { Composition, staticFile } from "remotion";
import { WebsiteLoader } from "./WebsiteLoader";

export const LoaderCompositions: React.FC = () => {
  return (
    <>
      <Composition
        id="WebsiteLoader"
        component={WebsiteLoader}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          logoSrc: staticFile("logo_warna.png"),
          orgLine1: "BADAN EKSEKUTIF MAHASISWA",
          orgLine2: "FAKULTAS HUKUM UNIVERSITAS ANDALAS",
          kabinetName: "KABINET AKSARA JUANG",
          tagline: "Semangat Beraksi, Perjuangkan Aspirasi",
          showProgress: true,
          showStatusText: true,
        }}
      />
      <Composition
        id="WebsiteLoaderSquare"
        component={WebsiteLoader}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          logoSrc: staticFile("logo_warna.png"),
          orgLine1: "BADAN EKSEKUTIF MAHASISWA",
          orgLine2: "FAKULTAS HUKUM UNIVERSITAS ANDALAS",
          kabinetName: "KABINET AKSARA JUANG",
          tagline: "Semangat Beraksi, Perjuangkan Aspirasi",
          showProgress: true,
          showStatusText: true,
        }}
      />
    </>
  );
};
