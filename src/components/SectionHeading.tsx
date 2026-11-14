import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  /** Running section number, e.g. "01". */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Kept for API compatibility; the notebook layout is always left-set. */
  align?: "left" | "center";
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Chapter head: an ink rule that draws in, the section index and label in
 * the margin column, the title and its description set on the text grid.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative pt-5", className)}>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-fg"
      />

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        <div className="flex items-baseline gap-3 lg:col-span-3">
          {index && (
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">
              {index}
            </span>
          )}
          {eyebrow && <span className="mono-label text-fg">{eyebrow}</span>}
        </div>

        <div className="grid gap-5 lg:col-span-9 lg:grid-cols-9 lg:gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="font-condensed text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:col-span-5"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="max-w-md text-pretty text-base leading-relaxed text-muted lg:col-span-4 lg:pt-1.5"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
