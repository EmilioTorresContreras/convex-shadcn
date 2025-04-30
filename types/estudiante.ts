import { Id } from "@/convex/_generated/dataModel";

export interface Estudiante {
    _id?: Id<"estudiantes">; 
    numeroMatricula: string;
    nombre: string;
    edad: string;
    correo: string;
    carrera: string;
    grado: string;
  }