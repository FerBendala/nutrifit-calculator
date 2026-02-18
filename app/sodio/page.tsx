import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { AlertTriangle, Info } from 'lucide-react';
import { SodioCalculator } from './SodioCalculator';

export default function SodioPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="sodio" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Sodio y Sal – Límite Diario Recomendado
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Conoce el límite de sodio y sal según la OMS: menos de 2 g de sodio (5 g de sal) al día.
              Incluye recomendaciones especiales para hipertensión. Cuida tu salud cardiovascular.
            </p>
          </header>

          <SodioCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué limitar el sodio?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                Un exceso de sodio se asocia con mayor riesgo de hipertensión y enfermedad cardiovascular. La OMS recomienda menos de 2 g de sodio al día (5 g de sal); la sal de mesa es cloruro sódico y aproximadamente el 40% es sodio.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-3 text-amber-600" />
                  Recomendaciones OMS
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p><strong>Población general:</strong> menos de 2 g de sodio al día (menos de 5 g de sal).</p>
                  <p><strong>Hipertensión o indicación médica:</strong> a menudo se recomienda 1,5 g de sodio (unos 3,75 g de sal).</p>
                  <p>En el etiquetado el sodio puede aparecer en mg; 2 g = 2000 mg.</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Dónde suele haber más sodio
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs list-disc list-inside">
                  <li>Pan, bollería y cereales de desayuno</li>
                  <li>Embutidos, conservas y salazones</li>
                  <li>Quesos, salsas y platos preparados</li>
                  <li>Snacks, frutos secos salados y sal de mesa</li>
                </ul>
              </article>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Sal y sodio es lo mismo?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">No. La sal (cloruro sódico) contiene aproximadamente un 40% de sodio. Por tanto, 5 g de sal equivalen a unos 2 g de sodio. En las etiquetas suele figurar el sodio en mg.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es &quot;alto en sodio&quot; en el etiquetado?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">En la UE, un alimento es &quot;alto en sal&quot; si tiene más de 1,5 g de sal por 100 g (equivalente a 0,6 g de sodio por 100 g). Comparar por 100 g ayuda a elegir productos con menos sodio.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Necesito algo de sodio?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Sí. El sodio es un electrolito necesario, pero en la dieta actual la mayoría de personas supera el límite recomendado. Reducir el exceso es el objetivo, no eliminar el sodio por completo.</p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/sodio" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Límite de Sodio y Sal - Recomendaciones OMS"
            url="https://nutrifit-calculator.com/sodio/"
            description="Límite de sodio y sal según OMS: menos de 2 g sodio (5 g sal). Incluye recomendación estricta para hipertensión."
          />
          <CalculatorNavigation currentCalculator="sodio" />
        </main>
      </Container>
    </>
  );
}
