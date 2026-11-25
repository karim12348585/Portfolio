import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Search,
  X,
} from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/utils/cn";
import { CompanyName } from "@/components/CompanyName";
import { CodeSource } from "@/components/CodeSource";
import { NotebookLink } from "@/components/NotebookLink";
import { ProjectFallbackVisual } from "@/components/ProjectFallbackVisual";
import { projectTypeStyles } from "@/utils/projectType";
import {
  getAdjacentProjectSlug,
  resolveSelectedProject,
  searchProjects,
} from "@/utils/portfolioLogic";

export interface ProjectGalleryProps {
  projects: Project[];
  onResetFilters?: () => void;
  className?: string;
}

export function ProjectGallery({
  projects,
  onResetFilters,
  className,
}: ProjectGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    projects[0]?.slug ?? null,
  );

  const visibleProjects = useMemo(
    () => searchProjects(projects, searchQuery),
    [projects, searchQuery],
  );

  const activeProject = resolveSelectedProject(visibleProjects, selectedSlug);
  const activeIndex = activeProject
    ? visibleProjects.findIndex((p) => p.slug === activeProject.slug)
    : -1;

  // Keep selectedSlug synced when filter/search changes exclude the previous selection
  useEffect(() => {
    if (activeProject && activeProject.slug !== selectedSlug) {
      setSelectedSlug(activeProject.slug);
    } else if (!activeProject && selectedSlug !== null) {
      setSelectedSlug(null);
    }
  }, [activeProject, selectedSlug]);

  const handleResetAll = () => {
    setSearchQuery("");
    onResetFilters?.();
  };

  if (projects.length === 0) {
    return (
      <div
        className={cn(
          "mt-6 border-t border-b border-line py-12 text-center",
          className,
        )}
      >
        <p className="font-display text-lg font-bold text-fg">
          No matching projects found
        </p>
        <p className="mt-1 text-sm text-muted">
          Try selecting another project type or category filter.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={handleResetAll}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-fg transition-colors hover:bg-accent-soft"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  const previewImage = activeProject
    ? activeProject.cover ?? activeProject.caseStudy.screenshots[0]?.src
    : undefined;

  const activeTypeStyle = activeProject
    ? projectTypeStyles[activeProject.type]
    : null;

  const stepProject = (direction: -1 | 1) => {
    if (!activeProject) return;
    const next = getAdjacentProjectSlug(
      visibleProjects,
      activeProject.slug,
      direction,
    );
    if (next) setSelectedSlug(next);
  };

  return (
    <div className={cn("mt-4 border-t border-line pt-5", className)}>
      {/* Master-Detail Split Layout: compact searchable index on left, sticky editorial showcase card on right */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(320px,0.92fr)_1.28fr] lg:gap-7">
        {/* Left: Full Searchable Project Index */}
        <div className="rounded-2xl border border-line bg-panel/75 p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.12)] dark:bg-panel/60 dark:shadow-none">
          {/* Index Header */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-sm font-bold tracking-tight text-fg">
                Project Index
              </span>
              <span className="font-mono text-xs font-semibold text-accent tabular-nums dark:text-accent-soft">
                {visibleProjects.length > 0
                  ? `${String(activeIndex + 1).padStart(2, "0")} / ${String(visibleProjects.length).padStart(2, "0")}`
                  : "00 / 00"}
              </span>
            </div>

            {visibleProjects.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => stepProject(-1)}
                  aria-label="Previous project"
                  className="grid h-7 w-7 place-items-center rounded-md border border-line bg-panel text-muted transition-colors hover:border-accent/60 hover:text-fg"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => stepProject(1)}
                  aria-label="Next project"
                  className="grid h-7 w-7 place-items-center rounded-md border border-line bg-panel text-muted transition-colors hover:border-accent/60 hover:text-fg"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Search Input inside the Project Index */}
          <div className="relative mb-3">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
            />
            <label htmlFor="project-index-search" className="sr-only">
              Search projects by name, company, or technology
            </label>
            <input
              id="project-index-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tech (e.g. LangGraph, Neo4j)…"
              className="w-full rounded-lg border border-line bg-bg py-2 pr-8 pl-9 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent focus:bg-panel focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear project search"
                className="absolute top-1/2 right-2.5 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-faint transition-colors hover:text-fg"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Complete Interactive Project List */}
          {visibleProjects.length === 0 ? (
            <div className="rounded-xl border border-line bg-panel-2/40 px-4 py-6 text-center">
              <p className="text-sm font-semibold text-fg">
                No projects match “{searchQuery}”
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2.5 text-xs font-semibold text-accent hover:text-accent-soft"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div
              role="tablist"
              aria-label="Select a project to inspect"
              className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
            >
              {visibleProjects.map((project, idx) => {
                const isSelected = project.slug === activeProject?.slug;
                const num = String(idx + 1).padStart(2, "0");
                const typeStyle = projectTypeStyles[project.type];

                return (
                  <button
                    key={project.slug}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSlug(project.slug)}
                    className={cn(
                      "group flex shrink-0 items-center justify-between gap-3 rounded-xl border px-3 py-1.5 text-left transition-all lg:w-full",
                      isSelected
                        ? "border-accent/45 bg-accent/10 text-fg shadow-[0_1px_2px_rgba(15,118,110,0.08)]"
                        : "border-transparent bg-panel-2/40 text-muted hover:border-line hover:bg-panel-2/75 hover:text-fg lg:bg-transparent",
                    )}
                  >
                    <div className="flex min-w-0 items-baseline gap-2.5">
                      <span
                        className={cn(
                          "shrink-0 font-mono text-xs font-bold tabular-nums",
                          isSelected
                            ? "text-accent dark:text-accent-soft"
                            : "text-faint",
                        )}
                      >
                        {num}
                      </span>
                      <div className="min-w-0">
                        <span
                          className={cn(
                            "block truncate text-sm leading-snug transition-colors",
                            isSelected
                              ? "font-semibold text-fg"
                              : "font-medium text-fg/85 group-hover:text-fg",
                          )}
                        >
                          {project.title}
                        </span>
                        <span className="mt-0.5 hidden flex-wrap items-center gap-1.5 text-[11.5px] leading-tight lg:flex">
                          <span className={cn("font-medium", typeStyle.text)}>
                            {project.type}
                          </span>
                          {project.company && (
                            <>
                              <span className="text-faint" aria-hidden="true">
                                ·
                              </span>
                              <span className="font-semibold text-accent dark:text-accent-soft">
                                {project.company}
                              </span>
                            </>
                          )}
                          <span className="text-faint" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-faint tabular-nums">
                            {project.year}
                          </span>
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className={cn(
                        "hidden shrink-0 transition-transform lg:block",
                        isSelected
                          ? "translate-x-0 text-accent opacity-100 dark:text-accent-soft"
                          : "-translate-x-1 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-75",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Sticky Editorial Showcase Card (tightly fitted, zero wasted space) */}
        <div role="tabpanel" className="lg:sticky lg:top-24">
          {!activeProject ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-line bg-panel p-8 text-center">
              <p className="font-display text-base font-bold text-fg">
                No project selected
              </p>
              <p className="mt-1 text-sm text-muted">
                Clear the search bar or switch filters to browse projects.
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-fg transition-colors hover:bg-accent-soft"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-line bg-panel p-5 shadow-[0_14px_38px_-18px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_44px_-18px_rgba(0,0,0,0.6)]"
              >
                {/* Widescreen Visual Preview */}
                <Link
                  to={`/projects/${activeProject.slug}`}
                  className="group relative block h-48 overflow-hidden rounded-xl border border-line bg-panel-2 sm:h-52"
                >
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt={activeProject.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                    </>
                  ) : (
                    <ProjectFallbackVisual project={activeProject} />
                  )}

                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-lg border border-line/60 bg-panel/90 px-2.5 py-1 text-xs font-semibold text-fg shadow-xs backdrop-blur-md transition-colors group-hover:border-accent/50 group-hover:text-accent dark:group-hover:text-accent-soft">
                    <span>Open full case study</span>
                    <ArrowUpRight size={13} className="text-accent dark:text-accent-soft" />
                  </span>
                </Link>

                {/* Title & Metadata */}
                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                    {activeTypeStyle && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 font-semibold",
                          activeTypeStyle.badge,
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            activeTypeStyle.dot,
                          )}
                        />
                        {activeProject.type}
                      </span>
                    )}

                    <CompanyName project={activeProject} />

                    <span className="inline-flex items-center gap-1 rounded-md border border-line bg-panel-2 px-2.5 py-0.5 font-medium text-muted tabular-nums">
                      <Calendar size={11} className="text-faint" />
                      {activeProject.year}
                    </span>

                    {activeProject.duration && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-line bg-panel-2 px-2.5 py-0.5 font-medium text-muted">
                        <Clock size={11} className="text-faint" />
                        {activeProject.duration}
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-fg sm:text-[1.65rem]">
                      <Link
                        to={`/projects/${activeProject.slug}`}
                        className="transition-colors hover:text-accent dark:hover:text-accent-soft"
                      >
                        {activeProject.title}
                      </Link>
                    </h3>
                    <p className="text-xs font-semibold tracking-wide text-accent/90 dark:text-accent-soft/90">
                      {activeProject.categories.join(" · ")}
                    </p>
                  </div>

                  {/* Tagline & Description */}
                  <p className="mt-2 text-sm font-semibold leading-snug text-fg">
                    {activeProject.tagline}
                  </p>

                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
                    {activeProject.solution}
                  </p>

                  {/* Clean Tech Stack Chips */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-panel-2/75 px-2 py-0.5 font-mono text-[11px] font-medium text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Bar — directly below content with zero wasted space */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-line pt-3.5">
                  <Link
                    to={`/projects/${activeProject.slug}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-4 text-xs font-semibold text-accent-fg shadow-sm shadow-accent/20 transition-colors hover:bg-accent-soft"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight size={14} />
                  </Link>

                  <CodeSource
                    href={activeProject.github}
                    confidential={activeProject.codeConfidential}
                    note={activeProject.sourceNote}
                    variant="button"
                  />

                  <NotebookLink
                    href={activeProject.notebook}
                    variant="button"
                  />

                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-panel px-3.5 text-xs font-semibold text-muted transition-colors hover:border-accent/50 hover:text-fg"
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
