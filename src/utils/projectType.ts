import type { ProjectType } from "@/types";

interface TypeStyle {
  label: string;
  /** Badge on cards / detail (border + bg + text), accessible in light & dark mode. */
  badge: string;
  /** Solid text color for inline meta. */
  text: string;
  /** Dot / accent color. */
  dot: string;
  /** Overlay badge on the card banner (readable on the gradient). */
  overlay: string;
}

/**
 * Distinct colour per project category. Industrial carries the brand royal violet;
 * Academic uses emerald; Freelance uses amber — all clearly separable, and
 * none collides with the rose confidential source indicator.
 */
export const projectTypeStyles: Record<ProjectType, TypeStyle> = {
  Industrial: {
    label: "Industrial",
    badge:
      "border-sky-500/35 bg-sky-500/12 text-sky-700 dark:border-sky-400/35 dark:bg-sky-400/15 dark:text-sky-300",
    text: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500 dark:bg-sky-400",
    overlay: "border-sky-300/40 bg-zinc-950/60 text-sky-100",
  },
  Academic: {
    label: "Academic",
    badge:
      "border-emerald-500/35 bg-emerald-500/12 text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/15 dark:text-emerald-300",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    overlay: "border-emerald-300/40 bg-zinc-950/60 text-emerald-100",
  },
  Freelance: {
    label: "Freelance",
    badge:
      "border-amber-500/35 bg-amber-500/12 text-amber-700 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500 dark:bg-amber-400",
    overlay: "border-amber-300/40 bg-zinc-950/60 text-amber-100",
  },
};
