import dynamic from 'next/dynamic';
import { CalculatorForm } from '@/components/CalculatorForm';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { generateMetadata as generateMeta } from '@/lib/seo';

// Lazy load componentes no críticos para mejorar performance
const EmbedWidget = dynamic(() => import('@/components/EmbedWidget').then(mod => ({ default: mod.EmbedWidget })), {
  loading: () => <div className="min-h-[280px] animate-pulse bg-muted rounded-lg" />,
});

const RelatedCalculators = dynamic(() => import('@/components/RelatedCalculators').then(mod => ({ default: mod.RelatedCalculators })), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-muted rounded-lg" />,
});

const SocialShare = dynamic(() => import('@/components/SocialShare').then(mod => ({ default: mod.SocialShare })), {
  loading: () => <div className="min-h-[80px] animate-pulse bg-muted rounded-lg" />,
});

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

        <main className="max-w-5xl mx-auto space-golden-lg">
          {/* Hero Section */}
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Calorías y Macros Gratis - Resultados en Segundos
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica profesional con fórmula Mifflin-St Jeor validada científicamente.
              Resultados precisos para nutricionistas, médicos y profesionales de la salud.
            </p>
          </header>

          {/* Calculator - Contenido crítico primero */}
          <section id="calculator" aria-label="Calculadora de calorías y macros">
            <CalculatorForm />
          </section>

          {/* Educational Content */}
          <article className="space-golden-lg pt-[2.618rem]">
            <header className="prose prose-gray max-w-none">
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué elegir nuestra calculadora médica profesional?
              </h2>

              <section className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
                <article className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🏥</span>
                    Validación médica
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Utilizamos la ecuación de <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors">Mifflin-St Jeor</a>, reconocida por la comunidad médica como la más
                    precisa para calcular el metabolismo basal (BMR). Esta fórmula está validada científicamente
                    y es utilizada por nutricionistas y médicos en consultas profesionales.
                  </p>
                </article>

                <article className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">⚡</span>
                    Factor de actividad y ejercicio
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Multiplicamos tu <a href="/bmr/" className="text-info hover:underline font-medium transition-colors">BMR (metabolismo basal)</a> por un factor que refleja tu nivel de actividad física
                    diaria para obtener tu <a href="/tdee/" className="text-info hover:underline font-medium transition-colors">TDEE (Total Daily Energy Expenditure)</a>, que representa
                    las calorías totales que quemas al día. Puedes calcularlo por separado en nuestras calculadoras especializadas.
                  </p>
                </article>

                <article className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Objetivos: perder grasa, mantener peso, ganar músculo
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Ajustamos tus calorías según tu objetivo: déficit del 20% para perder grasa,
                    mantenimiento para peso estable, o surplus del 10% para ganar masa muscular.
                  </p>
                </article>

                <article className="card-golden space-golden-sm">
                  <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                    <span className="text-2xl mr-3">🥗</span>
                    Distribución de macros
                  </h3>
                  <p className="text-muted-foreground leading-[1.618]">
                    Calculamos la distribución óptima de macros (proteínas, grasas y carbohidratos)
                    basada en las <a href="https://www.who.int/publications/i/item/9789241549028" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors">recomendaciones de la OMS</a> y evidencias científicas según tu objetivo específico.
                  </p>
                </article>
              </section>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
              <article className="card-golden-lg space-golden-sm">
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
              </article>

              <article className="card-golden-lg space-golden-sm">
                <h3 className="text-xl font-semibold mb-[1.618rem] flex items-center">
                  <span className="text-2xl mr-3">📈</span>
                  Objetivos de peso: perder grasa, mantener, ganar músculo
                </h3>
                <div className="text-sm text-muted-foreground space-golden-xs">
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium text-destructive">Pérdida de grasa:</span>
                    <span className="text-xs">Déficit 15-25% (0.5-1kg/sem)</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium text-info">Mantenimiento:</span>
                    <span className="text-xs">Consume tu TDEE exacto</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                    <span className="font-medium text-success">Ganancia muscular:</span>
                    <span className="text-xs">Surplus 5-15% (0.25-0.5kg/sem)</span>
                  </div>
                  <div className="flex justify-between items-center py-[0.382rem]">
                    <span className="font-medium text-warning">Recomposición:</span>
                    <span className="text-xs">Ligero déficit + entrenamiento</span>
                  </div>
                </div>
              </article>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Guía práctica para usar tus macros
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">🥩</span>
                    Proteínas (25-30%)
                  </h4>
                  <p className="text-sm text-foreground/90 leading-[1.618]">1.6-2.2g por kg de peso corporal según <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors">estudios científicos</a>. Calcula tus necesidades específicas con nuestra <a href="/proteina/" className="text-info hover:underline font-medium transition-colors">calculadora de proteína</a>. Prioriza carnes magras, pescado, huevos, lácteos y legumbres.</p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">🥑</span>
                    Grasas (20-35%)
                  </h4>
                  <p className="text-sm text-foreground/90 leading-[1.618]">0.8-1.2g por kg de peso. Incluye aceite de oliva, frutos secos, aguacate y pescado graso.</p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">🍚</span>
                    Carbohidratos (45-65%)
                  </h4>
                  <p className="text-sm text-foreground/90 leading-[1.618]">Completa el resto de calorías. Prioriza cereales integrales, frutas y verduras.</p>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔧</span>
                ¿Te estancaste? Cómo ajustar tus calorías
              </h3>
              <div className="text-sm text-foreground/90 space-golden-sm">
                <article className="card-golden bg-card/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Si no pierdes peso después de 2-3 semanas:
                  </h4>
                  <p className="leading-[1.618]">
                    Reduce 100-150 kcal/día de tu objetivo actual. Prioriza quitar carbohidratos o grasas,
                    mantén las proteínas estables.
                  </p>
                </article>
                <article className="card-golden bg-card/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Si no ganas peso/músculo:
                  </h4>
                  <p className="leading-[1.618]">
                    Aumenta 100-200 kcal/día. Añade carbohidratos alrededor del <a href="/1rm/" className="text-info hover:underline transition-colors">entrenamiento de fuerza</a>
                    y asegúrate de consumir suficiente <a href="/proteina/" className="text-info hover:underline transition-colors">proteína</a> (1.6-2.2g/kg).
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🚨</span>
                    Señales de que necesitas ajustar:
                  </h4>
                  <ul className="space-golden-xs leading-[1.618]">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Peso estable por más de 2 semanas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Pérdida de energía constante</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Hambre extrema o saciedad excesiva</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Cambios en el rendimiento deportivo</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Consideraciones importantes de la calculadora
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Los resultados son estimaciones basadas en fórmulas poblacionales validadas por <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4535334/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors">estudios científicos</a></span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>La precisión puede variar según la composición corporal individual - considera usar nuestra <a href="/imc/" className="text-info hover:underline font-medium transition-colors">calculadora de IMC</a> como referencia adicional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Para objetivos específicos, consulta con un nutricionista profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Ajusta gradualmente las calorías y monitorea tus resultados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Mantén una <a href="/agua/" className="text-info hover:underline font-medium transition-colors">hidratación adecuada</a> durante tu proceso de cambio corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Esta herramienta no sustituye el consejo médico personalizado</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes para profesionales de la salud</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuántas calorías debo consumir para ganar masa muscular?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para ganar masa muscular, necesitas un surplus calórico del 10-15% sobre tu TDEE.
                    Nuestra calculadora fit te ayuda a determinar exactamente cuántas calorías consumir según tu peso y ejercicio.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo calcular calorías por macro correctamente?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Las calorías por macro son: Proteínas (4 kcal/g), Carbohidratos (4 kcal/g), Grasas (9 kcal/g).
                    Nuestra calculadora fit distribuye automáticamente tus macros según tu objetivo específico.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo recalcular mis macros?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Recalcula cada 4-6 semanas o cuando hayas perdido/ganado 2-3kg de peso.
                    Tu metabolismo se adapta, por lo que es importante ajustar regularmente.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es mejor usar calculadora fit o consultar nutricionista?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Nuestra calculadora fit es perfecta para objetivos generales de fitness. Para condiciones médicas específicas,
                    embarazo, o problemas de salud, consulta siempre con un profesional de la nutrición.
                  </p>
                </article>
              </div>
            </section>

            {/* Herramientas principales con enlaces a categorías */}
            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Herramientas más utilizadas por profesionales
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info">Calculadora de IMC</h4>
                  <p className="text-sm text-foreground/90 leading-[1.618] mb-[0.618rem]">
                    Estándares oficiales de la OMS para clasificar peso corporal: bajo peso, normal, sobrepeso u obesidad.
                  </p>
                  <a href="/imc/" className="text-info hover:underline font-medium text-sm transition-colors">Calcular IMC →</a>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info">Calculadora TDEE</h4>
                  <p className="text-sm text-foreground/90 leading-[1.618] mb-[0.618rem]">
                    Gasto calórico diario total con fórmula Mifflin-St Jeor. Base para cualquier plan nutricional.
                  </p>
                  <a href="/tdee/" className="text-info hover:underline font-medium text-sm transition-colors">Calcular TDEE →</a>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info">Calculadora de Grasa Corporal</h4>
                  <p className="text-sm text-foreground/90 leading-[1.618] mb-[0.618rem]">
                    Métodos Jackson-Pollock y Durnin-Womersley validados científicamente. Precisión de ±3-5%.
                  </p>
                  <a href="/grasa-corporal/" className="text-info hover:underline font-medium text-sm transition-colors">Calcular grasa corporal →</a>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info">Calculadora de Masa Muscular</h4>
                  <p className="text-sm text-foreground/90 leading-[1.618] mb-[0.618rem]">
                    Fórmula Lee validada científicamente para evaluación de composición corporal en medicina deportiva.
                  </p>
                  <a href="/masa-muscular/" className="text-info hover:underline font-medium text-sm transition-colors">Calcular masa muscular →</a>
                </article>
              </div>
            </section>

            {/* Explorar por categoría */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📂</span>
                Explora todas nuestras calculadoras por categoría
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <a href="/calculadoras/nutricion/" className="card-golden bg-card/50 block hover:shadow-md transition-shadow">
                  <h4 className="font-bold mb-[0.618rem] text-foreground">Nutrición</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Calorías, macros, BMR, TDEE, proteína, fibra, azúcar, sodio y alcohol. Fórmulas validadas para planificación nutricional.
                  </p>
                </a>
                <a href="/calculadoras/composicion-corporal/" className="card-golden bg-card/50 block hover:shadow-md transition-shadow">
                  <h4 className="font-bold mb-[0.618rem] text-foreground">Composición Corporal</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    IMC, grasa corporal, peso ideal, masa magra, FFMI, FMI, BAI, WHR y más. Análisis completo de tu cuerpo.
                  </p>
                </a>
                <a href="/calculadoras/fitness/" className="card-golden bg-card/50 block hover:shadow-md transition-shadow">
                  <h4 className="font-bold mb-[0.618rem] text-foreground">Fitness</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    1RM, VO2 Max, ritmo cardíaco, recuperación cardíaca y masa muscular. Métricas para optimizar tu entrenamiento.
                  </p>
                </a>
                <a href="/calculadoras/salud/" className="card-golden bg-card/50 block hover:shadow-md transition-shadow">
                  <h4 className="font-bold mb-[0.618rem] text-foreground">Salud</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Presión arterial, densidad ósea, eGFR, sarcopenia, ABSI, BRI y grasa visceral. Herramientas clínicas profesionales.
                  </p>
                </a>
              </div>
            </section>

            {/* Calculadoras vistas recientemente */}
            <RecentlyViewed currentPage="home" />

            {/* Calculadoras relacionadas mejoradas */}
            <RelatedCalculators currentPage="/" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora Médica Profesional de Calorías y Macronutrientes"
              url="https://nutrifit-calculator.com"
              description="Calculadora médica profesional con fórmula Mifflin-St Jeor validada científicamente. Utilizada por nutricionistas y médicos. 100% Gratuita."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="home" />
          </article>
        </main>
      </Container>
    </>
  );
}