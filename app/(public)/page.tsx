import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_styles/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Educación de Calidad para un Futuro Brillante
          </h1>
          <p className="text-xl text-muted-foreground">
            Formando líderes del mañana con excelencia académica y valores sólidos
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact">Contactar</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Conocer más</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Nuestros Servicios</h2>
          <p className="text-muted-foreground mt-2">Ofrecemos una experiencia educativa integral</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={feature.link}>Saber más</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Testimonios</h2>
          <p className="text-muted-foreground mt-2">Lo que dicen nuestros estudiantes y padres</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="pt-6">
                <p className="italic">{testimonial.quote}</p>
                <div className="mt-4 font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-6">
            Únete a nuestra comunidad educativa y prepárate para un futuro exitoso
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contactar ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Mock data
const features = [
  {
    title: "Programa Académico Avanzado",
    description: "Currículum innovador enfocado en habilidades del siglo XXI y excelencia académica.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
      </svg>
    ),
    link: "/services#academic"
  },
  {
    title: "Actividades Extracurriculares",
    description: "Desarrollo integral con deportes, artes y actividades que promueven habilidades sociales.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
    link: "/services#extracurricular"
  },
  {
    title: "Instalaciones de Vanguardia",
    description: "Espacios modernos y seguros equipados con la última tecnología educativa.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    link: "/about#facilities"
  },
];

const testimonials = [
  {
    quote: "La educación que recibe mi hijo ha transformado su visión del aprendizaje. Los profesores realmente se preocupan por cada estudiante.",
    author: "María González",
    role: "Madre de familia"
  },
  {
    quote: "Las oportunidades de desarrollo personal y académico que he tenido en esta escuela han sido fundamentales para mi crecimiento.",
    author: "Carlos Ramírez",
    role: "Estudiante de último año"
  },
];