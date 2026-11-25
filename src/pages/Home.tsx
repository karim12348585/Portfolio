import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransition } from "@/layout/PageTransition";
import { HeroAboutStage } from "@/sections/HeroAboutStage";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Expertise } from "@/sections/Expertise";
import { Experience } from "@/sections/Experience";
import { Certifications } from "@/sections/Certifications";
import { Blog } from "@/sections/Blog";
import { Resume } from "@/sections/Resume";
import { Contact } from "@/sections/Contact";
import { scrollToId } from "@/utils/scroll";

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target =
      (location.state as { scrollTo?: string } | null)?.scrollTo ??
      (location.hash ? location.hash.replace(/^#/, "") : undefined);

    if (!target) return;

    let attempts = 0;
    let timerId: number | undefined;

    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        scrollToId(target);
        // Clear router state after scrolling so browser back/refresh won't jump again
        if ((location.state as { scrollTo?: string } | null)?.scrollTo) {
          navigate(location.pathname, { replace: true, state: null });
        }
        return;
      }
      if (attempts < 12) {
        attempts += 1;
        timerId = window.setTimeout(tryScroll, 45);
      }
    };

    const rafId = requestAnimationFrame(tryScroll);
    return () => {
      cancelAnimationFrame(rafId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [location.state, location.hash, location.pathname, navigate]);

  return (
    <PageTransition>
      <HeroAboutStage />
      <Experience />
      <FeaturedProjects />
      <Expertise />
      <Blog />
      <Certifications />
      <Resume />
      <Contact />
    </PageTransition>
  );
}
