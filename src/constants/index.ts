import type { ProjectCategory } from "@/types";

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
] as const;

export const projectFilters: (ProjectCategory | "All")[] = [
  "All",
  "Agentic AI",
  "LLM",
  "RAG",
  "NLP",
  "Computer Vision",
  "Machine Learning",
  "Deep Learning",
  "MLOps",
  "Data Engineering",
  "Recommendation Systems",
];
