export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-96 max-w-full bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Filter skeleton */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-20 bg-gray-100 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Posts grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article key={i} className="rounded-lg border bg-card overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
