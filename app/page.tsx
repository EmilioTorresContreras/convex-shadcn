import { TablaMaestros } from "@/components/maestros/tabla-maestros";
import { TablaEstudiantes } from "../components/estudiantes/tabla-estudiantes";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto py-5">
        <TablaEstudiantes />
      </div>
      <div className="container mx-auto py-5">
        <TablaMaestros />
      </div>
    </main>
  );
}