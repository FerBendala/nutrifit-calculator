import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Dumbbell, Info, Target, Users } from 'lucide-react';
import { FFMICalculator } from './FFMICalculator';

export default function FFMIPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="ffmi" className="container-golden mb-4 pt-4" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora FFMI – Índice de Masa Libre de Grasa
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu FFMI (Índice de Masa Libre de Grasa) para evaluar tu desarrollo muscular independientemente de tu grasa corporal.
              Descubre tu potencial genético y compara tu masa muscular con atletas naturales. Ideal para fisicoculturismo.
            </p>
          </header>

          <FFMICalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el FFMI (Índice de Masa Libre de Grasa)?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El <strong>FFMI (Fat-Free Mass Index)</strong> es una métrica avanzada que evalúa el desarrollo muscular
                  independiente de la grasa corporal. Desarrollado por <a href="https://pubmed.ncbi.nlm.nih.gov/8551617/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Katch & McArdle (1977)</a>,
                  permite comparar el nivel de masa muscular entre personas de diferentes alturas y composiciones corporales. Estudios en <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2804956/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">atletas de élite</a> validan su precisión para evaluar potencial genético muscular.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A diferencia del IMC, el FFMI es especialmente útil para atletas, fisicoculturistas y personas que buscan
                  evaluar su progreso en hipertrofia muscular, ya que elimina el efecto confusional de la grasa corporal.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Dumbbell className="w-5 h-5 mr-2" />
                    Ventajas del FFMI
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Independiente de grasa:</strong> Evalúa solo el desarrollo muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Comparable entre alturas:</strong> Normalizado para diferentes estaturas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Estándar científico:</strong> Usado en investigación y deporte de élite - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">estudios en atletas profesionales</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Objetivo y preciso:</strong> Basado en fórmulas matemáticas validadas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Seguimiento de progreso:</strong> Ideal para monitorear hipertrofia</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Categorías de FFMI por Género
                  </h3>
                </header>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-destructive-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Hombres - Excelente (≥25)</div>
                      <div className="text-sm text-foreground/90">Atleta de élite, desarrollo excepcional</div>
                    </div>
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Hombres - Muy bueno (22-25)</div>
                      <div className="text-sm text-warning">Atleta avanzado, buen desarrollo</div>
                    </div>
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Hombres - Bueno (20-22)</div>
                      <div className="text-sm text-warning">Atleta intermedio, desarrollo decente</div>
                    </div>
                    <div className="p-3 bg-success-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Mujeres - Excelente (≥20)</div>
                      <div className="text-sm text-success">Atleta de élite femenina</div>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Aplicaciones del FFMI
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">En el Deporte</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Evaluación de potencial atlético - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">estudios en atletas élite</a></li>
                      <li>• Seguimiento de progresión en fisicoculturismo</li>
                      <li>• Comparación entre atletas de diferentes categorías</li>
                      <li>• Detección de límites genéticos alcanzados</li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">En la Salud</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Evaluación de sarcopenia y pérdida muscular</li>
                      <li>• Monitoreo de efectividad de programas de ejercicio</li>
                      <li>• Seguimiento de recuperación en lesiones</li>
                      <li>• Evaluación de estado nutricional en pacientes</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación muscular
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu masa muscular total:</a></strong> Obtén la cantidad absoluta de músculo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/fmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu FMI complementario:</a></strong> Índice de masa grasa para análisis completo de composición</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu ingesta proteica:</a></strong> Calcula necesidades basadas en masa libre de grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa composición corporal:</a></strong> Relación músculo-grasa para contexto completo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Mide tu fuerza máxima:</a></strong> Evalúa el rendimiento muscular funcional</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre FFMI</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es el FFMI y para qué sirve?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El FFMI (Índice de Masa Libre de Grasa) mide tu desarrollo muscular independientemente de la grasa.
                    Valores por encima de 25 en hombres son muy difíciles de alcanzar de forma natural, lo que lo hace útil para evaluar potencial genético.
                    Complementa este análisis con tu <a href="/masa-muscular/" className="text-info hover:underline transition-colors">masa muscular total</a> para
                    una visión completa de tu desarrollo.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es un buen FFMI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para hombres: 18-20 es promedio, 20-22 es bueno, 22-25 es excelente/atlético.
                    Para mujeres: 15-17 es promedio, 17-19 es bueno, 19-21 es excelente.
                    Valores por encima de 25 (hombres) o 22 (mujeres) son extremadamente raros naturalmente.
                    Evalúa también tu <a href="/fmi/" className="text-info hover:underline transition-colors">índice de masa grasa (FMI)</a> para
                    un análisis completo de composición corporal.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="ffmi" />

          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          <SocialShare
            title="Calculadora FFMI Médica - Índice Masa Libre de Grasa"
            url="https://nutrifit-calculator.com/ffmi/"
            description="Calcula tu FFMI con fórmulas científicas profesionales. Evalúa desarrollo muscular independiente de grasa corporal y obtén recomendaciones personalizadas para hipertrofia. ¡Totalmente gratis!"
          />

          <CalculatorNavigation currentCalculator="ffmi" />
        </main>
      </Container>
    </>
  );
}
