// components/Footer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const enlacesRapidos = [
    { nombre: 'Inicio', href: '/' },
    { nombre: 'Demandas', href: '/demandas' },
    { nombre: 'Publicar Demanda', href: '/demandas/new' },
    { nombre: 'Nosotros', href: '/nosotros' },
    { nombre: 'Contacto', href: '/precios' },
  ];

  const enlacesLegales = [
    { nombre: 'Términos y Condiciones', href: '/terminos' },
    { nombre: 'Política de Privacidad', href: '/politica-privacidad' },
    { nombre: 'Cookies', href: '/politica-cookies' },
  ];

  const recursos = [
    { nombre: 'Blog', href: '/blog' },
    { nombre: 'FAQ', href: '/faq' },
    { nombre: 'Contacto', href: '/contacto' },
    { nombre: 'Soporte', href: '/soporte' },
    { nombre: 'Aviso Legal', href: '/aviso-legal' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Columna 1: Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image 
                src="/logotm2.png" 
                alt="Logo de Necesito Esto!" 
                width={140} 
                height={70}
                className="filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Conectamos necesidades con soluciones. Encuentra proveedores confiables 
              o publica tu demanda para que te encuentren.
            </p>
            <div className="flex space-x-4">
              {/* Redes Sociales */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {enlacesRapidos.map((enlace) => (
                <li key={enlace.nombre}>
                  <Link 
                    href={enlace.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2 transform hover:translate-x-1 block"
                  >
                    {enlace.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Recursos</h3>
            <ul className="space-y-3">
              {recursos.map((recurso) => (
                <li key={recurso.nombre}>
                  <Link 
                    href={recurso.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2 transform hover:translate-x-1 block"
                  >
                    {recurso.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto e información */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-300">Av. Siempre Viva 123</p>
                  <p className="text-gray-300">Buenos Aires, Argentina</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+5491112345678" className="text-gray-300 hover:text-white transition-colors duration-300">
                  +54 9 11 1234-5678
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@necesitoesto.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  info@necesitoesto.com
                </a>
              </div>

              {/* Horario de atención */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-300">Horarios de Atencion</p>
                  <p className="text-gray-300">Lun - Vie: 9:00 - 18:00</p>
                  <p className="text-gray-300">Sáb: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección inferior del footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">
                © {currentYear} Necesito <span className="text-blue-400 font-semibold">!Esto</span>. Todos los derechos reservados.
              </p>
            </div>

            {/* Enlaces legales */}
            <div className="flex flex-wrap justify-center space-x-6">
              {enlacesLegales.map((enlace) => (
                <Link 
                  key={enlace.nombre}
                  href={enlace.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {enlace.nombre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}