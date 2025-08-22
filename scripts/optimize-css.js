#!/usr/bin/env node

/**
 * Script post-build para convertir CSS bloqueante a preload en HTML estático
 * Soluciona el problema de Lighthouse "Eliminate render-blocking resources"
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🚀 [CSS Optimizer] Iniciando optimización de CSS en HTML estático...');

// Función para procesar un archivo HTML
function optimizeHTMLFile(filePath) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Buscar y reemplazar CSS bloqueante con preload
    html = html.replace(
      /<link\s+([^>]*?)rel="stylesheet"([^>]*?)href="([^"]*?_next\/static\/css\/[^"]*?)"([^>]*?)>/gi,
      (match, before, middle, href, after) => {
        console.log(`📝 [CSS Optimizer] Convirtiendo CSS a preload: ${href}`);
        modified = true;
        
        // Crear preload + noscript fallback
        const preload = `<link ${before}rel="preload" as="style"${middle}href="${href}"${after} onload="this.onload=null;this.rel='stylesheet'">`;
        const noscript = `<noscript><link ${before}rel="stylesheet"${middle}href="${href}"${after}></noscript>`;
        
        return preload + noscript;
      }
    );
    
    if (modified) {
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`✅ [CSS Optimizer] Optimizado: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ [CSS Optimizer] Error procesando ${filePath}:`, error.message);
    return false;
  }
}

// Buscar todos los archivos HTML en out/
const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(outDir)) {
  console.log('❌ [CSS Optimizer] Directorio out/ no encontrado. Ejecutar npm run build primero.');
  process.exit(1);
}

// Usar glob para encontrar todos los archivos HTML
const htmlFiles = glob.sync('**/*.html', { cwd: outDir });

if (htmlFiles.length === 0) {
  console.log('❌ [CSS Optimizer] No se encontraron archivos HTML en out/');
  process.exit(1);
}

console.log(`📁 [CSS Optimizer] Encontrados ${htmlFiles.length} archivos HTML`);

let optimizedCount = 0;
htmlFiles.forEach(file => {
  const fullPath = path.join(outDir, file);
  if (optimizeHTMLFile(fullPath)) {
    optimizedCount++;
  }
});

console.log(`🎉 [CSS Optimizer] Completado: ${optimizedCount}/${htmlFiles.length} archivos optimizados`);

if (optimizedCount > 0) {
  console.log('✨ [CSS Optimizer] CSS bloqueante convertido a preload pattern');
  console.log('🚀 [CSS Optimizer] Lighthouse debería mostrar mejoras en "Eliminate render-blocking resources"');
} else {
  console.log('ℹ️  [CSS Optimizer] No se encontró CSS bloqueante para optimizar');
}
