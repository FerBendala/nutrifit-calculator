# Configuración de Deployment

Este proyecto está configurado para desplegarse en **Netlify**.

## Archivos de Configuración

### ✅ Archivo Activo: `netlify.toml`

Este es el archivo de configuración que Netlify usa actualmente. Contiene:
- Configuración de build (`npm run build` → `out/`)
- Redirecciones para trailing slash
- Headers de seguridad y cache

**Ubicación**: `netlify.toml` (raíz del proyecto)

### 📦 Archivo Archivado: `vercel.json`

Este archivo **NO se usa** en el deployment actual. Se mantiene por:
- Compatibilidad futura si el proyecto se migra a Vercel
- Referencia de configuración
- No interfiere con Netlify

**Ubicación**: `vercel.json` (raíz del proyecto)

## Configuración de Trailing Slash

El proyecto está configurado para usar **trailing slash en todas las URLs**:

### Next.js (`next.config.js`)
```js
{
  output: 'export',
  trailingSlash: true
}
```

### Netlify (`netlify.toml`)
```toml
[[redirects]]
  from = "/:path"
  to = "/:path/"
  status = 301
```

### Enlaces Internos
Todos los enlaces en el código tienen trailing slash:
```tsx
<a href="/imc/">Calculadora IMC</a>
```

## Guía de Deployment

Consulta **[NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)** para instrucciones detalladas de:
- Cómo hacer deploy
- Verificación post-deploy
- Troubleshooting
- Monitoreo

## Estructura de URLs

Todas las URLs del sitio terminan con `/`:
- ✅ `https://tudominio.com/` (home)
- ✅ `https://tudominio.com/imc/`
- ✅ `https://tudominio.com/blog/`
- ✅ `https://tudominio.com/blog/articulo/`

Las URLs sin trailing slash redirigen automáticamente (301):
- ❌ `https://tudominio.com/imc` → ✅ `https://tudominio.com/imc/`

## Troubleshooting Rápido

### Problema: URLs sin trailing slash no redirigen

1. Verifica que `netlify.toml` esté en la raíz
2. Limpia el cache de Netlify y redeploy
3. Verifica los logs de build

### Problema: Enlaces rotos en el sitio

1. Verifica que los enlaces en el código tengan trailing slash
2. Verifica que el build generó las carpetas correctamente en `out/`
3. Revisa el sitemap: `https://tudominio.com/sitemap.xml`

## Migración Futura a Vercel

Si decides migrar a Vercel en el futuro:

1. El archivo `vercel.json` ya está listo
2. Vercel leerá automáticamente la configuración
3. No es necesario cambiar el código (ya tiene trailing slash)
4. Solo necesitarás conectar el repo en Vercel

## Contacto

Para preguntas sobre el deployment, consulta:
- [Documentación de Netlify](https://docs.netlify.com/)
- [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
