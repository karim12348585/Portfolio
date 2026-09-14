import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/ParticleField";
import { scrollToId } from "@/utils/scroll";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Warm ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-accent/[0.14] blur-[130px]" />
        <div className="absolute -right-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-orange-500/[0.09] blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-amber-300/[0.05] blur-[120px]" />
      </div>
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <ParticleField className="absolute inset-0 opacity-[0.28]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg via-bg/80 to-transparent"
        aria-hidden
      />

      <div className="section relative z-10 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Left — editorial headline */}
          <div>
            <motion.div variants={item}>
              <span className="eyebrow">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 text-balance text-[3.25rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
            >
              {profile.firstName}
              <br />
              <span className="italic text-accent">Souissi</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-7 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-accent/60" />
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-fg/90">
                {profile.title}
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty font-sans text-lg leading-relaxed text-muted"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" onClick={() => scrollToId("projects")}>
                View Projects
                <ArrowRight size={18} />
              </Button>
              <a href={profile.cvPath} download>
                <Button size="lg" variant="secondary">
                  <Download size={17} />
                  Download CV
                </Button>
              </a>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollToId("contact")}
              >
                <Mail size={17} />
                Contact
              </Button>
            </motion.div>

            {/* Stats — hairline separated, editorial */}
            <motion.div variants={item} className="mt-12 max-w-xl">
              <div className="rule mb-6" />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {profile.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl leading-none text-fg">
                      {s.value}
                    </dd>
                    <p className="mt-2 font-sans text-xs leading-snug text-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* Right — portrait */}
          <motion.div variants={item} className="relative mx-auto lg:mx-0">
            <div className="relative">
              {/* warm halo */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-orange-500/15 to-transparent blur-3xl"
              />
              {/* offset frame */}
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.75rem] border border-accent/25"
              />
              <div className="surface relative aspect-[4/5] w-72 overflow-hidden rounded-[1.75rem] sm:w-[21rem]">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-panel-2">
                    <div className="grid h-24 w-24 place-items-center rounded-3xl bg-accent-gradient font-display text-3xl text-black">
                      {profile.initials}
                    </div>
                    <p className="px-6 text-center font-sans text-xs text-faint">
                      Add a photo at{" "}
                      <code className="text-muted">public/karim.jpg</code>
                    </p>
                  </div>
                )}
              </div>
              <div className="glass absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 font-sans text-xs">
                <MapPin size={14} className="text-accent" />
                {profile.location}
              </div>
              <div className="glass absolute -top-4 right-6 flex items-center gap-2 rounded-2xl px-3 py-2 font-sans text-xs">
                <Sparkles size={13} className="text-accent" />
                {profile.subtitle}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
