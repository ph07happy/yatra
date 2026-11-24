import React from 'react';

/**
 * CelestialBackground Component
 * Renders the Sun, Moon, and multi-layered mountain silhouette
 * synchronized to the 23-second Day (11s) & Night (12s) cycle.
 */
export default function CelestialBackground() {
  return (
    <>
      {/* Glowing Day Sun (Active during 11s Day Phase) */}
      <div className="sun" aria-hidden="true"></div>

      {/* Crescent Night Moon (Active during 12s Night Phase) */}
      <div className="moon" aria-hidden="true"></div>

      {/* Multi-layered Mountain Silhouette at Base of Hero */}
      <svg
        className="mountains"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Far Ridge - Dynamically lit across 23s cycle */}
        <path
          className="ridge-far"
          fill="#5b3a86"
          opacity="0.75"
          d="M0 150 L140 70 L250 130 L380 40 L520 140 L640 80 L780 150 L930 50 L1070 135 L1200 75 L1330 130 L1440 90 V220 H0Z"
        />

        {/* Near Ridge - Dynamically lit across 23s cycle */}
        <path
          className="ridge-near"
          fill="#2f2d6b"
          d="M0 190 L160 120 L300 175 L460 105 L620 180 L760 130 L920 185 L1080 115 L1240 180 L1440 130 V220 H0Z"
        />

        {/* Mist Base - Seamlessly blends into page body background */}
        <path
          fill="#f7f5fb"
          d="M0 215 L200 170 L420 205 L640 175 L860 208 L1100 172 L1300 205 L1440 185 V220 H0Z"
        />
      </svg>
    </>
  );
}
