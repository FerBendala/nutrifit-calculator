import { CalculatorForm } from '@/components/CalculatorForm';
import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SocialShare } from '@/components/SocialShare';
import { generateJsonLd, generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta('home');

export default function HomePage() {
  const jsonLd = generateJsonLd('home');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              Calculadora de Calorías y Macros
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tus calorías diarias y distribución de macros (macronutrientes) personalizada
              según tu objetivo: perder grasa, mantener peso o ganar músculo.
            </p>
          </div>

          {/* Calculator - Contenido crítico primero */}
          <CalculatorForm />

          {/* AdSlot movido después del contenido principal */}
          <ConditionalAdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
            requireInteraction={true}
          />



          {/* Educational Content */}
          <div className="space-golden-lg pt-[2.618rem]">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Cómo funciona nuestra calculadora?
              </h2>

              <div className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
                <div className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🔬</span>
                    Fórmula científica
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Utilizamos la ecuación de <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mifflin-St Jeor</a>, reconocida como una de las más
                    precisas para calcular el metabolismo basal (BMR). Esta fórmula tiene en cuenta
                    tu sexo, edad, altura y peso para determinar las calorías que quemas en reposo.
                  </p>
                </div>

                <div className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">⚡</span>
                    Factor de actividad
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
                    Objetivos personalizados
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
                  Niveles de actividad física
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
                  Objetivos y ajustes calóricos
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
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo recalcular mis macros?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Recalcula cada 4-6 semanas o cuando hayas perdido/ganado 2-3kg de peso.
                    Tu metabolismo se adapta, por lo que es importante ajustar regularmente.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Debo contar las calorías de las verduras?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, aunque sean pocas. Las verduras aportan fibra, vitaminas y minerales esenciales.
                    Cuenta todas las calorías para mayor precisión en tus objetivos.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo usar esta calculadora durante el embarazo?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    No recomendamos usar esta calculadora durante el embarazo o lactancia.
                    Consulta siempre con tu médico para necesidades nutricionales específicas.
                  </p>
                </div>
              </div>
            </div>

            {/* Enlaces contextuales para mejor SEO */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Herramientas complementarias para tu plan nutricional
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tu IMC antes de empezar:</a></strong> Conoce tu estado de peso actual según estándares médicos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Determina tu TDEE con precisión:</a></strong> Base fundamental para calcular tus calorías de mantenimiento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu ingesta de proteína:</a></strong> Cantidad específica según tu peso y objetivo de entrenamiento</span>
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
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="home" />
          </div>
        </div>
      </Container>
    </>
  );
}