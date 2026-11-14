import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";
import { getProjectBySlug } from "@/data/projects";

export function Experience() {
  return (
    <section id="experience" className="section scroll-mt-24 py-24">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Industry experience, from data to agents"
        description="Three internships turning applied AI research into systems that run in enterprise environments."
      />

      <div className="mt-14 divide-y divide-line border-y border-line">
        {experiences.map((exp, i) => {
          const project = exp.projectSlug
            ? getProjectBySlug(exp.projectSlug)
            : undefined;
          return (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-8"
            >
              {/* Left: meta */}
              <div className="lg:col-span-4">
                <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">
                  02.{i + 1}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                  {exp.company}
                </h3>
                <p className="mt-2 text-sm text-fg/85">{exp.role}</p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  {exp.duration}
                  {exp.current && (
                    <span className="ml-2 text-accent">· Current</span>
                  )}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {exp.summary}
                </p>
                {project && (
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group/cta mt-6 inline-flex items-start gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg"
                  >
                    <span className="link-underline">
                      More details: {project.title} case study
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="mt-px shrink-0 text-accent transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>

              {/* Right: details */}
              <div className="space-y-7 lg:col-span-8">
                <div>
                  <h4 className="mono-label">Responsibilities</h4>
                  <ul className="mt-3 space-y-2">
                    {exp.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.7rem] h-px w-4 shrink-0 bg-fg/60"
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mono-label">Key Achievements</h4>
                  <ul className="mt-3 space-y-2">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-3 text-sm leading-relaxed text-fg/90"
                      >
                        <span className="w-4 shrink-0 font-mono text-accent">
                          +
                        </span>
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
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
