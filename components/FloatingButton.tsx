'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Solo aplicar la lógica del scroll en dispositivos móviles
    const checkScreenSize = () => {
      return window.innerWidth < 768; // md breakpoint de Tailwind
    };

    const handleScroll = () => {
      // Si no es móvil, siempre visible
      if (!checkScreenSize()) {
        setIsVisible(true);
        return;
      }

      const footer = document.getElementById('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Si el footer está visible en la pantalla (a 100px de entrar en vista)
      if (footerRect.top < windowHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleResize = () => {
      // Al cambiar el tamaño de pantalla, resetear la visibilidad
      if (!checkScreenSize()) {
        setIsVisible(true);
      } else {
        handleScroll(); // Recalcular para móvil
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Ejecutar una vez al cargar
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Versión para móvil - flotante */}
      <div className="md:hidden">
        <Link
          href="/demandas/new"
          className={`
            bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 
            rounded-full shadow-lg transition-all duration-300 hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 
            border-2 border-transparent text-sm whitespace-nowrap
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}
            fixed bottom-20 right-4 z-40
          `}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          Publica tu Necesidad
        </Link>
      </div>

      {/* Versión para desktop - más grande y llamativa */}
      <div className="hidden md:block">
        <Link
          href="/demandas/new"
          className="
            bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
            text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 
            hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 
            focus:ring-offset-2 border-2 border-white text-sm whitespace-nowrap
            transform hover:-translate-y-0.5 animate-pulse-slow
          "
        >
          🚀 Publica tu Necesidad
        </Link>
      </div>
    </>
  );
}
