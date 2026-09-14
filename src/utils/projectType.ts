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
 * Distinct colour per project category. Industrial carries the brand amber;
 * Academic uses a cool slate-blue so the two read apart at a glance.
 */
export const projectTypeStyles: Record<ProjectType, TypeStyle> = {
  Industrial: {
    label: "Industrial",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    text: "text-amber-400",
    dot: "bg-amber-400",
    overlay: "border-amber-300/40 bg-stone-950/55 text-amber-100",
  },
  Academic: {
    label: "Academic",
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    text: "text-sky-400",
    dot: "bg-sky-400",
    overlay: "border-sky-300/40 bg-stone-950/55 text-sky-100",
  },
};
