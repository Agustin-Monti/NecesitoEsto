"use client";

import { useRouter } from 'next/navigation';

const pasos = [
  {
    id: 1,
    imgSrc: "/pasos/paso1.png",
    title: "Publica Gratis lo que Necesitas",
    description:
      "Detalla tu demanda de forma clara y precisa para que las búsquedas de las personas o empresas que tengan la posibilidad de satisfacer tu necesidad puedan contactarse en forma directa y acercar una propuesta que sea la solución que estás buscando."
  },
  {
    id: 2,
    imgSrc: "/pasos/paso2.png",
    title: "Búsqueda de posibles candidatos",
    description:
      "Tu demanda será publicada en distintos medios, redes sociales, empresas y prestadores de servicios, buscando quienes puedan satisfacer tu demanda. Realizando el interesado un único pago por oferta, le enviamos la información del representante para que se contacte en forma directa."
  },
  {
    id: 3,
    imgSrc: "/pasos/paso3.png",
    title: "Generación del Negocio",
    description:
      "Interesado por la demanda, se envía la información del responsable de la publicación al interesado para que este realice el contacto directo comenzando la respectiva negociación. La plataforma solo llevará estadísticas de conformidad."
  }
];

export default function Pasos() {
  const router = useRouter();

  const handleComenzar = () => {
    router.push('/demandas/new');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
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
            Un proceso simple y efectivo para conectar necesidades con soluciones
          </p>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pasos.map((paso, index) => (
            <div
              key={paso.id}
              className="group relative"
            >
              {/* Card con efectos hover */}
              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full flex flex-col">
                
                {/* Número del paso con diseño moderno */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Imagen */}
                <div className="mb-6 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 flex items-center justify-center">
                    <img
                      src={paso.imgSrc}
                      alt={paso.title}
                      className="w-32 h-32 object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {paso.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {paso.description}
                  </p>
                </div>

                {/* Línea decorativa inferior */}
                <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
              </div>

              {/* Efecto de fondo sutil al hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Llamada a la acción */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para publicar tu necesidad?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a nuestra plataforma y conecta con proveedores que pueden resolver lo que necesitas.
            </p>
            <button 
              onClick={handleComenzar}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Comenzar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
