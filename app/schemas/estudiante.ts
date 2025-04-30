// Este objeto define cómo debe ser el formulario: 
// qué campos existen, qué tipo deben tener, 
// y qué reglas deben cumplir.
import { z } from "zod";

export const estudianteSchema = z.object({
  numeroMatricula: z.string().min(1, "La matrícula es obligatoria"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  correo: z.string().email("Correo inválido"),
  carrera: z.string().min(1, "Selecciona una carrera"),
  grado: z.string().min(1, "Selecciona un grado"),
  edad: z
    .string()
    .refine((val) => {
      const edad = parseInt(val, 10);
      return edad >= 5 && edad <= 18;
    }, {
      message: "La edad debe estar entre 5 y 18 años",
    }),
});

export type EstudianteSchema = z.infer<typeof estudianteSchema>;
