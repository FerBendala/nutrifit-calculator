'use client';

import { buttonVariants } from '@/components/ui/button';
import type { PaginationMeta } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface BlogPaginationProps {
  pagination: PaginationMeta;
  basePath?: string;
  className?: string;
}

// Genera el array de números de página a mostrar
function generatePageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  // Si hay 7 páginas o menos, mostrar todas
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  // Siempre mostrar la primera página
  pages.push(1);

  if (currentPage <= 3) {
    // Cerca del inicio: 1 2 3 4 5 ... N
    pages.push(2, 3, 4, 5, 'ellipsis', totalPages);
  } else if (currentPage >= totalPages - 2) {
    // Cerca del final: 1 ... N-4 N-3 N-2 N-1 N
    pages.push('ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    // En el medio: 1 ... P-1 P P+1 ... N
    pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
  }

  return pages;
}

export function BlogPagination({ pagination, basePath = '/blog', className }: BlogPaginationProps) {
  const { currentPage, totalPages, hasPrevPage, hasNextPage } = pagination;

  // No mostrar paginación si hay 1 página o menos
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  // Genera la URL para una página específica
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}?page=${page}`;
  };

  return (
    <nav
      role="navigation"
      aria-label="Paginación del blog"
      className={cn('mx-auto flex w-full justify-center', className)}
    >
      <ul className="flex flex-row items-center gap-1">
        {/* Botón Anterior */}
        <li>
          {hasPrevPage ? (
            <Link
              href={getPageUrl(currentPage - 1)}
              aria-label="Ir a la página anterior"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 pl-2.5'
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 pl-2.5 pointer-events-none opacity-50'
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </span>
          )}
        </li>

        {/* Números de página */}
        {pageNumbers.map((page, index) => (
          <li key={`page-${index}`}>
            {page === 'ellipsis' ? (
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Más páginas</span>
              </span>
            ) : (
              <Link
                href={getPageUrl(page)}
                aria-label={`Ir a la página ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={cn(
                  buttonVariants({
                    variant: page === currentPage ? 'outline' : 'ghost',
                    size: 'icon',
                  }),
                  page === currentPage && 'border-primary bg-primary/10'
                )}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Botón Siguiente */}
        <li>
          {hasNextPage ? (
            <Link
              href={getPageUrl(currentPage + 1)}
              aria-label="Ir a la página siguiente"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 pr-2.5'
              )}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 pr-2.5 pointer-events-none opacity-50'
              )}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
