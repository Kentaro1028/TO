"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, User } from "lucide-react";
import type { Member } from "@/lib/members";

const springBack = { type: "spring", stiffness: 460, damping: 24 } as const;

function AvatarPlaceholder({ name, mStyle }: { name: string; mStyle: typeof memberDetailStyles[string] }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div
      className="w-32 h-32 rounded-2xl flex items-center justify-center text-3xl font-bold"
      style={{ background: mStyle.typeBg, color: mStyle.typeColor, border: `2px solid ${mStyle.typeBorder}` }}
    >
      {initials || <User className="w-12 h-12" />}
    </div>
  );
}

/* ── ポケボール ── */
function Pokeball({ size = 80, opacity = 0.10 }: { size?: number; opacity?: number }) {
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

const memberDetailStyles: Record<string, {
  typeName: string;
  typeEmoji: string;
  typeColor: string;
  typeBg: string;
  typeBorder: string;
  headerBg: string;
}> = {
  irie: {
    typeName: "WATER",    typeEmoji: "💧",
    typeColor: "#3354CC", typeBg: "rgba(51,84,204,0.10)",
    typeBorder: "rgba(51,84,204,0.28)",
    headerBg: "linear-gradient(135deg, #3354CC 0%, #5B8DEF 100%)",
  },
  kuriyama: {
    typeName: "PSYCHIC",  typeEmoji: "🔮",
    typeColor: "#A040A0", typeBg: "rgba(160,64,160,0.10)",
    typeBorder: "rgba(160,64,160,0.28)",
    headerBg: "linear-gradient(135deg, #7038F8 0%, #A040A0 100%)",
  },
  kageyama: {
    typeName: "DRAGON",   typeEmoji: "🐉",
    typeColor: "#4A1FB8", typeBg: "rgba(112,56,248,0.10)",
    typeBorder: "rgba(112,56,248,0.28)",
    headerBg: "linear-gradient(135deg, #CC0000 0%, #7038F8 100%)",
  },
  kimura: {
    typeName: "FIGHTING", typeEmoji: "🥊",
    typeColor: "#C03028", typeBg: "rgba(192,48,40,0.10)",
    typeBorder: "rgba(192,48,40,0.28)",
    headerBg: "linear-gradient(135deg, #8B0000 0%, #C03028 100%)",
  },
  sato: {
    typeName: "GHOST",    typeEmoji: "👻",
    typeColor: "#705898", typeBg: "rgba(112,88,152,0.10)",
    typeBorder: "rgba(112,88,152,0.28)",
    headerBg: "linear-gradient(135deg, #705898 0%, #9B78D8 100%)",
  },
  tatsuyama: {
    typeName: "FAIRY",    typeEmoji: "🧚",
    typeColor: "#C4527A", typeBg: "rgba(196,82,122,0.10)",
    typeBorder: "rgba(196,82,122,0.28)",
    headerBg: "linear-gradient(135deg, #C4527A 0%, #EE99AC 100%)",
  },
};

export default function MemberDetailClient({ member }: { member: Member }) {
  const mStyle = memberDetailStyles[member.slug] ?? memberDetailStyles.irie;

  return (
    <div
      className="min-h-screen pt-16"
      style={{ background: "#FFFEF2" }}
    >
      {/* ヘッダーアクセント: タイプカラー */}
      <div
        className="h-[3px] w-full fixed top-[60px] left-0 right-0 z-40"
        style={{ background: mStyle.headerBg }}
      />

      {/* 背景ポケボール */}
      <div className="fixed bottom-12 right-8 pointer-events-none" style={{ zIndex: 0 }}>
        <Pokeball size={280} opacity={0.05} />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* 戻るボタン */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <motion.div
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={springBack}
            className="inline-block"
          >
            <Link
              href="/#profile"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "#8a8a9a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#17171F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
            >
              <ArrowLeft className="w-4 h-4" />
              メンバー一覧に戻る
            </Link>
          </motion.div>
        </motion.div>

        {/* ── トレーナーカード ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: "#FFFFFF",
            border: `2px solid ${mStyle.typeBorder}`,
            boxShadow: `0 8px 40px ${mStyle.typeBg}, 0 2px 12px rgba(0,0,0,0.08)`,
          }}
        >
          {/* タイプヘッダー */}
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ background: mStyle.headerBg }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)" }}>
              TRAINER CARD — No. {String(member.order).padStart(3, "0")}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-white font-bold"
              style={{ background: "rgba(255,255,255,0.25)", fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.08em" }}
            >
              {mStyle.typeEmoji} {mStyle.typeName}
            </span>
          </div>

          <div className="p-8 sm:p-10">
            <div
              className="flex flex-col sm:flex-row items-start gap-6 mb-6 pb-6"
              style={{ borderBottom: `2px solid ${mStyle.typeBg}` }}
            >
              <div className="flex-shrink-0">
                {member.avatar ? (
                  <div
                    className="w-32 h-32 rounded-2xl overflow-hidden"
                    style={{ border: `3px solid ${mStyle.typeColor}`, padding: 3 }}
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <Image src={member.avatar} alt={member.name} width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                ) : (
                  <AvatarPlaceholder name={member.name} mStyle={mStyle} />
                )}
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: mStyle.typeColor, fontFamily: "var(--font-display)" }}>
                  {member.nameEn}
                </p>
                <h1 className="heading-ja text-3xl sm:text-4xl mb-1" style={{ color: "#17171F" }}>
                  {member.name}
                </h1>
                {member.role && (
                  <p className="text-sm mb-4" style={{ color: "#8a8a9a" }}>{member.role}</p>
                )}

                {member.catchphrase && (
                  <div>
                    <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: mStyle.typeColor, opacity: 0.5, lineHeight: 1, display: "block", marginBottom: "-0.2rem" }}>"</span>
                    <p className="text-sm font-medium leading-relaxed tracking-wide" style={{ color: mStyle.typeColor }}>
                      {member.catchphrase}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-bold"
                  style={{ background: mStyle.typeBg, color: mStyle.typeColor, border: `1px solid ${mStyle.typeBorder}` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── フルプロフィール（Markdown） ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl p-8 sm:p-10"
          style={{
            background: "#FFFFFF",
            border: `1px solid rgba(0,0,0,0.08)`,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}
        >
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-2" style={{ color: "#17171F", letterSpacing: "0.04em" }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-6 mb-2" style={{ color: "#17171F" }}>{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-sm font-bold mt-5 mb-1.5" style={{ color: mStyle.typeColor, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed" style={{ color: "#4a4a5a" }}>{children}</p>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: "#17171F", fontWeight: 700 }}>{children}</strong>
                ),
                li: ({ children }) => (
                  <li className="text-sm" style={{ color: "#4a4a5a" }}>{children}</li>
                ),
                hr: () => (
                  <hr style={{ borderColor: `${mStyle.typeBorder}`, margin: "1.5rem 0" }} />
                ),
              }}
            >
              {member.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
