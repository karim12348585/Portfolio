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

/**
 * Distinct colour per project category. Industrial carries the brand violet;
 * Academic uses emerald — both cool, clearly separable, and neither collides
 * with the red "confidential source" indicator.
 */
export const projectTypeStyles: Record<ProjectType, TypeStyle> = {
  Industrial: {
    label: "Industrial",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    text: "text-violet-400",
    dot: "bg-violet-400",
    overlay: "border-violet-300/40 bg-zinc-950/55 text-violet-100",
  },
  Academic: {
    label: "Academic",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    overlay: "border-emerald-300/40 bg-zinc-950/55 text-emerald-100",
  },
};
