import { Container } from '@/components/Container';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';

const TEAM_MEMBERS = [
  {
    name: 'Equipo de Nutrición',
    role: 'Revisión de contenido nutricional',
    description:
      'Responsable de verificar que las fórmulas nutricionales, rangos de macronutrientes y recomendaciones dietéticas se ajusten a las guías actuales de la OMS, IOM y sociedades científicas de referencia.',
    expertise: ['Nutrición clínica', 'Dietética deportiva', 'Composición corporal', 'Recomendaciones OMS/IOM'],
  },
  {
    name: 'Equipo de Ciencias del Ejercicio',
    role: 'Revisión de calculadoras de fitness',
    description:
      'Verifica las fórmulas de ejercicio (VO2 max, 1RM, zonas cardíacas, sarcopenia) y se asegura de que los rangos y clasificaciones se correspondan con la literatura científica publicada.',
    expertise: ['Fisiología del ejercicio', 'Fuerza y acondicionamiento', 'Rehabilitación', 'Evaluación funcional'],
  },
  {
    name: 'Equipo de Revisión Médica',
    role: 'Supervisión de calculadoras clínicas',
    description:
      'Supervisa las calculadoras con implicaciones clínicas (eGFR, densidad ósea, presión arterial media, BSA) para asegurar que los criterios diagnósticos sigan las guías médicas vigentes (AHA, WHO, KDIGO).',
    expertise: ['Medicina interna', 'Cardiología', 'Nefrología', 'Estándares WHO/AHA'],
  },
  {
    name: 'Equipo de Desarrollo',
    role: 'Implementación técnica y precisión',
    description:
      'Implementa las fórmulas con precisión matemática, verifica los resultados contra los estudios originales y optimiza la experiencia de usuario para que las herramientas sean accesibles y rápidas.',
    expertise: ['Desarrollo web', 'Precisión numérica', 'Accesibilidad', 'Rendimiento'],
  },
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NutriFit Calculator',
  url: 'https://nutrifit-calculator.com/',
  description: 'Calculadoras de nutrición y fitness con fórmulas científicas validadas.',
  foundingDate: '2024',
  knowsAbout: [
    'Nutrición',
    'Fitness',
    'Composición corporal',
    'Metabolismo basal',
    'Evaluación cardiovascular',
    'Salud pública',
  ],
};

export default function EquipoPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Nuestro Equipo
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Profesionales comprometidos con la precisión científica y la accesibilidad de la información de salud.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Enfoque Multidisciplinar</h2>
            <p className="text-muted-foreground leading-[1.618]">
              NutriFit Calculator es desarrollado por un equipo multidisciplinar que combina conocimiento
              en ciencias de la salud, nutrición, ejercicio y tecnología. Cada calculadora y artículo
              pasa por un proceso de revisión que involucra a especialistas de cada área relevante.
            </p>
            <p className="text-muted-foreground leading-[1.618] mt-4">
              Todo el contenido se basa en literatura científica publicada en revistas con revisión por pares.
              Las fuentes se citan con DOI verificable en cada página y artículo del{' '}
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
                <p className="text-sm text-muted-foreground">Calculadoras científicas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">37+</div>
                <p className="text-sm text-muted-foreground">Artículos con citas DOI</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Referencias científicas</p>
              </div>
            </div>
          </section>

          <section className="text-center space-golden-sm">
            <h2 className="text-2xl font-semibold mb-[1.618rem]">Conoce Más</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sobre-nosotros/" className="text-info hover:underline font-medium">Metodología Científica</Link>
              <Link href="/" className="text-info hover:underline font-medium">Calculadora de Calorías</Link>
              <Link href="/blog/" className="text-info hover:underline font-medium">Blog</Link>
              <Link href="/imc/" className="text-info hover:underline font-medium">Calculadora IMC</Link>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
