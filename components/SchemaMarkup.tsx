// Server Component - no requiere interactividad
import { CalculatorConfig } from '@/lib/calculators';
import { generateAllSchemas, generateCalculatorSchemaByKey } from '@/lib/schema';

interface SchemaMarkupProps {
  calculator?: CalculatorConfig;
  calculatorKey?: string;
}

export function SchemaMarkup({ calculator, calculatorKey }: SchemaMarkupProps) {
  let schemas;

  if (calculatorKey) {
    // Usar el sistema automático basado en la key
    schemas = generateCalculatorSchemaByKey(calculatorKey);
  } else if (calculator) {
    // Usar la calculadora específica proporcionada
    schemas = generateAllSchemas(calculator);
  } else {
    // Fallback: solo schema básico del sitio
    schemas = generateAllSchemas();
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
