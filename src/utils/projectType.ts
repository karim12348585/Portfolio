import type { ProjectType } from "@/types";

interface TypeStyle {
  label: string;
  /** Badge on cards / detail (border + bg + text). */
  badge: string;
  /** Solid text color for inline meta. */
  text: string;
  /** Dot / accent color. */
  dot: string;
  /** Overlay badge on the card banner (readable on the gradient). */
  overlay: string;
}

/** Distinct color per project category. Industrial = emerald, Academic = violet. */
export const projectTypeStyles: Record<ProjectType, TypeStyle> = {
  Industrial: {
    label: "Industrial",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    overlay: "border-emerald-300/40 bg-emerald-950/40 text-emerald-100",
  },
  Academic: {
    label: "Academic",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    text: "text-violet-400",
    dot: "bg-violet-400",
    overlay: "border-violet-300/40 bg-violet-950/40 text-violet-100",
  },
};
