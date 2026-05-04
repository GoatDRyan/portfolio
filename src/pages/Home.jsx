import React from "react";
import ComicBackground from "../components/ui/ComicBackground";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import SkillsSection from "../components/home/SkillsSection";
import ProjectsSection from "../components/home/ProjectsSection";

function Home() {
  return (
    <main
      id="top"
      className="relative isolate min-h-screen bg-background text-foreground"
    >
      {/* Le background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
      <ComicBackground />
      </div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}

export default Home;