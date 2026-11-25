import { cn } from "@/utils/cn";

/**
 * Brand mark: crisp Deep Teal rounded square enclosing a geometric K-node emblem.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-fg shadow-xs",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
        <path
          d="M8.25 6.25v11.5M15.75 6.75 9.75 12l6.25 5.25"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8.25" cy="6.25" r="1.65" fill="currentColor" />
        <circle cx="15.75" cy="6.75" r="1.65" fill="currentColor" />
        <circle cx="16" cy="17.25" r="1.65" fill="currentColor" />
      </svg>
    </span>
  );
}
