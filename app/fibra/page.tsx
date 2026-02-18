import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Info, Leaf } from 'lucide-react';
import { FibraCalculator } from './FibraCalculator';

export default function FibraPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="fibra" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Fibra Diaria – Cuánta Necesitas
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula cuánta fibra dietética necesitas al día según tu edad, sexo y calorías.
              Recomendaciones IOM/FDA (14 g por 1000 kcal). Mejora tu salud digestiva con la cantidad correcta de fibra.
            </p>
          </header>

          <FibraCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué es importante la fibra?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La fibra dietética favorece el tránsito intestinal, ayuda a controlar el azúcar y el colesterol en sangre,
                y contribuye a la saciedad. Las guías IOM/FDA establecen ingestas adecuadas por edad y sexo, y una referencia
                de 14 g de fibra por cada 1000 kcal consumidas.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Leaf className="w-5 h-5 mr-3 text-success" />
                  Recomendaciones IOM/FDA
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p><strong>Adultos 19-50 años:</strong> Mujeres 25 g/día, Hombres 38 g/día.</p>
                  <p><strong>Adultos 51+ años:</strong> Mujeres 21 g/día, Hombres 30 g/día.</p>
                  <p><strong>Por calorías:</strong> 14 g de fibra por cada 1000 kcal (referencia IOM).</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Tipos de fibra
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs list-disc list-inside">
                  <li><strong>Fibra soluble:</strong> avena, manzana, legumbres; ayuda a colesterol y glucemia.</li>
                  <li><strong>Fibra insoluble:</strong> cereales integrales, verduras; favorece el tránsito intestinal.</li>
                </ul>
              </article>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo tomar más fibra de la recomendada?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Un exceso brusco puede causar molestias digestivas. Aumenta la fibra de forma gradual y bebe suficiente agua.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La fibra tiene calorías?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">La fibra aporta menos energía que los carbohidratos digeribles (aprox. 2 kcal/g en lugar de 4). Muchas tablas de calorías ya lo tienen en cuenta.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuento la fibra en los carbohidratos?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">En etiquetado (UE) los &quot;hidratos de carbono&quot; suelen incluir la fibra. Para &quot;carbohidratos netos&quot; se resta la fibra. Esta calculadora se centra en la fibra total recomendada, no en los net carbs.</p>
                </article>
              </div>
            </section>
          </article>

          <section className="bg-warning-subtle card-golden border-l-4 border-warning mb-6">
            <h3 className="font-bold text-foreground mb-3 text-lg">Otras calculadoras de nutrición</h3>
            <ul className="text-sm text-foreground/90 space-y-2">
              <li>
                <strong><a href="/azucar/" className="text-info hover:underline transition-colors font-medium transition-golden">Límite de azúcar (OMS):</a></strong> Máximo de azúcares libres según calorías (&lt;10% y &lt;5%)
              </li>
              <li>
                <strong><a href="/sodio/" className="text-info hover:underline transition-colors font-medium transition-golden">Sodio/Sal (OMS):</a></strong> Límite de sodio y sal, incl. recomendación para HTA
              </li>
              <li>
                <strong><a href="/alcohol/" className="text-info hover:underline transition-colors font-medium transition-golden">Alcohol:</a></strong> Unidades estándar, calorías y límite de bajo riesgo
              </li>
              <li>
                <strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Proteína diaria:</a></strong> Necesidades según objetivo y actividad
              </li>
              <li>
                <strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">TDEE:</a></strong> Gasto calórico total diario
              </li>
            </ul>
          </section>

          <RelatedCalculators currentPage="/fibra" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Fibra Diaria - Necesidades IOM/FDA"
            url="https://nutrifit-calculator.com/fibra/"
            description="Calcula tus necesidades de fibra según edad, sexo y calorías. Recomendaciones IOM/FDA y consejos prácticos."
          />
          <CalculatorNavigation currentCalculator="fibra" />
        </main>
      </Container>
    </>
  );
}
