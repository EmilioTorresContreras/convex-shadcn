import { query } from "./_generated/server";

export const obtenerEstudiantes = query({
  handler: async (ctx) => {
    return await ctx.db.query("estudiantes").collect();
  },
});