import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { projectFilters } from "@/constants";
import { cn } from "@/utils/cn";
import type { ProjectCategory, ProjectType } from "@/types";

type TypeFilter = "All" | ProjectType;

const typeTabs: { key: TypeFilter; label: string; pill: string }[] = [
  { key: "All", label: "All work", pill: "bg-accent-gradient" },
  { key: "Industrial", label: "Industrial", pill: "bg-violet-500" },
  { key: "Academic", label: "Academic", pill: "bg-emerald-500" },
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
      Academic: projects.filter((p) => p.type === "Academic").length,
    }),
    [],
  );

  return (
    <section id="projects" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Systems that ship, not just notebooks"
        description="Real-world AI systems from industry internships and applied research — each with a full engineering case study."
      />

      {/* Industrial vs Academic segmented toggle */}
      <div className="mt-10 flex justify-center">
        <div className="inline-flex rounded-full border border-line bg-panel-2 p-1">
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
                  onClick={() => setTypeFilter(tab.key)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors sm:px-5",
                    active ? "text-accent-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="type-pill"
                      className={cn("absolute inset-0 -z-10 rounded-full", tab.pill)}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {tab.label}
                  <span className={cn("ml-1.5 text-xs", active ? "text-accent-fg/60" : "text-faint")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      {/* Category filters */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <LayoutGroup id="cat-filter">
          {projectFilters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full border px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "border-transparent text-accent-fg"
                    : "border-line text-muted hover:border-accent/40 hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-gradient"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {f}
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Grid */}
      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted">
          No projects match these filters yet.
        </p>
      )}
    </section>
  );
}
