import { notFound } from "next/navigation";
import { getAllMembers, getMemberBySlug } from "@/lib/members";
import MemberDetailClient from "./MemberDetailClient";

export async function generateStaticParams() {
  const members = getAllMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return {};
  return {
    title: `${member.name} | 変革オフィス（TO）`,
    description: member.catchphrase,
  };
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  return <MemberDetailClient member={member} />;
}
