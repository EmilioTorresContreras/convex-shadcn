import { z } from "zod";

export const maestroSchema = z.object({
  numMaestro: z.string().min(1, "La número de Maestro es obligatoria"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  correo: z.string().email("Correo inválido"),
  departamento: z.string().min(1, "Selecciona el departamento"),
  estatus: z.boolean()
});

export type MaestroSchema = z.infer<typeof maestroSchema>;
