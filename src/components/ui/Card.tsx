import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-glow",
        className,
      )}
      {...props}
    />
  );
}
