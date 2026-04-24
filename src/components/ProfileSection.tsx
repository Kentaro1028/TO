"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import type { Member } from "@/lib/members";

const springCard = { type: "spring", stiffness: 320, damping: 26 } as const;
const springLink = { type: "spring", stiffness: 500, damping: 22 } as const;

/* ── トレーナーカード: タイプ設定 ── */
const memberStyles: Record<string, {
  typeName: string;
  typeEmoji: string;
  typeColor: string;
  typeBg: string;
  typeBorder: string;
  headerBg: string;
}> = {
  irie: {
    typeName: "WATER",
    typeEmoji: "💧",
    typeColor: "#3354CC",
    typeBg: "rgba(51,84,204,0.10)",
    typeBorder: "rgba(51,84,204,0.28)",
    headerBg: "linear-gradient(135deg, #3354CC 0%, #5B8DEF 100%)",
  },
  kuriyama: {
    typeName: "PSYCHIC / POISON",
    typeEmoji: "🔮☠️",
    typeColor: "#A040A0",
    typeBg: "rgba(160,64,160,0.10)",
    typeBorder: "rgba(160,64,160,0.28)",
    headerBg: "linear-gradient(135deg, #7038F8 0%, #A040A0 50%, #6B3070 100%)",
  },
  kageyama: {
    typeName: "DRAGON",
    typeEmoji: "🐉",
    typeColor: "#4A1FB8",
    typeBg: "rgba(112,56,248,0.10)",
    typeBorder: "rgba(112,56,248,0.28)",
    headerBg: "linear-gradient(135deg, #CC0000 0%, #7038F8 100%)",
  },
  kimura: {
    typeName: "FIGHTING",
    typeEmoji: "🥊",
    typeColor: "#C03028",
    typeBg: "rgba(192,48,40,0.10)",
    typeBorder: "rgba(192,48,40,0.28)",
    headerBg: "linear-gradient(135deg, #8B0000 0%, #C03028 100%)",
  },
  sato: {
    typeName: "GHOST",
    typeEmoji: "👻",
    typeColor: "#705898",
    typeBg: "rgba(112,88,152,0.10)",
    typeBorder: "rgba(112,88,152,0.28)",
    headerBg: "linear-gradient(135deg, #705898 0%, #9B78D8 100%)",
  },
  tatsuyama: {
    typeName: "FAIRY",
    typeEmoji: "🧚",
    typeColor: "#C4527A",
    typeBg: "rgba(196,82,122,0.10)",
    typeBorder: "rgba(196,82,122,0.28)",
    headerBg: "linear-gradient(135deg, #C4527A 0%, #EE99AC 100%)",
  },
  okada: {
    typeName: "STEEL",
    typeEmoji: "⚙️",
    typeColor: "#3A7A90",
    typeBg: "rgba(58,122,144,0.10)",
    typeBorder: "rgba(58,122,144,0.28)",
    headerBg: "linear-gradient(135deg, #2C5F72 0%, #3A7A90 100%)",
  },
};

const cardLayout = [
  { rotate: 1.2,  offsetY: 0,   ml: 0 },
  { rotate: -1.0, offsetY: -12, ml: "5%" },
  { rotate: 0.5,  offsetY: 10,  ml: "2%" },
];

function AvatarPlaceholder({ name, mStyle }: { name: string; mStyle: typeof memberStyles[string] }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold"
      style={{ background: mStyle.typeBg, color: mStyle.typeColor, border: `2px solid ${mStyle.typeBorder}` }}
    >
      {initials || <User className="w-8 h-8" />}
    </div>
  );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const layout = cardLayout[index % cardLayout.length];
  const mStyle = memberStyles[member.slug] ?? memberStyles.irie;

  return (
    <div ref={ref} className="relative" style={{ marginLeft: layout.ml }}>
      {/* ゴーストメンバー名 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        aria-hidden="true"
        className="absolute select-none pointer-events-none hidden sm:block"
        style={{
          top: "-0.4em",
          left: "-0.08em",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 8vw, 80px)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: `1px ${mStyle.typeColor}20`,
          lineHeight: 1,
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        {member.nameEn.split(" ")[1] ?? member.nameEn}
      </motion.div>

      {/* トレーナーカード */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: layout.offsetY, rotate: layout.rotate } : {}}
        whileHover={{ rotate: 0, y: layout.offsetY - 10, scale: 1.03, zIndex: 10, transition: springCard }}
        whileTap={{ scale: 0.98, transition: springCard }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#FFFFFF",
          border: `2px solid ${mStyle.typeBorder}`,
          boxShadow: `0 8px 32px ${mStyle.typeBg}, 0 2px 8px rgba(0,0,0,0.06)`,
          transformOrigin: "center bottom",
          zIndex: 1,
        }}
      >
        {/* トレーナーカードヘッダー */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: mStyle.headerBg }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            TRAINER CARD
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-bold"
            style={{
              background: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
            }}
          >
            {mStyle.typeEmoji} {mStyle.typeName}
          </span>
        </div>

        <div className="p-6 pt-10 flex flex-col flex-1">
          {/* 写真 + 名前 */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-shrink-0">
              {member.avatar ? (
                <div
                  className="w-20 h-20 rounded-full overflow-hidden"
                  style={{ border: `3px solid ${mStyle.typeColor}`, padding: 2 }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image src={member.avatar} alt={member.name} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                </div>
              ) : (
                <AvatarPlaceholder name={member.name} mStyle={mStyle} />
              )}
            </div>

            <div>
              <p
                className="text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5"
                style={{ color: mStyle.typeColor, fontFamily: "var(--font-display)" }}
              >
                {member.nameEn}
              </p>
              <h3 className="heading-ja text-2xl" style={{ color: "#17171F" }}>{member.name}</h3>
              {member.role && member.role !== "メンバー" && (
                <p className="text-xs mt-0.5" style={{ color: "#8a8a9a" }}>{member.role}</p>
              )}
            </div>
          </div>

          {/* キャッチコピー */}
          {member.catchphrase && (
            <div className="mb-4 pb-4" style={{ borderBottom: `1px solid ${mStyle.typeBg}`, borderBottomWidth: 2, borderBottomStyle: "solid" }}>
              <span
                aria-hidden="true"
                style={{ fontFamily: "Georgia, serif", fontSize: "2rem", lineHeight: 1, color: mStyle.typeColor, opacity: 0.4, display: "block", marginBottom: "-0.3rem" }}
              >
                "
              </span>
              <p className="text-sm font-medium leading-relaxed tracking-wide" style={{ color: mStyle.typeColor }}>
                {member.catchphrase}
              </p>
            </div>
          )}

          {/* タグ */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {member.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-bold"
                style={{ background: mStyle.typeBg, color: mStyle.typeColor, border: `1px solid ${mStyle.typeBorder}` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 詳細リンク */}
          <div className="mt-auto flex items-center gap-3">
            <div className="flex-1 h-[2px] rounded" style={{ background: `linear-gradient(to right, ${mStyle.typeColor}40, transparent)` }} />
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }} transition={springLink} className="flex-shrink-0">
              <Link
                href={`/members/${member.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: mStyle.typeColor, fontFamily: "var(--font-display)" }}
              >
                Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProfileSection({ members }: { members: Member[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="profile"
      className="relative py-24 lg:py-32 px-6 overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      {/* ゴースト背景 */}
      <div
        aria-hidden="true"
        className="absolute select-none pointer-events-none hidden md:block"
        style={{
          bottom: "8%",
          right: "-2%",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(60px, 12vw, 160px)",
          fontWeight: 800,
          letterSpacing: "0.15em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(204,0,0,0.05)",
          whiteSpace: "nowrap",
        }}
      >
        OUR TEAM
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-start gap-8 mb-16">
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
              003 — OUR TEAM
            </div>
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #CC0000, transparent)" }} />
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">OUR TEAM</span>
            <h2 className="heading-ja text-4xl sm:text-5xl lg:text-6xl" style={{ color: "#17171F" }}>
              変革を担う
              <br />
              <span className="gradient-text">メンバー</span>
            </h2>
            <p className="max-w-sm leading-relaxed mt-4 text-sm tracking-wide" style={{ color: "#4a4a5a" }}>
              それぞれの専門性を持ち寄り、組織変革に挑みます。
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start pb-20">
          {members.map((member, i) => (
            <MemberCard key={member.slug} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
