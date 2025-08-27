"use client";

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface SimpleAdSlotProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function SimpleAdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = ""
}: SimpleAdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!adSenseId || !adRef.current) return;

    // Verificar consentimiento de cookies simplificado
    const hasConsent = localStorage.getItem('ads-consent') === 'true';

    if (hasConsent) {
      try {
        // Inicializar AdSense sin validaciones complejas
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adSenseId, adSlot]);

  // No renderizar si no hay ID de AdSense configurado
  if (!adSenseId) {
    return null; // En producción no mostrar placeholder
  }

  return (
    <div className={`adsense-container ${className}`} style={{ minHeight: style?.height || '90px' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={adSenseId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
