"use client";

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

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
    { id: 1, nombre: "Coamtra", logo: "/empresas/Coamtra.jpg", enlace: "https://empresa1.com", alt: "Logo de Coamtra" },
    { id: 2, nombre: "B&A logo alta", logo: "/empresas/B&A logo alta.jpg", enlace: "https://empresa2.com", alt: "Logo de B&A" },
    { id: 3, nombre: "El Abuelo", logo: "/empresas/El Abuelo.png", enlace: "https://empresa3.com", alt: "Logo de El Abuelo" },
    { id: 4, nombre: "Lumenac", logo: "/empresas/Lumenac.png", enlace: "https://empresa4.com", alt: "Logo de Lumenac" },
    { id: 5, nombre: "Decormec", logo: "/empresas/Decormec.jpg", enlace: "https://empresa4.com", alt: "Logo de Decormec" },
    { id: 6, nombre: "Oxapharma", logo: "/empresas/Oxapharma.jpg", enlace: "https://empresa4.com", alt: "Logo de Oxapharma" },
    { id: 7, nombre: "IMS", logo: "/empresas/IMS.jpg", enlace: "https://empresa4.com", alt: "Logo de IMS" },
    { id: 8, nombre: "Unilever", logo: "/empresas/Unilever.jpg", enlace: "https://empresa4.com", alt: "Logo de Unilever" },
    { id: 9, nombre: "Ivax", logo: "/empresas/Ivax.jpg", enlace: "https://empresa4.com", alt: "Logo de Ivax" },
    { id: 10, nombre: "Romet", logo: "/empresas/Romet.jpg", enlace: "https://empresa4.com", alt: "Logo de Romet" },
    { id: 11, nombre: "Mercedes Benz", logo: "/empresas/Mercedes Benz.jpg", enlace: "https://empresa4.com", alt: "Logo de Mercedes Benz" },
    { id: 12, nombre: "Master Trim", logo: "/empresas/Master Trim.jpg", enlace: "https://empresa4.com", alt: "Logo de Master Trim" },
    { id: 13, nombre: "Industrias Guidi", logo: "/empresas/Industrias Guidi.jpg", enlace: "https://empresa4.com", alt: "Logo de Industrias Guidi" },
    { id: 14, nombre: "PSA Peugeot Citroen", logo: "/empresas/PSA Peugeot Citroen.jpg", enlace: "https://empresa4.com", alt: "Logo de PSA Peugeot Citroen" },
    { id: 15, nombre: "VW", logo: "/empresas/VW.jpg", enlace: "https://empresa4.com", alt: "Logo de VW" },
    { id: 16, nombre: "Ford", logo: "/empresas/Ford.jpg", enlace: "https://empresa4.com", alt: "Logo de Ford" },
    { id: 17, nombre: "Piero", logo: "/empresas/Piero.jpg", enlace: "https://empresa4.com", alt: "Logo de Piero" },
    { id: 18, nombre: "Sealy", logo: "/empresas/Sealy.jpg", enlace: "https://empresa4.com", alt: "Logo de Sealy" },
    { id: 19, nombre: "Suavestar", logo: "/empresas/Suavestar.jpg", enlace: "https://empresa4.com", alt: "Logo de Suavestar" },
    { id: 20, nombre: "Weatherford", logo: "/empresas/Weatherford.jpg", enlace: "https://empresa4.com", alt: "Logo de Weatherford" },
    { id: 21, nombre: "Nollman", logo: "/empresas/Nollman.jpg", enlace: "https://empresa4.com", alt: "Logo de Nollman" },
    { id: 22, nombre: "Lauda Textil", logo: "/empresas/Lauda Textil.jpg", enlace: "https://empresa4.com", alt: "Logo de Lauda Textil" },
    { id: 23, nombre: "Auting SRL", logo: "/empresas/Auting SRL.jpg", enlace: "https://empresa4.com", alt: "Logo de Auting SRL" },
    { id: 24, nombre: "MP", logo: "/empresas/MP.jpg", enlace: "https://empresa4.com", alt: "Logo de MP" },
    { id: 25, nombre: "PSA", logo: "/empresas/PSA.jpg", enlace: "https://empresa4.com", alt: "Logo de PSA" },
    { id: 26, nombre: "Edelflex", logo: "/empresas/Edelflex.jpg", enlace: "https://empresa4.com", alt: "Logo de Edelflex" },
    { id: 27, nombre: "Tarquini", logo: "/empresas/Tarquini.jpg", enlace: "https://empresa4.com", alt: "Logo de Tarquini" },
    { id: 28, nombre: "Globos Tuky", logo: "/empresas/Globos Tuky.jpg", enlace: "https://empresa4.com", alt: "Logo de Globos Tuky" },
    { id: 29, nombre: "Escorial", logo: "/empresas/Escorial.jpg", enlace: "https://empresa4.com", alt: "Logo de Escorial" },
    { id: 30, nombre: "Aptar Grout", logo: "/empresas/Aptar Grout.jpg", enlace: "https://empresa4.com", alt: "Logo de Aptar Grout" },
  ];

  // Configuración de cantidad por grupo
  const INITIAL_VISIBLE = 10; // Mostrar 10 inicialmente
  const INCREMENT_BY = 8; // Cargar 8 más cada vez

  // Estados para cada grupo
  const [visibleCountGrupo1, setVisibleCountGrupo1] = useState(INITIAL_VISIBLE);
  const [visibleCountGrupo2, setVisibleCountGrupo2] = useState(INITIAL_VISIBLE);

  const grupo1 = todasEmpresas.slice(0, 15);
  const grupo2 = todasEmpresas.slice(15, 30);

  const handleShowMore = (grupo: 'grupo1' | 'grupo2') => {
    if (grupo === 'grupo1') {
      setVisibleCountGrupo1(prev => Math.min(prev + INCREMENT_BY, grupo1.length));
    } else {
      setVisibleCountGrupo2(prev => Math.min(prev + INCREMENT_BY, grupo2.length));
    }
  };

  const handleShowLess = (grupo: 'grupo1' | 'grupo2') => {
    if (grupo === 'grupo1') {
      setVisibleCountGrupo1(INITIAL_VISIBLE);
    } else {
      setVisibleCountGrupo2(INITIAL_VISIBLE);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header mejorado */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Nuestros Clientes
            </span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Empresas que confían en
          </h2>
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              nuestro trabajo
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Más de 30 empresas líderes confían en nuestra experiencia y calidad de servicio
          </p>
        </div>

        {/* Grid de empresas con "Ver más" */}
        <div className="space-y-16 md:space-y-20">
          
          {/* Primer grupo */}
          <div>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Socios Estratégicos
                </h3>
              </div>
              <div className="text-sm text-gray-500">
                Mostrando {Math.min(visibleCountGrupo1, grupo1.length)} de {grupo1.length} empresas
              </div>
            </div>
            
            <GridEmpresas 
              empresas={grupo1.slice(0, visibleCountGrupo1)} 
            />
            
            {/* Botones Ver más/menos */}
            {grupo1.length > INITIAL_VISIBLE && (
              <div className="flex justify-center mt-8 md:mt-10">
                {visibleCountGrupo1 < grupo1.length ? (
                  <button
                    onClick={() => handleShowMore('grupo1')}
                    className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-200 hover:border-blue-500 text-blue-600 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Ver más empresas</span>
                    <ChevronDownIcon className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="text-sm bg-blue-50 px-2 py-0.5 rounded-full ml-2">
                      +{Math.min(INCREMENT_BY, grupo1.length - visibleCountGrupo1)}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleShowLess('grupo1')}
                    className="group flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-md"
                  >
                    <span>Mostrar menos</span>
                    <ChevronUpIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Separador elegante */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white px-6 py-2 rounded-full shadow-sm">
                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                  <BuildingOffice2Icon className="w-4 h-4" />
                  Empresas Destacadas
                </span>
              </div>
            </div>
          </div>

          {/* Segundo grupo */}
          <div>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Clientes Premium
                </h3>
              </div>
              <div className="text-sm text-gray-500">
                Mostrando {Math.min(visibleCountGrupo2, grupo2.length)} de {grupo2.length} empresas
              </div>
            </div>
            
            <GridEmpresas 
              empresas={grupo2.slice(0, visibleCountGrupo2)} 
            />
            
            {/* Botones Ver más/menos */}
            {grupo2.length > INITIAL_VISIBLE && (
              <div className="flex justify-center mt-8 md:mt-10">
                {visibleCountGrupo2 < grupo2.length ? (
                  <button
                    onClick={() => handleShowMore('grupo2')}
                    className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-200 hover:border-blue-500 text-blue-600 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Ver más empresas</span>
                    <ChevronDownIcon className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="text-sm bg-blue-50 px-2 py-0.5 rounded-full ml-2">
                      +{Math.min(INCREMENT_BY, grupo2.length - visibleCountGrupo2)}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleShowLess('grupo2')}
                    className="group flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-md"
                  >
                    <span>Mostrar menos</span>
                    <ChevronUpIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Badge final */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <span className="text-blue-600 text-sm font-medium">
              {todasEmpresas.length}+ empresas confían en nosotros
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Grid responsivo mejorado
interface GridEmpresasProps {
  empresas: Empresa[];
}

const GridEmpresas = ({ empresas }: GridEmpresasProps) => {
  if (empresas.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {empresas.map((empresa) => (
        <div
          key={empresa.id}
          className="group relative animate-fadeIn"
        >
          <a
            href={empresa.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            title={`Visitar ${empresa.nombre}`}
          >
            {/* Tarjeta con efecto moderno */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-blue-200">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/0 group-hover:from-blue-50/20 group-hover:to-blue-50/20 transition-all duration-500" />
              
              {/* Contenedor de imagen con proporción optimizada */}
              <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] p-4 sm:p-5 md:p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={empresa.logo}
                    alt={empresa.alt}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Overlay con nombre en hover (desktop) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium text-center">
                    {empresa.nombre}
                  </p>
                </div>
              </div>

              {/* Nombre siempre visible en móvil */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-xl">
                <p className="text-white text-xs font-medium text-center truncate">
                  {empresa.nombre}
                </p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

// Estilos adicionales (puedes agregarlos a tu archivo CSS global)
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

export default Empresas;
