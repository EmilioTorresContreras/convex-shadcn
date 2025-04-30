/**
 * # components/layout/navbar.tsx
 * * Define la barra de navegación principal de la aplicación.
 *   Incluye: logo, controles de tema y navegación.
 */

import { ThemeToggle } from "../theme/theme-toggle";
import Link from "next/link";
import { Button } from "../ui/button";

const APP_TITLE = "Escuela Limón" as const;

/**
 * # Barra de navegación principal de la aplicación.
 *
 * ## Descripción:
 * Componente que proporciona la barra de navegación superior de la aplicación.
 * Implementa un diseño responsive con posicionamiento fijo y altura consistente.
 *
 * ## Características:
 * - Posicionamiento sticky en la parte superior
 * - Altura fija de 64px (h-16)
 * - Sistema de espaciado responsive (mobile-first)
 * - Integración con el sistema de temas claro/oscuro
 * - Accesibilidad mejorada con aria-labels
 * - Navegación a home mediante el título
 *
 * ## Estructura:
 * - Logo/Título: Enlazado a la página principal
 * - Controles: Contenedor flexible para elementos de control (tema, etc.)
 *
 * ## Uso:
 * ```tsx
 * // En un layout o página
 * import { Navbar } from "@/components/layout/navbar";
 *
 * export default function Layout() {
 *   return (
 *     <>
 *       <Navbar />
 *       <main>Contenido de la pagina</main>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link ModeToggle} - Componente para alternar entre temas
 */
export const Navbar: React.FC = () => {
  return (
    <nav
      className="sticky top-0 z-50 w-full bg-background flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 border-b"
      aria-label="Navegación principal"
    >
      {/* Logo/Título */}
      <Link href="/" className="hover:opacity-90 transition-opacity">
        <h4>{APP_TITLE}</h4>
      </Link>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button asChild variant="outline" className="cursor-pointer hover:bg-muted/50">
          <Link href="/about">Acerca</Link>
        </Button>
        <Button asChild variant="outline" className="cursor-pointer hover:bg-muted/50">
          <Link href="/contact">Contacto</Link>
        </Button>
        <Button asChild variant="outline" className="cursor-pointer hover:bg-muted/50">
          <Link href="/services">Servicio</Link>
        </Button>
        <Button asChild variant="outline" className="cursor-pointer hover:bg-muted/50">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </nav>
  );
};