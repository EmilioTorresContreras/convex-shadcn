import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardContent } from "@/app/_styles/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Acerca de Nosotros | Mi Negocio",
  description: "Conoce nuestra historia, misión, visión y valores fundamentales",
};

export default function AboutPage() {
  return (
    <div className="space-y-12 px-8 md:px-16 py-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold">Acerca de Nosotros</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Comprometidos con la excelencia educativa y la formación integral desde hace más de 20 años
        </p>
      </section>

      {/* Historia y Misión */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold" id="history">Nuestra Historia</h2>
          <p>
            Fundada en 2003, nuestra institución nació con la visión de transformar la educación tradicional. 
            Comenzamos con apenas 50 estudiantes y hoy somos una comunidad educativa reconocida
            que ha formado a miles de líderes y profesionales destacados.
          </p>
          <p>
            A lo largo de estos años, hemos evolucionado constantemente, adaptando nuestra metodología
            a los cambios educativos y tecnológicos, pero manteniendo siempre nuestro compromiso con
            la excelencia y los valores humanos fundamentales.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Misión y Visión</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium">Misión</h3>
              <p className="mt-2">
                Formar estudiantes con excelencia académica y sólidos valores humanos, capaces de
                enfrentar los retos del mundo contemporáneo y contribuir positivamente a la sociedad.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Visión</h3>
              <p className="mt-2">
                Ser reconocidos como una institución educativa líder que inspira, transforma y prepara
                a las nuevas generaciones para crear un futuro más justo, innovador y sostenible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Instalaciones */}
      <section className="py-8" id="facilities">
        <h2 className="text-2xl font-bold mb-8">Nuestras Instalaciones</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Contamos con instalaciones de vanguardia diseñadas para ofrecer la mejor experiencia educativa:
            </p>
            <ul className="space-y-2">
              {facilities.map((facility, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground italic mb-4">
                Nuestras instalaciones están diseñadas para inspirar curiosidad y fomentar un ambiente de aprendizaje colaborativo.
              </p>
              <div className="h-32 w-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-muted-foreground">
                🏫
              </div>
              <p className="font-medium">Campus Principal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-8">Nuestro Equipo</h2>
        <p className="max-w-3xl mx-auto text-center mb-8">
          Contamos con un equipo de profesionales altamente calificados y apasionados por la educación,
          comprometidos con el desarrollo integral de cada estudiante.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="h-24 w-24 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg text-center">{member.name}</h3>
                <p className="text-muted-foreground text-center mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Quieres conocernos?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Te invitamos a visitar nuestras instalaciones y conocer más sobre nuestra propuesta educativa.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Agendar una visita</Link>
        </Button>
      </section>
    </div>
  );
}

// Mock data
const values = [
  {
    title: "Excelencia",
    description: "Buscamos constantemente superar expectativas y alcanzar el máximo potencial.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    )
  },
  {
    title: "Integridad",
    description: "Actuamos con honestidad, ética y transparencia en todo momento.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-3"></path>
        <path d="M18 3h3v3"></path>
        <path d="M21 11V6h-5m-1-1L3 19"></path>
      </svg>
    )
  },
  {
    title: "Innovación",
    description: "Promovemos el pensamiento creativo y la búsqueda de nuevas soluciones.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    )
  },
  {
    title: "Respeto",
    description: "Valoramos la diversidad y fomentamos un ambiente de respeto mutuo.",
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  }
];

const facilities = [
  "Aulas interactivas con tecnología de última generación",
  "Laboratorios de ciencias completamente equipados",
  "Centro de cómputo con software especializado",
  "Biblioteca física y digital con miles de recursos",
  "Instalaciones deportivas profesionales",
  "Auditorio para presentaciones y eventos culturales",
  "Áreas verdes y espacios de recreación",
  "Cafetería con menús saludables y nutritivos"
];

const team = [
  {
    name: "Dra. Alejandra Martínez",
    role: "Directora General",
    bio: "Con más de 20 años de experiencia en gestión educativa y un doctorado en Educación, lidera nuestra institución con visión y compromiso."
  },
  {
    name: "Mtro. Roberto Sánchez",
    role: "Coordinador Académico",
    bio: "Especialista en diseño curricular innovador y aprendizaje basado en proyectos, asegura la excelencia de nuestros programas."
  },
  {
    name: "Lic. Carmen Jiménez",
    role: "Coordinadora de Desarrollo Estudiantil",
    bio: "Dedicada al bienestar integral de nuestros estudiantes, implementa programas de apoyo y seguimiento personalizado."
  }
];