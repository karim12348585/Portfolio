import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import {
  computePortraitTransform,
  computeScrollProgress,
  type PortraitRect,
} from "@/utils/portraitMorph";

interface StageMetrics {
  heroRect: PortraitRect;
  aboutRect: PortraitRect;
  startY: number;
  endY: number;
}

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function HeroAboutStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);

  const floatingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const aboutBadgeRef = useRef<HTMLDivElement>(null);

  const metricsRef = useRef<StageMetrics | null>(null);
  const rafRef = useRef<number | null>(null);

  const [canMorph, setCanMorph] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia(DESKTOP_QUERY).matches &&
      !window.matchMedia(REDUCED_MOTION_QUERY).matches
    );
  });

  const [slotSize, setSlotSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  // Track viewport breakpoint & reduced-motion preference
  useEffect(() => {
    const desktopMq = window.matchMedia(DESKTOP_QUERY);
    const motionMq = window.matchMedia(REDUCED_MOTION_QUERY);

    const updateCapability = () => {
      setCanMorph(desktopMq.matches && !motionMq.matches);
    };

    updateCapability();
    desktopMq.addEventListener("change", updateCapability);
    motionMq.addEventListener("change", updateCapability);

    return () => {
      desktopMq.removeEventListener("change", updateCapability);
      motionMq.removeEventListener("change", updateCapability);
    };
  }, []);

  const applyTransform = () => {
    const metrics = metricsRef.current;
    const floatingEl = floatingRef.current;
    if (!metrics || !floatingEl) return;

    const rawProgress = computeScrollProgress(
      window.scrollY,
      metrics.startY,
      metrics.endY,
    );
    const t = computePortraitTransform(
      metrics.heroRect,
      metrics.aboutRect,
      rawProgress,
    );

    floatingEl.style.transform = `translate3d(${t.x.toFixed(2)}px, ${t.y.toFixed(2)}px, 0) scale(${t.scale.toFixed(4)}) rotate(${t.rotateDeg.toFixed(3)}deg)`;
    floatingEl.dataset.morphProgress = rawProgress.toFixed(2);

    if (glowRef.current) {
      glowRef.current.style.opacity = t.glowOpacity.toFixed(3);
    }
    if (heroBadgeRef.current) {
      heroBadgeRef.current.style.opacity = t.heroBadgeOpacity.toFixed(3);
      heroBadgeRef.current.style.transform = `translate3d(0, ${((1 - t.heroBadgeOpacity) * 8).toFixed(1)}px, 0)`;
    }
    if (aboutBadgeRef.current) {
      const targetScale =
        metrics.heroRect.width > 0
          ? metrics.aboutRect.width / metrics.heroRect.width
          : 1;
      const badgeComp = targetScale > 0 ? 1 / targetScale : 1;
      aboutBadgeRef.current.style.opacity = t.aboutBadgeOpacity.toFixed(3);
      aboutBadgeRef.current.style.transform = `translate3d(0, ${((1 - t.aboutBadgeOpacity) * 8).toFixed(1)}px, 0) scale(${badgeComp.toFixed(3)})`;
    }
  };

  useLayoutEffect(() => {
    if (!canMorph) {
      metricsRef.current = null;
      setSlotSize(null);
      return;
    }

    const measure = () => {
      const stageEl = stageRef.current;
      const heroEl = heroSlotRef.current;
      const aboutEl = aboutSlotRef.current;
      const aboutSection = document.getElementById("about");

      if (!stageEl || !heroEl || !aboutEl || !aboutSection) return;

      const stageRect = stageEl.getBoundingClientRect();
      const hRect = heroEl.getBoundingClientRect();
      const aRect = aboutEl.getBoundingClientRect();

      if (hRect.width <= 0 || aRect.width <= 0) return;

      const heroRect: PortraitRect = {
        left: hRect.left - stageRect.left,
        top: hRect.top - stageRect.top,
        width: hRect.width,
        height: hRect.height,
      };
      const aboutRect: PortraitRect = {
        left: aRect.left - stageRect.left,
        top: aRect.top - stageRect.top,
        width: aRect.width,
        height: aRect.height,
      };

      const aboutDocTop = aboutSection.getBoundingClientRect().top + window.scrollY;
      const startY = 24;
      // Finish docking just before scrollToId("about", 72) settles so navbar jump lands at 100%
      const endY = Math.max(startY + 160, aboutDocTop - 96);

      metricsRef.current = { heroRect, aboutRect, startY, endY };
      setSlotSize((prev) =>
        prev &&
        Math.abs(prev.width - heroRect.width) < 0.5 &&
        Math.abs(prev.height - heroRect.height) < 0.5
          ? prev
          : { width: heroRect.width, height: heroRect.height },
      );

      applyTransform();
    };

    const scheduleTransform = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyTransform();
      });
    };

    measure();
    const rafInit = window.requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => {
      measure();
    });
    if (stageRef.current) ro.observe(stageRef.current);
    if (heroSlotRef.current) ro.observe(heroSlotRef.current);
    if (aboutSlotRef.current) ro.observe(aboutSlotRef.current);

    window.addEventListener("scroll", scheduleTransform, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.ready?.then(measure);

    return () => {
      window.cancelAnimationFrame(rafInit);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ro.disconnect();
      window.removeEventListener("scroll", scheduleTransform);
      window.removeEventListener("resize", measure);
    };
  }, [canMorph]);

  // Apply transform immediately once floatingRef mounts with measured slotSize
  useLayoutEffect(() => {
    if (canMorph && slotSize) {
      applyTransform();
    }
  }, [canMorph, slotSize]);

  const morphActive = canMorph && slotSize !== null;

  return (
    <div ref={stageRef} className="relative overflow-x-clip">
      <Hero
        portraitSlotRef={heroSlotRef}
        hideStaticPortrait={morphActive}
      />
      <About
        portraitSlotRef={aboutSlotRef}
        hideStaticPortrait={morphActive}
      />

      {/* Single GPU-composited portrait that glides diagonally from Hero (right) to About (left) */}
      {morphActive && (
        <div
          ref={floatingRef}
          data-testid="morph-portrait"
          data-morph-progress="0.00"
          style={{
            width: `${slotSize.width}px`,
            height: `${slotSize.height}px`,
            transformOrigin: "top left",
          }}
          className="pointer-events-none absolute top-0 left-0 z-20 will-change-transform"
        >
          {/* Ambient teal aura that travels with the portrait */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-accent/14 blur-3xl dark:bg-accent/22"
          />

          {/* Framed 2:3 portrait card */}
          <div className="relative h-full w-full rounded-[1.75rem] border-[6px] border-panel bg-panel shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16)] dark:border-panel-2 dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)]">
            <div className="h-full w-full overflow-hidden rounded-[1.35rem]">
              <img
                src={profile.photo}
                alt={profile.name}
                fetchPriority="high"
                className="block h-full w-full object-cover"
              />
            </div>

            {/* Hero floating badge (bottom-left) */}
            <div
              ref={heroBadgeRef}
              className="absolute -left-6 bottom-5 flex items-center gap-2 rounded-full border border-line bg-panel/95 px-4 py-2 text-xs whitespace-nowrap shadow-[0_8px_24px_-6px_rgba(15,23,42,0.14)] backdrop-blur-md dark:shadow-black/50"
            >
              <MapPin
                size={14}
                className="shrink-0 text-accent dark:text-accent-soft"
              />
              <span className="font-semibold text-fg">{profile.location}</span>
              <span className="text-faint">· {profile.utcOffset}</span>
            </div>

            {/* About floating badge (bottom-right, inverse-scaled to native crispness when docked) */}
            <div
              ref={aboutBadgeRef}
              style={{ opacity: 0, transformOrigin: "bottom right" }}
              className="absolute -right-6 bottom-5 flex items-center gap-1.5 rounded-full border border-line bg-panel/95 px-3 py-1 text-xs font-semibold whitespace-nowrap text-fg shadow-[0_8px_24px_-6px_rgba(15,23,42,0.14)] backdrop-blur-md dark:shadow-black/50"
            >
              <MapPin
                size={13}
                className="shrink-0 text-accent dark:text-accent-soft"
              />
              <span>Based in Tunis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
