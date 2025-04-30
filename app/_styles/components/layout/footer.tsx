// components/layout/footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/app/_styles/components/ui/button";

/**
 * # Footer principal de la aplicación.
 *
 * ## Descripción:
 * Componente que proporciona el pie de página de la aplicación.
 * Implementa un diseño responsive con enlaces de navegación, 
 * contacto y redes sociales.
 *
 * ## Características:
 * - Diseño responsive con sistema de grid
 * - Enlaces a páginas principales del sitio
 * - Iconos de redes sociales
 * - Información de contacto
 * - Copyright dinámico con año actual
 *
 * ## Uso:
 * ```tsx
 * // En un layout o página
 * import { Footer } from "@/components/layout/footer";
 *
 * export default function Layout() {
 *   return (
 *     <>
 *       <main>Contenido de la pagina</main>
 *       <Footer />
 *     </>
 *   );
 * }
 * ```
 */
export const Footer = () => {
  return (
    <footer className="border-t bg-background mt-16">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Columna de información */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mi Negocio</h3>
            <p className="text-sm text-muted-foreground">
              Soluciones innovadoras y personalizadas para impulsar tu negocio al siguiente nivel.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Inicio
              </Link>
              <Link href="/acerca" className="text-sm text-muted-foreground hover:text-foreground">
                Acerca de
              </Link>
              <Link href="/servicios" className="text-sm text-muted-foreground hover:text-foreground">
                Servicios
              </Link>
              <Link href="/proyectos" className="text-sm text-muted-foreground hover:text-foreground">
                Proyectos
              </Link>
              <Link href="/contacto" className="text-sm text-muted-foreground hover:text-foreground">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Servicios</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/servicios/servicio1" className="text-sm text-muted-foreground hover:text-foreground">
                Servicio 1
              </Link>
              <Link href="/servicios/servicio2" className="text-sm text-muted-foreground hover:text-foreground">
                Servicio 2
              </Link>
              <Link href="/servicios/servicio3" className="text-sm text-muted-foreground hover:text-foreground">
                Servicio 3
              </Link>
              <Link href="/servicios/servicio4" className="text-sm text-muted-foreground hover:text-foreground">
                Servicio 4
              </Link>
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contacto</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Calle Principal 123</p>
              <p>Ciudad, Estado 12345</p>
              <p>info@minegocio.com</p>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mi Negocio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};