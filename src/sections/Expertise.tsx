import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import { SkillBadge } from "@/components/SkillBadge";
import { approachStages } from "@/data/approach";
import { skillCategories } from "@/data/skills";

/**
 * Expertise — how I build (pipeline + proven numbers) and the toolkit behind it.
 * Placed after the projects so the work comes first, then the method.
 */
export function Expertise() {
  return (
    <section id="skills" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Skills & Approach"
        title="From raw data to agents running in production"
        description="I own the full lifecycle — not just the model. Here's the pipeline I build and the toolkit behind it."
      />

      {/* The pipeline I build */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {approachStages.map((stage, i) => (
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative flex flex-col rounded-2xl border border-line bg-panel p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={stage.icon} size={19} />
              </div>
              <span className="text-xs font-bold text-faint transition-colors group-hover:text-accent">
                {stage.step}
              </span>
            </div>

            <h3 className="mt-4 font-semibold tracking-tight">{stage.title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
              {stage.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {stage.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-panel-2 px-2 py-0.5 text-[11px] text-faint"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* The toolkit */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 flex items-center gap-4"
      >
        <h3 className="shrink-0 text-xl font-semibold tracking-tight">
          The toolkit
        </h3>
        <div className="h-px flex-1 bg-line" />
        <span className="hidden shrink-0 text-sm text-faint sm:block">
          Hover any skill for context
        </span>
      </motion.div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: Math.min(ci * 0.05, 0.3) }}
          >
            <Card hover className="h-full p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon name={cat.icon} size={18} />
                </div>
                <h3 className="font-semibold">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <SkillBadge key={skill.name} skill={skill} index={si} />
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
