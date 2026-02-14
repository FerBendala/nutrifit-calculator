'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateCategorySlug } from '@/lib/blog-utils';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  currentCategory?: string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

export function CategoryFilter({
  categories,
  currentCategory,
  onSearch,
  searchPlaceholder = "Buscar artículos...",
  showSearch = true
}: CategoryFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <div className="space-y-6">
      {/* Buscador */}
      {showSearch && (
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      )}

      {/* Filtros de categoría */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {/* Opción "Todas" */}
          <Link href="/blog/">
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
    </div>
  );
}
