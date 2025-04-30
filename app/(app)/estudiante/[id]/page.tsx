"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/app/_styles/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { use, useEffect } from "react";

export default function DetalleEstudiante({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const estudianteId = id as unknown as Id<"estudiantes">;
  const estudiante = useQuery(api.estudiantes.obtenerEstudiantePorId, { id: estudianteId });

  useEffect(() => {
    if (estudiante === null){
      notFound()
    }
  })
  // Función para navegar a la página de detalles del estudiante
  const verDetalles = (id: string) => {
    router.push(`../escuela-estudiante/${id}`);
  };




  if (estudiante === undefined) {
    //notFound()
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

  if (estudiante === null) {
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
          <h1 className="text-xl font-bold mb-4">Estudiante no encontrado</h1>
          <p>El estudiante que buscas no existe o ha sido eliminado.</p>
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
          <h1 className="text-2xl font-bold mb-6">Perfil de Estudiante</h1>
          <Button variant="outline" className="cursor-pointer hover:bg-muted/50 py-2" size="icon" onClick={() => verDetalles(estudiante._id)}>
            {<Edit className="h-4 w-4" />}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Matrícula</p>
              <p className="text-lg font-medium">{estudiante.numeroMatricula}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="text-lg font-medium">{estudiante.nombre}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Edad</p>
              <p className="text-lg font-medium">{estudiante.edad}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Correo Electrónico</p>
              <p className="text-lg font-medium">{estudiante.correo}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Carrera</p>
              <p className="text-lg font-medium">{estudiante.carrera}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Grado</p>
              <p className="text-lg font-medium">{estudiante.grado}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}