
import { Button } from "@/app/_styles/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
      <div className="space-y-6 max-w-lg">
        <h2 className="text-2xl font-medium">Estudiante no encontrado</h2>
        <p className="text-muted-foreground">
          El estudiante que estas buscando no existe o ha sido eliminado
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