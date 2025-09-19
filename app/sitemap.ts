import { generateCategorySlug, generateTagSlug, getAllCategories, getAllPosts, getAllTags } from '@/lib/blog';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo';
import { MetadataRoute } from 'next';

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, ''); // sin barra final
const BUILD_TIME = new Date(); // congela la fecha en el build

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ajusta aquí qué claves de PAGE_METADATA son indexables
  const indexables = Object.entries(PAGE_METADATA)
    // .filter(([_, page]) => page.index !== false) // si tienes flag
    .map(([key, page]) => {
      // prioridad por tipo de página
      const priority =
        key === 'home' ? 1
          : key === 'imc' || key === 'tdee' || key === 'composicion' || key === 'ritmo-cardiaco' || key === 'grasa-corporal' || key === 'peso-ideal' || key === 'masa-muscular' ? 0.9
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

  // Rutas del blog
  try {
    const [allPosts, categories, tags] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
      getAllTags(),
    ]);

    // Página principal del blog
    const blogRoutes = [{
      url: `${BASE_URL}/blog`,
      lastModified: BUILD_TIME,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }];

    // Posts individuales
    const postRoutes = allPosts.map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.7,
    }));

    // Páginas de categorías
    const categoryRoutes = categories.map(category => ({
      url: `${BASE_URL}/blog/categoria/${generateCategorySlug(category)}`,
      lastModified: BUILD_TIME,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // Páginas de tags
    const tagRoutes = tags.map(tag => ({
      url: `${BASE_URL}/blog/tag/${generateTagSlug(tag)}`,
      lastModified: BUILD_TIME,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...indexables, ...legalRoutes, ...blogRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    // Fallback sin rutas del blog si hay error
    return [...indexables, ...legalRoutes];
  }
}