import { Container } from '@/components/Container';

export const metadata = {
  title: 'Política de Cookies - Calculadora Fitness',
  description: 'Información sobre el uso de cookies en Calculadora Fitness.',
};

export default function CookiesPage() {
  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto prose prose-gray">
        <h1>Política de Cookies</h1>
        
        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <h2>1. ¿Qué son las cookies?</h2>
        
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
          cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar 
          tu experiencia de navegación.
        </p>

        <h2>2. Tipos de cookies que utilizamos</h2>
        
        <h3>2.1 Cookies necesarias</h3>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 mb-0">
            <strong>Siempre activas.</strong> Esenciales para el funcionamiento básico del sitio.
          </p>
        </div>
        <ul>
          <li><strong>Consentimiento de cookies:</strong> Recuerda tus preferencias de cookies</li>
          <li><strong>Configuración de tema:</strong> Modo oscuro/claro</li>
          <li><strong>Funcionalidad básica:</strong> Navegación y formularios</li>
        </ul>

        <h3>2.2 Cookies analíticas</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 mb-0">
            <strong>Opcionales.</strong> Nos ayudan a entender cómo utilizas el sitio.
          </p>
        </div>
        <ul>
          <li><strong>Google Analytics:</strong> Análisis de tráfico y comportamiento</li>
          <li><strong>Métricas de rendimiento:</strong> Velocidad de carga y errores</li>
          <li><strong>Estadísticas de uso:</strong> Páginas más visitadas</li>
        </ul>

        <h3>2.3 Cookies publicitarias</h3>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-800 mb-0">
            <strong>Opcionales.</strong> Para mostrar anuncios relevantes y financiar el sitio.
          </p>
        </div>
        <ul>
          <li><strong>Google AdSense:</strong> Publicidad personalizada</li>
          <li><strong>Remarketing:</strong> Anuncios basados en tu navegación</li>
          <li><strong>Segmentación:</strong> Anuncios relevantes a tus intereses</li>
        </ul>

        <h2>3. Finalidades específicas</h2>
        
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-left">Finalidad</th>
              <th className="border border-gray-300 p-2 text-left">Tipo</th>
              <th className="border border-gray-300 p-2 text-left">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Consentimiento de cookies</td>
              <td className="border border-gray-300 p-2">Necesaria</td>
              <td className="border border-gray-300 p-2">1 año</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Google Analytics</td>
              <td className="border border-gray-300 p-2">Analítica</td>
              <td className="border border-gray-300 p-2">2 años</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Google AdSense</td>
              <td className="border border-gray-300 p-2">Publicitaria</td>
              <td className="border border-gray-300 p-2">2 años</td>
            </tr>
          </tbody>
        </table>

        <h2>4. Control de cookies</h2>
        
        <h3>4.1 Banner de consentimiento</h3>
        <p>
          Cuando visitas nuestro sitio por primera vez, aparece un banner que te permite:
        </p>
        <ul>
          <li>Aceptar todas las cookies</li>
          <li>Rechazar cookies opcionales (solo necesarias)</li>
          <li>Configurar preferencias detalladas</li>
        </ul>

        <h3>4.2 Gestión posterior</h3>
        <p>
          Puedes cambiar tus preferencias en cualquier momento:
        </p>
        <ul>
          <li>A través del enlace en el footer de la web</li>
          <li>En la configuración de tu navegador</li>
          <li>Borrando las cookies existentes</li>
        </ul>

        <h3>4.3 Configuración del navegador</h3>
        <p>
          También puedes gestionar cookies directamente en tu navegador:
        </p>
        <ul>
          <li><strong>Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies</li>
          <li><strong>Firefox:</strong> Preferencias &gt; Privacidad y seguridad</li>
          <li><strong>Safari:</strong> Preferencias &gt; Privacidad</li>
          <li><strong>Edge:</strong> Configuración &gt; Cookies y permisos del sitio</li>
        </ul>

        <h2>5. Cookies de terceros</h2>
        
        <h3>5.1 Google Analytics</h3>
        <p>
          Utilizamos Google Analytics para analizar el uso de nuestro sitio. Google puede 
          utilizar estos datos según su propia política de privacidad.
        </p>
        <ul>
          <li><strong>Más información:</strong> <a href="https://policies.google.com/privacy" target=\"_blank" rel="noopener">Política de privacidad de Google</a></li>
          <li><strong>Opt-out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target=\"_blank" rel="noopener">Plugin de exclusión de Google Analytics</a></li>
        </ul>

        <h3>5.2 Google AdSense</h3>
        <p>
          Mostramos anuncios a través de Google AdSense para financiar el mantenimiento 
          del sitio gratuito.
        </p>
        <ul>
          <li><strong>Personalización:</strong> <a href="https://adssettings.google.com/" target=\"_blank" rel="noopener">Configuración de anuncios de Google</a></li>
          <li><strong>Más información:</strong> <a href="https://policies.google.com/technologies/ads" target=\"_blank" rel="noopener">Cómo utiliza Google las cookies publicitarias</a></li>
        </ul>

        <h2>6. Impacto del rechazo de cookies</h2>
        
        <p>
          Si rechazas las cookies opcionales:
        </p>
        <ul>
          <li><strong>Funcionalidad:</strong> El sitio funcionará con normalidad</li>
          <li><strong>Análisis:</strong> No podremos mejorar el sitio basándonos en tu uso</li>
          <li><strong>Publicidad:</strong> Los anuncios serán genéricos, no personalizados</li>
          <li><strong>Financiación:</strong> Menor capacidad de mantener el sitio gratuito</li>
        </ul>

        <h2>7. Actualizaciones de la política</h2>
        
        <p>
          Podemos actualizar esta política de cookies ocasionalmente. Te informaremos 
          de cambios significativos a través de nuestro sitio web.
        </p>

        <h2>8. Contacto</h2>
        
        <p>
          Si tienes preguntas sobre el uso de cookies, contacta con nosotros:
        </p>
        <ul>
          <li>Email: cookies@calculadora-fitness.com</li>
          <li>Formulario de contacto en nuestro sitio web</li>
        </ul>

        <div className="bg-green-50 p-6 rounded-lg mt-8">
          <h3 className="font-semibold text-green-900 mb-2">
            ✅ Compromiso de transparencia
          </h3>
          <p className="text-sm text-green-800">
            Nos comprometemos a ser transparentes sobre el uso de cookies y a darte 
            control total sobre tus preferencias. Solo utilizamos las cookies necesarias 
            para proporcionar un servicio de calidad.
          </p>
        </div>
      </div>
    </Container>
  );
}