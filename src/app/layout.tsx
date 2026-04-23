import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "変革オフィス（TO） | Transformation Office",
  description: "変革を、日常に。プロジェクト立ち上げ支援・組織横断調整・経営戦略整合サポートで、組織変革を加速させます。",
  openGraph: {
    title: "変革オフィス（TO）",
    description: "変革を、日常に。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "#FFFEF2", color: "#17171F" }}>
        {children}
      </body>
    </html>
  );
}
