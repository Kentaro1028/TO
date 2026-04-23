"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "#services", label: "ROLE" },
  { href: "#profile",  label: "TEAM" },
];

export default function NavBar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500"
        style={{
          height: 60,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(255,254,242,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          {/* ロゴ: ポケボール風 */}
          <Link href="/" className="flex items-center gap-3">
            {/* ミニポケボール */}
            <div className="relative w-8 h-8 flex-shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#CC0000" strokeWidth="3" />
                <path d="M 2 20 A 18 18 0 0 1 38 20 Z" fill="#CC0000" />
                <path d="M 2 20 A 18 18 0 0 0 38 20 Z" fill="white" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#17171F" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="6" fill="white" stroke="#17171F" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="2.5" fill="#FFFEF2" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                color: "#17171F",
              }}
            >
              TRANSFORMATION <span style={{ color: "#CC0000" }}>OFFICE</span>
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  color: "#4a4a5a",
                }}
                className="hover:text-[#CC0000] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            {/* ポケボールアクセント */}
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CC0000" }} />
          </nav>

          {/* ハンバーガー */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            style={{ color: "#17171F" }}
            aria-label="メニュー"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.header>

      {/* モバイルメニュー */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-[60px] left-0 right-0 z-40 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          background: "rgba(255,254,242,0.97)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          padding: "1.25rem 1.5rem",
        }}
      >
        <nav className="flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.22em",
                color: "#17171F",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
