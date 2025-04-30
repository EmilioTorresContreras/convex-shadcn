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
import { DialogMaestro } from "./dialog-maestro";
import { Skeleton } from "@/app/_styles/components/ui/skeleton";
import { DialogEliminarMaestro } from "./dialog-eliminar-maestro";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export function TablaMaestros() {
  const maestros = useQuery(api.maestros.obtenerMaestros);
  const router = useRouter();

  // Función para navegar a la página de detalles del estudiante
  const verDetalles = (id: string) => {
    router.push(`../../maestro/${id}`);
  };

  // Estado de carga mejorado
  if (maestros === undefined) {
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
    <div className="rounded-md border">
      <div className="flex flex-col p-4">
        <div className="flex justify-between p-4">
          <p className="text-lg font-semibold">Lista de Maestros</p>
          <div className="flex justify-end">
            <DialogMaestro />
            <Button variant="outline" className="mx-4" size="icon">{
              <Link href="/escuela-maestro/nuevo">{
                <CirclePlus className="h-4 w-4" />
              }</Link>
            } </Button>
          </div>
        </div>


        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Número de Maestro</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maestros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No hay maestros registrados
                </TableCell>
              </TableRow>
            ) : (
              maestros.map((maestro) => (
                <TableRow key={maestro._id}>
                  <TableCell 
                  className="font-medium cursor-pointer hover:bg-muted/50"
                    onClick={() => verDetalles(maestro._id)}>
                    {maestro.numMaestro}
                  </TableCell>
                  <TableCell>{maestro.nombre}</TableCell>
                  <TableCell>{maestro.correo}</TableCell>
                  <TableCell>{maestro.departamento}</TableCell>
                  <TableCell>{maestro.estatus === true ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell >
                    <div className="flex gap-2 justify-end">
                      <DialogEliminarMaestro id={maestro._id} />
                      <DialogMaestro maestro={maestro} />
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