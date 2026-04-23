"use client";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay fixed inset-0 pointer-events-none z-[9998] w-full h-full"
      style={{
        opacity: 0.018,
        mixBlendMode: "multiply",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundSize: "220px 220px",
      }}
    />
  );
}
