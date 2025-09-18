/**
 * Script de debugging para Google AdSense
 * Ejecutar en consola del navegador para diagnosticar problemas
 */

(function () {
  console.log('🔍 AdSense Debug Tool iniciado');

  // Información básica
  const info = {
    scriptLoaded: !!window.adsbygoogle,
    adsbygoogleArray: window.adsbygoogle ? window.adsbygoogle.length : 0,
    adsenseInitialized: window.adsenseInitialized || false,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  };

  console.log('📊 Estado general:', info);

  // Analizar elementos de anuncios
  const adElements = document.querySelectorAll('.adsbygoogle');
  console.log(`📍 Elementos .adsbygoogle encontrados: ${adElements.length}`);

  adElements.forEach((element, index) => {
    const status = element.getAttribute('data-adsbygoogle-status');
    const client = element.getAttribute('data-ad-client');
    const slot = element.getAttribute('data-ad-slot');
    const format = element.getAttribute('data-ad-format');
    const id = element.id;

    console.log(`🎯 Anuncio ${index + 1}:`, {
      id,
      status,
      client,
      slot,
      format,
      hasContent: element.innerHTML.length > 0,
      visible: element.offsetHeight > 0,
      styles: window.getComputedStyle(element).display
    });
  });

  // Verificar errores en consola
  const errors = [];
  const originalError = console.error;
  console.error = function (...args) {
    if (args.some(arg => typeof arg === 'string' && arg.includes('adsbygoogle'))) {
      errors.push(args.join(' '));
    }
    originalError.apply(console, args);
  };

  // Verificar localStorage
  const consentData = localStorage.getItem('cookie-consent');
  const adsConsent = localStorage.getItem('ads-consent');

  console.log('🍪 Estado de consentimiento:', {
    cookieConsent: consentData ? JSON.parse(consentData) : 'No configurado',
    adsConsent: adsConsent || 'No configurado'
  });

  // Verificar configuración
  const config = {
    adsenseId: document.querySelector('script[src*="adsbygoogle.js"]')?.src.match(/client=([^&]+)/)?.[1] || 'No encontrado',
    gtmId: document.querySelector('script[src*="googletagmanager.com"]')?.src.match(/id=([^&]+)/)?.[1] || 'No encontrado'
  };

  console.log('⚙️ Configuración:', config);

  // Test de conectividad
  if (navigator.onLine) {
    fetch('https://pagead2.googlesyndication.com/pagead/ping?format=1')
      .then(() => console.log('🌐 Conectividad AdSense: OK'))
      .catch(() => console.log('❌ Conectividad AdSense: ERROR'));
  }

  // Resumen final
  setTimeout(() => {
    console.log('\n📋 RESUMEN DIAGNÓSTICO:');
    console.log('==================');

    if (!window.adsbygoogle) {
      console.log('❌ Script AdSense no cargado');
    } else if (adElements.length === 0) {
      console.log('⚠️ Script cargado pero no hay elementos de anuncios');
    } else {
      const filled = Array.from(adElements).filter(el =>
        el.getAttribute('data-adsbygoogle-status') === 'done'
      ).length;

      console.log(`✅ ${filled}/${adElements.length} anuncios cargados correctamente`);

      if (filled === 0) {
        console.log('💡 Posibles causas:');
        console.log('   - ID de AdSense incorrecto');
        console.log('   - Configuración de slots incorrecta');
        console.log('   - Bloqueador de anuncios activo');
        console.log('   - Problema de consentimiento');
        console.log('   - Inicialización múltiple (error corregido)');
      }
    }

    if (errors.length > 0) {
      console.log('🚨 Errores detectados:', errors);
    }

    console.log('==================');
  }, 3000);

})();

// Función para reset manual en desarrollo
function resetAdSense() {
  if (typeof window !== 'undefined' && window.adsenseInitialized) {
    window.adsenseInitialized = false;
    console.log('♻️ Estado AdSense reiniciado');
  }
}

// Hacer disponible globalmente para debugging
window.debugAdSense = arguments.callee;
window.resetAdSense = resetAdSense;

console.log('💡 Funciones disponibles: debugAdSense(), resetAdSense()');
