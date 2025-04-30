
import { Button } from "@/app/_styles/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">Página no encontrada</h2>
        <p className="text-muted-foreground">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="pt-6">
          <Button asChild size="lg">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}