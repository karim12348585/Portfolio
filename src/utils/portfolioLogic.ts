import type {
  BlogCategory,
  BlogPost,
  CaseStudy,
  Project,
  ProjectCategory,
  ProjectType,
  Skill,
} from "../types";

export type TypeFilter = "All" | ProjectType;
export type CategoryFilter = "All" | ProjectCategory;
export type BlogCategoryFilter = "All" | BlogCategory;

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  agent: string;
  level: "init" | "step" | "tool" | "metric" | "success";
  message: string;
  meta?: string;
}

export interface SkillResourceMetrics {
  allocationPct: number;
  totalSegments: number;
  filledSegments: number;
  peakSegments: number;
  tier: "S-RANK // OVERCLOCK" | "A-RANK // OPTIMAL" | "B-RANK // STABLE";
  rankCode: "S+" | "S" | "A+" | "A";
  throughputLabel: string;
  channelId: string;
}

/**
 * Compute anime HUD system resource monitor telemetry for a technical skill.
 */
export function computeSkillResourceMetrics(
  skill: Skill,
  index = 0,
): SkillResourceMetrics {
  const totalSegments = 16;
  const basePct = skill.level * 17;
  const expBonus = Math.min(skill.years * 3, 10);
  const projBonus = Math.min(skill.projects.length * 2, 4);
  const allocationPct = Math.min(99, Math.max(55, basePct + expBonus + projBonus));

  const filledSegments = Math.max(
    1,
    Math.min(totalSegments, Math.round((allocationPct / 100) * totalSegments)),
  );
  const peakSegments = Math.max(0, filledSegments - 12);

  const tier: SkillResourceMetrics["tier"] =
    skill.level >= 5
      ? "S-RANK // OVERCLOCK"
      : skill.level === 4
        ? "A-RANK // OPTIMAL"
        : "B-RANK // STABLE";

  const rankCode: SkillResourceMetrics["rankCode"] =
    allocationPct >= 95
      ? "S+"
      : skill.level >= 5
        ? "S"
        : skill.level === 4
          ? "A+"
          : "A";

  const ops = (skill.level * 18.4 + skill.years * 4.2 + skill.projects.length * 3.1).toFixed(1);
  const throughputLabel = `${ops} GFLOPS`;
  const channelId = `SYS-${String(index + 1).padStart(2, "0")}`;

  return {
    allocationPct,
    totalSegments,
    filledSegments,
    peakSegments,
    tier,
    rankCode,
    throughputLabel,
    channelId,
  };
}

/**
 * Filter projects by project type (All / Industrial / Freelance / Academic)
 * and domain category (All / Agentic AI / LLM / RAG / etc.).
 */
export function filterProjects(
  list: readonly Project[],
  typeFilter: TypeFilter,
  categoryFilter: CategoryFilter,
): Project[] {
  return list.filter(
    (p) =>
      (typeFilter === "All" || p.type === typeFilter) &&
      (categoryFilter === "All" || p.categories.includes(categoryFilter)),
  );
}

/**
 * Filter projects by free-text search query across title, tagline, solution,
 * company, type, categories, tech stack, and year.
 */
export function searchProjects(
  list: readonly Project[],
  query: string,
): Project[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [...list];

  return list.filter((p) => {
    const haystack = [
      p.title,
      p.tagline,
      p.solution,
      p.company ?? "",
      p.type,
      p.year,
      ...p.categories,
      ...p.tech,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

/**
 * Count projects by ProjectType.
 */
export function countProjectsByType(list: readonly Project[]): Record<TypeFilter, number> {
  return {
    All: list.length,
    Industrial: list.filter((p) => p.type === "Industrial").length,
    Freelance: list.filter((p) => p.type === "Freelance").length,
    Academic: list.filter((p) => p.type === "Academic").length,
  };
}

/**
 * Resolve the currently active project in a filtered list.
 * Keeps the user's current selection if it still exists in the filtered list;
 * otherwise falls back to the first matching project (or null if empty).
 */
export function resolveSelectedProject(
  list: readonly Project[],
  selectedSlug: string | null,
): Project | null {
  if (list.length === 0) return null;
  if (selectedSlug) {
    const match = list.find((p) => p.slug === selectedSlug);
    if (match) return match;
  }
  return list[0];
}

/**
 * Return the previous or next project slug in a filtered list with wrap-around.
 */
export function getAdjacentProjectSlug(
  list: readonly Project[],
  currentSlug: string | null,
  direction: -1 | 1,
): string | null {
  if (list.length === 0) return null;
  const idx = currentSlug ? list.findIndex((p) => p.slug === currentSlug) : 0;
  const safeIdx = idx === -1 ? 0 : idx;
  const nextIdx = (safeIdx + direction + list.length) % list.length;
  return list[nextIdx].slug;
}

/**
 * Count blog posts across All and each BlogCategory.
 */
export function countBlogPostsByCategory(
  list: readonly BlogPost[],
): Record<BlogCategoryFilter, number> {
  return {
    All: list.length,
    "Agentic AI": list.filter((p) => p.category === "Agentic AI").length,
    "RAG & Search": list.filter((p) => p.category === "RAG & Search").length,
    "LLMOps & Eval": list.filter((p) => p.category === "LLMOps & Eval").length,
    "Data Engineering": list.filter((p) => p.category === "Data Engineering")
      .length,
  };
}

/**
 * Filter blog posts by category and free-text search query (title, excerpt, category, tags).
 */
export function filterBlogPosts(
  list: readonly BlogPost[],
  category: BlogCategoryFilter,
  query: string,
): BlogPost[] {
  const normalized = query.trim().toLowerCase();
  return list.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    if (!matchesCategory) return false;
    if (!normalized) return true;

    return (
      post.title.toLowerCase().includes(normalized) ||
      post.excerpt.toLowerCase().includes(normalized) ||
      post.category.toLowerCase().includes(normalized) ||
      post.tags.some((t) => t.toLowerCase().includes(normalized))
    );
  });
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

/**
 * Validate contact form fields and return field-level error messages.
 */
export function validateContactForm(input: ContactFormInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  if (input.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

/**
 * Build realistic AI agent execution log entries for a given project
 * using its actual pipeline stages, tech stack, and verified results.
 */
export function buildProjectAgentLogs(project: Project): AgentLogEntry[] {
  const logs: AgentLogEntry[] = [];
  const primaryStack = project.tech.slice(0, 4).join(" · ");
  const domainTag = project.categories.slice(0, 2).join(" / ");

  logs.push({
    id: `${project.slug}-init`,
    timestamp: "00:00.08",
    agent: "ORCHESTRATOR",
    level: "init",
    message: `Initializing ${project.title} runtime [${domainTag}]`,
    meta: `stack: ${primaryStack}`,
  });

  logs.push({
    id: `${project.slug}-tool-boot`,
    timestamp: "00:00.34",
    agent: "TOOL_DISPATCH",
    level: "tool",
    message: `Mounted modules: ${project.tech.slice(0, 6).join(", ")}`,
    meta: "status: READY",
  });

  const pipelineSteps = project.caseStudy.pipeline.slice(0, 4);
  pipelineSteps.forEach((step, idx) => {
    const sec = (0.72 + idx * 0.54).toFixed(2).padStart(5, "0");
    logs.push({
      id: `${project.slug}-step-${idx + 1}`,
      timestamp: `00:${sec}`,
      agent: `AGENT_0${idx + 1}`,
      level: "step",
      message: step,
      meta: `stage ${idx + 1}/${pipelineSteps.length} · ${110 + idx * 45}ms`,
    });
  });

  const outcomes = project.results.slice(0, 2);
  outcomes.forEach((res, idx) => {
    const sec = (3.1 + idx * 0.42).toFixed(2).padStart(5, "0");
    logs.push({
      id: `${project.slug}-metric-${idx + 1}`,
      timestamp: `00:${sec}`,
      agent: "EVALUATOR",
      level: "metric",
      message: res,
      meta: "verified: PASS",
    });
  });

  logs.push({
    id: `${project.slug}-complete`,
    timestamp: "00:04.18",
    agent: "SYSTEM_HUD",
    level: "success",
    message: `Execution complete for ${project.title} — telemetry nominal.`,
    meta: "exit_code: 0",
  });

  return logs;
}

export type CaseStudySectionId =
  | "overview"
  | "gallery"
  | "evaluation"
  | "architecture"
  | "pipeline"
  | "businessValue"
  | "solvedChallenges"
  | "reflections";

export interface CaseStudySectionMeta {
  id: CaseStudySectionId;
  number: string;
}

/**
 * Compute visible case-study sections and sequential 2-digit numbers.
 * - Always places Architecture immediately after Benchmarks & Evaluation.
 * - Omits Execution Flow / End-to-End Pipeline when no architecture diagram picture exists.
 */
export function getCaseStudySectionPlan(
  caseStudy: CaseStudy,
): CaseStudySectionMeta[] {
  const hasGallery = caseStudy.screenshots.length > 0;
  const hasEvaluation = Boolean(caseStudy.benchmarks);
  const hasArchitecturePicture = (caseStudy.diagrams?.length ?? 0) > 0;
  const showPipeline = caseStudy.pipeline.length > 0 && hasArchitecturePicture;
  const hasSolved = (caseStudy.solvedChallenges?.length ?? 0) > 0;
  const hasReflections =
    (!hasSolved && caseStudy.challenges.length > 0) ||
    caseStudy.tradeoffs.length > 0 ||
    caseStudy.lessons.length > 0 ||
    caseStudy.futureWork.length > 0;

  const ids: CaseStudySectionId[] = ["overview"];
  if (hasGallery) ids.push("gallery");
  if (hasEvaluation) ids.push("evaluation");
  ids.push("architecture");
  if (showPipeline) ids.push("pipeline");
  ids.push("businessValue");
  if (hasSolved) ids.push("solvedChallenges");
  if (hasReflections) ids.push("reflections");

  return ids.map((id, idx) => ({
    id,
    number: String(idx + 1).padStart(2, "0"),
  }));
}
