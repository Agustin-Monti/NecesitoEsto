// components/tipos.tsx
import Link from "next/link";

export default function Tipos() {
  const necesidades = [
    {
      nombre: "Bienes",
      descripcion: "Productos tangibles y equipos",
      href: "/demandas/new",
      imagen: "tipos/bienes.jpg", 
      color: "blue"
    },
    {
      nombre: "Insumos", 
      descripcion: "Materiales y materias primas",
      href: "/demandas/new",
      imagen: "tipos/insumos.jpg",
      color: "green"
    },
    {
      nombre: "Servicios",
      descripcion: "Expertos y profesionales",
      href: "/demandas/new", 
      imagen: "tipos/servicios.jpg",
      color: "purple"
    },
    {
      nombre: "Otros",
      descripcion: "Necesidades específicas",
      href: "/demandas/new",
      imagen: "tipos/otros.jpg",
      color: "orange"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            ¿Qué Necesitas Hoy?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubre las necesidades más solicitadas por nuestra comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {necesidades.map((necesidad) => (
            <Link
              key={necesidad.nombre}
              href={necesidad.href}
              className="group relative block"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full flex flex-col">
                {/* Imagen con overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img
                    src={necesidad.imagen}
                    alt={necesidad.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white">
                      {necesidad.nombre}
                    </h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex-grow">
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {necesidad.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                      Solicitar ahora
                    </span>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}