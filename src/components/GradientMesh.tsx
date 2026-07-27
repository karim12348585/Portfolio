import { cn } from "@/utils/cn";

/** Soft, blurred gradient blobs used as an ambient page backdrop. */
export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -left-24 -top-24 h-[38rem] w-[38rem] rounded-full bg-accent/20 blur-[120px] animate-float" />
      <div
        className="absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-accent-soft/15 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px] animate-float"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
