// components/AuthButtons.tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

export default function AuthButtons() {
    const { isSignedIn, signOut } = useAuth();

    if (isSignedIn) {
        return (
            <Button variant="outline"
                onClick={() => signOut()}

            >
                Cerrar sesión
            </Button>
        );
    }

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col sm:flex-row">
            <Button variant="outline" className='m-2'>
                <Link
                    href="/sign-in"
                >
                    Iniciar sesión
                </Link>
            </Button>
            <Button variant="outline" className='m-2'>
                <Link
                    href="/sign-up"
                    
                >
                    Registrarse
                </Link>
            </Button>
            </div>
        </div>
    );
}