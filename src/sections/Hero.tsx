import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/utils/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
/* Each word of the name rises out of a clipped line, like type being set. */
const lineReveal = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.85, ease } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24"
    >
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black_20%,transparent_92%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="section relative flex flex-1 flex-col"
      >
        <div className="grid flex-1 items-end gap-10 pb-12 pt-8 lg:grid-cols-12 lg:gap-8">
          {/* Left: copy */}
          <div className="lg:col-span-8">
            <motion.p
              variants={rise}
              className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted"
            >
              <span className="blink inline-block h-2 w-2 bg-accent" aria-hidden />
              {profile.availability}
            </motion.p>

            <h1 className="font-narrow mt-8 text-[clamp(4rem,14vw,11.5rem)] font-semibold leading-[0.86] tracking-[-0.02em]">
              {profile.name.split(" ").map((word) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={lineReveal} className="block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={rise}
              className="mt-7 font-mono text-[12px] uppercase tracking-[0.14em] text-muted sm:text-[13px]"
            >
              <span className="text-accent">{profile.title}</span>
              <span className="mx-2 text-faint">—</span>
              {profile.subtitle}
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" onClick={() => scrollToId("projects")}>
                View Projects
                <ArrowDown size={14} />
              </Button>
              <a href={profile.cvPath} download>
                <Button size="lg" variant="secondary">
                  <Download size={14} />
                  Download CV
                </Button>
              </a>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollToId("contact")}
              >
                <Mail size={14} />
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Right: portrait plate with a figure caption */}
          <motion.figure
            variants={rise}
            className="w-52 sm:w-64 lg:col-span-4 lg:w-72 lg:justify-self-end"
          >
            <div className="border border-fg p-1.5">
              <div className="aspect-[4/5] overflow-hidden bg-panel-2">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="dot-grid flex h-full w-full flex-col items-center justify-center gap-4">
                    <div className="font-narrow text-6xl font-semibold text-fg/20">
                      {profile.initials}
                    </div>
                    <p className="px-6 text-center font-mono text-[11px] text-faint">
                      Add a photo at public/karim.jpg
                    </p>
                  </div>
                )}
              </div>
            </div>
            <figcaption className="mt-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              <span>Fig. 00</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} />
                {profile.location}
              </span>
            </figcaption>
          </motion.figure>
        </div>

        {/* Stats: one ruled row */}
        <motion.div
          variants={rise}
          className="ruled-grid mb-10 grid-cols-2 md:grid-cols-5"
        >
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="px-4 py-5 last:col-span-2 sm:px-5 md:last:col-span-1"
            >
              <div className="font-condensed text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
                {s.value}
              </div>
              <div className="mono-label mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
