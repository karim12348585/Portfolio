/** Loading skeleton shown while a lazy route/page loads. */
export function PageSkeleton() {
  return (
    <div className="section min-h-screen pt-32">
      <div className="max-w-3xl space-y-5">
        <div className="h-3 w-32 animate-pulse bg-panel-2" />
        <div className="h-14 w-3/4 animate-pulse bg-panel-2" />
        <div className="h-3 w-full animate-pulse bg-panel-2" />
        <div className="h-3 w-5/6 animate-pulse bg-panel-2" />
        <div className="grid gap-px border border-line bg-line pt-0 sm:grid-cols-2">
          <div className="h-40 animate-pulse bg-panel" />
          <div className="h-40 animate-pulse bg-panel" />
        </div>
      </div>
    </div>
  );
}
