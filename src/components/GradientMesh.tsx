import { cn } from "@/utils/cn";

/** Soft, blurred gradient blobs used as an ambient page backdrop. */
export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-accent/[0.09] blur-[130px]" />
      <div
        className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent-soft/[0.08] blur-[130px]"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/[0.05] blur-[120px]"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
