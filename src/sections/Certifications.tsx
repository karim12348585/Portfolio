import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified foundations"
        description="Formal coursework backing the applied work — from NLP and ML fundamentals to cloud AI."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card hover className="group flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                {c.badge ? (
                  <img
                    src={c.badge}
                    alt={`${c.title} badge`}
                    loading="lazy"
                    className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Award size={20} />
                  </div>
                )}
                {c.year && (
                  <span className="shrink-0 text-xs text-faint">{c.year}</span>
                )}
              </div>
              <h3 className="mt-4 font-semibold leading-tight">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.issuer}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.skills.slice(0, 3).map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
                {c.skills.length > 3 && (
                  <Badge variant="outline">+{c.skills.length - 3}</Badge>
                )}
              </div>

              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
                >
                  <ShieldCheck size={14} />
                  Verify credential
                  <ExternalLink size={13} />
                </a>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
