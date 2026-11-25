import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
  className,
}: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
        {eyebrow && (
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
        )}
        <h2 className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-fg sm:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto max-w-2xl text-pretty text-base text-muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3 border-t border-line pt-5 lg:grid-cols-12 lg:items-end",
        className,
      )}
    >
      <div className="lg:col-span-7">
        {(index || eyebrow) && (
          <div className="mb-2.5 flex items-center gap-2">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {index ? `${index} · ${eyebrow ?? ""}` : eyebrow}
            </span>
          </div>
        )}
        <h2 className="max-w-2xl text-balance font-display text-2xl font-bold leading-[1.1] tracking-tight text-fg sm:text-[2.25rem]">
          {title}
        </h2>
      </div>

      {description && (
        <p className="text-pretty text-sm leading-relaxed text-muted lg:col-span-5 lg:pb-0.5">
          {description}
        </p>
      )}
    </div>
  );
}
