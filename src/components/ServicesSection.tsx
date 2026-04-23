"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Network, Compass } from "lucide-react";

const springCard = { type: "spring", stiffness: 320, damping: 26 } as const;

/* ── ポケモンタイプ風 ── */
const services = [
  {
    icon: Rocket,
    num: "01",
    typeName: "FIRE",
    typeEmoji: "🔥",
    label: "PROJECT LAUNCH",
    title: "プロジェクト\n立ち上げ支援",
    subtitle: "0 → 1 の爆発力",
    description: "アイデアを実行力へ変換。計画立案・スコープ定義・体制構築を全面サポートし、プロジェクトを最速で軌道に乗せます。",
    typeColor: "#FF6B35",
    typeBg: "rgba(255,107,53,0.10)",
    typeBorder: "rgba(255,107,53,0.30)",
    headerBg: "linear-gradient(135deg, #CC0000 0%, #FF6B35 100%)",
    tags: ["計画立案", "スコープ定義", "体制構築"],
    marginTop: 0,
    rotate: -1.4,
    offsetY: -6,
  },
  {
    icon: Network,
    num: "02",
    typeName: "ELECTRIC",
    typeEmoji: "⚡",
    label: "CROSS-ORG COORDINATION",
    title: "組織横断調整・\nツール整備",
    subtitle: "繋がりと調和",
    description: "部門の壁を越え、情報が自然に流れる組織へ。適切なツール整備と調整ハブとしての機能で、組織全体のシナジーを最大化します。",
    typeColor: "#C68A00",
    typeBg: "rgba(255,183,0,0.12)",
    typeBorder: "rgba(255,183,0,0.35)",
    headerBg: "linear-gradient(135deg, #FFB700 0%, #FFDA00 100%)",
    tags: ["情報共有", "調整ハブ", "ツール整備"],
    marginTop: 60,
    rotate: 0.8,
    offsetY: 8,
  },
  {
    icon: Compass,
    num: "03",
    typeName: "PSYCHIC",
    typeEmoji: "🔮",
    label: "STRATEGY ALIGNMENT",
    title: "経営戦略\n整合サポート",
    subtitle: "進むべき道を示す羅針盤",
    description: "現場の動きと経営ビジョンを繋ぐ翻訳者として機能。戦略説明の支援と整合性チェックで、全員が同じ方向を向いた状態を維持します。",
    typeColor: "#A040A0",
    typeBg: "rgba(160,64,160,0.10)",
    typeBorder: "rgba(160,64,160,0.30)",
    headerBg: "linear-gradient(135deg, #7038F8 0%, #A040A0 100%)",
    tags: ["戦略整合", "説明支援", "方向統一"],
    marginTop: 20,
    rotate: -0.5,
    offsetY: 2,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <div ref={ref} className="relative" style={{ marginTop: service.marginTop }}>
      {/* ウォーターマーク番号 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        aria-hidden="true"
        className="absolute select-none pointer-events-none"
        style={{
          top: "-0.5em",
          left: "-0.1em",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(60px, 10vw, 96px)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: `1.5px ${service.typeColor}30`,
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        {service.num}
      </motion.div>

      {/* カード本体: トレーディングカード風 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: service.offsetY, rotate: service.rotate } : {}}
        whileHover={{ rotate: 0, y: service.offsetY - 10, scale: 1.03, zIndex: 10, transition: springCard }}
        whileTap={{ scale: 0.98, transition: springCard }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden cursor-default"
        style={{
          background: "#FFFFFF",
          border: `2px solid ${service.typeBorder}`,
          boxShadow: `0 8px 32px ${service.typeBg}, 0 2px 8px rgba(0,0,0,0.08)`,
          transformOrigin: "center bottom",
          zIndex: 1,
        }}
      >
        {/* カードヘッダー: タイプカラー */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: service.headerBg }}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-white" />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {service.label}
            </span>
          </div>
          {/* タイプバッジ */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-bold"
            style={{
              background: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
            }}
          >
            {service.typeEmoji} {service.typeName}
          </span>
        </div>

        <div className="p-6 pt-10">
          {/* タイトル */}
          <h3 className="heading-ja text-xl leading-snug whitespace-pre-line mb-1" style={{ color: "#17171F" }}>
            {service.title}
          </h3>
          <p className="text-xs mb-1 tracking-wider" style={{ color: "#8a8a9a" }}>
            — {service.subtitle}
          </p>

          <div className="w-8 h-[2px] mb-4 mt-2" style={{ background: service.typeColor, borderRadius: 1 }} />

          <p className="text-sm leading-relaxed mb-5" style={{ color: "#4a4a5a" }}>
            {service.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-bold"
                style={{ background: service.typeBg, color: service.typeColor, border: `1px solid ${service.typeBorder}` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 px-6 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* 背景ゴースト */}
      <div
        aria-hidden="true"
        className="absolute select-none pointer-events-none hidden md:block"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 16vw, 200px)",
          fontWeight: 800,
          letterSpacing: "0.18em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(204,0,0,0.04)",
          whiteSpace: "nowrap",
        }}
      >
        SERVICES
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-start gap-8 mb-16">
          {/* 縦書きラベル */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-2 flex-shrink-0" aria-hidden="true">
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
              002 — SERVICES
            </div>
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #CC0000, transparent)" }} />
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">SERVICES</span>
            <h2 className="heading-ja text-4xl sm:text-5xl lg:text-6xl" style={{ color: "#17171F" }}>
              変革を支える
              <br />
              <span className="gradient-text">3つの柱</span>
            </h2>
            <p className="max-w-sm leading-relaxed mt-4 text-sm tracking-wide" style={{ color: "#4a4a5a" }}>
              すべてのフェーズで、あなたの隣に立ちます。
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start pb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
