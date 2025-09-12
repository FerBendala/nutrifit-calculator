"use client";

import { useEffect, useRef } from 'react';

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
}

export function AdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = ""
}: UnifiedAdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Cargar AdSense de forma simple
  useEffect(() => {
    if (!adSenseId || !adRef.current) return;

    const loadAd = () => {
      try {
        const hasConsent = localStorage.getItem('ads-consent') === 'true';
        
        if (hasConsent && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else if (!hasConsent) {
          // Si no hay consentimiento, intentar cargar de todas formas
          setTimeout(() => {
            if (window.adsbygoogle) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
          }, 1000);
        } else {
          // Si no está cargado, reintentar
          setTimeout(loadAd, 1000);
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    };

    // Cargar después de un pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(loadAd, 100);

    return () => clearTimeout(timer);
  }, [adSenseId, adSlot]);

  // No renderizar si no hay ID de AdSense configurado
  if (!adSenseId) {
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
