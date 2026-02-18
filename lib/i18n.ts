/**
 * i18n configuration — single source of truth for locale settings.
 *
 * When adding a new language:
 * 1. Add the locale to SUPPORTED_LOCALES
 * 2. Set up [locale] route segments or subdomain routing
 * 3. Add hreflang alternates via generateMetadata in layout.tsx
 * 4. Create translated content in content/posts/[locale]/
 * 5. Translate PAGE_METADATA entries in lib/seo.ts
 */

export const DEFAULT_LOCALE = 'es' as const;
export const DEFAULT_REGION = 'ES' as const;

export const SUPPORTED_LOCALES = [
  { code: 'es', region: 'ES', name: 'Español', hreflang: 'es' },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]['code'];

export const LOCALE_CONFIG = {
  htmlLang: DEFAULT_LOCALE,
  ogLocale: `${DEFAULT_LOCALE}_${DEFAULT_REGION}`,
  schemaLanguage: `${DEFAULT_LOCALE}-${DEFAULT_REGION}`,
} as const;
