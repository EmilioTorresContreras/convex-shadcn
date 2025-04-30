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
import { useState, useEffect, use } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/app/_styles/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/_styles/components/ui/card";
import { Edit, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { estudianteSchema } from "@/app/schemas/estudiante";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof estudianteSchema>;

export default function EstudiantePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { id } = use(params);
    const isNewStudent = id === "nuevo";

    if (!/^[a-z0-9]{32}$/.test(id) && !isNewStudent) {
        notFound();
    }

    const estudianteId = isNewStudent ? undefined : (id as unknown as Id<"estudiantes">);

    const estudiante = useQuery(
        api.estudiantes.obtenerEstudiantePorId,
        estudianteId ? { id: estudianteId } : "skip"
    );

    const updateMutation = useMutation(api.estudiantes.actualizarEstudiante);
    const createMutation = useMutation(api.estudiantes.crearEstudiante);

    //register: vincula inputs simples al formulario.
    //control: se usa con Controller para inputs complejos como Select.
    // handleSubmit: función para manejar el envío del formulario.
    // reset: reinicia los valores del formulario.
    // errors: muestra los errores que ocurren al validar.
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(estudianteSchema),
        defaultValues: {
            numeroMatricula: "",
            nombre: "",
            correo: "",
            carrera: "",
            grado: "",
            edad: "",
        },
    });

    useEffect(() => {
        if (isNewStudent) {
            reset();
        } else if (estudiante) {
            reset({
                numeroMatricula: estudiante.numeroMatricula || "",
                nombre: estudiante.nombre || "",
                correo: estudiante.correo || "",
                carrera: estudiante.carrera || "",
                grado: estudiante.grado || "",
                edad: estudiante.edad || "",
            });
        }
    }, [isNewStudent, estudiante, reset]);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            if (isNewStudent) {
                await createMutation(data);
            } else {
                await updateMutation({ id: estudianteId!, ...data });
            }
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Ocurrió un errror al procesar la solicitud:" + err)
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isNewStudent && !estudiante) {
        return <div className="container mx-auto py-8 flex justify-center">Cargando...</div>;
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
                        {isNewStudent ? (
                            <>
                                <Plus className="h-6 w-6" />
                                Nuevo Estudiante
                            </>
                        ) : (
                            <>
                                <Edit className="h-6 w-6" />
                                Editar Estudiante
                            </>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Matrícula</label>
                                <Input {...register("numeroMatricula")} />
                                {errors.numeroMatricula && <p className="text-red-500 text-sm">{errors.numeroMatricula.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Nombre</label>
                                <Input {...register("nombre")} />
                                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Edad</label>
                                <Input type="number" {...register("edad")} />
                                {errors.edad && <p className="text-red-500 text-sm">{errors.edad.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Correo</label>
                                <Input type="email" {...register("correo")} />
                                {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Carrera</label>
                                <Controller
                                    control={control}
                                    name="carrera"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una carrera" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                                                <SelectItem value="Medicina">Medicina</SelectItem>
                                                <SelectItem value="Derecho">Derecho</SelectItem>
                                                <SelectItem value="Administración">Administración</SelectItem>
                                                <SelectItem value="Ciencias">Ciencias</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.carrera && <p className="text-red-500 text-sm">{errors.carrera.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Grado</label>
                                <Controller
                                    control={control}
                                    name="grado"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un grado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1er Semestre">1er Semestre</SelectItem>
                                                <SelectItem value="2do Semestre">2do Semestre</SelectItem>
                                                <SelectItem value="3er Semestre">3er Semestre</SelectItem>
                                                <SelectItem value="4to Semestre">4to Semestre</SelectItem>
                                                <SelectItem value="5to Semestre">5to Semestre</SelectItem>
                                                <SelectItem value="6to Semestre">6to Semestre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.grado && <p className="text-red-500 text-sm">{errors.grado.message}</p>}

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
                                {isSubmitting ? "Procesando..." : isNewStudent ? "Crear Estudiante" : "Guardar Cambios"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}


