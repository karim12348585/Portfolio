import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageTransition } from "@/layout/PageTransition";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { ProjectTimeline } from "@/sections/ProjectTimeline";
import { Experience } from "@/sections/Experience";
import { Certifications } from "@/sections/Certifications";
import { Resume } from "@/sections/Resume";
import { Contact } from "@/sections/Contact";
import { scrollToId } from "@/utils/scroll";

export function Home() {
  const location = useLocation();

  // When navigating back from a project page with a target section.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string })?.scrollTo;
    if (target) {
      requestAnimationFrame(() => scrollToId(target));
    }
  }, [location.state]);

  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <ProjectTimeline />
      <Certifications />
      <Resume />
      <Contact />
    </PageTransition>
  );
}
