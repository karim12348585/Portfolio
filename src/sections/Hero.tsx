import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/ParticleField";
import { GradientMesh } from "@/components/GradientMesh";
import { scrollToId } from "@/utils/scroll";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Backgrounds */}
      <GradientMesh />
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
      <ParticleField className="absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden
      />

      <div className="section relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Left: copy */}
          <div>
            <motion.div variants={item}>
              <span className="eyebrow">
                <Sparkles size={13} className="text-accent" />
                {profile.availability}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 text-xl font-semibold sm:text-2xl"
            >
              <span className="accent-gradient-text">{profile.title}</span>
              <span className="text-muted"> · {profile.subtitle}</span>
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
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
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4"
            >
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-gradient text-2xl font-extrabold">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: portrait card */}
          <motion.div variants={item} className="relative mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-accent-gradient opacity-20 blur-2xl" />
              <div className="glass relative aspect-[4/5] w-72 overflow-hidden rounded-[1.75rem] sm:w-80">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-panel-2 to-panel">
                    <div className="grid h-24 w-24 place-items-center rounded-3xl bg-accent-gradient text-3xl font-bold text-black">
                      {profile.initials}
                    </div>
                    <p className="px-6 text-center text-xs text-faint">
                      Add a photo at{" "}
                      <code className="text-muted">public/karim.jpg</code>
                    </p>
                  </div>
                )}
              </div>
              <div className="glass absolute -bottom-4 -left-5 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs shadow-glow">
                <MapPin size={14} className="text-accent" />
                {profile.location}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
