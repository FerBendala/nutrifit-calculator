import { CalculatorForm } from '@/components/CalculatorForm';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SocialShare } from '@/components/SocialShare';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta('home');

export default function HomePage() {
  return (
    <>
      <SchemaMarkup calculatorKey="home" />

      <Container size="xl" className="py-[4.236rem]">
        {/* Skip link para accesibilidad */}
        <a
          href="#calculator"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Saltar a calculadora
        </a>

        <div className="max-w-5xl mx-auto space-golden-lg">

          <div className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora Profesional de Calorías y Macros
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica profesional con fórmula Mifflin-St Jeor validada científicamente.
              Resultados precisos para nutricionistas, médicos y profesionales de la salud.
            </p>
          </div>

          {/* Calculator - Contenido crítico primero */}
          <CalculatorForm />

          {/* Educational Content */}
          <div className="space-golden-lg pt-[2.618rem]">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué elegir nuestra calculadora médica profesional?
              </h2>

              <div className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
                <div className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🏥</span>
                    Validación médica
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Utilizamos la ecuación de <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mifflin-St Jeor</a>, reconocida por la comunidad médica como la más
                    precisa para calcular el metabolismo basal (BMR). Esta fórmula está validada científicamente
                    y es utilizada por nutricionistas y médicos en consultas profesionales.
                  </p>
                </div>

                <div className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">⚡</span>
                    Factor de actividad y ejercicio
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Multiplicamos tu BMR por un factor que refleja tu nivel de actividad física
                    diaria para obtener tu <a href="/tdee" className="text-blue-600 hover:underline font-medium">TDEE (Total Daily Energy Expenditure)</a>, que representa
                    las calorías totales que quemas al día. Puedes calcularlo por separado en nuestra calculadora especializada.
                  </p>
                </div>

                <div className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Objetivos: perder grasa, mantener peso, ganar músculo
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Ajustamos tus calorías según tu objetivo: déficit del 20% para perder grasa,
                    mantenimiento para peso estable, o surplus del 10% para ganar masa muscular.
                  </p>
                </div>

                <div className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🥗</span>
                    Distribución de macros
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Calculamos la distribución óptima de macros (proteínas, grasas y carbohidratos)
                    basada en las <a href="https://www.who.int/publications/i/item/9789241549028" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">recomendaciones de la OMS</a> y evidencias científicas según tu objetivo específico.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
              <div className="card-golden-lg space-golden-sm">
                <h3 className="text-xl font-semibold mb-[1.618rem] flex items-center">
                  <span className="text-2xl mr-3">🏃‍♂️</span>
                  Niveles de ejercicio para calcular calorías
                </h3>
                <div className="text-sm text-muted-foreground space-golden-xs">
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium">Sedentario (1.2):</span>
                    <span className="text-xs">Trabajo de oficina, poco ejercicio</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium">Ligera (1.375):</span>
                    <span className="text-xs">Ejercicio ligero 1-3 días/semana</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium">Moderada (1.55):</span>
                    <span className="text-xs">Ejercicio moderado 3-5 días/semana</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium">Intensa (1.725):</span>
                    <span className="text-xs">Ejercicio intenso 6-7 días/semana</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem]">
                    <span className="font-medium">Muy intensa (1.9):</span>
                    <span className="text-xs">Ejercicio muy intenso, trabajo físico</span>
                  </div>
                </div>
              </div>

              <div className="card-golden-lg space-golden-sm">
                <h3 className="text-xl font-semibold mb-[1.618rem] flex items-center">
                  <span className="text-2xl mr-3">📈</span>
                  Objetivos de peso: perder grasa, mantener, ganar músculo
                </h3>
                <div className="text-sm text-muted-foreground space-golden-xs">
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium text-red-600">Pérdida de grasa:</span>
                    <span className="text-xs">Déficit 15-25% (0.5-1kg/sem)</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium text-blue-600">Mantenimiento:</span>
                    <span className="text-xs">Consume tu TDEE exacto</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium text-green-600">Ganancia muscular:</span>
                    <span className="text-xs">Surplus 5-15% (0.25-0.5kg/sem)</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem]">
                    <span className="font-medium text-purple-600">Recomposición:</span>
                    <span className="text-xs">Ligero déficit + entrenamiento</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Guía práctica para usar tus macros
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">🥩</span>
                    Proteínas (25-30%)
                  </h4>
                  <p className="text-sm text-green-800 leading-[1.618]">1.6-2.2g por kg de peso corporal según <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios científicos</a>. Calcula tus necesidades específicas con nuestra <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">calculadora de proteína</a>. Prioriza carnes magras, pescado, huevos, lácteos y legumbres.</p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">🥑</span>
                    Grasas (20-35%)
                  </h4>
                  <p className="text-sm text-green-800 leading-[1.618]">0.8-1.2g por kg de peso. Incluye aceite de oliva, frutos secos, aguacate y pescado graso.</p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">🍚</span>
                    Carbohidratos (45-65%)
                  </h4>
                  <p className="text-sm text-green-800 leading-[1.618]">Completa el resto de calorías. Prioriza cereales integrales, frutas y verduras.</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔧</span>
                ¿Te estancaste? Cómo ajustar tus calorías
              </h3>
              <div className="text-sm text-green-800 space-golden-sm">
                <div className="card-golden bg-white/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Si no pierdes peso después de 2-3 semanas:
                  </h4>
                  <p className="leading-[1.618]">
                    Reduce 100-150 kcal/día de tu objetivo actual. Prioriza quitar carbohidratos o grasas,
                    mantén las proteínas estables.
                  </p>
                </div>
                <div className="card-golden bg-white/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Si no ganas peso/músculo:
                  </h4>
                  <p className="leading-[1.618]">
                    Aumenta 100-200 kcal/día. Añade carbohidratos alrededor del entrenamiento
                    y asegúrate de consumir suficiente proteína (1.6-2.2g/kg).
                  </p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-orange-700 flex items-center">
                    <span className="text-lg mr-2">🚨</span>
                    Señales de que necesitas ajustar:
                  </h4>
                  <ul className="space-golden-xs leading-[1.618]">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Peso estable por más de 2 semanas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Pérdida de energía constante</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Hambre extrema o saciedad excesiva</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Cambios en el rendimiento deportivo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Consideraciones importantes de la calculadora
              </h3>
              <ul className="text-sm text-yellow-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Los resultados son estimaciones basadas en fórmulas poblacionales validadas por <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4535334/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios científicos</a></span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>La precisión puede variar según la composición corporal individual - considera usar nuestra <a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">calculadora de IMC</a> como referencia adicional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Para objetivos específicos, consulta con un nutricionista profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Ajusta gradualmente las calorías y monitorea tus resultados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Mantén una <a href="/agua" className="text-blue-600 hover:underline font-medium transition-golden">hidratación adecuada</a> durante tu proceso de cambio corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Esta herramienta no sustituye el consejo médico personalizado</span>
                </li>
              </ul>
            </div>

            <div className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes para profesionales de la salud</h3>
              <div className="space-golden-sm">
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuántas calorías debo consumir para ganar masa muscular?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para ganar masa muscular, necesitas un surplus calórico del 10-15% sobre tu TDEE.
                    Nuestra calculadora fit te ayuda a determinar exactamente cuántas calorías consumir según tu peso y ejercicio.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo calcular calorías por macro correctamente?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Las calorías por macro son: Proteínas (4 kcal/g), Carbohidratos (4 kcal/g), Grasas (9 kcal/g).
                    Nuestra calculadora fit distribuye automáticamente tus macros según tu objetivo específico.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo recalcular mis macros?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Recalcula cada 4-6 semanas o cuando hayas perdido/ganado 2-3kg de peso.
                    Tu metabolismo se adapta, por lo que es importante ajustar regularmente.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es mejor usar calculadora fit o consultar nutricionista?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Nuestra calculadora fit es perfecta para objetivos generales de fitness. Para condiciones médicas específicas,
                    embarazo, o problemas de salud, consulta siempre con un profesional de la nutrición.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección específica para búsquedas populares */}
            <div className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Herramientas Médicas Más Utilizadas
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    Calculadora Médica de Calorías para Ganancia Muscular
                  </h4>
                  <p className="text-sm text-blue-800 leading-[1.618] mb-[0.618rem]">
                    Calculadora profesional para nutricionistas y médicos deportivos. Surplus calórico controlado basado en evidencia científica para ganancia muscular saludable.
                  </p>
                  <a href="/" className="text-blue-600 hover:underline font-medium text-sm">Calculadora médica de calorías →</a>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    Calculadora Médica de Macronutrientes
                  </h4>
                  <p className="text-sm text-blue-800 leading-[1.618] mb-[0.618rem]">
                    Distribución profesional de macronutrientes basada en estándares médicos. Utilizada por nutricionistas para planes alimentarios precisos.
                  </p>
                  <a href="/" className="text-blue-600 hover:underline font-medium text-sm">Calculadora médica de macros →</a>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    Calculadora Médica de Masa Muscular
                  </h4>
                  <p className="text-sm text-blue-800 leading-[1.618] mb-[0.618rem]">
                    Calculadora profesional con fórmula Lee validada científicamente. Utilizada por médicos deportivos para evaluación de composición corporal.
                  </p>
                  <a href="/masa-muscular" className="text-blue-600 hover:underline font-medium text-sm">Calculadora médica de masa muscular →</a>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    Calculadora Médica de Grasa Corporal
                  </h4>
                  <p className="text-sm text-blue-800 leading-[1.618] mb-[0.618rem]">
                    Métodos Jackson-Pollock y Durnin-Womersley validados científicamente. Precisión de ±3-5% utilizada por profesionales de la salud.
                  </p>
                  <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium text-sm">Calculadora médica de grasa corporal →</a>
                </div>
              </div>
            </div>

            {/* Enlaces contextuales para mejor SEO */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Herramientas médicas complementarias para profesionales
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora médica de IMC:</a></strong> Estándares oficiales de la OMS para evaluación de peso corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora médica de TDEE:</a></strong> Fórmula Mifflin-St Jeor validada para gasto calórico preciso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora médica de proteína:</a></strong> Necesidades basadas en evidencia científica para profesionales</span>
                </li>
              </ul>
            </div>

            {/* Calculadoras relacionadas mejoradas */}
            <RelatedCalculators currentPage="/" />

            {/* Widget para embeber - genera backlinks naturales */}
            <div className="flex justify-center">
              <EmbedWidget />
            </div>

            {/* Social Share */}
            <SocialShare
              title="Calculadora Médica Profesional de Calorías y Macronutrientes"
              url="https://nutrifit-calculator.com"
              description="Calculadora médica profesional con fórmula Mifflin-St Jeor validada científicamente. Utilizada por nutricionistas y médicos. 100% Gratuita."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="home" />
          </div>
        </div>
      </Container>
    </>
  );
}