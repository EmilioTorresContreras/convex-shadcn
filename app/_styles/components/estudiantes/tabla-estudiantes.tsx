"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_styles/components/ui/table";
import { DialogEstudiante } from "./dialog-estudiante";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { DialogEliminarEstudiante } from "./dialog-eliminar-estudiante";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export function TablaEstudiantes() {
  const estudiantes = useQuery(api.estudiantes.obtenerEstudiantes);
  const router = useRouter();

  // Función para navegar a la página de detalles del estudiante
  const verDetalles = (id: string) => {
    router.push(`../../estudiante/${id}`);
  };

  // Estado de carga mejorado
  if (estudiantes === undefined) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-[80%]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border p-4">
      <div className="flex flex-col p-4">
        <div className="flex justify-between p-4">
          <p className="text-lg font-semibold">Lista de Estudiantes</p>
          <div className="flex justify-end">
            <DialogEstudiante />
            <Button variant="outline" className="mx-4" size="icon">{
              <Link href="/escuela-estudiante/nuevo">{
                <CirclePlus className="h-4 w-4" />
              }</Link>
            } </Button>

          </div>
        </div>


        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Matrícula</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Carrera</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estudiantes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No hay estudiantes registrados
                </TableCell>
              </TableRow>
            ) : (
              estudiantes.map((estudiante) => (
                <TableRow
                  key={estudiante._id}
                >
                  <TableCell
                    className="font-medium cursor-pointer hover:bg-muted/50"
                    onClick={() => verDetalles(estudiante._id)}>
                    {estudiante.numeroMatricula}
                  </TableCell>
                  <TableCell>{estudiante.nombre}</TableCell>
                  <TableCell>{estudiante.edad}</TableCell>
                  <TableCell>{estudiante.correo}</TableCell>
                  <TableCell>{estudiante.carrera}</TableCell>
                  <TableCell>{estudiante.grado}</TableCell>
                  <TableCell >
                    <div className="flex gap-2 justify-end">
                      <DialogEliminarEstudiante id={estudiante._id} />
                      <DialogEstudiante estudiante={estudiante} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}