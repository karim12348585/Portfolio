import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Compass,
  ExternalLink,
  Layers,
  Maximize2,
  CheckCircle2,
  ChevronDown,
  Target,
} from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { PageTransition } from "@/layout/PageTransition";
import { Button } from "@/components/ui/Button";
import { CodeSource } from "@/components/CodeSource";
import { CompanyName } from "@/components/CompanyName";
import { NotebookLink } from "@/components/NotebookLink";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { getHeroImage } from "@/utils/projectImage";
import { projectTypeStyles } from "@/utils/projectType";
import { getCaseStudySectionPlan } from "@/utils/portfolioLogic";
import { NotFound } from "./NotFound";
import { cn } from "@/utils/cn";

function SectionBlock({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0"
    >
      <p className="font-mono text-xs font-medium text-accent">{label}</p>
      <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-fg">
        {title}
      </h2>
      <div className="mt-5 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </motion.section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden="true" className="font-mono text-accent">
            —
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

interface ReflectionTab {
  title: string;
  items: string[];
}

function ReflectionTabs({ tabs }: { tabs: ReflectionTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[Math.min(active, tabs.length - 1)];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div role="tablist" className="flex border-b border-line bg-panel-2 p-1">
        {tabs.map((t, i) => {
          const isActive = t === current;
          return (
            <button
              key={t.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:text-sm",
                isActive
                  ? "bg-panel text-fg shadow-xs"
                  : "text-muted hover:text-fg",
              )}
            >
              <span>{t.title}</span>
              <span
                className={cn(
                  "font-mono text-[11px] tabular-nums",
                  isActive ? "text-accent" : "text-faint",
                )}
              >
                {t.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <ul role="tabpanel" className="divide-y divide-line">
        {current.items.map((it) => (
          <li
            key={it}
            className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed text-muted"
          >
            <span aria-hidden="true" className="font-mono text-accent">
              ·
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SolvedChallengesTable({
  items,
}: {
  items: { challenge: string; solution: string }[];
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const allOpen = open.size === items.length;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel-2 px-4 py-2.5">
        <span className="font-mono text-xs text-faint tabular-nums">
          {items.length} engineering challenges · select any row to inspect resolution
        </span>
        <button
          type="button"
          onClick={() =>
            setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))
          }
          className="shrink-0 font-mono text-xs font-medium text-accent transition-colors hover:text-accent-soft"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ul className="divide-y divide-line">
        {items.map((c, i) => {
          const isOpen = open.has(i);
          return (
            <li key={c.challenge}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-panel-2/60"
              >
                <span className="font-mono text-xs font-semibold text-accent tabular-nums">
                  0{i + 1}
                </span>
                <span className="flex-1 text-sm font-semibold text-fg">
                  {c.challenge}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "shrink-0 text-faint transition-transform duration-150",
                    isOpen && "rotate-180 text-accent",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="flex gap-2.5 border-t border-line/50 bg-panel-2/30 px-4 py-3.5 pl-11 text-sm leading-relaxed text-muted">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span>{c.solution}</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [zoom, setZoom] = useState<LightboxImage | null>(null);

  if (!project) return <NotFound />;

  const cs = project.caseStudy;
  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const hasSolved = (cs.solvedChallenges?.length ?? 0) > 0;
  const reflections: ReflectionTab[] = [
    { title: "Challenges", items: hasSolved ? [] : cs.challenges },
    { title: "Tradeoffs", items: cs.tradeoffs },
    { title: "Lessons learned", items: cs.lessons },
    { title: "Future roadmap", items: cs.futureWork },
  ].filter((r) => r.items.length > 0);

  const allDiagrams = cs.diagrams ?? [];
  const hero = getHeroImage(project);
  const heroImage: LightboxImage | null = hero
    ? { src: hero.src, caption: hero.caption }
    : null;
  const galleryShots = cs.screenshots;
  const hasGallery = galleryShots.length > 0;

  const sectionPlan = getCaseStudySectionPlan(cs);
  const sectionNumber = Object.fromEntries(
    sectionPlan.map((s) => [s.id, s.number]),
  );
  const showPipeline = Boolean(sectionNumber.pipeline);

  const typeStyle = projectTypeStyles[project.type];

  return (
    <PageTransition>
      {/* Case Study Header — generous top padding clears the fixed navbar */}
      <header className="border-b border-line pt-24 pb-12 sm:pt-28">
        <div className="section">
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="relative z-10 inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3.5 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent/60 hover:text-accent dark:hover:text-accent-soft"
          >
            <ArrowLeft size={14} />
            <span>Back to all projects</span>
          </Link>

          <h1 className="mt-6 max-w-4xl text-balance font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl">
            {project.title}
          </h1>

          {/* Clear, Colored Normal-Font Metadata Under Title */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5 font-sans text-xs sm:text-sm">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-semibold",
                typeStyle.badge,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", typeStyle.dot)} />
              <span>{project.type}</span>
            </span>

            <CompanyName project={project} className="py-1 text-xs sm:text-sm" />

            <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel px-2.5 py-1 font-medium text-fg/85 tabular-nums">
              <Calendar size={13} className="text-muted" />
              <span>{project.year}</span>
            </span>

            {project.duration && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel px-2.5 py-1 font-medium text-fg/85">
                <Clock size={13} className="text-muted" />
                <span>{project.duration}</span>
              </span>
            )}
          </div>

          {/* Domains Row */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-md bg-panel-2 px-2.5 py-0.5 text-xs font-medium text-muted"
              >
                {cat}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <CodeSource
              href={project.github}
              confidential={project.codeConfidential}
              note={project.sourceNote}
              variant="button"
            />
            <NotebookLink href={project.notebook} variant="button" />
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline">
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </Button>
              </a>
            )}
          </div>

          {/* Compact Hero Visual Frame */}
          {heroImage && (
            <button
              type="button"
              onClick={() => setZoom(heroImage)}
              className="group relative mt-7 block w-full max-w-2xl cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-panel-2 text-left shadow-[0_14px_34px_-18px_rgba(15,23,42,0.18)] dark:shadow-[0_18px_38px_-18px_rgba(0,0,0,0.55)]"
            >
              <img
                src={heroImage.src}
                alt={project.title}
                referrerPolicy="no-referrer"
                className={cn(
                  "h-52 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] sm:h-60 md:h-64",
                  hero?.isCover ? "object-[center_30%]" : "object-top",
                )}
              />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 font-sans text-xs font-medium text-white backdrop-blur-xs">
                <Maximize2 size={13} />
                <span>Inspect</span>
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Case Study Body */}
      <div className="section grid gap-12 py-14 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <SectionBlock
            label={`${sectionNumber.overview} · Context & Motivation`}
            title="Overview"
          >
            <p className="text-fg/90">{cs.problemStatement}</p>
            <p className="mt-4">{cs.overview}</p>
          </SectionBlock>

          {hasGallery && (
            <SectionBlock
              label={`${sectionNumber.gallery} · System Interface & Outputs`}
              title="See It in Action"
            >
              <p className="mb-5 text-xs font-mono text-faint">
                Captures from the running system — select any frame to enlarge.
              </p>
              <div
                className={cn(
                  "grid gap-5",
                  galleryShots.length > 1 && "sm:grid-cols-2",
                )}
              >
                {galleryShots.map((sc) => (
                  <figure
                    key={sc.label}
                    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel"
                  >
                    <div className="flex items-center justify-between border-b border-line bg-panel-2 px-3.5 py-2">
                      <span className="truncate font-mono text-xs font-medium text-fg">
                        {sc.label}
                      </span>
                      <Maximize2 size={12} className="shrink-0 text-faint" />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setZoom({ src: sc.src, caption: sc.caption })
                      }
                      className="relative block w-full cursor-zoom-in overflow-hidden bg-panel-2"
                    >
                      <img
                        src={sc.src}
                        alt={sc.label}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={cn(
                          "w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]",
                          galleryShots.length > 1
                            ? "aspect-[16/10] object-cover object-top"
                            : "h-auto",
                        )}
                      />
                    </button>
                    <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted">
                      {sc.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </SectionBlock>
          )}

          {cs.benchmarks && (
            <SectionBlock
              label={`${sectionNumber.evaluation} · Quantitative Rigor`}
              title="Benchmarks & Evaluation"
            >
              {cs.benchmarks.intro && (
                <p className="mb-6">{cs.benchmarks.intro}</p>
              )}
              <div className="grid gap-3.5 sm:grid-cols-2">
                {cs.benchmarks.stats.map((s) => (
                  <div
                    key={s.metric}
                    className="rounded-lg border border-line bg-panel p-4"
                  >
                    <p className="font-mono text-xs text-faint">{s.metric}</p>
                    <p className="mt-1.5 font-mono text-2xl font-bold tracking-tight text-fg tabular-nums">
                      {s.value}
                    </p>
                    {s.detail && (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {s.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {cs.benchmarks.charts?.map((c) => (
                <figure
                  key={c.src}
                  className="group mt-6 overflow-hidden rounded-xl border border-line bg-panel"
                >
                  <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-2.5">
                    <span className="font-mono text-xs font-medium text-fg">
                      Evaluation Chart
                    </span>
                    <Maximize2 size={13} className="text-faint" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setZoom({ src: c.src, caption: c.caption })}
                    className="relative block w-full cursor-zoom-in bg-white p-2"
                  >
                    <img
                      src={c.src}
                      alt={c.caption}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full"
                    />
                  </button>
                  <figcaption className="border-t border-line px-4 py-3 text-xs text-muted">
                    {c.caption}
                  </figcaption>
                </figure>
              ))}
            </SectionBlock>
          )}

          <SectionBlock
            label={`${sectionNumber.architecture} · Engineering Design`}
            title="Architecture & System Design"
          >
            <p>{cs.architecture}</p>

            {allDiagrams.length > 0 && (
              <div className="mt-6 space-y-5">
                {allDiagrams.map((d) => (
                  <figure
                    key={d.src}
                    className="group overflow-hidden rounded-xl border border-line bg-panel"
                  >
                    <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-2.5">
                      <span className="font-mono text-xs font-medium text-fg">
                        System Architecture Diagram
                      </span>
                      <Maximize2 size={13} className="text-faint" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setZoom({ src: d.src, caption: d.caption })}
                      className="relative block w-full cursor-zoom-in bg-white p-3"
                    >
                      <img
                        src={d.src}
                        alt={d.caption}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full"
                      />
                    </button>
                    <figcaption className="border-t border-line px-4 py-3 text-xs text-muted">
                      {d.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            <div className="mt-6">
              <BulletList items={cs.systemDesign} />
            </div>
          </SectionBlock>

          {showPipeline && (
            <SectionBlock
              label={`${sectionNumber.pipeline} · Execution Flow`}
              title="End-to-End Pipeline"
            >
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cs.pipeline.map((step, i) => (
                  <li
                    key={step}
                    className="flex flex-col justify-between rounded-lg border border-line bg-panel p-4"
                  >
                    <span className="font-mono text-xs font-semibold text-accent tabular-nums">
                      Step 0{i + 1}
                    </span>
                    <p className="mt-2 text-sm font-medium leading-snug text-fg">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </SectionBlock>
          )}

          <SectionBlock
            label={`${sectionNumber.businessValue} · Practical Impact`}
            title="Business Value"
          >
            <BulletList items={cs.businessValue} />
          </SectionBlock>

          {hasSolved && (
            <SectionBlock
              label={`${sectionNumber.solvedChallenges} · Technical Obstacles`}
              title="Challenges & How They Were Solved"
            >
              <SolvedChallengesTable
                key={project.id}
                items={cs.solvedChallenges ?? []}
              />
            </SectionBlock>
          )}

          {reflections.length > 0 && (
            <SectionBlock
              label={`${sectionNumber.reflections} · Engineering Retrospectives`}
              title="Tradeoffs, Lessons & Roadmap"
            >
              <ReflectionTabs key={project.id} tabs={reflections} />
            </SectionBlock>
          )}
        </div>

        {/* Sticky Sidebar */}
        <aside>
          <div className="sticky top-24 space-y-5">
            {/* Key Outcomes & Results Card */}
            <div className="rounded-2xl border border-line bg-panel p-6 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.14)] dark:shadow-none">
              <div className="flex items-center gap-2.5 border-b border-line/80 pb-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent dark:border-accent-soft/25 dark:bg-accent/15 dark:text-accent-soft">
                  <Target size={14} strokeWidth={2.1} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[15px] font-bold tracking-tight text-fg">
                  Key Outcomes &amp; Results
                </h3>
              </div>

              <ul className="mt-4 space-y-3">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2.5 font-sans text-[13.5px] leading-relaxed text-fg/90"
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent dark:text-accent-soft"
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack & Domains Card */}
            <div className="rounded-2xl border border-line bg-panel p-6 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.14)] dark:shadow-none">
              <div className="flex items-center justify-between gap-2 border-b border-line/80 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent dark:border-accent-soft/25 dark:bg-accent/15 dark:text-accent-soft">
                    <Layers size={14} strokeWidth={2.1} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[15px] font-bold tracking-tight text-fg">
                    Technology Stack
                  </h3>
                </div>
                <span className="font-sans text-xs font-medium text-faint tabular-nums">
                  {project.tech.length} tools
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-line bg-panel-2/75 px-2.5 py-1 font-sans text-xs font-medium text-fg/90"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 border-t border-line/80 pt-4">
                <div className="flex items-center gap-2">
                  <Compass
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-accent dark:text-accent-soft"
                  />
                  <h4 className="font-display text-sm font-bold tracking-tight text-fg">
                    Domains
                  </h4>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-lg border border-accent/20 bg-accent/8 px-2.5 py-1 font-sans text-xs font-semibold text-accent dark:border-accent-soft/25 dark:bg-accent/15 dark:text-accent-soft"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Previous / Next Case Study Navigation */}
      <div className="section border-t border-line pt-10 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="group flex items-center justify-between rounded-xl border border-line bg-panel p-5 transition-colors hover:border-faint/60"
          >
            <div>
              <span className="font-mono text-xs text-faint">
                ← Previous case study
              </span>
              <p className="mt-1 font-display text-base font-bold text-fg transition-colors group-hover:text-accent">
                {prev.title}
              </p>
            </div>
          </Link>

          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between rounded-xl border border-line bg-panel p-5 text-right transition-colors hover:border-faint/60"
          >
            <div className="w-full">
              <span className="font-mono text-xs text-faint">
                Next case study →
              </span>
              <p className="mt-1 font-display text-base font-bold text-fg transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </div>
            <ArrowRight
              size={18}
              className="ml-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </Link>
        </div>
      </div>

      <Lightbox image={zoom} onClose={() => setZoom(null)} />
    </PageTransition>
  );
}
