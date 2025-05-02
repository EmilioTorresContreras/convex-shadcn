// import Link from "next/link";
// import { ThemeToggle } from "@/app/_styles/components/theme/theme-toggle";
// import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
// import { Button } from "../ui/button";

// // Puedes definir el título de la aplicación en una constante o pasarlo como prop
// const APP_TITLE = "My App Title";

// export const Navbar: React.FC = () => {
//   return (
//     <nav
//       className="sticky top-0 z-50 w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 border-b"
//       aria-label="Navegación principal"
//     >
//       {/* Logo/Título */}
//       <Link href="/" className="hover:opacity-80 transition-opacity">
//         <h4>{APP_TITLE}</h4>
//       </Link>

//       {/* Controles */}
//       <div className="flex items-center gap-4">
//         <ThemeToggle />
//         <Button asChild variant="outline" className="cursor-pointer hover:bg-muted/50">
//           <Link href="/dashboard">Dashboard</Link>
//         </Button>

//         {/* Botones de autenticación */}
//         <SignedIn>
//           {/* Muestra el botón de perfil si el usuario está autenticado */}
//           <UserButton afterSignOutUrl="/" />
//         </SignedIn>
//         <SignedOut>
//           {/* Muestra el botón de login si el usuario no está autenticado */}
//           <SignInButton mode="modal" />
//         </SignedOut>
//       </div>
//     </nav>
//   );
// };


'use client';
import { ThemeToggle } from "../theme/theme-toggle";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_styles/components/ui/sheet';
import { cn } from "@/lib/utils";
import UserProfileButton from "../userprofile-button";
import AuthButtons from "../auth-buttons";
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { usePathname } from "next/navigation";

const APP_TITLE = "Escuela Limón" as const;

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    { name: 'Inicio', path: '/' },
    { name: 'Acerca', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const NavItems = () => (
    <>
      {routes.map((route) => (
        <Button key={route.path} variant="outline" className="m-2">
          <Link href={route.path}>
            {route.name}
          </Link>
        </Button>

      ))}
    </>
  );

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-background flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 border-b"
      aria-label="Navegación principal"
    >

      <div className="flex items-center ">
        {/* Logo/Título */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <h4>{APP_TITLE}</h4>
        </Link>
      </div>

      <div className="hidden md:flex md:items-center">
        <NavItems />
        <div className="m-2">
          <ThemeToggle />
        </div>
        {isSignedIn ? <UserProfileButton /> : <AuthButtons />}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-md cursor-pointer hover:bg-muted/50 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className=" w-64 p-0">
            <SheetHeader>
              <SheetTitle>
                <div className="px-4">
                  <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <span className=" text-lg font-bold">Eventos Limón</span>
                  </Link>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col h-full">
              <div className="flex flex-col mb-4">
                {isSignedIn ? <UserProfileButton /> : <AuthButtons />}
              </div>

              <div className="flex flex-col space-y-2 px-4">
                {routes.map((route) => (
                  <Button key={route.path} variant="outline">
                    <Link href={route.path}>
                      {route.name}
                    </Link>
                  </Button>
                ))}

              </div>

              <div className="flex items-center justify-center m-4">
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>

      </div>

      {/* Controles */}
      {/* <div className="flex items-center gap-4">
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
      </div> */}
    </nav>
  );
};
