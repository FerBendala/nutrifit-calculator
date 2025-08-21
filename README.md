# 🧮 Calculadora Fitness

Una aplicación web ultra rápida y minimalista en español para calcular calorías, macronutrientes, IMC, TDEE, proteína diaria y agua diaria. Optimizada para SEO y monetizada con Google AdSense.

## ✨ Características

- **Calculadora principal**: Calorías y distribución de macronutrientes basada en Mifflin-St Jeor
- **Calculadoras adicionales**: IMC, TDEE, Proteína diaria, Agua diaria  
- **100% client-side**: Sin backend, cálculos deterministas en el navegador
- **SEO optimizado**: Metadata, JSON-LD, sitemap, robots.txt
- **Monetización**: Google AdSense con banner de consentimiento GDPR
- **Accesible**: Navegación con teclado, ARIA labels, contraste adecuado
- **Responsive**: Diseño mobile-first que funciona en todos los dispositivos
- **Rendimiento**: Lighthouse >95 en todas las métricas

## 🚀 Tecnologías

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Estilos**: TailwindCSS + shadcn/ui
- **Testing**: Vitest + Testing Library + Playwright
- **SEO**: Metadata automática + OG images dinámicas
- **Analítica**: Google Tag Manager
- **Monetización**: Google AdSense
- **Deploy**: Vercel

## 📦 Instalación y uso

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd calculadora-fitness

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus IDs de GTM y AdSense
```

### Variables de entorno

```bash
# .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### Comandos disponibles

```bash
# Desarrollo
pnpm dev          # Servidor de desarrollo en http://localhost:3000

# Testing  
pnpm test         # Tests unitarios con Vitest
pnpm test:watch   # Tests en modo watch
pnpm e2e          # Tests E2E con Playwright
pnpm e2e:ui       # Tests E2E con interfaz visual

# Build y deploy
pnpm build        # Build para producción
pnpm start        # Servidor de producción local
pnpm lint         # Linting con ESLint

# Calidad
pnpm type-check   # Verificación de TypeScript
```

## 🧮 Funcionalidades principales

### Calculadora de calorías y macros (Página principal)

**Inputs:**
- Sexo biológico (hombre/mujer)
- Edad, altura (cm), peso (kg)
- Nivel de actividad física (5 niveles)
- Objetivo: Perder grasa (-20%), Mantener (0%), Ganar músculo (+10%)

**Outputs:**
- TDEE (calorías de mantenimiento)
- Calorías objetivo ajustadas
- Distribución de macronutrientes (g proteína, g grasa, g carbohidratos)
- Botón para copiar resultados al portapapeles

**Fórmulas:**
- **BMR**: Mifflin-St Jeor equation
  - Hombres: `10*kg + 6.25*cm - 5*edad + 5`  
  - Mujeres: `10*kg + 6.25*cm - 5*edad - 161`
- **TDEE**: `BMR * factor_actividad`
- **Macros**: Distribución optimizada por objetivo científicamente respaldada

### Calculadoras secundarias

1. **IMC**: Cálculo con categorías OMS
2. **TDEE**: Gasto calórico diario con explicaciones
3. **Proteína**: Necesidades según peso y actividad (1.6-2.4g/kg)
4. **Agua**: Hidratación óptima (30-35ml/kg + ajustes por actividad)

## 📊 SEO y rendimiento

### Optimización SEO

- **Metadata única** por página (title, description, keywords)
- **JSON-LD** structured data para cada calculadora
- **Open Graph** + Twitter Cards con imágenes dinámicas
- **Sitemap.xml** + robots.txt automáticos
- **URLs limpias** y estructura jerárquica
- **H1 único** por página con contenido explicativo

### Rendimiento

- **Lighthouse >95** en todas las métricas
- **Client-side** rendering para cálculos instantáneos
- **Lazy loading** de ads tras consentimiento
- **Optimización** de imágenes y assets
- **Core Web Vitals** optimizados

## 🍪 Privacidad y GDPR

### Banner de consentimiento

- **Cookies necesarias**: Siempre activas (funcionalidad básica)
- **Cookies analíticas**: Google Analytics (opcional)
- **Cookies publicitarias**: Google AdSense (opcional)
- **Gestión granular** de preferencias
- **Carga diferida** de scripts tras consentimiento

### Páginas legales

- `/privacidad`: Política de privacidad completa
- `/terminos`: Términos de uso con avisos médicos
- `/cookies`: Gestión detallada de cookies

## 💰 Monetización

### Google AdSense

- **Integración responsiva** con slots configurables
- **Carga condicional** tras consentimiento del usuario
- **Placeholders** para desarrollo sin IDs reales
- **Optimización UX** sin afectar métricas Core Web Vitals

### Google Analytics

- **Tracking** de eventos y conversiones
- **Privacy-friendly** con anonimización IP
- **Opt-out** respetado automáticamente

## 🧪 Testing

### Tests unitarios (Vitest)

```bash
# Ejecutar todos los tests
pnpm test

# Tests específicos  
pnpm test formulas.test.ts
pnpm test calculatorForm.test.tsx
```

**Cobertura:**
- ✅ Fórmulas matemáticas con casos conocidos
- ✅ Validaciones de formularios
- ✅ Componentes React con interacciones
- ✅ Límites y casos edge

### Tests E2E (Playwright)

```bash
# Ejecutar tests E2E
pnpm e2e

# Con interfaz visual
pnpm e2e:ui
```

**Escenarios cubiertos:**
- ✅ Flujo completo de calculadora principal
- ✅ Navegación entre páginas
- ✅ Validación de formularios
- ✅ Banner de consentimiento
- ✅ Accesibilidad básica
- ✅ Responsive design

## 📱 Accesibilidad

- **Navegación completa** con teclado
- **Labels semánticos** en todos los inputs
- **ARIA attributes** apropiados
- **Contraste** cumple WCAG AA
- **Mensajes de error** con rol="alert"
- **Orden de tabulación** lógico

## 🚀 Deploy en Vercel

### Deploy automático

1. **Conecta** tu repositorio a Vercel
2. **Configura** las variables de entorno en Vercel Dashboard
3. **Deploy** automático en cada push a main

### Variables de entorno en Vercel

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX  
NEXT_PUBLIC_SITE_URL=https://tu-app.vercel.app
```

### Verificación post-deploy

- [ ] ✅ Sitio carga correctamente
- [ ] ✅ Calculadoras funcionan
- [ ] ✅ Ads cargan tras consentimiento  
- [ ] ✅ Analytics trackea eventos
- [ ] ✅ Sitemap.xml accesible
- [ ] ✅ OG images se generan
- [ ] ✅ Lighthouse >95 en móvil

## ⚠️ Avisos importantes

### Responsabilidad médica

> **CRÍTICO**: Esta aplicación proporciona estimaciones basadas en fórmulas poblacionales. Los resultados son orientativos y NO constituyen consejo médico. Siempre se debe consultar con profesionales de la salud para recomendaciones personalizadas.

### Precisión de cálculos

- Las fórmulas son científicamente respaldadas pero **estimaciones**
- La **variabilidad individual** puede ser significativa
- Recomendamos **ajustes graduales** basados en resultados reales
- Para poblaciones especiales (atletas, mayores, condiciones médicas) se requiere **supervisión profesional**

### Política de datos

- **Cálculos locales**: Ningún dato personal se envía a servidores
- **Cookies opcionales**: Analytics y ads solo tras consentimiento explícito
- **Transparencia total**: Código abierto y auditabilidad completa

## 🤝 Contribuir

### Reportar bugs

1. Verificar issues existentes
2. Reproducir en build de producción  
3. Incluir datos de entrada que causan el problema
4. Especificar navegador/dispositivo

### Mejoras de fórmulas

1. Referenciar papers científicos
2. Incluir tests que validen casos conocidos
3. Documentar limitaciones y aplicabilidad
4. Mantener compatibilidad con datos existentes

### Guidelines de código

- **TypeScript strict** mode
- **Tests** para nuevas funcionalidades
- **Accesibilidad** en todos los componentes
- **SEO** optimizado para nuevas páginas
- **Mobile-first** responsive design

## 📄 Licencia

MIT License - Ver `LICENSE` file para detalles.

---

## 📞 Soporte

- **Issues**: GitHub Issues para bugs y feature requests
- **Documentación**: Este README + comentarios en código
- **Comunidad**: Discussions para preguntas generales

**¡Calculadora Fitness - Herramientas gratuitas para tu bienestar! 💪**