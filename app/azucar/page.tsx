import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Circle, Info } from 'lucide-react';
import { AzucarCalculator } from './AzucarCalculator';

export default function AzucarPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="azucar" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Azúcar Diaria – Tu Límite Según la OMS
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu límite máximo de azúcar al día según las recomendaciones de la OMS.
              Descubre cuántos gramos de azúcares libres puedes consumir basándote en tus calorías diarias.
            </p>
          </header>

          <AzucarCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué limitar el azúcar?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La OMS recomienda limitar la ingesta de azúcares libres para reducir el riesgo de caries, sobrepeso y enfermedades no transmisibles. Menos del 10% de la energía es la recomendación fuerte; menos del 5% aporta beneficios adicionales.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Circle className="w-5 h-5 mr-3 text-amber-600" />
                  Recomendaciones OMS
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p><strong>Menos del 10%</strong> de la ingesta energética total: recomendación fuerte para adultos y niños.</p>
                  <p><strong>Menos del 5%</strong> de la ingesta energética total: beneficio adicional (caries, peso).</p>
                  <p>El azúcar aporta unas 4 kcal por gramo; el límite en gramos se obtiene a partir de tus calorías diarias.</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Fuentes habituales
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs list-disc list-inside">
                  <li>Refrescos, zumos envasados, bebidas energéticas</li>
                  <li>Bollería, galletas, cereales azucarados</li>
                  <li>Miel, mermeladas, siropes</li>
                  <li>Productos &quot;light&quot; o &quot;sin grasa&quot; (a veces con más azúcar)</li>
                </ul>
              </article>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La fruta cuenta como azúcar libre?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">No. Los azúcares en fruta y verdura enteras, y en la leche sin azúcar, no se consideran azúcares libres. Sí cuentan los zumos, concentrados y el azúcar añadido.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo saber cuánto azúcar llevo?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Revisa el etiquetado: &quot;Hidratos de carbono – de los cuales azúcares&quot;. Suma el azúcar de lo que comes y bebes a lo largo del día y compáralo con tu límite en gramos.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo usar edulcorantes?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">La OMS se refiere a azúcares libres; los edulcorantes sin calorías no entran en este límite. Usados con moderación pueden ayudar a reducir azúcar, pero la prioridad es reducir el dulzor global de la dieta.</p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/azucar" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Límite de Azúcar Diaria - Recomendaciones OMS"
            url="https://nutrifit-calculator.com/azucar/"
            description="Calcula el límite máximo de azúcares libres según tus calorías. Recomendaciones OMS: menos del 10% y menos del 5%."
          />
          <CalculatorNavigation currentCalculator="azucar" />
        </main>
      </Container>
    </>
  );
}
