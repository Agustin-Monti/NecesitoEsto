"use client";

import Image from 'next/image';
import React from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Componente para partículas que solo se renderiza en el cliente
const Particles = () => {
  const [particles, setParticles] = useState<Array<{left: string; top: string; delay: string; duration: string}>>([]);

  useEffect(() => {
    // Generar partículas solo en el cliente
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) {
    return null; // No renderizar nada hasta que se generen en el cliente
  }

  return (
    <div className="absolute inset-0 opacity-30">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  );
};

// Componente para grid animado que solo se renderiza en el cliente
const AnimatedGrid = () => {
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    // Generar delays solo en el cliente
    const newDelays = Array.from({ length: 48 }, (_, i) => i * 0.1);
    setDelays(newDelays);
  }, []);

  if (delays.length === 0) {
    return null; // No renderizar nada hasta que se generen en el cliente
  }

  return (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-12 gap-4 h-full">
        {delays.map((delay, i) => (
          <div
            key={i}
            className="bg-white animate-pulse"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // No renderizar contenido que depende del window hasta que esté montado
  if (!mounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Solo el fondo básico durante SSR */}
        <div className="absolute inset-0">
          <Image
            src="/banner.jpg"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo con gradiente animado y partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Efecto de partículas - Solo en cliente */}
        <Particles />

        {/* Grid animado de fondo - Solo en cliente */}
        <AnimatedGrid />
      </div>

      {/* Imagen/Video de fondo con overlay - Optimizado para móvil */}
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Hero Background"
          fill
          className="object-cover md:object-center object-top md:scale-110 transition-transform duration-1000"
          quality={100}
          priority
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:from-black/80 md:via-black/40 md:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
      </div>

      {/* Contenido principal - Optimizado para móvil */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-6">
        <div className={`text-center text-white w-full max-w-4xl mx-auto transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Título principal con efecto gradiente - Optimizado móvil */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent block">
              El Momento
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient text-4xl sm:text-5xl md:text-7xl lg:text-8xl block mt-2">
              es Ahora
            </span>
          </h1>

          {/* Descripción - Optimizada móvil */}
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white/80 max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            Publica lo que <span className="text-blue-300 font-semibold">estás necesitando</span> y encuentra 
            la <span className="text-purple-300 font-semibold">mejor solución</span>. Conectamos tu demanda 
            con los <span className="text-green-300 font-semibold">proveedores ideales</span>.
          </p>

          {/* CTA Buttons - Optimizados móvil */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 px-2 sm:px-0">
            <Link href={`/demandas/new`} className="w-full sm:w-auto">
              <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl sm:hover:shadow-2xl shadow-lg overflow-hidden text-sm sm:text-base">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Comenzar Ahora</span>
              </button>
            </Link>
            
            <Link href={`#pasos`} className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Ver Demostración
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator moderno - CORREGIDO */}
      {!isScrolled && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          {/* Versión móvil - Ahora muestra "Descubre Más" */}
          <div className="flex md:hidden flex-col items-center space-y-1 sm:space-y-2">
            <div className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2 animate-pulse">
              Descubre Más
            </div>
            <div 
              onClick={scrollToContent}
              className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/40 rounded-full flex items-center justify-center cursor-pointer hover:border-white/60 transition-colors duration-300"
            >
              <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 animate-bounce" />
            </div>
          </div>

          {/* Versión desktop */}
          <div className="hidden md:flex flex-col items-center space-y-4">
            <div className="text-white/60 text-sm animate-pulse">Descubre Más</div>
            <div 
              onClick={scrollToContent}
              className="group w-14 h-14 border-2 border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:border-white/60 hover:bg-white/10 transition-all duration-300"
            >
              <ChevronDownIcon className="w-6 h-6 text-white/60 group-hover:text-white/80 animate-bounce" />
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Efecto de brillo animado - Ajustados para móvil */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-400/10 rounded-full blur-2xl sm:blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-400/10 rounded-full blur-2xl sm:blur-3xl animate-float-slow-reverse"></div>
    </div>
  );
}
