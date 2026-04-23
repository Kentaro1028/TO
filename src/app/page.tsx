import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProfileSection from "@/components/ProfileSection";
import FooterSection from "@/components/FooterSection";
import OrganicDivider from "@/components/OrganicDivider";
import GrainOverlay from "@/components/GrainOverlay";
import AmbientLight from "@/components/AmbientLight";
import { getAllMembers } from "@/lib/members";

export default function Home() {
  const members = getAllMembers();

  return (
    <main>
      <GrainOverlay />
      <AmbientLight />
      <NavBar />

      <div className="pt-[60px] relative z-[2]">
        <HeroSection />
        <OrganicDivider fromColor="#FFFEF2" toColor="#FFFFFF" variant={1} />
        <ServicesSection />
        <OrganicDivider fromColor="#FFFFFF" toColor="#FFF8F0" variant={2} />
        <ProfileSection members={members} />
        <OrganicDivider fromColor="#FFF8F0" toColor="#1a1a2e" variant={3} />
        <FooterSection />
      </div>
    </main>
  );
}
