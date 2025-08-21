import { MetadataRoute } from 'next';
import { SITE_CONFIG, PAGE_METADATA } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.entries(PAGE_METADATA).map(([key, page]) => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: key === 'home' ? 1 : 0.8,
  }));

  // Add legal pages
  const legalPages = [
    { path: '/privacidad', priority: 0.3 },
    { path: '/terminos', priority: 0.3 },
    { path: '/cookies', priority: 0.3 },
  ];

  const legalRoutes = legalPages.map(page => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: page.priority,
  }));

  return [...routes, ...legalRoutes];
}