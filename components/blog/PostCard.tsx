import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { PostPreview } from '@/lib/blog';
import { formatDate, generateCategorySlug, generateTagSlug } from '@/lib/blog-utils';
import { CalendarDays, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: PostPreview;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${featured ? 'border-primary/20 shadow-md' : ''
      }`}>
      {post.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Destacado
            </Badge>
          )}
        </div>
      )}

      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((category) => (
            <Link
              key={category}
              href={`/blog/categoria/${generateCategorySlug(category)}`}
              className="inline-block"
            >
              <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                {category}
              </Badge>
            </Link>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className={`font-bold leading-tight transition-colors group-hover:text-primary ${featured ? 'text-xl' : 'text-lg'
            }`}>
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>

            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${generateTagSlug(tag)}`}
              className="inline-block"
            >
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1 hover:bg-secondary/80 transition-colors"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-1">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
