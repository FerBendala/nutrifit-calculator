'use client';

import { List } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = document.querySelectorAll('h2[id], h3[id]');
    const items: TOCItem[] = [];

    elements.forEach((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      if (!el.id && id) {
        el.id = id;
      }
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    if (items.length >= 3) {
      setHeadings(items);
    }
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="card-golden bg-muted/30 mb-8" aria-label="Tabla de contenidos">
      <h3 className="font-semibold text-base mb-3 flex items-center">
        <List className="w-4 h-4 mr-2 text-muted-foreground" />
        En esta pagina
      </h3>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block py-1 px-2 rounded transition-colors ${
                activeId === heading.id
                  ? 'text-info font-medium bg-info-subtle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
