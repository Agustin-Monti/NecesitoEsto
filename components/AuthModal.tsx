"use client";

import { useState } from "react";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <button 
          onClick={() => setIsOpen(true)} 
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
            <UserIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <span className="text-xs font-medium">Cuenta</span>
        </button>
      

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            {/* Botón de cerrar */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Contenido del modal */}
            <h2 className="text-lg font-semibold mb-4">Bienvenido</h2>
            <Button asChild className="w-full mb-2">
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>Iniciar Sesión</Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link href="/sign-up" onClick={() => setIsOpen(false)}>Crear Cuenta</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;