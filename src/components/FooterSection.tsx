"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── ポケボール ─── */
function Pokeball({ size = 80, opacity = 0.12 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
      <circle cx="50" cy="50" r="47" fill="none" stroke="#CC0000" strokeWidth="3.5" />
      <path d="M 3 50 A 47 47 0 0 1 97 50 Z" fill="#CC0000" />
      <path d="M 3 50 A 47 47 0 0 0 97 50 Z" fill="white" />
      <line x1="3" y1="50" x2="97" y2="50" stroke="#17171F" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="13" fill="white" stroke="#17171F" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="5.5" fill="#FFFEF2" />
    </svg>
  );
}

export default function FooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#1a1a2e", borderTop: "4px solid #CC0000" }}
    >
      {/* ── 画面からはみ出す巨大タイポ ── */}
      <div
        aria-hidden="true"
        className="absolute select-none pointer-events-none"
        style={{
          bottom: "-0.2em",
          left: "-0.04em",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 20vw, 260px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(204,0,0,0.12)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        TRANSFORMATION
      </div>

      {/* ポケボール装飾 */}
      <div className="absolute top-8 right-8 opacity-20">
        <Pokeball size={120} />
      </div>
      <div className="absolute bottom-8 right-32 opacity-10">
        <Pokeball size={60} />
      </div>

      {/* 星デコ */}
      {["★", "★", "★", "★"].map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute select-none pointer-events-none text-sm"
          style={{
            left: `${20 + i * 22}%`,
            top: `${20 + (i % 2) * 40}%`,
            animation: `twinkle ${2 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
            color: ["#CC0000", "#FFB700", "#3354CC", "#FF6B35"][i],
          }}
        >
          {s}
        </div>
      ))}

      <div ref={ref} className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* セクション通し番号 */}
          <div className="flex items-center gap-4 mb-10">
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.28em", color: "#CC0000" }}>
              004
            </span>
            <div className="w-16 h-px" style={{ background: "linear-gradient(to right, #CC0000, transparent)" }} />
            <div className="flex gap-1">
              {["#CC0000", "#FFB700", "#3354CC"].map((c, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ width: 6, height: 6, background: c }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* メインコピー */}
          <div className="mb-8">
            <h2
              className="heading-ja block leading-none"
              style={{ fontSize: "clamp(36px, 7vw, 88px)", color: "#FFFEF2", letterSpacing: "0.04em" }}
            >
              変革の波に、
            </h2>
            <h2
              className="heading-ja block leading-none"
              style={{ fontSize: "clamp(36px, 7vw, 88px)", letterSpacing: "0.08em", marginLeft: "clamp(0px, 4vw, 48px)" }}
            >
              <span className="gradient-text">乗り遅れるな。</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed tracking-wide max-w-xs" style={{ color: "rgba(255,254,242,0.5)", marginLeft: "clamp(0px, 2vw, 24px)" }}>
            変革オフィスは、あなたの組織が次のステージへ踏み出す
            その第一歩を全力でサポートします。
          </p>
        </motion.div>
      </div>

      {/* ボトムバー */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            {/* ミニポケボール */}
            <div className="relative w-7 h-7 flex-shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#CC0000" strokeWidth="3" />
                <path d="M 2 20 A 18 18 0 0 1 38 20 Z" fill="#CC0000" />
                <path d="M 2 20 A 18 18 0 0 0 38 20 Z" fill="rgba(255,255,255,0.15)" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.22em", color: "rgba(255,254,242,0.4)" }}>
              TRANSFORMATION OFFICE
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.18em", color: "rgba(255,254,242,0.3)" }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
