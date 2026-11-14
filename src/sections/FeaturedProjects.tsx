import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { projectFilters } from "@/constants";
import { cn } from "@/utils/cn";
import type { ProjectCategory, ProjectType } from "@/types";

type TypeFilter = "All" | ProjectType;

const typeTabs: { key: TypeFilter; label: string }[] = [
  { key: "All", label: "All work" },
  { key: "Industrial", label: "Industrial" },
  { key: "Freelance", label: "Freelance" },
  { key: "Academic", label: "Academic" },
];

export function FeaturedProjects() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (typeFilter === "All" || p.type === typeFilter) &&
          (filter === "All" || p.categories.includes(filter)),
      ),
    [typeFilter, filter],
  );

  const counts = useMemo(
    () => ({
      Industrial: projects.filter((p) => p.type === "Industrial").length,
      Freelance: projects.filter((p) => p.type === "Freelance").length,
      Academic: projects.filter((p) => p.type === "Academic").length,
    }),
    [],
  );

  return (
    <section id="projects" className="section scroll-mt-24 py-24">
      <SectionHeading
        index="03"
        eyebrow="Featured Projects"
        title="Systems that ship, not just notebooks"
        description="Real-world AI systems from industry internships, freelance client work and applied research — each with a full engineering case study."
      />

      {/* Filters: type tabs on a rule, category toggles beside them */}
      <div className="mt-12 border-b border-line">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div
            role="tablist"
            aria-label="Project type"
            className="-mb-px flex gap-6 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,black_88%,transparent)] lg:[mask-image:none]"
          >
            <LayoutGroup id="type-toggle">
              {typeTabs.map((tab) => {
                const active = typeFilter === tab.key;
                const count =
                  tab.key === "All"
                    ? projects.length
                    : counts[tab.key as ProjectType];
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTypeFilter(tab.key)}
                    className={cn(
                      "relative flex shrink-0 items-baseline gap-1.5 pb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {tab.label}
                    <span
                      className={cn(
                        "text-[10px]",
                        active ? "text-accent" : "text-faint",
                      )}
                    >
                      {count}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="type-rule"
                        className="absolute inset-x-0 bottom-0 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </LayoutGroup>
          </div>

          <div className="flex flex-wrap gap-1.5 pb-3 lg:max-w-[62%] lg:justify-end">
            {projectFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-[2px] border px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
                    active
                      ? "border-fg bg-fg text-bg"
                      : "border-line text-muted hover:border-fg hover:text-fg",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Index: one ruled row per project */}
      <motion.div layout className="divide-y divide-line">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          No projects match these filters yet.
        </p>
      )}
    </section>
  );
}
