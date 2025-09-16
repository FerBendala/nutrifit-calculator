# 🚀 Guía del Sistema Automático de Schema Markup

## ✅ **Sistema Implementado**

El sistema de Schema Markup ahora es **completamente automático** para futuras calculadoras. No necesitas modificar código adicional.

## 📋 **Cómo Añadir una Nueva Calculadora**

### **1. Añadir a CALCULATORS**

```typescript
// En lib/calculators.ts
export const CALCULATORS: CalculatorConfig[] = [
  // ... calculadoras existentes
  {
    key: 'nueva-calculadora',
    title: 'Calculadora de Nueva Funcionalidad',
    href: '/nueva-calculadora',
    description: 'Descripción de la nueva calculadora',
    icon: NewIcon,
    priority: 'high',
    category: 'nutrition', // 'nutrition' | 'body-composition' | 'fitness' | 'health'
    relatedCalculators: ['home', 'imc'],
  },
];
```

### **2. Crear la Página**

```typescript
// En app/nueva-calculadora/page.tsx
import { SchemaMarkup } from '@/components/SchemaMarkup';

export default function NuevaCalculadoraPage() {
  return (
    <>
      <SchemaMarkup calculatorKey='nueva-calculadora' />
      {/* Tu contenido aquí */}
    </>
  );
}
```

## 🎯 **¡Eso es todo!**

El sistema automáticamente generará:

- ✅ **WebApplication Schema** (actualizado con la nueva calculadora)
- ✅ **SoftwareApplication Schema** (específico para la calculadora)
- ✅ **HowTo Schema** (pasos basados en la categoría)
- ✅ **Website Schema** (lista actualizada de calculadoras)

## 📊 **Pasos Automáticos por Categoría**

### **Nutrition** (4 pasos)

1. Introduce tus datos básicos
2. Selecciona tu nivel de actividad
3. Define tu objetivo nutricional
4. Obtén tus resultados

### **Body Composition** (3 pasos)

1. Introduce tus medidas
2. Añade medidas adicionales
3. Obtén tu análisis

### **Fitness** (3 pasos)

1. Introduce tus datos
2. Selecciona tu nivel de entrenamiento
3. Obtén tus métricas

### **Health** (3 pasos)

1. Introduce tus datos básicos
2. Selecciona tu nivel de actividad
3. Obtén tus recomendaciones

## 🔧 **Funciones Disponibles**

```typescript
// Generar Schema para una calculadora específica
<SchemaMarkup calculatorKey="imc" />

// Generar Schema para todas las calculadoras
<SchemaMarkup />

// Generar Schema con calculadora específica (modo manual)
<SchemaMarkup calculator={calculatorObject} />
```

## 🧪 **Verificar que Funciona**

```bash
# Ejecutar script de prueba
node scripts/test-auto-schema.js

# Verificar Schema en Google
# https://search.google.com/test/rich-results
```

## 🎉 **Beneficios del Sistema Automático**

- ✅ **Cero configuración** para nuevas calculadoras
- ✅ **Consistencia** en todos los Schema Markup
- ✅ **Mantenimiento mínimo** - solo añadir a CALCULATORS
- ✅ **Escalabilidad** - funciona con cualquier número de calculadoras
- ✅ **Categorización inteligente** - pasos automáticos por categoría

## 📝 **Ejemplo Completo**

```typescript
// 1. Añadir a CALCULATORS
{
  key: 'calorias-quemadas',
  title: 'Calculadora de Calorías Quemadas',
  href: '/calorias-quemadas',
  description: 'Calcula las calorías quemadas en ejercicio',
  icon: FireIcon,
  priority: 'medium',
  category: 'fitness',
  relatedCalculators: ['tdee', 'home']
}

// 2. Crear página
export default function CaloriasQuemadasPage() {
  return (
    <>
      <SchemaMarkup calculatorKey="calorias-quemadas" />
      {/* Contenido de la calculadora */}
    </>
  );
}
```

**¡El Schema Markup se generará automáticamente!** 🚀
