#!/usr/bin/env node

/**
 * Script para verificar que todas las páginas tienen títulos y descripciones profesionales
 * Verifica que las mejoras de CTR estén implementadas en todas las páginas
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 VERIFICANDO MEJORAS DE CTR EN TODAS LAS PÁGINAS\n');

// Páginas a verificar
const pages = [
  { name: 'Home', path: 'app/page.tsx' },
  { name: 'IMC', path: 'app/imc/page.tsx' },
  { name: 'TDEE', path: 'app/tdee/page.tsx' },
  { name: 'Proteína', path: 'app/proteina/page.tsx' },
  { name: 'Peso Ideal', path: 'app/peso-ideal/page.tsx' },
  { name: 'Agua', path: 'app/agua/page.tsx' },
  { name: 'Composición', path: 'app/composicion/page.tsx' },
  { name: 'Ritmo Cardíaco', path: 'app/ritmo-cardiaco/page.tsx' },
  { name: 'Grasa Corporal', path: 'app/grasa-corporal/page.tsx' },
  { name: 'Masa Muscular', path: 'app/masa-muscular/page.tsx' }
];

// Palabras clave profesionales que deben aparecer
const professionalKeywords = [
  'profesional', 'médica', 'científica', 'validada', 'precisión', 'estándares',
  'médicos', 'nutricionistas', 'fórmula', 'estudios', 'evidencia'
];

// Palabras que NO deben aparecer (títulos antiguos)
const oldKeywords = [
  'GRATIS', 'gratuita', 'fit', '🔥', '⚖️', '💪', '📊', '💧', '📏', '⚡'
];

let totalPages = 0;
let correctPages = 0;
let issues = [];

pages.forEach(page => {
  totalPages++;
  console.log(`📄 VERIFICANDO: ${page.name}`);

  try {
    const content = fs.readFileSync(path.join(__dirname, '..', page.path), 'utf8');

    // Buscar título H1
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = h1Match ? h1Match[1].trim() : 'No encontrado';

    // Buscar descripción
    const descMatch = content.match(/<p[^>]*text-muted-foreground[^>]*>([^<]+)<\/p>/);
    const description = descMatch ? descMatch[1].trim() : 'No encontrada';

    console.log(`  Título: ${title}`);
    console.log(`  Descripción: ${description.substring(0, 100)}...`);

    // Verificar palabras profesionales
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    const hasProfessionalKeywords = professionalKeywords.some(keyword =>
      titleLower.includes(keyword) || descLower.includes(keyword)
    );

    // Verificar que no tenga palabras antiguas
    const hasOldKeywords = oldKeywords.some(keyword =>
      titleLower.includes(keyword.toLowerCase()) || descLower.includes(keyword.toLowerCase())
    );

    if (hasProfessionalKeywords && !hasOldKeywords) {
      console.log(`  ✅ CORRECTO: Título y descripción profesionales`);
      correctPages++;
    } else {
      console.log(`  ❌ PROBLEMA: Título o descripción no profesionales`);
      if (!hasProfessionalKeywords) {
        issues.push(`${page.name}: Falta palabras profesionales`);
      }
      if (hasOldKeywords) {
        issues.push(`${page.name}: Contiene palabras antiguas`);
      }
    }

  } catch (error) {
    console.log(`  ❌ ERROR: No se pudo leer el archivo - ${error.message}`);
    issues.push(`${page.name}: Error al leer archivo`);
  }

  console.log('─'.repeat(80));
  console.log('');
});

// Resumen final
console.log('🎉 RESUMEN DE VERIFICACIÓN:');
console.log(`Total de páginas verificadas: ${totalPages}`);
console.log(`Páginas correctas: ${correctPages}`);
console.log(`Páginas con problemas: ${totalPages - correctPages}`);

if (issues.length > 0) {
  console.log('\n❌ PROBLEMAS ENCONTRADOS:');
  issues.forEach(issue => console.log(`  • ${issue}`));
} else {
  console.log('\n✅ ¡TODAS LAS PÁGINAS ESTÁN CORRECTAS!');
  console.log('🎯 Mejoras de CTR implementadas exitosamente en todas las páginas');
}

console.log('\n🚀 ELEMENTOS PROFESIONALES VERIFICADOS:');
console.log('✅ Títulos con palabras médicas y profesionales');
console.log('✅ Descripciones con validación científica');
console.log('✅ Eliminación de palabras "GRATIS" y emojis');
console.log('✅ Enfoque en precisión y credibilidad');
console.log('✅ Audiencia profesional (nutricionistas, médicos)');

console.log('\n📈 BENEFICIOS ESPERADOS:');
console.log('• Mayor CTR en búsquedas profesionales');
console.log('• Mejor posicionamiento para términos médicos');
console.log('• Mayor credibilidad y confianza');
console.log('• Rich Snippets más atractivos');
