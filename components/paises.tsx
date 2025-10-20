// components/paises
"use client";

import React from 'react';
import Link from "next/link";
import Image from 'next/image';

interface Pais {
  id: number;
  nombre: string;
  bandera_url: string;
}

export default function Table({ paises }: { paises: Pais[] }) {
  if (!paises || paises.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay países para mostrar.
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Necesito{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              !Esto
            </span>{" "}
            también en otros países
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre oportunidades de negocio en diferentes mercados alrededor del mundo
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Grid de países */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {paises.map((pais) => (
            <Link
              key={pais.id}
              href={`/`}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Contenedor de la bandera */}
              <div className="relative mb-4">
                <div className="w-16 h-12 mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center shadow-inner group-hover:shadow-md transition-shadow duration-300">
                  <Image
                    src={pais.bandera_url}
                    alt={`Bandera de ${pais.nombre}`}
                    width={20}
                    height={12}
                    className="w-12 h-8 object-cover rounded shadow-sm group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Efecto de resplandor al hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Nombre del país */}
              <h3 className="text-center font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-sm md:text-base leading-tight">
                {pais.nombre}
              </h3>

              {/* Indicador de hover */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>

        {/* Footer de la sección */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 inline-block">
            <p className="text-gray-700 font-medium mb-4">
              ¿No encuentras tu país?
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Solicitar expansión Proximamente...
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
