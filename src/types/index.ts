export type ProjectCategory =
  | "LLM"
  | "RAG"
  | "Computer Vision"
  | "NLP"
  | "Recommendation Systems"
  | "Data Engineering"
  | "MLOps"
  | "Agentic AI"
  | "Machine Learning"
  | "Deep Learning";

export type ProjectType = "Academic" | "Industrial";

export interface CaseStudy {
  overview: string;
  problemStatement: string;
  businessValue: string[];
  architecture: string;
  /** Optional architecture/workflow diagram images. */
  diagrams?: { src: string; caption: string }[];
  systemDesign: string[];
  pipeline: string[];
  /** Real captures only — empty array hides the section (no placeholders). */
  screenshots: { label: string; caption: string; src: string }[];
  challenges: string[];
  tradeoffs: string[];
  lessons: string[];
  futureWork: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  year: string;
  type: ProjectType;
  /** Company/context where the project was built, e.g. "KPIT Engineering". */
  company?: string;
  /** Short duration/context note, e.g. "End-of-Studies · 5 months". */
  duration?: string;
  categories: ProjectCategory[];
  problem: string;
  solution: string;
  tech: string[];
  results: string[];
  github?: string;
  /** When true, the source is proprietary — show a red "confidential" GitHub badge. */
  codeConfidential?: boolean;
  demo?: string;
  featured: boolean;
  accent: string; // gradient hint, e.g. "from-amber-500 to-orange-400"
  caseStudy: CaseStudy;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
  current?: boolean;
}

export interface Skill {
  name: string;
  years: number;
  projects: string[];
  description: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export interface SkillCategory {
  name: string;
  icon: string; // lucide icon name
  skills: Skill[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  skills: string[];
  /** Public verification URL (e.g. a Credly badge). */
  link?: string;
  /** Local path to the credential's badge artwork. */
  badge?: string;
  year?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  detail: string;
  period: string;
  highlight?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  handle: string;
}
