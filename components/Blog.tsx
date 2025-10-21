// components/Blog.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Blog() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const articulos = [
    {
      id: 1,
      titulo: "5 Consejos para Escribir Demandas que Atraigan a los Mejores Proveedores",
      extracto: "Aprende cómo describir tus necesidades de manera efectiva para obtener propuestas de calidad.",
      fecha: "15 Enero 2025",
      categoria: "Para Demandantes",
      tiempoLectura: "5 min",
      imagen: "/blog/demandas-efectivas.jpg"
    },
    {
      id: 2,
      titulo: "Cómo los Proveedores Pueden Destacar en un Mercado Competitivo",
      extracto: "Estrategias probadas para que tu perfil llame la atención de los demandantes.",
      fecha: "12 Enero 2025",
      categoria: "Para Proveedores",
      tiempoLectura: "7 min",
      imagen: "/blog/proveedores-destacar.jpg"
    },
    {
      id: 3,
      titulo: "El Modelo de Pago por Oferta: Ventajas para Ambos Lados",
      extracto: "Descubre por qué este modelo beneficia tanto a demandantes como a proveedores.",
      fecha: "8 Enero 2025",
      categoria: "Modelo de Negocio",
      tiempoLectura: "6 min",
      imagen: "/blog/modelo-pago-oferta.jpg"
    },
    {
      id: 4,
      titulo: "Casos de Éxito: Historias Reales de Negocios Cerrados en la Plataforma",
      extracto: "Conoce cómo otros usuarios han encontrado soluciones perfectas para sus necesidades.",
      fecha: "3 Enero 2025",
      categoria: "Casos de Éxito",
      tiempoLectura: "8 min",
      imagen: "/blog/casos-exito.jpg"
    },
    {
      id: 5,
      titulo: "Guía Completa para Evaluar y Elegir al Proveedor Ideal",
      extracto: "Factores clave a considerar antes de tomar una decisión importante.",
      fecha: "28 Diciembre 2024",
      categoria: "Para Demandantes",
      tiempoLectura: "10 min",
      imagen: "/blog/elegir-proveedor.jpg"
    },
    {
      id: 6,
      titulo: "Tendencias del Mercado: Qué Buscan los Demandantes en 2025",
      extracto: "Análisis de las necesidades más solicitadas y sectores en crecimiento.",
      fecha: "22 Diciembre 2024",
      categoria: "Tendencias",
      tiempoLectura: "9 min",
      imagen: "/blog/tendencias-2025.jpg"
    }
  ];

  const categorias = [
    { nombre: "Todos", count: 12 },
    { nombre: "Para Demandantes", count: 4 },
    { nombre: "Para Proveedores", count: 3 },
    { nombre: "Casos de Éxito", count: 2 },
    { nombre: "Tendencias", count: 2 },
    { nombre: "Modelo de Negocio", count: 1 }
  ];

  const articulosFiltrados = categoriaActiva === 'Todos' 
    ? articulos 
    : articulos.filter(articulo => articulo.categoria === categoriaActiva);

  return (
    <div className="space-y-12">
      {/* Encabezado del blog */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de Necesito Esto!</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Consejos, tendencias y mejores prácticas para maximizar tu experiencia en nuestra plataforma
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
      </section>

      {/* Filtros por categoría */}
      <section>
        <div className="flex flex-wrap gap-4 justify-center">
          {categorias.map((categoria, index) => (
            <button
              key={index}
              onClick={() => setCategoriaActiva(categoria.nombre)}
              className={`px-6 py-3 rounded-full border transition-colors duration-300 ${
                categoriaActiva === categoria.nombre
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              {categoria.nombre} ({categoria.count})
            </button>
          ))}
        </div>
      </section>

      {/* Grid de artículos */}
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articulosFiltrados.map((articulo) => (
            <article key={articulo.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Imagen del artículo */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <div className="text-4xl">📝</div>
              </div>
              
              {/* Contenido del artículo */}
              <div className="p-6">
                {/* Metadatos */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {articulo.categoria}
                  </span>
                  <span>{articulo.tiempoLectura}</span>
                </div>
                
                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {articulo.titulo}
                </h3>
                
                {/* Extracto */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {articulo.extracto}
                </p>
                
                {/* Footer del artículo */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{articulo.fecha}</span>
                  <Link 
                    href={`/blog/${articulo.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
                  >
                    Leer más
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">¡No te pierdas ningún artículo!</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Suscríbete a nuestro newsletter y recibe los mejores consejos y tendencias directamente en tu email.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Tu email..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300">
            Suscribirse
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Sin spam. Puedes darte de baja en cualquier momento.
        </p>
      </section>
    </div>
  );
}