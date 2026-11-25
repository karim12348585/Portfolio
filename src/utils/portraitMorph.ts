export interface PortraitRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PortraitTransform {
  x: number;
  y: number;
  scale: number;
  rotateDeg: number;
  heroBadgeOpacity: number;
  aboutBadgeOpacity: number;
  glowOpacity: number;
  easedProgress: number;
}

/** Clamps a number to the closed [0, 1] interval. */
export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/** Quintic smootherstep easing for silky take-off and docking. */
export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/** Maps window scrollY into [0, 1] between startY (Hero) and endY (About). */
export function computeScrollProgress(
  scrollY: number,
  startY: number,
  endY: number,
): number {
  if (!Number.isFinite(scrollY) || !Number.isFinite(startY) || !Number.isFinite(endY)) {
    return 0;
  }
  const span = endY - startY;
  if (span <= 0) return scrollY >= endY ? 1 : 0;
  return clamp01((scrollY - startY) / span);
}

/**
 * Computes GPU-friendly top-left transform and badge crossfade opacities
 * for gliding the single framed portrait from Hero's right slot into About's left slot.
 */
export function computePortraitTransform(
  heroRect: PortraitRect,
  aboutRect: PortraitRect,
  rawProgress: number,
): PortraitTransform {
  const p = clamp01(rawProgress);
  const eased = smoothstep(p);

  const targetScale =
    heroRect.width > 0 ? aboutRect.width / heroRect.width : 1;

  const x = heroRect.left + (aboutRect.left - heroRect.left) * eased;
  const y = heroRect.top + (aboutRect.top - heroRect.top) * eased;
  const scale = 1 + (targetScale - 1) * eased;

  // Subtle counter-clockwise editorial glide tilt mid-flight, exact zero at both ends
  const rawRotate = -Math.sin(eased * Math.PI) * 2.2;
  const rotateDeg = Math.abs(rawRotate) < 1e-6 ? 0 : rawRotate;

  // Clean crossfade: Hero badge exits early, About badge enters as portrait docks
  const heroBadgeOpacity = clamp01(1 - p / 0.35);
  const aboutBadgeOpacity = clamp01((p - 0.65) / 0.35);
  const glowOpacity = 1 - 0.45 * eased;

  return {
    x,
    y,
    scale,
    rotateDeg,
    heroBadgeOpacity,
    aboutBadgeOpacity,
    glowOpacity,
    easedProgress: eased,
  };
}
