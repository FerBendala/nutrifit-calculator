"use client";

import { useEffect, useRef } from 'react';

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
}

export function AdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = ""
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!adSenseId || !adRef.current) return;

    try {
      // Check if consent has been given (this would be managed by your consent banner)
      const hasConsent = localStorage.getItem('ads-consent') === 'true';
      
      // TEMPORAL: Para testing, cargar siempre (cambiar después)
      const shouldLoadAd = hasConsent || process.env.NODE_ENV === 'development' || true;

      if (shouldLoadAd) {
        console.log('Loading AdSense ad for slot:', adSlot);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        console.log('AdSense blocked - no consent given');
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSenseId, adSlot]);

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

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={adSenseId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}