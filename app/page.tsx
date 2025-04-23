import { TablaEstudiantes } from "../components/tabla-estudiantes";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Lista de Estudiantes</h1>
      <TablaEstudiantes />
    </main>
  );
}