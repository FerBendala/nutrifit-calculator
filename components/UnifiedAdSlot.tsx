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
          console.warn('AdSlot: Script cargado, ejecutando push para slot:', adSlot);
          console.warn('AdSlot: adSenseId:', adSenseId);
          console.warn('AdSlot: adSlot:', adSlot);

          // Ejecutar exactamente como el código oficial
          (window.adsbygoogle = window.adsbygoogle || []).push({});

          // Verificar el estado después de un momento
          setTimeout(() => {
            const insElement = adRef.current;
            if (insElement) {
              const status = insElement.getAttribute('data-ad-status');
              console.warn('AdSlot: Estado del anuncio:', status);
              if (status === 'unfilled') {
                console.warn('AdSlot: Anuncio no llenado - posible problema de configuración');
              }
            }
          }, 2000);
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
        data-adsbygoogle-status="unfilled"
        data-adtest="on"
      />
    </div>
  );
}
