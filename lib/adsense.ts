// Gestión centralizada de Google AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
    adsenseInitialized?: boolean;
    adsenseSlots?: Set<string>;
  }
}

// Seguimiento de estado
let adsenseScriptLoaded = false;
let adsenseInitialized = false;
const processedSlots = new Set<string>();

/**
 * Carga el script de AdSense una sola vez
 */
export const loadAdSenseScript = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Si ya está cargado, resolver inmediatamente
    if (adsenseScriptLoaded && window.adsbygoogle) {
      resolve(true);
      return;
    }

    // Si ya hay un script cargándose, esperar
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
      console.log('AdSense: Script cargado correctamente');
      resolve(true);
    };

    script.onerror = () => {
      console.error('AdSense: Error cargando script');
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
  if (adsenseInitialized) {
    console.log('AdSense: Anuncios automáticos ya inicializados');
    return;
  }

  try {
    await loadAdSenseScript();

    if (window.adsbygoogle) {
      console.log('AdSense: Inicializando anuncios automáticos');
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adsenseInitialized = true;
      window.adsenseInitialized = true;
    }
  } catch (error) {
    console.error('AdSense: Error inicializando anuncios automáticos:', error);
  }
};

/**
 * Procesa un slot específico evitando duplicados
 */
export const processAdSlot = async (elementId: string, retryCount = 0): Promise<void> => {
  const maxRetries = 10;

  if (retryCount > maxRetries) {
    console.warn(`AdSense: Máximo de reintentos alcanzado para slot ${elementId}`);
    return;
  }

  // Verificar si el slot ya fue procesado
  if (processedSlots.has(elementId)) {
    console.log(`AdSense: Slot ${elementId} ya procesado`);
    return;
  }

  try {
    await loadAdSenseScript();

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`AdSense: Elemento ${elementId} no encontrado, reintentando...`);
      setTimeout(() => processAdSlot(elementId, retryCount + 1), 500);
      return;
    }

    // Verificar si el elemento ya tiene anuncios
    const adStatus = element.getAttribute('data-adsbygoogle-status');
    if (adStatus && adStatus !== 'unfilled') {
      console.log(`AdSense: Slot ${elementId} ya tiene anuncios (status: ${adStatus})`);
      processedSlots.add(elementId);
      return;
    }

    // Verificar si AdSense está disponible
    if (!window.adsbygoogle) {
      console.warn(`AdSense: Script no disponible, reintentando slot ${elementId}...`);
      setTimeout(() => processAdSlot(elementId, retryCount + 1), 500);
      return;
    }

    console.log(`AdSense: Procesando slot ${elementId}`);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    processedSlots.add(elementId);

    // Verificar resultado después de un momento
    setTimeout(() => {
      const finalStatus = element.getAttribute('data-adsbygoogle-status');
      console.log(`AdSense: Slot ${elementId} estado final: ${finalStatus}`);
    }, 2000);

  } catch (error) {
    console.error(`AdSense: Error procesando slot ${elementId}:`, error);
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
  console.log('AdSense: Estado reiniciado');
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
