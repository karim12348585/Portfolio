import {
  Activity,
  BellRing,
  BrainCircuit,
  Cpu,
  Database,
  FileSearch,
  GitBranch,
  Layers,
  ScanFace,
  ServerCog,
  Share2,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Project, ProjectCategory } from "@/types";

const categoryIconMap: Record<ProjectCategory, LucideIcon> = {
  "Agentic AI": Workflow,
  LLM: BrainCircuit,
  RAG: Layers,
  "Computer Vision": ScanFace,
  NLP: FileSearch,
  "Recommendation Systems": Sparkles,
  "Data Engineering": Database,
  MLOps: ServerCog,
  "Machine Learning": Cpu,
  "Deep Learning": BrainCircuit,
  "Graph ML": Share2,
};

interface FallbackMeta {
  icon: LucideIcon;
  secondaryLeft?: LucideIcon;
  secondaryRight?: LucideIcon;
  label: string;
}

function getFallbackMeta(project: Project): FallbackMeta {
  switch (project.slug) {
    case "data-pipeline-monitoring":
      return {
        icon: Activity,
        secondaryLeft: Database,
        secondaryRight: BellRing,
        label: "SQL Server · GitHub · Jenkins · Jira",
      };
    case "ai-generated-face-detection":
      return {
        icon: ScanFace,
        secondaryLeft: Layers,
        secondaryRight: Sparkles,
        label: "Vision Transformer · LoRA · XAI Attribution",
      };
    case "ats-resume-filtering":
      return {
        icon: FileSearch,
        secondaryLeft: BrainCircuit,
        secondaryRight: GitBranch,
        label: "Gemini Extraction · SBERT · Similarity Ranking",
      };
    default: {
      const primary = project.categories[0];
      return {
        icon: (primary && categoryIconMap[primary]) || Cpu,
        label: project.categories.join(" · "),
      };
    }
  }
}

export function ProjectFallbackVisual({ project }: { project: Project }) {
  const {
    icon: MainIcon,
    secondaryLeft: LeftIcon,
    secondaryRight: RightIcon,
    label,
  } = getFallbackMeta(project);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-panel-2/90 via-panel to-bg px-6 text-center">
      {/* Subtle editorial square grid */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-70"
      />

      {/* Soft ambient teal halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-accent/12 blur-3xl transition-transform duration-500 group-hover:scale-110 dark:bg-accent-soft/15"
      />

      {/* Architectural icon cluster */}
      <div className="relative z-10 flex items-center gap-3.5">
        {LeftIcon && (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/90 text-muted shadow-xs backdrop-blur-xs transition-colors duration-300 group-hover:border-accent/35 group-hover:text-accent dark:group-hover:text-accent-soft">
              <LeftIcon size={18} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gradient-to-r from-line to-accent/50"
            />
          </>
        )}

        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/25 bg-panel text-accent shadow-[0_12px_28px_-12px_rgba(15,118,110,0.32)] transition-transform duration-300 group-hover:scale-105 dark:border-accent-soft/30 dark:bg-panel-2 dark:text-accent-soft dark:shadow-black/40">
          <MainIcon size={28} strokeWidth={1.75} aria-hidden="true" />
        </div>

        {RightIcon && (
          <>
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gradient-to-l from-line to-accent/50"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/90 text-muted shadow-xs backdrop-blur-xs transition-colors duration-300 group-hover:border-accent/35 group-hover:text-accent dark:group-hover:text-accent-soft">
              <RightIcon size={18} strokeWidth={1.75} aria-hidden="true" />
            </div>
          </>
        )}
      </div>

      {/* Concise domain caption */}
      <p className="relative z-10 mt-3.5 max-w-md font-sans text-xs font-semibold tracking-tight text-muted">
        {label}
      </p>
    </div>
  );
}
