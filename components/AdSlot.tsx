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
}

export function AdSlot({
  adSlot,
  adFormat = "auto",
  style = { display: 'block' },
  className = ""
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // Lazy loading con Intersection Observer
  useEffect(() => {
    if (!adRef.current) return;

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
  }, []);

  // Cargar AdSense solo cuando sea visible
  useEffect(() => {
    if (!adSenseId || !adRef.current || !isVisible) return;

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
  }, [adSenseId, adSlot, isVisible]);

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