import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SocialShare } from '@/components/SocialShare';
import BMRCalculator from './BMRCalculator';

export default function BMRPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="bmr" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora BMR – Cuántas Calorías Quemas en Reposo
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu metabolismo basal (BMR): las calorías que quemas en reposo absoluto.
              Usa 3 fórmulas científicas para descubrir cuánta energía necesita tu cuerpo para funcionar.
            </p>
          </header>

          <BMRCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu metabolismo basal (BMR)
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El BMR representa las calorías que tu cuerpo necesita en reposo absoluto para mantener
                funciones vitales como respiración, circulación y reparación celular.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🧬</span>
                  ¿Qué es el BMR?
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  El BMR (Basal Metabolic Rate) es la cantidad mínima de energía que tu cuerpo necesita para mantener funciones vitales en reposo completo.
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>60-70%</strong> de tu gasto calórico diario total</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Funciones básicas:</strong> respiración, circulación, reparación celular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Medición:</strong> en ayunas, reposo, 12 horas sin comida</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  Factores que afectan tu BMR
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Masa muscular:</strong> Más músculo = mayor BMR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Edad:</strong> Disminuye 2-3% cada década después de los 30</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Sexo:</strong> Los hombres tienen ~15% más BMR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Genética:</strong> Variación del ±15% entre individuos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Hormonas:</strong> Tiroides, cortisol, testosterona</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Comparación científica de fórmulas BMR
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">🥇</span>
                    Mifflin-St Jeor (1990)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Precisión:</strong> ±10% (la mejor)</li>
                    <li>• <strong>Población:</strong> General</li>
                    <li>• <strong>Validación:</strong> Múltiples estudios</li>
                    <li>• <strong>Uso:</strong> Recomendada por ADA</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🥈</span>
                    Harris-Benedict (1984)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Precisión:</strong> ±15%</li>
                    <li>• <strong>Población:</strong> General</li>
                    <li>• <strong>Validación:</strong> Clásica, ampliamente usada</li>
                    <li>• <strong>Limitación:</strong> Sobrestima en obesos</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🏆</span>
                    Katch-McArdle
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Precisión:</strong> ±5% (atletas)</li>
                    <li>• <strong>Población:</strong> Atletas/conocen % grasa</li>
                    <li>• <strong>Validación:</strong> Basada en masa magra</li>
                    <li>• <strong>Ventaja:</strong> Más precisa con composición corporal</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Aplicaciones prácticas del BMR
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">🎯 Para profesionales de la salud</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Calcular necesidades calóricas basales</li>
                    <li>• Evaluar tasa metabólica en pacientes</li>
                    <li>• Detectar problemas metabólicos</li>
                    <li>• Monitorear efectos de tratamientos</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">🏃 Para atletas y fitness</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Base para calcular <a href="/tdee/" className="text-info hover:underline transition-colors">TDEE total</a></li>
                    <li>• Planificar dietas de corte o volumen</li>
                    <li>• Optimizar <a href="/composicion/" className="text-info hover:underline transition-colors">composición corporal</a></li>
                    <li>• Combinar con entrenamiento de <a href="/1rm/" className="text-info hover:underline transition-colors">fuerza máxima</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y consideraciones importantes
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Son estimaciones:</strong> La <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4535334/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">variación individual</a> puede ser del ±15-20%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Condiciones médicas:</strong> <a href="https://www.thyroid.org/thyroid-function-tests/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Hipotiroidismo</a>, diabetes pueden alterar el BMR</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Medicamentos:</strong> Algunos fármacos afectan el metabolismo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Dietas extremas:</strong> Pueden reducir el BMR hasta un 20%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Consulta profesional:</strong> Para casos específicos, consulta con un nutricionista</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre BMR</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre BMR y TDEE?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El BMR es tu metabolismo en reposo absoluto. El <a href="/tdee/" className="text-info hover:underline transition-colors">TDEE</a> incluye
                    el BMR más las calorías quemadas por actividad física y digestión. El TDEE es lo que necesitas para mantener tu peso.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo aumentar mi BMR naturalmente?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, principalmente aumentando la <a href="/masa-muscular/" className="text-info hover:underline transition-colors">masa muscular</a>.
                    El músculo quema más calorías en reposo que la grasa. El <a href="/1rm/" className="text-info hover:underline transition-colors">entrenamiento de fuerza</a> es clave.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es normal que mi BMR sea diferente al calculado?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, es completamente normal. Las fórmulas son estimaciones poblacionales. Tu BMR real puede variar
                    ±15-20% debido a genética, masa muscular, condiciones médicas y otros factores individuales.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Completa tu evaluación metabólica
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/peso-ajustado/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu Peso Ajustado:</a></strong> ABW para calorías y metabolismo más precisos en obesidad o bajo peso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/rmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu RMR práctico:</a></strong> Tasa metabólica en reposo sin condiciones estrictas de laboratorio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu TDEE completo:</a></strong> Añade actividad física a tu BMR para calorías diarias totales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Planifica tus macros:</a></strong> Distribuye tus calorías en proteínas, grasas y carbohidratos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu composición corporal:</a></strong> Para usar la fórmula Katch-McArdle más precisa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Desarrolla masa muscular:</a></strong> Aumenta tu BMR con entrenamiento de fuerza</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Planifica entrenamientos de fuerza:</a></strong> Optimiza tu entrenamiento para maximizar el metabolismo</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/bmr" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora BMR Médica Profesional - Metabolismo Basal"
              url="https://nutrifit-calculator.com/bmr/"
              description="Calculadora científica de metabolismo basal con 3 fórmulas validadas. Precisión médica para profesionales de la salud. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="bmr" />
          </article>
        </main>
      </Container>
    </>
  );
}
