import { useState, type CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Clock, FolderGit2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { TechIcon, brandColor, getBrand } from "@/components/TechIcon";
import { skillCategories } from "@/data/skills";
import type { Skill } from "@/types";
import { cn } from "@/utils/cn";

/** Curated order for the logo wall; labels override the brand's own name. */
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

/** Section label with a hairline rule, e.g. "Core stack ────". */
function SubHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-faint">
        {title}
      </h3>
      <div className="h-px flex-1 bg-line" />
      {hint && (
        <span className="hidden shrink-0 text-xs text-faint sm:block">
          {hint}
        </span>
      )}
    </div>
  );
}

/** Wall of real tool logos in their brand colours. */
function LogoWall() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 lg:grid-cols-9">
      {coreStack.map(({ brand, label }, i) => {
        const logo = getBrand(brand);
        if (!logo) return null;
        const color = brandColor(logo) ?? "rgb(var(--accent))";
        return (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
            style={{ "--brand": color } as CSSProperties}
            className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-panel px-1.5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:[border-color:var(--brand)] hover:[box-shadow:0_10px_30px_-14px_var(--brand)] sm:py-4"
          >
            <TechIcon
              brand={brand}
              size={28}
              className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7"
            />
            <span className="w-full break-words text-center text-[10px] font-medium leading-tight text-muted transition-colors group-hover:text-fg sm:text-xs">
              {label ?? logo.title}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/** Five-step proficiency meter. */
function LevelMeter({ level }: { level: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Proficiency ${level} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={cn(
            "h-1.5 w-5 rounded-full",
            n <= level ? "bg-accent-gradient" : "bg-line",
          )}
        />
      ))}
    </div>
  );
}

function SkillTile({ skill }: { skill: Skill }) {
  const logo = getBrand(skill.brand);
  const color = logo ? brandColor(logo) : undefined;

  return (
    <div className="flex flex-col rounded-xl border border-line bg-panel-2 p-4 transition-colors hover:border-accent/40">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-lg",
            !color && "bg-accent/10 text-accent",
          )}
          // Tint the tile with the brand colour at ~10% opacity.
          style={color ? { backgroundColor: `${color}1a` } : undefined}
        >
          <TechIcon brand={skill.brand} glyph={skill.glyph} size={20} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-fg">
            {skill.name}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-faint">
            <Clock size={11} />
            {skill.years} {skill.years === 1 ? "yr" : "yrs"}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <LevelMeter level={skill.level} />
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
        {skill.description}
      </p>

      {skill.projects.length > 0 && (
        <p
          className="mt-3 flex items-center gap-1.5 border-t border-line pt-2.5 text-[11px] text-faint"
          title={skill.projects.join(" · ")}
        >
          <FolderGit2 size={12} className="shrink-0 text-accent" />
          <span className="truncate">{skill.projects.join(" · ")}</span>
        </p>
      )}
    </div>
  );
}

/** Category menu + skill panel; one category is shown at a time. */
function SkillExplorer() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <div className="mt-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-6">
      {/* Category menu: chip row on mobile, vertical list on desktop */}
      <div
        role="tablist"
        aria-label="Skill categories"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
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
                onClick={(e) => {
                  setActive(i);
                  // Keep the chosen chip visible in the mobile chip row.
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                className={cn(
                  "relative flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors lg:w-full lg:border-transparent lg:py-2.5",
                  isActive
                    ? "border-accent/40 text-fg"
                    : "border-line text-muted hover:text-fg lg:hover:bg-panel",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-cat-pill"
                    className="absolute inset-0 -z-10 rounded-xl border border-accent/30 bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  name={c.icon}
                  size={16}
                  className={cn("shrink-0", isActive ? "text-accent" : "text-faint")}
                />
                <span className="flex-1 whitespace-nowrap font-medium">
                  {c.name}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[10px] leading-4",
                    isActive ? "bg-accent/15 text-accent" : "bg-line/60 text-faint",
                  )}
                >
                  {c.skills.length}
                </span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Skill panel */}
      <div
        role="tabpanel"
        className="mt-3 rounded-2xl border border-line bg-panel p-4 sm:p-5 lg:mt-0"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
              <Icon name={cat.icon} size={18} />
            </div>
            <h4 className="font-semibold tracking-tight">{cat.name}</h4>
          </div>
          <span className="shrink-0 text-xs text-faint">
            {cat.skills.length} skills
            <span className="hidden sm:inline"> · proficiency out of 5</span>
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {cat.skills.map((s) => (
              <SkillTile key={s.name} skill={s} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Expertise — the toolkit behind the projects: a wall of real tool logos,
 * then a category explorer with proficiency, experience and project usage.
 * Placed after the projects so the work comes first, then the skills.
 */
export function Expertise() {
  return (
    <section id="skills" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Skills"
        title="The toolkit"
        description="The tools and techniques behind the projects, with proficiency, experience and where each one was used."
      />

      <div className="mt-14">
        <SubHeading title="Core stack" />
        <LogoWall />
      </div>

      <div className="mt-16">
        <SubHeading
          title="Explore by category"
          hint={`${skillCategories.reduce((n, c) => n + c.skills.length, 0)} skills across ${skillCategories.length} areas`}
        />
        <SkillExplorer />
      </div>
    </section>
  );
}
