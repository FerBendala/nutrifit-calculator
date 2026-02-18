import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SocialShare } from '@/components/SocialShare';
import TDEECalculator from './TDEECalculator';

export default function TDEEPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="tdee" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora TDEE – Calorías para Mantener, Perder o Ganar Peso
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu gasto calórico diario (TDEE) según tu edad, peso y actividad física.
              Descubre cuántas calorías necesitas para mantener, perder o ganar peso.
            </p>
          </header>

          <TDEECalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu TDEE: gasto calórico según peso y ejercicio
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El TDEE (Total Daily Energy Expenditure) representa la cantidad total de energía
                que tu cuerpo gasta en un día completo. Se compone de varios factores:
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔥</span>
                  Componentes del TDEE
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-destructive mr-2 min-w-[96px]">BMR (60-70%):</span>
                    <span>Metabolismo basal calculado con la <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">ecuación Mifflin-St Jeor</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-warning mr-2 min-w-[96px]">TEF (8-15%):</span>
                    <span>Termogénesis de alimentos (energía para digerir) - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524030/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios sobre TEF</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-success mr-2 min-w-[96px]">EAT (15-30%):</span>
                    <span>Actividad física planificada (ejercicio) - <a href="https://www.acsm.org/read-research/trending-topics-resource-pages/physical-activity-guidelines" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">guías ACSM</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="font-bold text-info mr-2 min-w-[96px]">NEAT (15-30%):</span>
                    <span>Actividades no ejercicio (caminar, fidgeting) - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios NEAT</a></span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Factores que influyen
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span>Edad, sexo, altura y peso</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span>Composición corporal (músculo vs grasa) - revisa tu <a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">IMC</a> como referencia</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span>Nivel de actividad física</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span>Genética y hormonas</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Cómo usar tu TDEE para alcanzar tus objetivos
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Perder peso
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• TDEE - 300-500 kcal/día</li>
                    <li>• Pérdida de 0.5-1kg/semana</li>
                    <li>• Usa nuestra <a href="/" className="text-info hover:underline transition-colors font-medium transition-golden"> calculadora principal</a> para macros</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">⚖️</span>
                    Mantener peso
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Consume exactamente tu TDEE</li>
                    <li>• Monitorea semanalmente</li>
                    <li>• Ajusta según resultados</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Ganar músculo
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• TDEE + 200-400 kcal/día</li>
                    <li>• Ganancia de 0.25-0.5kg/semana</li>
                    <li>• Optimiza tu <a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">ingesta de proteína</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Consideraciones importantes
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>El TDEE es una estimación:</strong> Puede variar ±10-15% entre personas similares</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Adaptación metabólica:</strong> Tu metabolismo se ajusta con el tiempo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Recalcula regularmente:</strong> Cada 4-6 semanas o tras cambios de peso significativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Monitorea resultados:</strong> Ajusta según tu progreso real, no solo los números</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre TDEE</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué mi TDEE es diferente al de mi amigo con datos similares?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El TDEE varía por genética, composición corporal, hormonas y historial metabólico.
                    Dos personas con el mismo peso pueden tener metabolismos muy diferentes.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Debo contar las calorías quemadas en el gimnasio además del TDEE?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    No, el TDEE ya incluye tu actividad física. Solo usa las calorías del TDEE,
                    no sumes las del ejercicio para evitar sobreestimar tu gasto.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué hago si no estoy viendo resultados con mi TDEE?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Después de 2-3 semanas sin cambios, ajusta ±100-200 kcal según tu objetivo.
                    También verifica tu <a href="/agua/" className="text-info hover:underline transition-colors font-medium">hidratación</a> y evalúa si tu <a href="/bmr/" className="text-info hover:underline transition-colors font-medium">metabolismo basal</a> ha cambiado.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu cálculo de TDEE
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Conoce tu metabolismo basal:</a></strong> El BMR es la base del TDEE, entiende tu gasto en reposo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/rmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu RMR práctico:</a></strong> Tasa metabólica en reposo más accesible para seguimiento diario</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus macronutrientes:</a></strong> Usa tu TDEE para determinar la distribución de macros perfecta</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/vo2max/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu capacidad cardiovascular:</a></strong> El TDEE se relaciona directamente con el entrenamiento de resistencia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Planifica entrenamientos intensos:</a></strong> El entrenamiento de fuerza aumenta significativamente tu TDEE</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Verifica tu IMC:</a></strong> Conoce tu estado de peso actual para contextualizar tu TDEE</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula tus necesidades específicas de proteína según tu objetivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/fibra/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu fibra diaria:</a></strong> Necesidades de fibra según calorías (IOM/FDA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/azucar/" className="text-info hover:underline transition-colors font-medium transition-golden">Límite de azúcar (OMS):</a></strong> Máximo de azúcares libres según tus calorías</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/tdee" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/tdee/"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="tdee" />
          </article>
        </main>
      </Container>
    </>
  );
}
