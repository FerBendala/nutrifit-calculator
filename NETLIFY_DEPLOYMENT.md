# Guía de Despliegue en Netlify

Este documento explica cómo desplegar y verificar el sitio en Netlify con trailing slashes correctamente configurados.

## Configuración Completada

✅ **netlify.toml** creado con:
- Build settings
- Redirecciones para trailing slash
- Headers de seguridad y cache

✅ **next.config.js** configurado con:
- `trailingSlash: true`
- `output: 'export'`

✅ **Enlaces internos** actualizados con trailing slash
✅ **Sitemap** generando URLs con trailing slash

## Pasos para Desplegar en Netlify

### 1. Hacer Commit y Push

```bash
git add .
git commit -m "feat: configurar trailing slash para Netlify"
git push origin main
```

### 2. En el Dashboard de Netlify

1. Ve a tu sitio en Netlify
2. Ve a **Site settings** → **Build & deploy** → **Build settings**
3. Verifica que detecte automáticamente el `netlify.toml`
4. Haz un nuevo deploy: **Deploys** → **Trigger deploy** → **Deploy site**

### 3. Verificación Post-Deploy

Una vez desplegado el sitio, verifica lo siguiente:

#### A. Redirecciones de Trailing Slash

**CRÍTICO**: Verifica que las rutas redirigen pero los archivos NO:

```bash
# 1. Rutas de calculadoras - Deben redirigir 301 a versión con /
curl -I https://tudominio.com/tdee
# ✅ Debe: HTTP/1.1 301 → Location: /tdee/

curl -I https://tudominio.com/imc
# ✅ Debe: HTTP/1.1 301 → Location: /imc/

curl -I https://tudominio.com/bmr
# ✅ Debe: HTTP/1.1 301 → Location: /bmr/

curl -I https://tudominio.com/blog
# ✅ Debe: HTTP/1.1 301 → Location: /blog/

# 2. Archivos estáticos - NO deben redirigir
curl -I https://tudominio.com/sitemap.xml
# ✅ Debe: HTTP/1.1 200 (NO 301 a /sitemap.xml/)

curl -I https://tudominio.com/robots.txt
# ✅ Debe: HTTP/1.1 200 (NO 301 a /robots.txt/)

curl -I https://tudominio.com/favicon.ico
# ✅ Debe: HTTP/1.1 200 (NO 301 a /favicon.ico/)

curl -I https://tudominio.com/ads.txt
# ✅ Debe: HTTP/1.1 200 (NO 301 a /ads.txt/)

# 3. Versiones con trailing slash - Deben cargar correctamente
curl -I https://tudominio.com/imc/
# ✅ Debe: HTTP/1.1 200

curl -I https://tudominio.com/blog/
# ✅ Debe: HTTP/1.1 200
```

URLs adicionales a verificar:
- `/home` → `/` (301)
- `/proteina` → `/proteina/` (301)
- `/composicion` → `/composicion/` (301)

#### B. Headers de Cache

**CRÍTICO**: Verifica que los headers sean correctos según el tipo de archivo:

```bash
# 1. HTML - Cache corto (5 min) para cambios SEO rápidos
curl -I https://tudominio.com/imc/ | grep Cache-Control
# ✅ Debe: Cache-Control: public, max-age=300, s-maxage=600

# 2. Assets estáticos - Cache largo (1 año) por immutabilidad
curl -I https://tudominio.com/_next/chunks/[archivo].js | grep Cache-Control
# ✅ Debe: Cache-Control: public, max-age=31536000, immutable

# 3. Imágenes/SVG - Cache largo
curl -I https://tudominio.com/icon.svg | grep Cache-Control
# ✅ Debe: Cache-Control: public, max-age=31536000, immutable

# 4. Sitemap - Cache medio (1 hora)
curl -I https://tudominio.com/sitemap.xml | grep -E "Cache-Control|Content-Type"
# ✅ Debe: Cache-Control: public, max-age=3600, s-maxage=7200
# ✅ Debe: Content-Type: application/xml

# 5. Robots.txt - Cache medio (1 hora)
curl -I https://tudominio.com/robots.txt | grep -E "Cache-Control|Content-Type"
# ✅ Debe: Cache-Control: public, max-age=3600, s-maxage=7200
# ✅ Debe: Content-Type: text/plain

# 6. Headers de seguridad (en todos los archivos)
curl -I https://tudominio.com/imc/ | grep -E "X-Content-Type|X-Frame|X-XSS"
# ✅ Debe aparecer:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

#### C. Sitemap y SEO

1. Accede a `https://tudominio.netlify.app/sitemap.xml`
2. Verifica que todas las URLs tengan trailing slash
3. Usa [Google Search Console](https://search.google.com/search-console) para verificar el sitemap
4. Solicita reindexación de las URLs actualizadas

#### D. Navegación Manual

Navega manualmente por el sitio:
- Home: `/`
- Calculadoras: `/imc/`, `/bmr/`, `/tdee/`
- Blog: `/blog/`, `/blog/[slug]/`
- Legal: `/privacidad/`, `/terminos/`, `/cookies/`

Verifica que:
- Todos los enlaces funcionan correctamente
- No hay enlaces rotos
- Las URLs en la barra del navegador tienen trailing slash

## Problemas Comunes y Soluciones

### Problema: sitemap.xml o robots.txt devuelven 404

**Causa**: El redirect global está convirtiendo archivos en carpetas

**Solución:**
1. Verifica que las excepciones en `netlify.toml` estén ANTES del redirect global
2. Las excepciones deben tener `status = 200` (no 301)
3. Redeploy con cache limpio

### Problema: Las redirecciones no funcionan consistentemente

**Causa**: `force = false` permite que Netlify sirva contenido duplicado

**Solución:**
1. Verifica que el redirect global tenga `force = true`
2. Limpia cache de Netlify: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
3. Espera 5 minutos para propagación de CDN

### Problema: HTML se cachea demasiado tiempo

**Causa**: Headers de cache demasiado agresivos

**Solución:**
1. Verifica que `/*.html` tenga `max-age=300` (5 min)
2. NO uses `max-age=3600` para HTML (cambios SEO tardan 1 hora)
3. Assets (JS/CSS/images) SÍ deben tener cache largo

### Problema: Headers no se aplican

**Solución:**
1. Verifica la sintaxis del `netlify.toml` (usa TOML validator)
2. Los headers se aplican después del deploy completo
3. Usa herramientas como [securityheaders.com](https://securityheaders.com) para verificar
4. Revisa los logs de deploy en Netlify

### Problema: 404 en algunas rutas

**Solución:**
1. Verifica que el build haya generado las carpetas correctamente en `out/`
2. Verifica que `next.config.js` tenga `trailingSlash: true`
3. Haz un rebuild completo: `npm run build`
4. Revisa que las carpetas existan: `ls -la out/imc/` debe mostrar `index.html`

## Monitoreo Post-Deploy

### Google Search Console

1. Envía el sitemap actualizado
2. Monitorea errores 404
3. Verifica que las URLs con trailing slash estén indexadas

### Google Analytics

Verifica que las URLs se registren correctamente con trailing slash en los reportes.

### Netlify Analytics

Monitorea:
- Códigos de estado (debe haber 301 redirects)
- Tiempo de carga
- Errores 404 (deben disminuir)

## Rollback (Si es necesario)

Si algo sale mal, puedes hacer rollback rápidamente:

1. En Netlify Dashboard → **Deploys**
2. Encuentra el deploy anterior que funcionaba
3. Click en **⋯** → **Publish deploy**

O revertir el commit en git:

```bash
git revert HEAD
git push origin main
```

## Verificación Obligatoria Post-Deploy (2 minutos)

**IMPORTANTE**: Ejecuta estos comandos después de cada deploy para confirmar que todo funciona:

```bash
# Reemplaza "tudominio.com" con tu dominio real

# ✅ TEST 1: Rutas redirigen a trailing slash
curl -I https://tudominio.com/tdee
# Esperado: HTTP/1.1 301 y header "Location: /tdee/"

curl -I https://tudominio.com/imc
# Esperado: HTTP/1.1 301 y header "Location: /imc/"

# ✅ TEST 2: Archivos NO redirigen (quedan sin /)
curl -I https://tudominio.com/sitemap.xml
# Esperado: HTTP/1.1 200 (NO 301)

curl -I https://tudominio.com/robots.txt
# Esperado: HTTP/1.1 200 (NO 301)

curl -I https://tudominio.com/favicon.ico
# Esperado: HTTP/1.1 200 (NO 301)

# ✅ TEST 3: Headers de cache correctos
curl -I https://tudominio.com/imc/ | grep Cache-Control
# Esperado: max-age=300 (HTML: 5 minutos)

curl -I https://tudominio.com/sitemap.xml | grep Cache-Control
# Esperado: max-age=3600 (XML: 1 hora)

# ✅ TEST 4: Headers de seguridad presentes
curl -I https://tudominio.com/ | grep -E "X-Frame|X-Content|X-XSS"
# Esperado: 3 headers de seguridad presentes
```

Si algún test falla, revisa la sección "Problemas Comunes" más abajo.

## Siguientes Pasos Recomendados

1. ✅ Deploy en Netlify y verificar redirecciones (tests arriba)
2. ✅ Verificar headers de seguridad y cache (tests arriba)
3. ✅ Actualizar sitemap en Google Search Console
4. ✅ Monitorear 404s durante una semana
5. ✅ Verificar que el SEO mejora (menos duplicados)

## Contacto y Soporte

Si encuentras problemas, puedes:
- Revisar los logs de build en Netlify
- Consultar la [documentación de Netlify](https://docs.netlify.com/)
- Verificar el estado de Netlify en [status.netlify.com](https://www.netlifystatus.com/)

## Notas Técnicas

### Por qué force = false en el redirect global

El redirect global `/:path → /:path/` usa `force = false` para evitar redirect loops:

- Con `force = false`: Netlify solo redirige si NO encuentra un archivo estático
- `/masa-muscular` → no existe archivo → 301 a `/masa-muscular/`
- `/masa-muscular/` → existe `masa-muscular/index.html` → 200 sirve el archivo

Si usáramos `force = true`, causaría un loop infinito porque también redigiría las URLs que ya tienen trailing slash.

### Por qué force = true en redirects específicos

Solo los redirects específicos como `/index.html → /` usan `force = true` porque necesitan aplicarse siempre, incluso si el archivo existe.

### Por qué NO hay duplicidad con force = false

Next.js con `trailingSlash: true` genera SOLO archivos en formato `/path/index.html`, nunca `/path.html`. Por lo tanto, no hay archivos alternativos que Netlify pueda servir sin el trailing slash.

### Por qué excepciones explícitas

Los archivos como `sitemap.xml`, `robots.txt`, etc., DEBEN quedar sin trailing slash. Las excepciones con `status = 200` evitan que el redirect global los convierta en carpetas.

### Por qué cache corto en HTML

HTML con cache de 5 minutos permite que cambios de contenido y SEO se reflejen rápidamente, mientras que assets con hash pueden tener cache de 1 año sin riesgo.

## Checklist de Validación Crítica

Después del deploy, verifica estos casos (navegador o curl):

**Redirects de trailing slash:**
- `/tdee` → 301 → `/tdee/`
- `/tdee/` → 200
- `/blog` → 301 → `/blog/`

**Archivos estáticos sin trailing slash:**
- `/sitemap.xml` → 200 (sin redirigir a `/sitemap.xml/`)
- `/robots.txt` → 200 (sin redirigir a `/robots.txt/`)
- `/ads.txt` → 200 (sin redirigir a `/ads.txt/`)

**Home sin duplicidad:**
- `/` → 200
- `/index.html` → 301 → `/`

Si todos estos casos se cumplen: **trailing slash cerrado correctamente**.
