import fs from "fs";
import path from "path";

export type Member = {
  slug: string;
  order: number;
  name: string;
  nameEn: string;
  catchphrase: string;
  role: string;
  avatar: string | null;
  color: string;
  bgLight: string;
  tags: string[];
  content: string;
};

// タグを追加するメンバー
const MEMBER_EXTRA_TAGS: Record<string, string[]> = {
  irie: ["ヤンキー茶髪", "ドクターフィッシュ"],
};

// タグを完全に上書きするメンバー（自動解析を無視）
const MEMBER_TAGS_OVERRIDE: Record<string, string[]> = {
  kuriyama: ["トラブルシューティングの鬼", "こだわりおじさん", "ほぼ帰宅部", "ほぼ栗"],
  kageyama: ["ハイパー・勢い先行PM", "エンジニアを名乗りたい", "和歌山の星"],
};

const MEMBER_COLORS: Record<string, { color: string; bgLight: string }> = {
  irie: { color: "#5b5ef4", bgLight: "#ededfe" },
  kuriyama: { color: "#9333ea", bgLight: "#f5f0ff" },
  kageyama: { color: "#ec4899", bgLight: "#fdf2f8" },
};

function parseOrder(content: string): number {
  const m = content.match(/メンバー紹介：(\d+)/);
  return m ? parseInt(m[1], 10) : 99;
}

function parseName(content: string): { name: string; nameEn: string } {
  const m = content.match(/###\s+\*\*([^/]+)\s*\/\s*([^*]+)\*\*/);
  if (!m) return { name: "不明", nameEn: "Unknown" };
  return {
    name: m[1].trim(),
    nameEn: m[2].trim(),
  };
}

function parseCatchphrase(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const m = line.match(/^\*\*「(.+)」\*\*/);
    if (m) return m[1].trim();
  }
  return "";
}

function parseRole(content: string): string {
  const m = content.match(/\*\*役職:\*\*\s*([^\n(（]+)/);
  if (m) return m[1].trim();
  const m2 = content.match(/\*\*入社年:\*\*/);
  if (m2) return "メンバー";
  return "メンバー";
}

function parseTags(content: string): string[] {
  const weaponMatch = content.match(/変革の武器[^\n]*\n\*\*「([^」]+)」\*\*/);
  const weapon = weaponMatch ? weaponMatch[1] : null;

  const tags: string[] = [];
  if (weapon) tags.push(weapon);

  const hobbySection = content.match(/構成要素[^#]*?((?:- \*\*.+\n?)+)/);
  if (hobbySection) {
    const hobbies = [...hobbySection[1].matchAll(/- \*\*([^:：*]+)/g)];
    hobbies.slice(0, 2).forEach((h) => {
      const label = h[1].trim();
      if (label && !tags.includes(label)) tags.push(label);
    });
  }
  return tags.slice(0, 3);
}

function slugFromFilename(filename: string): string {
  return filename.replace(/[.,]md$/, "").toLowerCase();
}

export function getAllMembers(): Member[] {
  const dir = path.join(process.cwd(), "content", "member");
  const files = fs.readdirSync(dir);

  const members: Member[] = files
    .filter((f) => f.endsWith(".md") || f.endsWith(",md"))
    .map((filename) => {
      const slug = slugFromFilename(filename);
      const content = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { name, nameEn } = parseName(content);
      const colorConfig = MEMBER_COLORS[slug] ?? { color: "#6366f1", bgLight: "#ededfe" };

      // .png → .jpg の順で探す
      const exts = ["png", "jpg", "jpeg", "webp"];
      let avatar: string | null = null;
      for (const ext of exts) {
        const publicPath = path.join(process.cwd(), "public", "member", `${slug}.${ext}`);
        if (fs.existsSync(publicPath)) {
          avatar = `/member/${slug}.${ext}`;
          break;
        }
      }

      return {
        slug,
        order: parseOrder(content),
        name,
        nameEn,
        catchphrase: parseCatchphrase(content),
        role: parseRole(content),
        avatar,
        color: colorConfig.color,
        bgLight: colorConfig.bgLight,
        tags: MEMBER_TAGS_OVERRIDE[slug] ?? [...parseTags(content), ...(MEMBER_EXTRA_TAGS[slug] ?? [])],
        content,
      };
    })
    .sort((a, b) => a.order - b.order);

  return members;
}

export function getMemberBySlug(slug: string): Member | null {
  const all = getAllMembers();
  return all.find((m) => m.slug === slug) ?? null;
}
