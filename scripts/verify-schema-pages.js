#!/usr/bin/env node

/**
 * Script para verificar que todas las páginas usan el sistema automático de Schema Markup
 * Ejecutar con: node scripts/verify-schema-pages.js
 */

const fs = require('fs');
const path = require('path');

// Lista de páginas de calculadoras que deberían usar Schema Markup
const CALCULATOR_PAGES = [
  'app/page.tsx',
  'app/imc/page.tsx',
  'app/tdee/page.tsx',
  'app/proteina/page.tsx',
  'app/agua/page.tsx',
  'app/composicion/page.tsx',
  'app/ritmo-cardiaco/page.tsx',
  'app/grasa-corporal/page.tsx',
  'app/peso-ideal/page.tsx',
  'app/masa-muscular/page.tsx'
];

// Páginas que NO deberían usar Schema Markup (páginas estáticas)
const STATIC_PAGES = [
  'app/terminos/page.tsx',
  'app/privacidad/page.tsx',
  'app/cookies/page.tsx'
];

function checkPageSchema(pagePath) {
  try {
    const content = fs.readFileSync(pagePath, 'utf8');

    // Verificar que importa SchemaMarkup
    const hasSchemaImport = content.includes("import { SchemaMarkup } from '@/components/SchemaMarkup'");

    // Verificar que usa SchemaMarkup en el return
    const hasSchemaUsage = content.includes('<SchemaMarkup calculatorKey=');

    // Verificar que NO usa el método antiguo
    const hasOldMethod = content.includes('dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}');

    return {
      path: pagePath,
      hasSchemaImport,
      hasSchemaUsage,
      hasOldMethod,
      isCorrect: hasSchemaImport && hasSchemaUsage && !hasOldMethod
    };
  } catch (error) {
    return {
      path: pagePath,
      error: error.message,
      isCorrect: false
    };
  }
}

function main() {
  console.log('🔍 Verificando páginas de calculadoras...\n');

  let totalPages = 0;
  let correctPages = 0;
  let issues = [];

  // Verificar páginas de calculadoras
  console.log('📊 Páginas de Calculadoras:');
  CALCULATOR_PAGES.forEach(pagePath => {
    const result = checkPageSchema(pagePath);
    totalPages++;

    if (result.error) {
      console.log(`❌ ${pagePath}: ERROR - ${result.error}`);
      issues.push(`${pagePath}: ${result.error}`);
    } else if (result.isCorrect) {
      console.log(`✅ ${pagePath}: CORRECTO`);
      correctPages++;
    } else {
      console.log(`⚠️  ${pagePath}: PROBLEMAS`);
      if (!result.hasSchemaImport) {
        console.log(`   - Falta import de SchemaMarkup`);
        issues.push(`${pagePath}: Falta import de SchemaMarkup`);
      }
      if (!result.hasSchemaUsage) {
        console.log(`   - No usa <SchemaMarkup calculatorKey=`);
        issues.push(`${pagePath}: No usa SchemaMarkup`);
      }
      if (result.hasOldMethod) {
        console.log(`   - Aún usa el método antiguo (jsonLd)`);
        issues.push(`${pagePath}: Aún usa método antiguo`);
      }
    }
  });

  console.log('\n📄 Páginas Estáticas (no deberían usar Schema):');
  STATIC_PAGES.forEach(pagePath => {
    const result = checkPageSchema(pagePath);

    if (result.error) {
      console.log(`❌ ${pagePath}: ERROR - ${result.error}`);
    } else if (result.hasSchemaUsage) {
      console.log(`⚠️  ${pagePath}: USA Schema (no debería)`);
      issues.push(`${pagePath}: No debería usar Schema Markup`);
    } else {
      console.log(`✅ ${pagePath}: CORRECTO (sin Schema)`);
    }
  });

  // Resumen
  console.log('\n📈 RESUMEN:');
  console.log(`   Total páginas de calculadoras: ${totalPages}`);
  console.log(`   Páginas correctas: ${correctPages}`);
  console.log(`   Páginas con problemas: ${totalPages - correctPages}`);
  console.log(`   Problemas encontrados: ${issues.length}`);

  if (issues.length > 0) {
    console.log('\n🚨 PROBLEMAS ENCONTRADOS:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }

  if (correctPages === totalPages && issues.length === 0) {
    console.log('\n🎉 ¡TODAS LAS PÁGINAS ESTÁN CORRECTAS!');
    console.log('✅ Sistema automático de Schema Markup funcionando perfectamente');
  } else {
    console.log('\n⚠️  Algunas páginas necesitan corrección');
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { checkPageSchema, CALCULATOR_PAGES, STATIC_PAGES };
