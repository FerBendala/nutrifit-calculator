import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background mt-[4.236rem]">
      <div className="container-golden py-[2.618rem]">
        <div className="grid gap-[2.618rem] md:grid-cols-4">
          <div className="space-golden-sm">
            <h3 className="font-bold text-lg mb-[0.618rem]">Calculadora Fitness</h3>
            <p className="text-sm text-muted-foreground leading-[1.618]">
              Herramientas gratuitas para tu salud y nutrición. Calculadoras precisas basadas en fórmulas científicas.
            </p>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Calculadoras</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Calorías y Macros
                </Link>
              </li>
              <li>
                <Link href="/imc" className="text-muted-foreground hover:text-foreground transition-golden">
                  IMC
                </Link>
              </li>
              <li>
                <Link href="/tdee" className="text-muted-foreground hover:text-foreground transition-golden">
                  TDEE
                </Link>
              </li>
              <li>
                <Link href="/proteina" className="text-muted-foreground hover:text-foreground transition-golden">
                  Proteína diaria
                </Link>
              </li>
              <li>
                <Link href="/agua" className="text-muted-foreground hover:text-foreground transition-golden">
                  Agua diaria
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Legal</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-golden">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-foreground transition-golden">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-golden">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Importante</h4>
            <p className="text-xs text-muted-foreground leading-[1.618]">
              ⚠️ <strong>Aviso médico:</strong> Esta información es orientativa y no sustituye
              el consejo profesional de un médico, nutricionista o dietista.
            </p>
          </div>
        </div>

        <div className="mt-[2.618rem] pt-[1.618rem] border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Calculadora Fitness. Herramientas gratuitas para tu bienestar.
          </p>
        </div>
      </div>
    </footer>
  );
}