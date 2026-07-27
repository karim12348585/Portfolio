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
    title: "Azure AI Fundamentals",
    issuer: "Microsoft",
    skills: ["Azure AI", "Cognitive Services", "Responsible AI"],
    year: "2024",
  },
  {
    id: "azure-data",
    title: "Azure Data Fundamentals",
    issuer: "Microsoft",
    skills: ["Relational Data", "Non-relational Data", "Data Analytics"],
    year: "2024",
  },
];
