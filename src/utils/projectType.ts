import type { ProjectType } from "@/types";

interface TypeStyle {
  label: string;
  /** Tag on cards / detail (border + text). */
  badge: string;
  /** Solid text color for inline meta. */
  text: string;
  /** Small square swatch colour. */
  dot: string;
  /** Tag placed over an image. */
  overlay: string;
}

/**
 * One swatch colour per project type, kept inside the paper palette:
 * Industrial carries the signal accent, Freelance an ochre, Academic a
 * slate blue. Tags themselves stay ink-on-paper so the swatch does the work.
 */
export const projectTypeStyles: Record<ProjectType, TypeStyle> = {
  Industrial: {
    label: "Industrial",
    badge: "border-line text-fg",
    text: "text-accent",
    dot: "bg-accent",
    overlay: "border-line bg-bg/90 text-fg",
  },
  Freelance: {
    label: "Freelance",
    badge: "border-line text-fg",
    text: "text-[#B8860B]",
    dot: "bg-[#C9A227]",
    overlay: "border-line bg-bg/90 text-fg",
  },
  Academic: {
    label: "Academic",
    badge: "border-line text-fg",
    text: "text-[#5B7B99]",
    dot: "bg-[#5B7B99]",
    overlay: "border-line bg-bg/90 text-fg",
  },
};
