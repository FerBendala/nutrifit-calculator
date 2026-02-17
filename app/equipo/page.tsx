import { Container } from '@/components/Container';
import Link from 'next/link';

const TEAM_MEMBERS = [
  {
    name: 'Equipo de Nutricion',
    role: 'Revision de contenido nutricional',
    description:
      'Responsable de verificar que las formulas nutricionales, rangos de macronutrientes y recomendaciones dieteticas se ajusten a las guias actuales de la OMS, IOM y sociedades cientificas de referencia.',
    expertise: ['Nutricion clinica', 'Dietetica deportiva', 'Composicion corporal', 'Recomendaciones OMS/IOM'],
  },
  {
    name: 'Equipo de Ciencias del Ejercicio',
    role: 'Revision de calculadoras de fitness',
    description:
      'Verifica las formulas de ejercicio (VO2 max, 1RM, zonas cardiacas, sarcopenia) y se asegura de que los rangos y clasificaciones se correspondan con la literatura cientifica publicada.',
    expertise: ['Fisiologia del ejercicio', 'Fuerza y acondicionamiento', 'Rehabilitacion', 'Evaluacion funcional'],
  },
  {
    name: 'Equipo de Revision Medica',
    role: 'Supervision de calculadoras clinicas',
    description:
      'Supervisa las calculadoras con implicaciones clinicas (eGFR, densidad osea, presion arterial media, BSA) para asegurar que los criterios diagnosticos sigan las guias medicas vigentes (AHA, WHO, KDIGO).',
    expertise: ['Medicina interna', 'Cardiologia', 'Nefrologia', 'Estandares WHO/AHA'],
  },
  {
    name: 'Equipo de Desarrollo',
    role: 'Implementacion tecnica y precision',
    description:
      'Implementa las formulas con precision matematica, verifica los resultados contra los estudios originales y optimiza la experiencia de usuario para que las herramientas sean accesibles y rapidas.',
    expertise: ['Desarrollo web', 'Precision numerica', 'Accesibilidad', 'Rendimiento'],
  },
];

export default function EquipoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NutriFit Calculator',
    url: 'https://nutrifit-calculator.com',
    description: 'Calculadoras de nutricion y fitness con formulas cientificas validadas.',
    foundingDate: '2024',
    sameAs: [],
    knowsAbout: [
      'Nutricion',
      'Fitness',
      'Composicion corporal',
      'Metabolismo basal',
      'Evaluacion cardiovascular',
      'Salud publica',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Nuestro Equipo
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Profesionales comprometidos con la precision cientifica y la accesibilidad de la informacion de salud.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Enfoque Multidisciplinar</h2>
            <p className="text-muted-foreground leading-[1.618]">
              NutriFit Calculator es desarrollado por un equipo multidisciplinar que combina conocimiento
              en ciencias de la salud, nutricion, ejercicio y tecnologia. Cada calculadora y articulo
              pasa por un proceso de revision que involucra a especialistas de cada area relevante.
            </p>
            <p className="text-muted-foreground leading-[1.618] mt-4">
              Todo el contenido se basa en literatura cientifica publicada en revistas con revision por pares.
              Las fuentes se citan con DOI verificable en cada pagina y articulo del{' '}
              <Link href="/blog/" className="text-info hover:underline font-medium">blog</Link>.
            </p>
          </section>

          <section className="grid gap-[1.618rem] md:grid-cols-2">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.name} className="card-golden-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-info-subtle flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-info">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.618] mb-4">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-info-subtle text-info font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Compromiso con la Calidad</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">30+</div>
                <p className="text-sm text-muted-foreground">Calculadoras cientificas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">37+</div>
                <p className="text-sm text-muted-foreground">Articulos con citas DOI</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Referencias cientificas</p>
              </div>
            </div>
          </section>

          <section className="text-center space-golden-sm">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Conoce Mas</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sobre-nosotros/" className="text-info hover:underline font-medium">Metodologia Cientifica</Link>
              <Link href="/" className="text-info hover:underline font-medium">Calculadora de Calorias</Link>
              <Link href="/blog/" className="text-info hover:underline font-medium">Blog</Link>
              <Link href="/imc/" className="text-info hover:underline font-medium">Calculadora IMC</Link>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
