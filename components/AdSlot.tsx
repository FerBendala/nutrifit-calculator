"use client";

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Requerir contenido mínimo antes de mostrar el anuncio */
  requireMinContent?: boolean;
  /** Palabras mínimas requeridas en la página (por defecto 100) */
  minWords?: number;
}

export function AdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = "",
  requireMinContent = true,
  minWords = 100
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMinContent, setHasMinContent] = useState(false);
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Validar contenido mínimo en la página
  useEffect(() => {
    if (!requireMinContent) {
      setHasMinContent(true);
      return;
    }

    const checkContent = () => {
      const textContent = document.body.innerText || '';
      const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;

      // También verificar que hay elementos interactivos (formularios, botones, etc.)
      const hasInteractiveContent =
        document.querySelectorAll('form, button, input, select, textarea').length > 0;

      // También verificar que no estamos en una página de error o carga
      const hasErrorIndicators =
        document.querySelector('[class*="error"], [class*="404"], [class*="loading"]') !== null;

      setHasMinContent(wordCount >= minWords && hasInteractiveContent && !hasErrorIndicators);
    };

    // Verificar inmediatamente y después de un retraso para contenido dinámico
    checkContent();
    const timer = setTimeout(checkContent, 2000);

    return () => clearTimeout(timer);
  }, [requireMinContent, minWords]);

  // Lazy loading con Intersection Observer
  useEffect(() => {
    if (!adRef.current || !hasMinContent) return;

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
  }, [hasMinContent]);

  // Cargar AdSense solo cuando sea visible y tenga contenido mínimo
  useEffect(() => {
    if (!adSenseId || !adRef.current || !isVisible || !hasMinContent) return;

    // Usar setTimeout para no bloquear el render crítico
    const timer = setTimeout(() => {
      try {
        // Check if consent has been given
        const hasConsent = localStorage.getItem('ads-consent') === 'true';

        if (hasConsent && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adSenseId, adSlot, isVisible, hasMinContent]);

  // Don't render if no AdSense ID is configured
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

  // No mostrar si no cumple con el contenido mínimo
  if (requireMinContent && !hasMinContent) {
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