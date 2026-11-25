import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Gauge,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Icon } from "@/components/Icon";
import { TechIcon, brandColor, getBrand } from "@/components/TechIcon";
import type { Skill, SkillCategory } from "@/types";
import { computeSkillResourceMetrics } from "@/utils/portfolioLogic";
import { cn } from "@/utils/cn";

export interface SkillProficiencyMatrixProps {
  categories: SkillCategory[];
  externalSearch?: string;
  onExternalSearchChange?: (value: string) => void;
  className?: string;
}

function ResourceMonitorBar({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const metrics = computeSkillResourceMetrics(skill, index);
  const segments = Array.from({ length: metrics.totalSegments }, (_, i) => i + 1);

  return (
    <div
      role="img"
      aria-label={`${skill.name} system resource monitor: ${metrics.allocationPct}% allocation (${metrics.tier})`}
      className="rounded-lg border border-line bg-bg/85 p-2.5 font-mono"
    >
      {/* Top Telemetry Readout Row */}
      <div className="mb-1.5 flex items-center justify-between text-[10px]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
          <span className="beacon-dot h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{metrics.tier}</span>
        </span>
        <span className="font-bold text-fg tabular-nums">
          ALLOC:{" "}
          <span className="text-accent">{metrics.allocationPct}%</span>
        </span>
      </div>

      {/* 16-Segment System Resource Monitor Bar */}
      <div className="grid grid-cols-16 gap-1">
        {segments.map((seg) => {
          const isFilled = seg <= metrics.filledSegments;
          const isOverclock = seg > 12;
          const isPeak = seg > 14;
          return (
            <span
              key={seg}
              className={cn(
                "h-3 rounded-[2px] border transition-all duration-300",
                isFilled
                  ? isPeak
                    ? "border-amber-300/80 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]"
                    : isOverclock
                      ? "border-accent-soft/80 bg-accent-soft shadow-[0_0_8px_rgba(255,107,139,0.4)]"
                      : "border-accent/80 bg-accent shadow-[0_0_6px_rgba(0,210,255,0.35)]"
                  : "border-line/70 bg-panel-2/50",
              )}
            />
          );
        })}
      </div>

      {/* Sub-Pixel Continuous Telemetry Rail + Scale Ticks */}
      <div className="mt-2 space-y-1">
        <div className="h-1 w-full overflow-hidden rounded-full bg-panel-2">
          <div
            style={{ width: `${metrics.allocationPct}%` }}
            className="h-full rounded-full bg-gradient-to-r from-accent via-accent-soft to-amber-400"
          />
        </div>
        <div className="flex items-center justify-between text-[9px] text-faint tabular-nums">
          <span>00%</span>
          <span>THROUGHPUT: {metrics.throughputLabel}</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

function SkillResourceCard({
  skill,
  index,
  categoryName,
  viewMode,
}: {
  skill: Skill;
  index: number;
  categoryName?: string;
  viewMode: "grid" | "rack";
}) {
  const logo = getBrand(skill.brand);
  const color = logo ? brandColor(logo) : undefined;
  const metrics = computeSkillResourceMetrics(skill, index);

  if (viewMode === "rack") {
    return (
      <div className="group grid items-center gap-3 rounded-xl border border-line bg-panel-2/60 p-3.5 transition-colors hover:border-accent/60 sm:grid-cols-12">
        <div className="flex min-w-0 items-center gap-3 sm:col-span-4">
          <span className="shrink-0 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] font-bold text-accent tabular-nums">
            {metrics.channelId}
          </span>
          <div
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-panel",
              !color && "text-accent",
            )}
          >
            <TechIcon brand={skill.brand} glyph={skill.glyph} size={16} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate font-display text-sm font-bold text-fg">
                {skill.name}
              </p>
              <span className="rounded bg-accent/15 px-1.5 py-0.2 font-mono text-[10px] font-bold text-accent">
                {metrics.rankCode}
              </span>
            </div>
            <p className="truncate font-mono text-[10px] text-muted">
              {categoryName ? `${categoryName} · ` : ""}
              {skill.years} {skill.years === 1 ? "yr" : "yrs"} experience
            </p>
          </div>
        </div>

        <div className="sm:col-span-5">
          <ResourceMonitorBar skill={skill} index={index} />
        </div>

        <div className="flex flex-col justify-between gap-1 text-right font-mono text-[10px] sm:col-span-3">
          <span className="text-muted line-clamp-1" title={skill.description}>
            {skill.description}
          </span>
          <span className="text-accent">
            {skill.projects.length > 0
              ? `${skill.projects.length} DEPLOYED ${skill.projects.length === 1 ? "SYSTEM" : "SYSTEMS"}`
              : "CORE RUNTIME MODULE"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-panel-2/65 p-4 transition-all duration-150 hover:border-accent/60">
      <div>
        {/* Top Node Channel & Rank Row */}
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-line/70 pb-2 font-mono text-[10px]">
          <span className="inline-flex items-center gap-1.5 text-muted tabular-nums">
            <Cpu size={11} className="text-accent" />
            <span>{metrics.channelId}</span>
            {categoryName && (
              <span className="text-accent">// {categoryName}</span>
            )}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="rounded border border-accent/40 bg-accent/15 px-1.5 py-0.2 font-bold text-accent">
              RANK {metrics.rankCode}
            </span>
            <span className="rounded bg-panel px-1.5 py-0.2 text-muted tabular-nums">
              {skill.years} {skill.years === 1 ? "YR" : "YRS"}
            </span>
          </div>
        </div>

        {/* Skill Identity */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-panel shadow-inner",
              !color && "text-accent",
            )}
          >
            <TechIcon brand={skill.brand} glyph={skill.glyph} size={19} />
          </div>
          <div className="min-w-0">
            <h5 className="truncate font-display text-base font-bold text-fg group-hover:text-accent">
              {skill.name}
            </h5>
            <p className="font-mono text-[10px] text-faint">
              STATUS: ONLINE · LEVEL {skill.level}/5
            </p>
          </div>
        </div>

        {/* System Resource Monitor Progress Bar */}
        <div className="mt-3.5">
          <ResourceMonitorBar skill={skill} index={index} />
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {skill.description}
        </p>
      </div>

      {/* Linked Active Systems Footer */}
      {skill.projects.length > 0 && (
        <div
          className="mt-3.5 truncate border-t border-line pt-2.5 font-mono text-[10px] text-faint"
          title={skill.projects.join(" · ")}
        >
          <span className="font-semibold text-accent">ACTIVE IN: </span>
          <span className="text-muted">{skill.projects.join(" · ")}</span>
        </div>
      )}
    </div>
  );
}

export function SkillProficiencyMatrix({
  categories,
  externalSearch,
  onExternalSearchChange,
  className,
}: SkillProficiencyMatrixProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [internalSearch, setInternalSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "rack">("grid");

  const search = externalSearch !== undefined ? externalSearch : internalSearch;
  const setSearch = (val: string) => {
    if (onExternalSearchChange) onExternalSearchChange(val);
    else setInternalSearch(val);
  };

  const totalSkills = useMemo(
    () => categories.reduce((sum, c) => sum + c.skills.length, 0),
    [categories],
  );

  const sRankCount = useMemo(
    () =>
      categories.reduce(
        (sum, c) => sum + c.skills.filter((s) => s.level >= 5).length,
        0,
      ),
    [categories],
  );

  const activeCategory = categories[activeIndex] ?? categories[0];

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return categories.flatMap((c) =>
      c.skills
        .filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q) ||
            s.projects.some((p) => p.toLowerCase().includes(q)),
        )
        .map((s) => ({ skill: s, categoryName: c.name })),
    );
  }, [categories, search]);

  const displayedSkills = searchResults
    ? searchResults
    : activeCategory.skills.map((s) => ({
        skill: s,
        categoryName: undefined,
      }));

  const avgAllocation = useMemo(() => {
    if (displayedSkills.length === 0) return 0;
    const sum = displayedSkills.reduce(
      (acc, item, idx) =>
        acc + computeSkillResourceMetrics(item.skill, idx).allocationPct,
      0,
    );
    return Math.round(sum / displayedSkills.length);
  }, [displayedSkills]);

  return (
    <div className={cn("deck-frame overflow-hidden", className)}>
      {/* Top Anime HUD System Resource Header Bar */}
      <div className="anime-window-bar flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-accent/40 bg-accent/15 text-accent">
            <Gauge size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent">
              <span>SKILL PROFICIENCY MATRIX // 能力リソース監視</span>
            </div>
            <p className="text-xs text-muted">
              Real-time anime HUD resource allocation monitor across{" "}
              <strong className="text-fg">{totalSkills}</strong> engineering
              modules
            </p>
          </div>
        </div>

        {/* Aggregate HUD Telemetry Counters */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
          <div className="rounded-lg border border-line bg-bg/80 px-3 py-1.5">
            <span className="text-[10px] text-faint">SUBSYSTEM LOAD: </span>
            <strong className="text-accent tabular-nums">
              {avgAllocation}%
            </strong>
          </div>
          <div className="rounded-lg border border-line bg-bg/80 px-3 py-1.5">
            <span className="text-[10px] text-faint">S-RANK CORES: </span>
            <strong className="text-accent-soft tabular-nums">
              {sRankCount} ONLINE
            </strong>
          </div>
        </div>
      </div>

      {/* Filter & View Mode Control Strip */}
      <div className="flex flex-col gap-3 border-b border-line bg-panel-2/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="relative flex-1 max-w-md">
          <Search
            size={14}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-accent"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter resource modules by name, domain, or project..."
            aria-label="Search skill proficiency matrix"
            className="h-9 w-full rounded-xl border border-line bg-panel pr-8 pl-9 font-mono text-xs text-fg placeholder:text-faint focus:border-accent focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear skill filter"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted hover:text-fg"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
            <Activity size={13} className="text-accent" />
            <span>
              MONITORING{" "}
              <strong className="text-fg tabular-nums">
                {displayedSkills.length}
              </strong>{" "}
              NODES
            </span>
          </span>

          {/* Monitor Grid vs Compact Rack Telemetry Switcher */}
          <div
            role="group"
            aria-label="Skill monitor layout mode"
            className="inline-flex rounded-xl border border-line bg-panel p-1 font-mono"
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors",
                viewMode === "grid"
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              <LayoutGrid size={12} />
              <span>HUD Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("rack")}
              aria-pressed={viewMode === "rack"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors",
                viewMode === "rack"
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              <List size={12} />
              <span>Rack Monitor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Matrix Body */}
      <div className="p-5 sm:p-6">
        {searchResults ? (
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
              <span className="font-semibold text-fg">
                TELEMETRY FILTER: &ldquo;{search}&rdquo; ({searchResults.length}{" "}
                MODULES)
              </span>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="font-bold text-accent hover:underline"
              >
                [ RESET MONITOR ]
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4",
                  viewMode === "grid"
                    ? "sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1",
                )}
              >
                {searchResults.map(({ skill, categoryName }, idx) => (
                  <SkillResourceCard
                    key={`${categoryName}-${skill.name}`}
                    skill={skill}
                    index={idx}
                    categoryName={categoryName}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <p className="py-10 text-center font-mono text-sm text-muted">
                No system resource modules matched &ldquo;{search}&rdquo;.
              </p>
            )}
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-6">
            {/* Left Subsystem Domain Selector Rail */}
            <div
              role="tablist"
              aria-label="Skill subsystem domains"
              className="-mx-2 flex gap-1.5 overflow-x-auto px-2 pb-3 no-scrollbar lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {categories.map((c, i) => {
                const isActive = i === activeIndex;
                const domainAvg = Math.round(
                  c.skills.reduce(
                    (sum, s, idx) =>
                      sum + computeSkillResourceMetrics(s, idx).allocationPct,
                    0,
                  ) / c.skills.length,
                );

                return (
                  <button
                    key={c.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "flex shrink-0 flex-col gap-1.5 rounded-xl border p-3 text-left transition-all duration-150 lg:w-full",
                      isActive
                        ? "border-accent bg-accent/15 text-fg shadow-sm"
                        : "border-line bg-panel text-muted hover:border-accent/40 hover:text-fg",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-xs font-bold">
                        <Icon
                          name={c.icon}
                          size={14}
                          className="shrink-0 text-accent"
                        />
                        <span className="truncate">{c.name}</span>
                      </span>
                      <span className="font-mono text-[10px] font-bold text-accent tabular-nums">
                        {domainAvg}%
                      </span>
                    </div>

                    {/* Mini Domain Resource Bar */}
                    <div className="h-1 w-full overflow-hidden rounded-full bg-bg">
                      <div
                        style={{ width: `${domainAvg}%` }}
                        className={cn(
                          "h-full rounded-full",
                          isActive
                            ? "bg-gradient-to-r from-accent to-accent-soft"
                            : "bg-accent/50",
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Subsystem Resource Monitor Panel */}
            <div role="tabpanel" className="mt-4 lg:mt-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-panel-2/50 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Icon
                    name={activeCategory.icon}
                    size={18}
                    className="text-accent"
                  />
                  <div>
                    <h4 className="font-display text-base font-bold text-fg sm:text-lg">
                      SUBSYSTEM // {activeCategory.name}
                    </h4>
                    <p className="font-mono text-[10px] text-muted">
                      ACTIVE RESOURCE BANK · {activeCategory.skills.length}{" "}
                      MODULES ALLOCATED
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-bold text-accent tabular-nums">
                  <Sparkles size={11} />
                  <span>AVG LOAD: {avgAllocation}%</span>
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory.name}-${viewMode}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className={cn(
                    "grid gap-4",
                    viewMode === "grid"
                      ? "sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1",
                  )}
                >
                  {activeCategory.skills.map((s, idx) => (
                    <SkillResourceCard
                      key={s.name}
                      skill={s}
                      index={idx}
                      viewMode={viewMode}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
