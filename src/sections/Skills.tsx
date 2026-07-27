import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import { SkillBadge } from "@/components/SkillBadge";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24">
      <div className="section">
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack AI engineering toolkit"
          description="From agent orchestration and RAG to fine-tuning, MLOps, and the backend that ships it. Hover any skill for context."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
