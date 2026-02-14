'use client';

import { trackBlogCategoryFiltered } from '@/lib/analytics';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateCategorySlug } from '@/lib/blog-utils';
import type { PostPreview } from '@/lib/blog';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PostCard } from './PostCard';

interface BlogSearchProps {
  posts: PostPreview[];
  categories: string[];
  currentCategory?: string;
}

export function BlogSearch({ posts, categories, currentCategory }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar posts basándose en el término de búsqueda
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return posts;
    }

    const term = searchTerm.toLowerCase().trim();
    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(term);
      const descriptionMatch = post.description.toLowerCase().includes(term);
      const categoryMatch = post.categories?.some(cat => cat.toLowerCase().includes(term));
      const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(term));
      const excerptMatch = post.excerpt?.toLowerCase().includes(term);

      return titleMatch || descriptionMatch || categoryMatch || tagsMatch || excerptMatch;
    });
  }, [posts, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleCategoryClick = (category: string) => {
    trackBlogCategoryFiltered(category);
  };

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
          aria-label="Buscar artículos"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Filtros de categoría */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {/* Opción "Todas" */}
          <Link href="/blog/" onClick={() => handleCategoryClick('all')}>
            <Badge
              variant={!currentCategory ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${!currentCategory
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Todas
            </Badge>
          </Link>

          {/* Categorías individuales */}
          {categories.map((category) => {
            const categorySlug = generateCategorySlug(category);
            const isActive = currentCategory === categorySlug;

            return (
              <Link
                key={category}
                href={`/blog/categoria/${categorySlug}/`}
                onClick={() => handleCategoryClick(category)}
              >
                <Badge
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {category}
                </Badge>
              </Link>
            );
          })}
        </div>

        {/* Mostrar categoría activa */}
        {currentCategory && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Mostrando artículos de la categoría:{' '}
              <span className="font-medium text-foreground">
                {categories.find(cat =>
                  generateCategorySlug(cat) === currentCategory
                ) || currentCategory}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {searchTerm && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length === 0 ? (
              <>No se encontraron artículos para &quot;{searchTerm}&quot;</>
            ) : (
              <>
                {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''} para &quot;{searchTerm}&quot;
              </>
            )}
          </p>
        </div>
      )}

      {/* Grid de Posts Filtrados */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              featured={post.featured}
            />
          ))}
        </div>
      ) : searchTerm ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No se encontraron artículos que coincidan con tu búsqueda.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Intenta con otros términos o explora nuestras categorías.
          </p>
        </div>
      ) : null}
    </div>
  );
}
