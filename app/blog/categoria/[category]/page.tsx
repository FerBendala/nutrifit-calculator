import { BlogHeader } from '@/components/blog/BlogHeader';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { PostCard } from '@/components/blog/PostCard';
import { Container } from '@/components/Container';
import { JsonLd } from '@/components/JsonLd';
import { generateCategorySlug, getAllCategories, getPostsByCategory } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generar metadata dinámicamente
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category;
  const allCategories = await getAllCategories();

  // Buscar la categoría real desde el slug
  const categoryName = allCategories.find(cat =>
    generateCategorySlug(cat) === categorySlug
  );

  if (!categoryName) {
    return {
      title: 'Categoría no encontrada | Blog Calculadora Fitness',
      description: 'La categoría que buscas no fue encontrada.',
    };
  }

  const posts = await getPostsByCategory(categoryName);

  return {
    title: `Artículos de ${categoryName} | Blog Calculadora Fitness`,
    description: `Descubre todos nuestros artículos sobre ${categoryName}. Información profesional y basada en evidencia científica.`,
    openGraph: {
      title: `Artículos de ${categoryName} | Blog Calculadora Fitness`,
      description: `Descubre todos nuestros artículos sobre ${categoryName}. Información profesional y basada en evidencia científica.`,
      type: 'website',
      url: `${SITE_CONFIG.url}/blog/categoria/${categorySlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Artículos de ${categoryName} | Blog Calculadora Fitness`,
      description: `Descubre todos nuestros artículos sobre ${categoryName}. Información profesional y basada en evidencia científica.`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/categoria/${categorySlug}`,
    },
  };
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    category: generateCategorySlug(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const allCategories = await getAllCategories();

  // Buscar la categoría real desde el slug
  const categoryName = allCategories.find(cat =>
    generateCategorySlug(cat) === categorySlug
  );

  if (!categoryName) {
    notFound();
  }

  const posts = await getPostsByCategory(categoryName);

  // JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Artículos de ${categoryName}`,
    description: `Artículos sobre ${categoryName} del blog de Calculadora Fitness`,
    url: `${SITE_CONFIG.url}/blog/categoria/${categorySlug}`,
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
          datePublished: post.date,
          url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        },
      })),
    },
    breadcrumb: {
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
          item: `${SITE_CONFIG.url}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: categoryName,
          item: `${SITE_CONFIG.url}/blog/categoria/${categorySlug}`,
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          {/* Header personalizado para la categoría */}
          <BlogHeader
            title={`Artículos de ${categoryName}`}
            description={`Descubre todos nuestros artículos sobre ${categoryName}. Información profesional y basada en evidencia científica para complementar nuestras calculadoras médicas.`}
            showStats={false}
          />

          <div className="space-y-12">
            {/* Breadcrumbs y navegación */}
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>

              <div className="text-sm text-muted-foreground">
                {posts.length} artículo{posts.length !== 1 ? 's' : ''} encontrado{posts.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Filtros de categoría */}
            <CategoryFilter
              categories={allCategories}
              currentCategory={categorySlug}
              showSearch={false}
            />

            {/* Posts de la categoría */}
            <section className="space-y-8">
              {posts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      featured={post.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl opacity-20">📝</div>
                  <h2 className="text-2xl font-bold text-muted-foreground">
                    No hay artículos en esta categoría todavía
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Estamos trabajando en crear contenido increíble para esta categoría.
                    Mientras tanto, explora otras categorías o nuestras calculadoras.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <Link
                      href="/blog"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Ver todos los artículos
                    </Link>
                    <Link
                      href="/"
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      Ir a calculadoras
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Call to Action relacionado con la categoría */}
            {posts.length > 0 && (
              <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-6">
                <h2 className="text-2xl font-bold">¿Quieres aplicar estos conocimientos?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Los artículos de {categoryName} se complementan perfectamente con nuestras calculadoras profesionales.
                  Obtén resultados personalizados y precisos.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
                  <a
                    href="/"
                    className="bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    🧮 Calculadora de Calorías
                  </a>
                  <a
                    href="/proteina"
                    className="bg-secondary text-secondary-foreground px-4 py-3 rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                  >
                    🥩 Proteína Diaria
                  </a>
                  <a
                    href="/imc"
                    className="bg-secondary text-secondary-foreground px-4 py-3 rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                  >
                    📏 Calculadora IMC
                  </a>
                  <a
                    href="/grasa-corporal"
                    className="bg-secondary text-secondary-foreground px-4 py-3 rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                  >
                    📊 Grasa Corporal
                  </a>
                </div>
              </section>
            )}
          </div>
        </main>
      </Container>
    </>
  );
}
