import type { Project } from "@/types";

export interface ProjectImage {
  src: string;
  caption: string;
}

/**
 * The lead visual for a project: its first screenshot, else its first
 * architecture diagram, else null (fall back to the gradient monogram).
 * Shared by the project cards and the detail-page banner so they match.
 */
export function getHeroImage(project: Project): ProjectImage | null {
  const { screenshots, diagrams } = project.caseStudy;
  if (screenshots.length > 0) {
    return { src: screenshots[0].src, caption: screenshots[0].caption };
  }
  if (diagrams && diagrams.length > 0) {
    return { src: diagrams[0].src, caption: diagrams[0].caption };
  }
  return null;
}
