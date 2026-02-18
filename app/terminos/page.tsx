import { Container } from '@/components/Container';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata = {
  title: 'Términos de Uso - NutriFit Calculator',
  description: 'Términos y condiciones de uso de las calculadoras de fitness y nutrición.',
  alternates: {
    canonical: getCanonicalUrl('/terminos'),
  },
};

export default function TerminosPage() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        {/* Header Section */}
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Términos de Uso
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Términos y condiciones para el uso de nuestras calculadoras de fitness y nutrición
          </p>
          <div className="card-golden bg-muted/30 inline-block px-6 py-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-0">
              📅 Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="prose prose-gray max-w-none space-golden-lg">

          {/* Sección 1: Aceptación de términos */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">✅</span>
              1. Aceptación de los términos
            </h2>

            <div className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <p className="text-sm text-foreground/90 leading-[1.618] mb-0">
                Al acceder y utilizar NutriFit Calculator, aceptas estar sujeto a estos términos
                de uso y a nuestra <a href="/privacidad/" className="text-info hover:underline transition-colors font-medium">política de privacidad</a>.
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
              </p>
            </div>
          </section>

          {/* Sección 2: Descripción del servicio */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🧮</span>
              2. Descripción del servicio
            </h2>

            <div className="card-golden bg-gradient-to-r bg-success-subtle mb-[2.618rem]">
              <h3 className="font-bold mb-[1.618rem] text-lg flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                NutriFit Calculator proporciona herramientas gratuitas para:
              </h3>
              <div className="grid gap-[1rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <ul className="text-sm space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Calorías y macronutrientes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>Índice de Masa Corporal (IMC)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Gasto Energético Diario Total (TDEE)</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <ul className="text-sm space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Necesidades de proteína</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info600 mr-2">•</span>
                      <span>Requerimientos de hidratación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Composición corporal y grasa corporal</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* Sección 3: AVISO MÉDICO CRÍTICO */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              3. Limitaciones y descargo de responsabilidad
            </h2>

            <div className="bg-destructive-subtle card-golden-lg border-l-4 border-destructive mb-[2.618rem]">
              <h3 className="font-semibold text-foreground mb-[1rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🚨</span>
                AVISO MÉDICO CRÍTICO
              </h3>
              <p className="text-sm text-foreground/90 leading-[1.618] font-medium">
                Los cálculos y recomendaciones proporcionados por nuestras herramientas son
                únicamente informativos y <strong>NO constituyen consejo médico, diagnóstico o tratamiento</strong>.
                Siempre consulta con profesionales de la salud antes de realizar cambios significativos
                en tu dieta o rutina de ejercicio.
              </p>
            </div>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  3.1 Naturaleza informativa
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Estimaciones basadas en fórmulas generales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Los resultados pueden no ser precisos para todos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span>No reemplazan consulta con profesionales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>No son apropiados para diagnóstico médico</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🛡️</span>
                  3.2 Limitación de responsabilidad
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618] mb-[1rem]">
                  NutriFit Calculator no se hace responsable de:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span>Decisiones basadas en nuestros cálculos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Problemas de salud derivados del uso</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Pérdidas o daños por uso de servicios</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 4: Uso apropiado */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">📖</span>
              4. Uso apropiado del servicio
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm bg-success-subtle">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center text-success">
                  <span className="text-2xl mr-3">✅</span>
                  4.1 Usos permitidos
                </h3>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Estimaciones informativas sobre nutrición y fitness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Uso personal y no comercial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Fines educativos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Punto de partida para consulta profesional</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm bg-destructive-subtle">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center text-destructive">
                  <span className="text-2xl mr-3">❌</span>
                  4.2 Usos prohibidos
                </h3>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span>Utilizar para diagnóstico médico</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Redistribuir o revender servicios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Hackear o comprometer la seguridad</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Automatización para acceso masivo</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 5: Recomendaciones de uso responsable */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">💡</span>
              5. Recomendaciones de uso responsable
            </h2>

            <div className="card-golden-lg bg-warning-subtle border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Mejores prácticas
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Consulta profesionales antes de cambios significativos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>Usa los resultados como punto de partida</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Ajusta según tu respuesta individual</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Busca consejo médico si tienes condiciones preexistentes</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* Secciones legales adicionales */}
          <section>
            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">©️</span>
                  6. Propiedad intelectual
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  El contenido, diseño y funcionalidad de NutriFit Calculator están protegidos
                  por derechos de autor y otras leyes de propiedad intelectual.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔒</span>
                  7. Privacidad y datos
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Tu privacidad es importante. Consulta nuestra
                  <a href="/privacidad/" className="text-primary hover:underline mx-1">
                    Política de Privacidad
                  </a>
                  para entender cómo manejamos tu información.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔄</span>
                  8. Modificaciones del servicio
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Nos reservamos el derecho de modificar, suspender o discontinuar cualquier
                  parte de nuestros servicios en cualquier momento sin previo aviso.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  9. Ley aplicable
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Estos términos se rigen por las leyes españolas y de la Unión Europea.
                  Cualquier disputa se resolverá en los tribunales competentes de España.
                </p>
              </article>
            </div>
          </section>

          {/* Sección para profesionales de la salud */}
          <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
            <h3 className="font-semibold text-foreground mb-[1rem] text-lg flex items-center">
              <span className="text-2xl mr-3">👩‍⚕️</span>
              Resumen para profesionales de la salud
            </h3>
            <p className="text-sm text-foreground/90 leading-[1.618]">
              Si eres profesional de la salud, puedes utilizar nuestras herramientas
              como apoyo en consulta, pero siempre bajo tu criterio profesional y
              responsabilidad clínica. Las calculadoras pueden servir como punto de partida
              para discusiones con pacientes, pero nunca como sustituto del juicio médico.
            </p>
          </section>

          {/* Sección de contacto */}
          <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning">
            <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">📞</span>
              10. Contacto y cambios en los términos
            </h3>
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <article className="card-golden bg-card/50">
                <h4 className="font-bold mb-[0.618rem] text-warning">📧 Contacto</h4>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li>• Email: legal@nutrifit-calculator.com</li>
                  <li>• Formulario de contacto en nuestro sitio web</li>
                </ul>
              </article>
              <article className="card-golden bg-card/50">
                <h4 className="font-bold mb-[0.618rem] text-warning">🔄 Cambios</h4>
                <p className="text-sm text-foreground/90 leading-[1.618]">
                  Podemos actualizar estos términos ocasionalmente. Los cambios significativos
                  se comunicarán a través de nuestro sitio web.
                </p>
              </article>
            </div>
          </section>
        </article>
      </main>
    </Container>
  );
}