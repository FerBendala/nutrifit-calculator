import { Container } from '@/components/Container';
import Link from 'next/link';

export default function SobreNosotrosPage() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Sobre NutriFit Calculator
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Calculadoras de salud y nutrición basadas en evidencia cientifica, accesibles para todos.
          </p>
        </header>

        <article className="prose prose-gray max-w-none space-golden-lg">

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Nuestra Mision</h2>
            <p className="text-muted-foreground leading-[1.618]">
              NutriFit Calculator nace con el objetivo de democratizar el acceso a herramientas de evaluacion
              nutricional y de salud que antes estaban reservadas a consultas profesionales. Creemos que
              toda persona merece poder entender su cuerpo con datos fiables y basados en ciencia.
            </p>
            <p className="text-muted-foreground leading-[1.618]">
              Ofrecemos mas de 30 calculadoras gratuitas que utilizan formulas cientificas validadas
              y publicadas en revistas medicas de impacto. No inventamos formulas: implementamos las que
              la comunidad cientifica ha validado.
            </p>
          </section>

          <section className="card-golden-lg bg-success-subtle border-l-4 border-success">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Metodologia Cientifica</h2>
            <p className="text-muted-foreground leading-[1.618] mb-4">
              Cada calculadora de NutriFit se construye siguiendo un proceso riguroso:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="font-bold text-success mr-3 text-lg">1.</span>
                <div>
                  <p className="font-semibold text-foreground">Seleccion de formulas validadas</p>
                  <p className="text-sm text-muted-foreground">
                    Solo implementamos formulas publicadas en revistas cientificas con revision por pares.
                    Por ejemplo, usamos Mifflin-St Jeor para el metabolismo basal (validada en{' '}
                    <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline">
                      The American Journal of Clinical Nutrition
                    </a>), Jackson-Pollock para grasa corporal, y las ecuaciones de la OMS para
                    recomendaciones nutricionales.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-success mr-3 text-lg">2.</span>
                <div>
                  <p className="font-semibold text-foreground">Implementacion y verificacion</p>
                  <p className="text-sm text-muted-foreground">
                    Cada formula se implementa con precision matematica y se verifica contra los resultados
                    de los estudios originales. Incluimos multiples formulas cuando existen alternativas
                    validas (por ejemplo, 3 formulas de BMR: Mifflin-St Jeor, Harris-Benedict y Katch-McArdle).
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-success mr-3 text-lg">3.</span>
                <div>
                  <p className="font-semibold text-foreground">Contextualizacion educativa</p>
                  <p className="text-sm text-muted-foreground">
                    Cada calculadora incluye contenido educativo con citas a estudios recientes (2022-2025),
                    explicaciones de limitaciones, y recomendaciones de cuando consultar a un profesional.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-success mr-3 text-lg">4.</span>
                <div>
                  <p className="font-semibold text-foreground">Actualizacion periodica</p>
                  <p className="text-sm text-muted-foreground">
                    Revisamos periodicamente la literatura cientifica para actualizar formulas, rangos de referencia
                    y recomendaciones. Cada articulo del blog incluye referencias a estudios con DOI verificable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Proceso de Revision Editorial</h2>
            <p className="text-muted-foreground leading-[1.618] mb-4">
              Todo el contenido publicado en NutriFit Calculator sigue un proceso editorial estructurado:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-warning mr-2 font-bold">1.</span>
                <span><strong>Investigacion:</strong> Se revisa la literatura cientifica actual en PubMed, NCBI y revistas de referencia.</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning mr-2 font-bold">2.</span>
                <span><strong>Redaccion:</strong> El contenido se redacta con lenguaje claro, evitando afirmaciones absolutas y citando fuentes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning mr-2 font-bold">3.</span>
                <span><strong>Revision tecnica:</strong> Se verifica la precision de formulas, rangos y recomendaciones contra las fuentes originales.</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning mr-2 font-bold">4.</span>
                <span><strong>Publicacion con descargo:</strong> Cada pagina incluye un aviso medico claro indicando que la informacion no sustituye el consejo profesional.</span>
              </li>
            </ul>
          </section>

          <section className="card-golden-lg">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Fuentes y Referencias</h2>
            <p className="text-muted-foreground leading-[1.618] mb-4">
              Nuestras calculadoras y articulos se basan en:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card-golden bg-muted/30">
                <h3 className="font-semibold mb-2">Organismos Internacionales</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>OMS (Organizacion Mundial de la Salud)</li>
                  <li>CDC (Centers for Disease Control)</li>
                  <li>AHA (American Heart Association)</li>
                  <li>IOM (Institute of Medicine)</li>
                </ul>
              </div>
              <div className="card-golden bg-muted/30">
                <h3 className="font-semibold mb-2">Revistas Cientificas</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>The American Journal of Clinical Nutrition</li>
                  <li>British Journal of Sports Medicine</li>
                  <li>JAMA Network Open</li>
                  <li>Nutrients, BMC Public Health</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Aviso Medico Importante</h2>
            <p className="text-muted-foreground leading-[1.618]">
              NutriFit Calculator proporciona herramientas de calculo basadas en formulas cientificas validadas.
              Sin embargo, los resultados son estimaciones poblacionales y <strong>no constituyen diagnostico medico</strong>.
              Las variaciones individuales (genetica, condiciones medicas, medicacion) pueden afectar la precision.
            </p>
            <p className="text-muted-foreground leading-[1.618] mt-4">
              <strong>Siempre consulta con un profesional de la salud</strong> (medico, nutricionista titulado o
              dietista-nutricionista) antes de tomar decisiones basadas en estos resultados, especialmente si tienes
              condiciones medicas preexistentes, estas embarazada o en periodo de lactancia.
            </p>
          </section>

          <section className="text-center space-golden-sm">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Explora Nuestras Herramientas</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="text-info hover:underline font-medium">Calculadora de Calorias</Link>
              <Link href="/imc/" className="text-info hover:underline font-medium">Calculadora IMC</Link>
              <Link href="/tdee/" className="text-info hover:underline font-medium">Calculadora TDEE</Link>
              <Link href="/grasa-corporal/" className="text-info hover:underline font-medium">Grasa Corporal</Link>
              <Link href="/peso-ideal/" className="text-info hover:underline font-medium">Peso Ideal</Link>
              <Link href="/proteina/" className="text-info hover:underline font-medium">Proteina Diaria</Link>
              <Link href="/blog/" className="text-info hover:underline font-medium">Blog</Link>
              <Link href="/equipo/" className="text-info hover:underline font-medium">Nuestro Equipo</Link>
            </div>
          </section>

        </article>
      </main>
    </Container>
  );
}
