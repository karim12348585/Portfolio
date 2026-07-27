import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "kpit-eos",
    company: "KPIT Engineering",
    role: "AI Engineer Intern — DataOps Copilot (End-of-Studies Project)",
    duration: "Feb 2026 – Present",
    summary:
      "Building an autonomous multi-agent system for end-to-end root cause analysis of Jenkins data-pipeline failures.",
    responsibilities: [
      "Designed a stateful, conditionally-routed LangGraph workflow coordinating RCA, Investigator, and Remediation agents with self-correction.",
      "Implemented MCP integration for controlled access to internal repositories, config files, and SQL Server data.",
      "Engineered a two-layer log-parsing mechanism and a FAISS golden-case memory layer.",
      "Shipped Terminal and React UIs with live agent-reasoning streaming, backed by a Flask API.",
    ],
    achievements: [
      "Compressed raw Jenkins logs by up to 83% in token count.",
      "Added a human-in-the-loop feedback loop and an LLM-as-a-Judge evaluation harness with latency & cost metrics.",
    ],
    tech: ["LangGraph", "MCP", "FAISS", "Flask", "React", "SQL Server", "Python"],
    current: true,
  },
  {
    id: "kpit-code",
    company: "KPIT Engineering",
    role: "AI Engineer Intern — Agentic Code Intelligence System",
    duration: "Jun – Aug 2025",
    summary:
      "Built an agentic AI system for enterprise-scale code understanding and pull request analysis grounded in Jira context.",
    responsibilities: [
      "Applied the ReAct reasoning framework for autonomous code analysis.",
      "Integrated AST-based code parsing, RAG pipelines, and LangGraph.",
      "Modelled code structure with Neo4j knowledge graphs and Chroma DB vector search.",
    ],
    achievements: [
      "Enabled context-aware reasoning across enterprise repositories.",
      "Grounded pull request analysis in the originating Jira ticket.",
    ],
    tech: ["ReAct", "LangGraph", "Neo4j", "ChromaDB", "AST", "RAG", "Python"],
  },
  {
    id: "primatec",
    company: "PRIMATEC Engineering",
    role: "Data Engineer Intern — Data Pipeline Monitoring & Alerting",
    duration: "Jun – Aug 2024",
    summary:
      "Designed a Python-based data quality monitoring system comparing SQL Server data with multiple external sources.",
    responsibilities: [
      "Built data quality checks with Pandas and SQL over SQL Server, GitHub, Jenkins, and Jira via SQLAlchemy and APIs.",
      "Implemented SMTP-based email alerting for real-time notifications.",
      "Developed a modular, extensible architecture for easy integration of new data sources.",
    ],
    achievements: [
      "Delivered real-time data-quality alerting across heterogeneous sources.",
      "Created a plug-in architecture that made onboarding new sources trivial.",
    ],
    tech: ["Python", "Pandas", "SQL", "SQLAlchemy", "SMTP", "SQL Server"],
  },
];
