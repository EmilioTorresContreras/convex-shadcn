/**
 * # components/home/features.tsx
 * 
 * Componente de características destacadas para la página de inicio.
 * Muestra las principales funcionalidades del proyecto educativo.
 */
import { 
    BookOpen, 
    Users, 
    LineChart, 
    Calendar 
  } from "lucide-react";
  
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Gestión de cursos",
      description: "Administra fácilmente todos tus cursos, materiales y recursos educativos desde un solo lugar."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Comunidad educativa",
      description: "Conecta con estudiantes y profesores en un entorno colaborativo que fomenta el aprendizaje."
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Seguimiento de progreso",
      description: "Visualiza el progreso académico con estadísticas detalladas y reportes personalizados."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Planificación avanzada",
      description: "Organiza calendarios académicos, horarios y eventos importantes de manera eficiente."
    }
  ];
  
  export function Features() {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Características principales
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para simplificar la gestión educativa y potenciar el aprendizaje
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg border shadow-sm"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }