import { motion } from "framer-motion";
import { GraduationCap, Languages as LangIcon, Sparkle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import {
  education,
  languages,
  interests,
  values,
} from "@/data/education";
import { profile } from "@/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  return (
    <section id="about" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="About"
        title="Engineering intelligence, end to end"
        description={profile.intro}
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {/* Education timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="lg:col-span-2"
        >
          <Card className="h-full p-6 sm:p-7">
            <div className="mb-6 flex items-center gap-2.5">
              <GraduationCap size={18} className="text-accent" />
              <h3 className="font-semibold">Education</h3>
            </div>
            <ol className="relative space-y-6 border-l border-line pl-6">
              {education.map((e) => (
                <li key={e.id} className="relative">
                  <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h4 className="font-medium text-fg">{e.degree}</h4>
                    <span className="text-xs text-faint">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{e.school}</p>
                  <p className="mt-1 text-sm text-faint">{e.detail}</p>
                  {e.highlight && (
                    <span className="mt-2 inline-flex rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {e.highlight}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Card>
        </motion.div>

        {/* Right column: values + languages + interests */}
        <div className="grid gap-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <LangIcon size={18} className="text-accent" />
                <h3 className="font-semibold">Languages</h3>
              </div>
              <ul className="space-y-3">
                {languages.map((l) => (
                  <li key={l.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-fg/90">{l.name}</span>
                      <span className="text-xs text-faint">{l.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-panel-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-accent-gradient"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <Sparkle size={18} className="text-accent" />
                <h3 className="font-semibold">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-line bg-panel-2 px-3 py-1 text-xs text-muted"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Core values */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, idx) => (
          <motion.div
            key={v.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card hover className="h-full p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={v.icon} size={19} />
              </div>
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{v.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
