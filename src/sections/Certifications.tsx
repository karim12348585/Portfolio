import { motion } from "framer-motion";
import { ArrowUpRight, Award, Clock, Cloud, ShieldCheck } from "lucide-react";
import { certificationGroups } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="section scroll-mt-24 py-12">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Certifications
          </span>
          <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            Verified foundations
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted sm:text-right sm:text-sm">
          Formal coursework and verified credentials backing the applied work —
          from NLP and ML to cloud AI and MLOps.
        </p>
      </div>

      {/* 2x2 Issuer-grouped cards */}
      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {certificationGroups.map((group, i) => {
          const count = group.items.length;
          const countLabel = `${count} ${count === 1 ? "credential" : "credentials"} · ${group.domain}`;
          const isCompactLinkList = group.items.every(
            (item) => !item.details && !item.badge && item.link,
          );

          return (
            <motion.article
              key={group.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.32, delay: i * 0.05 }}
              className="flex flex-col rounded-2xl border border-line bg-panel px-5 py-5 shadow-[0_1px_3px_rgba(22,17,36,0.03)] sm:px-6 sm:py-5 dark:shadow-none"
            >
              {/* Card header */}
              <div className="flex items-center justify-between gap-3 border-b border-line/80 pb-4">
                <div className="flex min-w-0 items-center gap-3.5">
                  {group.icon === "badge" && group.badge ? (
                    group.badgeFramed ? (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(22,17,36,0.05)] dark:border-white/15 dark:bg-white/95">
                        <img
                          src={group.badge}
                          alt={`${group.issuer} logo`}
                          loading="lazy"
                          className="h-7 w-7 object-contain"
                        />
                      </div>
                    ) : (
                      <img
                        src={group.badge}
                        alt={`${group.issuer} logo`}
                        loading="lazy"
                        className="h-11 w-11 shrink-0 rounded-xl object-contain"
                      />
                    )
                  ) : (
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/15 bg-accent/10 text-accent dark:border-accent/25 dark:bg-accent/15 dark:text-accent-soft">
                      {group.icon === "cloud" ? (
                        <Cloud size={19} strokeWidth={1.9} />
                      ) : (
                        <Award size={19} strokeWidth={1.9} />
                      )}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate font-display text-[17px] font-bold leading-snug text-fg">
                      {group.issuer}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-muted">
                      {countLabel}
                    </p>
                  </div>
                </div>

                {group.year ? (
                  <span className="shrink-0 font-mono text-xs font-semibold text-muted tabular-nums">
                    {group.year}
                  </span>
                ) : group.allVerified ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-semibold text-accent dark:border-accent/30 dark:bg-accent/15 dark:text-accent-soft">
                    <ShieldCheck size={13} strokeWidth={2.1} />
                    <span>All verified</span>
                  </span>
                ) : null}
              </div>

              {/* Credential rows */}
              <ul
                className={`flex flex-1 flex-col divide-y divide-line/70 ${
                  isCompactLinkList ? "justify-between" : ""
                }`}
              >
                {group.items.map((item) => {
                  if (isCompactLinkList && item.link) {
                    return (
                      <li key={item.id} className="flex flex-1 items-center">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex w-full items-center justify-between gap-4 py-4 transition-colors"
                        >
                          <span className="text-[15px] font-semibold leading-snug text-fg transition-colors group-hover:text-accent dark:group-hover:text-accent-soft">
                            {item.title}
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-accent transition-transform group-hover:translate-x-0.5 dark:text-accent-soft">
                            <span>Verify</span>
                            <ArrowUpRight size={14} strokeWidth={2} />
                          </span>
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 py-4 first:pt-4 last:pb-0.5"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        {item.badge && (
                          <img
                            src={item.badge}
                            alt={`${item.title} badge`}
                            loading="lazy"
                            className="h-10 w-10 shrink-0 object-contain"
                          />
                        )}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-[15px] font-semibold leading-snug text-fg">
                              {item.title}
                            </h4>
                            {item.code && (
                              <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-accent dark:bg-accent/18 dark:text-accent-soft">
                                {item.code}
                              </span>
                            )}
                          </div>

                          {item.details && (
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {item.details}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.status ? (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/12 dark:text-amber-300">
                          <Clock size={12} strokeWidth={2.2} />
                          <span>{item.status}</span>
                        </span>
                      ) : item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Verify ${item.title}`}
                          className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-soft dark:text-accent-soft dark:hover:text-fg"
                        >
                          <span>Verify</span>
                          <ArrowUpRight
                            size={14}
                            strokeWidth={2}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      ) : item.year ? (
                        <span className="shrink-0 text-xs font-medium text-muted tabular-nums">
                          {item.year}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
