import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_styles/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Servicios | Mi Negocio",
  description: "Conoce todos los servicios educativos que ofrecemos para el desarrollo integral de nuestros estudiantes",
};

export default function ServicesPage() {
  return (
    <div className="space-y-12 px-8 md:px-16 py-12">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold">Nuestros Servicios</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Ofrecemos una experiencia educativa completa con programas académicos y actividades que promueven 
          el desarrollo integral de cada estudiante
        </p>
      </section>

      {/* Academic Programs */}
      <section id="academic" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Programas Académicos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {academicPrograms.map((program, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <program.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{program.title}</CardTitle>
                <CardDescription>{program.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{program.description}</p>
                <ul className="mt-4 space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Más información
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section id="extracurricular" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Actividades Extracurriculares</h2>
        <p className="mb-6">
          Complementamos la formación académica con un amplio programa de actividades que desarrollan 
          habilidades sociales, artísticas y deportivas:
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Deportes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {extracurricular.sports.map((sport, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md hover:bg-muted">
                    <span className="mr-2 text-primary">•</span>
                    <span>{sport}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Artes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {extracurricular.arts.map((art, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md hover:bg-muted">
                    <span className="mr-2 text-primary">•</span>
                    <span>{art}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tecnología</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {extracurricular.technology.map((tech, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md hover:bg-muted">
                    <span className="mr-2 text-primary">•</span>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Desarrollo personal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {extracurricular.personal.map((item, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md hover:bg-muted">
                    <span className="mr-2 text-primary">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Services */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Servicios Adicionales</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {additionalServices.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <service.icon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Academic Calendar */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Calendario Académico</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">Ciclo Escolar</h3>
                <p className="mt-2">Inicio: Agosto | Término: Julio</p>
              </div>
              <div>
                <h3 className="text-xl font-medium">Periodos Vacacionales</h3>
                <ul className="mt-2 space-y-1">
                  <li>• Vacaciones de invierno: Diciembre - Enero</li>
                  <li>• Semana Santa: Marzo - Abril (según calendario)</li>
                  <li>• Vacaciones de verano: Julio - Agosto</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium">Evaluaciones</h3>
                <ul className="mt-2 space-y-1">
                  <li>• Primer periodo: Octubre - Noviembre</li>
                  <li>• Segundo periodo: Febrero - Marzo</li>
                  <li>• Evaluación final: Mayo - Junio</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Descargar calendario completo
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="py-8 text-center">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">¿Interesado en nuestros servicios?</h2>
            <p className="text-lg mb-6">
              Agenda una visita para conocer nuestras instalaciones y recibir más información sobre 
              nuestros programas académicos y extracurriculares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Contactar ahora</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Conocer más</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Mock data
const academicPrograms = [
  {
    title: "Educación Preescolar",
    shortDescription: "Para niños de 3 a 6 años",
    description: "Programa diseñado para desarrollar habilidades socioemocionales, cognitivas y motoras en la primera infancia.",
    features: [
      "Enfoque lúdico y vivencial",
      "Introducción al inglés como segundo idioma",
      "Desarrollo de habilidades motoras finas y gruesas",
      "Actividades artísticas y musicales"
    ],
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 6.1H3a2 2 0 0 0-2 2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.1a2 2 0 0 0-2-2Z"></path>
        <path d="M8 2v4"></path>
        <path d="M12 2v4"></path>
        <path d="M16 10h2"></path>
        <path d="M4 16h6"></path>
        <path d="M16 16h4"></path>
        <path d="M10 10H4"></path>
      </svg>
    )
  },
  {
    title: "Educación Primaria",
    shortDescription: "Para niños de 6 a 12 años",
    description: "Formación académica sólida con un enfoque integral que promueve el pensamiento crítico y valores humanos.",
    features: [
      "Programa bilingüe con certificaciones internacionales",
      "Enseñanza de habilidades STEM",
      "Desarrollo de competencias digitales",
      "Seguimiento personalizado del aprendizaje"
    ],
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
      </svg>
    )
  },
  {
    title: "Educación Secundaria",
    shortDescription: "Para adolescentes de 12 a 15 años",
    description: "Preparación académica avanzada que promueve la autonomía y el desarrollo de proyectos de investigación.",
    features: [
      "Modelo educativo basado en competencias",
      "Programa de orientación vocacional",
      "Laboratorios especializados",
      "Proyectos interdisciplinarios"
    ],
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 6H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h13"></path>
        <path d="M18 3v18"></path>
        <path d="m23 14-3-3-3 3"></path>
      </svg>
    )
  }
];

const extracurricular = {
  sports: [
    "Fútbol",
    "Baloncesto",
    "Voleibol",
    "Natación",
    "Atletismo",
    "Tenis",
    "Ajedrez",
    "Gimnasia"
  ],
  arts: [
    "Música",
    "Danza",
    "Teatro",
    "Pintura",
    "Escultura",
    "Fotografía",
    "Coro",
    "Literatura"
  ],
  technology: [
    "Robótica",
    "Programación",
    "Diseño gráfico",
    "Impresión 3D",
    "Desarrollo web",
    "Producción de video",
    "Electrónica básica",
    "Drones"
  ],
  personal: [
    "Liderazgo",
    "Debate",
    "Emprendimiento",
    "Idiomas adicionales",
    "Ecología",
    "Voluntariado",
    "Mindfulness",
    "Finanzas personales"
  ]
};

const additionalServices = [
  {
    title: "Comedor Escolar",
    description: "Ofrecemos servicios de alimentación balanceada con menús diseñados por nutriólogos certificados para promover hábitos alimenticios saludables.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    )
  },
  {
    title: "Transporte Escolar",
    description: "Servicio de transporte seguro y confiable con unidades monitoreadas por GPS y personal capacitado para garantizar el bienestar de los estudiantes.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 6h8a6 6 0 0 1 6 6v4a2 2 0 0 1-2 2h-2"></path>
        <path d="M10 16H4a2 2 0 0 1-2-2v-4a6 6 0 0 1 6-6h2"></path>
        <circle cx="7" cy="16" r="2"></circle>
        <circle cx="17" cy="16" r="2"></circle>
      </svg>
    )
  },
  {
    title: "Apoyo Psicopedagógico",
    description: "Equipo de especialistas que brindan orientación y apoyo para optimizar el proceso de aprendizaje y atender necesidades específicas de cada estudiante.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
        <path d="M15 3v6h6"></path>
        <circle cx="9.5" cy="12.5" r="1.5"></circle>
        <circle cx="14.5" cy="12.5" r="1.5"></circle>
        <path d="M9.5 15a2 2 0 0 0 5 0"></path>
      </svg>
    )
  },
  {
    title: "Escuela para Padres",
    description: "Programa de conferencias y talleres para fortalecer la alianza entre familia y escuela, abordando temas de crianza, desarrollo y educación.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    title: "Idiomas Adicionales",
    description: "Además del programa bilingüe inglés-español, ofrecemos cursos extracurriculares de francés, alemán y mandarín con metodologías comunicativas.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m2 12 20 0"></path>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    )
  },
  {
    title: "Tutorías Académicas",
    description: "Programa de apoyo para reforzar conocimientos y habilidades en materias específicas, con atención personalizada en grupos reducidos.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 22h14"></path>
        <path d="M5 2h14"></path>
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
      </svg>
    )
  },
];