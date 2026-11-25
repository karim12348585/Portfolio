import { Building2, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/utils/cn";

/** The company/client a project was built for — rendered as a clear colored badge, linked when it has a URL. */
export function CompanyName({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  if (!project.company) return null;

  const badgeStyle = cn(
    "inline-flex items-center gap-1.5 rounded-md border border-accent/35 bg-accent/12 px-2.5 py-0.5 font-sans text-xs font-semibold text-accent dark:border-accent-soft/35 dark:bg-accent/15 dark:text-accent-soft",
    className,
  );

  if (!project.companyUrl) {
    return (
      <span className={badgeStyle}>
        <Building2 size={12} className="shrink-0" />
        <span>{project.company}</span>
      </span>
    );
  }

  return (
    <a
      href={project.companyUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        badgeStyle,
        "transition-colors hover:border-accent/65 hover:bg-accent/20",
      )}
    >
      <Building2 size={12} className="shrink-0" />
      <span>{project.company}</span>
      <ExternalLink size={11} className="shrink-0 opacity-80" />
    </a>
  );
}
