import { CalculatorCTA } from '@/components/CalculatorCTA';
import { SocialShare } from '@/components/SocialShare';
import { TableOfContents } from '@/components/TableOfContents';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Post } from '@/lib/blog';
import { formatDate, generateCategorySlug, generateTagSlug } from '@/lib/blog-utils';
import { ArrowLeft, CalendarDays, Clock, FolderOpen, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <>
      {/* Hero Section con imagen de fondo */}
      {post.image && (
        <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
              fill
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Contenido superpuesto */}
          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-4 pb-12 max-w-5xl">
              <div className="space-y-4 text-white">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-white/80 mix-blend-difference">
                  <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Inicio
                  </Link>
                  <span className="mx-2">/</span>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </nav>

                {/* Categorías */}
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog/categoria/${generateCategorySlug(category)}`}
                    >
                      <Badge className="bg-white/90 text-foreground hover:bg-white transition-colors backdrop-blur-sm text-black">
                        <FolderOpen className="w-3 h-3 mr-1" />
                        {category}
                      </Badge>
                    </Link>
                  ))}
                </div>

                {/* Título principal */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
                  {post.title}
                </h1>

                {/* Descripción */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                  {post.description}
                </p>

                {/* Metadatos */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-white/80 pt-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min de lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenido principal */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header alternativo si no hay imagen */}
        {!post.image && (
          <header className="py-12 space-y-6 text-center">
            {/* Breadcrumbs */}
            <nav className="flex items-center justify-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </nav>

            {/* Categorías */}
            <div className="flex flex-wrap justify-center gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/categoria/${generateCategorySlug(category)}`}
                >
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <FolderOpen className="w-3 h-3 mr-1" />
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {post.title}
            </h1>

            {/* Descripción */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {post.description}
            </p>

            {/* Metadatos */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min de lectura</span>
              </div>
            </div>

            <Separator className="max-w-32 mx-auto" />
          </header>
        )}

        {/* Separador visual entre hero e contenido */}
        {post.image && (
          <div className="py-8">
            <Separator className="max-w-32 mx-auto" />
          </div>
        )}

        {/* Contenido del artículo */}
        <div className="py-12">
          <TableOfContents />
          <div className="blog-content prose prose-xl max-w-none prose-headings:scroll-mt-20">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* CTA a calculadora relevante */}
          <CalculatorCTA categories={post.categories} tags={post.tags} />
        </div>

        {/* Footer del artículo */}
        <footer className="py-12 space-y-8 border-t">
          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <Tag className="w-5 h-5" />
              Etiquetas
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${generateTagSlug(tag)}`}
                >
                  <Badge
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer text-sm px-3 py-1.5 hover:scale-105"
                  >
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Compartir en Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="h-8 w-1 bg-primary rounded-full" />
              Compartir artículo
            </h3>
            <SocialShare
              title={post.title}
              url={`https://nutrifit-calculator.com/blog/${post.slug}`}
              description={post.description}
            />
          </div>

          {/* Call to Action más elegante */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/10">
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">¿Te resultó útil este artículo?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Pon en práctica estos conocimientos con nuestras calculadoras profesionales
                  y obtén resultados personalizados y precisos para tus objetivos de salud.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
                <Link
                  href="/"
                  className="group bg-background border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="text-3xl mb-3">🧮</div>
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                    Calculadora de Calorías
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Calcula tus necesidades calóricas diarias
                  </p>
                </Link>

                <Link
                  href="/proteina"
                  className="group bg-background border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="text-3xl mb-3">🥩</div>
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                    Proteína Diaria
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Determina tu ingesta óptima de proteína
                  </p>
                </Link>

                <Link
                  href="/imc"
                  className="group bg-background border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:col-span-2 lg:col-span-1"
                >
                  <div className="text-3xl mb-3">📏</div>
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2">
                    Índice de Masa Corporal
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Evalúa tu estado nutricional actual
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
