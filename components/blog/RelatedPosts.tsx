import type { PostPreview } from '@/lib/blog';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { PostCard } from './PostCard';

interface RelatedPostsProps {
  posts: PostPreview[];
  title?: string;
}

export function RelatedPosts({
  posts,
  title = "Artículos Relacionados"
}: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Continúa aprendiendo con estos artículos complementarios seleccionados especialmente para ti
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length >= 3 && (
        <div className="text-center pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
