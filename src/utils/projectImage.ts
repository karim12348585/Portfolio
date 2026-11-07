import type { Project } from "@/types";

export interface ProjectImage {
  src: string;
  caption: string;
  /** True for a designed cover: crop around the upper-middle, not the top edge. */
  isCover?: boolean;
}

/**
 * The lead visual for a project: its dedicated cover, else its first
 * screenshot, else its first architecture diagram, else null (fall back to
 * the gradient monogram). Shared by the project cards and the detail-page
 * banner so they match.
 */
export function getHeroImage(project: Project): ProjectImage | null {
  if (project.cover) {
    return { src: project.cover, caption: project.title, isCover: true };
  }
  const { screenshots, diagrams } = project.caseStudy;
  if (screenshots.length > 0) {
    return { src: screenshots[0].src, caption: screenshots[0].caption };
  }
  if (diagrams && diagrams.length > 0) {
    return { src: diagrams[0].src, caption: diagrams[0].caption };
  }
  return null;
}
