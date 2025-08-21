import { Container } from '@/components/Container';

export const metadata = {
  title: 'Política de Privacidad - NutriFit Calculator',
  description: 'Información sobre cómo recopilamos, usamos y protegemos tus datos personales en NutriFit Calculator.',
};

export default function PrivacidadPage() {
  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto prose prose-gray">
        <h1>Política de Privacidad</h1>

        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <h2>1. Información que recopilamos</h2>

        <h3>1.1 Información que proporcionas</h3>
        <p>
          Cuando utilizas nuestras calculadoras, puedes proporcionar información como:
        </p>
        <ul>
          <li>Datos físicos (peso, altura, edad, sexo)</li>
          <li>Información de actividad física</li>
          <li>Objetivos de fitness</li>
        </ul>

        <p>
          <strong>Importante:</strong> Toda esta información se procesa localmente en tu navegador
          y no se envía a nuestros servidores.
        </p>

        <h3>1.2 Información automática</h3>
        <p>
          Cuando visitas nuestro sitio, podemos recopilar automáticamente:
        </p>
        <ul>
          <li>Información del navegador y dispositivo</li>
          <li>Dirección IP</li>
          <li>Páginas visitadas y tiempo de navegación</li>
          <li>Cookies y tecnologías similares</li>
        </ul>

        <h2>2. Cómo usamos tu información</h2>

        <p>Utilizamos la información recopilada para:</p>
        <ul>
          <li>Proporcionar y mejorar nuestros servicios</li>
          <li>Realizar análisis de uso (Google Analytics)</li>
          <li>Mostrar publicidad relevante (Google AdSense)</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>

        <h2>3. Cookies y tecnologías de seguimiento</h2>

        <h3>3.1 Tipos de cookies</h3>
        <ul>
          <li><strong>Necesarias:</strong> Esenciales para el funcionamiento del sitio</li>
          <li><strong>Analíticas:</strong> Google Analytics para entender el uso del sitio</li>
          <li><strong>Publicitarias:</strong> Google AdSense para mostrar anuncios relevantes</li>
        </ul>

        <h3>3.2 Control de cookies</h3>
        <p>
          Puedes gestionar tus preferencias de cookies a través de nuestro banner de consentimiento
          o configurar tu navegador para rechazarlas.
        </p>

        <h2>4. Compartir información con terceros</h2>

        <p>Podemos compartir tu información con:</p>
        <ul>
          <li><strong>Google Analytics:</strong> Para análisis de uso</li>
          <li><strong>Google AdSense:</strong> Para publicidad personalizada</li>
          <li><strong>Proveedores de hosting:</strong> Vercel para alojar el sitio</li>
        </ul>

        <h2>5. Tus derechos</h2>

        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Rectificar información inexacta</li>
          <li>Solicitar la eliminación de tus datos</li>
          <li>Retirar el consentimiento en cualquier momento</li>
          <li>Portabilidad de datos</li>
        </ul>

        <h2>6. Seguridad</h2>

        <p>
          Implementamos medidas técnicas y organizativas apropiadas para proteger
          tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
        </p>

        <h2>7. Transferencias internacionales</h2>

        <p>
          Algunos de nuestros proveedores de servicios pueden procesar datos fuera del EEE.
          En estos casos, nos aseguramos de que se implementen las salvaguardas adecuadas.
        </p>

        <h2>8. Retención de datos</h2>

        <p>
          Conservamos tu información personal solo durante el tiempo necesario para
          cumplir con los fines descritos en esta política.
        </p>

        <h2>9. Menores de edad</h2>

        <p>
          Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos
          intencionadamente información personal de menores de 16 años.
        </p>

        <h2>10. Cambios en esta política</h2>

        <p>
          Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios
          significativos a través de nuestro sitio web.
        </p>

        <h2>11. Contacto</h2>

        <p>
          Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de:
        </p>
        <ul>
          <li>Email: privacy@nutrifit-calculator.com</li>
          <li>Formulario de contacto en nuestro sitio web</li>
        </ul>

        <div className="bg-yellow-50 p-6 rounded-lg mt-8">
          <h3 className="font-semibold text-yellow-900 mb-2">
            ⚠️ Aviso importante sobre datos de salud
          </h3>
          <p className="text-sm text-yellow-800">
            Los datos que introduces en nuestras calculadoras (peso, altura, etc.)
            se procesan únicamente en tu dispositivo y no se almacenan en nuestros servidores.
            Esta información no se utiliza para diagnósticos médicos.
          </p>
        </div>
      </div>
    </Container>
  );
}