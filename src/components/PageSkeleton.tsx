/** Loading skeleton shown while a lazy route/page loads. */
export function PageSkeleton() {
  return (
    <div className="section min-h-screen pt-32">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-8 w-40 animate-pulse rounded-full bg-panel-2" />
        <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-panel-2" />
        <div className="h-4 w-full animate-pulse rounded-full bg-panel-2" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-panel-2" />
        <div className="grid gap-4 pt-6 sm:grid-cols-2">
          <div className="h-40 animate-pulse rounded-2xl bg-panel-2" />
          <div className="h-40 animate-pulse rounded-2xl bg-panel-2" />
        </div>
      </div>
    </div>
  );
}
