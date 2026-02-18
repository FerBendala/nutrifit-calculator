import { Container } from '@/components/Container';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata = {
  title: 'Política de Cookies - NutriFit Calculator',
  description: 'Información detallada sobre el uso de cookies en NutriFit Calculator.',
  alternates: {
    canonical: getCanonicalUrl('/cookies'),
  },
};

export default function CookiesPage() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        {/* Header Section */}
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Política de Cookies
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Información detallada sobre el uso de cookies y tecnologías de seguimiento
          </p>
          <div className="card-golden bg-muted/30 inline-block px-6 py-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-0">
              📅 Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="prose prose-gray max-w-none space-golden-lg">

          {/* Sección 1: ¿Qué son las cookies? */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🍪</span>
              1. ¿Qué son las cookies?
            </h2>

            <div className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <p className="text-sm text-foreground/90 leading-[1.618] mb-0">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar
                tu experiencia de navegación, así como entender cómo utilizas nuestro sitio.
              </p>
            </div>
          </section>

          {/* Sección 2: Tipos de cookies */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">📊</span>
              2. Tipos de cookies que utilizamos
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-3 mb-[2.618rem]">
              <article className="card-golden space-golden-sm bg-success-subtle">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center text-success">
                  <span className="text-2xl mr-3">✅</span>
                  2.1 Cookies necesarias
                </h3>
                <div className="card-golden bg-success-subtle border-l-4 border-success mb-[1rem]">
                  <p className="text-xs text-foreground/90 mb-0 font-medium">
                    <strong>Siempre activas.</strong> Esenciales para el funcionamiento básico del sitio.
                  </p>
                </div>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Consentimiento:</strong> Recuerda tus preferencias de cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Tema:</strong> Modo oscuro/claro</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Navegación:</strong> Funcionalidad básica y formularios</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm bg-info-subtle">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center text-info">
                  <span className="text-2xl mr-3">📈</span>
                  2.2 Cookies analíticas
                </h3>
                <div className="card-golden bg-info-subtle border-l-4 border-info mb-[1rem]">
                  <p className="text-xs text-foreground/90 mb-0 font-medium">
                    <strong>Opcionales.</strong> Nos ayudan a entender cómo utilizas el sitio.
                  </p>
                </div>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Google Analytics:</strong> Análisis de tráfico</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Rendimiento:</strong> Velocidad y errores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Estadísticas:</strong> Páginas más visitadas</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm bg-warning-subtle">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center text-warning">
                  <span className="text-2xl mr-3">💰</span>
                  2.3 Cookies publicitarias
                </h3>
                <div className="card-golden bg-warning-subtle border-l-4 border-warning mb-[1rem]">
                  <p className="text-xs text-foreground/90 mb-0 font-medium">
                    <strong>Opcionales.</strong> Para mostrar anuncios relevantes y financiar el sitio.
                  </p>
                </div>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Google AdSense:</strong> Publicidad personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Remarketing:</strong> Anuncios según navegación</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Segmentación:</strong> Anuncios relevantes</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 3: Tabla de finalidades */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">📋</span>
              3. Finalidades específicas
            </h2>

            <div className="card-golden bg-muted overflow-hidden mb-[2.618rem]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left font-semibold">Finalidad</th>
                      <th className="border border-border p-3 text-left font-semibold">Tipo</th>
                      <th className="border border-border p-3 text-left font-semibold">Duración</th>
                      <th className="border border-border p-3 text-left font-semibold">Proveedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-muted">
                      <td className="border border-border p-3">Consentimiento de cookies</td>
                      <td className="border border-border p-3">
                        <span className="px-2 py-1 bg-success-subtle text-foreground/90 rounded-full text-xs font-medium">
                          Necesaria
                        </span>
                      </td>
                      <td className="border border-border p-3">1 año</td>
                      <td className="border border-border p-3">NutriFit Calculator</td>
                    </tr>
                    <tr className="hover:bg-muted">
                      <td className="border border-border p-3">Google Analytics</td>
                      <td className="border border-border p-3">
                        <span className="px-2 py-1 bg-info-subtle text-foreground/90 rounded-full text-xs font-medium">
                          Analítica
                        </span>
                      </td>
                      <td className="border border-border p-3">2 años</td>
                      <td className="border border-border p-3">Google</td>
                    </tr>
                    <tr className="hover:bg-muted">
                      <td className="border border-border p-3">Google AdSense</td>
                      <td className="border border-border p-3">
                        <span className="px-2 py-1 bg-warning-subtle text-foreground/90 rounded-full text-xs font-medium">
                          Publicitaria
                        </span>
                      </td>
                      <td className="border border-border p-3">2 años</td>
                      <td className="border border-border p-3">Google</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Sección 4: Control de cookies */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🔧</span>
              4. Control de cookies
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🎛️</span>
                  4.1 Banner de consentimiento
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618] mb-[1rem]">
                  Al visitar por primera vez, aparece un banner que permite:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Aceptar todas las cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Rechazar cookies opcionales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Configurar preferencias detalladas</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚙️</span>
                  4.2 Gestión posterior
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618] mb-[1rem]">
                  Puedes cambiar tus preferencias en cualquier momento:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Enlace en el footer de la web</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Configuración de tu navegador</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span>Borrando las cookies existentes</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 5: Configuración del navegador */}
          <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mb-[2.618rem]">
            <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">🌐</span>
              4.3 Configuración del navegador
            </h3>
            <p className="text-sm text-foreground leading-[1.618] mb-[1rem]">
              También puedes gestionar cookies directamente en tu navegador:
            </p>
            <div className="grid gap-[1rem] md:grid-cols-2">
              <article className="card-golden bg-card/50">
                <ul className="text-sm text-foreground space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Firefox:</strong> Preferencias → Privacidad y seguridad</span>
                  </li>
                </ul>
              </article>
              <article className="card-golden bg-card/50">
                <ul className="text-sm text-foreground space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Safari:</strong> Preferencias → Privacidad</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info600 mr-2">•</span>
                    <span><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 6: Cookies de terceros */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🤝</span>
              5. Cookies de terceros
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  5.1 Google Analytics
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618] mb-[1rem]">
                  Utilizamos Google Analytics para analizar el uso de nuestro sitio. Google puede
                  utilizar estos datos según su propia política de privacidad.
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener"
                        className="text-info hover:underline transition-colors"
                      >
                        Política de privacidad de Google
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener"
                        className="text-success hover:underline"
                      >
                        Plugin de exclusión de Google Analytics
                      </a>
                    </span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💰</span>
                  5.2 Google AdSense
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618] mb-[1rem]">
                  Mostramos anuncios a través de Google AdSense para financiar el mantenimiento
                  del sitio gratuito.
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <a
                        href="https://adssettings.google.com/"
                        target="_blank"
                        rel="noopener"
                        className="text-warning hover:underline"
                      >
                        Configuración de anuncios de Google
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noopener"
                        className="text-warning hover:underline"
                      >
                        Cómo utiliza Google las cookies publicitarias
                      </a>
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 7: Impacto del rechazo */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">⚖️</span>
              6. Impacto del rechazo de cookies
            </h2>

            <div className="card-golden-lg bg-warning-subtle border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔍</span>
                Si rechazas las cookies opcionales:
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">✅ Funcional</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>El sitio funcionará con normalidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Todas las calculadoras estarán disponibles</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning">⚠️ Limitaciones</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>No podremos mejorar basándonos en tu uso</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Anuncios genéricos, no personalizados</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Menor capacidad de mantener el sitio gratuito</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* Sección de contacto */}
          <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
            <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">📞</span>
              7. Contacto y actualizaciones
            </h3>
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <article className="card-golden bg-card/50">
                <h4 className="font-bold mb-[0.618rem] text-success">📧 Contacto</h4>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li>• Email: cookies@nutrifit-calculator.com</li>
                  <li>• Formulario de contacto en nuestro sitio web</li>
                </ul>
              </article>
              <article className="card-golden bg-card/50">
                <h4 className="font-bold mb-[0.618rem] text-success">🔄 Actualizaciones</h4>
                <p className="text-sm text-foreground/90 leading-[1.618]">
                  Podemos actualizar esta política ocasionalmente. Te informaremos
                  de cambios significativos a través de nuestro sitio web.
                </p>
              </article>
            </div>
          </section>

          {/* Compromiso de transparencia */}
          <section className="bg-info-subtle card-golden-lg border-l-4 border-info">
            <h3 className="font-semibold text-foreground mb-[1rem] text-lg flex items-center">
              <span className="text-2xl mr-3">✅</span>
              Compromiso de transparencia
            </h3>
            <p className="text-sm text-foreground/90 leading-[1.618]">
              Nos comprometemos a ser transparentes sobre el uso de cookies y a darte
              control total sobre tus preferencias. Solo utilizamos las cookies necesarias
              para proporcionar un servicio de calidad y las opcionales únicamente con tu consentimiento.
              Tu privacidad es importante para nosotros y respetamos tus decisiones sobre el uso de cookies.
            </p>
          </section>
        </article>
      </main>
    </Container>
  );
}