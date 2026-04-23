"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const springBtn = { type: "spring", stiffness: 500, damping: 22 } as const;

const MESH = [
  "radial-gradient(ellipse 65% 55% at  8% 18%, rgba(204,0,0,0.07) 0%, transparent 100%)",
  "radial-gradient(ellipse 50% 65% at 92%  8%, rgba(255,183,0,0.08) 0%, transparent 100%)",
  "radial-gradient(ellipse 55% 45% at 78% 82%, rgba(51,84,204,0.06) 0%, transparent 100%)",
  "radial-gradient(ellipse 40% 55% at 12% 88%, rgba(204,0,0,0.04) 0%, transparent 100%)",
  "#FFFEF2",
].join(", ");

/* ─── ポケボールSVGコンポーネント ─── */
function Pokeball({
  size = 120,
  opacity = 0.12,
  spinning = false,
}: {
  size?: number;
  opacity?: number;
  spinning?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        opacity,
        animation: spinning ? "pokeball-spin 8s linear infinite" : "none",
      }}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="#CC0000" strokeWidth="3.5" />
      <path d="M 3 50 A 47 47 0 0 1 97 50 Z" fill="#CC0000" />
      <path d="M 3 50 A 47 47 0 0 0 97 50 Z" fill="white" />
      <line x1="3" y1="50" x2="97" y2="50" stroke="#17171F" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="13" fill="white" stroke="#17171F" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="5.5" fill="#FFFEF2" />
    </svg>
  );
}

/* ─── 星デコ ─── */
function Stars() {
  const stars = [
    { x: "8%",  y: "22%", delay: 0,    size: 14 },
    { x: "85%", y: "15%", delay: 0.4,  size: 10 },
    { x: "92%", y: "55%", delay: 0.8,  size: 8 },
    { x: "5%",  y: "72%", delay: 1.2,  size: 12 },
    { x: "60%", y: "88%", delay: 0.6,  size: 9 },
    { x: "40%", y: "10%", delay: 1.0,  size: 7 },
  ];
  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: s.x,
            top: s.y,
            fontSize: s.size,
            animation: `twinkle ${2 + i * 0.4}s ease-in-out ${s.delay}s infinite`,
            color: i % 3 === 0 ? "#CC0000" : i % 3 === 1 ? "#FFB700" : "#3354CC",
          }}
        >
          ★
        </div>
      ))}
    </>
  );
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: MESH }}
    >
      <Stars />

      {/* ── 巨大ポケボール: 右奥のデザインパーツ ── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ right: "-8%", top: "50%", transform: "translateY(-50%)" }}
      >
        <Pokeball size={560} opacity={0.07} spinning />
      </div>

      {/* ── 縦書きサイドラベル (左端) ── */}
      <div
        aria-hidden="true"
        className="absolute left-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <div
          style={{
            writingMode: "vertical-rl",
            fontFamily: "var(--font-display)",
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.28em",
            color: "#8a8a9a",
          }}
        >
          TRANSFORMATION · OFFICE
        </div>
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, #CC0000, transparent)" }} />
      </div>

      {/* ── 右上: EST.ラベル ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-20 right-6 hidden sm:flex flex-col items-end gap-1"
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.22em", color: "#8a8a9a" }}>
          EST. 2024
        </span>
        <div className="w-12 h-px" style={{ background: "#CC0000", opacity: 0.5 }} />
      </motion.div>

      {/* ── メインコンテンツ ── */}
      <div className="relative z-10 w-full pl-12 md:pl-24 lg:pl-32 pr-6 pt-[60px]">
        {/* 通し番号 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex items-center gap-4"
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.28em", color: "#CC0000" }}>
            001
          </span>
          <div className="flex-1 max-w-[80px] h-px" style={{ background: "linear-gradient(to right, #CC0000, transparent)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.22em", color: "#8a8a9a" }}>
            HERO
          </span>
        </motion.div>

        {/* キャッチコピー3行 */}
        <div className="mb-6 space-y-1">
          {["組織の壁を、乗り越えたい。", "変革を、もっとスピーディに。", "経営と現場を、ひとつにしたい。"].map((phrase, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="text-sm sm:text-base font-medium tracking-wide"
              style={{ color: "#4a4a5a", paddingLeft: `${i * 20}px` }}
            >
              {phrase}
            </motion.p>
          ))}
        </div>

        {/* メイン見出し */}
        <div className="mb-8 overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h1 className="heading-ja leading-none" style={{ fontSize: "clamp(64px, 12vw, 160px)" }}>
              <span className="gradient-text block">変革を、</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-baseline gap-4 md:gap-8 flex-wrap"
          >
            <h1 className="heading-ja leading-none" style={{ fontSize: "clamp(64px, 12vw, 160px)", color: "#17171F" }}>
              日常に。
            </h1>
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(11px, 1.2vw, 16px)",
                fontWeight: 800,
                color: "transparent",
                WebkitTextStroke: "1px #CC0000",
                letterSpacing: "0.15em",
                alignSelf: "flex-end",
                paddingBottom: "0.15em",
                display: "block",
                opacity: 0.5,
              }}
            >
              TRANSFORMATION<br />OFFICE
            </span>
          </motion.div>
        </div>

        {/* 説明文 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base leading-relaxed mb-10 tracking-wide max-w-md"
          style={{ color: "#4a4a5a", marginLeft: "clamp(0px, 6vw, 80px)" }}
        >
          プロジェクトの立ち上げから経営戦略の整合まで、
          組織変革のすべてのフェーズに伴走します。
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={springBtn}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold tracking-wider"
            style={{
              background: "#CC0000",
              color: "white",
              boxShadow: "0 6px 24px rgba(204,0,0,0.28)",
            }}
          >
            役割を見る
          </motion.a>
          <motion.a
            href="#profile"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={springBtn}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold tracking-wider"
            style={{
              background: "transparent",
              border: "2px solid #17171F",
              color: "#17171F",
            }}
          >
            メンバーを見る
          </motion.a>

          {/* アクセントライン */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-8 h-px" style={{ background: "#FFB700", opacity: 0.7 }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFB700" }} />
          </div>
        </motion.div>
      </div>

      {/* 左下コピーライト */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-12 md:left-24 lg:left-32"
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.25em", color: "#8a8a9a" }}>
          © 変革オフィス
        </span>
      </motion.div>

      {/* 右下スクロール */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-6"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
          style={{ color: "#8a8a9a" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.3em" }}>SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>

      {/* ポケモンレッドアクセント線（上端） */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #CC0000 0%, #FF6B35 40%, #FFB700 70%, #3354CC 100%)" }}
      />
    </section>
  );
}
