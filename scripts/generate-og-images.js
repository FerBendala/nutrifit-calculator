/**
 * Genera imágenes OG únicas para cada calculadora.
 * Ejecutar: node scripts/generate-og-images.js
 *
 * Crea SVGs 1200x630 con título/descripción por calculadora.
 * Si sharp está instalado, convierte a PNG.
 */

const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

const CALCULATORS = [
  { key: 'home', title: 'Calorías y Macros', subtitle: 'Calcula tus calorías y macros diarios', icon: '🔥' },
  { key: 'imc', title: 'Calculadora IMC', subtitle: 'Índice de Masa Corporal según la OMS', icon: '⚖️' },
  { key: 'tdee', title: 'Calculadora TDEE', subtitle: 'Gasto Energético Total Diario', icon: '⚡' },
  { key: 'bmr', title: 'Metabolismo Basal', subtitle: 'Calorías que quemas en reposo', icon: '🔥' },
  { key: 'rmr', title: 'Tasa Metabólica en Reposo', subtitle: 'RMR con 3 fórmulas científicas', icon: '🔥' },
  { key: 'proteina', title: 'Proteína Diaria', subtitle: 'Gramos exactos según tu objetivo', icon: '💪' },
  { key: 'agua', title: 'Hidratación Diaria', subtitle: 'Litros de agua que necesitas', icon: '💧' },
  { key: 'composicion', title: 'Composición Corporal', subtitle: 'Grasa, músculo y más', icon: '📊' },
  { key: 'grasa-corporal', title: 'Grasa Corporal', subtitle: 'Tu % exacto con pliegues cutáneos', icon: '📏' },
  { key: 'peso-ideal', title: 'Peso Ideal', subtitle: 'Tu rango saludable con 5 fórmulas', icon: '⚖️' },
  { key: 'masa-muscular', title: 'Masa Muscular', subtitle: 'Kilos de músculo que tienes', icon: '💪' },
  { key: 'masa-magra', title: 'Masa Magra (LBM)', subtitle: 'Todo tu peso sin grasa', icon: '🏋️' },
  { key: 'ritmo-cardiaco', title: 'Frecuencia Cardíaca', subtitle: 'Zonas de entrenamiento', icon: '❤️' },
  { key: '1rm', title: '1RM Fuerza Máxima', subtitle: 'Tu repetición máxima', icon: '🏆' },
  { key: 'vo2max', title: 'VO2 Max', subtitle: 'Capacidad cardiovascular', icon: '🫁' },
  { key: 'whtr', title: 'WHtR Cintura-Altura', subtitle: 'Riesgo cardiometabólico', icon: '📐' },
  { key: 'whr', title: 'WHR Cintura-Cadera', subtitle: 'Distribución de grasa corporal', icon: '📐' },
  { key: 'ffmi', title: 'FFMI', subtitle: 'Índice de Masa Libre de Grasa', icon: '💪' },
  { key: 'fmi', title: 'FMI', subtitle: 'Índice de Masa Grasa', icon: '📊' },
  { key: 'bai', title: 'BAI', subtitle: 'Grasa corporal sin báscula', icon: '📏' },
  { key: 'absi', title: 'ABSI', subtitle: 'Forma corporal y mortalidad', icon: '⚠️' },
  { key: 'bri', title: 'BRI', subtitle: 'Índice de redondez corporal', icon: '⭕' },
  { key: 'ci', title: 'CI Conicidad', subtitle: 'Distribución de grasa abdominal', icon: '📐' },
  { key: 'bsa', title: 'BSA Superficie Corporal', subtitle: '5 fórmulas médicas', icon: '🩺' },
  { key: 'grasa-visceral', title: 'Grasa Visceral', subtitle: 'Riesgo metabólico interno', icon: '🫀' },
  { key: 'edad-metabolica', title: 'Edad Metabólica', subtitle: '¿Tu metabolismo es joven o viejo?', icon: '🕐' },
  { key: 'presion-arterial-media', title: 'Presión Arterial Media', subtitle: 'Evaluación cardiovascular MAP', icon: '🩺' },
  { key: 'recuperacion-cardiaca', title: 'Recuperación Cardíaca', subtitle: 'Condición cardiovascular HRR', icon: '❤️‍🩹' },
  { key: 'densidad-osea', title: 'Densidad Ósea', subtitle: 'T-Score y osteoporosis', icon: '🦴' },
  { key: 'egfr', title: 'Filtrado Glomerular', subtitle: 'Función renal eGFR', icon: '🩺' },
  { key: 'sarcopenia', title: 'Sarcopenia', subtitle: 'Pérdida muscular por edad', icon: '👴' },
  { key: 'peso-ajustado', title: 'Peso Ajustado (ABW)', subtitle: 'Para cálculos nutricionales', icon: '⚖️' },
  { key: 'fibra', title: 'Fibra Diaria', subtitle: 'Cuánta fibra necesitas', icon: '🌿' },
  { key: 'azucar', title: 'Azúcar Diaria', subtitle: 'Tu límite según la OMS', icon: '🍬' },
  { key: 'sodio', title: 'Sodio y Sal', subtitle: 'Límite diario recomendado', icon: '🧂' },
  { key: 'alcohol', title: 'Alcohol', subtitle: 'Unidades y calorías', icon: '🍷' },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateSVG(calc) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="url(#accent)"/>
  <text x="600" y="200" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="72" fill="#f8fafc">${calc.icon}</text>
  <text x="600" y="300" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="700" fill="#f8fafc">${escapeXml(calc.title)}</text>
  <text x="600" y="360" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#94a3b8">${escapeXml(calc.subtitle)}</text>
  <rect x="400" y="430" width="400" height="50" rx="25" fill="url(#accent)"/>
  <text x="600" y="462" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#ffffff">NutriFit Calculator</text>
  <text x="600" y="560" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#475569">nutrifit-calculator.com</text>
</svg>`;
}

const outDir = path.join(__dirname, '..', 'public', 'images', 'og');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generate() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    sharp = null;
  }

  for (const calc of CALCULATORS) {
    const svg = generateSVG(calc);
    const filename = `og-${calc.key}`;

    if (sharp) {
      await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, `${filename}.png`));
      console.log(`  PNG: public/images/og/${filename}.png`);
    } else {
      fs.writeFileSync(path.join(outDir, `${filename}.svg`), svg);
      console.log(`  SVG: public/images/og/${filename}.svg`);
    }
  }

  const ext = sharp ? 'png' : 'svg';
  console.log(`\nGenerated ${CALCULATORS.length} OG images (${ext} format)`);
  if (!sharp) {
    console.log('Install sharp for PNG output: npm install --save-dev sharp');
  }
}

generate().catch(console.error);
