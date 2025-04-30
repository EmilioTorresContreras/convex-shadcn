// app/maestros/nuevo/page.tsx
"use client";

import { Input } from "@/app/_styles/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_styles/components/ui/select";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/_styles/components/ui/card";
import { CirclePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NuevaMaestroPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation(api.maestros.crearMaestro);

  const [formData, setFormData] = useState({
    numMaestro: "",
    nombre: "",
    correo: "",
    departamento: "",
    estatus: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectStatus = (name: string, value: string) => {
    const status = value === "Activo" ? true : false
    setFormData(prev => ({ ...prev, [name]: status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createMutation(formData);
      router.push("/dashboard"); // Redirige a la lista de maestros
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Maestros
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <CirclePlus className="h-6 w-6" />
            Nuevo maestro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Número de Maestro</label>
                <Input
                  name="numMaestro"
                  value={formData.numMaestro}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label className="block text-sm font-medium">Correo</label>
                <Input
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Departamento</label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) => handleSelectChange("departamento", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                    <SelectItem value="Medicina">Medicina</SelectItem>
                    <SelectItem value="Derecho">Derecho</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Link href="/maestros">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Procesando..." : "Crear Maestro"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}