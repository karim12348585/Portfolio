import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "nlp-deeplearningai",
    title: "NLP Specialization",
    issuer: "DeepLearning.AI",
    skills: ["NLP", "Attention", "Transformers", "Word Embeddings", "Sequence Models"],
    year: "2024",
  },
  {
    id: "ml-stanford",
    title: "Machine Learning",
    issuer: "Stanford University",
    skills: ["Supervised Learning", "Neural Networks", "Regularization", "Model Evaluation"],
    year: "2023",
  },
  {
    id: "azure-ai",
    title: "Microsoft Azure AI Fundamentals",
    issuer: "Microsoft",
    skills: ["Azure AI", "Cognitive Services", "Responsible AI"],
    year: "2024",
    link: "https://www.credly.com/badges/d3f438b3-d357-4a7d-9e48-010a320debb5/public_url",
    badge: "/badges/azure-ai-fundamentals.png",
  },
  {
    id: "azure-data",
    title: "Microsoft Azure Data Fundamentals",
    issuer: "Microsoft",
    skills: ["Relational Data", "Non-relational Data", "Data Analytics"],
    year: "2024",
    link: "https://www.credly.com/badges/9a738ecf-0967-40df-93cd-7aa15b01b547/public_url",
    badge: "/badges/azure-data-fundamentals.png",
  },
];
