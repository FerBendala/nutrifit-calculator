// Utilidades del blog que pueden usarse tanto en cliente como servidor

// Función para generar slug desde título o categoría
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Evitar guiones múltiples
}

// Función específica para generar slugs de categorías
export function generateCategorySlug(category: string): string {
  return generateSlug(category);
}

// Función específica para generar slugs de tags
export function generateTagSlug(tag: string): string {
  return generateSlug(tag);
}

// Función para formatear fecha en español
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC',
  };

  return date.toLocaleDateString('es-ES', options);
}

// Función para calcular tiempo de lectura estimado
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200; // Promedio de lectura en español
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime); // Mínimo 1 minuto
}
