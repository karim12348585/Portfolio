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
 * (proprietary/enterprise) code it shows a red GitHub control that, on click,
 * reveals that the source is confidential.
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
            "text-fg transition-colors hover:text-accent",
            className,
          )}
        >
          <Github size={17} />
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-panel-2 px-4 text-sm font-medium text-fg transition-colors hover:border-accent/50",
          className,
        )}
      >
        <Github size={15} />
        Code
      </a>
    );
  }

  // Confidential source → red GitHub + click reveals a note.
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  const popover = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: variant === "icon" ? 6 : -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.16 }}
          className={cn(
            "absolute right-0 z-30 w-60",
            variant === "icon" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          <div className="glass rounded-xl p-3 text-xs leading-relaxed text-fg/90 shadow-glow">
            <span className="inline-flex items-center gap-1.5 font-medium text-red-300">
              <Lock size={12} />
              {note.title}
            </span>
            <p className="mt-1 text-faint">{note.body}</p>
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
          className="text-red-500 transition-colors hover:text-red-400"
        >
          <Github size={17} />
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
        className="inline-flex h-9 items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/15"
      >
        <Github size={15} />
        {note.label}
        <Lock size={12} />
      </button>
      {popover}
    </div>
  );
}
