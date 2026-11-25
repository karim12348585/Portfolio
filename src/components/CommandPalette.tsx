import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  FolderGit2,
  Cpu,
  Briefcase,
  Download,
  Sun,
  Moon,
  Mail,
  X,
  CornerDownLeft,
} from "lucide-react";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";
import { scrollToId } from "@/utils/scroll";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const jumpToSection = (id: string) => {
    onClose();
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const openProject = (slug: string) => {
    onClose();
    navigate(`/projects/${slug}`);
  };

  const q = query.trim().toLowerCase();

  const matchedProjects = useMemo(() => {
    if (!q) return projects.slice(0, 5);
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [q]);

  const matchedSkills = useMemo(() => {
    const all = skillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({ ...s, category: cat.name })),
    );
    if (!q) return all.slice(0, 4);
    return all
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [q]);

  const matchedExperiences = useMemo(() => {
    if (!q) return experiences;
    return experiences.filter(
      (e) =>
        e.company.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.tech.some((t) => t.toLowerCase().includes(q)),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation and search"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-line bg-panel-2/70 px-4 py-3.5">
          <Search size={18} className="shrink-0 text-accent" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, AI architectures, skills (LangGraph, RAG, PyTorch)..."
            className="w-full bg-transparent text-sm text-fg placeholder:text-faint focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-panel text-muted hover:text-fg"
          >
            <X size={14} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-5">
          {/* Quick Actions */}
          {!q && (
            <div>
              <p className="px-2.5 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-faint">
                Quick Actions
              </p>
              <div className="grid gap-1.5 sm:grid-cols-3">
                <a
                  href={profile.cvPath}
                  download="Karim_Souissi_CV.pdf"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg border border-line bg-panel-2/60 px-3 py-2.5 text-xs font-medium text-fg transition-colors hover:border-accent"
                >
                  <span className="flex items-center gap-2">
                    <Download size={14} className="text-accent" />
                    <span>Download CV</span>
                  </span>
                  <ArrowUpRight size={12} className="text-faint" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    toggle();
                    onClose();
                  }}
                  className="flex items-center justify-between rounded-lg border border-line bg-panel-2/60 px-3 py-2.5 text-xs font-medium text-fg transition-colors hover:border-accent"
                >
                  <span className="flex items-center gap-2">
                    {theme === "dark" ? (
                      <Sun size={14} className="text-accent" />
                    ) : (
                      <Moon size={14} className="text-accent" />
                    )}
                    <span>
                      {theme === "dark" ? "Paper Light Mode" : "Obsidian Dark Mode"}
                    </span>
                  </span>
                  <CornerDownLeft size={12} className="text-faint" />
                </button>
                <button
                  type="button"
                  onClick={() => jumpToSection("contact")}
                  className="flex items-center justify-between rounded-lg border border-line bg-panel-2/60 px-3 py-2.5 text-xs font-medium text-fg transition-colors hover:border-accent"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={14} className="text-accent" />
                    <span>Direct Contact</span>
                  </span>
                  <CornerDownLeft size={12} className="text-faint" />
                </button>
              </div>
            </div>
          )}

          {/* Projects */}
          {matchedProjects.length > 0 && (
            <div>
              <p className="px-2.5 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-faint">
                Case Studies & Repositories ({matchedProjects.length})
              </p>
              <div className="space-y-1">
                {matchedProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => openProject(p.slug)}
                    className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-panel-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FolderGit2
                        size={16}
                        className="shrink-0 text-accent"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-display text-sm font-bold text-fg group-hover:text-accent">
                            {p.title}
                          </span>
                          <span className="font-mono text-[10px] text-faint">
                            {p.type} · {p.year}
                          </span>
                        </div>
                        <p className="truncate text-xs text-muted">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-faint group-hover:text-accent">
                      Inspect →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Internships / Experience */}
          {matchedExperiences.length > 0 && (
            <div>
              <p className="px-2.5 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-faint">
                Industry Experience ({matchedExperiences.length})
              </p>
              <div className="space-y-1">
                {matchedExperiences.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => jumpToSection("experience")}
                    className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-panel-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Briefcase size={15} className="shrink-0 text-accent" />
                      <div className="min-w-0">
                        <span className="font-display text-xs font-bold text-fg">
                          {e.company}
                        </span>
                        <span className="ml-2 text-xs text-muted">
                          {e.role}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-faint tabular-nums">
                      {e.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {matchedSkills.length > 0 && (
            <div>
              <p className="px-2.5 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-faint">
                Technical Stack ({matchedSkills.length})
              </p>
              <div className="grid gap-1 sm:grid-cols-2">
                {matchedSkills.map((s) => (
                  <button
                    key={`${s.category}-${s.name}`}
                    type="button"
                    onClick={() => jumpToSection("skills")}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-panel-2"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <Cpu size={14} className="shrink-0 text-accent" />
                      <span className="truncate text-xs font-semibold text-fg">
                        {s.name}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-faint">
                      {s.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line bg-panel-2/50 px-4 py-2.5 font-mono text-[11px] text-faint">
          <span>Press ESC to close</span>
          <span>Hotkeys 1–7 jump directly to chapters</span>
        </div>
      </div>
    </div>
  );
}
