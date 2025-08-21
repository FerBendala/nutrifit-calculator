import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Calculadora Fitness</h3>
            <p className="text-sm text-muted-foreground">
              Herramientas gratuitas para tu salud y nutrición. Calculadoras precisas basadas en fórmulas científicas.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Calculadoras</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Calorías y Macros
                </Link>
              </li>
              <li>
                <Link href="/imc" className="text-muted-foreground hover:text-foreground">
                  IMC
                </Link>
              </li>
              <li>
                <Link href="/tdee" className="text-muted-foreground hover:text-foreground">
                  TDEE
                </Link>
              </li>
              <li>
                <Link href="/proteina" className="text-muted-foreground hover:text-foreground">
                  Proteína diaria
                </Link>
              </li>
              <li>
                <Link href="/agua" className="text-muted-foreground hover:text-foreground">
                  Agua diaria
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-foreground">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Importante</h4>
            <p className="text-xs text-muted-foreground">
              ⚠️ <strong>Aviso médico:</strong> Esta información es orientativa y no sustituye 
              el consejo profesional de un médico, nutricionista o dietista.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Calculadora Fitness. Herramientas gratuitas para tu bienestar.
          </p>
        </div>
      </div>
    </footer>
  );
}