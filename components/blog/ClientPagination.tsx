'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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

export function ClientPagination({ currentPage, totalPages, onPageChange, className }: ClientPaginationProps) {
  // No mostrar paginación si hay 1 página o menos
  if (totalPages <= 1) {
    return null;
  }

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Paginación de artículos"
      className={cn('mx-auto flex w-full justify-center', className)}
    >
      <ul className="flex flex-row items-center gap-1">
        {/* Botón Anterior */}
        <li>
          <Button
            variant="ghost"
            size="default"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            aria-label="Ir a la página anterior"
            className={cn('gap-1 pl-2.5', !hasPrevPage && 'pointer-events-none opacity-50')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
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
              <Button
                variant={page === currentPage ? 'outline' : 'ghost'}
                size="icon"
                onClick={() => handlePageChange(page)}
                aria-label={`Ir a la página ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={cn(
                  page === currentPage && 'border-primary bg-primary/10'
                )}
              >
                {page}
              </Button>
            )}
          </li>
        ))}

        {/* Botón Siguiente */}
        <li>
          <Button
            variant="ghost"
            size="default"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            aria-label="Ir a la página siguiente"
            className={cn('gap-1 pr-2.5', !hasNextPage && 'pointer-events-none opacity-50')}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
