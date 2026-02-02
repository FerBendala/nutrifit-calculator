export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
        <p className="text-muted-foreground text-sm animate-pulse">Cargando calculadora...</p>
      </div>
    </div>
  );
}
