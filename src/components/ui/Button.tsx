import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg border border-accent hover:bg-accent-soft hover:border-accent-soft font-semibold shadow-sm shadow-accent/15",
  secondary:
    "bg-panel text-fg border border-line hover:border-accent/55 hover:text-accent dark:hover:text-accent-soft font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
  outline:
    "bg-transparent text-fg border border-line hover:bg-panel-2 hover:border-accent/50 font-medium",
  ghost:
    "bg-transparent text-muted hover:text-fg hover:bg-panel-2/70 border border-transparent font-medium",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3.5 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-xs sm:text-sm gap-2 rounded-xl",
  lg: "h-11 px-5 text-sm gap-2 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-[background-color,border-color,color,transform] duration-150 select-none cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed active:translate-y-px",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (asChild) {
      return <span className={classes}>{children}</span>;
    }

    return (
      <button
        ref={ref}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
