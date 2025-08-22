import { AdSlot } from '@/components/AdSlot';
import { CalculatorForm } from '@/components/CalculatorForm';
import { Container } from '@/components/Container';
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

      <Container className="py-8">
        {/* Skip link para accesibilidad */}
        <a
          href="#calculator"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Saltar a calculadora
        </a>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section - Optimizado para LCP */}
          <div className="hero-section">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora de Calorías y Macronutrientes
            </h1>
            <p className="hero-description">
              Calcula tus calorías diarias y distribución de macronutrientes personalizada
              según tu objetivo: perder grasa, mantener peso o ganar músculo.
            </p>
          </div>

          {/* Calculator - Contenido crítico primero */}
          <CalculatorForm />

          {/* AdSlot movido después del contenido crítico */}
          <AdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
          />

          {/* Educational Content */}
          <div className="space-y-6 pt-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                ¿Cómo funciona nuestra calculadora?
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">🔬 Fórmula científica</h3>
                  <p className="text-muted-foreground">
                    Utilizamos la ecuación de Mifflin-St Jeor, reconocida como una de las más
                    precisas para calcular el metabolismo basal (BMR). Esta fórmula tiene en cuenta
                    tu sexo, edad, altura y peso para determinar las calorías que quemas en reposo.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">⚡ Factor de actividad</h3>
                  <p className="text-muted-foreground">
                    Multiplicamos tu BMR por un factor que refleja tu nivel de actividad física
                    diaria para obtener tu TDEE (Total Daily Energy Expenditure), que representa
                    las calorías totales que quemas al día.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">🎯 Objetivos personalizados</h3>
                  <p className="text-muted-foreground">
                    Ajustamos tus calorías según tu objetivo: déficit del 20% para perder grasa,
                    mantenimiento para peso estable, o surplus del 10% para ganar masa muscular.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">🥗 Distribución de macros</h3>
                  <p className="text-muted-foreground">
                    Calculamos la distribución óptima de proteínas, grasas y carbohidratos
                    basada en las últimas evidencias científicas y tu objetivo específico.
                  </p>
                </div>
              </div>
            </div>

            {/* Ad Rectangle - Comentado hasta tener slots reales de AdSense */}
            {/* <AdSlot 
              adSlot="2345678901"
              style={{ display: 'block', height: '250px' }}
              className="w-full"
            /> */}

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-4">
                🎯 ¿Te estancaste? Cómo ajustar tus calorías
              </h3>
              <div className="text-sm text-green-800 space-y-3">
                <p>
                  <strong>Si no pierdes peso después de 2-3 semanas:</strong><br />
                  Reduce 100-150 kcal/día de tu objetivo actual. Prioriza quitar carbohidratos o grasas,
                  mantén las proteínas estables.
                </p>
                <p>
                  <strong>Si no ganas peso/músculo:</strong><br />
                  Aumenta 100-200 kcal/día. Añade carbohidratos alrededor del entrenamiento
                  y asegúrate de consumir suficiente proteína (1.6-2.2g/kg).
                </p>
                <p>
                  <strong>Señales de que necesitas ajustar:</strong><br />
                  • Peso estable por más de 2 semanas • Pérdida de energía constante
                  • Hambre extrema o saciedad excesiva • Cambios en el rendimiento deportivo
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                ⚠️ Importante: Limitaciones y recomendaciones
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Los resultados son estimaciones basadas en fórmulas poblacionales</li>
                <li>• La precisión puede variar según la composición corporal individual</li>
                <li>• Para objetivos específicos, consulta con un nutricionista profesional</li>
                <li>• Ajusta gradualmente las calorías y monitorea tus resultados</li>
                <li>• Esta herramienta no sustituye el consejo médico personalizado</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}