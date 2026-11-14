import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  return (
    <div className="section relative flex min-h-[80svh] flex-col justify-end pb-20 pt-32">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          Error
        </p>
        <p className="font-narrow mt-4 text-[clamp(6rem,22vw,16rem)] font-semibold leading-[0.85] tracking-[-0.03em]">
          404
        </p>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 max-w-sm text-muted">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button size="lg">
            <ArrowLeft size={14} />
            Back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
