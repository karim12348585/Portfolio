import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

/** Square mono tag. The accent variant is reserved for categories. */
export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.08em]",
        variant === "default" && "border-line bg-panel text-muted",
        variant === "accent" && "border-line text-fg",
        variant === "outline" && "border-line text-faint",
        className,
      )}
      {...props}
    />
  );
}
