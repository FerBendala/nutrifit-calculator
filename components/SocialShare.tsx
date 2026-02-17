'use client';

import { trackResultShared } from '@/lib/analytics';
import { useEffect, useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
  calculatorName?: string;
}

export function SocialShare({ title, url, description, calculatorName = 'general' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shareData = {
    title,
    text: description || title,
    url,
  };

  const handleNativeShare = async () => {
    if (isClient && navigator.share) {
      try {
        await navigator.share(shareData);
        trackResultShared(calculatorName, 'native');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleCopyLink = async () => {
    if (!isClient) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackResultShared(calculatorName, 'copy_link');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Error copying to clipboard:', err);
    }
  };

  const handleSocialClick = (platform: string) => {
    trackResultShared(calculatorName, platform);
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  return (
    <div className="flex flex-col space-y-3 p-4 bg-muted rounded-lg">
      <h4 className="font-medium text-sm">
        📢 Comparte esta calculadora
      </h4>

      <div className="flex flex-wrap gap-2">
        {/* Native Share (mobile) */}
        {isClient && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="px-3 py-2 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            aria-label="Compartir"
          >
            📱 Compartir
          </button>
        )}

        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-3 py-2 text-xs bg-[#1DA1F2] dark:bg-[#1a8cd8] text-white rounded-md hover:bg-[#1a8cd8] dark:hover:bg-[#1573b5] transition-colors"
          aria-label="Compartir en Twitter"
          onClick={() => handleSocialClick('twitter')}
        >
          🐦 Twitter
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-3 py-2 text-xs bg-[#1877F2] dark:bg-[#1666d9] text-white rounded-md hover:bg-[#1666d9] dark:hover:bg-[#1455c0] transition-colors"
          aria-label="Compartir en Facebook"
          onClick={() => handleSocialClick('facebook')}
        >
          📘 Facebook
        </a>

        {/* WhatsApp */}
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-3 py-2 text-xs bg-[#25D366] dark:bg-[#20bd5a] text-white rounded-md hover:bg-[#20bd5a] dark:hover:bg-[#1ca74e] transition-colors"
          aria-label="Compartir en WhatsApp"
          onClick={() => handleSocialClick('whatsapp')}
        >
          💬 WhatsApp
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="px-3 py-2 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          aria-label="Copiar enlace"
        >
          {copied ? '✅ Copiado' : '🔗 Copiar'}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        ¡Ayuda a otros a calcular sus macros de forma gratuita!
      </p>
    </div>
  );
}
