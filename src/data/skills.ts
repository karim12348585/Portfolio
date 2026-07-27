import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Agentic AI",
    icon: "Bot",
    skills: [
      { name: "LangGraph", years: 2, level: 5, projects: ["DataOps Copilot", "Agentic Code Intelligence", "DeepTest Agent"], description: "Stateful, conditionally-routed multi-agent workflows with self-correction." },
      { name: "ReAct", years: 1, level: 4, projects: ["Agentic Code Intelligence"], description: "Reason-act-observe agent loops for autonomous tool use." },
      { name: "MCP", years: 1, level: 4, projects: ["DataOps Copilot"], description: "Model Context Protocol for controlled enterprise tool access." },
      { name: "Multi-Agent Systems", years: 2, level: 5, projects: ["DataOps Copilot"], description: "Coordinating specialised agents over shared typed state." },
      { name: "Agentic System Design", years: 2, level: 5, projects: ["DataOps Copilot", "DeepTest Agent"], description: "Designing stateful, tool-using agent architectures with routing, memory, and self-correction." },
      { name: "Prompt Engineering", years: 2, level: 5, projects: ["DataOps Copilot", "ATS Resume Filtering"], description: "Structured prompting, function/tool schemas, and reliable output formatting." },
    ],
  },
  {
    name: "LLMs",
    icon: "Sparkles",
    skills: [
      { name: "Transformers & Attention", years: 2, level: 5, projects: ["AI-Generated Face Detection"], description: "Self-attention, multi-head attention, and the transformer architecture behind modern LLMs and ViTs." },
      { name: "Pretraining & Post-training", years: 1, level: 4, projects: [], description: "How LLMs are trained: pretraining objectives, then SFT and preference-based post-training." },
      { name: "SFT & RLHF", years: 1, level: 4, projects: [], description: "Supervised fine-tuning and reinforcement learning from human feedback for alignment." },
      { name: "Fine-tuning", years: 2, level: 4, projects: ["AI-Generated Face Detection"], description: "LoRA & parameter-efficient adaptation of large models." },
      { name: "LLM-as-a-Judge", years: 1, level: 4, projects: ["DataOps Copilot"], description: "Automated evaluation of agent outputs with cost/latency metrics." },
    ],
  },
  {
    name: "RAG",
    icon: "Database",
    skills: [
      { name: "RAG Pipelines", years: 2, level: 5, projects: ["Agentic Code Intelligence", "DeepTest Agent"], description: "Retrieval-augmented generation over enterprise data." },
      { name: "GraphRAG", years: 1, level: 4, projects: ["DeepTest Agent"], description: "Fusing vector search with knowledge-graph structure." },
      { name: "FAISS", years: 2, level: 4, projects: ["DataOps Copilot", "DeepTest Agent"], description: "Vector similarity search and golden-case memory." },
      { name: "ChromaDB", years: 1, level: 4, projects: ["Agentic Code Intelligence"], description: "Vector database for semantic retrieval." },
    ],
  },
  {
    name: "NLP",
    icon: "MessageSquare",
    skills: [
      { name: "Text Preprocessing", years: 3, level: 5, projects: ["Market Skill Insights", "ATS Resume Filtering"], description: "Cleaning, normalization, and feature extraction from raw text." },
      { name: "Tokenization", years: 3, level: 4, projects: ["ATS Resume Filtering"], description: "Subword and word tokenization (BPE, WordPiece) feeding transformer and classical models." },
      { name: "Word2Vec / GloVe", years: 2, level: 4, projects: ["Market Skill Insights"], description: "Classic distributional word embeddings and semantic vector spaces." },
      { name: "NER", years: 2, level: 4, projects: [], description: "Named-entity recognition and sequence labelling." },
      { name: "LSTM & Sequence Models", years: 2, level: 4, projects: [], description: "Recurrent architectures (LSTM/GRU) for sequential text modelling." },
      { name: "SBERT / Embeddings", years: 2, level: 4, projects: ["ATS Resume Filtering"], description: "Sentence embeddings for semantic similarity and retrieval." },
    ],
  },
  {
    name: "Computer Vision",
    icon: "Eye",
    skills: [
      { name: "Vision Transformers", years: 1, level: 4, projects: ["AI-Generated Face Detection"], description: "ViT fine-tuning with LoRA and XAI." },
      { name: "CNNs", years: 2, level: 4, projects: [], description: "Convolutional architectures for image tasks." },
      { name: "XAI", years: 1, level: 3, projects: ["AI-Generated Face Detection"], description: "Explainable, interpretable model predictions." },
    ],
  },
  {
    name: "Machine & Deep Learning",
    icon: "BrainCircuit",
    skills: [
      { name: "Supervised Learning", years: 3, level: 5, projects: ["AI-Generated Face Detection", "ATS Resume Filtering"], description: "Classification & regression — from linear models and trees to gradient boosting and neural nets." },
      { name: "Unsupervised Learning", years: 2, level: 4, projects: ["Market Skill Insights"], description: "Clustering, dimensionality reduction, and density estimation." },
      { name: "Reinforcement Learning", years: 1, level: 3, projects: [], description: "Policy and value methods, reward-driven agents, and RLHF foundations." },
      { name: "PyTorch", years: 2, level: 4, projects: ["AI-Generated Face Detection"], description: "Deep learning model development and training." },
      { name: "HDBSCAN", years: 1, level: 4, projects: ["Market Skill Insights"], description: "Density-based clustering without preset cluster counts." },
      { name: "Optuna", years: 1, level: 4, projects: ["AI-Generated Face Detection"], description: "Automated hyperparameter optimization." },
    ],
  },
  {
    name: "Advanced Mathematics",
    icon: "Sigma",
    skills: [
      { name: "Statistics", years: 4, level: 5, projects: ["Data Pipeline Monitoring"], description: "Descriptive & inferential statistics, hypothesis testing, and estimation." },
      { name: "Linear Algebra", years: 4, level: 5, projects: [], description: "Vector spaces, matrix decompositions, and eigen-analysis underpinning ML." },
      { name: "Probability", years: 4, level: 5, projects: [], description: "Probability theory, distributions, and Bayesian reasoning." },
      { name: "Uncertainty Theory", years: 2, level: 4, projects: [], description: "Modelling and quantifying uncertainty in data and decisions." },
      { name: "Stochastic Processes", years: 2, level: 4, projects: [], description: "Markov chains and time-dependent random processes." },
      { name: "Monte Carlo Methods", years: 2, level: 4, projects: [], description: "Simulation and sampling-based estimation and inference." },
      { name: "Linear Models", years: 3, level: 4, projects: ["ATS Resume Filtering"], description: "Linear & generalized linear regression and their assumptions." },
      { name: "Financial Management", years: 1, level: 3, projects: [], description: "Quantitative financial analysis and decision-making foundations." },
    ],
  },
  {
    name: "MLOps & Cloud",
    icon: "Cloud",
    skills: [
      { name: "Docker", years: 2, level: 4, projects: ["DeepTest Agent"], description: "Containerization and sandboxed code execution." },
      { name: "Azure", years: 1, level: 3, projects: [], description: "Cloud AI & data services (AI/Data Fundamentals certified)." },
      { name: "Git", years: 3, level: 4, projects: [], description: "Version control and collaboration." },
      { name: "MLOps", years: 1, level: 3, projects: ["DataOps Copilot"], description: "Evaluation harnesses, monitoring, and reproducibility." },
    ],
  },
  {
    name: "Backend & Data",
    icon: "Server",
    skills: [
      { name: "Python", years: 4, level: 5, projects: ["DataOps Copilot", "DeepTest Agent"], description: "Primary language for AI/ML systems." },
      { name: "FastAPI", years: 1, level: 4, projects: [], description: "High-performance async Python APIs for serving models and agents." },
      { name: "Flask", years: 2, level: 4, projects: ["DataOps Copilot"], description: "APIs backing agent UIs and services." },
      { name: "Neo4j", years: 2, level: 4, projects: ["Agentic Code Intelligence", "DeepTest Agent"], description: "Knowledge graphs for structured reasoning." },
      { name: "SQL / SQLAlchemy", years: 3, level: 4, projects: ["Data Pipeline Monitoring"], description: "Relational data access and quality monitoring." },
    ],
  },
  {
    name: "Frontend & Tools",
    icon: "LayoutDashboard",
    skills: [
      { name: "React", years: 2, level: 3, projects: ["DataOps Copilot"], description: "Agent UIs with live reasoning streams." },
      { name: "Pandas / NumPy", years: 3, level: 5, projects: ["Market Skill Insights", "Data Pipeline Monitoring"], description: "Data wrangling and analysis." },
      { name: "Selenium / BeautifulSoup", years: 2, level: 4, projects: ["Market Skill Insights"], description: "Web scraping and data collection." },
      { name: "Power BI", years: 1, level: 3, projects: [], description: "Dashboards and data visualization." },
    ],
  },
];
