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
} from "@/components/ui/table";

export function TablaEstudiantes() {
  const estudiantes = useQuery(api.estudiantes.obtenerEstudiantes);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matrícula</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Carrera</TableHead>
            <TableHead>Grado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estudiantes ? (
            estudiantes.map((estudiante) => (
              <TableRow key={estudiante._id}>
                <TableCell>{estudiante.numeroMatricula}</TableCell>
                <TableCell>{estudiante.nombre}</TableCell>
                <TableCell>{estudiante.correo}</TableCell>
                <TableCell>{estudiante.carrera}</TableCell>
                <TableCell>{estudiante.grado}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Cargando datos...
              </TableCell>
            </TableRow>
          )}
          {estudiantes && estudiantes.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No hay estudiantes registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
