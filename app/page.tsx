import { CalculatorForm } from '@/components/CalculatorForm';
import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { SocialShare } from '@/components/SocialShare';
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

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora de Calorías y Macronutrientes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tus calorías diarias y distribución de macronutrientes personalizada
              según tu objetivo: perder grasa, mantener peso o ganar músculo.
            </p>
          </div>

          {/* Calculator - Contenido crítico primero */}
          <CalculatorForm />

          {/* AdSlot movido después del contenido principal */}
          <ConditionalAdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
            requireInteraction={true}
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
                    Utilizamos la ecuación de <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mifflin-St Jeor</a>, reconocida como una de las más
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
                    basada en las <a href="https://www.who.int/publications/i/item/9789241549028" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">recomendaciones de la OMS</a> y evidencias científicas según tu objetivo específico.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">🏃‍♂️ Niveles de actividad física</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Sedentario (1.2):</strong> Trabajo de oficina, poco o nada de ejercicio</p>
                  <p><strong>Ligera (1.375):</strong> Ejercicio ligero 1-3 días/semana</p>
                  <p><strong>Moderada (1.55):</strong> Ejercicio moderado 3-5 días/semana</p>
                  <p><strong>Intensa (1.725):</strong> Ejercicio intenso 6-7 días/semana</p>
                  <p><strong>Muy intensa (1.9):</strong> Ejercicio muy intenso, trabajo físico</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">📈 Objetivos y ajustes calóricos</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Pérdida de grasa:</strong> Déficit del 15-25% (0.5-1kg/semana)</p>
                  <p><strong>Mantenimiento:</strong> Consume tu TDEE exacto</p>
                  <p><strong>Ganancia muscular:</strong> Surplus del 5-15% (0.25-0.5kg/semana)</p>
                  <p><strong>Recomposición:</strong> Ligero déficit con entrenamiento de fuerza</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-medium text-green-900 mb-4">
                🎯 Guía práctica para usar tus macros
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-sm text-green-800">
                  <h4 className="font-semibold mb-2">🥩 Proteínas (25-30%)</h4>
                  <p>1.6-2.2g por kg de peso corporal según <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">estudios científicos</a>. Prioriza carnes magras, pescado, huevos, lácteos y legumbres.</p>
                </div>
                <div className="text-sm text-green-800">
                  <h4 className="font-semibold mb-2">🥑 Grasas (20-35%)</h4>
                  <p>0.8-1.2g por kg de peso. Incluye aceite de oliva, frutos secos, aguacate y pescado graso.</p>
                </div>
                <div className="text-sm text-green-800">
                  <h4 className="font-semibold mb-2">🍚 Carbohidratos (45-65%)</h4>
                  <p>Completa el resto de calorías. Prioriza cereales integrales, frutas y verduras.</p>
                </div>
              </div>
            </div>

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
                ⚠️ Consideraciones importantes de la calculadora
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Los resultados son estimaciones basadas en fórmulas poblacionales</li>
                <li>• La precisión puede variar según la composición corporal individual</li>
                <li>• Para objetivos específicos, consulta con un nutricionista profesional</li>
                <li>• Ajusta gradualmente las calorías y monitorea tus resultados</li>
                <li>• Esta herramienta no sustituye el consejo médico personalizado</li>
              </ul>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Con qué frecuencia debo recalcular mis macros?</h4>
                  <p className="text-sm text-muted-foreground">
                    Recalcula cada 4-6 semanas o cuando hayas perdido/ganado 2-3kg de peso.
                    Tu metabolismo se adapta, por lo que es importante ajustar regularmente.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Debo contar las calorías de las verduras?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sí, aunque sean pocas. Las verduras aportan fibra, vitaminas y minerales esenciales.
                    Cuenta todas las calorías para mayor precisión en tus objetivos.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Puedo usar esta calculadora durante el embarazo?</h4>
                  <p className="text-sm text-muted-foreground">
                    No recomendamos usar esta calculadora durante el embarazo o lactancia.
                    Consulta siempre con tu médico para necesidades nutricionales específicas.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />
          </div>
        </div>
      </Container>
    </>
  );
}