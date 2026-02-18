import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { AlertTriangle, Info, Scale, Users } from 'lucide-react';
import { FMICalculator } from './FMICalculator';

export default function FMIPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="fmi" className="container-golden mb-4 pt-4" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora FMI – Índice de Masa Grasa Corporal
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu FMI (Índice de Masa Grasa) según la fórmula Schutz para evaluar tu cantidad de grasa corporal independientemente de tu altura.
              Complementa el FFMI para un análisis completo de tu composición corporal.
            </p>
          </header>

          <FMICalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el FMI (Índice de Masa Grasa)?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El <strong>FMI (Fat Mass Index)</strong> es una métrica avanzada que evalúa la cantidad de grasa corporal
                  de manera independiente de la altura, desarrollada por <a href="https://pubmed.ncbi.nlm.nih.gov/11901099/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Schutz et al. (2002)</a>.
                  Complementa perfectamente el IMC al enfocarse exclusivamente en la masa grasa. Investigación en <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377163/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">poblaciones clínicas</a> demuestra su superioridad para evaluar riesgos metabólicos asociados con obesidad.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mientras que el IMC puede ser engañoso para personas musculosas, el FMI proporciona una evaluación
                  más precisa de la composición corporal y riesgos metabólicos asociados con el exceso de grasa.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Ventajas del FMI sobre el IMC
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Independiente de altura:</strong> Más preciso para personas altas/bajas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Específico de grasa:</strong> Evalúa solo tejido adiposo, no músculo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Predice riesgo metabólico:</strong> Mejor indicador de síndrome metabólico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Sensible a cambios:</strong> Detecta variaciones en composición grasa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Estándar médico:</strong> Usado en investigación y práctica clínica - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377163/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">ensayos clínicos controlados</a></span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Categorías de FMI por Género
                  </h3>
                </header>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-destructive-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Hombres - Muy alto (&gt;12)</div>
                      <div className="text-sm text-foreground/90">Riesgo muy alto de enfermedades metabólicas</div>
                    </div>
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Hombres - Alto (9-12)</div>
                      <div className="text-sm text-warning">Riesgo alto, intervención necesaria</div>
                    </div>
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Hombres - Moderado (6-9)</div>
                      <div className="text-sm text-warning">Vigilancia recomendada</div>
                    </div>
                    <div className="p-3 bg-success-subtle rounded-lg">
                      <div className="font-semibold text-foreground/90">Mujeres - Muy alto (&gt;17)</div>
                      <div className="text-sm text-success">Riesgo muy alto, intervención urgente</div>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Aplicaciones Clínicas del FMI
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">En la Medicina</h4>
                    <ul className="space-y-2 text-sm text-warning">
                      <li>• Evaluación de riesgo metabólico - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377163/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">evidencia clínica</a></li>
                      <li>• Seguimiento de programas de pérdida de peso</li>
                      <li>• Evaluación de obesidad central</li>
                      <li>• Monitoreo de cambios en composición corporal</li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">En el Deporte</h4>
                    <ul className="space-y-2 text-sm text-warning">
                      <li>• Optimización de composición corporal</li>
                      <li>• Seguimiento de pérdida de grasa en atletas</li>
                      <li>• Evaluación de protocolos nutricionales</li>
                      <li>• Monitoreo de recuperación post-competición</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación de composición grasa
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu porcentaje de grasa:</a></strong> Obtén datos precisos para usar en FMI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/bai/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula BAI sin báscula:</a></strong> Estima grasa corporal usando solo cadera y altura según Bergman</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/ffmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu desarrollo muscular:</a></strong> Usa FFMI para análisis complementario de masa libre de grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Análisis completo de composición:</a></strong> Relación músculo-grasa para evaluación integral</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu IMC tradicional:</a></strong> Combina métricas antropométricas para evaluación completa</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre FMI</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es el FMI y en qué se diferencia del IMC?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El FMI (Fat Mass Index) mide solo la masa grasa relativa a tu altura, a diferencia del
                    <a href="/imc/" className="text-info hover:underline transition-colors"> IMC</a> que mezcla grasa y músculo.
                    Esto lo hace más preciso para evaluar exceso de grasa corporal, especialmente en personas musculosas.
                    Combínalo con tu <a href="/grasa-corporal/" className="text-info hover:underline transition-colors">porcentaje de grasa corporal</a> para
                    mayor contexto.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuáles son los rangos normales de FMI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para hombres: 3-6 kg/m² es normal. Para mujeres: 5-9 kg/m² es normal.
                    Valores superiores indican exceso de grasa corporal.
                    El FMI complementa al <a href="/ffmi/" className="text-info hover:underline transition-colors">FFMI</a> para
                    un análisis completo de composición corporal: uno mide la grasa y el otro el músculo.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="fmi" />

          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          <SocialShare
            title="Calculadora FMI Médica - Índice Masa Grasa Profesional"
            url="https://nutrifit-calculator.com/fmi/"
            description="Calcula tu FMI con fórmulas médicas profesionales. Evalúa cantidad de grasa corporal independiente de altura y obtén recomendaciones personalizadas para salud metabólica. ¡Totalmente gratis!"
          />

          <CalculatorNavigation currentCalculator="fmi" />
        </main>
      </Container>
    </>
  );
}
