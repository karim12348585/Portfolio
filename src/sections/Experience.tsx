import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { experiences } from "@/data/experience";
import { getProjectBySlug } from "@/data/projects";
import { cn } from "@/utils/cn";

export function Experience() {
  return (
    <section id="experience" className="section scroll-mt-24 py-12">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Industry experience, from data to agents"
        description="Freelance AI engineering and enterprise internships turning applied research into production systems."
      />

      <div className="mt-7 divide-y divide-line border-t border-b border-line">
        {experiences.map((exp, i) => {
          const project = exp.projectSlug
            ? getProjectBySlug(exp.projectSlug)
            : undefined;
          const rowNum = String(i + 1).padStart(2, "0");
          const isFreelance = exp.employmentType === "Freelance";

          return (
            <article key={exp.id} className="py-5">
              <div className="grid gap-3 lg:grid-cols-12 lg:items-baseline lg:gap-6">
                {/* Left: Balanced Type, Duration, Role & Company (unboxed editorial layout) */}
                <div className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-faint">
                    <span className="font-mono font-semibold text-accent tabular-nums dark:text-accent-soft">
                      {rowNum}
                    </span>
                    <span aria-hidden="true">/</span>
                    <span className="font-sans text-[13px] font-medium text-fg/80">
                      {exp.duration}
                    </span>
                    {exp.employmentType && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 font-sans text-xs font-semibold",
                            isFreelance
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-sky-600 dark:text-sky-400",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isFreelance
                                ? "bg-amber-500 dark:bg-amber-400"
                                : "bg-sky-500 dark:bg-sky-400",
                            )}
                          />
                          {exp.employmentType}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Role & Company balanced side by side */}
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                      {exp.role}
                    </h3>
                    {/* "@ Company" wraps as one unit so "@" never ends a line */}
                    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                    <span
                      aria-hidden="true"
                      className="text-sm font-medium text-faint"
                    >
                      @
                    </span>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-display text-base font-semibold text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent dark:text-accent-soft dark:decoration-accent-soft/35 dark:hover:decoration-accent-soft sm:text-lg"
                      >
                        <span>{exp.company}</span>
                        <ExternalLink size={12} className="opacity-75" />
                      </a>
                    ) : (
                      <span className="font-display text-base font-semibold text-accent dark:text-accent-soft sm:text-lg">
                        {exp.company}
                      </span>
                    )}
                    </span>
                  </div>

                  {exp.projectLabel && (
                    <p className="mt-1 text-xs font-medium text-muted sm:text-[13px]">
                      {exp.projectLabel}
                    </p>
                  )}
                </div>

                {/* Middle: Concise Summary & Tech Stack */}
                <div className="lg:col-span-5">
                  <p className="text-sm leading-relaxed text-muted">
                    {exp.summary}
                  </p>
                  <p className="mt-2 font-mono text-xs text-faint">
                    {exp.tech.join(" · ")}
                  </p>
                </div>

                {/* Right: Case Study Link */}
                <div className="lg:col-span-2 lg:text-right">
                  {project && (
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group/cta inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-soft dark:text-accent-soft dark:hover:text-fg"
                    >
                      <span>Case study</span>
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
