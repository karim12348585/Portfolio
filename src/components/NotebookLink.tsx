import { BookOpen } from "lucide-react";
import { cn } from "@/utils/cn";

interface NotebookLinkProps {
  href?: string;
  variant?: "button" | "icon";
  className?: string;
}

export function NotebookLink({
  href,
  variant = "button",
  className,
}: NotebookLinkProps) {
  if (!href) return null;

  const isKaggle = href.includes("kaggle.com");
  const label = isKaggle ? "Kaggle Notebook" : "Notebook";
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
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-fg",
          className,
        )}
      >
        <BookOpen size={14} />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      {...linkProps}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-line bg-panel-2 px-3.5 text-xs font-medium text-fg whitespace-nowrap transition-colors hover:border-faint/60",
        className,
      )}
    >
      <BookOpen size={14} />
      {label}
    </a>
  );
}
