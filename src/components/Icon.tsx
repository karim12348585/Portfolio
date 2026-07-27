import {
  Bot,
  Sparkles,
  Database,
  MessageSquare,
  Eye,
  BrainCircuit,
  Cloud,
  Server,
  LayoutDashboard,
  Mail,
  Linkedin,
  Github,
  Trophy,
  Rocket,
  Compass,
  Gauge,
  Users,
  Sigma,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

/**
 * Curated registry of the only icons referenced by string name in data files.
 * Avoids importing the entire lucide-react barrel (which bloats the bundle).
 */
const registry: Record<string, ComponentType<LucideProps>> = {
  Bot,
  Sparkles,
  Database,
  MessageSquare,
  Eye,
  BrainCircuit,
  Cloud,
  Server,
  LayoutDashboard,
  Mail,
  Linkedin,
  Github,
  Trophy,
  Rocket,
  Compass,
  Gauge,
  Users,
  Sigma,
};

interface IconProps extends LucideProps {
  name: string;
}

/** Render a Lucide icon by its string name (from data files). */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = registry[name];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
