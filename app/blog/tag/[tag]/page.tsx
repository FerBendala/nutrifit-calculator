import { BlogHeader } from '@/components/blog/BlogHeader';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { PostCard } from '@/components/blog/PostCard';
import { Container } from '@/components/Container';
import { JsonLd } from '@/components/JsonLd';
import { generateTagSlug, getAllCategories, getAllTags, getPostsByTag } from '@/lib/blog';
import { getCanonicalUrl, SITE_CONFIG } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: {
    tag: string;
  };
}

// Generar metadata dinámicamente
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagSlug = params.tag;
  const allTags = await getAllTags();

  // Buscar el tag real desde el slug
  const tagName = allTags.find(tag =>
    generateTagSlug(tag) === tagSlug
  );

  if (!tagName) {
    return {
      title: 'Tag no encontrado | Blog NutriFit Calculator',
      description: 'El tag que buscas no fue encontrado.',
    };
  }

  const posts = await getPostsByTag(tagName);

  return {
    title: `Artículos con tag "${tagName}" | Blog NutriFit Calculator`,
    description: `Descubre todos nuestros artículos etiquetados con "${tagName}". Información profesional y basada en evidencia científica.`,
    openGraph: {
      title: `Artículos con tag "${tagName}" | Blog NutriFit Calculator`,
      description: `Descubre todos nuestros artículos etiquetados con "${tagName}". Información profesional y basada en evidencia científica.`,
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl(`/blog/tag/${tagSlug}`),
    },
  };
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: generateTagSlug(tag),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const tagSlug = params.tag;
  const allTags = await getAllTags();
  const allCategories = await getAllCategories();

  // Buscar el tag real desde el slug
  const tagName = allTags.find(tag =>
    generateTagSlug(tag) === tagSlug
  );

  if (!tagName) {
    notFound();
  }

  const posts = await getPostsByTag(tagName);

  // JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Artículos con tag "${tagName}"`,
    description: `Artículos etiquetados con "${tagName}" del blog de NutriFit Calculator`,
    url: `${SITE_CONFIG.url}/blog/tag/${tagSlug}/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'NutriFit Calculator',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_CONFIG.url}/icon.svg`,
            },
          },
          datePublished: post.date,
          url: `${SITE_CONFIG.url}/blog/${post.slug}/`,
          image: post.image ? `${SITE_CONFIG.url}${post.image}` : `${SITE_CONFIG.url}/images/blog-default.jpg`,
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: SITE_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_CONFIG.url}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tagName,
        item: `${SITE_CONFIG.url}/blog/tag/${tagSlug}/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          {/* Header del Blog */}
          <BlogHeader />

          <div className="space-y-8">
            {/* Breadcrumb y navegación */}
            <div className="space-y-4">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
                <span>/</span>
                <Link href="/blog/" className="hover:text-primary transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-foreground">Tag: {tagName}</span>
              </nav>

              <div className="flex items-center gap-4">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al blog
                </Link>
              </div>
            </div>

            {/* Header del tag */}
            <div className="text-center space-y-4 py-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  <span>#</span>
                  <span>{tagName}</span>
                </div>
                <h1 className="text-3xl font-bold">
                  Artículos etiquetados con "{tagName}"
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {posts.length === 0
                    ? 'No hay artículos con esta etiqueta aún.'
                    : `${posts.length} ${posts.length === 1 ? 'artículo encontrado' : 'artículos encontrados'} con esta etiqueta.`
                  }
                </p>
              </div>
            </div>

            {/* Filtros y navegación de categorías */}
            <CategoryFilter categories={allCategories} showSearch={false} />

            {/* Lista de posts */}
            <section className="space-y-6">
              {posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      featured={post.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl opacity-20">🏷️</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">No hay artículos con esta etiqueta</h3>
                    <p className="text-muted-foreground">
                      Pronto tendremos más contenido etiquetado con "{tagName}".
                    </p>
                  </div>
                  <Link
                    href="/blog/"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Ver todos los artículos
                  </Link>
                </div>
              )}
            </section>

            {/* Sugerencias de exploración */}
            {posts.length > 0 && (
              <section className="bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg p-6 text-center space-y-4">
                <h2 className="text-lg font-bold">¿Te interesa este tema?</h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  Explora nuestras calculadoras relacionadas con {tagName.toLowerCase()}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href="/"
                    className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
                  >
                    🧮 Calorías
                  </Link>
                  <Link
                    href="/proteina/"
                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
                  >
                    🥩 Proteína
                  </Link>
                  <Link
                    href="/imc/"
                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
                  >
                    📏 IMC
                  </Link>
                  <Link
                    href="/grasa-corporal/"
                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors text-xs font-medium"
                  >
                    📊 Grasa
                  </Link>
                </div>
              </section>
            )}
          </div>
        </main>
      </Container>
    </>
  );
}
