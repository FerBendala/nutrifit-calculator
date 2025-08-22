import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.entries(PAGE_METADATA).map(([key, page]) => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: key === 'home' ? 'weekly' as const : 'monthly' as const,
    priority: key === 'home' ? 1 : key === 'imc' || key === 'tdee' ? 0.9 : 0.8,
  }));

  // Add legal pages with appropriate priorities
  const legalPages = [
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const legalRoutes = legalPages.map(page => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Add additional important URLs for crawlers
  const additionalRoutes = [
    {
      url: `${SITE_CONFIG.url}/robots.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.1,
    }
  ];

  return [...routes, ...legalRoutes, ...additionalRoutes];
}