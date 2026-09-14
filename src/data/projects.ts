import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "dataops-copilot",
    slug: "dataops-copilot",
    title: "DataOps Copilot",
    tagline:
      "Autonomous multi-agent system for end-to-end root cause analysis of Jenkins pipeline failures.",
    year: "2026",
    type: "Industrial",
    company: "KPIT Engineering",
    duration: "End-of-Studies · 5 months",
    categories: ["Agentic AI", "LLM", "RAG", "MLOps"],
    problem:
      "Data-pipeline failures in Jenkins buried engineers under thousands of raw log lines, making root cause analysis slow, manual, and inconsistent across an enterprise team.",
    solution:
      "A stateful LangGraph multi-agent system that coordinates RCA, Investigator, and Remediation agents through conditionally-routed workflows with self-correction, grounded in internal repos and SQL data via MCP.",
    tech: [
      "LangGraph",
      "MCP",
      "FAISS",
      "Flask",
      "React",
      "SQL Server",
      "LLM-as-a-Judge",
      "Python",
    ],
    results: [
      "Compressed raw Jenkins logs by up to 83% in token count via a two-layer parser",
      "Golden-case memory (FAISS) lets the system learn from past incidents",
      "Human-in-the-loop feedback + evaluation harness (latency & cost metrics)",
      "Live agent-reasoning streaming in Terminal and React UIs",
    ],
    codeConfidential: true,
    featured: true,
    accent: "from-emerald-500 to-teal-400",
    caseStudy: {
      overview:
        "DataOps Copilot is my End-of-Studies project at KPIT Engineering: an autonomous multi-agent system that performs root cause analysis of Jenkins data-pipeline failures without a human having to read the logs first. It coordinates specialised agents through a stateful, conditionally-routed LangGraph workflow, retrieves enterprise context through the Model Context Protocol, and streams its reasoning live to the operator.",
      problemStatement:
        "When a nightly data pipeline breaks, an on-call engineer typically opens Jenkins, scrolls through tens of thousands of log lines, cross-references configuration files and SQL sources, and forms a hypothesis by hand. This is slow, error-prone, and the knowledge rarely gets captured for the next incident.",
      businessValue: [
        "Cuts mean-time-to-diagnosis by turning raw logs into a structured root cause report automatically.",
        "Institutionalises tribal knowledge — every resolved incident becomes a retrievable golden case.",
        "Reduces token/compute cost through aggressive, structure-aware log compression.",
        "Keeps a human in control via an approval and feedback loop before remediation.",
      ],
      architecture:
        "A LangGraph state machine orchestrates three agents — RCA, Investigator, and Remediation — over a shared, typed state object. Conditional edges route control based on confidence and evidence sufficiency, with self-correction loops when an agent's hypothesis fails validation. MCP servers expose internal repositories, configuration files, and SQL Server data as controlled tools.",
      diagrams: [
        {
          src: "/projects/dataops-copilot/workflow.png",
          caption:
            "End-to-end workflow across the parsing, agents, memory, MCP, and human-feedback layers.",
        },
      ],
      systemDesign: [
        "RCA agent forms an initial hypothesis from compressed logs.",
        "Investigator agent gathers supporting evidence via MCP tools (repos, configs, SQL).",
        "Remediation agent proposes a fix; a router decides whether to loop or finalise.",
        "FAISS golden-case store provides retrieval-augmented memory of past incidents.",
        "LLM-as-a-Judge evaluation harness scores runs on correctness, latency, and cost.",
      ],
      pipeline: [
        "Ingest raw Jenkins build logs",
        "Two-layer parse & compress (up to 83% token reduction)",
        "Retrieve similar golden cases from FAISS memory",
        "Multi-agent reasoning loop (RCA → Investigator → Remediation)",
        "Human-in-the-loop review & feedback",
        "Persist outcome back into golden-case memory",
      ],
      screenshots: [
        { label: "Live progress", caption: "Live agent progress streaming through each RCA step in the React UI.", src: "/projects/dataops-copilot/live-progress.png" },
        { label: "After analysis", caption: "Completed root-cause analysis with findings and evidence.", src: "/projects/dataops-copilot/after-analysis.png" },
        { label: "Fix suggestion", caption: "Validated remediation and proposed fix for the failure.", src: "/projects/dataops-copilot/fix.png" },
        { label: "Log parser", caption: "Two-layer parser compressing raw Jenkins logs before reasoning.", src: "/projects/dataops-copilot/parser.png" },
      ],
      challenges: [
        "Log volume overwhelmed context windows — solved with a two-layer, structure-aware compression stage.",
        "Preventing agents from looping indefinitely required explicit confidence gates and self-correction limits.",
        "Safely exposing enterprise SQL and repos to an LLM demanded MCP's controlled-access model.",
      ],
      tradeoffs: [
        "Chose LangGraph's explicit state machine over a free-form agent loop for debuggability and reproducibility.",
        "Accepted extra latency from evidence-gathering steps in exchange for far higher RCA precision.",
        "Kept a human approval gate rather than full auto-remediation to stay production-safe.",
      ],
      lessons: [
        "Retrieval-augmented memory turns a one-off agent into a system that compounds knowledge over time.",
        "Evaluation harnesses (LLM-as-a-Judge + cost/latency) are essential to trust agentic systems.",
        "Compression at the input boundary is often cheaper and more effective than a bigger model.",
      ],
      futureWork: [
        "Specialization of the Investigator agent for deeper, domain-specific evidence gathering.",
        "Generalization beyond Jenkins to broader CI/CD pipelines.",
        "Expand MCP tool coverage to more data sources.",
        "Add automated remediation for low-risk, high-confidence cases.",
        "Fine-tune a smaller model on golden cases to cut inference cost further.",
      ],
    },
  },
  {
    id: "agentic-code-intelligence",
    slug: "agentic-code-intelligence",
    title: "Agentic Code Intelligence",
    tagline:
      "An autonomous PR reviewer that reads the codebase like an engineer — grounded in the Jira ticket behind every change.",
    year: "2025",
    type: "Industrial",
    company: "KPIT Engineering",
    duration: "Summer internship · 2 months",
    categories: ["Agentic AI", "LLM", "RAG"],
    problem:
      "Reviewing pull requests across large enterprise repositories requires understanding both the code and the business intent behind it — context that is scattered across the codebase and Jira tickets.",
    solution:
      "An agentic ReAct system that combines AST-based parsing, RAG pipelines, Neo4j knowledge graphs, and Chroma vector search to reason autonomously about code changes with full ticket context.",
    tech: [
      "ReAct",
      "LangGraph",
      "Neo4j",
      "ChromaDB",
      "AST Parsing",
      "RAG",
      "Jira API",
      "GPT-4 Turbo",
      "Python",
    ],
    results: [
      "Delivers a complete PR review in ~2.3s across a transparent 5-step ReAct trace",
      "Scores every PR on quality, security, maintainability, complexity and test coverage",
      "Validates the implementation against the originating Jira ticket's requirements",
      "Models the whole repository as a Neo4j knowledge graph (files → symbols → calls)",
      "Orchestrates 6 tools over a 128k-token context window",
    ],
    codeConfidential: true,
    featured: true,
    accent: "from-teal-400 to-cyan-400",
    caseStudy: {
      overview:
        "Built during my 2025 internship at KPIT Engineering, this system gives an LLM agent the ability to genuinely understand enterprise code — not just read a diff, but traverse the repository's structure, retrieve the relevant context, and judge a pull request against the Jira ticket that motivated it. The result is a review that reads like a senior engineer wrote it: scored, evidenced, and tied back to the requirement.",
      problemStatement:
        "Generic LLM code review lacks grounding: it sees a diff but not the surrounding architecture or the business requirement. That produces shallow, sometimes misleading feedback on large codebases — and reviewers still burn hours re-gathering the same context by hand.",
      businessValue: [
        "Cuts review turnaround from hours of context-gathering to seconds of automated analysis.",
        "Catches requirement drift by validating the code against the originating Jira ticket.",
        "Surfaces security, complexity and coverage risks before they reach main.",
        "Doubles as an onboarding aid — the knowledge graph makes an unfamiliar repo explorable.",
      ],
      architecture:
        "A ReAct agent (reason → act → observe) drives tool use over a hybrid retrieval layer: Neo4j holds the code knowledge graph (files, symbols, dependencies, call edges), Chroma holds semantic embeddings, and AST parsing feeds both. LangGraph coordinates multi-step reasoning, and every tool call is surfaced in the UI so the review is auditable rather than a black box.",
      systemDesign: [
        "AST parser extracts symbols, calls, and dependencies from source.",
        "Neo4j stores the structural knowledge graph for traversal queries.",
        "ChromaDB provides semantic code and ticket retrieval.",
        "ReAct agent interleaves reasoning with graph and vector tool calls (6 tools).",
        "Jira integration injects ticket requirements into the validation step.",
        "Scoring layer rates quality, security, maintainability, complexity and coverage.",
      ],
      pipeline: [
        "Understand the request",
        "Gather PR context (summary, diffs, commits, Jira ticket)",
        "Analyze code changes against the knowledge graph",
        "Validate against ticket requirements",
        "Generate a scored review with findings and recommendations",
      ],
      screenshots: [
        {
          label: "PR review dashboard",
          caption:
            "A full review of PR #2: quality/security/coverage scores, the agent's 5-step ReAct trace with live tool calls, and a summary with strengths, issues and recommendations at 94% confidence.",
          src: "/projects/agentic-code-intelligence/pr-review-dashboard.png",
        },
        {
          label: "Neo4j knowledge graph",
          caption:
            "The repository modelled in Neo4j — packages CONTAIN modules, modules IMPORT dependencies, and classes CALL their methods.",
          src: "/projects/agentic-code-intelligence/knowledge-graph.png",
        },
      ],
      challenges: [
        "Combining graph traversal with vector retrieval without the agent losing focus.",
        "Keeping the knowledge graph in sync with fast-moving repositories.",
        "Scoping context so the agent stays within token budgets on large repos.",
        "Making the agent's reasoning legible — every tool call had to be traceable for reviewers to trust the verdict.",
      ],
      tradeoffs: [
        "Hybrid Neo4j + Chroma retrieval added complexity but captured both structure and semantics.",
        "ReAct's transparency was preferred over opaque single-shot prompting.",
        "Chose 'approve with comments' over auto-merge — the agent advises, the engineer decides.",
      ],
      lessons: [
        "Structure (graph) and meaning (embeddings) are complementary — neither alone is enough for code.",
        "Grounding in the originating ticket dramatically improves review relevance.",
        "Showing the reasoning trace is what converts a skeptical reviewer into a user.",
      ],
      futureWork: [
        "Incremental graph updates on each commit.",
        "Automated review comments posted back to the PR.",
        "Multi-repository reasoning for changes that span services.",
      ],
    },
  },
  {
    id: "data-pipeline-monitoring",
    slug: "data-pipeline-monitoring",
    title: "Data Pipeline Monitoring & Alerting",
    tagline:
      "A modular data-quality watchdog that reconciles SQL Server against GitHub, Jenkins and Jira — and emails the team the moment they diverge.",
    year: "2024",
    type: "Industrial",
    company: "PRIMATEC Engineering",
    duration: "Summer internship · 2 months",
    categories: ["Data Engineering", "MLOps"],
    problem:
      "Data quality issues between SQL Server and the external systems feeding it went unnoticed until someone manually spotted a wrong number downstream — by which point reports were already built on bad data.",
    solution:
      "A Python monitoring system that pulls from each source via SQLAlchemy and REST APIs, reconciles them with Pandas, and fires SMTP alerts in real time — behind a plug-in architecture that makes adding a new source trivial.",
    tech: [
      "Python",
      "Pandas",
      "SQL",
      "SQLAlchemy",
      "SQL Server",
      "REST APIs",
      "SMTP",
      "Jenkins",
      "Jira",
    ],
    results: [
      "Reconciles SQL Server against GitHub, Jenkins and Jira automatically",
      "Real-time email alerting the moment a data-quality rule breaks",
      "Plug-in architecture — onboarding a new source is config, not a rewrite",
      "Replaced manual spot-checks with scheduled, repeatable validation",
    ],
    codeConfidential: true,
    featured: true,
    accent: "from-cyan-500 to-teal-400",
    caseStudy: {
      overview:
        "My first industry internship, at PRIMATEC Engineering: a Python-based data quality monitoring and alerting system. It continuously compares the company's SQL Server records against the external systems that feed them — GitHub, Jenkins and Jira — and notifies the team by email the moment the two diverge.",
      problemStatement:
        "SQL Server was the source of truth for data originating in several external systems, but nothing verified that they actually agreed. Discrepancies — a missing build record, a stale ticket status — surfaced only when a human noticed a wrong number downstream, long after the fact.",
      businessValue: [
        "Catches data-quality breaks in real time instead of days later.",
        "Removes recurring manual spot-checks from the team's workload.",
        "Onboarding a new data source becomes configuration, not development.",
        "Creates an auditable trail of when and where data diverged.",
      ],
      architecture:
        "A source-agnostic collector layer wraps each system behind a common interface — SQLAlchemy for SQL Server, REST clients for GitHub, Jenkins and Jira. Pandas normalizes each into comparable frames, a rule engine reconciles them, and any violation is dispatched through an SMTP notifier. New sources register into the collector layer without touching the comparison or alerting logic.",
      systemDesign: [
        "Collector layer: one adapter per source (SQLAlchemy / REST API).",
        "Normalization: Pandas frames with a shared schema for comparison.",
        "Rule engine: configurable data-quality checks across sources.",
        "Alerting: SMTP notifications carrying the failing records.",
        "Extensibility: new sources plug in via the adapter interface.",
      ],
      pipeline: [
        "Pull records from SQL Server",
        "Fetch counterparts from GitHub, Jenkins, Jira",
        "Normalize into comparable Pandas frames",
        "Run reconciliation rules",
        "Email alert on any violation",
      ],
      screenshots: [],
      challenges: [],
      tradeoffs: [],
      lessons: [],
      futureWork: [],
    },
  },
  {
    id: "deeptest-agent",
    slug: "deeptest-agent",
    title: "DeepTest Agent",
    tagline:
      "GraphRAG code-debugging agent for automated bug detection and test-case generation.",
    year: "2025",
    type: "Academic",
    categories: ["Agentic AI", "RAG", "LLM"],
    problem:
      "Automated testing tools struggle to reason about how a bug propagates through a codebase, and generic RAG loses the structural relationships between functions.",
    solution:
      "A GraphRAG testing agent that fuses FAISS vector search with a Neo4j knowledge graph to model code structure, driven by a LangGraph agent that executes code safely inside a Docker sandbox.",
    tech: [
      "GraphRAG",
      "FAISS",
      "Neo4j",
      "LangGraph",
      "Docker",
      "LLM",
      "Python",
    ],
    results: [
      "Automated bug detection and test-case generation",
      "GraphRAG models structural code relationships",
      "Secure Docker-sandboxed code execution",
    ],
    github: "https://github.com/karim12348585",
    featured: true,
    accent: "from-emerald-400 to-green-500",
    caseStudy: {
      overview:
        "DeepTest Agent is an academic project exploring enterprise-scale AI testing: an agent that finds bugs and writes tests by combining semantic retrieval with a graph model of code structure, then verifies its own hypotheses by running code in a sandbox.",
      problemStatement:
        "Bugs rarely live in a single function; they emerge from interactions. Flat retrieval misses those relationships, and letting an LLM run arbitrary code is a security risk.",
      businessValue: [
        "Higher-coverage, structurally-aware test generation.",
        "Safer automation via sandboxed execution.",
        "Earlier bug detection in the development cycle.",
      ],
      architecture:
        "GraphRAG unifies FAISS (semantic similarity) with Neo4j (call graphs and dependencies). A LangGraph agent plans, retrieves relevant structure, generates candidate tests, and executes them inside an isolated Docker container to observe real behaviour.",
      systemDesign: [
        "Index code into FAISS embeddings and a Neo4j graph.",
        "GraphRAG retrieval blends semantic + structural neighbours.",
        "Agent generates targeted test cases.",
        "Docker sandbox executes and reports pass/fail safely.",
      ],
      pipeline: [
        "Ingest and index codebase (FAISS + Neo4j)",
        "GraphRAG retrieval for a target function",
        "Generate candidate tests",
        "Execute in Docker sandbox",
        "Report bugs and passing tests",
      ],
      screenshots: [],
      challenges: [
        "Designing a retrieval score that balances semantic and graph proximity.",
        "Hardening the Docker sandbox against untrusted generated code.",
      ],
      tradeoffs: [
        "GraphRAG added indexing overhead but produced far better structural context than flat RAG.",
      ],
      lessons: [
        "Verification-by-execution grounds an agent in reality instead of plausible-sounding guesses.",
      ],
      futureWork: [
        "Coverage-guided test generation.",
        "Support for more languages and build systems.",
      ],
    },
  },
  {
    id: "market-skill-insights",
    slug: "market-skill-insights",
    title: "AI Market Skill Insights & Roadmap",
    tagline:
      "Scrapes job descriptions, extracts in-demand skills with LLMs, and generates personalized upskilling roadmaps.",
    year: "2024",
    type: "Academic",
    categories: ["NLP", "LLM", "Machine Learning", "Data Engineering"],
    problem:
      "Job seekers struggle to know which skills the market actually demands and how their own resume measures up against it.",
    solution:
      "A pipeline that scrapes LinkedIn job descriptions, extracts skills via LLMs, clusters them with HDBSCAN to surface demand, and generates personalized upskilling roadmaps tailored to a candidate's resume.",
    tech: [
      "LLM",
      "HDBSCAN",
      "Selenium",
      "BeautifulSoup",
      "Python",
      "Pandas",
    ],
    results: [
      "Surfaces the most in-demand skills from real job postings",
      "HDBSCAN clustering groups related skills automatically",
      "Personalized roadmap generated per candidate resume",
    ],
    github: "https://github.com/karim12348585",
    featured: true,
    accent: "from-teal-400 to-emerald-500",
    caseStudy: {
      overview:
        "An end-to-end NLP pipeline that answers a practical question: given today's job market, what should I learn next? It scrapes postings, extracts and clusters skills, then maps the gap against your resume into an actionable roadmap.",
      problemStatement:
        "Skill demand is buried in unstructured job descriptions and changes constantly. Manually tracking it is impractical.",
      businessValue: [
        "Data-driven career guidance instead of guesswork.",
        "Reusable market-intelligence pipeline for any role.",
      ],
      architecture:
        "Selenium + BeautifulSoup scrape postings; an LLM extracts normalized skills; HDBSCAN clusters embeddings to reveal demand structure; a generation step diffs demand against resume skills to produce a roadmap.",
      systemDesign: [
        "Scrape LinkedIn job descriptions at scale.",
        "LLM-based skill extraction and normalization.",
        "Embed and cluster skills with HDBSCAN.",
        "Diff against resume; generate roadmap.",
      ],
      pipeline: [
        "Scrape postings",
        "Extract skills (LLM)",
        "Cluster with HDBSCAN",
        "Compare to resume",
        "Generate personalized roadmap",
      ],
      screenshots: [],
      challenges: [
        "Noisy, inconsistent skill naming across postings required LLM normalization.",
        "HDBSCAN parameter tuning to get meaningful clusters.",
      ],
      tradeoffs: [
        "HDBSCAN over K-means to avoid pre-committing to a cluster count.",
      ],
      lessons: [
        "LLMs are excellent normalizers of messy real-world text before classical ML.",
      ],
      futureWork: [
        "Track demand trends over time.",
        "Broaden sources beyond a single job board.",
      ],
    },
  },
  {
    id: "ai-face-detection",
    slug: "ai-generated-face-detection",
    title: "AI-Generated Face Detection",
    tagline:
      "Fine-tuned Vision Transformer with LoRA and explainability, reaching 95% test accuracy.",
    year: "2024",
    type: "Academic",
    categories: ["Computer Vision", "Deep Learning"],
    problem:
      "Distinguishing AI-generated faces from real photographs is increasingly hard and increasingly important for trust and safety.",
    solution:
      "A Vision Transformer fine-tuned with LoRA, Optuna hyperparameter optimization, regularization, and LR scheduling, plus explainability (XAI) for interpretable predictions — achieving 95% test accuracy.",
    tech: [
      "Vision Transformer",
      "LoRA",
      "Optuna",
      "PyTorch",
      "XAI",
      "Python",
    ],
    results: [
      "95% test accuracy on AI-vs-real face classification",
      "LoRA fine-tuning for parameter-efficient training",
      "Explainable predictions via XAI attribution",
    ],
    github: "https://github.com/karim12348585",
    featured: true,
    accent: "from-green-500 to-teal-400",
    caseStudy: {
      overview:
        "A deep-learning project that fine-tunes a Vision Transformer to detect AI-generated faces, prioritising both accuracy and interpretability so the model's decisions can be trusted and audited.",
      problemStatement:
        "Generative models produce faces that fool humans. A reliable, explainable detector is needed for content authenticity.",
      businessValue: [
        "Content authenticity and trust-and-safety tooling.",
        "Parameter-efficient training keeps compute cost low.",
      ],
      architecture:
        "A pretrained ViT backbone is adapted with LoRA adapters. Optuna searches hyperparameters; regularization and LR scheduling stabilise training. Gradient-based XAI produces saliency explanations for each prediction.",
      systemDesign: [
        "Preprocess and augment the face dataset.",
        "Attach LoRA adapters to a pretrained ViT.",
        "Optuna hyperparameter search.",
        "Train with regularization + LR scheduling.",
        "Generate XAI saliency maps.",
      ],
      pipeline: [
        "Data prep & augmentation",
        "LoRA fine-tune ViT",
        "Optuna optimization",
        "Evaluate (95% accuracy)",
        "Explainability attribution",
      ],
      screenshots: [],
      challenges: [
        "Avoiding overfitting on subtle generative artifacts.",
        "Making transformer decisions interpretable via XAI.",
      ],
      tradeoffs: [
        "LoRA over full fine-tuning for efficiency with minimal accuracy loss.",
      ],
      lessons: [
        "Explainability isn't optional for trust-and-safety models.",
      ],
      futureWork: [
        "Generalize across newer generative models.",
        "Robustness testing against adversarial inputs.",
      ],
    },
  },
  {
    id: "ats-resume-filtering",
    slug: "ats-resume-filtering",
    title: "ATS Resume Filtering System",
    tagline:
      "Ranks candidates against a role using Gemini and SBERT embeddings with similarity scoring and feedback.",
    year: "2023",
    type: "Academic",
    categories: ["NLP", "LLM", "Machine Learning"],
    problem:
      "Screening large volumes of resumes against a job description is tedious, subjective, and inconsistent.",
    solution:
      "A resume-evaluation system using the Gemini LLM and SBERT embeddings to extract skills and experience, ranking candidates via cosine and Jaccard similarity and returning personalized feedback.",
    tech: ["Gemini", "SBERT", "Cosine Similarity", "Jaccard", "Python", "NLP"],
    results: [
      "Automated skill & experience extraction from resumes",
      "Candidate ranking via cosine and Jaccard similarity",
      "Personalized, actionable feedback per candidate",
    ],
    github: "https://github.com/karim12348585",
    featured: true,
    accent: "from-cyan-400 to-emerald-500",
    caseStudy: {
      overview:
        "An applicant-tracking-style system that scores resumes against a job description using both LLM extraction and sentence embeddings, then explains the score with concrete feedback.",
      problemStatement:
        "Keyword-based ATS filters are brittle and miss semantically-relevant candidates.",
      businessValue: [
        "Fairer, semantics-aware candidate ranking.",
        "Actionable feedback improves candidate experience.",
      ],
      architecture:
        "Gemini extracts structured skills and experience from resumes and the job description; SBERT embeds them; cosine and Jaccard similarities combine into a ranking score, with a feedback generation step.",
      systemDesign: [
        "Extract skills/experience with Gemini.",
        "Embed with SBERT.",
        "Score with cosine + Jaccard similarity.",
        "Generate personalized feedback.",
      ],
      pipeline: [
        "Parse resume + job description",
        "LLM extraction",
        "SBERT embedding",
        "Similarity scoring",
        "Feedback generation",
      ],
      screenshots: [],
      challenges: [
        "Combining lexical (Jaccard) and semantic (cosine) signals sensibly.",
        "Consistent structured extraction from varied resume formats.",
      ],
      tradeoffs: [
        "Blended similarity metrics over a single score for robustness.",
      ],
      lessons: [
        "Semantic embeddings surface strong candidates that keyword filters drop.",
      ],
      futureWork: [
        "Bias auditing of the ranking.",
        "Recruiter-facing dashboard.",
      ],
    },
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
