import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background mt-[4.236rem]">
      <div className="container-golden py-[2.618rem]">
        <div className="grid gap-[2.618rem] md:gap-y-[2.618rem] md:gap-x-[4.236rem] md:grid-cols-2 lg:grid-cols-4">
          <div className="space-golden-sm">
            <h3 className="font-bold text-lg mb-[0.618rem]">NutriFit Calculator</h3>
            <p className="text-sm text-muted-foreground leading-[1.618]">
              Herramientas gratuitas para tu salud y nutrición. Calculadoras precisas basadas en fórmulas científicas validadas.
            </p>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Categorías</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/calculadoras/nutricion/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Nutrición
                </Link>
              </li>
              <li>
                <Link href="/calculadoras/composicion-corporal/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Composición Corporal
                </Link>
              </li>
              <li>
                <Link href="/calculadoras/fitness/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Fitness
                </Link>
              </li>
              <li>
                <Link href="/calculadoras/salud/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Salud
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Populares</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Calorías y Macros
                </Link>
              </li>
              <li>
                <Link href="/imc/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Calculadora IMC
                </Link>
              </li>
              <li>
                <Link href="/tdee/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Calculadora TDEE
                </Link>
              </li>
              <li>
                <Link href="/proteina/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Proteína Diaria
                </Link>
              </li>
              <li>
                <Link href="/grasa-corporal/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Grasa Corporal
                </Link>
              </li>
              <li>
                <Link href="/peso-ideal/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Peso Ideal
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Sobre NutriFit</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/sobre-nosotros/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Metodología Científica
                </Link>
              </li>
              <li>
                <Link href="/equipo/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Blog
                </Link>
              </li>
            </ul>

            <h4 className="font-semibold text-base mb-[0.618rem] mt-[1.618rem]">Legal</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/privacidad/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="/cookies/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[2.618rem] pt-[1.618rem] border-t flex flex-col sm:flex-row items-center justify-between gap-[1rem] text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} NutriFit Calculator. Herramientas gratuitas para tu bienestar.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-warning" />
            <p>
              <strong>Aviso médico:</strong> Información orientativa, no sustituye consejo profesional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
