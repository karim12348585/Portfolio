import { useState, type CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { TechIcon, brandColor, getBrand } from "@/components/TechIcon";
import { skillCategories } from "@/data/skills";
import { cn } from "@/utils/cn";
import type { Skill } from "@/types";

const coreStack: { brand: string; label?: string }[] = [
  { brand: "python" },
  { brand: "pytorch" },
  { brand: "langgraph" },
  { brand: "mcp", label: "MCP" },
  { brand: "huggingface" },
  { brand: "meta", label: "FAISS" },
  { brand: "neo4j" },
  { brand: "docker" },
  { brand: "fastapi" },
  { brand: "flask" },
  { brand: "react" },
  { brand: "pandas" },
  { brand: "scikitlearn" },
  { brand: "optuna" },
  { brand: "selenium" },
  { brand: "git" },
];

function SubHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
      <h3 className="font-display text-lg text-fg">{title}</h3>
      {hint && <span className="font-mono text-xs text-faint tabular-nums">{hint}</span>}
    </div>
  );
}

function LogoWall() {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
      {coreStack.map(({ brand, label }) => {
        const logo = getBrand(brand);
        if (!logo) return null;
        const color = brandColor(logo) ?? "var(--accent)";
        return (
          <div
            key={brand}
            style={{ "--brand": color } as CSSProperties}
            className="group flex flex-col items-center gap-1.5 py-2 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <TechIcon
              brand={brand}
              size={22}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="w-full break-words text-center text-[11px] font-medium leading-tight text-muted transition-colors group-hover:text-fg">
              {label ?? logo.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LevelMeter({ level }: { level: number }) {
  return (
    <div
      className="flex gap-1 pt-1"
      role="img"
      aria-label={`Proficiency ${level} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={cn(
            "h-1 w-3.5 rounded-full",
            n <= level ? "bg-accent-gradient" : "bg-line",
          )}
        />
      ))}
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col justify-between border-b border-line py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded border border-line bg-panel-2 text-fg">
            <TechIcon brand={skill.brand} glyph={skill.glyph} size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-snug text-fg">{skill.name}</p>
            <p className="font-mono text-[11px] text-faint tabular-nums">
              {skill.years} {skill.years === 1 ? "yr" : "yrs"}
            </p>
          </div>
        </div>
        <LevelMeter level={skill.level} />
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-muted">
        {skill.description}
      </p>

      {skill.projects.length > 0 && (
        <p
          className="mt-1.5 truncate font-mono text-[11px] text-faint"
          title={skill.projects.join(" · ")}
        >
          {skill.projects.join(" · ")}
        </p>
      )}
    </div>
  );
}

function SkillExplorer() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <div className="mt-4 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
      <div
        role="tablist"
        aria-label="Skill categories"
        className="flex w-full min-w-0 gap-1.5 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
      >
        <LayoutGroup id="skill-cats">
          {skillCategories.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-xs transition-colors sm:text-sm lg:w-full",
                  isActive
                    ? "border-accent/40 bg-accent/10 text-fg font-medium"
                    : "border-line bg-panel text-muted hover:text-fg lg:border-transparent lg:bg-transparent lg:hover:bg-panel-2/60",
                )}
              >
                <Icon
                  name={c.icon}
                  size={14}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-accent" : "text-faint",
                  )}
                />
                <span className="flex-1 whitespace-nowrap">{c.name}</span>
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    isActive ? "text-accent" : "text-faint",
                  )}
                >
                  {c.skills.length}
                </span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Open Skill List */}
      <div role="tabpanel" className="mt-3 lg:mt-0">
        <div className="mb-1.5 flex items-center justify-between gap-3 border-b border-line pb-2">
          <div className="flex items-center gap-2">
            <Icon name={cat.icon} size={15} className="text-accent" />
            <h4 className="font-display text-base font-bold text-fg">{cat.name}</h4>
          </div>
          <span className="shrink-0 font-mono text-xs text-faint tabular-nums">
            {cat.skills.length} skills · scale 1–5
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="grid gap-x-8 sm:grid-cols-2"
          >
            {cat.skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Expertise() {
  return (
    <section id="skills" className="section scroll-mt-24 py-12">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="The toolkit"
        description="The tools and techniques behind the projects, with proficiency, experience and where each one was used."
      />

      <div className="mt-7">
        <SubHeading title="Core stack" />
        <LogoWall />
      </div>

      <div className="mt-8">
        <SubHeading
          title="Explore by category"
          hint={`${skillCategories.reduce((n, c) => n + c.skills.length, 0)} skills across ${skillCategories.length} areas`}
        />
        <SkillExplorer />
      </div>
    </section>
  );
}
