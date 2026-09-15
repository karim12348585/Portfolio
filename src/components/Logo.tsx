import { cn } from "@/utils/cn";

/**
 * Brand mark: three nodes ascending along a path — a data pipeline resolving
 * into a decision. Deliberately not initials-in-a-box.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-[22px] w-[22px] text-accent", className)}
      fill="none"
    >
      <path
        d="M5.9 16.4 10.4 12.3M13.6 10.1 18.1 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="4" cy="18" r="2.4" fill="currentColor" />
      <circle cx="12" cy="11.2" r="2.4" fill="currentColor" opacity="0.85" />
      <circle cx="20" cy="4.4" r="2.4" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
