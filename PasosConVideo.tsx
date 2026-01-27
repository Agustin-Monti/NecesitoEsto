// components/PasosConVideo.jsx
"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

const pasos = [
  {
    id: 1,
    imgSrc: "/pasos/paso1.png",
    title: "Publica Gratis lo que Necesitas",
    description: "Detalla tu demanda de forma clara y precisa para que las búsquedas de las personas o empresas que tengan la posibilidad de satisfacer tu necesidad puedan contactarse en forma directa."
  },
  {
    id: 2,
    imgSrc: "/pasos/paso2.png",
    title: "Búsqueda de posibles candidatos",
    description: "Tu demanda será publicada en distintos medios, redes sociales, empresas y prestadores de servicios, buscando quienes puedan satisfacer tu demanda."
  },
  {
    id: 3,
    imgSrc: "/pasos/paso3.png",
    title: "Generación del Negocio",
    description: "Interesado por la demanda, se envía la información del responsable de la publicación al interesado para que este realice el contacto directo comenzando la respectiva negociación."
  }
];

export default function PasosConVideo() {
  const router = useRouter();
  // Especifica el tipo HTMLVideoElement para el useRef
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleComenzar = () => {
    router.push('/demandas/new');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Cómo funciona{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              NECESITO ESTO!
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mira el video y descubre nuestro proceso simple para conectar necesidades con soluciones
          </p>
        </div>

        {/* Contenido Principal - Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Columna Izquierda - Video */}
            <div className="order-2 lg:order-1">
            <div className="relative max-w-xs mx-auto lg:max-w-sm"> {/* Cambiado de max-w-sm a max-w-xs */}
                {/* Marco del teléfono con efectos - REDUCIDO */}
                <div className="relative bg-black rounded-[30px] md:rounded-[40px] p-2 md:p-3 shadow-2xl shadow-blue-500/20"> {/* Reducido padding y border-radius */}
                {/* Parte superior del teléfono - MÁS PEQUEÑO */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-4 bg-black rounded-b-xl z-10"></div> {/* Reducido */}
                
                {/* Contenedor del video */}
                <div className="relative aspect-[9/16] rounded-[24px] md:rounded-[32px] overflow-hidden"> {/* Reducido border-radius */}
                    <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    poster="/thumbnail.png"
                    onClick={togglePlay}
                    >
                    <source src="/videopromocional.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                    </video>
                    
                    {/* Overlay con botón de play - MÁS PEQUEÑO */}
                    {!isPlaying && (
                    <div 
                        className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer group"
                        onClick={togglePlay}
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        </div>
                    </div>
                    )}
                </div>
                
                {/* Botón home - MÁS PEQUEÑO */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-800 rounded-full"></div>
                </div>
                
                {/* Etiqueta - MÁS PEQUEÑA */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-lg shadow-lg text-xs">
                <span className="font-semibold">Video explicativo</span>
                </div>
            </div>
            </div>

          {/* Columna Derecha - Pasos */}
          <div className="order-1 lg:order-2 space-y-8">
            {pasos.map((paso, index) => (
              <div
                key={paso.id}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Número con diseño */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {paso.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {paso.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 border border-blue-100 relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/10 rounded-full"></div>
            
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                ¿Listo para publicar tu necesidad?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Únete a miles de usuarios que ya están encontrando soluciones a sus necesidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleComenzar}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Comenzar ahora
                </button>
                <button 
                  onClick={togglePlay}
                  className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl border border-blue-200 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {isPlaying ? 'Pausar video' : 'Ver video explicativo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}