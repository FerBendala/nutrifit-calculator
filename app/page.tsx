import { generateMetadata as generateMeta, generateJsonLd } from '@/lib/seo';
import { CalculatorForm } from '@/components/CalculatorForm';
import { Container } from '@/components/Container';
import { AdSlot } from '@/components/AdSlot';

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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora de Calorías y Macronutrientes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tus calorías diarias y distribución de macronutrientes personalizada 
              según tu objetivo: perder grasa, mantener peso o ganar músculo.
            </p>
          </div>

          {/* Ad Banner */}
          <AdSlot 
            adSlot="1234567890"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
          />

          {/* Calculator */}
          <CalculatorForm />

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

            {/* Ad Rectangle */}
            <AdSlot 
              adSlot="2345678901"
              style={{ display: 'block', height: '250px' }}
              className="w-full"
            />

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