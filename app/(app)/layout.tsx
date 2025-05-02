// Ajusta la ruta

import { Footer } from "../_styles/components/layout/footer";
import  Navbar  from "@/app/_styles/components/layout/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar /> 
      {children}
      <Footer/>
    </div>
  );
}