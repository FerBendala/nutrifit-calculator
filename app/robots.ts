import { SITE_CONFIG } from '@/lib/seo'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = SITE_CONFIG.url.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/node_modules/',
        '/out/',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}