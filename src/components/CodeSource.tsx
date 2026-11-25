import { useState } from "react";
import { Github, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { SourceNote } from "@/types";

interface CodeSourceProps {
  href?: string;
  confidential?: boolean;
  note?: SourceNote;
  variant?: "button" | "icon";
  className?: string;
}

const defaultNote: SourceNote = {
  label: "Private repository",
  title: "Source code is confidential",
  body: "Proprietary / enterprise project — the code is under NDA and not publicly available.",
};

export function CodeSource({
  href,
  confidential,
  note = defaultNote,
  variant = "button",
  className,
}: CodeSourceProps) {
  const [open, setOpen] = useState(false);

  if (!href && !confidential) return null;

  if (!confidential && href) {
    if (variant === "icon") {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="View source code on GitHub"
          title="View source code on GitHub"
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-fg",
            className,
          )}
        >
          <Github size={15} />
          <span>Code</span>
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-line bg-panel-2 px-3.5 text-xs font-semibold text-fg whitespace-nowrap transition-colors hover:border-accent/60 hover:text-accent dark:hover:text-accent-soft",
          className,
        )}
      >
        <Github size={14} />
        <span>GitHub Repository</span>
      </a>
    );
  }

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  const popover = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: variant === "icon" ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute left-0 z-30 w-64 sm:left-auto sm:right-0",
            variant === "icon" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          <div className="rounded-xl border border-rose-500/30 bg-panel p-3.5 text-left text-xs leading-relaxed text-fg shadow-soft">
            <span className="inline-flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400">
              <Lock size={12} />
              {note.title}
            </span>
            <p className="mt-1 text-muted">{note.body}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (variant === "icon") {
    return (
      <div className={cn("relative", className)}>
        <button
          type="button"
          onClick={toggle}
          onBlur={() => setOpen(false)}
          aria-label={note.title}
          title={note.title}
          className="inline-flex items-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-700 transition-colors hover:border-rose-500/50 dark:border-rose-400/30 dark:text-rose-300"
        >
          <Github size={13} />
          <Lock size={11} />
          <span>{note.label}</span>
        </button>
        {popover}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={toggle}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-rose-500/35 bg-rose-500/10 px-3.5 text-xs font-semibold text-rose-700 whitespace-nowrap transition-colors hover:border-rose-500/60 hover:bg-rose-500/15 dark:border-rose-400/35 dark:bg-rose-500/12 dark:text-rose-300 dark:hover:border-rose-400/60 dark:hover:bg-rose-500/20"
      >
        <Github size={14} className="opacity-85" />
        <Lock size={12} />
        <span>{note.label}</span>
      </button>
      {popover}
    </div>
  );
}
