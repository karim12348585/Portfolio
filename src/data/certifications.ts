import type { CertificationGroup } from "@/types";

export const certificationGroups: CertificationGroup[] = [
  {
    id: "deeplearning-ai",
    issuer: "DeepLearning.AI",
    domain: "NLP",
    icon: "badge",
    badge: "/badges/deeplearning-ai.png",
    badgeFramed: true,
    items: [
      {
        id: "nlp-deeplearningai",
        title: "Natural Language Processing Specialization",
        details:
          "NLP · Attention · Transformers · Word embeddings · Sequence models",
        year: "2024",
      },
    ],
  },
  {
    id: "stanford-university",
    issuer: "Stanford University",
    domain: "Machine learning",
    icon: "badge",
    badge: "/badges/stanford-university.svg",
    badgeFramed: true,
    items: [
      {
        id: "ml-stanford",
        title: "Machine Learning",
        details:
          "Supervised learning · Neural networks · Regularization · Model evaluation",
        year: "2023",
      },
    ],
  },
  {
    id: "microsoft",
    issuer: "Microsoft",
    domain: "Azure AI and data",
    icon: "badge",
    badge: "/badges/microsoft.svg",
    badgeFramed: true,
    items: [
      {
        id: "microsoft-dp800",
        title: "SQL AI Developer Associate",
        code: "DP-800",
        details:
          "Developing AI-enabled database solutions · Vector search · RAG",
        status: "In progress",
        badge: "/badges/azure-sql-ai-developer.svg",
      },
      {
        id: "azure-ai",
        title: "Azure AI Fundamentals",
        code: "AI-900",
        details: "2024 · Azure AI · Cognitive Services · Responsible AI",
        link: "https://www.credly.com/badges/d3f438b3-d357-4a7d-9e48-010a320debb5/public_url",
        badge: "/badges/azure-ai-fundamentals.png",
      },
      {
        id: "azure-data",
        title: "Azure Data Fundamentals",
        code: "DP-900",
        details: "2024 · Relational and non-relational data · Analytics",
        link: "https://www.credly.com/badges/9a738ecf-0967-40df-93cd-7aa15b01b547/public_url",
        badge: "/badges/azure-data-fundamentals.png",
      },
    ],
  },
  {
    id: "365-data-science",
    issuer: "365 Data Science",
    domain: "AI agents and MLOps",
    icon: "badge",
    badge: "/badges/365-data-science.svg",
    year: "2026",
    items: [
      {
        id: "365-ai-agent-architecture",
        title: "AI agent architecture",
        link: "https://learn.365datascience.com/certificates/CC-F600E27A28/",
      },
      {
        id: "365-evaluating-ai-agents",
        title: "Evaluating AI agents",
        link: "https://learn.365datascience.com/certificates/CC-26732E14BF/",
      },
      {
        id: "365-fully-automated-mlops",
        title: "Fully automated MLOps",
        link: "https://learn.365datascience.com/certificates/CC-2D8F0A1330/",
      },
      {
        id: "365-understanding-cloud-computing",
        title: "Understanding cloud computing",
        link: "https://learn.365datascience.com/certificates/CC-4884ECA985/",
      },
    ],
  },
];
