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
    accent: "from-indigo-500 to-violet-400",
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
        { label: "Terminal UI", caption: "The DataOps Copilot TUI: pick a failed Jenkins log and the agents start investigating.", src: "/projects/dataops-copilot/tui.png" },
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
    accent: "from-violet-500 to-fuchsia-400",
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
    accent: "from-indigo-600 to-blue-500",
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
      "A GraphRAG bug-hunting agent that maps a codebase into a knowledge graph, reasons over it, and verifies its findings by running code in a sandbox.",
    year: "2025",
    type: "Academic",
    categories: ["Agentic AI", "RAG", "LLM"],
    problem:
      "Linters follow fixed rules and miss logic bugs that span files, and flat RAG loses the structural links (calls, imports, inheritance) that explain how a bug travels through a codebase.",
    solution:
      "A LangGraph ReAct agent with GraphRAG retrieval: a Neo4j knowledge graph for code structure plus ChromaDB embeddings for meaning. It can execute code in a Docker sandbox to back up its findings, and streams its reasoning live to a React UI.",
    tech: [
      "GraphRAG",
      "LangGraph",
      "Neo4j",
      "ChromaDB",
      "LibCST",
      "Llama 3.1 70B (NVIDIA NIM)",
      "Docker",
      "Flask",
      "React",
      "Python",
    ],
    results: [
      "Found all 4 seeded bug classes (ZeroDivision, IndexError, TypeError, KeyError) across a multi-file test project, with a fix for each",
      "Builds a Neo4j code graph (folders → files → classes → functions, CALLS / IMPORTS / INHERITS) with LibCST and writes it to ChromaDB in the same pass",
      "8-tool ReAct agent: semantic search, file reads, caller and import graph queries, and sandboxed run_file / run_test",
      "Live agent reasoning streamed over SSE, ending in a downloadable bug report",
    ],
    github: "https://github.com/karim12348585/Code-Intelligence-BugHunter-Agent",
    featured: true,
    accent: "from-purple-500 to-indigo-400",
    caseStudy: {
      overview:
        "DeepTest Agent (Bug Hunter) is an academic project that gives an LLM agent the two kinds of memory a developer uses when exploring unfamiliar code. A Neo4j knowledge graph holds the structure (what defines, calls, imports and inherits from what). ChromaDB holds meaning, for questions like \"where is authentication handled?\". The agent explores the project through tools, can run code in an isolated Docker container to back up its suspicions, and writes a structured bug report with suggested fixes. A Flask + React web app shows every step of its reasoning live.",
      problemStatement:
        "Bugs rarely live in a single function; they come from interactions across files. Rule-based static analysis can't reason about intent, flat vector retrieval loses the call graph, and letting an LLM run arbitrary code on the host is a security risk.",
      businessValue: [
        "Finds logic bugs that span files, which rule-based linters miss.",
        "Every claim can be traced: the reasoning and tool calls are visible step by step.",
        "Generated code runs in a container, never on the host.",
        "The ingested knowledge graph doubles as a map for onboarding onto unfamiliar code.",
      ],
      architecture:
        "An ingestion pipeline built on LibCST walks the project and writes it to two stores in one pass. Neo4j receives the structural graph: Folder, File, Class, Function and Module nodes, with CONTAINS, DEFINES, CALLS, INHERITS and IMPORTS edges. ChromaDB receives function- and class-level chunks embedded with all-MiniLM-L6-v2. A LangGraph ReAct agent (Llama 3.1 70B via NVIDIA NIM) reasons over both through a tool suite, and a Docker sandbox (python:3.9-slim) runs files and tests in isolation. A Flask backend streams reasoning, actions and tool outputs to the React front end over Server-Sent Events.",
      systemDesign: [
        "LibCST parser: recursive project walk that skips build and VCS artifacts.",
        "Neo4j graph: code structure, call graph and inheritance hierarchy, all queryable with Cypher.",
        "ChromaDB: semantic search over function- and class-level chunks.",
        "ReAct agent with 8 tools: search_code, read_file, get_project_structure, list_files, get_imports, get_callers, run_file, run_test.",
        "Custom regex parser for Llama 3.1's tool-call output format, so tool calls run reliably.",
        "Web app: project dashboard with graph insights, Monaco file explorer, live agent trace and a report viewer.",
      ],
      pipeline: [
        "Ingest the project (LibCST → Neo4j + ChromaDB)",
        "Explore the structure and the graph",
        "Retrieve suspicious code semantically and structurally",
        "Execute files and tests in the Docker sandbox",
        "Write a bug report with suggested fixes",
      ],
      screenshots: [
        {
          label: "Project dashboard",
          caption:
            "Project insights from the knowledge graph (files, nodes, relationships, functions, classes) next to a Monaco-powered file explorer.",
          src: "/projects/deeptest/dashboard.png",
        },
        {
          label: "Live agent execution",
          caption:
            "The agent maps the project structure, runs main_app.py in the sandbox, and decides which file to inspect next.",
          src: "/projects/deeptest/agent-execution.png",
        },
        {
          label: "Tool calls & reasoning",
          caption:
            "Step-by-step read_file calls showing the agent finding the unsafe division and the empty-string index bug.",
          src: "/projects/deeptest/agent-file-reads.png",
        },
        {
          label: "Bug report",
          caption:
            "The final bug analysis report, with a description, location and fix for each issue, ready to download.",
          src: "/projects/deeptest/bug-report.png",
        },
      ],
      challenges: [
        "Llama 3.1 emits tool calls in its own format, so a custom parser was needed to run them reliably.",
        "Balancing structural (graph) and semantic (vector) context without overflowing the prompt.",
        "Keeping generated code isolated while still giving the sandbox enough project context to run integration tests.",
      ],
      tradeoffs: [
        "Dual-writing to Neo4j and ChromaDB costs extra ingestion time but gives far richer context than flat RAG.",
        "Chose a transparent ReAct loop over single-shot prompting, so every conclusion can be traced to a tool call.",
        "Suggests fixes rather than applying them, so a human stays in control.",
      ],
      lessons: [
        "Running the code keeps an agent honest: execution results beat plausible-sounding guesses.",
        "Showing the agent's reasoning matters as much as the verdict when developers need to trust it.",
      ],
      futureWork: [
        "Mount the full project into the sandbox for integration-level verification.",
        "Active patching (write_file / apply_patch) on a git safe-mode branch.",
        "A hypothesise → reproduce → fix → verify loop that retries on failure.",
        "Ship as a GitHub Action that scans pull requests and comments on bugs.",
      ],
    },
  },
  {
    id: "market-skill-insights",
    slug: "market-skill-insights",
    title: "AI Market Skill Insights & Roadmap",
    tagline:
      "Mines local job postings for in-demand skills, compares them with your CV, and generates a personalized learning roadmap.",
    year: "2024",
    type: "Academic",
    categories: ["NLP", "LLM", "Machine Learning", "Data Engineering"],
    problem:
      "Job seekers struggle to know which skills the market actually demands and how their own resume measures up against it.",
    solution:
      "A pipeline that scrapes job descriptions and extracts skills with an LLM. It embeds and clusters the skills (HDBSCAN), names each cluster with an NVIDIA NIM LLM, then compares the market's top skill categories with the skills in your CV and turns the gap into a learning roadmap.",
    tech: [
      "LLM",
      "NVIDIA NIM",
      "HDBSCAN",
      "Embeddings",
      "PCA",
      "Selenium",
      "BeautifulSoup",
      "Python",
      "Pandas",
    ],
    results: [
      "Ranks the top 10 in-demand skill categories by mentions in real postings (MENA & Sub-Saharan market)",
      "HDBSCAN clusters semantically related skills; an LLM gives each cluster a readable name",
      "Extracts skills from an uploaded CV and flags the categories the candidate is missing",
      "Generates a personalized career-insights report and learning roadmap",
    ],
    github: "https://github.com/karim12348585",
    featured: true,
    accent: "from-violet-400 to-indigo-500",
    caseStudy: {
      overview:
        "An end-to-end NLP pipeline that answers a practical question: given today's job market, what should I learn next? It works in three stages. First it scrapes postings for a target role and turns them into ranked skill categories. Next it extracts the skills already in your CV. Finally it compares the two and turns the gap into a focused learning plan.",
      problemStatement:
        "Skill demand is buried in unstructured job descriptions, named inconsistently, and changes constantly. Tracking it by hand and mapping it against your own profile is impractical.",
      businessValue: [
        "Data-driven career guidance instead of guesswork.",
        "Region-specific insight: demand is measured on the local market, not global averages.",
        "Reusable market-intelligence pipeline for any target role.",
      ],
      architecture:
        "Market demand: a web scraper collects postings for the target role, an LLM extracts the skills, the skills are embedded as semantic vectors, and HDBSCAN groups them into clusters. An NVIDIA NIM LLM names each cluster, and the clusters are ranked by how often they're mentioned. Personal skills: the uploaded resume (PDF/DOCX) goes through the same LLM extraction to build a skill profile. Gap analysis: the two skill sets are compared, missing high-demand categories are flagged, and an LLM writes the personalized roadmap.",
      diagrams: [
        {
          src: "/projects/market-skill-insights/architecture.svg",
          caption:
            "Three stages: market demand analysis, personal skill extraction, then gap analysis and roadmap generation.",
        },
      ],
      systemDesign: [
        "Scrape job descriptions for a chosen target role.",
        "LLM-based skill extraction and normalization.",
        "Embed skills, cluster with HDBSCAN, and name the clusters with an NVIDIA NIM LLM.",
        "Rank skill categories by how often they're mentioned in the market.",
        "Extract CV skills, compute the gap, and generate the roadmap.",
      ],
      pipeline: [
        "Choose a target role",
        "Scrape job postings",
        "Extract & embed skills",
        "Cluster, name & rank",
        "Compare with the CV",
        "Generate a personalized roadmap",
      ],
      screenshots: [
        {
          label: "Dashboard",
          caption:
            "Home view: the top 10 market skills next to the upload area.",
          src: "/projects/market-skill-insights/dashboard.png",
        },
        {
          label: "CV skill extraction",
          caption:
            "Top skills demanded for Data Scientist roles, with mention counts, next to the skills extracted from an uploaded CV.",
          src: "/projects/market-skill-insights/cv-analysis.png",
        },
        {
          label: "Skill gap analysis",
          caption:
            "Gap analysis against the MENA & Sub-Saharan market: three high-demand categories flagged as learning priorities.",
          src: "/projects/market-skill-insights/skill-gap.png",
        },
        {
          label: "Roadmap generation",
          caption:
            "The generated career-insights report: a personalized learning roadmap for the missing skills.",
          src: "/projects/market-skill-insights/roadmap.png",
        },
        {
          label: "Skill clusters",
          caption:
            "2D PCA view of the top 10 skill clusters found in local job descriptions.",
          src: "/projects/market-skill-insights/skill-clusters.png",
        },
        {
          label: "LLM cluster labelling",
          caption:
            "Backend log: NVIDIA NIM giving each HDBSCAN cluster a readable skill-category name.",
          src: "/projects/market-skill-insights/cluster-labeling.png",
        },
      ],
      challenges: [
        "Postings name the same skill in many different ways, so the LLM had to normalize them before clustering.",
        "HDBSCAN parameter tuning to get meaningful clusters.",
        "Raw clusters aren't readable, so an LLM labelling step turns them into named categories.",
      ],
      tradeoffs: [
        "HDBSCAN over K-means, so the number of clusters doesn't have to be fixed in advance.",
        "Ranking by mention frequency is simple and explainable, at the cost of ignoring seniority and salary signals.",
      ],
      lessons: [
        "LLMs are excellent at normalizing messy real-world text before classical ML.",
        "Clusters only become useful insight once they have human-readable names.",
      ],
      futureWork: [
        "Track demand trends over time.",
        "Broaden sources beyond a single job board.",
        "Weight skills by seniority and salary signals.",
      ],
    },
  },
  {
    id: "bitcoin-gnn",
    slug: "bitcoin-transaction-gnn",
    title: "Bitcoin Transaction Analysis with GNNs",
    tagline:
      "Detecting illicit Bitcoin transactions on the Elliptic graph by comparing graph-metric ML, Node2Vec embeddings, and GCN / GAT networks.",
    year: "2025",
    type: "Academic",
    categories: ["Graph ML", "Deep Learning", "Machine Learning"],
    problem:
      "Illicit Bitcoin flows hide in a graph of 200k+ transactions, and only a small fraction are known to be illicit. Per-transaction features alone miss how money actually moves between transactions.",
    solution:
      "A head-to-head comparison of three families of node classifiers on the Elliptic dataset: centrality features with a Random Forest, Node2Vec embeddings, and GCN / GAT networks in PyTorch Geometric. All are trained on early time steps and tested on later ones.",
    tech: [
      "PyTorch Geometric",
      "GCN",
      "GAT",
      "Node2Vec",
      "NetworkX",
      "scikit-learn",
      "PyTorch",
      "Python",
    ],
    results: [
      "Modelled 203,769 transactions and 234,355 Bitcoin flows as one directed graph",
      "GCN: 92% accuracy on unseen future time steps (illicit recall 0.53)",
      "GAT catches 91% of illicit transactions, at the cost of many false alarms",
      "Centrality features + Random Forest reached 0.78 illicit F1 on a sampled subgraph",
    ],
    notebook:
      "https://www.kaggle.com/code/karimsouissi/gnn-academic-project-bitcoin-transaction-analysis",
    featured: true,
    accent: "from-amber-500 to-violet-500",
    caseStudy: {
      overview:
        "An academic graph-ML study on Kaggle's Elliptic Bitcoin dataset, where each node is a transaction with 166 features and each edge is a flow of bitcoins between two transactions. The goal is anti-money-laundering: classify transactions as licit or illicit. The notebook compares three generations of graph learning (hand-made graph metrics, shallow random-walk embeddings, and message-passing GNNs) to see what the network structure actually adds.",
      problemStatement:
        "Only about 23% of the 203k transactions carry a label, and illicit ones are a small minority of those. Fraud patterns depend on who transacts with whom, which a tabular model looking at one transaction at a time cannot see.",
      businessValue: [
        "Anti-money-laundering triage: ranks suspicious transactions for compliance analysts.",
        "Testing on later time steps mirrors real deployment, where models score future activity.",
        "Shows clear precision/recall trade-offs between models, so the choice can match the investigation budget.",
      ],
      architecture:
        "The three CSVs (features, classes, edge list) are merged into a NetworkX directed graph and a PyTorch Geometric Data object. Unlabelled nodes stay in the graph so it stays connected, but are excluded from the loss. Approach 1 adds degree, closeness, betweenness, PageRank, clustering and triangle-count features to the raw features and trains a class-balanced Random Forest. Approach 2 learns 64-dimensional Node2Vec embeddings from random walks. Approach 3 trains two-layer GCN and GAT models (multi-head attention, dropout) with class-weighted cross-entropy (illicit weight ×7.6) on time steps ≤ 34, and tests them on later steps.",
      systemDesign: [
        "Data: 203,769 nodes, 234,355 edges, 165 features per node plus its time step.",
        "Graph analytics: centrality metrics on the giant connected component.",
        "Shallow embeddings: Node2Vec (64-d, walk length 10) fed to a Random Forest.",
        "GNNs: GCN (128 hidden) and 2-head GAT (64 hidden) in PyTorch Geometric.",
        "Imbalance handling: class weights and balanced Random Forests.",
        "Evaluation: per-class precision / recall / F1 and confusion matrices.",
      ],
      pipeline: [
        "Load & merge Elliptic features, labels and edges",
        "Build the transaction graph (NetworkX + PyG)",
        "Approach 1: graph metrics + Random Forest",
        "Approach 2: Node2Vec embeddings + Random Forest",
        "Approach 3: GCN & GAT trained on time steps ≤ 34",
        "Compare on held-out later time steps",
      ],
      screenshots: [
        {
          label: "Transaction subgraph",
          caption:
            "The 10 transactions with the highest betweenness centrality and their neighbours: the bridges money flows through.",
          src: "/projects/bitcoin-gnn/betweenness-graph.png",
        },
        {
          label: "GCN vs GAT confusion matrices",
          caption:
            "On future time steps, GCN is more precise while GAT catches 989 of 1,083 illicit transactions but raises more false alarms.",
          src: "/projects/bitcoin-gnn/confusion-matrices.png",
        },
        {
          label: "GNN training loss",
          caption:
            "Training loss over 100 epochs: GCN converges lower and more smoothly than the attention-based GAT.",
          src: "/projects/bitcoin-gnn/training-loss.png",
        },
        {
          label: "Node2Vec t-SNE",
          caption:
            "t-SNE of sampled Node2Vec embeddings. Illicit nodes (yellow) don't separate from structure alone.",
          src: "/projects/bitcoin-gnn/node2vec-tsne.png",
        },
        {
          label: "Degree centrality",
          caption:
            "The 10 most connected transactions, coloured by degree centrality.",
          src: "/projects/bitcoin-gnn/degree-centrality.png",
        },
      ],
      challenges: [
        "Severe class imbalance: handled with class-weighted loss for the GNNs and balanced Random Forests.",
        "Exact betweenness and closeness centrality don't scale to 200k nodes, so graph metrics were computed on a sampled subgraph.",
        "Avoiding look-ahead: models are trained on earlier time steps and tested only on later ones.",
      ],
      tradeoffs: [
        "GCN favours precision (fewer false alarms); GAT favours recall (fewer missed illicit transactions). Which is better depends on the review budget.",
        "Keeping unlabelled nodes in the graph keeps message passing intact but adds compute.",
      ],
      lessons: [
        "Structure alone isn't enough: Node2Vec embeddings without node features barely detected illicit nodes (F1 0.04).",
        "Rich node features plus graph metrics make a strong baseline that GNNs have to beat.",
        "On temporal fraud data, how you split train and test matters as much as the model.",
      ],
      futureWork: [
        "Temporal GNNs (e.g. EvolveGCN) to model how the graph changes over time.",
        "Combine GNN embeddings with the Random Forest in a hybrid model.",
        "Tune the decision threshold to hit a target precision or recall.",
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
    accent: "from-fuchsia-500 to-violet-400",
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
    id: "malaria-classification",
    slug: "malaria-cell-classification",
    title: "Malaria Cell Classification",
    tagline:
      "Detecting malaria-infected blood cells three ways (classical CV + ML, a custom CNN, and ResNet50 transfer learning), with a custom CNN reaching 94% accuracy.",
    year: "2025",
    type: "Academic",
    categories: ["Computer Vision", "Deep Learning", "Machine Learning"],
    problem:
      "Diagnosing malaria from blood smears depends on trained microscopists counting parasitized cells by hand, which is slow, tiring and hard to scale where the disease is most common.",
    solution:
      "A comparison on 27,558 cell images of three approaches. The first engineers OpenCV features (edges plus colour statistics) for a Random Forest. The second trains a custom CNN with augmentation. The third fine-tunes only the head on a frozen ResNet50.",
    tech: [
      "OpenCV",
      "TensorFlow / Keras",
      "CNN",
      "ResNet50",
      "scikit-learn",
      "Random Forest",
      "Python",
    ],
    results: [
      "Custom CNN: 94.07% validation accuracy (F1 0.94) on 5,510 held-out cells",
      "Classical CV + Random Forest: 84.4% from only 9 handcrafted features",
      "Edge density was the strongest handcrafted signal (≈50% of feature importance)",
      "Frozen ResNet50 plateaued at 66.5%, a clear lesson on when transfer learning fails",
    ],
    notebook: "/projects/malaria-classification/malaria-classification.ipynb",
    featured: true,
    accent: "from-rose-500 to-violet-500",
    caseStudy: {
      overview:
        "A computer-vision study on the NIH malaria cell-image dataset (13,780 parasitized and 13,780 uninfected cells). Instead of jumping straight to deep learning, it compares classical image processing, a CNN trained from scratch, and transfer learning on the same task. The goal is to measure what each approach actually contributes.",
      problemStatement:
        "Manual smear reading is the diagnostic gold standard, but it needs expert time that is scarce where malaria is endemic. An accurate automatic cell classifier could pre-screen slides and let experts focus on the uncertain cases.",
      businessValue: [
        "Pre-screening support that cuts microscopist workload.",
        "A lightweight CNN (64×64 input) is cheap enough for low-resource hardware.",
        "The side-by-side comparison shows which modelling effort is actually worth it for this task.",
      ],
      architecture:
        "Classical track: OpenCV grayscale and Gaussian blur, Canny edge detection, and HSV colour segmentation that isolates the stained parasite. Nine features (grayscale mean/std, edge density, per-channel RGB mean/std) feed a Random Forest. Deep-learning track: a three-block CNN (Conv → BatchNorm → MaxPool, 32/64/128 filters, dense head with dropout) trained on 64×64 inputs with rotation, flip and zoom augmentation. Transfer-learning track: an ImageNet ResNet50 kept frozen, with a new pooling + dense head.",
      systemDesign: [
        "Data: 27,558 RGB cell images, balanced classes, 80/20 train/validation split.",
        "Classical CV: Canny edges for shape, colour masks for the parasite stain.",
        "ML: Random Forest (100 trees) on 9 handcrafted features from 5,000 images.",
        "CNN: 3 conv blocks + BatchNorm, Adam, binary cross-entropy, 6 epochs.",
        "Transfer learning: frozen ResNet50 + GlobalAveragePooling + dense head, 20 epochs.",
        "Evaluation: accuracy, classification reports, and a confusion matrix per model.",
      ],
      pipeline: [
        "Load the parasitized / uninfected cell images",
        "Classical CV: edge detection vs colour segmentation",
        "Handcrafted features → Random Forest",
        "Custom CNN with data augmentation",
        "ResNet50 transfer learning",
        "Compare accuracy and confusion matrices",
      ],
      screenshots: [
        {
          label: "Classical CV pipeline",
          caption:
            "An infected cell through the classical pipeline: grayscale, Canny edges, and a colour mask that isolates the parasite.",
          src: "/projects/malaria-classification/color-segmentation.png",
        },
        {
          label: "Model comparison",
          caption:
            "Final accuracy: custom CNN 94.07%, classical ML 84.40%, frozen ResNet50 66.46%.",
          src: "/projects/malaria-classification/model-comparison.png",
        },
        {
          label: "CNN confusion matrix",
          caption:
            "Custom CNN on 5,510 validation cells: only 202 infected cells missed and 118 false alarms.",
          src: "/projects/malaria-classification/cnn-confusion.png",
        },
        {
          label: "Random Forest confusion matrix",
          caption:
            "Classical ML baseline: balanced errors across both classes at 84.4% accuracy.",
          src: "/projects/malaria-classification/rf-confusion.png",
        },
        {
          label: "ResNet50 confusion matrix",
          caption:
            "Frozen ResNet50: ImageNet features at 64×64 don't transfer well to stained-cell microscopy.",
          src: "/projects/malaria-classification/resnet-confusion.png",
        },
      ],
      challenges: [
        "Choosing handcrafted features that capture the parasite stain rather than the cell outline.",
        "CNN validation accuracy swung sharply early on (down to 50% at epoch 2) before settling at about 94%, so the full curve has to be watched, not one epoch.",
        "Diagnosing why transfer learning underperformed instead of assuming bigger is better.",
      ],
      tradeoffs: [
        "Small 64×64 inputs keep training fast and models light, at the cost of fine detail; this hurt ResNet50 most.",
        "Freezing the ResNet50 backbone saves compute but stops it adapting to microscopy images.",
      ],
      lessons: [
        "A small task-specific CNN can beat a large pretrained network when the domain gap is wide.",
        "Classical CV makes a strong, interpretable baseline: 84% with just 9 features.",
        "Always benchmark simple baselines before reaching for heavier models.",
      ],
      futureWork: [
        "Unfreeze and fine-tune ResNet50 / EfficientNet at higher resolution.",
        "Grad-CAM saliency to check the CNN focuses on the parasite.",
        "Optimize for recall on infected cells, the clinically costly error.",
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
    accent: "from-blue-500 to-indigo-600",
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
