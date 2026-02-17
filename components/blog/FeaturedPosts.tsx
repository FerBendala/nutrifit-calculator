import type { PostPreview } from '@/lib/blog';
import { Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface FeaturedPostsProps {
  posts: PostPreview[];
  title?: string;
  description?: string;
}

export function FeaturedPosts({
  posts,
  title = "Artículo Destacado",
  description = "El artículo más popular y útil de nuestro blog de nutrición y fitness"
}: FeaturedPostsProps) {
  // Solo mostrar si hay al menos un post destacado
  const featuredPost = posts[0];
  if (!featuredPost) {
    return null;
  }

  return (
    <section className="space-y-6">
      {/* Post destacado compacto */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-warning shadow-lg">
        <div className="relative p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Contenido compacto */}
            <div className="flex-1 space-y-3">
              {/* Header con badge */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>DESTACADO</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-warning" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  {featuredPost.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-warning-subtle text-warning text-xs rounded-md font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Título compacto */}
              <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight line-clamp-2">
                {featuredPost.title}
              </h3>

              {/* Excerpt más corto */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {featuredPost.excerpt}
              </p>

              {/* Footer compacto */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime} min</span>
                </div>
                <a
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <span>Leer más</span>
                  <TrendingUp className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Imagen compacta */}
            {featuredPost.image && (
              <div className="lg:w-48 lg:flex-shrink-0">
                <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="object-cover w-full h-full"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 192px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
