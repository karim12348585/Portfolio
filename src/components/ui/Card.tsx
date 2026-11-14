import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

/** A ruled plate: hairline border, no radius, no shadow. */
export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-line bg-panel",
        hover && "transition-colors duration-200 hover:border-fg/60",
        className,
      )}
      {...props}
    />
  );
}
