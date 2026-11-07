import { BookOpen } from "lucide-react";
import { cn } from "@/utils/cn";

interface NotebookLinkProps {
  href?: string;
  variant?: "button" | "icon";
  className?: string;
}

/**
 * Link to a project's notebook — a hosted Kaggle notebook or a local .ipynb.
 * Styled to sit alongside <CodeSource />.
 */
export function NotebookLink({
  href,
  variant = "button",
  className,
}: NotebookLinkProps) {
  if (!href) return null;

  const isKaggle = href.includes("kaggle.com");
  const label = isKaggle ? "Kaggle notebook" : "Notebook";
  // Local notebooks download; hosted ones open in a new tab.
  const linkProps = isKaggle
    ? { target: "_blank", rel: "noreferrer" }
    : { download: true };

  if (variant === "icon") {
    return (
      <a
        href={href}
        {...linkProps}
        aria-label={label}
        title={label}
        className={cn("text-fg transition-colors hover:text-accent", className)}
      >
        <BookOpen size={17} />
      </a>
    );
  }

  return (
    <a
      href={href}
      {...linkProps}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-panel-2 px-4 text-sm font-medium text-fg transition-colors hover:border-accent/50",
        className,
      )}
    >
      <BookOpen size={15} />
      {label}
    </a>
  );
}
