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
  | "Deep Learning"
  | "Graph ML";

export type ProjectType = "Academic" | "Industrial" | "Freelance";

/** Overrides the default "confidential / NDA" note on a private-source badge. */
export interface SourceNote {
  /** Button label, e.g. "Client-owned". */
  label: string;
  title: string;
  body: string;
}

export interface BenchmarkStat {
  metric: string;
  value: string;
  detail?: string;
}

export interface CaseStudy {
  overview: string;
  problemStatement: string;
  businessValue: string[];
  architecture: string;
  /** Optional architecture/workflow diagram images. */
  diagrams?: { src: string; caption: string }[];
  systemDesign: string[];
  pipeline: string[];
  /** Replaces the challenges/tradeoffs/lessons/future grid with problem → fix pairs. */
  solvedChallenges?: { challenge: string; solution: string }[];
  /** Headline evaluation numbers plus optional benchmark charts. */
  benchmarks?: {
    intro?: string;
    stats: BenchmarkStat[];
    charts?: { src: string; caption: string }[];
  };
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
  /** Optional link for the company/client (e.g. its LinkedIn page). */
  companyUrl?: string;
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
  /** Custom wording for the private-source badge (e.g. client-owned code). */
  sourceNote?: SourceNote;
  /** Notebook link — a Kaggle URL or a local .ipynb under /public. */
  notebook?: string;
  demo?: string;
  featured: boolean;
  /** Dedicated cover image for the card + banner; overrides the first screenshot. */
  cover?: string;
  accent: string; // gradient hint, e.g. "from-indigo-500 to-violet-400"
  caseStudy: CaseStudy;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  employmentType?: "Internship" | "Freelance";
  role: string;
  projectLabel?: string;
  duration: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
  current?: boolean;
  /** Slug of the related project case study, linked from the experience card. */
  projectSlug?: string;
}

export interface Skill {
  name: string;
  /** Brand-logo key from <TechIcon />'s registry (real tool logo). */
  brand?: string;
  /** Lucide icon name for concepts without a logo. */
  glyph?: string;
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

export interface CertificationItem {
  id: string;
  title: string;
  /** Short exam or credential code pill, e.g. "DP-800", "AI-900", "DP-900". */
  code?: string;
  /** Topic summary line rendered beneath the title. */
  details?: string;
  /** Optional completion year shown on the right or prepended to details. */
  year?: string;
  /** Optional status pill such as "In progress". */
  status?: string;
  /** Public verification URL (Credly or 365 Data Science). */
  link?: string;
  /** Local path to the credential's badge artwork. */
  badge?: string;
}

export interface CertificationGroup {
  id: string;
  issuer: string;
  /** Short domain label paired with the credential count in the card header. */
  domain: string;
  /** Header icon style: Lucide glyph or issuer logo badge. */
  icon: "award" | "cloud" | "badge";
  /** Local path to issuer logo when icon is "badge". */
  badge?: string;
  /** Renders the logo inside a clean padded rounded-xl badge tile. */
  badgeFramed?: boolean;
  /** Optional completion year shown in the card header (e.g. "2026"). */
  year?: string;
  /** Shows the "All verified" shield pill in the card header. */
  allVerified?: boolean;
  items: CertificationItem[];
}

export interface EducationItem {
  id: string;
  school: string;
  institution?: string;
  degree: string;
  detail: string;
  period: string;
  highlight?: string;
  tags?: string[];
  current?: boolean;
}

export interface LanguageItem {
  name: string;
  level: string;
  pct: number;
  dots: 1 | 2 | 3 | 4;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  handle: string;
}

export type BlogCategory =
  | "Agentic AI"
  | "RAG & Search"
  | "LLMOps & Eval"
  | "Data Engineering";

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
  codeSnippet?: {
    label: string;
    language: string;
    code: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  relatedProjectSlug?: string;
  keyTakeaways: string[];
  sections: BlogArticleSection[];
}
