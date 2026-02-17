import { PostContent } from '@/components/blog/PostContent';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Container } from '@/components/Container';
import { JsonLd } from '@/components/JsonLd';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generar metadata dinámicamente
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    return {
      title: `${post.title} | Blog Calculadora Fitness`,
      description: post.description,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        images: post.image ? [
          {
            url: post.image.startsWith('http') ? post.image : `${SITE_CONFIG.url}${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ] : [],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.image ? [
          post.image.startsWith('http') ? post.image : `${SITE_CONFIG.url}${post.image}`
        ] : [],
      },
      keywords: [...post.tags, ...post.categories, 'nutrición', 'fitness', 'salud'].join(', '),
      alternates: {
        canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Post no encontrado | Blog Calculadora Fitness',
      description: 'El post que buscas no fue encontrado.',
    };
  }
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  let post;

  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  // Obtener posts relacionados
  const relatedPosts = await getRelatedPosts(params.slug, 3);

  // JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? (
      post.image.startsWith('http') ? post.image : `${SITE_CONFIG.url}${post.image}`
    ) : undefined,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/icon.svg`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    articleSection: post.categories.join(', '),
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
    about: post.categories.map(category => ({
      '@type': 'Thing',
      name: category,
    })),
    mentions: [
      {
        '@type': 'Organization',
        name: 'Calculadora Fitness',
        url: SITE_CONFIG.url,
      },
    ],
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
        item: `${SITE_CONFIG.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ReadingProgress />

      <div className="min-h-screen">
        {/* Contenido principal del post */}
        <PostContent post={post} />

        {/* Posts relacionados */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted/30 py-16">
            <Container size="xl">
              <div className="max-w-5xl mx-auto">
                <RelatedPosts posts={relatedPosts} />
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
