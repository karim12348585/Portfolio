import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/data/projects";
import { projectFilters } from "@/constants";
import { cn } from "@/utils/cn";
import type { ProjectCategory, ProjectType } from "@/types";
import { filterProjects, type TypeFilter } from "@/utils/portfolioLogic";

const typeTabs: { key: TypeFilter; label: string; pill: string }[] = [
  { key: "All", label: "All work", pill: "bg-accent" },
  { key: "Industrial", label: "Industrial", pill: "bg-accent" },
  { key: "Freelance", label: "Freelance", pill: "bg-accent" },
  { key: "Academic", label: "Academic", pill: "bg-accent" },
];

export function FeaturedProjects() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () => filterProjects(projects, typeFilter, filter),
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
    <section id="projects" className="section scroll-mt-24 py-14">
      {/* Compact split header: title on left, type switcher on right */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Featured Projects
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-fg sm:text-4xl">
            Systems that ship, not just notebooks
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted sm:text-base">
            Select any system from the index to inspect its architecture,
            outcome, and repository — or open its full engineering case study.
          </p>
        </div>

        <div className="isolate inline-flex self-start rounded-lg border border-line bg-panel-2 p-1 lg:self-auto">
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
                  type="button"
                  onClick={() => setTypeFilter(tab.key)}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors sm:px-3.5",
                    active ? "text-accent-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="type-pill"
                      className={cn(
                        "absolute inset-0 -z-10 rounded-md",
                        tab.pill,
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {tab.label}
                  <span
                    className={cn(
                      "ml-1.5 hidden text-[11px] tabular-nums sm:inline",
                      active ? "text-accent-fg/80" : "text-faint",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      {/* Single-row domain filter bar */}
      <div className="mt-5 flex max-w-full items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
        <LayoutGroup id="cat-filter">
          {projectFilters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "relative shrink-0 rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-panel-2 hover:text-fg",
                )}
              >
                {f}
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Master-Detail Project Showcase */}
      <ProjectGallery
        projects={filtered}
        onResetFilters={() => {
          setTypeFilter("All");
          setFilter("All");
        }}
      />
    </section>
  );
}
