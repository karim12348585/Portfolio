import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, PenLine, Search, X } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { blogPosts } from "@/data/blog";
import { getProjectBySlug } from "@/data/projects";
import { cn } from "@/utils/cn";
import {
  countBlogPostsByCategory,
  filterBlogPosts,
  type BlogCategoryFilter,
} from "@/utils/portfolioLogic";

const blogCategories: BlogCategoryFilter[] = [
  "All",
  "Agentic AI",
  "RAG & Search",
  "LLMOps & Eval",
  "Data Engineering",
];

export function Blog() {
  const [category, setCategory] = useState<BlogCategoryFilter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => countBlogPostsByCategory(blogPosts), []);
  const filtered = useMemo(
    () => filterBlogPosts(blogPosts, category, query),
    [category, query],
  );

  return (
    <section id="blog" className="section scroll-mt-24 py-12">
      <SectionHeading
        index="05"
        eyebrow="Blog"
        title="Engineering notes & technical essays"
        description="Lessons from shipping multi-agent systems, retrieval pipelines, log compressors, and production evaluation harnesses."
      />

      {blogPosts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-panel/60 px-6 py-12 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel-2 text-accent dark:text-accent-soft">
            <PenLine size={18} aria-hidden="true" />
          </div>
          <p className="mt-4 font-display text-lg font-bold tracking-tight text-fg">
            No articles published yet
          </p>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-muted">
            Engineering notes and technical write-ups will appear here once
            published.
          </p>
        </div>
      ) : (
        <>
          {/* Filter & Search Bar */}
          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="isolate flex flex-wrap items-center gap-1 rounded-md border border-line bg-panel-2 p-1">
              <LayoutGroup id="blog-cat-filter">
                {blogCategories.map((cat) => {
                  const active = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "relative rounded px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors",
                        active ? "text-accent-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="blog-cat-pill"
                          className="absolute inset-0 z-0 rounded bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 36,
                          }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                      <span
                        className={cn(
                          "relative z-10 ml-1.5 font-mono text-[11px] tabular-nums",
                          active ? "text-accent-fg/75" : "text-faint",
                        )}
                      >
                        {counts[cat]}
                      </span>
                    </button>
                  );
                })}
              </LayoutGroup>
            </div>

            <div className="relative w-full sm:w-60">
              <Search
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter articles..."
                aria-label="Filter blog articles"
                className="h-8 w-full rounded-lg border border-line bg-panel pl-8 pr-8 text-xs text-fg placeholder:text-faint transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear article search"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-faint hover:text-fg"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Compact 2-Column Editorial Hairline Grid */}
          {filtered.length === 0 ? (
            <div className="mt-6 border-t border-b border-line py-8 text-center">
              <p className="font-display text-lg text-fg">
                No matching articles
              </p>
              <p className="mt-1 text-sm text-muted">
                Try clearing your search or selecting another topic.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="mt-4 inline-flex h-8 items-center gap-2 rounded-md bg-accent px-4 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-soft"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-x-8 border-t border-line md:grid-cols-2">
          {filtered.map((post, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const relatedProject = post.relatedProjectSlug
              ? getProjectBySlug(post.relatedProjectSlug)
              : undefined;

            return (
              <article
                key={post.id}
                className="group flex flex-col justify-between border-b border-line py-5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11px] text-faint tabular-nums">
                    <span className="font-semibold text-accent">{num}</span>
                    <span aria-hidden="true">/</span>
                    <span className="font-medium text-accent">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted sm:text-[13px]">
                    {post.excerpt}
                  </p>

                  {post.keyTakeaways[0] && (
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      <strong className="font-semibold text-fg">
                        Takeaway:
                      </strong>{" "}
                      {post.keyTakeaways[0]}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-1">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-soft"
                  >
                    <span>Read article</span>
                    <ArrowUpRight size={13} />
                  </Link>

                  {relatedProject && (
                    <Link
                      to={`/projects/${relatedProject.slug}`}
                      className="truncate font-mono text-[11px] text-faint transition-colors hover:text-accent"
                    >
                      Case study: {relatedProject.title}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
