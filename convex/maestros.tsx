import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Obtener un maestro específico por su ID
export const obtenerMaestroPorId = query({
  args: { id: v.id("maestros") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Crear un nuevo maestro (mutation)
export const crearMaestro = mutation({
  args: {
    numMaestro: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    estatus: v.boolean()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("maestros", args);
  },
});

// Obtener todos los maestros (query)
export const obtenerMaestros = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("maestros").collect();
  },
});

// Actualizar un maestro (mutation)
export const actualizarMaestro = mutation({
  args: {
    id: v.id("maestros"),
    numMaestro: v.string(),
    nombre: v.string(),
    correo: v.string(),
    departamento: v.string(),
    estatus: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
    return await ctx.db.get(id);
  },
});

// Eliminar un maestro (mutation)
export const eliminarMaestro = mutation({
  args: { id: v.id("maestros") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});