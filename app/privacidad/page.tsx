import { Container } from '@/components/Container';

export const metadata = {
  title: 'Política de Privacidad - NutriFit Calculator',
  description: 'Información sobre cómo recopilamos, usamos y protegemos tus datos personales en NutriFit Calculator.',
};

export default function PrivacidadPage() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <div className="max-w-5xl mx-auto space-golden-lg">
        {/* Header Section */}
        <div className="text-center space-golden-md">
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
        </div>

        {/* Main Content */}
        <div className="prose prose-gray max-w-none space-golden-lg">

          {/* Sección 1: Información que recopilamos */}
          <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
            <span className="text-2xl mr-3">📊</span>
            1. Información que recopilamos
          </h2>

          <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
            <div className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">👤</span>
                1.1 Información que proporcionas
              </h3>
              <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                Cuando utilizas nuestras calculadoras, puedes proporcionar información como:
              </p>
              <ul className="text-sm space-golden-xs">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Datos físicos (peso, altura, edad, sexo)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Información de actividad física</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Objetivos de fitness</span>
                </li>
              </ul>
              <div className="card-golden bg-green-50 border-l-4 border-green-400 mt-[1rem]">
                <p className="text-sm text-green-800 mb-0">
                  <strong>🔒 Importante:</strong> Toda esta información se procesa localmente en tu navegador
                  y no se envía a nuestros servidores.
                </p>
              </div>
            </div>

            <div className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                1.2 Información automática
              </h3>
              <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                Cuando visitas nuestro sitio, podemos recopilar automáticamente:
              </p>
              <ul className="text-sm space-golden-xs">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Información del navegador y dispositivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Dirección IP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Páginas visitadas y tiempo de navegación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Cookies y tecnologías similares</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sección 2: Cómo usamos tu información */}
          <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            2. Cómo usamos tu información
          </h2>

          <div className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-[2.618rem]">
            <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">📋</span>
              Finalidades del tratamiento
            </h3>
            <div className="grid gap-[1rem] md:grid-cols-2">
              <div className="card-golden bg-white/50">
                <ul className="text-sm text-blue-800 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Proporcionar y mejorar nuestros servicios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Realizar análisis de uso (Google Analytics)</span>
                  </li>
                </ul>
              </div>
              <div className="card-golden bg-white/50">
                <ul className="text-sm text-blue-800 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Mostrar publicidad relevante (Google AdSense)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Cumplir con obligaciones legales</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección 3: Cookies y tecnologías de seguimiento */}
          <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
            <span className="text-2xl mr-3">🍪</span>
            3. Cookies y tecnologías de seguimiento
          </h2>

          <div className="grid gap-[1.618rem] md:grid-cols-3 mb-[2.618rem]">
            <div className="card-golden space-golden-sm bg-green-50">
              <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                <span className="text-lg mr-2">✅</span>
                Necesarias
              </h4>
              <p className="text-sm text-green-800 leading-[1.618]">
                Esenciales para el funcionamiento del sitio. Control de consentimiento y navegación básica.
              </p>
            </div>
            <div className="card-golden space-golden-sm bg-blue-50">
              <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                <span className="text-lg mr-2">📊</span>
                Analíticas
              </h4>
              <p className="text-sm text-blue-800 leading-[1.618]">
                Google Analytics para entender el uso del sitio y mejorar la experiencia.
              </p>
            </div>
            <div className="card-golden space-golden-sm bg-yellow-50">
              <h4 className="font-bold mb-[0.618rem] text-yellow-700 flex items-center">
                <span className="text-lg mr-2">💰</span>
                Publicitarias
              </h4>
              <p className="text-sm text-yellow-800 leading-[1.618]">
                Google AdSense para mostrar anuncios relevantes y financiar el sitio gratuito.
              </p>
            </div>
          </div>

          <div className="card-golden bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>🔧 Control de cookies:</strong> Puedes gestionar tus preferencias a través de nuestro
              <a href="/cookies" className="text-primary hover:underline mx-1">banner de consentimiento</a>
              o configurar tu navegador para rechazarlas.
            </p>
          </div>

          {/* Sección 4: Compartir información con terceros */}
          <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
            <span className="text-2xl mr-3">🤝</span>
            4. Compartir información con terceros
          </h2>

          <div className="grid gap-[1.618rem] md:grid-cols-3 mb-[2.618rem]">
            <div className="card-golden space-golden-sm">
              <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                <span className="text-lg mr-2">📈</span>
                Google Analytics
              </h4>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Análisis de uso del sitio para mejorar la experiencia del usuario.
              </p>
            </div>
            <div className="card-golden space-golden-sm">
              <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                <span className="text-lg mr-2">💰</span>
                Google AdSense
              </h4>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Publicidad personalizada para mantener el sitio gratuito.
              </p>
            </div>
            <div className="card-golden space-golden-sm">
              <h4 className="font-bold mb-[0.618rem] text-purple-700 flex items-center">
                <span className="text-lg mr-2">☁️</span>
                Netlify
              </h4>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Proveedor de hosting para alojar el sitio web de forma segura.
              </p>
            </div>
          </div>

          {/* Sección 5: Tus derechos */}
          <h2 className="text-3xl font-semibold mb-[1.618rem] flex items-center">
            <span className="text-2xl mr-3">⚖️</span>
            5. Tus derechos
          </h2>

          <div className="card-golden-lg bg-purple-50 border-l-4 border-purple-400 mb-[2.618rem]">
            <h3 className="font-bold text-purple-900 mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">🛡️</span>
              Derechos bajo el RGPD
            </h3>
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <div className="card-golden bg-white/50">
                <ul className="text-sm text-purple-800 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Acceso:</strong> Acceder a tus datos personales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>Rectificación:</strong> Corregir información inexacta</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Supresión:</strong> Solicitar eliminación de datos</span>
                  </li>
                </ul>
              </div>
              <div className="card-golden bg-white/50">
                <ul className="text-sm text-purple-800 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Portabilidad:</strong> Transferir tus datos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Oposición:</strong> Retirar consentimiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span><strong>Limitación:</strong> Restringir procesamiento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Secciones adicionales en formato condensado */}
          <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
            <div className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🔒</span>
                6. Seguridad
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Implementamos medidas técnicas y organizativas apropiadas para proteger
                tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </div>

            <div className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🌍</span>
                7. Transferencias internacionales
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Algunos proveedores procesan datos fuera del EEE. Nos aseguramos de que
                se implementen las salvaguardas adecuadas.
              </p>
            </div>

            <div className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">⏱️</span>
                8. Retención de datos
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Conservamos tu información personal solo durante el tiempo necesario para
                cumplir con los fines descritos en esta política.
              </p>
            </div>

            <div className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">👶</span>
                9. Menores de edad
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos
                intencionadamente información personal de menores de 16 años.
              </p>
            </div>
          </div>

          {/* Sección de contacto y cambios */}
          <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
            <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">📞</span>
              10. Contacto y cambios
            </h3>
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <div className="card-golden bg-white/50">
                <h4 className="font-bold mb-[0.618rem] text-orange-700">📧 Contacto</h4>
                <ul className="text-sm text-orange-800 space-golden-xs">
                  <li>• Email: privacy@nutrifit-calculator.com</li>
                  <li>• Formulario de contacto en nuestro sitio web</li>
                </ul>
              </div>
              <div className="card-golden bg-white/50">
                <h4 className="font-bold mb-[0.618rem] text-orange-700">🔄 Cambios</h4>
                <p className="text-sm text-orange-800 leading-[1.618]">
                  Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios
                  significativos a través de nuestro sitio web.
                </p>
              </div>
            </div>
          </div>

          {/* Aviso especial sobre datos de salud */}
          <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-900 mb-[1rem] text-lg flex items-center">
              <span className="text-2xl mr-3">🩺</span>
              Tratamiento de datos de salud
            </h3>
            <p className="text-sm text-yellow-800 leading-[1.618]">
              Los datos que introduces en nuestras calculadoras (peso, altura, etc.)
              se procesan únicamente en tu dispositivo y no se almacenan en nuestros servidores.
              Esta información no se utiliza para diagnósticos médicos y siempre debe complementarse
              con el consejo de profesionales de la salud.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}