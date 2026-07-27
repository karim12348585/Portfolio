import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, FolderGit2 } from "lucide-react";
import type { Skill } from "@/types";

export function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="relative"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="group flex items-center gap-2 rounded-xl border border-line bg-panel-2 px-3.5 py-2 text-sm font-medium text-fg/90 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-gradient" />
        {skill.name}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2"
          >
            <div className="glass rounded-xl p-3.5 shadow-glow">
              <p className="text-sm leading-relaxed text-fg/90">
                {skill.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} className="text-accent" />
                  {skill.years} {skill.years === 1 ? "yr" : "yrs"}
                </span>
                {skill.projects.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <FolderGit2 size={13} className="text-accent" />
                    {skill.projects.length} project
                    {skill.projects.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {skill.projects.length > 0 && (
                <p className="mt-1.5 text-xs text-faint">
                  {skill.projects.join(" · ")}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
