import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Target,
  TrendingUp,
  Boxes,
  Workflow,
  ListChecks,
  Scale,
  GraduationCap,
  Rocket,
  Image as ImageIcon,
} from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { PageTransition } from "@/layout/PageTransition";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GradientMesh } from "@/components/GradientMesh";
import { NotFound } from "./NotFound";
import { cn } from "@/utils/cn";

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-28"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
          <Icon size={18} />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
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
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className="rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm text-fg/90">
            <span className="mr-2 text-xs font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </div>
          {i < steps.length - 1 && (
            <ArrowRight size={16} className="shrink-0 text-faint" />
          )}
        </div>
      ))}
    </div>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <NotFound />;

  const cs = project.caseStudy;
  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];

  return (
    <PageTransition>
      {/* Hero */}
      <header className="relative overflow-hidden pt-28">
        <GradientMesh />
        <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
        <div className="section relative z-10 pb-10">
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} />
            Back to projects
          </Link>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.categories.map((c) => (
              <Badge key={c} variant="accent">
                {c}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-faint">
              {project.year} · {project.level}
            </span>
            <div className="flex gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="secondary">
                    <Github size={15} />
                    Code
                  </Button>
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">
                    <ExternalLink size={15} />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Banner */}
          <div
            className={cn(
              "relative mt-10 flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br",
              project.accent,
            )}
          >
            <div className="absolute inset-0 grid-lines opacity-25" />
            <span className="text-7xl font-black text-black/15 sm:text-8xl">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="section grid gap-14 py-6 lg:grid-cols-[1fr_260px]">
        <div className="space-y-14">
          <Block icon={Target} title="Overview">
            <p>{cs.overview}</p>
          </Block>

          <Block icon={Target} title="Problem Statement">
            <p>{cs.problemStatement}</p>
          </Block>

          <Block icon={TrendingUp} title="Business Value">
            <BulletList items={cs.businessValue} />
          </Block>

          <Block icon={Boxes} title="Architecture">
            <p>{cs.architecture}</p>
            <div className="mt-5 rounded-2xl border border-dashed border-line bg-panel-2 p-8 text-center">
              <Boxes size={28} className="mx-auto text-accent" />
              <p className="mt-3 text-sm text-faint">
                Architecture diagram placeholder — drop a diagram image here.
              </p>
            </div>
          </Block>

          <Block icon={Workflow} title="System Design">
            <BulletList items={cs.systemDesign} />
          </Block>

          <Block icon={Workflow} title="Pipeline">
            <Steps steps={cs.pipeline} />
          </Block>

          <Block icon={ImageIcon} title="Screenshots">
            <div className="grid gap-4 sm:grid-cols-2">
              {cs.screenshots.map((sc) => (
                <figure
                  key={sc.label}
                  className="overflow-hidden rounded-2xl border border-line bg-panel-2"
                >
                  <div
                    className={cn(
                      "flex aspect-video items-center justify-center bg-gradient-to-br",
                      project.accent,
                    )}
                  >
                    <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-black/80 backdrop-blur">
                      {sc.label}
                    </span>
                  </div>
                  <figcaption className="px-4 py-3 text-xs text-faint">
                    {sc.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Block>

          <Block icon={ListChecks} title="Engineering Challenges">
            <BulletList items={cs.challenges} />
          </Block>

          <Block icon={Scale} title="Tradeoffs">
            <BulletList items={cs.tradeoffs} />
          </Block>

          <Block icon={GraduationCap} title="Lessons Learned">
            <BulletList items={cs.lessons} />
          </Block>

          <Block icon={Rocket} title="Future Improvements">
            <BulletList items={cs.futureWork} />
          </Block>
        </div>

        {/* Sticky sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-faint">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge key={t} variant="accent">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-faint">
                Results
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-muted">
                    <TrendingUp
                      size={15}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <div className="section pb-10">
        <Link
          to={`/projects/${next.slug}`}
          className="group flex items-center justify-between rounded-2xl border border-line bg-panel p-6 transition-all hover:border-accent/40 hover:shadow-glow"
        >
          <div>
            <span className="text-xs text-faint">Next project</span>
            <p className="mt-1 text-lg font-semibold group-hover:text-accent">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={22}
            className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </div>
    </PageTransition>
  );
}
