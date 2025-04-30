"use client";
// Indica que este componente es un componente cliente en Next.js, necesario para usar hooks como useState.

import { Button } from "@/app/_styles/components/ui/button";
// Importa un componente de botón reutilizable.

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_styles/components/ui/dialog";
// Importa componentes para construir un diálogo modal.

import { Input } from "@/app/_styles/components/ui/input";
// Importa un componente de entrada reutilizable.

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_styles/components/ui/select";
// Importa componentes para construir un menú desplegable (select).

import { useMutation } from "convex/react";
// Hook para realizar mutaciones en la base de datos usando Convex.

import { api } from "@/convex/_generated/api";
// Importa las definiciones de las API de Convex.

import { useState } from "react";
// Hook de React para manejar el estado local.


import { CirclePlus, Edit } from "lucide-react";
import { Estudiante } from "@/types/estudiante";
// Iconos para los botones de agregar y editar.


export function DialogEstudiante({
  estudiante,
  onSuccess,
  children,
}: {
  estudiante?: Estudiante; // Estudiante existente (modo edición) o vacío (modo creación).
  onSuccess?: () => void;  // Callback que se ejecuta al completar la operación.
  children?: React.ReactNode; // Contenido opcional para el botón de activación.
}) {
  const [open, setOpen] = useState(false); // Estado para controlar si el diálogo está abierto.
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para indicar si se está enviando el formulario.
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores.

  const createMutation = useMutation(api.estudiantes.crearEstudiante);
  // Mutación para crear un nuevo estudiante.

  const updateMutation = useMutation(api.estudiantes.actualizarEstudiante);
  // Mutación para actualizar un estudiante existente.

  const [formData, setFormData] = useState({
    numeroMatricula: estudiante?.numeroMatricula || "", // Inicializa con datos del estudiante o vacío.
    nombre: estudiante?.nombre || "",
    correo: estudiante?.correo || "",
    carrera: estudiante?.carrera || "",
    grado: estudiante?.grado || "",
    edad: estudiante?.edad || "",
  });
  // Estado para manejar los datos del formulario.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Maneja los cambios en los campos de entrada.

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Maneja los cambios en los menús desplegables.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.
    setIsSubmitting(true); // Indica que se está procesando la solicitud.
    setError(null); // Limpia errores previos.

    try {
      if (estudiante?._id) {
        // Si hay un ID, estamos en modo edición.
        await updateMutation({
          id: estudiante._id,
          ...formData
        });
      } else {
        // Si no hay ID, estamos en modo creación.
        await createMutation(formData);
      }

      setOpen(false); // Cierra el diálogo.
      onSuccess?.(); // Llama al callback de éxito si está definido.
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud"+ err); // Muestra un mensaje de error.
    } finally {
      setIsSubmitting(false); // Finaliza el estado de envío.
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Componente de diálogo que se abre o cierra según el estado `open`. */}
      <DialogTrigger asChild>
        {/* Botón que activa el diálogo. */}
        {children || (
          <Button variant="outline" disabled hidden className="cursor-pointer hover:bg-muted/50" size="icon">
            {estudiante ? (
              <Edit className="h-4 w-4" />
            ) : (
              <CirclePlus className="h-4 w-4" />
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        {/* Contenido del diálogo. */}
        <DialogHeader>
          <DialogTitle>
            {estudiante ? "Editar Estudiante" : "Nuevo Estudiante"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Formulario para crear o editar un estudiante. */}
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          {/* Muestra un mensaje de error si ocurre un problema. */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Matrícula</label>
            <Input
              name="numeroMatricula"
              value={formData.numeroMatricula}
              onChange={handleChange}
              required
            />
          </div>
          {/* Campo de entrada para el número de matrícula. */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Nombre</label>
            <Input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Edad</label>
            <Input
              name="edad"
              type="number"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </div>
          {/* Campo de entrada para el nombre. */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Correo</label>
            <Input
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          {/* Campo de entrada para el correo electrónico. */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Carrera</label>
            <Select
              value={formData.carrera}
              onValueChange={(value) => handleSelectChange("carrera", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                <SelectItem value="Medicina">Medicina</SelectItem>
                <SelectItem value="Derecho">Derecho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Menú desplegable para seleccionar la carrera. */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Grado</label>
            <Select
              value={formData.grado}
              onValueChange={(value) => handleSelectChange("grado", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un grado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1er Semestre">1er Semestre</SelectItem>
                <SelectItem value="2do Semestre">2do Semestre</SelectItem>
                <SelectItem value="3er Semestre">3er Semestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Menú desplegable para seleccionar el grado. */}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : estudiante ? "Guardar" : "Crear"}
            </Button>
          </div>
          {/* Botones para cancelar o enviar el formulario. */}
        </form>
      </DialogContent>
    </Dialog>
  );
}