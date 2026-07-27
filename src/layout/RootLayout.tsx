import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Home } from "@/pages/Home";
import { PageSkeleton } from "@/components/PageSkeleton";

const ProjectDetail = lazy(() =>
  import("@/pages/ProjectDetail").then((m) => ({ default: m.ProjectDetail })),
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound })),
);

/** Scroll to top on route change (unless a hash/section target is set). */
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (!(location.state as { scrollTo?: string })?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname]);
  return null;
}

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <ScrollManager />
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageSkeleton />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
