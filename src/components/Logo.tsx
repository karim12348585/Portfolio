import { cn } from "@/utils/cn";

/**
 * Brand mark: three nodes ascending along a path — a data pipeline resolving
 * into a decision. Set in ink; the last node carries the signal accent.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-[20px] w-[20px] text-fg", className)}
      fill="none"
    >
      <path
        d="M5.9 16.4 10.4 12.3M13.6 10.1 18.1 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <rect x="1.8" y="15.8" width="4.4" height="4.4" fill="currentColor" />
      <rect x="9.8" y="9" width="4.4" height="4.4" fill="currentColor" />
      <rect
        x="17.8"
        y="2.2"
        width="4.4"
        height="4.4"
        className="fill-accent"
      />
    </svg>
  );
}
