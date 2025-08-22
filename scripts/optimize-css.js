#!/usr/bin/env node

/**
 * Script post-build para convertir CSS bloqueante a preload en HTML estático
 * Soluciona el problema de Lighthouse "Eliminate render-blocking resources"
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// CSS Optimizer - Convierte CSS bloqueante a preload en HTML estático

// Función para procesar un archivo HTML
function optimizeHTMLFile(filePath) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Buscar y reemplazar CSS bloqueante con preload
    html = html.replace(
      /<link\s+([^>]*?)rel="stylesheet"([^>]*?)href="([^"]*?_next\/static\/css\/[^"]*?)"([^>]*?)>/gi,
      (match, before, middle, href, after) => {
        modified = true;
        
        // Crear preload + noscript fallback
        const preload = `<link ${before}rel="preload" as="style"${middle}href="${href}"${after} onload="this.onload=null;this.rel='stylesheet'">`;
        const noscript = `<noscript><link ${before}rel="stylesheet"${middle}href="${href}"${after}></noscript>`;
        
        return preload + noscript;
      }
    );
    
    if (modified) {
      fs.writeFileSync(filePath, html, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

// Buscar todos los archivos HTML en out/
const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(outDir)) {
  process.exit(1);
}

const htmlFiles = glob.sync('**/*.html', { cwd: outDir });

if (htmlFiles.length === 0) {
  process.exit(1);
}

let optimizedCount = 0;
htmlFiles.forEach(file => {
  const fullPath = path.join(outDir, file);
  if (optimizeHTMLFile(fullPath)) {
    optimizedCount++;
  }
});

// Solo mostrar resultado final
if (optimizedCount > 0) {
  console.log(`✅ CSS optimizado: ${optimizedCount} archivos convertidos a preload pattern`);
}
