import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo';
import { MetadataRoute } from 'next';

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, ''); // sin barra final
const BUILD_TIME = new Date(); // congela la fecha en el build

export default function sitemap(): MetadataRoute.Sitemap {
  // Ajusta aquí qué claves de PAGE_METADATA son indexables
  const indexables = Object.entries(PAGE_METADATA)
    // .filter(([_, page]) => page.index !== false) // si tienes flag
    .map(([key, page]) => {
      // prioridad por tipo de página
      const priority =
        key === 'home' ? 1
          : key === 'imc' || key === 'tdee' || key === 'composicion' || key === 'ritmo-cardiaco' ? 0.9
            : 0.8;

      const changeFrequency:
        | 'always' | 'hourly' | 'daily' | 'weekly'
        | 'monthly' | 'yearly' | 'never'
        = key === 'home' ? 'weekly' : 'monthly';

      return {
        url: `${BASE_URL}${page.path}`,
        lastModified: BUILD_TIME,
        changeFrequency,
        priority
      } as const;
    });

  const legalRoutes = [
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: BUILD_TIME,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Nada de robots.txt aquí
  return [...indexables, ...legalRoutes];
}