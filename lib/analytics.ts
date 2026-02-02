// Sistema de analytics de eventos para rastrear interacciones de usuarios
// Compatible con Google Analytics 4 (GA4) y eventos personalizados

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Tipos de eventos de analytics
export type AnalyticsEventName =
  | 'calculator_used'
  | 'result_copied'
  | 'result_shared'
  | 'embed_code_copied'
  | 'related_calculator_clicked'
  | 'blog_post_viewed'
  | 'blog_category_filtered'
  | 'cta_clicked'
  | 'form_submitted'
  | 'error_occurred';

interface AnalyticsEventParams {
  calculator_name?: string;
  calculator_type?: string;
  share_platform?: string;
  result_type?: string;
  action?: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

// Enviar evento a Google Analytics
function sendToGA(eventName: string, params: AnalyticsEventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// Enviar evento al dataLayer (para GTM)
function sendToDataLayer(eventName: string, params: AnalyticsEventParams) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }
}

// Función principal para rastrear eventos
export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  // Enviar a GA4
  sendToGA(eventName, params);
  
  // Enviar también al dataLayer para GTM
  sendToDataLayer(eventName, params);
  
  // Log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}:`, params);
  }
}

// Eventos específicos pre-configurados

// Cuando un usuario usa una calculadora
export function trackCalculatorUsed(calculatorName: string, inputData?: Record<string, any>) {
  trackEvent('calculator_used', {
    calculator_name: calculatorName,
    calculator_type: getCalculatorType(calculatorName),
    action: 'calculate',
    ...inputData
  });
}

// Cuando un usuario copia los resultados
export function trackResultCopied(calculatorName: string, resultType: string = 'full') {
  trackEvent('result_copied', {
    calculator_name: calculatorName,
    result_type: resultType,
    action: 'copy'
  });
}

// Cuando un usuario comparte resultados
export function trackResultShared(calculatorName: string, platform: string) {
  trackEvent('result_shared', {
    calculator_name: calculatorName,
    share_platform: platform,
    action: 'share'
  });
}

// Cuando un usuario copia el código de embed
export function trackEmbedCodeCopied(calculatorName: string) {
  trackEvent('embed_code_copied', {
    calculator_name: calculatorName,
    action: 'copy_embed'
  });
}

// Cuando un usuario hace clic en una calculadora relacionada
export function trackRelatedCalculatorClicked(fromCalculator: string, toCalculator: string) {
  trackEvent('related_calculator_clicked', {
    calculator_name: fromCalculator,
    label: toCalculator,
    action: 'navigate_related'
  });
}

// Cuando un usuario ve un post del blog
export function trackBlogPostViewed(postSlug: string, postCategory?: string) {
  trackEvent('blog_post_viewed', {
    label: postSlug,
    category: postCategory,
    action: 'view_post'
  });
}

// Cuando un usuario filtra por categoría en el blog
export function trackBlogCategoryFiltered(category: string) {
  trackEvent('blog_category_filtered', {
    category: category,
    action: 'filter'
  });
}

// Cuando un usuario hace clic en un CTA
export function trackCTAClicked(ctaName: string, location: string) {
  trackEvent('cta_clicked', {
    label: ctaName,
    action: 'click',
    category: location
  });
}

// Cuando ocurre un error
export function trackError(errorType: string, errorMessage: string, location?: string) {
  trackEvent('error_occurred', {
    label: errorType,
    action: errorMessage,
    category: location
  });
}

// Helper para determinar el tipo de calculadora
function getCalculatorType(calculatorName: string): string {
  const nutritionCalcs = ['home', 'tdee', 'bmr', 'proteina', 'agua', 'fibra', 'azucar'];
  const bodyCompCalcs = ['imc', 'grasa-corporal', 'composicion', 'peso-ideal', 'masa-muscular'];
  const fitnessCalcs = ['1rm', 'ritmo-cardiaco', 'vo2max'];
  const healthCalcs = ['presion-arterial-media', 'recuperacion-cardiaca', 'densidad-osea', 'egfr'];

  if (nutritionCalcs.includes(calculatorName)) return 'nutrition';
  if (bodyCompCalcs.includes(calculatorName)) return 'body-composition';
  if (fitnessCalcs.includes(calculatorName)) return 'fitness';
  if (healthCalcs.includes(calculatorName)) return 'health';
  return 'other';
}
