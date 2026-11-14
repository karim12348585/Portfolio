import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

/** The company/client a project was built for — a link when it has a URL. */
export function CompanyName({ project }: { project: Project }) {
  if (!project.company) return null;
  if (!project.companyUrl) {
    return <span className="font-medium text-fg">{project.company}</span>;
  }
  return (
    <a
      href={project.companyUrl}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="link-underline inline-flex items-center gap-0.5 font-medium text-fg transition-colors hover:text-accent"
    >
      {project.company}
      <ArrowUpRight size={11} className="opacity-70" />
    </a>
  );
}
