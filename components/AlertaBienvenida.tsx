// components/AlertaBienvenida.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AlertaBienvenida = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleContinuar = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isVisible && !isExiting ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden
          transform transition-all duration-500 ease-out
          ${isVisible && !isExiting ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-10'}
          ${isExiting ? 'scale-90 opacity-0 translate-y-10' : ''}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior decorativa con gradiente */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Contenido */}
        <div className="p-8 text-center">
          {/* Icono animado */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Círculo pulsante */}
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              {/* Círculo estático */}
              <div className="relative bg-gradient-to-br from-green-400 to-green-500 rounded-full p-4 shadow-lg">
                <CheckCircleIcon className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ¡Bienvenido!
          </h1>
          
          {/* Mensaje */}
          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-700">
              Tu información se guardó correctamente.
            </p>
            <p className="text-gray-600">
              Ya estás listo para comenzar a usar <span className="font-semibold text-blue-600">Necesito Esto!</span>
            </p>
            
            {/* Features destacados */}
            <div className="bg-blue-50 rounded-lg p-4 mt-4 text-left space-y-2">
              <p className="text-sm text-blue-800 font-medium">✨ Beneficios exclusivos:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Publica demandas gratis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Contacta proveedores sin costo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Haz crecer tu negocio
                </li>
              </ul>
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold 
                         hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 
                         hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              onClick={handleContinuar}
            >
              Comenzar ahora
            </button>
            
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            ¿Necesitas ayuda? <a href="/contact" className="text-blue-600 hover:underline">Contáctanos</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertaBienvenida;
