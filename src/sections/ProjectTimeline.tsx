import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import { projectTypeStyles } from "@/utils/projectType";
import { cn } from "@/utils/cn";

// Chronological progression: earliest → latest.
const ordered = [...projects].sort((a, b) => a.year.localeCompare(b.year));

export function ProjectTimeline() {
  return (
    <section className="section scroll-mt-24 py-16">
      <SectionHeading
        eyebrow="Progression"
        title="From foundations to autonomous systems"
        description="A timeline of how the work has grown — from classical ML and NLP toward multi-agent, production-grade AI."
      />

      <div className="mt-14 overflow-x-auto pb-4 no-scrollbar">
        <div className="relative flex min-w-max gap-6 px-1">
          {/* progress line */}
          <div className="absolute left-0 right-0 top-[1.15rem] h-px bg-gradient-to-r from-transparent via-accent/40 to-accent" />
          {ordered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative w-64 shrink-0"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-bg text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                  {p.year}
                  <span className="text-line">·</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      projectTypeStyles[p.type].text,
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        projectTypeStyles[p.type].dot,
                      )}
                    />
                    {p.type}
                  </span>
                </span>
              </div>
              <Link
                to={`/projects/${p.slug}`}
                className="mt-4 block rounded-2xl border border-line bg-panel p-4 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <h3 className="flex items-start justify-between gap-2 font-semibold">
                  <span>{p.title}</span>
                  <ArrowUpRight
                    size={16}
                    className="mt-0.5 shrink-0 text-muted"
                  />
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">
                  {p.tagline}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
