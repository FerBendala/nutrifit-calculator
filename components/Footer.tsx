import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background mt-[4.236rem]">
      <div className="container-golden py-[2.618rem]">
        <div className="grid gap-[2.618rem] md:grid-cols-3 lg:grid-cols-6">
          <div className="space-golden-sm md:col-span-3 lg:col-span-1">
            <h3 className="font-bold text-lg mb-[0.618rem]">NutriFit Calculator</h3>
            <p className="text-sm text-muted-foreground leading-[1.618]">
              Herramientas gratuitas para tu salud y nutrición. Calculadoras precisas basadas en fórmulas científicas.
            </p>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Nutrición</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Calorías y Macros
                </Link>
              </li>
              <li>
                <Link href="/tdee/" className="text-muted-foreground hover:text-foreground transition-golden">
                  TDEE
                </Link>
              </li>
              <li>
                <Link href="/bmr/" className="text-muted-foreground hover:text-foreground transition-golden">
                  BMR
                </Link>
              </li>
              <li>
                <Link href="/rmr/" className="text-muted-foreground hover:text-foreground transition-golden">
                  RMR
                </Link>
              </li>
              <li>
                <Link href="/proteina/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Proteína Diaria
                </Link>
              </li>
              <li>
                <Link href="/agua/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Agua Diaria
                </Link>
              </li>
              <li>
                <Link href="/fibra/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Fibra Diaria
                </Link>
              </li>
              <li>
                <Link href="/azucar/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Azúcar (OMS)
                </Link>
              </li>
              <li>
                <Link href="/sodio/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Sodio / Sal
                </Link>
              </li>
              <li>
                <Link href="/alcohol/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Alcohol
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Composición Corporal</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/imc/" className="text-muted-foreground hover:text-foreground transition-golden">
                  IMC
                </Link>
              </li>
              <li>
                <Link href="/grasa-corporal/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Grasa Corporal
                </Link>
              </li>
              <li>
                <Link href="/composicion/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Composición Corporal
                </Link>
              </li>
              <li>
                <Link href="/peso-ideal/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Peso Ideal
                </Link>
              </li>
              <li>
                <Link href="/masa-magra/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Masa Magra (LBM)
                </Link>
              </li>
              <li>
                <Link href="/ffmi/" className="text-muted-foreground hover:text-foreground transition-golden">
                  FFMI
                </Link>
              </li>
              <li>
                <Link href="/fmi/" className="text-muted-foreground hover:text-foreground transition-golden">
                  FMI
                </Link>
              </li>
              <li>
                <Link href="/whtr/" className="text-muted-foreground hover:text-foreground transition-golden">
                  WHtR
                </Link>
              </li>
              <li>
                <Link href="/whr/" className="text-muted-foreground hover:text-foreground transition-golden">
                  WHR
                </Link>
              </li>
              <li>
                <Link href="/bai/" className="text-muted-foreground hover:text-foreground transition-golden">
                  BAI
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-golden-sm">
            <h4 className="font-semibold text-base mb-[0.618rem]">Fitness y Salud</h4>
            <ul className="space-golden-xs text-sm">
              <li>
                <Link href="/1rm/" className="text-muted-foreground hover:text-foreground transition-golden">
                  1RM
                </Link>
              </li>
              <li>
                <Link href="/masa-muscular/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Masa Muscular
                </Link>
              </li>
              <li>
                <Link href="/ritmo-cardiaco/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Ritmo Cardíaco
                </Link>
              </li>
              <li>
                <Link href="/vo2max/" className="text-muted-foreground hover:text-foreground transition-golden">
                  VO2 Max
                </Link>
              </li>
              <li>
                <Link href="/recuperacion-cardiaca/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Recuperación Cardíaca
                </Link>
              </li>
              <li>
                <Link href="/edad-metabolica/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Edad Metabólica
                </Link>
              </li>
              <li>
                <Link href="/sarcopenia/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Sarcopenia
                </Link>
              </li>
              <li>
                <Link href="/bsa/" className="text-muted-foreground hover:text-foreground transition-golden">
                  BSA
                </Link>
              </li>
              <li>
                <Link href="/egfr/" className="text-muted-foreground hover:text-foreground transition-golden">
                  eGFR
                </Link>
              </li>
              <li>
                <Link href="/densidad-osea/" className="text-muted-foreground hover:text-foreground transition-golden">
                  Densidad Ósea
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

            <p className="text-xs text-muted-foreground leading-[1.618] mt-[1.618rem]">
              <strong>Aviso médico:</strong> Esta información es orientativa y no sustituye
              el consejo profesional de un médico, nutricionista o dietista.
            </p>
          </div>
        </div>

        <div className="mt-[2.618rem] pt-[1.618rem] border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} NutriFit Calculator. Herramientas gratuitas para tu bienestar.
          </p>
        </div>
      </div>
    </footer>
  );
}
