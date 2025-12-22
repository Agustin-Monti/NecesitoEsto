"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Empresa {
  id: number;
  nombre: string;
  logo: string;
  enlace: string;
  alt: string;
}

const Empresas = () => {
  // Lista de TODAS las empresas (30 empresas)
  const todasEmpresas: Empresa[] = [
    {
      id: 1,
      nombre: "Coamtra",
      logo: "/empresas/Coamtra.jpg",
      enlace: "https://empresa1.com",
      alt: "Logo de Coamtra"
    },
    {
      id: 2,
      nombre: "B&A logo alta",
      logo: "/empresas/B&A logo alta.jpg",
      enlace: "https://empresa2.com",
      alt: "Logo de B&A"
    },
    {
      id: 3,
      nombre: "El Abuelo",
      logo: "/empresas/El Abuelo.png",
      enlace: "https://empresa3.com",
      alt: "Logo de El Abuelo"
    },
    {
      id: 4,
      nombre: "Lumenac",
      logo: "/empresas/Lumenac.png",
      enlace: "https://empresa4.com",
      alt: "Logo de Lumenac"
    },
    {
      id: 5,
      nombre: "Decormec",
      logo: "/empresas/Decormec.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Decormec"
    },
    {
      id: 6,
      nombre: "Oxapharma",
      logo: "/empresas/Oxapharma.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Oxapharma"
    },
    {
      id: 7,
      nombre: "IMS",
      logo: "/empresas/IMS.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de IMS"
    },
    {
      id: 8,
      nombre: "Unilever",
      logo: "/empresas/Unilever.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Unilever"
    },
    {
      id: 9,
      nombre: "Ivax",
      logo: "/empresas/Ivax.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Ivax"
    },
    {
      id: 10,
      nombre: "Romet",
      logo: "/empresas/Romet.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Romet"
    },
    {
      id: 11,
      nombre: "Mercedes Benz",
      logo: "/empresas/Mercedes Benz.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Mercedes Benz"
    },
    {
      id: 12,
      nombre: "Master Trim",
      logo: "/empresas/Master Trim.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Master Trim"
    },
    {
      id: 13,
      nombre: "Industrias Guidi",
      logo: "/empresas/Industrias Guidi.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Industrias Guidi"
    },
    {
      id: 14,
      nombre: "PSA Peugeot Citroen",
      logo: "/empresas/PSA Peugeot Citroen.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de PSA Peugeot Citroen"
    },
    {
      id: 15,
      nombre: "VW",
      logo: "/empresas/VW.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de VW"
    },
    {
      id: 16,
      nombre: "Ford",
      logo: "/empresas/Ford.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Ford"
    },
    {
      id: 17,
      nombre: "Piero",
      logo: "/empresas/Piero.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Piero"
    },
    {
      id: 18,
      nombre: "Sealy",
      logo: "/empresas/Sealy.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Sealy"
    },
    {
      id: 19,
      nombre: "Suavestar",
      logo: "/empresas/Suavestar.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Suavestar"
    },
    {
      id: 20,
      nombre: "Weatherford",
      logo: "/empresas/Weatherford.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Weatherford"
    },
    {
      id: 21,
      nombre: "Nollman",
      logo: "/empresas/Nollman.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Nollman"
    },
    {
      id: 22,
      nombre: "Lauda Textil",
      logo: "/empresas/Lauda Textil.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Lauda Textil"
    },
    {
      id: 23,
      nombre: "Auting SRL",
      logo: "/empresas/Auting SRL.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Auting SRL"
    },
    {
      id: 24,
      nombre: "MP",
      logo: "/empresas/MP.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de MP"
    },
    {
      id: 25,
      nombre: "PSA",
      logo: "/empresas/PSA.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de PSA"
    },
    {
      id: 26,
      nombre: "Edelflex",
      logo: "/empresas/Edelflex.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Edelflex"
    },
    {
      id: 27,
      nombre: "Tarquini",
      logo: "/empresas/Tarquini.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Tarquini"
    },
    {
      id: 28,
      nombre: "Globos Tuky",
      logo: "/empresas/Globos Tuky.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Globos Tuky"
    },
    {
      id: 29,
      nombre: "Escorial",
      logo: "/empresas/Escorial.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Escorial"
    },
    {
      id: 30,
      nombre: "Aptar Grout",
      logo: "/empresas/Aptar Grout.jpg",
      enlace: "https://empresa4.com",
      alt: "Logo de Aptar Grout"
    },
  ];

  // Dividir en 2 grupos de 15 empresas
  const grupo1 = todasEmpresas.slice(0, 15);
  const grupo2 = todasEmpresas.slice(15, 30);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Título con mejor estilo */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-1 bg-blue-600"></div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Nuestros Clientes
            </span>
            <div className="w-10 h-1 bg-blue-600"></div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Empresas que confían en 
            <span className="block text-blue-600 mt-2">nuestro trabajo</span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Más de 30 empresas líderes en sus sectores han elegido nuestros servicios
          </p>
        </div>

        

        {/* Primer slider - Grupo 1 */}
        <div className="mb-12 md:mb-20">
          <SliderGrupo 
            empresas={grupo1} 
            grupoId="grupo1" 
          />
        </div>

        {/* Separador decorativo */}
        <div className="relative my-12 md:my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className=" px-6 py-2 text-gray-500 text-sm font-medium rounded-full">
             
            </span>
          </div>
        </div>

        {/* Segundo slider - Grupo 2 */}
        <div>
          <SliderGrupo 
            empresas={grupo2} 
            grupoId="grupo2" 
          />
        </div>

        {/* Nota informativa */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm md:text-base">
            Haz clic en cualquier logo para visitar su sitio web
          </p>
        </div>
      </div>
    </section>
  );
};

// Componente Slider reutilizable con responsividad mejorada
interface SliderGrupoProps {
  empresas: Empresa[];
  grupoId: string;
}

const SliderGrupo = ({ empresas, grupoId }: SliderGrupoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(5); // Valor por defecto
  
  // Ajustar items por vista según el tamaño de pantalla
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) { // Mobile
        setItemsPerView(2);
      } else if (window.innerWidth < 768) { // Tablet pequeña
        setItemsPerView(3);
      } else if (window.innerWidth < 1024) { // Tablet grande
        setItemsPerView(4);
      } else { // Desktop
        setItemsPerView(5);
      }
    };

    updateItemsPerView(); // Llamar inicialmente
    window.addEventListener('resize', updateItemsPerView);
    
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(empresas.length / itemsPerView);

  // Slider automático
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, isPaused]);

  // Manejar navegación
  const nextSlide = () => {
    setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  // Función para obtener las empresas visibles
  const getVisibleEmpresas = () => {
    const start = currentIndex * itemsPerView;
    return empresas.slice(start, start + itemsPerView);
  };

  return (
    <div 
      className="relative overflow-hidden py-4 md:py-8 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm md:shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Botones de navegación - Solo en desktop */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label={`Anterior grupo ${grupoId}`}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label={`Siguiente grupo ${grupoId}`}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slider */}
      <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8 px-2 sm:px-4 md:px-10 lg:px-14">
        {getVisibleEmpresas().map((empresa) => (
          <a
            key={`${grupoId}-${empresa.id}`}
            href={empresa.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-36 h-20 sm:w-40 sm:h-24 md:w-44 md:h-28 lg:w-48 lg:h-32 xl:w-52 xl:h-36 relative group transition-all duration-500 hover:scale-105"
            title={`Visitar ${empresa.nombre}`}
          >
            {/* Fondo decorativo al hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/30 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Borde sutil */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-gray-100 group-hover:border-blue-200 transition-colors duration-300" />
            
            {/* Logo de la empresa */}
            <div className="relative w-full h-full p-2 md:p-4">
              <Image
                src={empresa.logo}
                alt={empresa.alt}
                fill
                className="object-contain p-1 md:p-2 group-hover:drop-shadow-md transition-all duration-300"
                sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, (max-width: 1024px) 176px, 192px"
              />
            </div>
            
            {/* Tooltip en hover (solo desktop) */}
            <div className="hidden md:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <div className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap shadow-lg">
                {empresa.nombre}
              </div>
              {/* Flecha del tooltip */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
            
            {/* Nombre en móvil */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl p-2">
              <p className="text-white text-xs font-medium truncate text-center">
                {empresa.nombre}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Indicadores de slide - Mejorados para móvil */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 md:mt-10 space-x-1.5 md:space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={`${grupoId}-indicator-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8 md:w-10 h-1.5 md:h-2 rounded-full' 
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full'
              }`}
              aria-label={`Ir al slide ${index + 1} del grupo ${grupoId}`}
            />
          ))}
        </div>
      )}

      {/* Contador de empresas en el grupo - Mejorado */}
      <div className="text-center mt-4 md:mt-6">
        <div className="inline-flex items-center space-x-2 bg-gray-100/50 rounded-full px-4 py-1.5">
          <span className="text-xs md:text-sm text-gray-600 font-medium">
            <span className="text-blue-600 font-bold">{getVisibleEmpresas().length}</span> de {empresas.length} empresas
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-gray-500">
            Slide {currentIndex + 1} de {totalSlides}
          </span>
        </div>
      </div>

      {/* Flechas de navegación para móvil (solo si hay más de un slide) */}
      {totalSlides > 1 && (
        <div className="md:hidden flex justify-center mt-6 space-x-4">
          <button
            onClick={prevSlide}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
            aria-label={`Anterior slide`}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
            aria-label={`Siguiente slide`}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Empresas;