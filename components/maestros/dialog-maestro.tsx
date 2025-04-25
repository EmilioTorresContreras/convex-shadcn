"use client";
// Indica que este componente es un componente cliente en Next.js, necesario para usar hooks como useState.

import { Button } from "@/components/ui/button";
// Importa un componente de botón reutilizable.

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Importa componentes para construir un diálogo modal.

import { Input } from "@/components/ui/input";
// Importa un componente de entrada reutilizable.

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Importa componentes para construir un menú desplegable (select).

import { useMutation } from "convex/react";
// Hook para realizar mutaciones en la base de datos usando Convex.

import { api } from "@/convex/_generated/api";
// Importa las definiciones de las API de Convex.

import { useState } from "react";
// Hook de React para manejar el estado local.

import { Id } from "@/convex/_generated/dataModel";
// Tipo de Convex para manejar identificadores únicos.

import { CirclePlus, Edit } from "lucide-react";
// Iconos para los botones de agregar y editar.

type Maestro = {
  _id?: Id<"maestros">; // ID opcional del maestro (solo en modo edición).
  numMaestro: string;
  nombre: string;          // Nombre del maestro.
  correo: string;
  departamento: string;
  estatus: boolean;
};
// Define el tipo de datos para un maestro.

export function DialogMaestro({
  maestro,
  onSuccess,
  children,
}: {
  maestro?: Maestro; // maestro existente (modo edición) o vacío (modo creación).
  onSuccess?: () => void;  // Callback que se ejecuta al completar la operación.
  children?: React.ReactNode; // Contenido opcional para el botón de activación.
}) {
  const [open, setOpen] = useState(false); // Estado para controlar si el diálogo está abierto.
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para indicar si se está enviando el formulario.
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores.

  const createMutation = useMutation(api.maestros.crearMaestro);
  // Mutación para crear un nuevo maestro.

  const updateMutation = useMutation(api.maestros.actualizarMaestro);
  // Mutación para actualizar un maestro existente.

  const [formData, setFormData] = useState({
    numMaestro: maestro?.numMaestro || "", // Inicializa con datos del maestro o vacío.
    nombre: maestro?.nombre || "",
    correo: maestro?.correo || "",
    departamento: maestro?.departamento || "",
    estatus: maestro?.estatus || false,
  });
  // Estado para manejar los datos del formulario.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Maneja los cambios en los campos de entrada.

  const handleSelectChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectStatus = (name: string, value: string) => {
    const status = value === "Activo" ? true : false
    setFormData(prev => ({ ...prev, [name]: status }));
  };

  const limpiar = () => {
    setFormData({
      numMaestro: "",
      nombre: "",
      correo: "",
      departamento: "",
      estatus: false,
    });
  };
  // Maneja los cambios en los menús desplegables.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.
    setIsSubmitting(true); // Indica que se está procesando la solicitud.
    setError(null); // Limpia errores previos.

    try {
      if (maestro?._id) {
        // Si hay un ID, estamos en modo edición.
        await updateMutation({
          id: maestro._id,
          ...formData
        });
      } else {
        // Si no hay ID, estamos en modo creación.
        await createMutation(formData);
      }
      limpiar()

      setOpen(false); // Cierra el diálogo.
      onSuccess?.(); // Llama al callback de éxito si está definido.
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud" + err); // Muestra un mensaje de error.
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
          <Button variant="outline" size="icon">
            {maestro ? (
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
            {maestro ? "Editar Maestro" : "Nuevo Maestro"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Formulario para crear o editar un maestro. */}
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          {/* Muestra un mensaje de error si ocurre un problema. */}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Número de Maestro</label>
            <Input
              name="numMaestro"
              value={formData.numMaestro}
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
            <label className="block text-sm font-medium">Departamento</label>
            <Select
              value={formData.departamento}
              onValueChange={(value) => handleSelectChange("departamento", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el departamento" />
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
            <label className="block text-sm font-medium">Estatus</label>
            <Select
              value={formData.estatus ? "Activo" : "Inactivo"}
              onValueChange={(value) => handleSelectStatus("estatus", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un grado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Menú desplegable para seleccionar el grado. */}

          <div className="flex pt-4">
            <Button
              type="button"
              onClick={() => limpiar()}
            >
              Limpiar
            </Button>
            <div className="flex flex-1 justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Procesando..." : maestro ? "Guardar" : "Crear"}
              </Button>
            </div>

          </div>
          {/* Botones para cancelar o enviar el formulario. */}
        </form>
      </DialogContent>
    </Dialog>
  );
}