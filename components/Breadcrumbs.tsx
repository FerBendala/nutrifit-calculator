'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

// Genera el schema BreadcrumbList para SEO
function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = 'https://nutrifit-calculator.com';
  
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: baseUrl
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {})
    }))
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      {/* Schema JSON-LD para BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-1 text-sm ${className}`}>
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Ir a página principal"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">Inicio</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
