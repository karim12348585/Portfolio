import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientMesh } from "@/components/GradientMesh";

export function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center justify-center overflow-hidden">
      <GradientMesh />
      <div className="relative z-10 text-center">
        <p className="text-7xl font-black accent-gradient-text sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button size="lg">
            <Home size={17} />
            Back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
