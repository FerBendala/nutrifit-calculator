import { generateCategorySlug, generateTagSlug, getAllCategories, getAllPosts, getAllTags } from '@/lib/blog';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo';
import { MetadataRoute } from 'next';

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, '');

const HIGH_PRIORITY_CALCULATORS = new Set([
  'imc', 'tdee', 'grasa-corporal', 'peso-ideal', 'masa-muscular',
  'composicion', 'ritmo-cardiaco', 'proteina', 'bmr', 'agua',
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const indexables = Object.entries(PAGE_METADATA)
    .map(([key, page]) => {
      const priority =
        key === 'home' ? 1
          : HIGH_PRIORITY_CALCULATORS.has(key) ? 0.9
            : 0.85;

      const changeFrequency:
        | 'always' | 'hourly' | 'daily' | 'weekly'
        | 'monthly' | 'yearly' | 'never'
        = key === 'home' ? 'weekly' : 'monthly';

      return {
        url: `${BASE_URL}${page.path}`,
        lastModified,
        changeFrequency,
        priority
      } as const;
    });

  const calculatorCategoryRoutes = [
    { path: '/calculadoras/nutricion/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/calculadoras/composicion-corporal/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/calculadoras/fitness/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/calculadoras/salud/', priority: 0.8, changeFrequency: 'monthly' as const },
  ].map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const institutionalRoutes = [
    { path: '/sobre-nosotros/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/equipo/', priority: 0.6, changeFrequency: 'monthly' as const },
  ].map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const legalRoutes = [
    { path: '/privacidad/', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos/', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies/', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  try {
    const [allPosts, categories, tags] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
      getAllTags(),
    ]);

    const blogRoutes = [{
      url: `${BASE_URL}/blog/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }];

    const postRoutes = allPosts.map(post => ({
      url: `${BASE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.7,
    }));

    const categoryRoutes = categories.map(category => ({
      url: `${BASE_URL}/blog/categoria/${generateCategorySlug(category)}/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const tagRoutes = tags.map(tag => ({
      url: `${BASE_URL}/blog/tag/${generateTagSlug(tag)}/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...indexables, ...calculatorCategoryRoutes, ...institutionalRoutes, ...legalRoutes, ...blogRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return [...indexables, ...calculatorCategoryRoutes, ...institutionalRoutes, ...legalRoutes];
  }
}