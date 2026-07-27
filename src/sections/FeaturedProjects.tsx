import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { projectFilters } from "@/constants";
import { cn } from "@/utils/cn";
import type { ProjectCategory } from "@/types";

export function FeaturedProjects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  return (
    <section id="projects" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Systems that ship, not just notebooks"
        description="Production-minded AI projects — each with a full engineering case study covering architecture, tradeoffs, and results."
      />

      {/* Filters */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <LayoutGroup>
          {projectFilters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full border px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "border-transparent text-black"
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
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}
