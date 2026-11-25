import type { RefObject } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/utils/scroll";

export interface HeroProps {
  portraitSlotRef?: RefObject<HTMLDivElement | null>;
  hideStaticPortrait?: boolean;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function Hero({ portraitSlotRef, hideStaticPortrait = false }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Clean editorial square grid and subtle ambient teal wash */}
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-75"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-[10%] h-[30rem] w-[30rem] rounded-full bg-accent/[0.08] blur-[120px] dark:bg-accent/[0.14]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="section relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          {/* Left: Editorial headline, CTAs, and clean 4-column metrics */}
          <div>
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-medium text-fg shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                {profile.availability}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance font-display text-5xl font-extrabold leading-[1.03] tracking-tight text-fg sm:text-6xl lg:text-[4.85rem]"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3.5 font-display text-xl font-bold sm:text-2xl"
            >
              <span className="text-accent dark:text-accent-soft">
                {profile.title}
              </span>
              <span className="font-semibold text-fg/80">
                {" "}
                · {profile.subtitle}
              </span>
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-[17px]"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" onClick={() => scrollToId("projects")}>
                <span>View projects</span>
                <ArrowRight size={17} />
              </Button>
              <a href={profile.cvPath} download="Karim-Souissi-CV.pdf">
                <Button size="lg" variant="secondary" asChild>
                  <Download size={16} />
                  <span>Download CV</span>
                </Button>
              </a>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollToId("contact")}
                className="font-semibold text-fg/80 hover:text-accent dark:hover:text-accent-soft"
              >
                <Mail size={16} />
                <span>Contact me</span>
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 border-t border-line pt-7"
            >
              <div className="grid max-w-xl grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-line">
                {profile.stats.map((s) => (
                  <div
                    key={s.label}
                    className="sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <div className="font-display text-2xl font-extrabold tracking-tight text-fg tabular-nums">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs leading-snug text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Portrait layout slot (rendered statically on mobile/reduced-motion, animated across stage on desktop) */}
          <div className="relative mx-auto lg:ml-auto lg:mr-0">
            <div className="relative">
              {!hideStaticPortrait && (
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[2.5rem] bg-accent/14 blur-3xl dark:bg-accent/22"
                />
              )}
              <div
                ref={portraitSlotRef}
                data-testid="hero-portrait-slot"
                aria-hidden={hideStaticPortrait || undefined}
                className={
                  hideStaticPortrait
                    ? "pointer-events-none invisible aspect-[2/3] w-72 rounded-[1.75rem] border-[6px] sm:w-80 lg:w-[22.5rem]"
                    : "relative aspect-[2/3] w-72 rounded-[1.75rem] border-[6px] border-panel bg-panel shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16)] sm:w-80 lg:w-[22.5rem] dark:border-panel-2 dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)]"
                }
              >
                {!hideStaticPortrait && (
                  <div className="h-full w-full overflow-hidden rounded-[1.35rem]">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      fetchPriority="high"
                      className="block h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              {!hideStaticPortrait && (
                <div className="absolute -left-4 bottom-5 flex items-center gap-2 rounded-full border border-line bg-panel/95 px-4 py-2 text-xs shadow-[0_8px_24px_-6px_rgba(15,23,42,0.14)] backdrop-blur-md sm:-left-6 dark:shadow-black/50">
                  <MapPin
                    size={14}
                    className="shrink-0 text-accent dark:text-accent-soft"
                  />
                  <span className="font-semibold text-fg">
                    {profile.location}
                  </span>
                  <span className="text-faint">· {profile.utcOffset}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
