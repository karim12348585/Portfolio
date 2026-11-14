import { motion } from "framer-motion";
import { GraduationCap, Languages as LangIcon, Sparkle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { education, languages, interests } from "@/data/education";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Label({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mono-label flex items-center gap-2 text-fg">
      <Icon size={13} className="text-accent" />
      {children}
    </h3>
  );
}

export function About() {
  return (
    <section id="about" className="section scroll-mt-24 py-24">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Engineering intelligence, end to end"
        description={profile.intro}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Education: a ruled table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="lg:col-span-7"
        >
          <Label icon={GraduationCap}>Education</Label>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {education.map((e) => (
              <li
                key={e.id}
                className="grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] text-faint">
                  {e.period}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-lg font-semibold tracking-tight">
                      {e.degree}
                    </h4>
                    {e.highlight && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                        {e.highlight}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-fg/80">{e.school}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {e.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Right column: languages + interests */}
        <div className="space-y-12 lg:col-span-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Label icon={LangIcon}>Languages</Label>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {languages.map((l) => {
                const filled = Math.round(l.pct / 10);
                return (
                  <li key={l.name} className="flex items-center gap-4 py-3">
                    <span className="w-20 text-sm text-fg">{l.name}</span>
                    <div
                      className="flex flex-1 gap-1"
                      role="img"
                      aria-label={`${l.name}: ${l.level}`}
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.03 }}
                          className={cn(
                            "h-3 flex-1 origin-bottom",
                            i < filled ? "bg-fg" : "bg-line",
                          )}
                        />
                      ))}
                    </div>
                    <span className="w-20 text-right font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                      {l.level}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Label icon={Sparkle}>Interests</Label>
            <p className="mt-4 text-base leading-[1.9] text-muted">
              {interests.map((i, k) => (
                <span key={i}>
                  <span className="text-fg">{i}</span>
                  {k < interests.length - 1 && (
                    <span className="mx-2.5 text-faint">/</span>
                  )}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
