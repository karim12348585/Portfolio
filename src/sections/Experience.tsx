import { motion } from "framer-motion";
import { Briefcase, Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Experience"
        title="Industry experience, from data to agents"
        description="Three internships turning applied AI research into systems that run in enterprise environments."
      />

      <div className="mt-14 space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative rounded-2xl border border-line bg-panel p-6 shadow-soft transition-colors hover:border-accent/40 sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
              {/* Left: meta */}
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">
                      {exp.company}
                    </h3>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1 text-xs text-accent">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-fg/90">
                  {exp.role}
                </p>
                <p className="mt-1 text-xs text-faint">{exp.duration}</p>
                <p className="mt-4 text-sm text-muted">{exp.summary}</p>
              </div>

              {/* Right: details */}
              <div className="space-y-5">
                <div>
                  <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-faint">
                    Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted">
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-faint">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((a) => (
                      <li key={a} className="flex gap-2.5 text-sm text-fg/90">
                        <Sparkles
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
