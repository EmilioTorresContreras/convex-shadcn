"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/app/_styles/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { use } from "react";

export default function DetalleMaestro({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const maestroId = id as unknown as Id<"maestros">;

  const maestro = useQuery(api.maestros.obtenerMaestroPorId, { id: maestroId });
  
  const verDetalles = (id: string) => {
    router.push(`../escuela-maestro/${id}`);
  };

  if (maestro === undefined) {
    return (
      <div className="container mx-auto py-8">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <div className="rounded-md border p-8">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (maestro === null) {
    return (
      <div className="container mx-auto py-8">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <div className="rounded-md border p-8 text-center">
          <h1 className="text-xl font-bold mb-4">Maestro no encontrado</h1>
          <p>El maestro que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <div className="rounded-md border p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Perfil de Maestro</h1>
          <Button variant="outline" className="cursor-pointer hover:bg-muted/50 py-2" size="icon" onClick={() => verDetalles(maestro._id)}>
            {<Edit className="h-4 w-4" />}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Número de Maestro</p>
              <p className="text-lg font-medium">{maestro.numMaestro}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="text-lg font-medium">{maestro.nombre}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Correo Electrónico</p>
              <p className="text-lg font-medium">{maestro.correo}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Departamento</p>
              <p className="text-lg font-medium">{maestro.departamento}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Estatus</p>
              <p className="text-lg font-medium">{maestro.estatus === true ? "Activo" : "inactivo"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}