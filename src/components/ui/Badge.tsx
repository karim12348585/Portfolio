import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] font-medium",
        variant === "default" && "border border-line bg-panel-2 text-muted",
        variant === "accent" &&
          "border border-accent/30 bg-accent/10 text-accent",
        variant === "outline" && "border border-line text-muted",
        className,
      )}
      {...props}
    />
  );
}
