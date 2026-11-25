import { cn } from "@/utils/cn";

const sizes = {
  sm: { box: "h-6 w-6 rounded-[7px] border-[1.5px]", letter: "text-[13px]" },
  md: { box: "h-8 w-8 rounded-[9px] border-2", letter: "text-[17px]" },
} as const;

/**
 * Brand mark: an outlined rounded square holding a bold "K".
 * Light mode: deep teal on a pale teal tint. Dark mode: luminous mint on a
 * deep teal tint.
 */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizes[size].box,
        "border-accent bg-accent/10 text-accent",
        "dark:border-accent-soft dark:bg-accent-soft/10 dark:text-accent-soft",
        className,
      )}
    >
      <span
        className={cn(
          "font-display font-semibold leading-none",
          sizes[size].letter,
        )}
      >
        K
      </span>
    </span>
  );
}
