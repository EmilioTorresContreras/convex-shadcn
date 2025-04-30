// app/estudiantes/[id]/page.tsx
"use client";

import { Input } from "@/app/_styles/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_styles/components/ui/select";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, use } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/_styles/components/ui/card";
import { Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEdad } from "@/core/useCases/useEdad";

export default function EditarEstudiantePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { id } = use(params);
    const estudianteId = id as unknown as Id<"estudiantes">;
    const estudiante = useQuery(api.estudiantes.obtenerEstudiantePorId, {id: estudianteId});
    const updateMutation = useMutation(api.estudiantes.actualizarEstudiante);
    const createMutation = useMutation(api.estudiantes.crearEstudiante);

    const [formData, setFormData] = useState({
        numeroMatricula: estudiante?.numeroMatricula || "",
        nombre: estudiante?.nombre || "",
        correo: estudiante?.correo || "",
        carrera: estudiante?.carrera || "",
        grado: estudiante?.grado || "",
        edad: estudiante?.edad || "",
      });

    const { isEdad} = useEdad(parseInt(formData.edad))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        //const parsedValue = name === "edad" ? Number(value) : value;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEdad) {
            console.log(formData.edad)
            setError("La edad debe ser mayor a 5 y menor a 18")
            
            return;
            
          }
        
        setIsSubmitting(true);
        setError(null);

        try {
            if (estudianteId) {
                // Si hay un ID, estamos en modo edición.
                await updateMutation({
                  id: estudianteId,
                  ...formData
                });
              } else {
                // Si no hay ID, estamos en modo creación.
                await createMutation(formData);
              }
            router.push("/dashboard");
        } catch (err) {
            setError("Ocurrió un error al procesar la solicitud: " + err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!estudiante) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a estudiantes
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Edit className="h-6 w-6" />
                        {estudiante ? "Editar Estudiante" : "Nuevo Estudiante"}
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
                                <label className="block text-sm font-medium">Matrícula</label>
                                <Input
                                    name="numeroMatricula"
                                    value={formData.numeroMatricula}
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
                                <label className="block text-sm font-medium">Edad</label>
                                <Input
                                    name="edad"
                                    value={formData.edad}
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
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <Link href="/dashboard">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Procesando..." : "Guardar Cambios"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
