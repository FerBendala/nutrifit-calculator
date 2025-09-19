import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
  description: string;
  categories: string[];
  tags: string[];
  image: string;
  slug: string;
  readTime: number;
  featured: boolean;
}

export interface Post extends PostFrontMatter {
  content: string;
  excerpt: string;
}

export interface PostPreview extends PostFrontMatter {
  excerpt: string;
}

// Función para obtener todos los slugs de los posts
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// Función para obtener todos los posts (solo metadatos + excerpt)
export async function getAllPosts(): Promise<PostPreview[]> {
  try {
    const slugs = getAllPostSlugs();
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const postData = await getPostBySlug(slug);
        return {
          ...postData,
          content: undefined, // Excluir contenido completo para mejor rendimiento
        } as PostPreview;
      })
    );

    // Ordenar posts por fecha (más recientes primero)
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

// Función para obtener posts destacados
export async function getFeaturedPosts(): Promise<PostPreview[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured);
}

// Función para obtener posts por categoría
export async function getPostsByCategory(category: string): Promise<PostPreview[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    post.categories.some(cat =>
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

// Función para obtener posts por tag
export async function getPostsByTag(tag: string): Promise<PostPreview[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post =>
    post.tags.some(postTag =>
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Función para obtener un post específico por slug
export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Procesar el contenido Markdown a HTML
    const processedContent = await remark()
      .use(remarkGfm) // Soporte para GitHub Flavored Markdown
      .use(remarkHtml, { sanitize: false }) // Permitir HTML en Markdown
      .process(content);

    const contentHtml = processedContent.toString();

    // Generar excerpt (primeros 160 caracteres del contenido sin HTML)
    const plainText = content.replace(/#{1,6}\s+/g, '').replace(/\*\*(.+?)\*\*/g, '$1');
    const excerpt = plainText.substring(0, 160).trim() + '...';

    return {
      slug,
      content: contentHtml,
      excerpt,
      ...data,
    } as Post;
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    throw error;
  }
}

// Función para obtener posts relacionados (por categorías/tags)
export async function getRelatedPosts(slug: string, limit: number = 3): Promise<PostPreview[]> {
  try {
    const currentPost = await getPostBySlug(slug);
    const allPosts = await getAllPosts();

    // Filtrar el post actual
    const otherPosts = allPosts.filter(post => post.slug !== slug);

    // Calcular puntuación de relevancia
    const postsWithScore = otherPosts.map(post => {
      let score = 0;

      // Puntos por categorías compartidas
      const sharedCategories = post.categories.filter(cat =>
        currentPost.categories.includes(cat)
      );
      score += sharedCategories.length * 2;

      // Puntos por tags compartidos
      const sharedTags = post.tags.filter(tag =>
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length;

      return { ...post, score };
    });

    // Ordenar por puntuación y luego por fecha
    return postsWithScore
      .sort((a, b) => {
        if (a.score === b.score) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.score - a.score;
      })
      .slice(0, limit);
  } catch (error) {
    console.error(`Error getting related posts for ${slug}:`, error);
    return [];
  }
}

// Función para obtener todas las categorías únicas
export async function getAllCategories(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts();
    const categories = new Set<string>();

    allPosts.forEach(post => {
      post.categories.forEach(category => categories.add(category));
    });

    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
}

// Función para obtener todos los tags únicos
export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts();
    const tags = new Set<string>();

    allPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });

    return Array.from(tags).sort();
  } catch (error) {
    console.error('Error getting tags:', error);
    return [];
  }
}

// Función para buscar posts por término
export async function searchPosts(searchTerm: string): Promise<PostPreview[]> {
  try {
    const allPosts = await getAllPosts();
    const searchTermLower = searchTerm.toLowerCase();

    return allPosts.filter(post => {
      return (
        post.title.toLowerCase().includes(searchTermLower) ||
        post.description.toLowerCase().includes(searchTermLower) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchTermLower)) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
      );
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}

// Re-exportar utilidades de blog que pueden usarse en cliente y servidor
export {
  calculateReadTime, formatDate, generateCategorySlug, generateSlug, generateTagSlug
} from './blog-utils';

// Función para generar sitemap de posts
export async function generatePostsSitemap(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.map(post => `/blog/${post.slug}`);
  } catch (error) {
    console.error('Error generating posts sitemap:', error);
    return [];
  }
}
