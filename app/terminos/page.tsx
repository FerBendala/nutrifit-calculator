import { Container } from '@/components/Container';

export const metadata = {
  title: 'Términos de Uso - Calculadora Fitness',
  description: 'Términos y condiciones de uso de las calculadoras de fitness y nutrición.',
};

export default function TerminosPage() {
  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto prose prose-gray">
        <h1>Términos de Uso</h1>
        
        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <h2>1. Aceptación de los términos</h2>
        
        <p>
          Al acceder y utilizar Calculadora Fitness, aceptas estar sujeto a estos términos 
          de uso y a nuestra política de privacidad. Si no estás de acuerdo con alguna 
          parte de estos términos, no debes utilizar nuestros servicios.
        </p>

        <h2>2. Descripción del servicio</h2>
        
        <p>
          Calculadora Fitness proporciona herramientas gratuitas de cálculo para:
        </p>
        <ul>
          <li>Calorías y macronutrientes</li>
          <li>Índice de Masa Corporal (IMC)</li>
          <li>Gasto Energético Diario Total (TDEE)</li>
          <li>Necesidades de proteína</li>
          <li>Requerimientos de hidratación</li>
        </ul>

        <h2>3. Limitaciones y descargo de responsabilidad</h2>
        
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">
            ⚠️ AVISO MÉDICO IMPORTANTE
          </h3>
          <p className="text-sm text-red-800">
            Los cálculos y recomendaciones proporcionados por nuestras herramientas son 
            únicamente informativos y NO constituyen consejo médico, diagnóstico o tratamiento.
          </p>
        </div>

        <h3>3.1 Naturaleza informativa</h3>
        <ul>
          <li>Todas las calculadoras proporcionan estimaciones basadas en fórmulas generales</li>
          <li>Los resultados pueden no ser precisos para todos los individuos</li>
          <li>No reemplazan la consulta con profesionales de la salud</li>
          <li>No son apropiados para diagnóstico médico</li>
        </ul>

        <h3>3.2 Limitación de responsabilidad</h3>
        <p>
          Calculadora Fitness no se hace responsable de:
        </p>
        <ul>
          <li>Decisiones tomadas basadas en nuestros cálculos</li>
          <li>Problemas de salud derivados del uso de la información</li>
          <li>Pérdidas o daños por el uso de nuestros servicios</li>
          <li>Inexactitudes en los cálculos por datos incorrectos</li>
        </ul>

        <h2>4. Uso apropiado del servicio</h2>
        
        <h3>4.1 Usos permitidos</h3>
        <p>Puedes utilizar nuestros servicios para:</p>
        <ul>
          <li>Obtener estimaciones informativas sobre nutrición y fitness</li>
          <li>Uso personal y no comercial</li>
          <li>Fines educativos</li>
        </ul>

        <h3>4.2 Usos prohibidos</h3>
        <p>No puedes:</p>
        <ul>
          <li>Utilizar la información para diagnóstico médico</li>
          <li>Redistribuir o revender nuestros servicios</li>
          <li>Intentar hackear o comprometer la seguridad del sitio</li>
          <li>Utilizar automatización para acceder masivamente al servicio</li>
        </ul>

        <h2>5. Recomendaciones de uso responsable</h2>
        
        <ul>
          <li>Consulta con profesionales antes de cambios significativos en dieta o ejercicio</li>
          <li>Utiliza los resultados como punto de partida, no como verdad absoluta</li>
          <li>Ajusta las recomendaciones según tu respuesta individual</li>
          <li>Busca consejo médico si tienes condiciones de salud preexistentes</li>
        </ul>

        <h2>6. Propiedad intelectual</h2>
        
        <p>
          El contenido, diseño y funcionalidad de Calculadora Fitness están protegidos 
          por derechos de autor y otras leyes de propiedad intelectual.
        </p>

        <h2>7. Privacidad y datos</h2>
        
        <p>
          Tu privacidad es importante para nosotros. Consulta nuestra 
          <a href="/privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </a> para entender cómo manejamos tu información.
        </p>

        <h2>8. Modificaciones del servicio</h2>
        
        <p>
          Nos reservamos el derecho de modificar, suspender o discontinuar cualquier 
          parte de nuestros servicios en cualquier momento sin previo aviso.
        </p>

        <h2>9. Cambios en los términos</h2>
        
        <p>
          Podemos actualizar estos términos ocasionalmente. Los cambios significativos 
          se comunicarán a través de nuestro sitio web.
        </p>

        <h2>10. Ley aplicable</h2>
        
        <p>
          Estos términos se rigen por las leyes españolas y de la Unión Europea.
        </p>

        <h2>11. Contacto</h2>
        
        <p>
          Si tienes preguntas sobre estos términos, contacta con nosotros:
        </p>
        <ul>
          <li>Email: legal@calculadora-fitness.com</li>
          <li>Formulario de contacto en nuestro sitio web</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-lg mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            📋 Resumen para profesionales de la salud
          </h3>
          <p className="text-sm text-blue-800">
            Si eres profesional de la salud, puedes utilizar nuestras herramientas 
            como apoyo en consulta, pero siempre bajo tu criterio profesional y 
            responsabilidad clínica.
          </p>
        </div>
      </div>
    </Container>
  );
}