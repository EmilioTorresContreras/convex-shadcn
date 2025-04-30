/**
 * # components/home/hero.tsx
 * 
 * Componente Hero para la página de inicio.
 * Sección principal con título, subtítulo y llamada a la acción.
 */
import { Button } from "@/app/_styles/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/acerca">Conocer más</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}