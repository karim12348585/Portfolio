import { ExternalLink } from "lucide-react";
import type { Project } from "@/types";

/** The company/client a project was built for — a link when it has a URL. */
export function CompanyName({ project }: { project: Project }) {
  if (!project.company) return null;
  if (!project.companyUrl) {
    return <span className="font-medium text-fg/80">{project.company}</span>;
  }
  return (
    <a
      href={project.companyUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-medium text-fg/80 underline decoration-line underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
    >
      {project.company}
      <ExternalLink size={11} className="opacity-60" />
    </a>
  );
}
