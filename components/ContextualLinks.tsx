'use client';

import { generateNavigation } from '@/lib/calculators';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ContextualLink {
  text: string;
  href: string;
  isExternal?: boolean;
  description?: string;
}

interface ContextualLinksProps {
  title: string;
  links: ContextualLink[];
  className?: string;
}

export function ContextualLinks({ title, links, className = '' }: ContextualLinksProps) {
  return (
    <div className={`bg-warning-subtle border-l-4 border-warning p-4 rounded-r-lg ${className}`}>
      <h4 className="font-semibold text-foreground mb-3 flex items-center">
        💡 {title}
      </h4>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-start space-x-2">
            <ArrowRight className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
            <div>
              {link.isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info hover:text-info underline text-sm font-medium inline-flex items-center"
                >
                  {link.text}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-info hover:text-info underline text-sm font-medium"
                >
                  {link.text}
                </Link>
              )}
              {link.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {link.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para enlaces de navegación entre calculadoras
export function CalculatorNavigation({ currentCalculator }: { currentCalculator: string }) {
  const navigation = generateNavigation(currentCalculator);

  if (!navigation) return null;

  return (
    <div className="flex justify-between items-center pt-8 mt-8 border-t border-border">
      <Link
        href={navigation.prev.href}
        className="flex items-center space-x-2 text-info hover:text-info/80 transition-colors group"
      >
        <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        <div className="text-left">
          <p className="text-xs text-muted-foreground">Anterior</p>
          <p className="text-sm font-medium">{navigation.prev.title}</p>
        </div>
      </Link>

      <Link
        href={navigation.next.href}
        className="flex items-center space-x-2 text-info hover:text-info/80 transition-colors group text-right"
      >
        <div>
          <p className="text-xs text-muted-foreground">Siguiente</p>
          <p className="text-sm font-medium">{navigation.next.title}</p>
        </div>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
