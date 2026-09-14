export interface ApproachStage {
  step: string;
  title: string;
  description: string;
  icon: string;
  tech: string[];
}

/** The end-to-end lifecycle I own when building an AI system. */
export const approachStages: ApproachStage[] = [
  {
    step: "01",
    title: "Data & Context",
    description:
      "Parse, clean and compress raw sources into model-ready context — before spending a single token.",
    icon: "Filter",
    tech: ["AST parsing", "Log compression", "Pandas", "SQL"],
  },
  {
    step: "02",
    title: "Retrieval",
    description:
      "Ground the model in real knowledge by combining vector search with graph structure.",
    icon: "Network",
    tech: ["FAISS", "ChromaDB", "Neo4j", "GraphRAG"],
  },
  {
    step: "03",
    title: "Agent Design",
    description:
      "Stateful, tool-using agents with explicit routing, memory and self-correction.",
    icon: "Bot",
    tech: ["LangGraph", "ReAct", "MCP", "Prompting"],
  },
  {
    step: "04",
    title: "Evaluation",
    description:
      "Prove it works: automated judging plus latency and cost budgets on every run.",
    icon: "Gauge",
    tech: ["LLM-as-a-Judge", "Optuna", "Cost/latency"],
  },
  {
    step: "05",
    title: "Production",
    description:
      "Ship it behind an API, with a UI and a human-in-the-loop people actually trust.",
    icon: "Rocket",
    tech: ["FastAPI", "Flask", "React", "Docker"],
  },
];
