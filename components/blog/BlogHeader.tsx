import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

interface BlogHeaderProps {
  title?: string;
  description?: string;
  showStats?: boolean;
}

export function BlogHeader({
  title = "Blog de Nutrición y Fitness",
  description = "Artículos profesionales sobre nutrición, fitness y salud basados en evidencia científica. Guías prácticas para complementar nuestras calculadoras médicas.",
  showStats = true
}: BlogHeaderProps) {
  return (
    <header className="py-6 mb-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Blog</span>
          </nav>

          {/* Header compacto */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Blog
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Contenido científico</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                {title}
              </h1>

              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Enlaces rápidos compactos */}
            <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
              <Link
                href="/"
                className="inline-flex items-center px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
              >
                Calorías
              </Link>
              <Link
                href="/proteina/"
                className="inline-flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
              >
                Proteína
              </Link>
              <Link
                href="/imc/"
                className="inline-flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
              >
                IMC
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
