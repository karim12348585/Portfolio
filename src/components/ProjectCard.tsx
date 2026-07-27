import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Target, Lightbulb } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
    >
      {/* Visual header */}
      <Link
        to={`/projects/${project.slug}`}
        className="relative block aspect-[16/9] overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            project.accent,
          )}
        />
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black text-black/15">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)}
          </span>
        </div>
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge className="border-black/10 bg-black/20 text-black/80 backdrop-blur">
            {project.level}
          </Badge>
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium text-black/80 backdrop-blur">
          {project.year}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {project.categories.slice(0, 3).map((c) => (
            <Badge key={c} variant="accent">
              {c}
            </Badge>
          ))}
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <div className="mt-3 space-y-2.5 text-sm">
          <p className="flex gap-2 text-muted">
            <Target size={15} className="mt-0.5 shrink-0 text-accent" />
            <span className="line-clamp-2">{project.problem}</span>
          </p>
          <p className="flex gap-2 text-muted">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-accent" />
            <span className="line-clamp-2">{project.solution}</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-panel-2 px-2 py-0.5 text-[11px] text-faint"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md px-2 py-0.5 text-[11px] text-faint">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
          >
            Case study
            <ArrowUpRight size={15} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-fg"
              aria-label="GitHub repository"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
