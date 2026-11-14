import { useState } from "react";
import { Github, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { SourceNote } from "@/types";

interface CodeSourceProps {
  href?: string;
  confidential?: boolean;
  /** Custom wording for the private-source badge; defaults to NDA wording. */
  note?: SourceNote;
  variant?: "button" | "icon";
  className?: string;
}

const defaultNote: SourceNote = {
  label: "Private source",
  title: "Source code is confidential",
  body: "Proprietary / enterprise project — the code is under NDA and not publicly available.",
};

/**
 * Source-code affordance. For public repos it links out; for confidential
 * code it shows a struck-through control that, on click, explains why.
 */
export function CodeSource({
  href,
  confidential,
  note = defaultNote,
  variant = "button",
  className,
}: CodeSourceProps) {
  const [open, setOpen] = useState(false);

  // No repo and not confidential (e.g. notebook-only work) → render nothing.
  if (!href && !confidential) return null;

  // Public repository → plain link out.
  if (!confidential && href) {
    if (variant === "icon") {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Source code"
          className={cn(
            "text-muted transition-colors hover:text-accent",
            className,
          )}
        >
          <Github size={16} />
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-[2px] border border-fg/70 px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg transition-colors hover:border-accent hover:text-accent",
          className,
        )}
      >
        <Github size={14} />
        Code
      </a>
    );
  }

  // Confidential source → click reveals a note.
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  const popover = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: variant === "icon" ? 6 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className={cn(
            "absolute right-0 z-30 w-64",
            variant === "icon" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          <div className="glass p-3.5 text-xs leading-relaxed text-fg shadow-pop">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
              <Lock size={11} />
              {note.title}
            </span>
            <p className="mt-1.5 text-muted">{note.body}</p>
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
          className="relative text-muted transition-colors hover:text-accent"
        >
          <Github size={16} />
          <span className="absolute -right-1 -top-1 grid h-3 w-3 place-items-center bg-bg text-accent">
            <Lock size={9} />
          </span>
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
        className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-dashed border-accent/70 px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent transition-colors hover:border-accent hover:bg-accent/5"
      >
        <Lock size={12} />
        {note.label}
      </button>
      {popover}
    </div>
  );
}
