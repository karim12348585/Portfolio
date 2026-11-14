import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ListChecks,
  Scale,
  GraduationCap,
  Rocket,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { PageTransition } from "@/layout/PageTransition";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeSource } from "@/components/CodeSource";
import { CompanyName } from "@/components/CompanyName";
import { NotebookLink } from "@/components/NotebookLink";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";
import { projectTypeStyles } from "@/utils/projectType";
import { getHeroImage } from "@/utils/projectImage";
import { NotFound } from "./NotFound";
import { cn } from "@/utils/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered chapter block: ink rule, index in the margin, title, body. */
function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-28 border-t border-fg pt-4"
    >
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">
          {index}
        </span>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="text-[15px] leading-relaxed text-muted">{children}</div>
    </motion.section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden className="mt-[0.75rem] h-px w-4 shrink-0 bg-fg/60" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** A numbered figure plate: mono header, zoomable image, caption. */
function Figure({
  number,
  label,
  caption,
  src,
  onZoom,
  fit = "natural",
}: {
  number: string;
  label: string;
  caption: string;
  src: string;
  onZoom: () => void;
  /** "cover" crops to 16:10 for gallery grids; "natural" keeps the aspect. */
  fit?: "cover" | "natural";
}) {
  return (
    <figure className="group border border-line bg-panel">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
        <span className="shrink-0 text-fg">{number}</span>
        <span className="truncate">{label}</span>
      </div>
      <button
        type="button"
        onClick={onZoom}
        className="relative block w-full cursor-zoom-in overflow-hidden bg-white"
      >
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className={cn(
            "w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]",
            fit === "cover" ? "aspect-[16/10] object-cover object-top" : "h-auto",
          )}
        />
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center border border-line bg-bg/90 text-fg opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 size={14} />
        </span>
      </button>
      <figcaption className="px-3 py-2.5 text-xs leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

interface ReflectionTab {
  icon: React.ElementType;
  title: string;
  items: string[];
}

/**
 * Tradeoffs / lessons / next steps as one tabbed table: a single list is
 * shown at a time, so the section stays short while every item is a click
 * away.
 */
function ReflectionTabs({ tabs }: { tabs: ReflectionTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[Math.min(active, tabs.length - 1)];
  const CurrentIcon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="border-t border-fg pt-4"
    >
      <div role="tablist" className="flex gap-6 overflow-x-auto border-b border-line no-scrollbar">
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
                "relative flex shrink-0 items-baseline gap-1.5 pb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
                isActive ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {t.title}
              <span
                className={cn(
                  "text-[10px]",
                  isActive ? "text-accent" : "text-faint",
                )}
              >
                {t.items.length}
              </span>
              {isActive && (
                <motion.span
                  layoutId="reflection-tab"
                  className="absolute inset-x-0 -bottom-px h-px bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <ul role="tabpanel" className="divide-y divide-line">
        {current.items.map((it) => (
          <li
            key={it}
            className="flex gap-3 py-3 text-sm leading-relaxed text-muted"
          >
            <CurrentIcon size={14} className="mt-1 shrink-0 text-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * Compact challenge → solution table. Rows show only the challenge; the
 * solution expands on click. "Expand all" opens everything at once.
 */
function SolvedChallengesTable({
  items,
}: {
  items: { challenge: string; solution: string }[];
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const allOpen = open.size === items.length;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="border-b border-line">
      <div className="flex items-center justify-between gap-3 border-b border-line py-2">
        <span className="mono-label">
          {items.length} challenges · click a row for the solution
        </span>
        <button
          type="button"
          onClick={() =>
            setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))
          }
          className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent hover:text-accent-soft"
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
                className="flex w-full items-start gap-4 py-3.5 text-left transition-colors hover:bg-panel"
              >
                <span className="w-6 shrink-0 pt-0.5 font-mono text-[11px] text-accent">
                  {pad(i + 1)}
                </span>
                <span className="flex-1 text-sm font-medium text-fg">
                  {c.challenge}
                </span>
                <ChevronDown
                  size={15}
                  className={cn(
                    "mt-0.5 shrink-0 text-faint transition-transform duration-200",
                    isOpen && "rotate-180 text-accent",
                  )}
                />
              </button>
              {/* grid-rows trick animates height without measuring */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="flex gap-3 pb-4 pl-10 pr-8 text-sm leading-relaxed text-muted">
                    <span className="shrink-0 font-mono text-accent">→</span>
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
  const next = projects[(idx + 1) % projects.length];
  const type = projectTypeStyles[project.type];

  const hasSolved = (cs.solvedChallenges?.length ?? 0) > 0;
  // Reflection tabs with content. Plain challenges only appear as a tab when
  // the project has no solved-challenges table.
  const reflections: ReflectionTab[] = [
    { icon: ListChecks, title: "Challenges", items: hasSolved ? [] : cs.challenges },
    { icon: Scale, title: "Tradeoffs", items: cs.tradeoffs },
    { icon: GraduationCap, title: "Lessons learned", items: cs.lessons },
    { icon: Rocket, title: "What's next", items: cs.futureWork },
  ].filter((r) => r.items.length > 0);

  // Lead with a real image (shared with the project cards). The gallery below
  // still shows every visual, including the one used as the hero.
  const allDiagrams = cs.diagrams ?? [];
  const hero = getHeroImage(project);
  const heroImage: LightboxImage | null = hero
    ? { src: hero.src, caption: hero.caption }
    : null;
  const galleryShots = cs.screenshots;
  const hasGallery = galleryShots.length > 0;

  // Running numbers for chapters and figures, assigned in reading order.
  let chapter = 0;
  const nextChapter = () => pad(++chapter);
  let figure = hero ? 1 : 0;
  const nextFigure = () => `Fig. ${pad(++figure)}`;

  return (
    <PageTransition>
      {/* Header */}
      <header className="relative overflow-hidden pt-28">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        />
        <div className="section relative pb-10">
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to projects
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-10">
              <div className="flex flex-wrap gap-1.5">
                {project.categories.map((c) => (
                  <Badge key={c} variant="accent">
                    {c}
                  </Badge>
                ))}
              </div>

              <h1 className="font-condensed mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {project.tagline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                <span className="inline-flex items-center gap-1.5 border border-line px-2 py-[3px] text-fg">
                  <span className={cn("h-1.5 w-1.5", type.dot)} />
                  {project.type}
                </span>
                {project.company && (
                  <>
                    <CompanyName project={project} />
                    <span>·</span>
                  </>
                )}
                <span>{project.year}</span>
                {project.duration && (
                  <>
                    <span>·</span>
                    <span>{project.duration}</span>
                  </>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <CodeSource
                  href={project.github}
                  confidential={project.codeConfidential}
                  note={project.sourceNote}
                  variant="button"
                />
                <NotebookLink href={project.notebook} variant="button" />
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="secondary">
                      <ArrowUpRight size={13} />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero figure */}
          {heroImage && (
            <figure className="group mt-12 border border-fg p-1.5">
              <button
                type="button"
                onClick={() => setZoom(heroImage)}
                className="relative block w-full cursor-zoom-in overflow-hidden bg-panel-2"
              >
                <img
                  src={heroImage.src}
                  alt={project.title}
                  className={cn(
                    "aspect-[21/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]",
                    hero?.isCover ? "object-[center_30%]" : "object-top",
                  )}
                />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-line bg-bg/90 text-fg opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 size={15} />
                </span>
              </button>
              <figcaption className="flex items-center justify-between gap-4 px-1 pb-0.5 pt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                <span className="shrink-0 text-fg">Fig. 01</span>
                <span className="truncate">{heroImage.caption}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="section grid gap-14 py-8 lg:grid-cols-[1fr_260px] lg:gap-16">
        <div className="space-y-14">
          <Block index={nextChapter()} title="Overview">
            <p>{cs.problemStatement}</p>
            <p className="mt-4">{cs.overview}</p>
          </Block>

          {/* Screenshots — visual proof, high up for credibility */}
          {hasGallery && (
            <Block index={nextChapter()} title="See it in action">
              <p className="-mt-1 mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                Real captures from the running system — click any to enlarge.
              </p>
              <div
                className={cn(
                  "grid gap-5",
                  galleryShots.length > 1 && "sm:grid-cols-2",
                )}
              >
                {galleryShots.map((sc) => (
                  <Figure
                    key={sc.src}
                    number={nextFigure()}
                    label={sc.label}
                    caption={sc.caption}
                    src={sc.src}
                    fit={galleryShots.length > 1 ? "cover" : "natural"}
                    onZoom={() => setZoom({ src: sc.src, caption: sc.caption })}
                  />
                ))}
              </div>
            </Block>
          )}

          {/* Benchmarks — headline numbers, then the charts behind them */}
          {cs.benchmarks && (
            <Block index={nextChapter()} title="Benchmarks & Evaluation">
              {cs.benchmarks.intro && (
                <p className="mb-5">{cs.benchmarks.intro}</p>
              )}
              <div className="ruled-grid sm:grid-cols-2">
                {cs.benchmarks.stats.map((s) => (
                  <div key={s.metric} className="p-4">
                    <p className="mono-label">{s.metric}</p>
                    <p className="font-condensed mt-2 text-3xl font-semibold tracking-[-0.02em] text-fg">
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
                <div key={c.src} className="mt-5">
                  <Figure
                    number={nextFigure()}
                    label="Benchmark"
                    caption={c.caption}
                    src={c.src}
                    onZoom={() => setZoom({ src: c.src, caption: c.caption })}
                  />
                </div>
              ))}
            </Block>
          )}

          {/* Architecture + system design, with the diagram in context */}
          <Block index={nextChapter()} title="Architecture & System Design">
            <p>{cs.architecture}</p>

            {allDiagrams.length > 0 && (
              <div className="mt-6 space-y-5">
                {allDiagrams.map((d) => (
                  <Figure
                    key={d.src}
                    number={nextFigure()}
                    label="Architecture diagram"
                    caption={d.caption}
                    src={d.src}
                    onZoom={() => setZoom({ src: d.src, caption: d.caption })}
                  />
                ))}
              </div>
            )}

            <div className="mt-6">
              <BulletList items={cs.systemDesign} />
            </div>
          </Block>

          <Block index={nextChapter()} title="Business Value">
            <BulletList items={cs.businessValue} />
          </Block>

          {/* Challenges solved — problem → fix pairs in an expandable table */}
          {hasSolved && (
            <Block index={nextChapter()} title="Challenges & How They Were Solved">
              <SolvedChallengesTable
                key={project.id}
                items={cs.solvedChallenges ?? []}
              />
            </Block>
          )}

          {/* Tradeoffs / lessons / next steps — one tabbed table */}
          {reflections.length > 0 && (
            <ReflectionTabs key={project.id} tabs={reflections} />
          )}
        </div>

        {/* Margin column */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div className="border-t border-fg pt-3">
              <h3 className="mono-label text-fg">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <div className="border-t border-fg pt-3">
              <h3 className="mono-label text-fg">Results</h3>
              <ul className="mt-3 divide-y divide-line">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-2.5 py-2.5 text-sm text-muted">
                    <span className="shrink-0 font-mono text-accent">+</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <div className="section pb-10 pt-6">
        <Link
          to={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-6 border-y border-fg py-6"
        >
          <div>
            <span className="mono-label">Next project</span>
            <p className="font-condensed mt-1.5 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              <span className="link-underline">{next.title}</span>
            </p>
          </div>
          <ArrowRight
            size={22}
            className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </div>

      <Lightbox image={zoom} onClose={() => setZoom(null)} />
    </PageTransition>
  );
}
