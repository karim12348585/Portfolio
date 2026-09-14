import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageTransition } from "@/layout/PageTransition";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Expertise } from "@/sections/Expertise";
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
      <Experience />
      <FeaturedProjects />
      <Expertise />
      <Certifications />
      <Resume />
      <Contact />
    </PageTransition>
  );
}
