"use client";

import { processAdSlot } from '@/lib/adsense';
import { useEffect, useRef } from 'react';

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

  // Gestión centralizada de AdSense
  useEffect(() => {
    if (!adSenseId || !adRef.current) return;

    // Generar ID único para el slot
    const elementId = `adslot-${adSlot}-${Date.now()}`;
    if (adRef.current) {
      adRef.current.id = elementId;
    }

    const processSlot = () => {
      processAdSlot(elementId).catch((error) => {
        console.error('AdSlot: Error procesando slot:', error);
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(processSlot, { timeout: 500 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(processSlot, 300);
      return () => clearTimeout(timer);
    }
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
      />
    </div>
  );
}
