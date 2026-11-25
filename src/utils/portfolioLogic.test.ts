import test from "node:test";
import assert from "node:assert/strict";
import { projects, getProjectBySlug } from "../data/projects";
import { blogPosts } from "../data/blog";
import { experiences } from "../data/experience";
import { certificationGroups } from "../data/certifications";
import { education, languages } from "../data/education";
import { skillCategories } from "../data/skills";
import { getHeroImage } from "./projectImage";
import { buildMailto } from "./mailto";
import {
  clamp01,
  computePortraitTransform,
  computeScrollProgress,
  smoothstep,
} from "./portraitMorph";
import {
  buildProjectAgentLogs,
  computeSkillResourceMetrics,
  countBlogPostsByCategory,
  countProjectsByType,
  filterBlogPosts,
  filterProjects,
  getAdjacentProjectSlug,
  getCaseStudySectionPlan,
  resolveSelectedProject,
  searchProjects,
  validateContactForm,
} from "./portfolioLogic";

test("project data integrity and slug lookup", () => {
  assert.equal(projects.length, 10);
  const copilot = getProjectBySlug("dataops-copilot");
  assert.ok(copilot);
  assert.equal(copilot.title, "DataOps Copilot");
  assert.equal(copilot.type, "Industrial");
  assert.equal(copilot.companyUrl, "http://kpit.com/");

  const codeIntel = getProjectBySlug("agentic-code-intelligence");
  assert.ok(codeIntel);
  assert.equal(codeIntel.companyUrl, "http://kpit.com/");

  const primatec = getProjectBySlug("data-pipeline-monitoring");
  assert.ok(primatec);
  assert.equal(
    primatec.companyUrl,
    "https://fr.linkedin.com/company/primatec-engineering",
  );

  assert.equal(getProjectBySlug("non-existent-slug"), undefined);
});

test("countProjectsByType returns exact counts across Industrial, Freelance, and Academic", () => {
  const counts = countProjectsByType(projects);
  assert.equal(counts.All, 10);
  assert.equal(counts.Industrial, 3);
  assert.equal(counts.Freelance, 1);
  assert.equal(counts.Academic, 6);
});

test("filterProjects filters accurately by type and category", () => {
  const industrial = filterProjects(projects, "Industrial", "All");
  assert.equal(industrial.length, 3);
  assert.ok(industrial.every((p) => p.type === "Industrial"));

  const freelance = filterProjects(projects, "Freelance", "All");
  assert.equal(freelance.length, 1);
  assert.equal(freelance[0].slug, "tounsi-chat");

  const ragIndustrial = filterProjects(projects, "Industrial", "RAG");
  assert.equal(ragIndustrial.length, 2);
});

test("getHeroImage selects cover first, then first screenshot, then diagram", () => {
  const tounsi = getProjectBySlug("tounsi-chat")!;
  const tounsiHero = getHeroImage(tounsi);
  assert.ok(tounsiHero);
  assert.equal(tounsiHero.isCover, true);
  assert.equal(tounsiHero.src, "/projects/freelance/tounsi-chat/cover.jpg");

  const copilot = getProjectBySlug("dataops-copilot")!;
  const copilotHero = getHeroImage(copilot);
  assert.ok(copilotHero);
  assert.equal(copilotHero.src, "/projects/dataops-copilot/live-progress.png");

  const pipelineMonitoring = getProjectBySlug("data-pipeline-monitoring")!;
  assert.equal(getHeroImage(pipelineMonitoring), null);
});

test("validateContactForm catches invalid inputs and passes valid input", () => {
  const emptyErrors = validateContactForm({ name: "  ", email: "bad", message: "short" });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.message);

  const validErrors = validateContactForm({
    name: "Recruiter Jane",
    email: "jane@company.com",
    message: "We would love to interview you for our AI Engineer role.",
  });
  assert.deepEqual(validErrors, {});
});

test("buildMailto encodes subject and body properly", () => {
  const url = buildMailto("karimsouissi30@gmail.com", {
    subject: "AI Role",
    body: "Hello Karim",
  });
  assert.ok(url.startsWith("mailto:karimsouissi30@gmail.com?"));
  assert.ok(url.includes("subject=AI+Role"));
  assert.ok(url.includes("body=Hello+Karim"));
});

test("every project has non-empty title, description, and valid GitHub link for ProjectGallery", () => {
  for (const p of projects) {
    assert.ok(p.title.trim().length > 0);
    assert.ok(p.tagline.trim().length > 0);
    assert.ok(p.solution.trim().length > 0);
    const repoUrl = p.github ?? "https://github.com/karim12348585";
    assert.ok(repoUrl.startsWith("https://github.com/"));
  }
});

test("buildProjectAgentLogs generates structured real-time agent logs for every project", () => {
  for (const p of projects) {
    const logs = buildProjectAgentLogs(p);
    assert.ok(logs.length >= 4, `Expected at least 4 log entries for ${p.slug}`);
    assert.equal(logs[0].level, "init");
    assert.ok(logs[0].message.includes(p.title));
    assert.equal(logs[logs.length - 1].level, "success");
  }
});

test("computeSkillResourceMetrics calculates valid system resource monitor bars for all skills", () => {
  const allSkills = skillCategories.flatMap((c) => c.skills);
  assert.ok(allSkills.length > 40);
  allSkills.forEach((s, idx) => {
    const m = computeSkillResourceMetrics(s, idx);
    assert.ok(m.allocationPct >= 55 && m.allocationPct <= 99);
    assert.equal(m.totalSegments, 16);
    assert.ok(m.filledSegments >= 1 && m.filledSegments <= 16);
    assert.ok(m.channelId.startsWith("SYS-"));
  });
});

test("resolveSelectedProject keeps valid selection and falls back cleanly on filter change", () => {
  const industrial = filterProjects(projects, "Industrial", "All");
  const kept = resolveSelectedProject(industrial, industrial[1].slug);
  assert.equal(kept?.slug, industrial[1].slug);

  const fallback = resolveSelectedProject(industrial, "tounsi-chat");
  assert.equal(fallback?.slug, industrial[0].slug);

  assert.equal(resolveSelectedProject([], "dataops-copilot"), null);
});

test("getAdjacentProjectSlug steps forward and backward with wrap-around", () => {
  const industrial = filterProjects(projects, "Industrial", "All");
  assert.equal(
    getAdjacentProjectSlug(industrial, industrial[0].slug, 1),
    industrial[1].slug,
  );
  assert.equal(
    getAdjacentProjectSlug(industrial, industrial[0].slug, -1),
    industrial[industrial.length - 1].slug,
  );
  assert.equal(
    getAdjacentProjectSlug(industrial, industrial[industrial.length - 1].slug, 1),
    industrial[0].slug,
  );
  assert.equal(getAdjacentProjectSlug([], null, 1), null);
});

test("blogPosts is empty by default and blog filter helpers work across categories and queries", () => {
  assert.equal(blogPosts.length, 0);
  const emptyCounts = countBlogPostsByCategory(blogPosts);
  assert.equal(emptyCounts.All, 0);

  const samplePosts = [
    {
      id: "p1",
      slug: "langgraph-rca",
      title: "Bounded LangGraph Workflows",
      excerpt: "State machines for reliable agentic triage.",
      publishedAt: "March 2026",
      readTime: "5 min read",
      category: "Agentic AI" as const,
      tags: ["LangGraph", "MCP"],
      keyTakeaways: [],
      sections: [],
    },
    {
      id: "p2",
      slug: "hybrid-rag",
      title: "Hybrid Graph + Vector Search",
      excerpt: "Combining Neo4j and ChromaDB.",
      publishedAt: "April 2026",
      readTime: "6 min read",
      category: "RAG & Search" as const,
      tags: ["Neo4j", "RAG"],
      keyTakeaways: [],
      sections: [],
    },
  ];

  const counts = countBlogPostsByCategory(samplePosts);
  assert.equal(counts.All, 2);
  assert.equal(counts["Agentic AI"], 1);
  assert.equal(counts["RAG & Search"], 1);
  assert.equal(counts["LLMOps & Eval"], 0);
  assert.equal(counts["Data Engineering"], 0);

  const agentic = filterBlogPosts(samplePosts, "Agentic AI", "");
  assert.equal(agentic.length, 1);
  assert.equal(agentic[0].id, "p1");

  const langGraphSearch = filterBlogPosts(samplePosts, "All", "langgraph");
  assert.equal(langGraphSearch.length, 1);

  const emptySearch = filterBlogPosts(samplePosts, "All", "zzzz-nonexistent-term");
  assert.equal(emptySearch.length, 0);
});

test("searchProjects filters projects across title, tech stack, company, and categories", () => {
  assert.equal(searchProjects(projects, "").length, projects.length);
  assert.equal(searchProjects(projects, "   ").length, projects.length);

  const langGraphMatches = searchProjects(projects, "LangGraph");
  assert.ok(langGraphMatches.length >= 1);
  assert.ok(
    langGraphMatches.some((p) => p.slug === "dataops-copilot"),
  );

  const neo4jMatches = searchProjects(projects, "neo4j");
  assert.ok(neo4jMatches.length >= 1);

  assert.equal(searchProjects(projects, "zzzz-no-project-match").length, 0);
});

test("experiences include DJO Tounsi Chat freelance entry and explicit role titles", () => {
  assert.equal(experiences.length, 4);
  const djo = experiences.find((e) => e.id === "djo-tounsi-chat");
  assert.ok(djo);
  assert.equal(djo.company, "DJO");
  assert.equal(djo.companyUrl, "https://djoassist.com/");
  assert.equal(djo.employmentType, "Freelance");
  assert.equal(djo.duration, "Oct – Nov 2026");
  assert.equal(djo.projectSlug, "tounsi-chat");
  assert.ok(
    experiences.some((e) => e.role === "AI Engineer Intern"),
    "Expected explicit AI Engineer Intern role",
  );
  assert.ok(
    experiences.some((e) => e.role === "Data Engineer Intern"),
    "Expected explicit Data Engineer Intern role",
  );

  const kpitEos = experiences.find((e) => e.id === "kpit-eos");
  const kpitCode = experiences.find((e) => e.id === "kpit-code");
  const primatecExp = experiences.find((e) => e.id === "primatec");
  assert.equal(kpitEos?.companyUrl, "http://kpit.com/");
  assert.equal(kpitCode?.companyUrl, "http://kpit.com/");
  assert.equal(
    primatecExp?.companyUrl,
    "https://fr.linkedin.com/company/primatec-engineering",
  );
});

test("certificationGroups structure 4 issuer cards with Microsoft badges and 4 verified 365 Data Science certificates", () => {
  assert.equal(certificationGroups.length, 4);
  assert.deepEqual(
    certificationGroups.map((g) => g.issuer),
    ["DeepLearning.AI", "Stanford University", "Microsoft", "365 Data Science"],
  );
  assert.equal(certificationGroups[0].badge, "/badges/deeplearning-ai.png");
  assert.equal(certificationGroups[1].badge, "/badges/stanford-university.svg");
  assert.equal(certificationGroups[2].badge, "/badges/microsoft.svg");

  const ms = certificationGroups[2];
  assert.equal(ms.items.length, 3);
  assert.equal(ms.items[0].title, "SQL AI Developer Associate");
  assert.equal(ms.items[0].code, "DP-800");
  assert.equal(ms.items[0].status, "In progress");
  assert.equal(ms.items[0].badge, "/badges/azure-sql-ai-developer.svg");
  assert.equal(ms.items[1].code, "AI-900");
  assert.equal(ms.items[2].code, "DP-900");

  const ds365 = certificationGroups[3];
  assert.equal(ds365.year, "2026");
  assert.equal(ds365.allVerified, undefined);
  assert.equal(ds365.items.length, 4);
  assert.deepEqual(
    ds365.items.map((item) => item.link),
    [
      "https://learn.365datascience.com/certificates/CC-F600E27A28/",
      "https://learn.365datascience.com/certificates/CC-26732E14BF/",
      "https://learn.365datascience.com/certificates/CC-2D8F0A1330/",
      "https://learn.365datascience.com/certificates/CC-4884ECA985/",
    ],
  );
});

test("portrait morph scroll progress and Hero-to-About transform interpolate cleanly", () => {
  assert.equal(clamp01(-0.4), 0);
  assert.equal(clamp01(1.8), 1);
  assert.equal(smoothstep(0), 0);
  assert.equal(smoothstep(0.5), 0.5);
  assert.equal(smoothstep(1), 1);

  assert.equal(computeScrollProgress(0, 24, 824), 0);
  assert.equal(computeScrollProgress(424, 24, 824), 0.5);
  assert.equal(computeScrollProgress(900, 24, 824), 1);

  const heroRect = { left: 900, top: 180, width: 360, height: 540 };
  const aboutRect = { left: 140, top: 960, width: 312, height: 468 };

  const start = computePortraitTransform(heroRect, aboutRect, 0);
  assert.equal(start.x, 900);
  assert.equal(start.y, 180);
  assert.equal(start.scale, 1);
  assert.equal(start.rotateDeg, 0);
  assert.equal(start.heroBadgeOpacity, 1);
  assert.equal(start.aboutBadgeOpacity, 0);

  const mid = computePortraitTransform(heroRect, aboutRect, 0.5);
  assert.equal(mid.x, 520);
  assert.equal(mid.y, 570);
  assert.ok(mid.scale < 1 && mid.scale > 312 / 360);
  assert.ok(mid.rotateDeg < 0);
  assert.equal(mid.heroBadgeOpacity, 0);
  assert.equal(mid.aboutBadgeOpacity, 0);

  const end = computePortraitTransform(heroRect, aboutRect, 1);
  assert.equal(end.x, 140);
  assert.equal(end.y, 960);
  assert.ok(Math.abs(end.scale - 312 / 360) < 1e-6);
  assert.ok(Math.abs(end.rotateDeg) < 1e-6);
  assert.equal(end.heroBadgeOpacity, 0);
  assert.equal(end.aboutBadgeOpacity, 1);
});

test("education timeline and 4-dot languages data match the About section structure", () => {
  assert.equal(education.length, 3);
  assert.equal(education[0].current, true);
  assert.equal(education[0].tags?.length, 2);
  assert.equal(languages.length, 4);
  assert.deepEqual(
    languages.map((l) => [l.name, l.dots, l.level]),
    [
      ["Arabic", 4, "Native"],
      ["English", 3, "Proficient"],
      ["French", 3, "Proficient"],
      ["Spanish", 1, "Basic"],
    ],
  );
});

test("getCaseStudySectionPlan removes Execution Flow when architecture has no picture and always places Architecture after Evaluation", () => {
  for (const p of projects) {
    const plan = getCaseStudySectionPlan(p.caseStudy);
    const ids = plan.map((s) => s.id);
    const hasDiagram = (p.caseStudy.diagrams?.length ?? 0) > 0;

    // Sequential 2-digit numbering with zero gaps
    plan.forEach((sec, idx) => {
      assert.equal(sec.number, String(idx + 1).padStart(2, "0"));
    });

    // Pipeline (Execution Flow) only appears when there is an architecture diagram picture
    assert.equal(
      ids.includes("pipeline"),
      hasDiagram && p.caseStudy.pipeline.length > 0,
      `Pipeline visibility mismatch for ${p.slug}`,
    );

    // Whenever Evaluation exists, Architecture must appear immediately after it
    const evalIdx = ids.indexOf("evaluation");
    const archIdx = ids.indexOf("architecture");
    assert.ok(archIdx >= 0, `Architecture must exist for ${p.slug}`);
    if (evalIdx !== -1) {
      assert.equal(
        archIdx,
        evalIdx + 1,
        `Architecture must immediately follow Evaluation for ${p.slug}`,
      );
    }
  }
});
