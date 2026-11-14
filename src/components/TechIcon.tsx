import {
  siDocker,
  siFastapi,
  siFlask,
  siGit,
  siHuggingface,
  siLanggraph,
  siMeta,
  siModelcontextprotocol,
  siNeo4j,
  siOptuna,
  siPandas,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSelenium,
  type SimpleIcon,
} from "simple-icons";
import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  ChartColumnBig,
  ChartScatter,
  Cloud,
  Cpu,
  Database,
  DatabaseZap,
  Dice5,
  Dices,
  Eye,
  Filter,
  Gamepad2,
  Grid3x3,
  Hash,
  Infinity as InfinityIcon,
  Landmark,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Network,
  RefreshCcw,
  Scale,
  ScanEye,
  ScanSearch,
  Scissors,
  Server,
  Shapes,
  Shuffle,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  SquareTerminal,
  Tags,
  TrendingUp,
  Waves,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Real brand logos (simple-icons, imported individually so only these ship).
 * Keyed by the short name used in data files.
 */
const brands: Record<string, SimpleIcon> = {
  docker: siDocker,
  fastapi: siFastapi,
  flask: siFlask,
  git: siGit,
  huggingface: siHuggingface,
  langgraph: siLanggraph,
  meta: siMeta,
  mcp: siModelcontextprotocol,
  neo4j: siNeo4j,
  optuna: siOptuna,
  pandas: siPandas,
  python: siPython,
  pytorch: siPytorch,
  react: siReact,
  scikitlearn: siScikitlearn,
  selenium: siSelenium,
};

/** Symbol icons for concepts that have no logo (statistics, ReAct, …). */
const glyphs: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  ChartColumnBig,
  ChartScatter,
  Cloud,
  Cpu,
  Database,
  DatabaseZap,
  Dice5,
  Dices,
  Eye,
  Filter,
  Gamepad2,
  Grid3x3,
  Hash,
  Infinity: InfinityIcon,
  Landmark,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Network,
  RefreshCcw,
  Scale,
  ScanEye,
  ScanSearch,
  Scissors,
  Server,
  Shapes,
  Shuffle,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  SquareTerminal,
  Tags,
  TrendingUp,
  Waves,
  Waypoints,
  Workflow,
};

/** Relative luminance of a hex colour (WCAG formula). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getBrand(key?: string) {
  return key ? brands[key] : undefined;
}

/**
 * Brand colour for a logo, or undefined when the brand colour is too dark to
 * read on the dark theme — those logos inherit the text colour instead.
 */
export function brandColor(icon: SimpleIcon) {
  return luminance(icon.hex) < 0.06 ? undefined : `#${icon.hex}`;
}

interface TechIconProps {
  /** Key into the brand-logo registry. Takes priority over `glyph`. */
  brand?: string;
  /** Lucide icon name for concepts without a logo. */
  glyph?: string;
  /** "brand" paints the logo in its own colour; "mono" inherits currentColor. */
  tone?: "brand" | "mono";
  size?: number;
  className?: string;
}

/** Renders a real brand logo when available, otherwise a symbol icon. */
export function TechIcon({
  brand,
  glyph,
  tone = "brand",
  size = 20,
  className,
}: TechIconProps) {
  const logo = getBrand(brand);
  if (logo) {
    const color = tone === "brand" ? brandColor(logo) : undefined;
    return (
      <svg
        role="img"
        aria-label={logo.title}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={cn(tone === "brand" && !color && "text-fg", className)}
        style={color ? { color } : undefined}
      >
        <path d={logo.path} fill="currentColor" />
      </svg>
    );
  }
  const Glyph = (glyph && glyphs[glyph]) || Sparkles;
  return <Glyph size={size} className={className} aria-hidden />;
}
