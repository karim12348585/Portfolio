import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="section scroll-mt-24 py-24">
      <SectionHeading
        index="05"
        eyebrow="Certifications"
        title="Verified foundations"
        description="Formal coursework backing the applied work — from NLP and ML fundamentals to cloud AI."
      />

      <ol className="mt-14 divide-y divide-line border-y border-line">
        {certifications.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group grid gap-4 py-6 md:grid-cols-12 md:items-center md:gap-8"
          >
            <div className="flex items-baseline gap-4 md:col-span-2">
              <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">
                05.{i + 1}
              </span>
              {c.year && (
                <span className="font-mono text-[12px] text-faint">{c.year}</span>
              )}
            </div>

            <div className="flex items-center gap-4 md:col-span-4">
              {c.badge ? (
                <img
                  src={c.badge}
                  alt={`${c.title} badge`}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 object-contain"
                />
              ) : (
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-line text-muted">
                  <Award size={18} />
                </span>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 md:col-span-3">
              {c.skills.slice(0, 3).map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
              {c.skills.length > 3 && (
                <Badge variant="outline">+{c.skills.length - 3}</Badge>
              )}
            </div>

            <div className="md:col-span-3 md:text-right">
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg"
                >
                  <ShieldCheck size={13} className="text-accent" />
                  <span className="link-underline">Verify credential</span>
                  <ExternalLink size={11} className="text-faint" />
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
