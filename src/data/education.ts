import type { EducationItem, LanguageItem } from "@/types";

export const education: EducationItem[] = [
  {
    id: "enetcom",
    school: "ENET'Com, Sfax",
    institution:
      "National School of Electronics and Telecommunications of Sfax",
    degree: "Engineering Degree — Data & Decision Systems",
    detail:
      "Three-year engineering program, Data Science option (AI Engineering). Completed with an end-of-studies project at KPIT Engineering, building DataOps Copilot.",
    period: "2023 – 2026",
    highlight: "AI Engineering option",
    tags: ["AI Engineering option", "Graduation project · KPIT Engineering"],
    current: true,
  },
  {
    id: "ipeis",
    school: "IPEIS, Sfax",
    institution: "Preparatory Institute for Engineering Studies",
    degree: "Physics–Technology Preparatory Cycle",
    detail:
      "Two-year intensive program in mathematics, physics and engineering sciences, leading to the national engineering entrance exam.",
    period: "2021 – 2023",
    highlight: "National exam rank 128 / 800",
    tags: ["National exam rank 128 / 800"],
  },
  {
    id: "bac",
    school: "High School 9 Avril, Sfax",
    degree: "Scientific Baccalaureate — Technical Sciences",
    detail: "Foundations in mathematics, physics, and technical sciences.",
    period: "2017 – 2021",
    highlight: "Grade 17.02 / 20",
    tags: ["Grade 17.02 / 20"],
  },
];

export const languages: LanguageItem[] = [
  { name: "Arabic", level: "Native", pct: 100, dots: 4 },
  { name: "English", level: "Proficient", pct: 90, dots: 3 },
  { name: "French", level: "Proficient", pct: 88, dots: 3 },
  { name: "Spanish", level: "Basic", pct: 35, dots: 1 },
];

export const interests = [
  "Multi-Agent Systems",
  "LLM Reasoning",
  "Retrieval-Augmented Generation",
  "Natural Language Processing",
  "Deep Learning",
  "MLOps & Evaluation",
  "Knowledge Graphs",
  "Open-Source AI",
];
