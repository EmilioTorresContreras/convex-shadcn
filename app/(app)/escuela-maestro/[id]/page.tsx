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
import { maestroSchema } from "@/app/schemas/maestro";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof maestroSchema>;

export default function MaestroPage({
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

    const maestroId = isNewStudent ? undefined : (id as unknown as Id<"maestros">);

    const maestro = useQuery(
        api.maestros.obtenerMaestroPorId,
        maestroId ? { id: maestroId } : "skip"
    );

    const updateMutation = useMutation(api.maestros.actualizarMaestro);
    const createMutation = useMutation(api.maestros.crearMaestro);

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
        resolver: zodResolver(maestroSchema),
        defaultValues: {
            numMaestro: "",
            nombre: "",
            correo: "",
            departamento: "",
            estatus: false
        },
    });

    useEffect(() => {
        if (isNewStudent) {
            reset();
        } else if (maestro) {
            reset({
                numMaestro: maestro.numMaestro || "",
                nombre: maestro.nombre || "",
                correo: maestro.correo || "",
                departamento: maestro.departamento || "",
                estatus: maestro.estatus || false
            });
        }
    }, [isNewStudent, maestro, reset]);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            if (isNewStudent) {
                await createMutation(data);
            } else {
                await updateMutation({ id: maestroId!, ...data });
            }
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Ocurrió un errror al procesar la solicitud:" + err)
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isNewStudent && !maestro) {
        return <div className="container mx-auto py-8 flex justify-center">Cargando...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a maestros
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        {isNewStudent ? (
                            <>
                                <Plus className="h-6 w-6" />
                                Nuevo Maestro
                            </>
                        ) : (
                            <>
                                <Edit className="h-6 w-6" />
                                Editar Maestro
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
                                <label className="block text-sm font-medium">Número de Maestro</label>
                                <Input {...register("numMaestro")} />
                                {errors.numMaestro && <p className="text-red-500 text-sm">{errors.numMaestro.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Nombre</label>
                                <Input {...register("nombre")} />
                                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Correo</label>
                                <Input type="email" {...register("correo")} />
                                {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Departamento</label>
                                <Controller
                                    control={control}
                                    name="departamento"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una departamento" />
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
                                {errors.departamento && <p className="text-red-500 text-sm">{errors.departamento.message}</p>}

                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Estatus</label>
                                <Controller
                                    control={control}
                                    name="estatus"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value ? "true" : "false"}
                                            onValueChange={(value) => field.onChange(value === "true")}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un estatus" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Activo</SelectItem>
                                                <SelectItem value="false">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.estatus && (
                                    <p className="text-red-500 text-sm">Este campo es obligatorio</p>
                                )}
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
                                {isSubmitting ? "Procesando..." : isNewStudent ? "Crear Maestro" : "Guardar Cambios"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}


