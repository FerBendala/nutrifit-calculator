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

  // Cargar AdSense exactamente como el código oficial
  useEffect(() => {
    if (!adSenseId || !adRef.current) return;

    const loadAd = () => {
      try {
        // Verificar si el script de AdSense está cargado
        if (window.adsbygoogle) {
          console.warn('AdSlot: Ejecutando adsbygoogle.push({}) para slot:', adSlot);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          console.warn('AdSlot: Script de AdSense no cargado, reintentando...');
          // Reintentar cada 500ms hasta que esté cargado
          setTimeout(loadAd, 500);
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    };

    // Esperar un poco para que el script se cargue
    const timer = setTimeout(loadAd, 1000);

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
