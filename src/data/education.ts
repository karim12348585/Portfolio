import type { EducationItem } from "@/types";

export const education: EducationItem[] = [
  {
    id: "enetcom",
    school: "ENET'Com, Sfax",
    degree: "Engineering Degree — Data & Decision Systems",
    detail:
      "National School of Electronics and Telecommunications of Sfax · Option: Data Science (AI Engineering).",
    period: "2023 – 2026",
    highlight: "AI Engineering",
  },
  {
    id: "ipeis",
    school: "IPEIS, Sfax",
    degree: "Physics–Technology Preparatory Cycle",
    detail: "Preparatory Institute for Engineering Studies.",
    period: "2021 – 2023",
    highlight: "National exam rank 128/800",
  },
  {
    id: "bac",
    school: "High School 9 Avril, Sfax",
    degree: "Scientific Baccalaureate — Technical Sciences",
    detail: "Foundations in mathematics, physics, and technical sciences.",
    period: "2017 – 2021",
    highlight: "Grade 17.02/20",
  },
];

export const languages = [
  { name: "Arabic", level: "Native", pct: 100 },
  { name: "English", level: "Proficient", pct: 90 },
  { name: "French", level: "Proficient", pct: 88 },
  { name: "Spanish", level: "Basic", pct: 35 },
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
