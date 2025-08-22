'use client';

import { useEffect, useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Error copying to clipboard:', err);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  return (
    <div className="flex flex-col space-y-3 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-sm text-gray-900">
        📢 Comparte esta calculadora
      </h4>

      <div className="flex flex-wrap gap-2">
        {/* Native Share (mobile) */}
        {isClient && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="px-3 py-2 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
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
          className="px-3 py-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          aria-label="Compartir en Twitter"
        >
          🐦 Twitter
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          aria-label="Compartir en Facebook"
        >
          📘 Facebook
        </a>

        {/* WhatsApp */}
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="px-3 py-2 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          aria-label="Compartir en WhatsApp"
        >
          💬 WhatsApp
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="px-3 py-2 text-xs bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          aria-label="Copiar enlace"
        >
          {copied ? '✅ Copiado' : '🔗 Copiar'}
        </button>
      </div>

      <p className="text-xs text-gray-600">
        ¡Ayuda a otros a calcular sus macros de forma gratuita!
      </p>
    </div>
  );
}
