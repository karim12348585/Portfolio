import type { RefObject } from "react";
import { MapPin } from "lucide-react";
import { education, languages } from "@/data/education";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";

export interface AboutProps {
  portraitSlotRef?: RefObject<HTMLDivElement | null>;
  hideStaticPortrait?: boolean;
}

export function About({
  portraitSlotRef,
  hideStaticPortrait = false,
}: AboutProps) {
  return (
    <section
      id="about"
      className="section scroll-mt-[72px] py-6 lg:flex lg:min-h-[calc(100svh-4.5rem)] lg:flex-col lg:justify-center lg:py-6"
    >
      {/* Eyebrow pill */}
      <div>
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          01 · About
        </span>
      </div>

      {/* Upper two-column editorial split: left framed portrait + right bio */}
      <div className="mt-4 grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
        {/* Left: Portrait docking slot */}
        <div className="relative mx-auto lg:mx-0">
          <div className="relative">
            <div
              ref={portraitSlotRef}
              data-testid="about-portrait-slot"
              aria-hidden={hideStaticPortrait || undefined}
              className={
                hideStaticPortrait
                  ? "pointer-events-none invisible aspect-[2/3] w-52 rounded-[1.5rem] border-[4px] sm:w-56 lg:w-[12.25rem]"
                  : "relative aspect-[2/3] w-52 rounded-[1.5rem] border-[4px] border-panel bg-panel shadow-[0_20px_50px_-14px_rgba(15,23,42,0.16)] sm:w-56 lg:w-[12.25rem] dark:border-panel-2 dark:shadow-[0_20px_50px_-14px_rgba(0,0,0,0.6)]"
              }
            >
              {!hideStaticPortrait && (
                <div className="h-full w-full overflow-hidden rounded-[1.2rem]">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="block h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {!hideStaticPortrait && (
              <div className="absolute -right-3 bottom-3 flex items-center gap-1.5 rounded-full border border-line bg-panel/95 px-3 py-1 text-xs font-semibold text-fg shadow-[0_8px_24px_-6px_rgba(15,23,42,0.14)] backdrop-blur-md dark:shadow-black/50">
                <MapPin
                  size={13}
                  className="shrink-0 text-accent dark:text-accent-soft"
                />
                <span>Based in Tunis</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Editorial headline and narrative */}
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-[1.06] tracking-tight text-fg sm:text-4xl lg:text-[2.45rem]">
            Engineering intelligence,
            <br />
            end to end
          </h2>

          <p className="mt-3.5 text-base font-semibold leading-snug text-fg sm:text-[1.08rem]">
            I&apos;m an{" "}
            <span className="text-accent dark:text-accent-soft">
              AI engineer
            </span>{" "}
            who designs and builds intelligent systems, from the first model to
            production.
          </p>

          <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[14.5px]">
            Built on a strong foundation in mathematics and statistical
            analysis, my work spans machine learning, NLP and LLM-based systems,
            backed by data engineering and solid software engineering, so that
            AI is reliable, measurable and useful on real data.
          </p>
        </div>
      </div>

      {/* Horizontal hairline divider */}
      <div className="mt-6 border-t border-line pt-5">
        <div className="grid gap-8 lg:grid-cols-[1.78fr_0.72fr] lg:gap-12">
          {/* Left: Vertical EDUCATION timeline */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              Education
            </h3>

            <ol className="mt-3.5 space-y-4">
              {education.map((e, idx) => {
                const isLast = idx === education.length - 1;
                return (
                  <li
                    key={e.id}
                    className="grid grid-cols-[5.25rem_1.25rem_1fr] gap-x-2.5 sm:grid-cols-[6rem_1.5rem_1fr] sm:gap-x-3.5"
                  >
                    {/* Date column */}
                    <span
                      className={cn(
                        "pt-0.5 font-mono text-xs tabular-nums",
                        e.current
                          ? "font-semibold text-accent dark:text-accent-soft"
                          : "font-medium text-faint",
                      )}
                    >
                      {e.period}
                    </span>

                    {/* Timeline rail + dot */}
                    <div className="relative flex justify-center">
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute top-3.5 -bottom-5 w-px bg-line"
                        />
                      )}
                      {e.current ? (
                        <span
                          aria-hidden="true"
                          className="relative z-10 mt-1 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/15 dark:bg-accent-soft dark:ring-accent-soft/20"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="relative z-10 mt-1 h-2.5 w-2.5 rounded-full border-[1.75px] border-line bg-bg"
                        />
                      )}
                    </div>

                    {/* Education detail */}
                    <div className="min-w-0">
                      <h4 className="font-display text-[15px] font-bold leading-snug text-fg sm:text-[15.5px]">
                        {e.degree}
                      </h4>

                      <p className="mt-0.5 text-[13px] leading-snug">
                        <span className="font-semibold text-fg">
                          {e.school}
                        </span>
                        {e.institution && (
                          <>
                            <span
                              aria-hidden="true"
                              className="mx-1.5 text-faint"
                            >
                              ·
                            </span>
                            <span className="text-muted">{e.institution}</span>
                          </>
                        )}
                      </p>

                      <p className="mt-1 text-[13px] leading-snug text-muted">
                        {e.detail}
                      </p>

                      {e.tags && e.tags.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {e.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border border-accent/25 bg-panel px-2.5 py-0.5 text-[11px] font-semibold text-accent shadow-[0_1px_2px_rgba(15,23,42,0.03)] dark:border-accent-soft/30 dark:text-accent-soft"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: LANGUAGES 4-dot proficiency matrix */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              Languages
            </h3>

            <dl className="mt-3.5 space-y-3">
              {languages.map((l) => (
                <div
                  key={l.name}
                  className="grid grid-cols-[5rem_auto_1fr] items-center gap-3.5 text-[13.5px]"
                >
                  <dt className="font-semibold text-fg">{l.name}</dt>
                  <div
                    className="flex items-center gap-1.5"
                    aria-label={`${l.dots} out of 4`}
                  >
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        aria-hidden="true"
                        className={cn(
                          "h-2 w-2 rounded-full",
                          step <= l.dots
                            ? "bg-accent dark:bg-accent-soft"
                            : "bg-line",
                        )}
                      />
                    ))}
                  </div>
                  <dd className="text-[12.5px] text-muted">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
