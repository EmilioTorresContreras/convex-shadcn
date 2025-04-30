import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_styles/components/ui/card";
import { Input } from "@/app/_styles/components/ui/input";
import { Label } from "@/app/_styles/components/ui/label";
import { Textarea } from "@/app/_styles/components/ui/textarea";

export const metadata = {
  title: "Contacto | Mi Negocio",
  description: "Ponte en contacto con nosotros para más información o para programar una visita",
};

export default function ContactPage() {
  return (
    <div className="space-y-12 px-8 md:px-16 py-12">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold">Contacto</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Estamos aquí para atender tus consultas y brindarte toda la información que necesitas
        </p>
      </section>

      {/* Contact Info and Form */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Información de Contacto</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Dirección</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Av. Principal #1234</p>
              <p>Col. Centro, CP 12345</p>
              <p>Ciudad, Estado, País</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Teléfonos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Oficina principal: (123) 456-7890</p>
              <p>Admisiones: (123) 456-7891</p>
              <p>WhatsApp: +52 123 456 7892</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Correo Electrónico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Información general: info@minegocio.edu</p>
              <p>Admisiones: admisiones@minegocio.edu</p>
              <p>Atención a padres: padres@minegocio.edu</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Horario de Atención</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Lunes a Viernes: 8:00 AM - 4:00 PM</p>
              <p>Sábados: 9:00 AM - 1:00 PM</p>
              <p>Domingos y días festivos: Cerrado</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo lo antes posible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input id="lastName" placeholder="Tus apellidos" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input id="subject" placeholder="Motivo de tu consulta" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Escribe tu mensaje aquí..." 
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">Enviar mensaje</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Nuestra ubicación</h2>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-muted-foreground mb-4">
              [Aquí se mostrará un mapa interactivo cuando implementes la integración con el servicio de mapas]
            </p>
            <Button variant="outline">Ver en Google Maps</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    question: "¿Cuál es el proceso de admisión?",
    answer: "El proceso comienza con el llenado de una solicitud, seguido de una evaluación diagnóstica y una entrevista familiar. Finalmente, se notifica la decisión de admisión y se procede con la inscripción formal.",
  },
  {
    question: "¿Ofrecen recorridos por las instalaciones?",
    answer: "Sí, ofrecemos visitas guiadas a nuestras instalaciones. Puedes agendar una cita a través de este formulario o llamando directamente a nuestra oficina de admisiones.",
  },
  {
    question: "¿Cuentan con servicio de transporte escolar?",
    answer: "Sí, contamos con servicio de transporte escolar que cubre las principales zonas de la ciudad. El servicio incluye unidades con monitoreo GPS y personal capacitado para garantizar la seguridad de los estudiantes.",
  },
  {
    question: "¿Qué programas de becas ofrecen?",
    answer: "Ofrecemos diversos programas de becas académicas, deportivas y por necesidad económica. Los requisitos y porcentajes varían según el tipo de beca. Te invitamos a contactar con nuestro departamento de admisiones para más información.",
  },
];