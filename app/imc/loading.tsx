export default function IMCLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-14 w-96 max-w-full mx-auto bg-muted-foreground/20 rounded animate-pulse" />
          <div className="h-6 w-full max-w-2xl mx-auto bg-muted-foreground/10 rounded animate-pulse" />
        </div>

        {/* Calculator card skeleton */}
        <div className="rounded-xl border bg-card p-6 space-y-6">
          <div className="h-8 w-48 bg-muted-foreground/20 rounded animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="h-5 w-16 bg-muted-foreground/10 rounded animate-pulse" />
              <div className="h-10 w-full bg-muted-foreground/20 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-16 bg-muted-foreground/10 rounded animate-pulse" />
              <div className="h-10 w-full bg-muted-foreground/20 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-12 w-40 bg-primary/30 rounded animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-64 bg-muted-foreground/20 rounded animate-pulse" />
          <div className="h-4 w-full bg-muted-foreground/10 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted-foreground/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
