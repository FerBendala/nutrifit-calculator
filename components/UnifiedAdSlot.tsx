"use client";

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface UnifiedAdSlotProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Requerir contenido mínimo antes de mostrar el anuncio */
  requireMinContent?: boolean;
  /** Palabras mínimas requeridas en la página (por defecto 100) */
  minWords?: number;
  /** Solo mostrar después de que el usuario haya interactuado */
  requireInteraction?: boolean;
  /** Elemento que debe existir para mostrar el anuncio */
  requireElement?: string;
  /** Lazy loading - cargar solo cuando sea visible */
  lazyLoad?: boolean;
}

export function AdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = "",
  requireMinContent = true,
  minWords = 100,
  requireInteraction = false,
  requireElement,
  lazyLoad = true
}: UnifiedAdSlotProps) {
  console.warn('AdSlot: Componente renderizado con slot:', adSlot);

  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMinContent, setHasMinContent] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Verificar condiciones de visualización
  useEffect(() => {
    if (!requireInteraction && !requireElement) {
      setShouldShow(true);
      return;
    }

    const checkConditions = () => {
      let canShow = true;

      // Verificar si se requiere interacción del usuario
      if (requireInteraction) {
        const hasResults = document.querySelector('[class*="result"], [class*="calculation"], .text-primary') !== null;
        const hasFilledForms = Array.from(document.querySelectorAll('input, select, textarea')).some(
          (element: any) => element.value && element.value.trim() !== ''
        );
        canShow = canShow && (hasResults || hasFilledForms);
      }

      // Verificar si se requiere un elemento específico
      if (requireElement) {
        const elementExists = document.querySelector(requireElement) !== null;
        canShow = canShow && elementExists;
      }

      setShouldShow(prev => prev !== canShow ? canShow : prev);
    };

    // Verificar inmediatamente
    checkConditions();

    // Solo verificar periódicamente si realmente necesitamos interacción
    let interval: NodeJS.Timeout | null = null;
    if (requireInteraction) {
      interval = setInterval(checkConditions, 3000); // Reducido a 3 segundos
    }

    const handleFormSubmit = () => {
      setTimeout(checkConditions, 500);
    };

    document.addEventListener('submit', handleFormSubmit);

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, [requireInteraction, requireElement]);

  // Validar contenido mínimo en la página
  useEffect(() => {
    if (!requireMinContent) {
      setHasMinContent(true);
      return;
    }

    const checkContent = () => {
      const textContent = document.body.innerText || '';
      const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
      const hasInteractiveContent =
        document.querySelectorAll('form, button, input, select, textarea').length > 0;
      const hasErrorIndicators =
        document.querySelector('[class*="error"], [class*="404"], [class*="loading"]') !== null;

      const newHasMinContent = wordCount >= minWords && hasInteractiveContent && !hasErrorIndicators;
      setHasMinContent(prev => prev !== newHasMinContent ? newHasMinContent : prev);
    };

    checkContent();
    const timer = setTimeout(checkContent, 2000);

    return () => clearTimeout(timer);
  }, [requireMinContent, minWords]);

  // Lazy loading con Intersection Observer
  useEffect(() => {
    if (!adRef.current || !hasMinContent || !shouldShow || !lazyLoad) {
      if (!lazyLoad && hasMinContent && shouldShow) {
        setIsVisible(true);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [hasMinContent, shouldShow, lazyLoad]);

  // Log de depuración siempre visible
  console.warn('AdSlot: Estado actual:', {
    adSenseId: !!adSenseId,
    adRef: !!adRef.current,
    isVisible,
    hasMinContent,
    shouldShow,
    adSlot,
    lazyLoad
  });

  // Cargar AdSense - versión simplificada
  useEffect(() => {
    if (!adSenseId || !adRef.current) {
      console.warn('AdSlot: No se puede cargar - falta adSenseId o adRef');
      return;
    }

    const loadAd = () => {
      try {
        const hasConsent = localStorage.getItem('ads-consent') === 'true';
        console.warn('AdSlot: Verificando consentimiento:', hasConsent);
        console.warn('AdSlot: adsbygoogle disponible:', !!window.adsbygoogle);

        if (hasConsent && window.adsbygoogle) {
          console.warn('AdSlot: Inicializando anuncio para slot:', adSlot);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else if (!hasConsent) {
          console.warn('AdSlot: Sin consentimiento para publicidad');
        } else {
          console.warn('AdSlot: Script no cargado, reintentando...');
          setTimeout(loadAd, 1000);
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    };

    // Cargar inmediatamente y también después de un delay
    loadAd();
    const timer = setTimeout(loadAd, 2000);

    return () => clearTimeout(timer);
  }, [adSenseId, adSlot]);

  // No renderizar si no hay ID de AdSense configurado
  if (!adSenseId) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 p-8 text-center rounded-lg ${className}`}>
        <p className="text-gray-500 text-sm">
          📢 Espacio publicitario
        </p>
        <p className="text-xs text-gray-400 mt-1">
          AdSense ID no configurado
        </p>
      </div>
    );
  }

  // No mostrar si no cumple con las condiciones (solo en desarrollo)
  if (process.env.NODE_ENV === 'development' && (requireMinContent && !hasMinContent) || !shouldShow) {
    console.warn('AdSlot: Ocultando en desarrollo - condiciones no cumplidas');
    return null;
  }

  return (
    <div style={{ minHeight: style?.height || '90px' }}>
      <ins
        ref={adRef}
        className={`adsbygoogle ${className}`}
        style={style}
        data-ad-client={adSenseId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
