import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { getProjectBySlug } from "@/data/projects";
import { profile } from "@/data/profile";
import { PageTransition } from "@/layout/PageTransition";
import { NotFound } from "./NotFound";

export function BlogPostDetail() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  const idx = blogPosts.findIndex((p) => p.id === post.id);
  const prev = blogPosts[(idx - 1 + blogPosts.length) % blogPosts.length];
  const next = blogPosts[(idx + 1) % blogPosts.length];
  const relatedProject = post.relatedProjectSlug
    ? getProjectBySlug(post.relatedProjectSlug)
    : undefined;

  return (
    <PageTransition>
      <article className="pt-28 pb-16">
        {/* Header */}
        <header className="border-b border-line pb-10">
          <div className="section max-w-4xl">
            <Link
              to="/"
              state={{ scrollTo: "blog" }}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              <span>Back to all articles</span>
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-faint">
              <span className="font-semibold text-accent">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{post.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>By {profile.name}</span>
            </div>

            <h1 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {post.excerpt}
            </p>

            <p className="mt-4 font-mono text-xs text-faint">
              {post.tags.join(" · ")}
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="section max-w-4xl py-12">
          {/* Key Takeaways */}
          <div className="rounded-xl border border-line bg-panel-2/40 px-6 py-5">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              <BookOpen size={14} />
              <span>Key Takeaways</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {post.keyTakeaways.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span aria-hidden="true" className="font-mono text-accent">
                    —
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="mt-12 space-y-12 divide-y divide-line">
            {post.sections.map((sec, secIdx) => (
              <section
                key={sec.heading}
                className={secIdx === 0 ? "" : "pt-10"}
              >
                <p className="font-mono text-xs font-medium text-accent tabular-nums">
                  0{secIdx + 1}
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  {sec.heading}
                </h2>
                <div className="mt-4 max-w-[68ch] space-y-4 text-base leading-[1.7] text-muted">
                  {sec.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {sec.codeSnippet && (
                  <div className="mt-6 overflow-hidden rounded-md border border-line bg-panel-2/70">
                    <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] text-faint">
                      <span>{sec.codeSnippet.label}</span>
                      <span className="uppercase">
                        {sec.codeSnippet.language}
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-fg">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Related Case Study */}
          {relatedProject && (
            <div className="mt-14 flex flex-col justify-between gap-4 rounded-xl border border-line bg-panel-2/50 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-xs text-accent">
                  Related Engineering Case Study
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-fg">
                  {relatedProject.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {relatedProject.tagline}
                </p>
              </div>
              <Link
                to={`/projects/${relatedProject.slug}`}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 text-xs font-semibold text-accent-fg transition-colors hover:bg-accent-soft"
              >
                <span>Open Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          )}

          {/* Previous / Next Post Navigation */}
          <div className="mt-14 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            <Link
              to={`/blog/${prev.slug}`}
              className="group flex items-center justify-between rounded-xl border border-line bg-panel p-5 transition-colors hover:border-accent/50"
            >
              <div>
                <span className="font-mono text-xs text-faint">
                  ← Previous article
                </span>
                <p className="mt-1 font-display text-lg font-bold text-fg transition-colors group-hover:text-accent">
                  {prev.title}
                </p>
              </div>
            </Link>

            <Link
              to={`/blog/${next.slug}`}
              className="group flex items-center justify-between rounded-xl border border-line bg-panel p-5 text-right transition-colors hover:border-accent/50"
            >
              <div className="w-full">
                <span className="font-mono text-xs text-faint">
                  Next article →
                </span>
                <p className="mt-1 font-display text-lg font-bold text-fg transition-colors group-hover:text-accent">
                  {next.title}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="ml-3 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
