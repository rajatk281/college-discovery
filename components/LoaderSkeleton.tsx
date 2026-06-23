export function CollegeCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-border bg-card">
      <div className="h-44 w-full animate-pulse-soft bg-muted" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-5 w-3/4 animate-pulse-soft rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse-soft rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse-soft rounded bg-muted" />
        <div className="mt-2 h-9 w-full animate-pulse-soft rounded-[10px] bg-muted" />
      </div>
    </div>
  );
}

export function CollegeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CollegeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CollegeDetailSkeleton() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="h-64 w-full animate-pulse-soft rounded-[10px] bg-muted" />
      <div className="h-8 w-2/3 animate-pulse-soft rounded bg-muted" />
      <div className="h-4 w-1/3 animate-pulse-soft rounded bg-muted" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse-soft rounded-[10px] bg-muted" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse-soft rounded-[10px] bg-muted" />
        ))}
      </div>
    </div>
  );
}
