import { Container } from '@/components/Container';

export const metadata = {
  title: 'Política de Privacidad - NutriFit Calculator',
  description: 'Información sobre cómo recopilamos, usamos y protegemos tus datos personales en NutriFit Calculator.',
};

export default function PrivacidadPage() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        {/* Header Section */}
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Política de Privacidad
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Información sobre cómo recopilamos, usamos y protegemos tus datos personales
          </p>
          <div className="card-golden bg-muted/30 inline-block px-6 py-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-0">
              📅 Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="prose prose-gray max-w-none space-golden-lg">

          {/* Sección 1: Información que recopilamos */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">📊</span>
              1. Información que recopilamos
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  1.1 Información que proporcionas
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  Cuando utilizas nuestras calculadoras, puedes proporcionar información como:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Datos físicos (peso, altura, edad, sexo)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Información de actividad física</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Objetivos de fitness</span>
                  </li>
                </ul>
                <div className="card-golden bg-success-subtle border-l-4 border-success mt-[1rem]">
                  <p className="text-sm text-foreground/90 mb-0">
                    <strong>🔒 Importante:</strong> Toda esta información se procesa localmente en tu navegador
                    y no se envía a nuestros servidores.
                  </p>
                </div>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🤖</span>
                  1.2 Información automática
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  Cuando visitas nuestro sitio, podemos recopilar automáticamente:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Información del navegador y dispositivo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Dirección IP</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Páginas visitadas y tiempo de navegación</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Cookies y tecnologías similares</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Sección 2: Cómo usamos tu información */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              2. Cómo usamos tu información
            </h2>

            <div className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Finalidades del tratamiento
              </h3>
              <div className="grid gap-[1rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Proporcionar y mejorar nuestros servicios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>Realizar análisis de uso (Google Analytics)</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mostrar publicidad relevante (Google AdSense)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Cumplir con obligaciones legales</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* Sección 3: Cookies y tecnologías de seguimiento */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🍪</span>
              3. Cookies y tecnologías de seguimiento
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-3 mb-[2.618rem]">
              <article className="card-golden space-golden-sm bg-success-subtle">
                <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                  <span className="text-lg mr-2">✅</span>
                  Necesarias
                </h4>
                <p className="text-sm text-foreground/90 leading-[1.618]">
                  Esenciales para el funcionamiento del sitio. Control de consentimiento y navegación básica.
                </p>
              </article>
              <article className="card-golden space-golden-sm bg-info-subtle">
                <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                  <span className="text-lg mr-2">📊</span>
                  Analíticas
                </h4>
                <p className="text-sm text-foreground/90 leading-[1.618]">
                  Google Analytics para entender el uso del sitio y mejorar la experiencia.
                </p>
              </article>
              <article className="card-golden space-golden-sm bg-warning-subtle">
                <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                  <span className="text-lg mr-2">💰</span>
                  Publicitarias
                </h4>
                <p className="text-sm text-foreground/90 leading-[1.618]">
                  Google AdSense para mostrar anuncios relevantes y financiar el sitio gratuito.
                </p>
              </article>
            </div>

            <div className="card-golden bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <strong>🔧 Control de cookies:</strong> Puedes gestionar tus preferencias a través de nuestro
                <a href="/cookies/" className="text-primary hover:underline mx-1">banner de consentimiento</a>
                o configurar tu navegador para rechazarlas.
              </p>
            </div>
          </section>

          {/* Sección 4: Compartir información con terceros */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">🤝</span>
              4. Compartir información con terceros
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-3 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                  <span className="text-lg mr-2">📈</span>
                  Google Analytics
                </h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Análisis de uso del sitio para mejorar la experiencia del usuario.
                </p>
              </article>
              <article className="card-golden space-golden-sm">
                <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                  <span className="text-lg mr-2">💰</span>
                  Google AdSense
                </h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Publicidad personalizada para mantener el sitio gratuito.
                </p>
              </article>
              <article className="card-golden space-golden-sm">
                <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                  <span className="text-lg mr-2">☁️</span>
                  Netlify
                </h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Proveedor de hosting para alojar el sitio web de forma segura.
                </p>
              </article>
            </div>
          </section>

          {/* Sección 5: Tus derechos */}
          <section>
            <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
              <span className="text-2xl mr-3">⚖️</span>
              5. Tus derechos
            </h2>

            <div className="card-golden-lg bg-warning-subtle border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                Derechos bajo el RGPD
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <ul className="text-sm text-foreground space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Acceso:</strong> Acceder a tus datos personales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span><strong>Rectificación:</strong> Corregir información inexacta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Supresión:</strong> Solicitar eliminación de datos</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <ul className="text-sm text-foreground space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Portabilidad:</strong> Transferir tus datos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Oposición:</strong> Retirar consentimiento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Limitación:</strong> Restringir procesamiento</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* Secciones adicionales en formato condensado */}
          <section>
            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔒</span>
                  6. Seguridad
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Implementamos medidas técnicas y organizativas apropiadas para proteger
                  tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  7. Transferencias internacionales
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Algunos proveedores procesan datos fuera del EEE. Nos aseguramos de que
                  se implementen las salvaguardas adecuadas.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⏱️</span>
                  8. Retención de datos
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Conservamos tu información personal solo durante el tiempo necesario para
                  cumplir con los fines descritos en esta política.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">👶</span>
                  9. Menores de edad
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos
                  intencionadamente información personal de menores de 16 años.
                </p>
              </article>
            </div>
          </section>

          {/* Sección de contacto y cambios */}
          <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
            <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">📞</span>
              10. Contacto y cambios
            </h3>
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <article className="card-golden bg-card/50">
                <h4 className="font-bold mb-[0.618rem] text-warning">📧 Contacto</h4>
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li>• Email: privacy@nutrifit-calculator.com</li>
                  <li>• Formulario de contacto en nuestro sitio web</li>
                </ul>
              </article>
              <article className="card-golden bg-card/50">
                <h4 className="font-bold mb-[0.618rem] text-warning">🔄 Cambios</h4>
                <p className="text-sm text-foreground/90 leading-[1.618]">
                  Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios
                  significativos a través de nuestro sitio web.
                </p>
              </article>
            </div>
          </section>

          {/* Aviso especial sobre datos de salud */}
          <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning">
            <h3 className="font-semibold text-foreground mb-[1rem] text-lg flex items-center">
              <span className="text-2xl mr-3">🩺</span>
              Tratamiento de datos de salud
            </h3>
            <p className="text-sm text-foreground/90 leading-[1.618]">
              Los datos que introduces en nuestras calculadoras (peso, altura, etc.)
              se procesan únicamente en tu dispositivo y no se almacenan en nuestros servidores.
              Esta información no se utiliza para diagnósticos médicos y siempre debe complementarse
              con el consejo de profesionales de la salud.
            </p>
          </section>
        </article>
      </main>
    </Container>
  );
}