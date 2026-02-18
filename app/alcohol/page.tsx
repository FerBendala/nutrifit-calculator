import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Info, Target } from 'lucide-react';
import { AlcoholCalculator } from './AlcoholCalculator';

export default function AlcoholPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="alcohol" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Alcohol – Unidades y Calorías
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Unidades estándar de alcohol, calorías y comparación con el límite de consumo de bajo riesgo (OMS y guías de salud).
            </p>
          </header>

          <AlcoholCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es una unidad estándar de alcohol?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                Una unidad estándar (OMS/España) equivale a 10 g de alcohol puro. Aproximadamente: 1 caña de cerveza (330 ml, 5°), 1 copa de vino (100 ml, 12°), 1 copa de destilado (30 ml, 40°). El alcohol aporta 7 kcal por gramo (calorías vacías).
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Target className="w-5 h-5 mr-3 text-muted-foreground" />
                  Límite de bajo riesgo
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p>Muchas guías de salud (referencia UK y otras) consideran consumo de bajo riesgo: <strong>hombres ≤14 unidades/semana</strong>, <strong>mujeres ≤7 unidades/semana</strong>, repartidas en varios días y sin atracón.</p>
                  <p>La OMS indica que menos alcohol es siempre mejor; no existe un nivel &quot;seguro&quot; para la salud.</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Calorías del alcohol
                </h3>
                <p className="text-sm text-muted-foreground">
                  El alcohol aporta 7 kcal por gramo. 1 unidad (10 g) ≈ 70 kcal. Un consumo de varias unidades a la semana puede sumar muchas calorías y afectar el peso y la calidad del sueño.
                </p>
              </article>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo cuento las unidades si mi bebida es distinta?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Aproximación: (ml × graduación × 0,008) ≈ gramos de alcohol. Divide entre 10 para unidades. Ej.: 250 ml de vino 12° → 250×12×0,008 = 24 g → 2,4 unidades.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿El alcohol engorda?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Aporta calorías (7 kcal/g) y suele ir asociado a hábitos que favorecen el aumento de peso. Si quieres controlar el peso, conviene tener en cuenta las calorías del alcohol y reducirlo si es necesario.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es el &quot;atracón&quot; de alcohol?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Consumir muchas unidades en una sola ocasión (p. ej. ≥6 unidades en hombres, ≥4 en mujeres) aumenta el riesgo. Es mejor repartir poco y no superar los límites semanales de bajo riesgo.</p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/alcohol" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Alcohol - Unidades y Calorías"
            url="https://nutrifit-calculator.com/alcohol"
            description="Calcula unidades estándar de alcohol, calorías y compáralas con el límite de bajo riesgo."
          />
          <CalculatorNavigation currentCalculator="alcohol" />
        </main>
      </Container>
    </>
  );
}
