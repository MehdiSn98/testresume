'use client'

import { useState } from "react";
import LoadingScreen from "@/components/ui/loadingScreen/LoadingScreen";
import Navbar from "@/components/layout/Navbar/Navbar";
import AuraGlow from "@/components/ui/AuraGlow/AuraGlow";
import FloatingTech from "@/components/ui/FloatingTech/FloatingTech";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection/ProjectsSection";
import { useMainController } from "@/hooks/useMainController";
import EducationRoadmap from "@/components/sections/EducationRoadmap/EducationRoadmap";
import Experience from "@/components/sections/Experience/Experience";
import ContactFooter from "@/components/sections/ContactFooter/ContactFooter";
import ScrollToTop from "@/components/sections/ScrollToTop/ScrollToTop";


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // حتماً آرگومان isLoading را اینجا پاس دهید:
  const mainRef = useMainController(isLoading);

  return (
    <>
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      <div className="home-container">
        <AuraGlow />
        <Navbar />
        <FloatingTech />

        <main ref={mainRef} id="mainScroll">
          <div className="home-content-rtl">
            <AboutSection />
            <SkillsSection />
            <EducationRoadmap />
            <ProjectsSection />
            <Experience />
            <ContactFooter />
            
          </div>
        </main>

        <ScrollToTop />
      </div>
    </>
  );
}