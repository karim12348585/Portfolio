import { Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AnimeSeparatorProps {
  label?: string;
  code?: string;
  variant?: "default" | "compact";
  className?: string;
}

export function AnimeSeparator({
  label = "SYSTEM SYNCHRONIZED",
  code = "SYNC // 0x9F",
  variant = "default",
  className,
}: AnimeSeparatorProps) {
  if (variant === "compact") {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("relative my-4 flex items-center gap-2 select-none", className)}
      >
        {/* Left bracket node */}
        <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-accent bg-accent/30" />

        {/* Glowing Scanline Track */}
        <div className="anime-scanline-track relative h-px flex-1 overflow-hidden bg-line">
          <div className="anime-scanline-beam absolute inset-y-0 w-24" />
        </div>

        {label && (
          <span className="shrink-0 font-mono text-[9px] font-semibold tracking-widest text-faint uppercase">
            {label}
          </span>
        )}

        {/* Right segmented ticks */}
        <div className="flex shrink-0 items-center gap-0.5">
          <span className="h-1 w-1.5 rounded-[1px] bg-accent/60" />
          <span className="h-1 w-1.5 rounded-[1px] bg-accent-soft/60" />
        </div>
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("section relative py-3 select-none", className)}
    >
      <div className="relative flex items-center gap-3">
        {/* Left Corner Bracket + Segmented Ticks */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 border-t border-l border-accent/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          <div className="hidden items-center gap-0.5 sm:flex">
            <span className="h-1 w-2 rounded-[1px] bg-accent/70" />
            <span className="h-1 w-2 rounded-[1px] bg-accent/45" />
            <span className="h-1 w-2 rounded-[1px] bg-accent/25" />
          </div>
        </div>

        {/* Left Glowing Scanline Rail */}
        <div className="anime-scanline-track relative h-[1px] flex-1 overflow-hidden border-t border-line/80 bg-line/60">
          <div className="anime-scanline-beam absolute inset-y-0 w-36" />
        </div>

        {/* Center Anime System Pill */}
        <div className="relative flex shrink-0 items-center gap-2 rounded-full border border-line bg-panel/90 px-3.5 py-1 shadow-sm backdrop-blur-md">
          <span className="absolute -top-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <Sparkles size={10} className="text-accent" />
          <span className="font-mono text-[10px] font-bold tracking-widest text-accent uppercase">
            {label}
          </span>
          {code && (
            <>
              <span aria-hidden="true" className="text-line">
                /
              </span>
              <span className="hidden font-mono text-[9px] text-faint tabular-nums sm:inline">
                {code}
              </span>
            </>
          )}
        </div>

        {/* Right Glowing Scanline Rail */}
        <div className="anime-scanline-track relative h-[1px] flex-1 overflow-hidden border-t border-line/80 bg-line/60">
          <div className="anime-scanline-beam anime-scanline-beam-delayed absolute inset-y-0 w-36" />
        </div>

        {/* Right Segmented Ticks + Corner Bracket */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="hidden items-center gap-0.5 sm:flex">
            <span className="h-1 w-2 rounded-[1px] bg-accent-soft/25" />
            <span className="h-1 w-2 rounded-[1px] bg-accent-soft/45" />
            <span className="h-1 w-2 rounded-[1px] bg-accent-soft/70" />
          </div>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent-soft" />
          <span className="h-2.5 w-2.5 border-r border-b border-accent-soft/70" />
        </div>
      </div>
    </div>
  );
}
