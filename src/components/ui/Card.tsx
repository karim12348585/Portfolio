import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  interactive?: boolean;
}

export function Card({
  className,
  hover = false,
  interactive = false,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "deck-frame transition-colors duration-200",
        hover && "hover:border-accent",
        interactive && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
