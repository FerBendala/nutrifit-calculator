declare global {
  interface Window {
    adsbygoogle?: any[];
    adsenseInitialized?: boolean;
    adsenseSlots?: Set<string>;
  }
}

let adsenseScriptLoaded = false;
let adsenseInitialized = false;
const processedSlots = new Set<string>();

/**
 * Carga el script de AdSense una sola vez
 */
export const loadAdSenseScript = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (adsenseScriptLoaded && window.adsbygoogle) {
      resolve(true);
      return;
    }

    if (adsenseScriptLoaded) {
      const checkInterval = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      adsenseScriptLoaded = true;
      resolve(true);
    };

    script.onerror = () => {
      reject(false);
    };

    document.head.appendChild(script);
    adsenseScriptLoaded = true;
  });
};

/**
 * Inicializa anuncios automáticos una sola vez
 */
export const initializeAutoAds = async () => {
  if (adsenseInitialized) return;

  try {
    await loadAdSenseScript();

    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adsenseInitialized = true;
      window.adsenseInitialized = true;
    }
  } catch {
    // AdSense may be blocked by ad blockers — fail silently
  }
};

/**
 * Procesa un slot específico evitando duplicados
 */
export const processAdSlot = async (elementId: string, retryCount = 0): Promise<void> => {
  const maxRetries = 10;

  if (retryCount > maxRetries) return;
  if (processedSlots.has(elementId)) return;

  try {
    await loadAdSenseScript();

    const element = document.getElementById(elementId);
    if (!element) {
      setTimeout(() => processAdSlot(elementId, retryCount + 1), 500);
      return;
    }

    const adStatus = element.getAttribute('data-adsbygoogle-status');
    if (adStatus && adStatus !== 'unfilled') {
      processedSlots.add(elementId);
      return;
    }

    if (!window.adsbygoogle) {
      setTimeout(() => processAdSlot(elementId, retryCount + 1), 500);
      return;
    }

    (window.adsbygoogle = window.adsbygoogle || []).push({});
    processedSlots.add(elementId);
  } catch {
    // AdSense slot processing failed — fail silently
  }
};

/**
 * Limpia el estado (útil para desarrollo)
 */
export const resetAdSenseState = () => {
  adsenseInitialized = false;
  processedSlots.clear();
  if (typeof window !== 'undefined') {
    window.adsenseInitialized = false;
  }
};

/**
 * Obtiene información del estado actual
 */
export const getAdSenseStatus = () => {
  return {
    scriptLoaded: adsenseScriptLoaded,
    initialized: adsenseInitialized,
    processedSlots: Array.from(processedSlots),
    windowAdsbygoogle: typeof window !== 'undefined' ? !!window.adsbygoogle : false
  };
};
