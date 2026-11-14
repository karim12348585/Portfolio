import { useState, type CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
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

const pad = (n: number) => String(n).padStart(2, "0");

/** Sub-section label with its index and a hairline. */
function SubHeading({
  index,
  title,
  hint,
}: {
  index: string;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <h3 className="flex shrink-0 items-baseline gap-3">
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">
          {index}
        </span>
        <span className="mono-label text-fg">{title}</span>
      </h3>
      <div className="h-px flex-1 translate-y-[-3px] bg-line" />
      {hint && (
        <span className="mono-label hidden shrink-0 sm:block">{hint}</span>
      )}
    </div>
  );
}

/** Wall of real tool logos: ink by default, brand colour on hover. */
function LogoWall() {
  return (
    <div className="ruled-grid mt-6 grid-cols-4 sm:grid-cols-6 lg:grid-cols-8">
      {coreStack.map(({ brand, label }, i) => {
        const logo = getBrand(brand);
        if (!logo) return null;
        const color = brandColor(logo) ?? "rgb(var(--fg))";
        return (
          <div
            key={brand}
            style={{ "--brand": color } as CSSProperties}
            className="group flex flex-col items-center justify-center px-2 py-5 transition-colors hover:bg-panel sm:py-6"
          >
            {/* Fade the content, not the cell, so the hairline grid never shows through */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
              className="flex flex-col items-center gap-3"
            >
              <TechIcon
                brand={brand}
                tone="mono"
                size={26}
                className="text-fg/70 transition-colors duration-300 group-hover:[color:var(--brand)]"
              />
              <span className="w-full break-words text-center font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-faint transition-colors group-hover:text-fg">
                {label ?? logo.title}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** Five-step proficiency meter drawn as ink squares. */
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
          className={cn("h-2.5 w-2.5", n <= level ? "bg-fg" : "bg-line")}
        />
      ))}
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li className="grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-2 py-4 sm:grid-cols-[2.25rem_minmax(0,1.25fr)_6rem_3.5rem_minmax(0,1fr)] sm:items-center sm:gap-x-5">
      <div className="grid h-9 w-9 place-items-center border border-line bg-panel text-fg">
        <TechIcon brand={skill.brand} glyph={skill.glyph} size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold tracking-tight text-fg">
          {skill.name}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted sm:line-clamp-1">
          {skill.description}
        </p>
      </div>

      {/* On phones the meter and years share the second row */}
      <div className="col-start-2 flex items-center gap-4 sm:col-start-auto sm:block">
        <LevelMeter level={skill.level} />
        <span className="font-mono text-[11px] text-faint sm:hidden">
          {skill.years} {skill.years === 1 ? "yr" : "yrs"}
        </span>
      </div>
      <span className="hidden font-mono text-[11px] text-faint sm:block">
        {skill.years} {skill.years === 1 ? "yr" : "yrs"}
      </span>

      <p
        className={cn(
          "col-start-2 truncate font-mono text-[10px] uppercase tracking-[0.08em] text-faint sm:col-start-auto",
          skill.projects.length === 0 && "hidden sm:block",
        )}
        title={skill.projects.join(" · ")}
      >
        {skill.projects.length > 0 ? skill.projects.join(" · ") : "—"}
      </p>
    </li>
  );
}

/** Category menu + skill table; one category is shown at a time. */
function SkillExplorer() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-8">
      {/* Category menu: chip row on mobile, ruled list on desktop */}
      <div
        role="tablist"
        aria-label="Skill categories"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 no-scrollbar sm:-mx-8 sm:px-8 lg:col-span-3 lg:mx-0 lg:flex-col lg:gap-0 lg:divide-y lg:divide-line lg:overflow-visible lg:border-y lg:border-line lg:px-0 lg:pb-0"
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
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                className={cn(
                  "relative flex shrink-0 items-center gap-2.5 border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.1em] transition-colors lg:w-full lg:border-0 lg:px-0 lg:py-3",
                  isActive
                    ? "border-fg text-fg"
                    : "border-line text-muted hover:border-fg hover:text-fg",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-cat-rule"
                    className="absolute left-0 top-0 hidden h-full w-px bg-accent lg:block"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className={cn(
                    "hidden text-[10px] lg:inline lg:pl-4",
                    isActive ? "text-accent" : "text-faint",
                  )}
                >
                  {pad(i + 1)}
                </span>
                <Icon
                  name={c.icon}
                  size={14}
                  className={cn("shrink-0 lg:hidden", isActive && "text-accent")}
                />
                <span className="flex-1 whitespace-nowrap">{c.name}</span>
                <span
                  className={cn(
                    "text-[10px]",
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

      {/* Skill table */}
      <div role="tabpanel" className="mt-4 lg:col-span-9 lg:mt-0">
        <div className="flex items-center justify-between gap-3 border-b border-fg pb-3">
          <div className="flex items-center gap-2.5">
            <Icon name={cat.icon} size={15} className="text-accent" />
            <h4 className="font-semibold tracking-tight">{cat.name}</h4>
          </div>
          <span className="mono-label shrink-0">
            {cat.skills.length} skills
            <span className="hidden sm:inline"> · proficiency / 5</span>
          </span>
        </div>

        {/* Column heads */}
        <div className="hidden grid-cols-[2.25rem_minmax(0,1.25fr)_6rem_3.5rem_minmax(0,1fr)] gap-x-5 border-b border-line py-2 sm:grid">
          <span />
          <span className="mono-label">Tool / technique</span>
          <span className="mono-label">Level</span>
          <span className="mono-label">Exp.</span>
          <span className="mono-label">Used in</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={cat.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="divide-y divide-line border-b border-line"
          >
            {cat.skills.map((s) => (
              <SkillRow key={s.name} skill={s} />
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Expertise — the toolkit behind the projects: a wall of real tool logos,
 * then a category explorer with proficiency, experience and project usage.
 */
export function Expertise() {
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
  return (
    <section id="skills" className="section scroll-mt-24 py-24">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="The toolkit"
        description="The tools and techniques behind the projects, with proficiency, experience and where each one was used."
      />

      <div className="mt-14">
        <SubHeading index="04.1" title="Core stack" />
        <LogoWall />
      </div>

      <div className="mt-16">
        <SubHeading
          index="04.2"
          title="Explore by category"
          hint={`${total} skills across ${skillCategories.length} areas`}
        />
        <SkillExplorer />
      </div>
    </section>
  );
}
