import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { CodeSource } from "@/components/CodeSource";
import { CompanyName } from "@/components/CompanyName";
import { NotebookLink } from "@/components/NotebookLink";
import { projectTypeStyles } from "@/utils/projectType";
import { getHeroImage } from "@/utils/projectImage";
import { cn } from "@/utils/cn";

/**
 * One entry in the project index: a ruled row with the write-up on the left
 * and a numbered figure plate on the right.
 */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const hero = getHeroImage(project);
  const type = projectTypeStyles[project.type];
  const num = String(index + 1).padStart(2, "0");
  const href = `/projects/${project.slug}`;
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8"
    >
      {/* Figure plate — first on mobile, right column on desktop */}
      <Link
        to={href}
        className="order-1 md:order-2 md:col-span-5 lg:col-span-4"
        aria-label={`${project.title} case study`}
      >
        <figure>
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-panel-2">
            {hero ? (
              <img
                src={hero.src}
                alt={project.title}
                loading="lazy"
                className={cn(
                  "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                  hero.isCover ? "object-[center_30%]" : "object-top",
                )}
              />
            ) : (
              <div className="dot-grid flex h-full w-full items-center justify-center">
                <span className="font-narrow text-6xl font-semibold text-fg/15">
                  {initials}
                </span>
              </div>
            )}
            <span
              className={cn(
                "absolute left-2 top-2 inline-flex items-center gap-1.5 border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.1em]",
                type.overlay,
              )}
            >
              <span className={cn("h-1.5 w-1.5", type.dot)} />
              {project.type}
            </span>
            <span className="absolute right-2 top-2 border border-line bg-bg/90 px-2 py-[3px] font-mono text-[10px] tracking-[0.1em]">
              {project.year}
            </span>
          </div>
          <figcaption className="mt-2 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
            <span className="shrink-0">Fig. 03.{num}</span>
            <span className="truncate">{project.title}</span>
          </figcaption>
        </figure>
      </Link>

      {/* Write-up */}
      <div className="order-2 flex flex-col md:order-1 md:col-span-7 lg:col-span-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          <span className="font-medium text-accent">{num}</span>
          {project.company && <CompanyName project={project} />}
          {project.company && project.duration && <span>·</span>}
          {project.duration && <span>{project.duration}</span>}
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          <Link to={href} className="link-underline">
            {project.title}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.categories.slice(0, 3).map((c) => (
            <Badge key={c} variant="accent">
              {c}
            </Badge>
          ))}
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <dt className="mono-label">Problem</dt>
            <dd className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
              {project.problem}
            </dd>
          </div>
          <div>
            <dt className="mono-label">Solution</dt>
            <dd className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
              {project.solution}
            </dd>
          </div>
        </dl>

        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
          {project.tech.slice(0, 4).join(" · ")}
          {project.tech.length > 4 && (
            <span className="text-muted"> +{project.tech.length - 4}</span>
          )}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <Link
            to={href}
            className="group/cta inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg"
          >
            <span className="link-underline">Case study</span>
            <ArrowUpRight
              size={13}
              className="text-accent transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </Link>
          <div className="flex items-center gap-3">
            <NotebookLink href={project.notebook} variant="icon" />
            <CodeSource
              href={project.github}
              confidential={project.codeConfidential}
              note={project.sourceNote}
              variant="icon"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
