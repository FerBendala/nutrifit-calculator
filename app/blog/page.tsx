import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { FeaturedPosts } from '@/components/blog/FeaturedPosts';
import { Container } from '@/components/Container';
import { JsonLd } from '@/components/JsonLd';
import { getAllCategories, getFeaturedPosts, getAllPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de Nutrición y Fitness | Calculadora Fitness',
  description: 'Artículos profesionales sobre nutrición, fitness y salud basados en evidencia científica. Guías prácticas para complementar nuestras calculadoras médicas.',
  openGraph: {
    title: 'Blog de Nutrición y Fitness | Calculadora Fitness',
    description: 'Artículos profesionales sobre nutrición, fitness y salud basados en evidencia científica.',
    type: 'website',
    url: `${SITE_CONFIG.url}/blog/`,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/blog-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog de Nutrición y Fitness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de Nutrición y Fitness | Calculadora Fitness',
    description: 'Artículos profesionales sobre nutrición, fitness y salud basados en evidencia científica.',
    images: [`${SITE_CONFIG.url}/images/blog-og.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog/`,
  },
};

export default async function BlogPage() {
  // Cargar datos del blog
  const [featuredPosts, categories, allPosts] = await Promise.all([
    getFeaturedPosts(),
    getAllCategories(),
    getAllPosts(),
  ]);

  const posts = allPosts.slice(0, 12); // Mostrar primeros 12 posts

  // Para el JSON-LD, obtener los primeros 5 posts
  const allPostsForSchema = posts.slice(0, 5);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Nutrición y Fitness',
    description: 'Artículos profesionales sobre nutrición, fitness y salud basados en evidencia científica.',
    url: `${SITE_CONFIG.url}/blog/`,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    ...(allPostsForSchema.length > 0 && {
      mainEntity: allPostsForSchema.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        datePublished: post.date,
        url: `${SITE_CONFIG.url}/blog/${post.slug}/`,
        keywords: post.tags.join(', '),
      })),
    }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          {/* Header del Blog */}
          <BlogHeader />

          <div className="space-y-8">
            {/* Posts Destacados */}
            {featuredPosts.length > 0 && (
              <FeaturedPosts posts={featuredPosts} />
            )}

            {/* Búsqueda y Filtros con Posts */}
            <BlogSearch
              posts={allPosts}
              categories={categories}
            />

            {/* Call to Action compacto */}
            <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center space-y-4">
              <h2 className="text-lg font-bold">¿Necesitas calcular algo específico?</h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Aplica lo que aprendes con nuestras calculadoras profesionales
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <a
                  href="/"
                  className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
                >
                  Calorías
                </a>
                <a
                  href="/proteina/"
                  className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
                >
                  Proteína
                </a>
                <a
                  href="/imc/"
                  className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
                >
                  IMC
                </a>
                <a
                  href="/grasa-corporal/"
                  className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
                >
                  Grasa
                </a>
              </div>
            </section>
          </div>
        </main>
      </Container>
    </>
  );
}
