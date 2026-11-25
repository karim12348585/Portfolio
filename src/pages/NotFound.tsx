import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  return (
    <div className="section flex min-h-[75svh] items-center justify-center py-24">
      <div className="max-w-md rounded-xl border border-line bg-panel p-10 text-center">
        <p className="font-mono text-4xl font-bold text-accent tabular-nums">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-fg">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The page or project case study you are looking for does not exist or has moved.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button size="md">
            <Home size={15} />
            <span>Return to portfolio</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
