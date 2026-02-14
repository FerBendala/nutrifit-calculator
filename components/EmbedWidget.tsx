'use client';

import { trackEmbedCodeCopied } from '@/lib/analytics';
import { getCanonicalUrl } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

interface EmbedWidgetProps {
  title?: string;
  calculatorName?: string;
}

export function EmbedWidget({ title, calculatorName }: EmbedWidgetProps = {}) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const { embedCode, calculatorTitle } = useMemo(() => {
    const currentUrl = getCanonicalUrl(pathname);

    // Determinar el título de la calculadora según la ruta
    let pageTitle = title || calculatorName || 'Calculadora de Calorías y Macros';

    if (!title && !calculatorName) {
      switch (pathname) {
        case '/':
          pageTitle = 'Calculadora de Calorías y Macros';
          break;
        case '/imc':
          pageTitle = 'Calculadora de IMC';
          break;
        case '/tdee':
          pageTitle = 'Calculadora TDEE';
          break;
        case '/proteina':
          pageTitle = 'Calculadora de Proteína Diaria';
          break;
        case '/agua':
          pageTitle = 'Calculadora de Hidratación';
          break;
        case '/composicion':
          pageTitle = 'Calculadora de Composición Corporal';
          break;
        case '/ritmo-cardiaco':
          pageTitle = 'Calculadora de Ritmo Cardíaco';
          break;
        default:
          pageTitle = 'Calculadora Fitness - NutriFit';
      }
    }

    const embedCode = `<iframe 
    src="${currentUrl}" 
    width="100%" 
    height="700" 
    frameborder="0" 
    title="${pageTitle} - NutriFit Calculator"
    style="border: 1px solid #e2e8f0; border-radius: 8px; background: white;"
    loading="lazy"
  >
    <p>Tu navegador no soporta iframes. <a href="${currentUrl}" target="_blank" rel="noopener">Visita ${pageTitle}</a></p>
  </iframe>
  <p style="font-size: 12px; color: #666; margin-top: 8px; text-align: center;">
    Calculadora gratuita por <a href="https://nutrifit-calculator.com/" target="_blank" rel="noopener" style="color: #2563eb;">NutriFit Calculator</a>
  </p>`;

    return { embedCode, calculatorTitle: pageTitle };
  }, [pathname, title, calculatorName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      trackEmbedCodeCopied(calculatorTitle);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ExternalLink className="h-5 w-5" />
          <span>Embebe &quot;{calculatorTitle}&quot; en tu sitio web</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Copia y pega este código en tu sitio web para ofrecer esta calculadora a tus visitantes.
          Es completamente gratuito y ayuda a tus usuarios con herramientas útiles.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Código HTML para embeber:</label>
          <Textarea
            value={embedCode}
            readOnly
            className="font-mono text-xs h-40 resize-none"
            onClick={(e) => e.currentTarget.select()}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            ✅ Responsive • ✅ Accesible • ✅ Gratuito
          </div>
          <Button onClick={handleCopy} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copiado!' : 'Copiar código'}
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Beneficios para tu sitio web:
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Aporta valor adicional a tus visitantes</li>
            <li>• Herramienta profesional sin coste de desarrollo</li>
            <li>• Mejora el tiempo de permanencia en tu sitio</li>
            <li>• Contenido interactivo y útil</li>
          </ul>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">
            📋 Términos de uso:
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Uso completamente gratuito para sitios web no comerciales y comerciales</li>
            <li>• Mantén el enlace de atribución para cumplir con los términos</li>
            <li>• No modifiques el código del iframe</li>
            <li>• Perfecto para blogs, sitios de fitness, nutrición y salud</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
